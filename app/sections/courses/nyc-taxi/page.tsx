import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { SiteNav } from '~/components/SiteNav';
import { SiteFooter } from '~/components/SiteFooter';
import { metaForPath } from '~/meta';
import { Breadcrumb } from '~/components/Breadcrumb';
import { courseOf } from '../catalogue';
import {
  ActivityChart,
  ContributionChart,
  DistanceHistogram,
  DurationChart,
  TaxiMap,
  TripScatter,
} from './charts';
import { axis, Plot } from './Plot';
import { data, number, percent } from './data';
import '../courses.css';
import './taxi.css';

export const meta = () => metaForPath('/courses/nyc-taxi');

const course = courseOf('nyc-taxi');
const matched = data.same_distance.od_adjustment;
const long = data.concentration.segments.find((s) => s.segment === 'Over 8 km')!;
const short = data.concentration.segments.find((s) => s.segment === 'At most 3.2 km')!;
const midtown = data.spatial.window_balance.find((w) => w.window === 'Midtown window')!;
const uptown = data.spatial.window_balance.find((w) => w.window === 'Uptown window')!;
const night = data.same_distance.periods.find((p) => p.period === '00–05')!;
const midday = data.same_distance.periods.find((p) => p.period === '10–15')!;
const rate = (h: number) => data.hourly.find((r) => r.hour === h)!.trips_per_covered_minute;
const kmh = (h: number) => data.hourly.find((r) => r.hour === h)!.median_kmh;

function CoverageChart() {
  const start = Date.UTC(2015, 0, 15);
  const x = data.coverage.per_minute.map((_, m) => new Date(start + m * 60000).toISOString().slice(0, 16));
  const top = Math.max(...data.coverage.per_minute);
  return (
    <div className="taxi-figure">
      <div className="taxi-controls">
        <span className="taxi-key taxi-key--in">Minute in the sample</span>
        <span className="taxi-key taxi-key--out">Minute absent from the sample</span>
        <span>
          {data.coverage.covered_minutes} of 1,440 minutes · {data.coverage.blocks} blocks
        </span>
      </div>
      <Plot
        traces={[
          {
            type: 'bar',
            x,
            y: data.coverage.per_minute.map((n) => (n === 0 ? top : null)),
            marker: { color: 'rgba(171, 196, 205, 0.1)', line: { width: 0 } },
            hovertemplate: '<b>%{x|%H:%M}</b><br>Absent from the sample<extra></extra>',
          },
          {
            type: 'bar',
            x,
            y: data.coverage.per_minute.map((n) => (n > 0 ? n : null)),
            marker: { color: '#57b4d6', line: { width: 0 } },
            hovertemplate: '<b>%{x|%H:%M}</b><br>%{y} pickups<extra></extra>',
          },
        ]}
        label="Pickups per minute across the day: short blocks of complete minutes, separated by absent minutes."
        height={340}
        layout={{
          showlegend: false,
          barmode: 'overlay',
          bargap: 0,
          xaxis: { ...axis, type: 'date', tickformat: '%H:%M', title: { text: 'Pickup time · New York' } },
          yaxis: { ...axis, title: { text: 'Pickups in the minute' }, rangemode: 'tozero' },
        }}
      />
    </div>
  );
}

function QualityPanel() {
  const f = data.quality.flags;
  const rows: [string, number, string][] = [
    ['Missing values', 0, 'Keep'],
    ['Duplicate rows', data.source.duplicates, 'Keep'],
    ['Distance of 0 km', f.nonpositive_distance, 'Remove'],
    ['Above 2 hours (meter left on)', f.duration_over_120_min, 'Remove'],
    ['Above 129 km/h (80 mph)', f.speed_over_80_mph, 'Remove'],
    ['0 passengers', f.zero_passengers, 'Keep'],
    ['Beyond the IQR distance fence', f.trip_distance_outside_IQR_fences, 'Keep'],
  ];
  return (
    <div className="taxi-figure">
      <div className="taxi-kpis">
        <div>
          <strong>{number(data.source.rows)}</strong>
          <span>trips in the file</span>
        </div>
        <div>
          <strong>{number(data.mobility.trips)}</strong>
          <span>trips kept ({percent((data.mobility.trips / data.source.rows) * 100)})</span>
        </div>
        <div>
          <strong>{number(data.mobility.median_km, 2)} km</strong>
          <span>median distance</span>
        </div>
        <div>
          <strong>{number(data.mobility.median_minutes, 1)} min</strong>
          <span>median duration</span>
        </div>
      </div>
      <table className="taxi-rules">
        <caption>Each check, and the decision it led to</caption>
        <thead>
          <tr>
            <th>Check</th>
            <th>Trips</th>
            <th>Decision</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, n, decision]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{number(n)}</td>
              <td className={decision === 'Remove' ? 'is-remove' : 'is-keep'}>{decision}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Synthesis() {
  const items: [string, string][] = [
    [
      'When',
      `Night low, morning rush, steady midday, evening peak at 22:00 (${number(rate(22))} trips a minute).`,
    ],
    ['Where', `Midtown sends ${number(midtown.pickups)} trips and receives ${number(midtown.dropoffs)}.`],
    [
      'How long',
      `A 1.6–3.2 km trip: ${number(matched.a_weighted_minutes, 1)} min at night, ${number(matched.b_weighted_minutes, 1)} at midday, same places.`,
    ],
    [
      'What weight',
      `Trips over 8 km: ${percent(long.trip_share_pct, 0)} of trips, ${percent(long.km_share_pct, 0)} of km.`,
    ],
  ];
  return (
    <div className="taxi-figure taxi-synthesis">
      <ol>
        {items.map(([k, v]) => (
          <li key={k}>
            <strong>{k}</strong>
            <span>{v}</span>
          </li>
        ))}
      </ol>
      <ul className="taxi-sources">
        <li>
          <a href={data.source.url}>Prescribed CSV · Kepler.gl sample</a>
        </li>
        <li>
          <a href="https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page">NYC TLC trip records</a>
        </li>
        <li>
          <a href="https://www.nyc.gov/assets/tlc/downloads/pdf/data_dictionary_trip_records_yellow.pdf">
            TLC field definitions
          </a>
        </li>
        <li>
          Notebook, pipeline and data: <code>projects/nyc-taxi/</code> in the repository
        </li>
      </ul>
    </div>
  );
}

interface Step {
  id: string;
  label: string;
  heading: string;
  lines: string[];
  visual: () => React.ReactNode;
}

const steps: Step[] = [
  {
    id: 'data',
    label: 'The data',
    heading: 'Complete. Not always consistent.',
    lines: [
      `${number(data.source.rows)} trips, 12 fields, one Thursday: 15 January 2015.`,
      'No missing value, no duplicate row.',
      'One trip covers 16.3 km in 0 seconds; 77 last a median 23.7 hours for 3.3 km.',
      `Each trip is judged on its own fields: ${number(data.source.rows - data.mobility.trips)} removed, long airport trips kept.`,
    ],
    visual: () => <QualityPanel />,
  },
  {
    id: 'clock',
    label: 'Clock & sample',
    heading: 'New York time, in short blocks.',
    lines: [
      'Pickups fill exactly 00:01–23:59 and the quietest hour is 04:00: the hours are New York local time.',
      `The file keeps ${data.coverage.covered_minutes} of 1,440 minutes, in ${data.coverage.blocks} blocks of about ${data.coverage.median_block_minutes} minutes.`,
      'Each bar is one minute. Grey stretches are minutes absent from the file.',
      '101 of the 163 blocks hold a single meter company: the sample is cut from each company’s file.',
      'Hours are compared on trips per covered minute.',
    ],
    visual: () => <CoverageChart />,
  },
  {
    id: 'distance',
    label: 'Distance',
    heading: 'Mostly short hops.',
    lines: [
      `Median trip: ${number(data.mobility.median_km, 2)} km, ${number(data.mobility.median_minutes, 1)} minutes.`,
      `${percent(short.trip_share_pct, 0)} of trips are 3.2 km or less.`,
      'A long tail, with a bump at 27–32 km: the airports.',
    ],
    visual: () => <DistanceHistogram />,
  },
  {
    id: 'hours',
    label: 'Hours',
    heading: 'The city wakes at 6 and peaks at 22.',
    lines: [
      `${number(rate(4))} trips a minute at 04:00; ${number(rate(8))} at the 08:00 rush.`,
      `A steady midday, then an evening peak of ${number(rate(22))} at 22:00.`,
      'Each hour rests on a few blocks (one or two from 02:00 to 05:00): compare periods, not single hours.',
      `Speed halves from night to midday: ${number(kmh(4), 0)} km/h at 04:00, ${number(kmh(11), 0)} km/h at 11:00.`,
      'Switch the measure to see km and trip-minutes by distance band.',
    ],
    visual: () => <ActivityChart />,
  },
  {
    id: 'map',
    label: 'Map',
    heading: 'Midtown sends. Homes receive.',
    lines: [
      `Midtown: ${number(midtown.pickups)} pickups, ${number(midtown.dropoffs)} drop-offs.`,
      `Uptown receives more than it sends: ${number(uptown.dropoffs)} drop-offs for ${number(uptown.pickups)} pickups.`,
      'JFK and LaGuardia light up from midday. 70% of JFK trips pay the $52 flat fare.',
      'Pick an hour and switch pickups and drop-offs.',
    ],
    visual: () => <TaxiMap />,
  },
  {
    id: 'duration',
    label: 'Travel time',
    heading: 'Same trip, twice the time.',
    lines: [
      `A 1.6–3.2 km trip: ${number(night.median_minutes, 1)} min at night, ${number(midday.median_minutes, 1)} at midday.`,
      `Same origin, destination and distance: ${number(matched.a_weighted_minutes, 1)} against ${number(matched.b_weighted_minutes, 1)} min.`,
      `The slow tail grows too: P90 ${number(night.p90_minutes, 1)} → ${number(midday.p90_minutes, 1)} min.`,
    ],
    visual: () => <DurationChart />,
  },
  {
    id: 'weight',
    label: 'Weight',
    heading: 'Short trips are the volume. Long trips are the kilometres.',
    lines: [
      `3.2 km or less: ${percent(short.trip_share_pct, 0)} of trips, ${percent(short.km_share_pct, 0)} of km.`,
      `Over 8 km: ${percent(long.trip_share_pct, 0)} of trips, ${percent(long.km_share_pct, 0)} of km, ${percent(long.charge_share_pct, 0)} of charges.`,
    ],
    visual: () => <ContributionChart />,
  },
  {
    id: 'trips',
    label: 'Trip by trip',
    heading: 'The fare follows the distance and the time.',
    lines: [
      'Each point is a trip: 5,000 drawn at random, seed 2026.',
      'Rank correlation with the fare: 0.96 for duration, 0.94 for distance. The meter charges both.',
      'At the same distance, midday trips take longer.',
      'Click a point to read its source row.',
    ],
    visual: () => <TripScatter />,
  },
  {
    id: 'synthesis',
    label: 'What it tells',
    heading: 'One day, different journeys.',
    lines: [
      'A centre that sends people outwards.',
      'Short hops in number, long trips in distance.',
      'The hour changes everything: the same trip takes twice as long at midday.',
      'One sampled Thursday: confirming it takes more days and the missing fare fields.',
    ],
    visual: () => <Synthesis />,
  },
];

export default function TaxiProjectPage() {
  const [index, setIndex] = useState(0);
  const go = useCallback((i: number) => {
    const next = Math.max(0, Math.min(steps.length - 1, i));
    setIndex(next);
    window.history.replaceState(null, '', `#${steps[next].id}`);
  }, []);

  useEffect(() => {
    const fromHash = () => {
      const found = steps.findIndex((s) => `#${s.id}` === window.location.hash);
      setIndex(Math.max(0, found));
    };
    const frame = requestAnimationFrame(fromHash);
    window.addEventListener('hashchange', fromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', fromHash);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['SELECT', 'INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index]);

  useEffect(() => {
    document.querySelector('.taxi-steps .is-active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [index]);

  const step = steps[index];
  return (
    <div className="page taxi-page">
      <SiteNav />
      <main className="taxi-case">
        <header className="taxi-case__bar">
          <div className="taxi-case__title">
            <Breadcrumb
              trail={[['Courses', '/courses'], [course.title, `/courses#${course.id}`], ['NYC Taxi']]}
            />
            <p className="eyebrow">EFREI · DATA VISUALISATION & BI · NYC TAXI, 15 JANUARY 2015</p>
            <h1>
              One day. <em>Different journeys.</em>
            </h1>
          </div>
          <nav className="taxi-steps" aria-label="Steps of the NYC taxi analysis">
            {steps.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={i === index ? 'is-active' : i < index ? 'is-done' : undefined}
                aria-current={i === index ? 'step' : undefined}
                onClick={() => go(i)}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </button>
            ))}
          </nav>
        </header>

        <section className="taxi-case__body">
          <div className="taxi-case__text" aria-live="polite">
            <p className="eyebrow">
              STEP {String(index + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')} ·{' '}
              {step.label.toUpperCase()}
            </p>
            <h2>{step.heading}</h2>
            <ul>
              {step.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="taxi-case__nav">
              <button type="button" onClick={() => go(index - 1)} disabled={index === 0}>
                ← Previous
              </button>
              {index < steps.length - 1 ? (
                <button type="button" onClick={() => go(index + 1)}>
                  Next →
                </button>
              ) : (
                <Link to={`/courses#${course.id}`} className="taxi-case__exit">
                  Back to the course →
                </Link>
              )}
            </div>
            <p className="taxi-case__hint">
              All figures describe this sample. Arrow keys move between steps.
            </p>
          </div>
          <div className="taxi-case__visual" key={step.id}>
            {step.visual()}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
