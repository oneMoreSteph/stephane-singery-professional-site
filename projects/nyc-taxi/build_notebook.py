"""Write, execute and export the NYC Taxi analysis notebook.

The notebook is a real Jupyter notebook: this script writes its cells, runs them in a
Python kernel with nbconvert, then exports a standalone HTML copy.

    python projects/nyc-taxi/build_notebook.py
"""

from __future__ import annotations

import os
from pathlib import Path

import nbformat
from nbconvert import HTMLExporter
from nbconvert.preprocessors import ExecutePreprocessor
from nbformat.v4 import new_code_cell, new_markdown_cell, new_notebook

ROOT = Path(__file__).resolve().parent
NOTEBOOK = ROOT / "DataViz_SINGERY_2026_BDML2.ipynb"
HTML = ROOT / "reports/analytical_notebook.html"

cells = []


def md(text):
    cells.append(new_markdown_cell(text.strip("\n")))


def code(text):
    cells.append(new_code_cell(text.strip("\n")))


# ---------- reusable blocks, same look as the Machine Learning I reference notebook ----------
BOX = 'style="background-color: rgba(31, 119, 180, 0.05); border-left: 4px solid rgba(31, 119, 180, 0.55); border-radius: 4px; padding: 4px 16px;"'


def section(n, emoji, title, part, part_title):
    md(f"""
<a id="section-{n}"></a>

<div style="background-color: rgba(31, 119, 180, 0.14); border-left: 8px solid #1f77b4; border-radius: 6px; padding: 2px 16px; margin-top: 28px;">

## {emoji} {n}. {title}

</div>

<div style="background-color: rgba(26, 127, 100, 0.12); border: 2px solid #1a7f64; border-radius: 6px; padding: 2px 14px; margin-top: 6px; display: inline-block;">

🧭 **Part {part}** · {part_title}

</div>
""")


def sub(anchor, title, context=None):
    text = f'<a id="sub-{anchor}"></a>\n\n---\n\n### {title}\n'
    if context:
        text += f"\n<div {BOX}>\n\n{context.strip()}\n\n</div>\n"
    md(text)


def interp(text):
    md(f"""
<div style="background-color: rgba(210, 153, 34, 0.12); border-left: 4px solid #d29922; border-radius: 4px; padding: 4px 16px; margin-top: 8px;">

💡 **Interpretation.**
{text.strip()}

</div>
""")


def conclusion(n, number, goal, found, nxt):
    md(f"""
---

<a id="conclusion-{n}"></a>

<div style="background-color: rgba(130, 80, 223, 0.08); border-left: 6px solid #8250df; border-radius: 6px; padding: 4px 16px;">

### 🏁 {number} Conclusion

🎯 **Goal of the section**: {goal}

✅ **What we found.**
{found.strip()}

➡️ **Next.** {nxt}

</div>
""")


P1, P2, P3, P4 = "What data do we have?", "Which trips do we keep?", "When and where do people travel?", "What sets travel time and fares?"

# ---------------------------------------------------------------- title and guides
md("""
<div style="background-color: rgba(235, 104, 52, 0.12); border-left: 10px solid #eb6834; border-radius: 6px; padding: 6px 20px;">

# 🚕 NYC Taxi: one day, different journeys

<p style="font-size: 1.5em; font-weight: 600; margin: 0 0 8px 0;">Data exploration and visual storytelling</p>

</div>

<div style="margin-top: 10px; padding: 0 4px;">

🎓 **Data Visualisation & BI, ING2-BDML** | 🗂️ Dataset: NYC TLC yellow taxi trips, Kepler.gl sample, Thursday 15 January 2015 | ✍️ Stéphane Singery

</div>

<div style="background-color: rgba(130, 80, 223, 0.08); border-left: 6px solid #8250df; border-radius: 6px; padding: 4px 16px; margin-top: 14px;">

🎯 **Goal.** Read one day of New York taxi trips: when people travel, where they go, how long it takes and what it costs. Every chart comes with what it shows and how far it goes. All figures describe this sample of 97,986 trips.

</div>
""")

md("""
---

### 🧭 The four parts of the notebook

| Part | Question | Sections |
|---|---|---|
| **Part 1** | What data do we have? | [1–3](#section-1) |
| **Part 2** | Which trips do we keep? | [4](#section-4) |
| **Part 3** | When and where do people travel? | [5–7](#section-5) |
| **Part 4** | What sets travel time and fares? | [8–10](#section-8) |
| **Synthesis** | What does this day tell us? | [11](#section-11) |

The same rules run in `analyse.py`, which feeds the portfolio page. Notebook and website show the same numbers.
""")

md(f"""
---

### 📖 Vocabulary used in this notebook

<div {BOX}>

| Term | Meaning |
|---|---|
| 🚕 **Trip** | One row: one paid yellow-taxi journey, from the meter start to the meter stop. |
| 📏 **Distance** | `trip_distance`, measured by the taximeter in miles, converted to **km** (1 mile = 1.609344 km). |
| ⏱️ **Duration** | Drop-off time minus pickup time, in **minutes**. |
| 🏎️ **Speed** | Distance divided by duration, in **km/h**. It includes every stop of the journey. |
| 🕐 **Hour** | Pickup hour, **New York local time** ([section 3](#section-3)). |
| 🧱 **Time block** | A run of consecutive minutes present in the sample ([section 3](#section-3)). |
| 📊 **Median, P90** | The value that splits the trips in half; the value 90% of trips stay under. |
| 🗺️ **Window** | A fixed rectangle on the map (Midtown, JFK…). Bounds are in `analyse.py`. |
| 💵 **Fare, total** | `fare_amount` is the metered fare; `total_amount` adds tip, tolls and surcharges, in USD. |

</div>
""")

md("""
---

<a id="toc"></a>

### 📑 Table of contents

- <a href="#section-0">🧰 0. Setup</a>
- 🧭 **Part 1 · What data do we have?**
  - <a href="#section-1">📥 1. Loading the data</a>
  - <a href="#section-2">🧹 2. Is the data clean?</a>
  - <a href="#section-3">🕐 3. Which clock, which sample?</a>
- 🧭 **Part 2 · Which trips do we keep?**
  - <a href="#section-4">🚨 4. Outliers: errors or real trips?</a>
- 🧭 **Part 3 · When and where do people travel?**
  - <a href="#section-5">📏 5. How far do people travel?</a>
  - <a href="#section-6">⏰ 6. When do people travel?</a>
  - <a href="#section-7">🗺️ 7. Where do trips start and end?</a>
- 🧭 **Part 4 · What sets travel time and fares?**
  - <a href="#section-8">⏱️ 8. Duration against distance</a>
  - <a href="#section-9">🚦 9. Same distance, different time</a>
  - <a href="#section-10">💵 10. Many short trips, a few long ones</a>
- <a href="#section-11">🏁 11. What this day tells us</a>
""")

# ---------------------------------------------------------------- 0 setup
md("""
<a id="section-0"></a>

<div style="background-color: rgba(31, 119, 180, 0.14); border-left: 8px solid #1f77b4; border-radius: 6px; padding: 2px 16px; margin-top: 28px;">

## 🧰 0. Setup

</div>
""")
code("""
from pathlib import Path
import sys, hashlib, platform

import numpy as np
import pandas as pd
import plotly
import plotly.express as px
import plotly.graph_objects as go
import plotly.io as pio
from plotly.subplots import make_subplots
import missingno as msno
import matplotlib.pyplot as plt

# The notebook runs from the project folder or from the repository root.
PROJECT = Path.cwd() if (Path.cwd() / "analyse.py").exists() else Path.cwd() / "projects/nyc-taxi"
sys.path.insert(0, str(PROJECT))
import analyse as A  # cleaning rules and map windows shared with the website

DATA = PROJECT / "data/raw.csv"
pio.renderers.default = "plotly_mimetype+notebook"
pio.templates.default = "plotly_white"
pd.options.display.float_format = "{:,.2f}".format

BLUE, ORANGE, GREEN, GREY, PURPLE = "#1f77b4", "#eb6834", "#1a7f64", "#9aa4ad", "#8250df"
PERIOD_ORDER = [A.PERIOD_NAMES[p] for p in A.PERIODS]
PERIOD_COLORS = dict(zip(PERIOD_ORDER, ["#2c3e70", "#eb6834", "#d29922", "#c0392b", "#1f77b4"]))

print("Python", platform.python_version(), "| pandas", pd.__version__, "| plotly", plotly.__version__, "| missingno", msno.__version__)
""")

# ---------------------------------------------------------------- 1 loading
section(1, "📥", "Loading the data", 1, P1)
sub("1-1", "🗂️ 1.1 The source and its fields", """
The course prescribes one CSV published with Kepler.gl: [`nyctrips/data.csv`](https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/nyctrips/data.csv). Kepler.gl describes it as a sample of the [NYC Taxi & Limousine Commission (TLC) trip records](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page). The file sits unchanged in `data/raw.csv`.

| Column | Meaning (TLC dictionary) | Unit |
|---|---|---|
| `VendorID` | Company that supplied the record (1 or 2) | code |
| `tpep_pickup_datetime`, `tpep_dropoff_datetime` | Meter start and stop | date-time |
| `passenger_count` | Passengers declared by the driver | people |
| `trip_distance` | Distance on the taximeter | miles (shown in km) |
| `pickup_*`, `dropoff_*` `longitude`, `latitude` | GPS position at start and stop | degrees |
| `fare_amount` | Time-and-distance fare from the meter | USD |
| `tip_amount` | Card tips (cash tips are absent from the records) | USD |
| `total_amount` | Everything charged to the passenger | USD |
""")
code("""
raw = pd.read_csv(DATA)
print(f"{raw.shape[0]:,} rows × {raw.shape[1]} columns")
print("SHA-256:", hashlib.sha256(DATA.read_bytes()).hexdigest()[:16], "…")
raw.head()
""")
interp("""
- 📦 **97,986 trips and 12 columns.** One row is one trip.
- 🔢 Only 12 fields: payment type, rate code and tolls detail are absent. Questions on fares stop where these fields stop.
""")
sub("1-2", "🔎 1.2 Types and first statistics")
code("""
types = pd.DataFrame({"type": raw.dtypes.astype(str), "distinct values": raw.nunique(), "example": raw.iloc[0]})
display(types)
raw.describe().T[["min", "25%", "50%", "75%", "max"]]
""")
interp("""
- 🕐 The two timestamps are **text** with a `+00:00` suffix. We convert them before any time analysis ([section 3](#section-3)).
- 📏 Half the trips are under 1.7 miles (2.7 km), yet the maximum is **99.9 miles (160.8 km)**. From [section 2](#section-2) on, every distance is in km.
- 💵 Some fares and totals are **negative**, and the highest fare is **$495**.
- 👥 Some trips declare **0 passengers**.

👉 The middle of the data looks ordinary; its edges need checking.
""")
conclusion(1, "1.3", "Load the file and know what each column measures.", """
- 📦 **97,986 trips, 12 columns**, one sampled day of NYC yellow taxis.
- 📏 Units: km (converted from meter miles), minutes, US dollars.
- 🔎 Extreme values appear at both ends: 160.8 km, negative fares, 0 passengers.
""", "Check whether the data is complete and consistent.")

# ---------------------------------------------------------------- 2 clean
section(2, "🧹", "Is the data clean?", 1, P1)
sub("2-1", "🕳️ 2.1 Missing values with missingno", """
`missingno` draws one line per row and one column per field. A white gap would be a missing value.
""")
code("""
ax = msno.matrix(raw, figsize=(12, 4), fontsize=9, sparkline=False, color=(0.12, 0.47, 0.71))
ax.set_title("Missing values: one line per trip, one column per field", fontsize=12, loc="left")
plt.show()
print("Missing values:", raw.isna().sum().sum(), "| exact duplicate rows:", raw.duplicated().sum())
""")
interp("""
- ✅ **No missing value and no duplicate row.** Nothing needs imputation.
""")
sub("2-2", "🧩 2.2 Complete is not the same as consistent", """
A complete row can still describe an impossible trip. We compute **duration** and **speed**, then test each row against simple rules. The rules live in `analyse.py` (`flags_for`).
""")
code("""
raw, df = A.load_data(DATA)          # adds duration, speed, hour, distance band, map windows
flags = A.flags_for(raw, df)

checks = {
    "Distance of 0 km": flags.nonpositive_distance,
    "Duration of 0 minutes or less": flags.nonpositive_duration,
    "Duration above 2 hours": flags.duration_over_120_min,
    "Speed above 129 km/h (80 mph)": flags.speed_over_80_mph,
    "0 passengers": flags.zero_passengers,
    "Negative fare or total": flags.negative_fare_or_total,
    "Pickup or drop-off outside the NYC area": flags.pickup_outside_study_extent | flags.dropoff_outside_study_extent,
}
pd.DataFrame({"trips": {k: v.sum() for k, v in checks.items()},
              "share of trips (%)": {k: v.mean() * 100 for k, v in checks.items()}})
""")
code("""
# Two telling examples
cols = ["tpep_pickup_datetime", "tpep_dropoff_datetime", "distance_km", "duration_min", "fare_amount"]
display(df.loc[df.duration_min.le(0) & df.trip_distance.gt(0), cols])
long = df.loc[flags.duration_over_120_min]
print(f"Trips above 2 hours: {len(long)} | median duration {long.duration_min.median() / 60:.1f} h | median distance {long.distance_km.median():.1f} km")
""")
interp("""
- ⚡ One trip covers **16.3 km in 0 seconds**: pickup and drop-off share the same timestamp.
- 🕰️ The **77 trips above 2 hours** last a median **23.7 hours for 3.3 km**. The meter stayed on long after the ride.
- 🔢 These checks overlap and flag under 1% of trips. [Section 4](#section-4) decides case by case.
""")
conclusion(2, "2.3", "Check that the data is complete and consistent.", """
- ✅ **Complete:** no missing value, no duplicate.
- ⚠️ **Partly inconsistent:** 453 trips at 0 km, 77 above 2 hours, 48 above 129 km/h, 23 negative charges.
""", "Before cleaning, settle what the timestamps mean.")

# ---------------------------------------------------------------- 3 clock and sample
section(3, "🕐", "Which clock, which sample?", 1, P1)
sub("3-1", "🌍 3.1 New York time or UTC?", """
The timestamps end with `+00:00`, which reads as UTC. If that were true, 08:00 in the file would be 03:00 in New York. The answer decides every chart by hour.
""")
code("""
print("First pickup:", df.pickup_at.min(), "| last pickup:", df.pickup_at.max())
by_hour = df.groupby("hour").size()
print("Quietest hour:", by_hour.idxmin(), "h with", by_hour.min(), "trips | busiest morning hour:", by_hour.loc[5:11].idxmax(), "h")
""")
interp("""
Three facts point to **New York local time**:
- 📅 The pickups fill **exactly one calendar day, 00:01 to 23:59**. A New York day written in UTC would run from 05:00 to 04:59 the next day.
- 🌙 The quietest hour is **04:00** and the morning rush peaks at **08:00**: the shape of a city's day. In UTC, 04:00 would be 23:00 the evening before.
- 📘 TLC publishes its trip records in New York wall-clock time.

👉 `+00:00` is a formatting suffix added to the sample. We read every hour as **New York local time** (`analyse.load_data` sets the time zone to America/New_York).
""")
sub("3-2", "🧱 3.2 The sample is made of time blocks", """
A random sample of trips would cover every minute of the day. We count pickups minute by minute.
""")
code("""
minute = df.pickup_at.dt.hour * 60 + df.pickup_at.dt.minute
per_minute = minute.value_counts().reindex(range(1440), fill_value=0)
covered = per_minute.gt(0)
coverage = A.time_coverage(df)
print(f"Minutes with at least one pickup: {covered.sum()} of 1,440 ({covered.mean():.0%})")
print(f"Time blocks: {coverage['blocks']} | median block: {coverage['median_block_minutes']:.0f} min | longest gap: {coverage['longest_gap_minutes']} min")

# Which meter company (VendorID) fills each block?
block = np.cumsum(np.r_[1, np.diff(covered.astype(int).to_numpy()) != 0])[minute.to_numpy()]
companies = df.groupby(block).VendorID.nunique()
print(f"Blocks holding a single meter company: {companies.eq(1).sum()} of {len(companies)}")
starts = pd.Series(np.flatnonzero(np.diff(np.r_[0, covered.astype(int).to_numpy()]) == 1) // 60)
print("Blocks starting in each hour:", starts.value_counts().reindex(range(24), fill_value=0).to_dict())

times = pd.Timestamp("2015-01-15") + pd.to_timedelta(per_minute.index, unit="min")
print(f"Pickups in a kept minute: median {per_minute[covered].median():.0f}, max {per_minute.max()} at {per_minute.idxmax() // 60:02d}:{per_minute.idxmax() % 60:02d}")
fig = go.Figure()
fig.add_bar(x=times, y=np.where(covered, None, per_minute.max()), marker_color="rgba(154,164,173,.25)", marker_line_width=0,
            name="Minute absent from the sample", hovertemplate="%{x|%H:%M}<br>absent<extra></extra>")
fig.add_bar(x=times, y=np.where(covered, per_minute, None), marker_color=BLUE, marker_line_width=0,
            name="Minute in the sample", hovertemplate="%{x|%H:%M}<br>%{y} pickups<extra></extra>")
fig.update_layout(barmode="overlay", legend=dict(orientation="h", y=1.08))
fig.update_layout(title="Pickups per minute: the sample is a series of short time blocks",
                  xaxis=dict(title="Pickup time (New York)", tickformat="%H:%M"), yaxis_title="Pickups in the minute",
                  height=380, bargap=0)
fig.show()
""")
interp("""
- 🧱 Only **768 of 1,440 minutes** contain pickups. The sample is built from **163 blocks** of consecutive minutes, 4 minutes long at the median, separated by gaps.
- ⚠️ A raw count by hour therefore mixes two things: how busy the city was, and how many blocks fell in that hour.
- 🏢 **101 of the 163 blocks hold a single meter company** (`VendorID`). The sample is cut from each company's file, so a block shows part of the city's trips in those minutes.
- 🔢 Each hour rests on a few blocks: 5 to 11 from 07:00 to 23:00, one or two from 02:00 to 05:00.

👉 To compare hours, we divide trips by the minutes covered: **trips per covered minute**, and we read periods rather than single hours. Trip characteristics (distance, duration, fare) stay valid as they are.
""")
conclusion(3, "3.3", "Know which clock the hours use and how the sample was drawn.", """
- 🕐 **Hours are New York local time.** The `+00:00` suffix is formatting.
- 🧱 **The sample is 163 time blocks** covering 53% of the minutes of the day.
- 📐 Hourly activity is measured as **trips per covered minute**.
""", "Decide which unusual trips to keep.")

# ---------------------------------------------------------------- 4 outliers
section(4, "🚨", "Outliers: errors or real trips?", 2, P2)
sub("4-1", "📦 4.1 What the IQR rule flags", """
The IQR rule flags any value beyond $Q_1 - 1.5 \\times IQR$ or $Q_3 + 1.5 \\times IQR$, with $IQR = Q_3 - Q_1$. It is a standard first screen. We test it on distance, duration and fare.
""")
code("""
fences = []
for col, label in [("distance_km", "Distance (km)"), ("duration_min", "Duration (min)"), ("fare_amount", "Fare (USD)")]:
    q1, q3 = df[col].quantile([.25, .75])
    upper = q3 + 1.5 * (q3 - q1)
    fences.append({"measure": label, "Q1": q1, "Q3": q3, "upper fence": upper,
                   "trips above": (df[col] > upper).sum(), "share (%)": (df[col] > upper).mean() * 100})
display(pd.DataFrame(fences).set_index("measure"))

airport = df.origin_window.isin(["JFK vicinity", "LaGuardia vicinity"]) | df.destination_window.isin(["JFK vicinity", "LaGuardia vicinity"])
fig = go.Figure()
for name, mask, color in [("Airport trips", airport, ORANGE), ("Other trips", ~airport, BLUE)]:
    fig.add_trace(go.Box(x=df.loc[mask & df.distance_km.le(65), "distance_km"], name=name, marker_color=color,
                         boxpoints="suspectedoutliers", hoverinfo="x"))
fig.add_vline(x=fences[0]["upper fence"], line_dash="dash", line_color="black",
              annotation_text=f"IQR fence {fences[0]['upper fence']:.1f} km")
fig.update_layout(title="Airport trips sit almost entirely beyond the distance fence", xaxis_title="Trip distance (km)",
                  height=330, showlegend=False)
fig.show()
""")
interp("""
- 🚩 The fence on distance is **9.9 km** and flags **10,125 trips** (10%). Most airport trips are among them.
- ✈️ A 27 km ride from JFK to Manhattan is a normal taxi trip. Deleting it would erase the airport market.

👉 **The IQR rule flags; the fields decide.** We remove only trips whose own fields contradict each other.
""")
sub("4-2", "⚖️ 4.2 Case-by-case decisions")
code("""
rules = [
    ("Distance of 0 km", df.trip_distance.le(0), "Nothing to measure on the meter"),
    ("Duration of 0 minutes or less", df.duration_min.le(0), "Speed and duration cannot be computed"),
    ("Duration above 2 hours", df.duration_min.gt(120), "Median 23.7 h for 3.3 km: meter left running"),
    ("Speed above 129 km/h (80 mph)", df.speed_mph.gt(80), "Beyond any city speed: distance or time is wrong"),
    ("160.8 km (99.9 miles) for a $2.50 fare", flags.reviewed_99_9_miles_low_fare, "Placeholder distance, contradicted by the fare"),
]
left = pd.Series(True, index=df.index)
table = []
for label, cond, why in rules:
    table.append({"rule": label, "trips removed": (left & cond).sum(), "decision": "Remove", "reason": why})
    left &= ~cond
for label, why in [("0 passengers", "Distance and time are valid; the count is a driver entry"),
                   ("Negative or zero charge", "Valid journey; left out of fare sums only"),
                   ("Long airport and suburban trips", "Real trips")]:
    table.append({"rule": label, "trips removed": 0, "decision": "Keep", "reason": why})
display(pd.DataFrame(table).set_index("rule"))

keep = A.mobility_mask(df, flags)
clean = df.loc[keep].copy()
clean["period_name"] = clean.period.map(A.PERIOD_NAMES).astype(str)
print(f"Kept {len(clean):,} of {len(df):,} trips ({len(clean) / len(df):.1%}); removed {len(df) - len(clean)}")
""")
interp("""
- 🗑️ **578 trips removed (0.6%)**, each for a reason found in its own fields.
- ✅ Long trips, airport trips and 0-passenger trips stay. Trips with negative charges stay for time and distance, and leave the fare sums.
""")
sub("4-3", "🧪 4.3 Do the results depend on the thresholds?", """
The 2-hour and 129 km/h limits are choices. We rerun the key numbers with stricter and looser limits.
""")
code("""
sens = pd.DataFrame(A.policy_sensitivity(df, flags)).set_index("policy")
sens[["trips", "median_km", "median_minutes", "mean_minutes", "short_share_pct", "period_a_1_2mi_median", "period_b_1_2mi_median"]].rename(columns={
    "short_share_pct": "% trips ≤ 3.2 km", "period_a_1_2mi_median": "1.6–3.2 km median, night (min)", "period_b_1_2mi_median": "1.6–3.2 km median, midday (min)"})
""")
interp("""
- ✅ From 60 min / 97 km/h to 180 min / 161 km/h, the **medians, the short-trip share and the night/midday gap barely move**.
- ⚠️ Only the **mean duration** reacts, because it follows the meters left running. We report medians.
""")
conclusion(4, "4.4", "Decide which unusual trips to remove, and check that the choice leaves the results stable.", """
- 🚩 **IQR flags 10% of trips on distance**, mostly real airport trips: a screen, not a verdict.
- 🗑️ **578 trips removed (0.6%)** for internal contradictions. **97,408 trips kept.**
- 🧪 The findings hold across five threshold settings.
""", "Describe the journeys: distance first.")

# ---------------------------------------------------------------- 5 distance
section(5, "📏", "How far do people travel?", 3, P3)
sub("5-1", "📊 5.1 Distance histogram")
code("""
fig = px.histogram(clean.loc[clean.distance_km.le(40)], x="distance_km", nbins=80, color_discrete_sequence=[BLUE])
for value, name, color, pos in [(clean.distance_km.median(), "median", ORANGE, "top left"), (clean.distance_km.mean(), "mean", PURPLE, "top right")]:
    fig.add_vline(x=value, line_dash="dash", line_color=color, annotation_text=f"{name} {value:.2f} km",
                  annotation_font_color=color, annotation_position=pos)
fig.update_traces(hovertemplate="%{x} km<br>%{y:,} trips<extra></extra>")
fig.update_layout(title="Most trips are short; a long tail reaches the airports", xaxis_title="Trip distance (km, up to 40)",
                  yaxis_title="Trips", height=400, bargap=.05)
fig.show()
print(f"Trips over 40 km, outside the view: {clean.distance_km.gt(40).sum()}")
""")
code("""
bands = clean.groupby("distance_band", observed=True).agg(trips=("trip_distance", "size"), median_minutes=("duration_min", "median"), median_fare=("fare_amount", "median"))
bands["share (%)"] = bands.trips / bands.trips.sum() * 100
bands["cumulative (%)"] = bands["share (%)"].cumsum()
bands.rename_axis("distance band (km)")
""")
interp("""
- 🚶 **59% of trips are 3.2 km or less**; the median trip is **2.72 km** and **10.6 minutes**.
- 📈 The mean (**4.59 km**) sits well above the median: a long right tail pulls it up.
- ✈️ A second bump near **27–32 km** is the airport traffic seen in [section 4](#section-4).
""")
conclusion(5, "5.2", "Describe the distribution of trip distances.", """
- 🚶 **Short trips dominate**: median 2.72 km, 59% under 3.2 km.
- ✈️ **A long tail**, with a bump at airport distances, pulls the mean to 4.59 km.
""", "See when these trips happen.")

# ---------------------------------------------------------------- 6 time
section(6, "⏰", "When do people travel?", 3, P3)
sub("6-1", "📈 6.1 Trips by hour, corrected for the time blocks", """
The left panel is the raw count. The right one divides by the minutes covered in each hour ([section 3.2](#sub-3-2)).
""")
code("""
hourly = clean.groupby("hour").agg(trips=("distance_km", "size"), median_km=("distance_km", "median"),
                                   median_kmh=("speed_kmh", "median"), median_minutes=("duration_min", "median"))
hourly["covered_minutes"] = covered.groupby(np.arange(1440) // 60).sum()
hourly["trips_per_covered_minute"] = hourly.trips / hourly.covered_minutes
hourly["period"] = pd.cut(hourly.index, [-1, 5, 9, 15, 19, 23], labels=PERIOD_ORDER)

fig = make_subplots(rows=1, cols=2, subplot_titles=("Raw trips per hour", "Trips per covered minute"), horizontal_spacing=.08)
colors = hourly.period.map(PERIOD_COLORS)
fig.add_bar(x=hourly.index, y=hourly.trips, marker_color=colors, row=1, col=1, showlegend=False,
            customdata=hourly.covered_minutes, hovertemplate="%{x}:00<br>%{y:,} trips<br>%{customdata} minutes covered<extra></extra>")
fig.add_bar(x=hourly.index, y=hourly.trips_per_covered_minute, marker_color=colors, row=1, col=2, showlegend=False,
            hovertemplate="%{x}:00<br>%{y:.0f} trips per covered minute<extra></extra>")
for name, color in PERIOD_COLORS.items():
    fig.add_scatter(x=[None], y=[None], mode="markers", marker=dict(color=color, size=10, symbol="square"), name=name)
fig.update_xaxes(title_text="Pickup hour (New York)", dtick=2)
fig.update_layout(title="The city wakes at 6, works at a steady pace, and peaks in the evening", height=420,
                  legend=dict(orientation="h", y=-0.25))
fig.show()
hourly[["trips", "covered_minutes", "trips_per_covered_minute"]].T
""")
interp("""
- 🌙 **Night low**: 19 trips per covered minute at 04:00.
- 🌅 **Morning rush**: the rate climbs from 06:00 to **155 at 08:00**.
- 🏙️ **Midday plateau**: 120 to 160 from 09:00 to 18:00.
- 🔢 Single hours rest on a few blocks ([section 3.2](#sub-3-2)), so hour-to-hour steps of 20 to 30 trips a minute are within the sampling noise. The contrasts between periods hold.
- 🌃 **Evening peak**: 170 to **186 at 22:00**. Thursday evening is the busiest time of this sample.
- ⚖️ The correction matters for single hours: 16:00 has 6,041 raw trips against 4,002 at 17:00, but 16:00 also covers 45 minutes against 33.
""")
sub("6-2", "🏎️ 6.2 Different hours, different trips")
code("""
fig = make_subplots(specs=[[{"secondary_y": True}]])
fig.add_scatter(x=hourly.index, y=hourly.median_kmh, name="Median speed (km/h)", line=dict(color=ORANGE, width=3),
                hovertemplate="%{x}:00<br>%{y:.1f} km/h<extra></extra>")
fig.add_scatter(x=hourly.index, y=hourly.median_km, name="Median distance (km)", line=dict(color=BLUE, width=3, dash="dot"),
                secondary_y=True, hovertemplate="%{x}:00<br>%{y:.2f} km<extra></extra>")
fig.update_yaxes(title_text="Median speed (km/h)", rangemode="tozero")
fig.update_yaxes(title_text="Median distance (km)", secondary_y=True, rangemode="tozero")
fig.update_layout(title="From night to midday, taxis drive twice as slowly", xaxis=dict(title="Pickup hour (New York)", dtick=2),
                  height=400, legend=dict(orientation="h", y=-0.2))
fig.show()
clean.groupby("period_name").agg(trips=("hour", "size"), median_km=("distance_km", "median"),
                                 median_minutes=("duration_min", "median"), median_kmh=("speed_kmh", "median")).loc[PERIOD_ORDER]
""")
interp("""
- 🏎️ **Median speed halves**: 31 km/h at 04:00, about 13 km/h from 09:00 to 15:00.
- 📏 **Night trips are longer** (3.67 km at the median) yet shorter in time (8.9 min) than midday trips (2.40 km, 11.6 min).
- 👉 A busy hour brings more trips **and** slower ones. [Section 9](#section-9) checks whether distance and places explain the slowdown.
""")
conclusion(6, "6.3", "Find when trips happen and how the trips change across the day.", """
- ⏰ **Four moments**: night low, morning rush from 06:00, a midday plateau, an evening peak at 22:00.
- 🏎️ **Speed halves from night to midday**, while trips get shorter.
""", "Place the trips on the map.")

# ---------------------------------------------------------------- 7 map
section(7, "🗺️", "Where do trips start and end?", 3, P3)
sub("7-1", "📍 7.1 Pickups across the day", """
We group pickups into cells of about 1 km. Press ▶ or move the slider to go through the five periods; hover a cell for its count. The maps keep trips with both GPS points in the NYC area and a straight line shorter than the meter distance.
""")
code("""
spatial, geo = A.spatial_analysis(clean, flags)
geo = geo.copy()
geo["period_name"] = geo.period.map(A.PERIOD_NAMES).astype(str)
print(f"Trips on the maps: {len(geo):,} of {len(clean):,}")

def cells(frame, side, by=("period_name",)):
    gx = np.floor((frame[f"{side}_longitude"] + 74.3) * 84.3)
    gy = np.floor((frame[f"{side}_latitude"] - 40.45) * 111.2)
    out = frame.assign(gx=gx, gy=gy).groupby([*by, "gx", "gy"]).size().rename("trips").reset_index()
    out["lon"], out["lat"] = -74.3 + (out.gx + .5) / 84.3, 40.45 + (out.gy + .5) / 111.2
    return out

pick = cells(geo, "pickup")
pick["period_name"] = pd.Categorical(pick.period_name, PERIOD_ORDER)
pick = pick.sort_values("period_name")
fig = px.scatter_map(pick, lat="lat", lon="lon", size="trips", color="trips", animation_frame="period_name",
                     color_continuous_scale="YlOrRd", range_color=[0, pick.trips.quantile(.99)], size_max=22,
                     zoom=10.3, center={"lat": 40.74, "lon": -73.93}, map_style="carto-positron",
                     hover_data={"trips": True, "lat": False, "lon": False, "period_name": False})
fig.update_layout(title="Pickups by 1 km cell: Manhattan all day, airports from midday", height=600,
                  coloraxis_colorbar_title="Pickups")
fig.show()
""")
interp("""
- 🏙️ **Manhattan below Central Park** concentrates pickups in every period, Midtown first.
- ✈️ **JFK and LaGuardia** light up from midday to evening, when flights land.
- 🌙 At night the activity contracts to Midtown, Downtown and the nightlife areas.
""")
sub("7-2", "↔️ 7.2 Where more trips end than start", """
For each cell: drop-offs minus pickups over the whole day. Blue cells receive more trips than they send; red cells send more than they receive. Cells with fewer than 30 trips are hidden.
""")
code("""
p = cells(geo, "pickup", by=()).set_index(["gx", "gy"])
d = cells(geo, "dropoff", by=()).set_index(["gx", "gy"])
net = p[["lon", "lat"]].combine_first(d[["lon", "lat"]])
net["pickups"] = p.trips.reindex(net.index, fill_value=0)
net["dropoffs"] = d.trips.reindex(net.index, fill_value=0)
net["net"], net["volume"] = net.dropoffs - net.pickups, net.dropoffs + net.pickups
net = net.loc[net.volume.ge(30)].reset_index()
lim = net.net.abs().quantile(.98)
fig = px.scatter_map(net, lat="lat", lon="lon", color="net", size="volume", size_max=18, range_color=[-lim, lim],
                     color_continuous_scale="RdBu", zoom=10.3, center={"lat": 40.74, "lon": -73.93}, map_style="carto-positron",
                     hover_data={"pickups": True, "dropoffs": True, "net": True, "volume": False, "lat": False, "lon": False})
fig.update_layout(title="Midtown sends trips out; residential areas receive them", height=600,
                  coloraxis_colorbar_title="Drop-offs − pickups")
fig.show()

balance = pd.DataFrame(spatial["window_balance"]).set_index("window")
balance["drop-offs per pickup"] = balance.dropoffs / balance.pickups
balance
""")
interp("""
- 🔴 **Midtown sends more than it receives**: 50,904 pickups for 46,043 drop-offs (0.90 drop-off per pickup).
- 🔵 **Uptown and the outer areas receive**: Uptown has 1.15 drop-offs per pickup. Taxis carry people from the centre towards where they live.
- ✈️ **The airports send more than they receive**: arriving travellers take a cab; departing ones arrive by many means.
""")
sub("7-3", "✈️ 7.3 The airport trips")
code("""
air = pd.DataFrame(spatial["airport_comparisons"])
air = air[["window", "direction", "trips", "median_km", "median_minutes", "p90_minutes", "financial_median_fare_usd", "financial_median_total_usd"]]
air.columns = ["airport", "direction", "trips", "median km", "median min", "P90 min", "median fare ($)", "median total ($)"]
display(air.set_index(["airport", "direction"]))

jfk = geo.loc[(geo.origin_window.eq("JFK vicinity") | geo.destination_window.eq("JFK vicinity")) & geo.fare_amount.gt(0)]
fig = px.histogram(jfk.loc[jfk.fare_amount.le(90)], x="fare_amount", nbins=90, color_discrete_sequence=[ORANGE])
fig.update_traces(hovertemplate="$%{x}<br>%{y:,} trips<extra></extra>")
fig.update_layout(title="JFK trips: one fare stands out, $52", xaxis_title="Metered fare (USD)", yaxis_title="Trips", height=330)
fig.show()
print(f"JFK trips at exactly $52: {jfk.fare_amount.eq(52).sum():,} of {len(jfk):,} ({jfk.fare_amount.eq(52).mean():.0%})")
""")
interp("""
- ✈️ **JFK trips** run about 28 km and 40 minutes at the median; **LaGuardia** trips about 16 km and 27 minutes.
- 💵 **$52 is the 2015 flat fare between JFK and Manhattan.** **70% of JFK trips** pay exactly $52, whatever the duration.
- 🕰️ Trips **to JFK** have a longer slow tail (P90 81 min against 62 min from JFK).
""")
conclusion(7, "7.4", "Find where trips start and end, and which places behave differently.", """
- 🏙️ **Midtown is the engine**: about half of all pickups.
- ↔️ **Flows go from the centre outwards**: Midtown sends, Uptown and residential areas receive.
- ✈️ **Airports are a separate market**: long trips, a $52 flat fare from JFK.
""", "Explain travel time.")

# ---------------------------------------------------------------- 8 scatter
section(8, "⏱️", "Duration against distance", 4, P4)
sub("8-1", "🔵 8.1 Each point is a trip", """
5,000 trips drawn at random (seed 2026) keep the chart readable; every other figure uses all trips. Hover a point for its details; click a period in the legend to hide it.
""")
code("""
sample = clean.sample(5000, random_state=2026)
fig = px.scatter(sample.loc[sample.distance_km.le(40) & sample.duration_min.le(90)], x="distance_km", y="duration_min",
                 color="period_name", category_orders={"period_name": PERIOD_ORDER}, color_discrete_map=PERIOD_COLORS, opacity=.55,
                 hover_data={"source_row": True, "hour": True, "fare_amount": ":$.2f", "total_amount": ":$.2f",
                             "speed_kmh": ":.1f", "distance_km": ":.2f", "duration_min": ":.1f", "period_name": False},
                 labels={"distance_km": "Distance (km)", "duration_min": "Duration (min)", "period_name": "Period",
                         "source_row": "CSV row", "fare_amount": "Fare", "total_amount": "Total", "speed_kmh": "km/h"})
fig.update_traces(marker_size=5)
fig.update_layout(title="Duration grows with distance, and spreads more at midday", height=520)
fig.show()
links = clean[["distance_km", "duration_min", "fare_amount"]]
print("Pearson   distance–duration:", round(links.corr().loc["distance_km", "duration_min"], 2),
      "| distance–fare:", round(links.corr().loc["distance_km", "fare_amount"], 2),
      "| duration–fare:", round(links.corr().loc["duration_min", "fare_amount"], 2))
# Spearman ranks the values: it captures links that are monotonic but not straight lines
print("Spearman  distance–duration:", round(links.corr("spearman").loc["distance_km", "duration_min"], 2),
      "| distance–fare:", round(links.corr("spearman").loc["distance_km", "fare_amount"], 2),
      "| duration–fare:", round(links.corr("spearman").loc["duration_min", "fare_amount"], 2))
""")
interp("""
- 📈 On values (Pearson), the fare follows distance (**0.95**) more than duration (0.86). On ranks (Spearman), duration leads (**0.96** against 0.94): long trips pull Pearson towards distance.
- 💵 The meter charges **both**: each distance step and each slow minute. Neither alone sets the fare.
- 🎨 At the same distance, **midday points (yellow) sit higher** than night points (dark blue): the same trip takes longer.
- ⬆️ The spread widens with distance: an 8 km trip takes 15 to 45 minutes.
""")
conclusion(8, "8.2", "Relate duration to distance trip by trip.", """
- 💵 **The fare follows distance and time together**; distance only partly sets the duration.
- 🕐 **The hour adds a visible gap** at equal distance.
""", "Measure that gap with like-for-like trips.")

# ---------------------------------------------------------------- 9 same distance
section(9, "🚦", "Same distance, different time", 4, P4)
sub("9-1", "📉 9.1 Duration by hour, within each distance band", """
Pick a band with the buttons. The line is the median; the shaded area runs from P10 to P90. Hours with fewer than 30 trips in the band are hidden.
""")
code("""
hd = clean.groupby(["distance_band", "hour"], observed=True).duration_min.agg(
    median="median", p10=lambda s: s.quantile(.1), p90=lambda s: s.quantile(.9), trips="size").reset_index()
hd = hd.loc[hd.trips.ge(30)]
band_list = A.DISTANCE_LABELS[:5]
fig = go.Figure()
for band in band_list:
    b = hd.loc[hd.distance_band.eq(band)]
    visible = band == "1.6–3.2"
    fig.add_scatter(x=list(b.hour) + list(b.hour[::-1]), y=list(b.p90) + list(b.p10[::-1]), fill="toself",
                    fillcolor="rgba(31,119,180,.15)", line=dict(width=0), hoverinfo="skip", name="P10–P90", visible=visible)
    fig.add_scatter(x=b.hour, y=b["median"], mode="lines+markers", line=dict(color=BLUE, width=3), name="Median", visible=visible,
                    customdata=b[["p10", "p90", "trips"]],
                    hovertemplate="%{x}:00<br>median %{y:.1f} min<br>P10 %{customdata[0]:.1f} · P90 %{customdata[1]:.1f}<br>%{customdata[2]:,} trips<extra></extra>")
buttons = [dict(label=f"{band} km", method="update", args=[{"visible": [j // 2 == i for j in range(2 * len(band_list))]}])
           for i, band in enumerate(band_list)]
fig.update_layout(updatemenus=[dict(buttons=buttons, active=1, direction="right", x=0, y=1.13, showactive=True)],
                  title=dict(text="A 1.6–3.2 km trip takes 6 minutes at night and 11 at midday", y=.97),
                  xaxis=dict(title="Pickup hour (New York)", dtick=2), yaxis=dict(title="Duration (min)", rangemode="tozero"),
                  height=450, margin=dict(t=110))
fig.show()
""")
interp("""
- 🕐 For **1.6–3.2 km trips**, the median goes from **6.4 min** at night (00–05) to **11.1 min** at midday (10–15).
- 📈 The slow tail grows too: P90 rises from 9.3 to 18.2 min. Midday trips are slower **and** less predictable.
- 🔁 Every band shows the same shape.
""")
sub("9-2", "🧭 9.2 Same places, same distance", """
Night and midday trips may differ in where they go. We keep only trips from the same 2 km origin cell to the same 2 km destination cell, with the same 0.4 km of distance, and at least 5 trips in each period. Then we compare their medians, weighted by the number of trips in each group.
""")
code("""
same = A.same_distance_comparison(geo)["od_adjustment"]
pd.Series({
    "Matched groups (same origin, destination, distance)": same["shared_strata"],
    "Night trips matched": f"{same['a_matched_rows']:,} ({same['a_coverage_pct']:.0f}% of night 1.6–3.2 km trips)",
    "Midday trips matched": f"{same['b_matched_rows']:,} ({same['b_coverage_pct']:.0f}% of midday 1.6–3.2 km trips)",
    "Night median duration (min)": round(same["a_weighted_minutes"], 1),
    "Midday median duration (min)": round(same["b_weighted_minutes"], 1),
}, name="like-for-like comparison").to_frame()
""")
interp("""
- ✅ With the same origin, destination and distance, the gap stays: **6.1 min at night, 11.8 min at midday**.
- 🚦 Places and distance leave the gap intact. What remains is the state of the streets: traffic, lights, pedestrians, deliveries.
""")
conclusion(9, "9.3", "Check whether the hour still changes travel time once trips are comparable.", """
- 🚦 **A 1.6–3.2 km trip takes nearly twice as long at midday**, for the same places and the same distance.
- 📈 Midday adds a **longer slow tail**: harder to plan.
""", "Weigh short and long trips in money and time.")

# ---------------------------------------------------------------- 10 concentration
section(10, "💵", "Many short trips, a few long ones", 4, P4)
sub("10-1", "📊 10.1 Share of trips, km, minutes and charges", """
Counted on trips with a positive fare and total (97,378 trips), so every share uses the same base.
""")
code("""
conc = pd.DataFrame(A.concentration(clean)["segments"]).set_index("segment")
shares = conc[["trip_share_pct", "km_share_pct", "minute_share_pct", "charge_share_pct"]]
shares.columns = ["Trips", "Km", "Trip-minutes", "Charges"]
fig = go.Figure()
for segment, color in [("At most 3.2 km", BLUE), ("Over 8 km", ORANGE)]:
    fig.add_bar(x=shares.columns, y=shares.loc[segment], name=segment, marker_color=color,
                text=shares.loc[segment].map("{:.0f}%".format), textposition="outside",
                hovertemplate="%{x}: %{y:.1f}%<extra>" + segment + "</extra>")
fig.update_layout(title="Short trips are the volume; long trips are half the km", yaxis=dict(title="Share of the day (%)", range=[0, 70]),
                  barmode="group", height=420, legend=dict(orientation="h", y=-0.15))
fig.show()
shares
""")
interp("""
- 🚶 **Trips of 3.2 km or less**: 59% of trips, but 23% of km and 36% of charges.
- 🛣️ **Trips over 8 km**: 13% of trips, but **47% of km** and 35% of charges.
- 👉 A trip count alone hides where the distance and much of the money are.
""")
conclusion(10, "10.2", "Compare the weight of short and long trips.", """
- 🚶 **Short trips make the volume.**
- 🛣️ **Long trips make the distance**, and an equal share of the money.
""", "Bring everything together.")

# ---------------------------------------------------------------- 11 synthesis
md("""
<a id="section-11"></a>

<div style="background-color: rgba(31, 119, 180, 0.14); border-left: 8px solid #1f77b4; border-radius: 6px; padding: 2px 16px; margin-top: 28px;">

## 🏁 11. What this day tells us

</div>

<div style="background-color: rgba(130, 80, 223, 0.08); border-left: 6px solid #8250df; border-radius: 6px; padding: 4px 16px;">

| Question | Answer in this sample | Evidence |
|---|---|---|
| 🧹 Is the data usable? | Complete, with 0.6% contradictory trips removed case by case | [2](#section-2), [4](#section-4) |
| 🕐 Which clock, which sample? | New York time; 163 time blocks covering 53% of the minutes | [3](#section-3) |
| 📏 How far? | Median 2.72 km; 59% under 3.2 km; an airport tail | [5](#section-5) |
| ⏰ When? | Night low, morning rush, steady midday, evening peak at 22:00 | [6](#section-6) |
| 🗺️ Where? | Midtown sends, residential areas receive; airports are their own market | [7](#section-7) |
| 🚦 How long? | A 1.6–3.2 km trip takes 6 min at night, 11–12 at midday, same places included | [8](#section-8), [9](#section-9) |
| 💵 What weight? | Short trips are 59% of trips; long trips 47% of km | [10](#section-10) |

**The story.** New York's taxis serve a centre that sends people outwards. Most trips are short hops, and a few long ones carry half the distance. The hour changes everything: the same trip takes twice as long at midday as at night.

**How far it goes.** One Thursday in January, sampled in time blocks. Confirming these patterns takes more days, the sampling method, and the fields this file lacks (payment type, rate code, tolls).

</div>
""")
code("""
print("Source:", A.SOURCE_URL)
print("SHA-256:", hashlib.sha256(DATA.read_bytes()).hexdigest())
print(f"Trips: raw {len(raw):,} | kept {len(clean):,} | on the maps {len(geo):,}")
""")


def build():
    nb = new_notebook(cells=cells, metadata={
        "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
        "language_info": {"name": "python"}})
    os.environ.setdefault("MPLBACKEND", "module://matplotlib_inline.backend_inline")
    ExecutePreprocessor(timeout=600, kernel_name="python3").preprocess(nb, {"metadata": {"path": str(ROOT)}})
    nbformat.write(nb, NOTEBOOK)
    # The browser tab of the HTML copy shows the project's name.
    body, _ = HTMLExporter(template_name="lab").from_notebook_node(
        nb, resources={"metadata": {"name": "NYC Taxi: one day, different journeys · Stéphane Singery"}})
    HTML.parent.mkdir(parents=True, exist_ok=True)
    HTML.write_text(body, encoding="utf-8")
    print(f"Wrote {NOTEBOOK.name} ({len(nb.cells)} cells) and {HTML.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
