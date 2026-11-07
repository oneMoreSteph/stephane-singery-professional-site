# NYC Taxi — Demand, Time & Space

EFREI · Data Visualization & BI · Stéphane Singery

An investigation of one sampled pickup date: trip mix, geographical roles,
travel-time variability and the contribution of different journeys to recorded
distance, trip-minutes and charges. Every conclusion describes the supplied sample.

## Read the work

- **Portfolio:** `/courses/nyc-taxi/`; enter through the cockpit's Courses link, then Data Visualisation & BI.
- **Executed notebook:** [DataViz_SINGERY_2026_BDML2.ipynb](DataViz_SINGERY_2026_BDML2.ipynb).
- **Interactive HTML export:** [reports/analytical_notebook.html](reports/analytical_notebook.html).
  Download and open it in a browser. Plotly is embedded; the map basemap requires internet.
- **Evidence and decisions:** [reports/analytical_evidence.md](reports/analytical_evidence.md).
- **Record-level audit:** [data/quality_ledger.csv](data/quality_ledger.csv).

## Question and progression

How does mobility change across this sampled day, and which combinations of time,
geography and trip characteristics accompany differences in activity, duration and charges?

1. Establish the source, measurements, completeness and eligibility rules.
2. Examine distance distributions and the composition of hourly activity.
3. Compare origins, destinations, flows and airport-vicinity groups.
4. Compare median and upper-tail durations within distance bands.
5. Match geography and narrower distance strata to reduce observed composition differences.
6. Compare shares of trips, miles, trip-minutes and charges on a common population.
7. Inspect individual journeys, interpret monetary fields and synthesize the evidence.

Every substantial figure includes its population, units, interpretation and limits.
The portfolio page shows the story in nine steps, one idea and one visual per step, like the case windows of the journey. All analytical charts use Plotly.
The required missingno completeness check uses its internal Matplotlib dependency only.

## Source and units

The prescribed CSV is downloaded from:

<https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/nyctrips/data.csv>

The publisher's [sample metadata](https://github.com/uber-web/kepler.gl-data/blob/master/samples.json)
describes a sample from [NYC TLC trip records](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page).
The supplied file has **97,986 rows and 12 columns**, with encoded pickups on **15 January 2015**.
Its selection mechanism is not supplied. The raw file is retained unchanged at `data/raw.csv`.

- One row is a trip; VendorID is a provider identifier, not a unique driver or taxi.
- `trip_distance`: meter miles. Kilometres, where needed, use 1 mile = 1.609344 km.
- Duration: elapsed minutes between parsed drop-off and pickup timestamps.
- Average trip speed: miles / (minutes / 60), including stops within the recorded journey.
- Monetary fields: recorded USD charges. Metered fare and recorded total are distinct.
- Hours are New York local time. The CSV appends `+00:00`, but its pickups span exactly
  00:01–23:59 of 15 January, the quietest hour is 04:00 and the morning rush peaks at 08:00:
  the TLC wall clock. `load_data` sets the time zone to America/New_York.
- The sample is 163 time blocks covering 768 of 1,440 minutes (median block 4 minutes).
  Hours are compared on **trips per covered minute**; raw counts follow the sampling.

The [TLC dictionary](https://www.nyc.gov/assets/tlc/downloads/pdf/data_dictionary_trip_records_yellow.pdf)
also describes fields added after 2015. We only use definitions for columns actually present here.
Cash tips are not recorded; zero recorded tip is not proof of no tip. Missing rate codes,
payment type and itemised tolls/taxes/surcharges constrain explanations of charges.

## Reproduce the analysis

From the repository root, with Python 3.11 or newer:

```bash
python3 -m venv projects/nyc-taxi/.venv
source projects/nyc-taxi/.venv/bin/activate
python -m pip install -r projects/nyc-taxi/requirements.txt

# Download only if the checked-in raw file is absent.
curl --fail --location \
  'https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/nyctrips/data.csv' \
  --output projects/nyc-taxi/data/raw.csv

python projects/nyc-taxi/analyse.py
python projects/nyc-taxi/verify_analysis.py
python -m pip install jupyter nbconvert ipykernel
python projects/nyc-taxi/build_notebook.py
```

`build_notebook.py` writes the notebook, executes it in a real Jupyter kernel and exports
`reports/analytical_notebook.html`. To rerun it by hand, open it in Jupyter and run all cells.
The notebook resolves paths from either the repository root or this project folder.

The validated analytical execution used Python 3.14.7, pandas 3.1.1, NumPy 2.5.4,
Plotly.py 7.1.0 and missingno 0.5.2. The portfolio bundles Plotly.js 4.1.1 from that installed
Plotly package; its original license notices are retained.

## Run the portfolio

From the repository root:

```bash
npm install
npm run dev
```

Open `/courses/nyc-taxi/` on the printed local address. The React/TypeScript integration
is in `app/sections/courses/nyc-taxi/`. It imports `data/analysis.json`; re-run the pipeline
and rebuild the site after changing the source or cleaning rules.
The interpretations describe this submitted sample and configuration; review their text
whenever the data or analytical choices change.

For the production site and existing repository checks:

```bash
npm run check
npm run build
npm run validate:html
npm test
```

The project uses the existing portfolio's static hosting model. It needs no Python server
at runtime, no map API key and no account. Plotly is bundled locally. Dark map tiles use
CARTO/OpenStreetMap; the map's **Offline point view** avoids tile requests. All data tables,
findings and non-map charts work without a map service.

## Eligibility and sensitivity

The pipeline preserves raw records and exports overlapping flags. It does not impute
missing values (there are none), change timestamps, clip high distances or silently repair trips.

| Population      | Retained | Rules                                                                                                                                                     |
| --------------- | -------: | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mobility        |   97,408 | Usable distance/time, positive distance and duration, no duplicates; duration ≤120 min, mean speed ≤80 mph; two reviewed 99.9-mile/$2.50 records excluded |
| Spatial         |   97,264 | Mobility rules; both endpoints in the declared extent; straight-line distance does not exceed meter distance by more than 0.5 mile                        |
| Positive-charge |   97,378 | Mobility rules; fare and total positive, recorded tip nonnegative                                                                                         |

The duration and speed cutoffs are analytical plausibility choices, not legal limits or proof
of corruption. IQR fences flag observations for review; they do not automatically remove
long or airport-linked trips. Zero passenger counts do not remove usable distance/time data.
Negative/zero monetary entries remain auditable and cannot be confirmed as refunds here.

The generated evidence report compares positive-distance/duration records and four
duration/speed policies. Peak pickup hour and the short-trip share remain stable;
the mean duration is more sensitive than the median.

## Comparisons and display sampling

- Distance bands are right-closed: 1–2 miles means 1 < distance ≤ 2 miles.
- Histogram bins are left-closed; a final 30+ bin retains the full long-distance tail.
- Hour/band duration estimates require at least 30 observations.
- Geographical windows are reproducible analytical rectangles, not official boundaries.
  Airport windows take priority. Their exact bounds are in `analyse.py` and the page.
- Directional balances connect endpoints of the same pickup-date cohort. Some journeys
  finish the next day; the balances are not a closed fleet inventory.
- The adjusted duration comparison uses 125 shared origin-cell/destination-cell/0.25-mile
  strata, at least five observations per period per stratum, and identical pooled-count weights.
  Its statistic is a weighted average of stratum medians, not an overall median or causal estimate.
- Maps and aggregate figures count the full declared populations. The scatter alone uses
  a deterministic 5,000-record display sample (seed 2026); its viewport exclusions are shown.
- Financial contribution shares use the same 97,378-record population for every measure.
  Long-trip segments overlap and must not be added together.

## Interpretation limits

The project does not estimate citywide totals, recurring weekday patterns, latent demand,
fleet availability, profit, causal congestion effects or future-demand forecasts from this one day.
Trip-minutes are sums of journey duration, not driver hours or fleet utilisation.
Further validation would need multiple dates, documented sampling/time conventions,
official boundaries and the omitted fare/request/fleet information.

## Assignment mapping

| Requirement                                | Evidence                                                              |
| ------------------------------------------ | --------------------------------------------------------------------- |
| Prescribed URL, read CSV                   | Source above, retained raw file, notebook and pipeline                |
| Missing-data check with missingno          | Notebook section 2; `reports/missingness.png`                         |
| Dates, duration, hour/day, invalid records | `load_data`, eligibility flags, quality ledger, sensitivity table     |
| Distance histogram                         | Portfolio section 2 and notebook section 3                            |
| Trips by hour                              | Stacked Plotly hourly chart with alternative distance/time measures   |
| Interactive location map                   | Plotly pickup/drop-off map, hour selection, tooltips, zoom/pan        |
| Duration versus distance with tooltips     | Plotly trip scatter, recorded fare colour, individual source rows     |
| Explain figures and BI storytelling        | Nine portfolio steps and eleven notebook sections, each with findings |
| GitHub source and reproducibility          | This project folder, generated evidence, dependency file and commands |

The portfolio is implemented in React, matching its existing framework. An executed notebook
is included as a separately reviewable analytical submission; equivalence to the brief's
literal Streamlit option is an assessment decision, not assumed here.
