"""Reproduce the NYC Taxi portfolio analysis without modifying the source CSV.

Run from any directory: python projects/nyc-taxi/analyse.py
All generated analysis artefacts stay inside this project's directory.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent
SOURCE_URL = "https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/nyctrips/data.csv"
DISTANCE_EDGES = [0, 1, 2, 3, 5, 10, 20, float("inf")]
# Cut points stay in meter miles (1, 2, 3, 5, 10, 20); labels show them in km.
KM = 1.609344
DISTANCE_LABELS = ["0–1.6", "1.6–3.2", "3.2–4.8", "4.8–8", "8–16", "16–32", "32+"]
PERIODS = ["00–05", "06–09", "10–15", "16–19", "20–23"]
PERIOD_NAMES = {"00–05": "Night", "06–09": "Morning rush", "10–15": "Midday",
                "16–19": "Evening rush", "20–23": "Late evening"}
TIMEZONE = "America/New_York"
NUMERIC = [
    "VendorID", "passenger_count", "trip_distance", "pickup_longitude",
    "pickup_latitude", "dropoff_longitude", "dropoff_latitude",
    "fare_amount", "tip_amount", "total_amount",
]
# Explicit analytical windows, NOT official taxi zones, boroughs, or airport boundaries.
# Longitude min/max, latitude min/max. Priority goes to airport windows.
WINDOWS = [
    ("JFK vicinity", [-73.83, -73.75, 40.62, 40.67]),
    ("LaGuardia vicinity", [-73.90, -73.85, 40.755, 40.795]),
    ("Downtown window", [-74.025, -73.97, 40.695, 40.74]),
    ("Midtown window", [-74.005, -73.955, 40.74, 40.775]),
    ("Uptown window", [-73.99, -73.925, 40.775, 40.825]),
]
REGION = [-74.3, -73.6, 40.45, 41.0]


def jsonable(value):
    """Convert pandas/numpy values, including absent groups, to strict JSON."""
    if isinstance(value, dict):
        return {str(k): jsonable(v) for k, v in value.items()}
    if isinstance(value, (list, tuple, np.ndarray)):
        return [jsonable(v) for v in value]
    if isinstance(value, (np.integer,)):
        return int(value)
    if isinstance(value, (float, np.floating)):
        return round(float(value), 6) if math.isfinite(value) else None
    if pd.isna(value):
        return None
    return value


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(jsonable(value), ensure_ascii=False, allow_nan=False,
                               separators=(",", ":")) + "\n", encoding="utf-8")


def in_box(lon, lat, box):
    return lon.between(box[0], box[1]) & lat.between(box[2], box[3])


def window_for(lon, lat):
    result = pd.Series("Other locations", index=lon.index, dtype="str")
    for label, box in reversed(WINDOWS):
        result.loc[in_box(lon, lat, box)] = label
    return result


def haversine_miles(lon1, lat1, lon2, lat2):
    p1, p2 = np.radians(lat1), np.radians(lat2)
    dlat, dlon = p2 - p1, np.radians(lon2 - lon1)
    a = np.sin(dlat / 2) ** 2 + np.cos(p1) * np.cos(p2) * np.sin(dlon / 2) ** 2
    return 3958.7613 * 2 * np.arcsin(np.sqrt(np.clip(a, 0, 1)))


def load_data(path):
    raw = pd.read_csv(path)
    required = NUMERIC + ["tpep_pickup_datetime", "tpep_dropoff_datetime"]
    absent = set(required) - set(raw.columns)
    if absent:
        raise ValueError(f"Missing required source columns: {sorted(absent)}")
    df = raw.copy()
    df["source_row"] = np.arange(len(df)) + 2  # CSV line, counting its header.
    for c in NUMERIC:
        df[c] = pd.to_numeric(df[c], errors="coerce")
    for side in ["pickup", "dropoff"]:
        # The TLC records New York wall-clock time. The sample appends "+00:00" as a format
        # suffix: its pickups span exactly 00:01-23:59 of 15 January on that clock, and the
        # quietest hour is 04:00. We keep the wall clock and label it New York local time.
        wall = df[f"tpep_{side}_datetime"].astype("string").str.slice(0, 19)
        df[f"{side}_at"] = pd.to_datetime(wall, errors="coerce").dt.tz_localize(TIMEZONE)
    df["duration_min"] = (df.dropoff_at - df.pickup_at).dt.total_seconds() / 60
    df["hour"] = df.pickup_at.dt.hour
    df["day"] = df.pickup_at.dt.strftime("%Y-%m-%d")
    df["weekday"] = df.pickup_at.dt.day_name()
    df["period"] = pd.cut(df.hour, [-1, 5, 9, 15, 19, 23], labels=PERIODS)
    df["distance_band"] = pd.cut(df.trip_distance, DISTANCE_EDGES, labels=DISTANCE_LABELS)
    df["speed_mph"] = df.trip_distance.div(df.duration_min.where(df.duration_min.gt(0))) * 60
    df["distance_km"] = df.trip_distance * KM
    df["speed_kmh"] = df.speed_mph * KM
    df["straight_line_miles"] = haversine_miles(
        df.pickup_longitude, df.pickup_latitude, df.dropoff_longitude, df.dropoff_latitude)
    df["origin_window"] = window_for(df.pickup_longitude, df.pickup_latitude)
    df["destination_window"] = window_for(df.dropoff_longitude, df.dropoff_latitude)
    return raw, df


def flags_for(raw, df):
    flags = pd.DataFrame(index=df.index)
    flags["invalid_timestamp"] = df.pickup_at.isna() | df.dropoff_at.isna()
    flags["invalid_numeric"] = ~np.isfinite(df[NUMERIC]).all(axis=1)
    flags["duplicate"] = raw.duplicated()
    flags["nonpositive_duration"] = df.duration_min.le(0)
    flags["nonpositive_distance"] = df.trip_distance.le(0)
    flags["duration_over_120_min"] = df.duration_min.gt(120)
    flags["speed_over_80_mph"] = df.speed_mph.gt(80)
    # Two source records share 99.9 miles with a $2.50 metered fare. Explicit manual-review rule.
    flags["reviewed_99_9_miles_low_fare"] = df.trip_distance.eq(99.9) & df.fare_amount.le(2.5)
    flags["zero_passengers"] = df.passenger_count.eq(0)
    flags["negative_fare_or_total"] = df.fare_amount.lt(0) | df.total_amount.lt(0)
    flags["nonpositive_fare_or_total"] = df.fare_amount.le(0) | df.total_amount.le(0)
    flags["negative_tip"] = df.tip_amount.lt(0)
    flags["pickup_outside_study_extent"] = ~in_box(df.pickup_longitude, df.pickup_latitude, REGION)
    flags["dropoff_outside_study_extent"] = ~in_box(df.dropoff_longitude, df.dropoff_latitude, REGION)
    # Generous GPS tolerance; spatial flag only, not proof that the meter distance is wrong.
    flags["endpoint_distance_exceeds_meter_by_0_5_mile"] = df.straight_line_miles.gt(df.trip_distance + .5)
    for c in ["trip_distance", "duration_min", "fare_amount"]:
        q1, q3 = df[c].quantile([.25, .75])
        flags[f"{c}_outside_IQR_fences"] = df[c].lt(q1 - 1.5 * (q3 - q1)) | df[c].gt(q3 + 1.5 * (q3 - q1))
    return flags


def mobility_mask(df, flags, max_minutes=120, max_mph=80, remove_reviewed=True):
    usable_measurements = np.isfinite(df[["trip_distance", "duration_min"]]).all(axis=1)
    mask = (~flags.invalid_timestamp & usable_measurements & ~flags.duplicate
            & df.duration_min.gt(0) & df.trip_distance.gt(0)
            & df.duration_min.le(max_minutes) & df.speed_mph.le(max_mph))
    if remove_reviewed:
        mask &= ~flags.reviewed_99_9_miles_low_fare
    return mask


def summary(df):
    return {
        "trips": len(df), "km": df.distance_km.sum(),
        "trip_minutes": df.duration_min.sum(),
        "median_km": df.distance_km.median(), "mean_km": df.distance_km.mean(),
        "median_minutes": df.duration_min.median(), "mean_minutes": df.duration_min.mean(),
        "p90_minutes": df.duration_min.quantile(.9), "p95_minutes": df.duration_min.quantile(.95),
        "median_kmh": df.speed_kmh.median(),
    }


def grouped(df, keys):
    out = df.groupby(keys, observed=True).agg(
        trips=("source_row", "size"), km=("distance_km", "sum"),
        trip_minutes=("duration_min", "sum"), median_km=("distance_km", "median"),
        median_minutes=("duration_min", "median"),
        p90_minutes=("duration_min", lambda s: s.quantile(.9)),
        p10_minutes=("duration_min", lambda s: s.quantile(.1)),
        median_kmh=("speed_kmh", "median"), median_fare=("fare_amount", "median"),
    ).reset_index()
    return out


def time_coverage(df):
    """The sample is made of short time blocks. Count the minutes each hour actually covers.

    Trips per covered minute separates activity from sampling coverage.
    """
    minute = df.pickup_at.dt.hour * 60 + df.pickup_at.dt.minute
    per_minute = minute.value_counts().reindex(range(1440), fill_value=0)
    covered = per_minute.gt(0)
    edges = np.flatnonzero(np.diff(np.r_[0, covered.astype(int).to_numpy(), 0]))
    blocks = edges.reshape(-1, 2)
    lengths = blocks[:, 1] - blocks[:, 0]
    hours = pd.DataFrame({"hour": range(24),
                          "covered_minutes": covered.groupby(np.arange(1440) // 60).sum().to_numpy()})
    return {"covered_minutes": int(covered.sum()), "blocks": len(blocks),
            "median_block_minutes": float(np.median(lengths)), "longest_gap_minutes":
            int(max(b[0] - a[1] for a, b in zip(blocks[:-1], blocks[1:]))) if len(blocks) > 1 else 0,
            "per_minute": per_minute.to_list(), "hours": hours.to_dict("records")}


def hourly_with_coverage(clean, coverage):
    out = grouped(clean, "hour").merge(pd.DataFrame(coverage["hours"]), on="hour", how="left")
    out["trips_per_covered_minute"] = out.trips / out.covered_minutes
    out["period_name"] = pd.cut(out.hour, [-1, 5, 9, 15, 19, 23], labels=PERIODS).map(PERIOD_NAMES).astype(str)
    return out.to_dict("records")


def financial_mask(df):
    return df.fare_amount.gt(0) & df.total_amount.gt(0) & df.tip_amount.ge(0)


def financial_summary(df):
    return {"trips": len(df), "recorded_total_usd": df.total_amount.sum(),
            "metered_fare_usd": df.fare_amount.sum(), "median_total_usd": df.total_amount.median(),
            "median_fare_usd": df.fare_amount.median(),
            "median_recorded_dollars_per_km": df.total_amount.div(df.distance_km).median(),
            "zero_recorded_tip_pct": df.tip_amount.eq(0).mean() * 100}


def concentration(df):
    """Shared denominator for shares of trips, miles, duration and positive charges."""
    money = df.loc[financial_mask(df)]
    total = len(money)
    rows = []
    for label, condition in [
        ("At most 3.2 km", money.trip_distance.le(2)),
        ("Over 8 km", money.trip_distance.gt(5)),
        ("Over 16 km", money.trip_distance.gt(10)),
    ]:
        sub = money.loc[condition]
        rows.append({"segment": label, "trips": len(sub), "trip_share_pct": len(sub) / total * 100,
                     "km_share_pct": sub.distance_km.sum() / money.distance_km.sum() * 100,
                     "minute_share_pct": sub.duration_min.sum() / money.duration_min.sum() * 100,
                     "charge_share_pct": sub.total_amount.sum() / money.total_amount.sum() * 100})
    ranked = money.sort_values("total_amount", ascending=False)
    curve = [{"top_trip_share_pct": 0, "charge_share_pct": 0}]
    for pct in range(1, 101):
        n = math.ceil(total * pct / 100)
        curve.append({"top_trip_share_pct": n / total * 100,
                      "charge_share_pct": ranked.total_amount.iloc[:n].sum() / money.total_amount.sum() * 100})
    return {"denominator_trips": total, "segments": rows, "charge_concentration_curve": curve}


def same_distance_comparison(df):
    """Compare source-clock periods, then adjust for shared OD and narrow distance strata.

    The adjusted statistic is a pooled-weight average of stratum medians, NOT the
    median of all matched rows and NOT an estimated causal congestion effect.
    """
    sub = df.loc[df.trip_distance.gt(1) & df.trip_distance.le(2)].copy()
    table = grouped(sub, "period")
    sub["distance_quarter"] = np.ceil(sub.trip_distance * 4).astype(int)
    # Local equirectangular study grid in km; illustrative cells, not named neighbourhoods.
    for side in ["pickup", "dropoff"]:
        sub[f"{side}_x"] = np.floor((sub[f"{side}_longitude"] + 74.3) * 84.3 / 2).astype(int)
        sub[f"{side}_y"] = np.floor((sub[f"{side}_latitude"] - 40.45) * 111.2 / 2).astype(int)
    keys = ["pickup_x", "pickup_y", "dropoff_x", "dropoff_y", "distance_quarter"]
    a = sub.loc[sub.period.eq("00–05")]
    b = sub.loc[sub.period.eq("10–15")]
    ga = a.groupby(keys).duration_min.agg(["median", "size"])
    gb = b.groupby(keys).duration_min.agg(["median", "size"])
    matched = ga.rename(columns={"median": "median_a", "size": "size_a"}).join(
        gb.rename(columns={"median": "median_b", "size": "size_b"}), how="inner")
    matched = matched.loc[matched.size_a.ge(5) & matched.size_b.ge(5)]
    adjustment = {"period_a": "00–05", "period_b": "10–15", "shared_strata": len(matched),
                  "minimum_per_period_per_stratum": 5, "grid_km": 2,
                  "distance_band_width_km": .25 * KM,
                  "statistic": "Pooled-count-weighted average of stratum median durations"}
    if not matched.empty:
        weights = matched.size_a + matched.size_b
        adjustment.update({
            "a_weighted_minutes": np.average(matched.median_a, weights=weights),
            "b_weighted_minutes": np.average(matched.median_b, weights=weights),
            "a_matched_rows": matched.size_a.sum(), "b_matched_rows": matched.size_b.sum(),
            "a_coverage_pct": matched.size_a.sum() / len(a) * 100,
            "b_coverage_pct": matched.size_b.sum() / len(b) * 100,
        })
    return {"distance_definition": "1.6 < distance <= 3.2 km (1 to 2 meter miles)", "periods": table.to_dict("records"),
            "od_adjustment": adjustment}


def spatial_analysis(df, flags):
    mask = (~flags.pickup_outside_study_extent & ~flags.dropoff_outside_study_extent
            & ~flags.endpoint_distance_exceeds_meter_by_0_5_mile)
    sub = df.loc[mask.loc[df.index]].copy()
    labels = [label for label, _ in WINDOWS] + ["Other locations"]
    balance = []
    for label in labels:
        p = sub.origin_window.eq(label)
        d = sub.destination_window.eq(label)
        balance.append({"window": label, "pickups": int(p.sum()), "dropoffs": int(d.sum()),
                        "net_dropoffs_minus_pickups": int(d.sum() - p.sum())})
    flows = sub.groupby(["origin_window", "destination_window"], observed=True).size().rename("trips").reset_index()
    hourly_balance = []
    # Destination hour means the actual recorded arrival hour, including next-day arrivals.
    # Counts by hour-of-day fold the two dates and do NOT estimate a fleet balance.
    # Primary temporal balance instead attributes both ends to pickup hour, explicitly.
    for label in labels:
        for h in range(24):
            cohort = sub.loc[sub.hour.eq(h)]
            pickups = int(cohort.origin_window.eq(label).sum())
            dropoffs = int(cohort.destination_window.eq(label).sum())
            hourly_balance.append({"window": label, "pickup_hour": h, "pickups": pickups,
                                   "destinations": dropoffs, "net_destinations": dropoffs - pickups})
    # Approx 1 km grid, all points counted. Scatter sample is separate and explicitly labelled.
    cells = []
    for side in ["pickup", "dropoff"]:
        grid = sub[["hour", f"{side}_longitude", f"{side}_latitude"]].copy()
        grid["gx"] = np.floor((grid[f"{side}_longitude"] + 74.3) * 84.3).astype(int)
        grid["gy"] = np.floor((grid[f"{side}_latitude"] - 40.45) * 111.2).astype(int)
        counts = grid.groupby(["hour", "gx", "gy"]).size()
        for (hour, gx, gy), n in counts.items():
            cells.append([side, int(hour), round(-74.3 + (gx + .5) / 84.3, 5),
                          round(40.45 + (gy + .5) / 111.2, 5), int(n)])
    airport = []
    for label in ["JFK vicinity", "LaGuardia vicinity"]:
        for direction, condition in [("From vicinity", sub.origin_window.eq(label)),
                                     ("To vicinity", sub.destination_window.eq(label))]:
            part = sub.loc[condition]
            airport.append({"window": label, "direction": direction, **summary(part),
                            **{f"financial_{k}": v for k, v in financial_summary(part.loc[financial_mask(part)]).items()}})
    return {"trips": len(sub), "excluded_from_mobility_population": len(df) - len(sub),
            "study_extent": REGION, "windows": [{"label": x, "bounds": y} for x, y in WINDOWS],
            "window_balance": balance, "flows": flows.to_dict("records"),
            "hourly_destination_balance": hourly_balance, "airport_comparisons": airport,
            "grid_columns": ["endpoint", "pickup_hour", "longitude", "latitude", "trips"], "grid": cells}, sub


def policy_sensitivity(df, flags):
    rows = []
    for name, minutes, mph, reviewed in [
        ("Positive distance and duration", float("inf"), float("inf"), False),
        ("60 min / 97 km/h", 60, 60, True),
        ("90 min / 113 km/h", 90, 70, True),
        ("120 min / 129 km/h (main)", 120, 80, True),
        ("180 min / 161 km/h", 180, 100, True),
    ]:
        sub = df.loc[mobility_mask(df, flags, minutes, mph, reviewed)]
        short = sub.loc[sub.trip_distance.gt(1) & sub.trip_distance.le(2)]
        a = short.loc[short.period.eq("00–05"), "duration_min"]
        b = short.loc[short.period.eq("10–15"), "duration_min"]
        rows.append({"policy": name, **summary(sub), "excluded_rows": len(df) - len(sub),
                     "short_share_pct": sub.trip_distance.le(2).mean() * 100,
                     "period_a_1_2mi_median": a.median(), "period_b_1_2mi_median": b.median(),
                     "peak_recorded_hour": int(sub.hour.value_counts().idxmax())})
    return rows


def make_report(result):
    m, f = result["mobility"], result["finance"]
    c = result["same_distance"]["od_adjustment"]
    lines = [
        "# NYC Taxi — analytical evidence", "",
        "All statements describe the supplied sample. This file is generated by `analyse.py`.", "",
        "## Scope", "",
        f"- Raw records: {result['source']['rows']:,}; fields: {result['source']['columns']}.",
        f"- Pickup dates as encoded: {', '.join(result['source']['pickup_dates'])}.",
        "- Hours are New York local time. The file appends +00:00, but its pickups span exactly 00:01–23:59 of 15 January and the quietest hour is 04:00: the TLC wall clock.",
        f"- The sample covers {result['coverage']['covered_minutes']} of 1,440 minutes in {result['coverage']['blocks']} time blocks. Hourly activity is read as trips per covered minute.",
        "- One row represents a recorded trip. VendorID identifies the data provider, not an individual taxi or driver.",
        "- Distances: meter miles converted to km (1 mile = 1.609344 km); durations: elapsed minutes; money: recorded USD charges.", "",
        "## Eligibility decisions", "",
        "- Preserve raw records. Apply explicit analysis masks; export a flag ledger for inspection.",
        "- Mobility: valid dates/numbers, positive distance and duration, duration at most 120 minutes, mean speed at most 129 km/h (80 mph); exclude the two reviewed 160.8 km (99.9-mile)/$2.50 records.",
        "- The duration and speed limits are analytical plausibility choices, not claimed legal limits or proof of corruption. Sensitivity alternatives are reported.",
        "- IQR fences flag statistically unusual records for review. They do not automatically delete long trips or airport journeys.",
        "- Geography: additionally require both endpoints inside the declared study extent and straight-line distance no more than 0.8 km (0.5 mile) above meter distance. This is a spatial eligibility rule.",
        "- Finance: additionally require positive fare and total and nonnegative recorded tips. Negative/zero charges remain visible in the audit; refunds cannot be established from this file.",
        "- Zero passenger counts do not remove an otherwise usable mobility record.", "",
        "## Core population", "",
        f"- Mobility-eligible: {m['trips']:,}; excluded: {result['source']['rows'] - m['trips']:,}.",
        f"- Median trip: {m['median_km']:.2f} km and {m['median_minutes']:.2f} minutes.",
        f"- Mean duration: {m['mean_minutes']:.2f} min; P90: {m['p90_minutes']:.2f} min.",
        f"- Spatially eligible: {result['spatial']['trips']:,}; finance-eligible: {f['trips']:,}.", "",
        "## Concentration: shared positive-charge population", "",
        "| Segment | Trips | Share of trips | Share of km | Share of trip-minutes | Share of charges |",
        "|---|---:|---:|---:|---:|---:|",
    ]
    for r in result["concentration"]["segments"]:
        lines.append(f"| {r['segment']} | {r['trips']:,} | {r['trip_share_pct']:.1f}% | {r['km_share_pct']:.1f}% | {r['minute_share_pct']:.1f}% | {r['charge_share_pct']:.1f}% |")
    lines += ["", "## Travel time for 1.6–3.2 km trips", "",
              "Intervals are right-closed: 1.6 < distance <= 3.2 km. Periods are New York local hours.", "",
              "| Period | Trips | Median minutes | P90 minutes |", "|---|---:|---:|---:|"]
    for r in result["same_distance"]["periods"]:
        lines.append(f"| {r['period']} | {r['trips']:,} | {r['median_minutes']:.2f} | {r['p90_minutes']:.2f} |")
    if c.get("shared_strata"):
        lines += ["", f"Matching {c['shared_strata']} shared origin/destination/distance strata gives pooled-weight averages of stratum medians of {c['a_weighted_minutes']:.2f} min (00–05) and {c['b_weighted_minutes']:.2f} min (10–15).",
                  f"Coverage: {c['a_coverage_pct']:.1f}% and {c['b_coverage_pct']:.1f}% of eligible spatial 1.6–3.2 km trips in those periods. Cells are approximately 2 km; distance bins are 0.4 km, with at least five trips per period in each retained stratum.",
                  "This reduces observed trip-composition differences; it does not isolate the causal effect of traffic. Residual route, exact-distance and selection differences remain."]
    lines += ["", "## Sensitivity", "",
              "| Policy | Retained | Mean min | Median min | <=3.2 km share | Recorded peak hour |",
              "|---|---:|---:|---:|---:|---:|"]
    for r in result["sensitivity"]:
        lines.append(f"| {r['policy']} | {r['trips']:,} | {r['mean_minutes']:.2f} | {r['median_minutes']:.2f} | {r['short_share_pct']:.2f}% | {r['peak_recorded_hour']:02d} |")
    lines += ["", "## Interpretation boundaries", "",
              "- Recorded completed trips measure observed activity, not latent or unmet demand.",
              "- One sampled day cannot establish recurring commuter patterns, weekly seasonality or a validated future-demand forecast.",
              "- Directional balances describe the endpoints of the sampled trip cohort. They are not vehicle availability or a recommended dispatch plan.",
              "- Study windows are reproducible analytical rectangles, not official neighbourhood or airport boundaries.",
              "- Trip-minutes are summed passenger-service trip durations, not fleet utilisation, driver hours or available supply.",
              "- Charges are not profit or driver income. Cash tips are not recorded; zero recorded tip does not mean no tip. Missing payment type/rate code and itemised taxes/tolls limit explanations of charges.",
              "- Only endpoints are supplied. Flow lines are schematic connections, never reconstructed road routes.", "",
              "## Sources", "",
              f"- Prescribed sample: {SOURCE_URL}",
              "- Sample description: https://github.com/uber-web/kepler.gl-data/blob/master/samples.json",
              "- TLC record definitions: https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page",
              "- TLC dictionary: https://www.nyc.gov/assets/tlc/downloads/pdf/data_dictionary_trip_records_yellow.pdf",
              "  The current dictionary includes later-year fields; only definitions for columns present in the 2015 sample are used.", ""]
    return "\n".join(lines)


def run(input_path=ROOT / "data/raw.csv", output_root=ROOT):
    raw, df = load_data(input_path)
    flags = flags_for(raw, df)
    mask = mobility_mask(df, flags)
    clean = df.loc[mask].copy()
    coverage = time_coverage(df)
    spatial, geo = spatial_analysis(clean, flags)
    finance = clean.loc[financial_mask(clean)]
    descriptors = {}
    for col in ["distance_km", "duration_min", "speed_kmh", "fare_amount", "total_amount"]:
        s = df[col].replace([np.inf, -np.inf], np.nan).dropna()
        q1, q3 = s.quantile([.25, .75])
        descriptors[col] = {"min": s.min(), "q1": q1, "median": s.median(), "q3": q3,
                            "p95": s.quantile(.95), "p99": s.quantile(.99), "p999": s.quantile(.999),
                            "max": s.max(), "lower_IQR_fence": q1 - 1.5 * (q3 - q1),
                            "upper_IQR_fence": q3 + 1.5 * (q3 - q1)}
    # Sampling only affects the displayed scatter, never aggregates, distributions or KPIs.
    sample = clean.sample(n=min(5000, len(clean)), random_state=2026)
    scatter_columns = ["source_row", "hour", "distance_km", "duration_min", "fare_amount",
                       "total_amount", "pickup_longitude", "pickup_latitude", "origin_window"]
    sampled_rows = sample[scatter_columns].copy()
    for col in sampled_rows.select_dtypes(include="number").columns:
        sampled_rows[col] = sampled_rows[col].round(4)
    hist = []
    for lo, hi in zip(np.arange(0, 50, 1), np.arange(1, 51, 1)):
        hist.append({"lower": lo, "upper": hi, "trips": int((clean.distance_km.ge(lo) & clean.distance_km.lt(hi)).sum())})
    hist.append({"lower": 50, "upper": None, "trips": int(clean.distance_km.ge(50).sum())})
    # A deterministic checksum supports reproducibility and detects a changed upstream sample.
    result = {
        "schema_version": 1,
        "source": {"url": SOURCE_URL, "sha256": hashlib.sha256(input_path.read_bytes()).hexdigest(),
                   "rows": len(raw), "columns": len(raw.columns), "missing": raw.isna().sum().to_dict(),
                   "duplicates": int(raw.duplicated().sum()), "pickup_dates": sorted(df.day.dropna().unique()),
                   "clock": "New York local time (TLC wall clock; the +00:00 suffix is a format artefact)",
                   "distance_unit": "km", "duration_unit": "minute", "currency": "USD"},
        "quality": {"flags": flags.sum().to_dict(), "descriptive_statistics": descriptors,
                    "counts_overlap": True, "mobility_excluded": int((~mask).sum())},
        "raw_summary": summary(df), "mobility": summary(clean), "finance": financial_summary(finance),
        "hourly": hourly_with_coverage(clean, coverage),
        "coverage": {k: v for k, v in coverage.items() if k != "hours"},
        "periods": grouped(clean, "period").to_dict("records"),
        "distance_bands": grouped(clean, "distance_band").to_dict("records"),
        "hour_distance": grouped(clean, ["hour", "distance_band"]).to_dict("records"),
        "period_distance": grouped(clean, ["period", "distance_band"]).to_dict("records"),
        "same_distance": same_distance_comparison(geo),
        "concentration": concentration(clean), "spatial": spatial,
        "sensitivity": policy_sensitivity(df, flags), "distance_histogram": hist,
        "scatter": {"sampled": True, "seed": 2026, "population": len(clean),
                    "columns": scatter_columns, "rows": sampled_rows.to_numpy().tolist()},
    }
    result = jsonable(result)
    write_json(output_root / "data/analysis.json", result)
    ledger = df.loc[flags.any(axis=1), ["source_row", "tpep_pickup_datetime", "tpep_dropoff_datetime",
                    "trip_distance", "distance_km", "duration_min", "speed_kmh", "fare_amount", "total_amount"]].copy()
    ledger["mobility_eligible"] = mask.loc[ledger.index]
    ledger["flags"] = flags.loc[ledger.index].apply(lambda r: ";".join(r.index[r]), axis=1)
    ledger.to_csv(output_root / "data/quality_ledger.csv", index=False)
    (output_root / "reports").mkdir(parents=True, exist_ok=True)
    (output_root / "reports/analytical_evidence.md").write_text(make_report(result), encoding="utf-8")
    print(json.dumps({"raw": len(raw), "mobility": len(clean), "spatial": len(geo), "finance": len(finance),
                      "output": str(output_root), "matched_comparison": result["same_distance"]["od_adjustment"]}, indent=2))
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=ROOT / "data/raw.csv")
    parser.add_argument("--output-root", type=Path, default=ROOT)
    args = parser.parse_args()
    args.output_root.joinpath("data").mkdir(parents=True, exist_ok=True)
    run(args.input, args.output_root)
