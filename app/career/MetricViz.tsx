// A small drawing per figure in the wide views, so the number shows what it measures.
import { Fragment } from 'react';
import { reducedMotion } from './data';

const t = (x: number, y: number, v: string, c = '') => (
  <text className={`mv-t ${c}`} x={x} y={y}>
    {v}
  </text>
);
const seq = (i: number, n: number, step = 0.5) =>
  ({ '--d': `${(i * step).toFixed(2)}s`, '--t': `${(n * step).toFixed(2)}s` }) as React.CSSProperties;
const v = (i: number | string) => ({ '--i': i }) as React.CSSProperties;

function views(still: boolean): Record<string, () => React.ReactNode> {
  const ride = (d: string, dur: number, inner: React.ReactNode) =>
    still ? null : (
      <g>
        {inner}
        <animateMotion path={d} dur={`${dur}s`} repeatCount="indefinite" />
      </g>
    );
  return {
    vfli: () => (
      <>
        <circle className="mv-ring" cx="26" cy="26" r="20" />
        {[0, 120, 240].map((a) => (
          <path key={a} className="mv-arc" transform={`rotate(${a} 26 26)`} d="M26 6A20 20 0 0 1 43.3 16" />
        ))}
        <path className="mv-hand" d="M26 26V10">
          {still ? null : (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 26 26"
              to="360 26 26"
              dur="10.5s"
              repeatCount="indefinite"
            />
          )}
        </path>
        {Array.from({ length: 21 }, (_, i) => (
          <rect
            key={i}
            className="mv-cell mv-seq"
            style={seq(i, 21)}
            x={70 + Math.floor(i / 3) * 30}
            y={4 + (i % 3) * 13}
            width="26"
            height="10"
            rx="2"
          />
        ))}
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <Fragment key={i}>{t(83 + i * 30, 52, d, 'mid')}</Fragment>
        ))}
      </>
    ),
    rail: () => (
      <>
        <path className="mv-axis" d="M8 24H272" />
        {(
          [
            ['Y−3', 8],
            ['Y−2', 92],
            ['Y−1', 176],
          ] as const
        ).map(([l, x]) => (
          <Fragment key={l}>
            <path className="mv-axis" d={`M${x} 18V30`} />
            {t(x, 46, l, 'mid')}
          </Fragment>
        ))}
        <circle className="mv-ping" cx="264" cy="24" r="9" />
        <circle className="mv-gold" cx="264" cy="24" r="4" />
        {t(264, 46, 'D', 'mid gold')}
        {ride('M8 24H264', 7, <rect className="mv-train" x="-11" y="-4" width="22" height="8" rx="3" />)}
      </>
    ),
    'ligne-c': () => (
      <>
        <path className="mv-rail" d="M4 24H276" />
        {Array.from({ length: 42 }, (_, i) => (
          <circle
            key={i}
            className="mv-stop mv-seq"
            style={seq(i, 42, 0.2)}
            cx={(4 + i * 6.63).toFixed(1)}
            cy="24"
            r="2.6"
          />
        ))}
      </>
    ),
    hubs: () => (
      <>
        <ellipse className="mv-ring" cx="140" cy="26" rx="128" ry="20" />
        {t(140, 30, 'PARIS', 'mid')}
        {[
          [22, 26],
          [70, 10],
          [210, 10],
          [258, 26],
          [210, 42],
          [70, 42],
        ].map(([x, y], i) => (
          <circle key={i} className="mv-stop mv-seq" style={seq(i, 6, 1)} cx={x} cy={y} r="5" />
        ))}
      </>
    ),
    'food-data': () => (
      <>
        {Array.from({ length: 25 }, (_, i) => (
          <g
            key={i}
            className={`mv-person ${i < 2 ? 'on' : 'mv-fill'}`}
            style={v(i)}
            transform={`translate(${5 + i * 11} 30)`}
          >
            <circle cy="-10" r="3" />
            <path d="M-4 0V-2A4 4 0 0 1 4-2V0Z" />
          </g>
        ))}
        {t(11, 46, '2', 'mid gold')}
        {t(269, 46, '25', 'mid')}
      </>
    ),
    heetch: () => (
      <>
        {t(0, 18, 'DAILY')}
        <rect className="mv-tick" x="58" y="6" width="5" height="14" />
        {t(0, 44, 'HOURLY')}
        {Array.from({ length: 24 }, (_, i) => (
          <rect
            key={i}
            className="mv-tick mv-seq"
            style={seq(i, 24, 0.25)}
            x={58 + i * 9.2}
            y="32"
            width="5"
            height="14"
          />
        ))}
      </>
    ),
    verisure: () => (
      <>
        {Array.from({ length: 105 }, (_, i) => (
          <rect
            key={i}
            className={`mv-test ${i === 58 ? 'ko' : 'mv-fill'}`}
            style={v(i * 0.48)}
            x={(2 + (i % 35) * 7.85).toFixed(2)}
            y={5 + Math.floor(i / 35) * 8}
            width="6"
            height="6"
            rx="1"
          />
        ))}
        {still ? null : (
          <rect className="mv-scan" y="3" width="3" height="26">
            <animate attributeName="x" values="2;276;2" dur="8s" repeatCount="indefinite" />
          </rect>
        )}
      </>
    ),
    'study-data': () => {
      const groups = ['PYTHON', 'ANALYSIS', 'ML', 'DL', 'DATA ENG', 'PROJECT'];
      return (
        <>
          {Array.from({ length: 45 }, (_, i) => {
            const g = Math.floor(i / 7.5);
            return (
              <rect
                key={i}
                className="mv-hour mv-fill"
                style={v(i)}
                x={(1 + i * 5.85 + g * 3).toFixed(1)}
                y="6"
                width="4"
                height="22"
                rx="1"
              />
            );
          })}
          {groups.map((g, i) => (
            <Fragment key={g}>{t(23 + i * 46.9, 44, g, 'mid small')}</Fragment>
          ))}
        </>
      );
    },
    'study-efrei': () => (
      <>
        <rect className="mv-year done" x="2" y="8" width="88" height="16" rx="2" />
        <rect className="mv-year" x="94" y="8" width="88" height="16" rx="2" />
        <rect className="mv-year now" x="94" y="8" width="44" height="16" rx="2" />
        <rect className="mv-year next" x="186" y="8" width="88" height="16" rx="2" />
        {t(46, 42, '2025', 'mid')}
        {t(138, 42, '2026 · NOW', 'mid gold')}
        {t(230, 42, '2027–28', 'mid')}
      </>
    ),
  };
}

export function MetricViz({ caseKey }: { caseKey: string }) {
  const view = views(reducedMotion())[caseKey];
  return view ? (
    <svg className="mv" viewBox="0 0 280 54" aria-hidden="true">
      {view()}
    </svg>
  ) : null;
}
