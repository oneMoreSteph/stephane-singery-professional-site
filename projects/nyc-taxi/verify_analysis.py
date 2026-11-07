"""Check exported populations against raw records and independent count conservation."""
from pathlib import Path
import csv
import hashlib
import json
import math

ROOT = Path(__file__).resolve().parent


def main():
    evidence = json.loads((ROOT / "data/analysis.json").read_text())
    with (ROOT / "data/raw.csv").open(newline="") as f:
        source_rows = list(csv.DictReader(f))
    assert len(source_rows) == evidence["source"]["rows"], "Source row count changed"
    assert hashlib.sha256((ROOT / "data/raw.csv").read_bytes()).hexdigest() == evidence["source"]["sha256"], "Source checksum changed"
    assert sum(not r["trip_distance"] or not r["tpep_pickup_datetime"] for r in source_rows) == 0
    mobility = evidence["mobility"]["trips"]
    for grouping in ["hourly", "periods", "distance_bands", "hour_distance", "period_distance", "distance_histogram"]:
        assert sum(r["trips"] for r in evidence[grouping]) == mobility, f"Lost or duplicated records in {grouping}"
    spatial = evidence["spatial"]["trips"]
    assert sum(r["trips"] for r in evidence["spatial"]["flows"]) == spatial
    assert sum(r["pickups"] for r in evidence["spatial"]["window_balance"]) == spatial
    assert sum(r["dropoffs"] for r in evidence["spatial"]["window_balance"]) == spatial
    for side in ["pickup", "dropoff"]:
        assert sum(r[4] for r in evidence["spatial"]["grid"] if r[0] == side) == spatial
    assert sum(r["net_dropoffs_minus_pickups"] for r in evidence["spatial"]["window_balance"]) == 0
    assert evidence["finance"]["trips"] == evidence["concentration"]["denominator_trips"]
    assert len(evidence["scatter"]["rows"]) == 5000
    assert len({r[0] for r in evidence["scatter"]["rows"]}) == 5000
    for segment in evidence["concentration"]["segments"]:
        for key in ["trip_share_pct", "km_share_pct", "minute_share_pct", "charge_share_pct"]:
            assert 0 <= segment[key] <= 100
    for r in evidence["hour_distance"]:
        assert r["p10_minutes"] <= r["median_minutes"] <= r["p90_minutes"]
    assert math.isclose(sum(r["km"] for r in evidence["hourly"]), evidence["mobility"]["km"], abs_tol=.001)
    for r in evidence["scatter"]["rows"]:
        assert int(r[0]) >= 2 and int(r[0]) <= len(source_rows) + 1
        original = source_rows[int(r[0]) - 2]
        assert math.isclose(float(original["trip_distance"]) * 1.609344, r[2], abs_tol=1e-3), "Scatter row lost source alignment"
    notebook_path = ROOT / "DataViz_SINGERY_2026_BDML2.ipynb"
    if notebook_path.exists():
        notebook = json.loads(notebook_path.read_text())
        code = [cell for cell in notebook["cells"] if cell["cell_type"] == "code"]
        assert all(cell["execution_count"] is not None for cell in code)
        assert not any(out["output_type"] == "error" for cell in code for out in cell["outputs"])
        assert any("image/png" in out.get("data", {}) for cell in code for out in cell["outputs"]), "Missing missingno output"
        assert any("application/vnd.plotly.v1+json" in out.get("data", {}) for cell in code for out in cell["outputs"]), "Missing Plotly output"
    print("PASS: source checksum, population conservation, grid and flow totals, metric ranges, source-row alignment, executed outputs.")


if __name__ == "__main__":
    main()
