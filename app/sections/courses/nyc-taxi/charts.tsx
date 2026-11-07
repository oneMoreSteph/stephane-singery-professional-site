import { useState } from 'react';
import { axis, Plot } from './Plot';
import type { Trace } from './Plot';
import { bands, data, gridPoints, number, palette, percent } from './data';

const hourLabel = (h: number) => `${String(h).padStart(2, '0')}:00`;

export function ActivityChart() {
  const [measure, setMeasure] = useState<'rate' | 'trips' | 'km' | 'trip_minutes'>('rate');
  const [selected, setSelected] = useState(22);
  const labels = {
    rate: 'Trips per covered minute',
    trips: 'Raw trips',
    km: 'Kilometres',
    trip_minutes: 'Trip-minutes',
  };
  const hours = data.hourly.map((r) => r.hour);
  const traces: Trace[] =
    measure === 'rate'
      ? [
          {
            type: 'bar',
            name: labels.rate,
            x: hours,
            y: data.hourly.map((r) => r.trips_per_covered_minute),
            customdata: data.hourly.map((r) => [r.trips, r.covered_minutes]),
            marker: { color: hours.map((h) => (h === selected ? '#f6d77a' : '#57b4d6')) },
            hovertemplate:
              '<b>%{x}:00</b><br>%{y:.0f} trips per covered minute<br>%{customdata[0]:,} trips in %{customdata[1]} covered minutes<extra></extra>',
          },
        ]
      : bands.map((band, j) => ({
          type: 'bar',
          name: `${band} km`,
          x: hours,
          y: data.hourly.map(
            (r) =>
              data.hour_distance.find((x) => x.hour === r.hour && x.distance_band === band)?.[measure] ?? 0,
          ),
          marker: { color: palette[j] },
          hovertemplate: `<b>%{x}:00 · ${band} km</b><br>%{y:,.0f} ${labels[measure].toLowerCase()}<extra></extra>`,
        }));
  const row = data.hourly.find((r) => r.hour === selected)!;
  return (
    <div className="taxi-figure">
      <div className="taxi-controls">
        <label>
          Measure{' '}
          <select value={measure} onChange={(e) => setMeasure(e.target.value as typeof measure)}>
            <option value="rate">Trips per covered minute</option>
            <option value="trips">Raw trips, by distance</option>
            <option value="km">Kilometres, by distance</option>
            <option value="trip_minutes">Trip-minutes, by distance</option>
          </select>
        </label>
        <label>
          Hour{' '}
          <select value={selected} onChange={(e) => setSelected(Number(e.target.value))}>
            {data.hourly.map((r) => (
              <option key={r.hour} value={r.hour}>
                {hourLabel(r.hour)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Plot
        traces={traces}
        label={`${labels[measure]} by pickup hour, New York time.`}
        height={360}
        onClick={(event) => {
          const h = Number(event.points?.[0]?.x);
          if (Number.isInteger(h) && h >= 0 && h <= 23) setSelected(h);
        }}
        layout={{
          barmode: 'stack',
          bargap: 0.22,
          showlegend: measure !== 'rate',
          xaxis: {
            ...axis,
            title: { text: 'Pickup hour · New York time' },
            tickmode: 'array',
            tickvals: data.hourly.filter((r) => r.hour % 3 === 0).map((r) => r.hour),
            ticktext: data.hourly.filter((r) => r.hour % 3 === 0).map((r) => String(r.hour).padStart(2, '0')),
          },
          yaxis: { ...axis, title: { text: labels[measure] }, rangemode: 'tozero' },
        }}
      />
      <div className="taxi-readout" aria-live="polite">
        <strong>{hourLabel(selected)}</strong>
        <span>{number(row.trips_per_covered_minute)} trips / covered min</span>
        <span>{number(row.median_km, 2)} km median</span>
        <span>{number(row.median_minutes, 1)} min median</span>
        <span>{number(row.median_kmh, 1)} km/h median</span>
      </div>
    </div>
  );
}

export function DistanceHistogram() {
  const [full, setFull] = useState(false);
  const bins = data.distance_histogram.filter((x) => full || x.lower < 16);
  const hidden = data.distance_histogram.filter((x) => x.lower >= 16).reduce((a, x) => a + x.trips, 0);
  return (
    <div className="taxi-figure">
      <div className="taxi-controls">
        <label>
          Distance view{' '}
          <select value={full ? 'full' : 'detail'} onChange={(e) => setFull(e.target.value === 'full')}>
            <option value="detail">0–16 km</option>
            <option value="full">Full distribution, 50+ km tail bin</option>
          </select>
        </label>
        <span>1 km bins · all kept trips counted</span>
      </div>
      <Plot
        traces={[
          {
            type: 'bar',
            x: bins.map((x) => x.lower + 0.5),
            y: bins.map((x) => x.trips),
            marker: { color: bins.map((x) => (x.lower < 3 ? palette[0] : palette[1])) },
            customdata: bins.map((x) => (x.upper == null ? '50+ km' : `${x.lower}–${x.upper} km`)),
            hovertemplate: '<b>%{customdata}</b><br>%{y:,.0f} trips<extra></extra>',
          },
        ]}
        label="Histogram of trip distances in km with a long right tail."
        height={310}
        layout={{
          showlegend: false,
          bargap: 0.06,
          xaxis: {
            ...axis,
            title: { text: 'Trip distance · km' },
            range: full ? [0, 51] : [0, 16],
            tickvals: full ? [0, 10, 20, 30, 40, 50.5] : [0, 2, 4, 6, 8, 10, 12, 14, 16],
            ticktext: full
              ? ['0', '10', '20', '30', '40', '50+']
              : ['0', '2', '4', '6', '8', '10', '12', '14', '16'],
          },
          yaxis: { ...axis, title: { text: 'Trips' }, rangemode: 'tozero' },
        }}
      />
      <p className="taxi-caption">
        {full
          ? 'The last bin groups every kept trip of 50 km or more. Long trips stay in the analysis.'
          : `${number(hidden)} trips of 16 km or more sit beyond this view. Pick the full distribution to see the tail.`}
      </p>
    </div>
  );
}

export function TaxiMap() {
  const [endpoint, setEndpoint] = useState('pickup');
  const [hour, setHour] = useState(-1);
  const [base, setBase] = useState('carto-darkmatter');
  const points = gridPoints(endpoint, hour);
  const max = Math.max(...points.map((p) => p.trips));
  const traces: Trace[] = [
    {
      type: 'scattermap',
      mode: 'markers',
      name: endpoint === 'pickup' ? 'Pickups' : 'Drop-offs',
      lon: points.map((p) => p.lon),
      lat: points.map((p) => p.lat),
      customdata: points.map((p) => p.trips),
      marker: {
        color: endpoint === 'pickup' ? palette[0] : palette[1],
        size: points.map((p) => p.trips),
        sizemode: 'area',
        sizeref: (2 * max) / 42 ** 2,
        sizemin: 3,
        opacity: 0.68,
      },
      hovertemplate:
        '<b>%{customdata:,.0f} trips in this cell</b><br>Centre: %{lat:.4f}, %{lon:.4f}<extra></extra>',
    },
  ];
  return (
    <div className="taxi-figure">
      <div className="taxi-controls">
        <label>
          Locations{' '}
          <select value={endpoint} onChange={(e) => setEndpoint(e.target.value)}>
            <option value="pickup">Pickups</option>
            <option value="dropoff">Drop-offs</option>
          </select>
        </label>
        <label>
          Pickup hour{' '}
          <select value={hour} onChange={(e) => setHour(Number(e.target.value))}>
            <option value="-1">All hours</option>
            {Array.from({ length: 24 }, (_, h) => (
              <option key={h} value={h}>
                {hourLabel(h)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Basemap{' '}
          <select value={base} onChange={(e) => setBase(e.target.value)}>
            <option value="carto-darkmatter">Dark map</option>
            <option value="white-bg">Offline point view</option>
          </select>
        </label>
      </div>
      <Plot
        traces={traces}
        label={`${endpoint === 'pickup' ? 'Pickup' : 'Drop-off'} density in approximately one-kilometre cells. ${number(points.reduce((n, p) => n + p.trips, 0))} spatially eligible trips.`}
        height={510}
        layout={{
          showlegend: false,
          margin: { l: 0, r: 0, t: 0, b: 0 },
          uirevision: `taxi-map-${base}`,
          map: { style: base, center: { lon: -73.94, lat: 40.735 }, zoom: 9.5 },
        }}
      />
      <div className="taxi-map-footer">
        <span>
          {number(points.reduce((n, p) => n + p.trips, 0))} trips ·{' '}
          {hour < 0 ? 'all pickup hours' : `pickup hour ${hourLabel(hour)}`}
        </span>
        <span>Basemap: CARTO / OpenStreetMap contributors</span>
      </div>
      <p className="taxi-caption">
        Drag to pan, hover to inspect, double-click to zoom. Circle areas scale with counts within the current
        view; the smallest have a minimum visible size. Both endpoint views use the same pickup-hour cohort.
        All eligible records contribute to the grid. Online tiles require internet; the offline point view
        makes no tile requests.
      </p>
    </div>
  );
}

export function FlowMatrix() {
  const labels = data.spatial.window_balance.map((r) => r.window);
  const short = labels.map((x) => x.replace(' window', '').replace(' vicinity', ''));
  const matrix = labels.map((from) =>
    labels.map(
      (to) =>
        data.spatial.flows.find((r) => r.origin_window === from && r.destination_window === to)?.trips ?? 0,
    ),
  );
  return (
    <div className="taxi-figure">
      <p className="taxi-scroll-hint">Swipe to see every destination →</p>
      <div className="taxi-flow-scroll">
        <Plot
          traces={[
            {
              type: 'heatmap',
              z: matrix,
              x: short,
              y: short,
              colorscale: [
                [0, '#0b1f2b'],
                [0.2, '#24535f'],
                [1, '#a9e7f1'],
              ],
              text: matrix.map((row) => row.map((n) => number(n))),
              texttemplate: '%{text}',
              textfont: { size: 11 },
              showscale: false,
              hovertemplate: '<b>%{y} → %{x}</b><br>%{z:,.0f} trips<extra></extra>',
              xgap: 3,
              ygap: 3,
            },
          ]}
          label="Origin-destination matrix for the six analytical study windows. Rows are origins, columns destinations."
          height={400}
          layout={{
            margin: { l: 110, r: 16, t: 35, b: 65 },
            xaxis: { ...axis, title: { text: 'Destination window' }, side: 'bottom', showgrid: false },
            yaxis: { ...axis, autorange: 'reversed', showgrid: false },
          }}
        />
      </div>
      <details className="taxi-details">
        <summary>Read the complete origin–destination table</summary>
        <div className="taxi-table-scroll">
          <table>
            <caption>
              Origin ↓ / destination → · all {number(data.spatial.trips)} spatially eligible trips
            </caption>
            <thead>
              <tr>
                <th>Origin</th>
                {short.map((x) => (
                  <th key={x}>{x}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={short[i]}>
                  <th scope="row">{short[i]}</th>
                  {row.map((n, j) => (
                    <td key={j}>{number(n)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

export function DurationChart() {
  const [band, setBand] = useState('1.6–3.2');
  const rows = data.hour_distance.filter((r) => r.distance_band === band && r.trips >= 30);
  const hours = Array.from({ length: 24 }, (_, h) => h);
  const traces = (
    [
      ['median_minutes', 'Median', palette[0]],
      ['p90_minutes', 'P90', palette[1]],
    ] as const
  ).map(([key, name, color]) => ({
    type: 'scatter',
    mode: 'lines+markers',
    name,
    x: hours,
    y: hours.map((h) => rows.find((r) => r.hour === h)?.[key] ?? null),
    customdata: hours.map((h) => rows.find((r) => r.hour === h)?.trips ?? 0),
    connectgaps: false,
    line: { color, width: 2, dash: name === 'P90' ? 'dot' : 'solid' },
    marker: { size: 6 },
    hovertemplate: `<b>${name}: %{y:.1f} minutes</b><br>Hour %{x}:00 · %{customdata:,.0f} trips<extra></extra>`,
  }));
  return (
    <div className="taxi-figure">
      <div className="taxi-controls">
        <label>
          Compare distances{' '}
          <select value={band} onChange={(e) => setBand(e.target.value)}>
            {bands.map((b) => (
              <option key={b} value={b}>
                {b} km
              </option>
            ))}
          </select>
        </label>
        <span>Compare typical duration and the slow-trip tail</span>
      </div>
      <Plot
        traces={traces}
        label={`Median and P90 duration by pickup hour for ${band} km trips. Groups with fewer than 30 trips are omitted.`}
        layout={{
          xaxis: {
            ...axis,
            title: { text: 'Pickup hour · New York time' },
            dtick: 2,
            range: [-0.5, 23.5],
          },
          yaxis: { ...axis, title: { text: 'Duration · minutes' }, rangemode: 'tozero' },
        }}
      />
      <p className="taxi-caption">
        P90 is the duration at or below which 90% of trips in that group fall. The gap above the median
        describes the slow-trip tail; it is not a confidence interval. Only hour/band groups with at least 30
        observations are shown.
      </p>
      <details className="taxi-details">
        <summary>Read the underlying values</summary>
        <div className="taxi-table-scroll">
          <table>
            <thead>
              <tr>
                <th>Pickup hour</th>
                <th>Trips</th>
                <th>Median min</th>
                <th>P90 min</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.hour}>
                  <td>{hourLabel(r.hour)}</td>
                  <td>{number(r.trips)}</td>
                  <td>{number(r.median_minutes, 2)}</td>
                  <td>{number(r.p90_minutes, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

export function ContributionChart() {
  const metrics = [
    ['trip_share_pct', 'Trips'],
    ['km_share_pct', 'Kilometres'],
    ['minute_share_pct', 'Trip-minutes'],
    ['charge_share_pct', 'Charges'],
  ] as const;
  const [segment, setSegment] = useState('Over 8 km');
  const row = data.concentration.segments.find((x) => x.segment === segment)!;
  return (
    <div className="taxi-figure">
      <div className="taxi-controls">
        <label>
          Trip segment{' '}
          <select value={segment} onChange={(e) => setSegment(e.target.value)}>
            {data.concentration.segments.map((x) => (
              <option key={x.segment}>{x.segment}</option>
            ))}
          </select>
        </label>
        <span>Shared denominator: {number(data.concentration.denominator_trips)} trips</span>
      </div>
      <Plot
        traces={[
          {
            type: 'bar',
            orientation: 'h',
            x: metrics.map(([key]) => row[key]),
            y: metrics.map(([, label]) => label),
            marker: { color: [palette[0], palette[1], palette[1], palette[1]] },
            text: metrics.map(([key]) => percent(row[key])),
            textposition: 'outside',
            cliponaxis: false,
            hovertemplate: '<b>%{y}: %{x:.1f}%</b><extra></extra>',
          },
        ]}
        label={`${segment}: shares of trips, km, trip-minutes and recorded charges.`}
        height={290}
        layout={{
          margin: { l: 100, r: 40, t: 15, b: 40 },
          showlegend: false,
          bargap: 0.45,
          xaxis: { ...axis, range: [0, 100], ticksuffix: '%' },
          yaxis: { ...axis, showgrid: false, autorange: 'reversed' },
        }}
      />
      <p className="taxi-caption">
        {number(row.trips)} trips in this segment. Every share uses the same positive-charge population.
        Recorded charges are passenger totals, not profit. Trip-minutes sum journey durations, not fleet
        utilisation.
      </p>
    </div>
  );
}

export function TripScatter() {
  const [distance, setDistance] = useState(50);
  const [selected, setSelected] = useState(0);
  const rows = data.scatter.rows.filter((r) => Number(r[2]) <= distance && Number(r[3]) <= 90);
  const current = rows[Math.min(selected, rows.length - 1)];
  return (
    <div className="taxi-figure">
      <div className="taxi-controls">
        <label>
          Maximum distance{' '}
          <select
            value={distance}
            onChange={(e) => {
              setDistance(Number(e.target.value));
              setSelected(0);
            }}
          >
            <option value="8">8 km</option>
            <option value="16">16 km</option>
            <option value="50">50 km</option>
            <option value="100">100 km</option>
          </select>
        </label>
        <span>
          {number(rows.length)} of {number(data.scatter.rows.length)} display-sampled trips
        </span>
      </div>
      <Plot
        traces={[
          {
            type: 'scatter',
            mode: 'markers',
            x: rows.map((r) => Number(r[2])),
            y: rows.map((r) => Number(r[3])),
            customdata: rows.map((r) => [r[0], r[1], r[4], r[5]]),
            marker: {
              size: 5,
              opacity: 0.5,
              color: rows.map((r) => Number(r[4])),
              cmin: 0,
              cmax: 60,
              colorscale: [
                [0, '#315765'],
                [0.45, '#a9e7f1'],
                [1, '#f6d77a'],
              ],
              colorbar: {
                title: { text: 'Metered fare<br>USD' },
                thickness: 10,
                len: 0.8,
                tickvals: [0, 20, 40, 60],
                ticktext: ['$0', '$20', '$40', '$60+'],
              },
            },
            hovertemplate:
              '<b>%{x:.2f} km · %{y:.1f} minutes</b><br>Metered fare: $%{customdata[2]:.2f}<br>Recorded total: $%{customdata[3]:.2f}<br>Pickup hour: %{customdata[1]}:00<br>CSV row: %{customdata[0]}<extra></extra>',
          },
        ]}
        label="Plotly scatter: duration against distance, coloured by metered fare. Hover to read trip details."
        height={420}
        onClick={(event) => {
          const custom = event.points?.[0]?.customdata;
          if (Array.isArray(custom)) {
            const i = rows.findIndex((r) => r[0] === custom[0]);
            if (i >= 0) setSelected(i);
          }
        }}
        layout={{
          showlegend: false,
          xaxis: { ...axis, title: { text: 'Trip distance · km' }, range: [0, distance] },
          yaxis: { ...axis, title: { text: 'Duration · minutes' }, range: [0, 90] },
        }}
      />
      <div className="taxi-readout" aria-live="polite">
        {current && (
          <>
            <strong>CSV row {current[0]}</strong>
            <span>{number(Number(current[2]), 2)} km</span>
            <span>{number(Number(current[3]), 1)} min</span>
            <span>${number(Number(current[4]), 2)} metered fare</span>
            <span>{hourLabel(Number(current[1]))}</span>
          </>
        )}
        <div className="taxi-map-buttons">
          <button disabled={selected <= 0} onClick={() => setSelected((i) => Math.max(0, i - 1))}>
            Previous trip
          </button>
          <button
            disabled={selected >= rows.length - 1}
            onClick={() => setSelected((i) => Math.min(rows.length - 1, i + 1))}
          >
            Next trip
          </button>
        </div>
      </div>
      <p className="taxi-caption">
        Deterministic display sample: 5,000 of {number(data.scatter.population)} mobility-eligible trips, seed
        2026. The viewport shows up to 90 minutes and the selected distance;{' '}
        {number(data.scatter.rows.length - rows.length)} sampled points lie outside it. All aggregate charts
        and KPIs use their full declared populations. Negative charges remain visible here but are excluded
        from financial summaries.
      </p>
    </div>
  );
}
