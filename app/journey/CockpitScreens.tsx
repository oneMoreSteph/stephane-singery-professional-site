// The cockpit's left and right screens: simulated flight dashboards with live charts and figures. Decorative.
import { useEffect, useRef, useState } from 'react';

/** A smooth wave across two periods, so a CSS translation can loop it without a seam. */
function wave(width: number, height: number, base: number, amp: number, seed: number) {
  const pts: string[] = [];
  for (let x = 0; x <= width * 2; x += 6) {
    const t = (x / width) * Math.PI * 2;
    const y =
      base - amp * (0.55 * Math.sin(t + seed) + 0.3 * Math.sin(2 * t + seed * 2) + 0.15 * Math.sin(5 * t));
    pts.push(`${x.toFixed(0)},${Math.max(4, Math.min(height - 4, y)).toFixed(1)}`);
  }
  return `M${pts.join('L')}`;
}

/** A value that drifts gently around its centre, once a second. */
function useDrift(centre: number, spread: number, decimals: number) {
  const [v, setV] = useState(centre);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setV((prev) => {
        const next = prev + (Math.random() - 0.5) * spread * 0.4 + (centre - prev) * 0.15;
        return Math.max(centre - spread, Math.min(centre + spread, next));
      });
    }, 1000);
    return () => clearInterval(id);
  }, [centre, spread]);
  return v.toFixed(decimals);
}

/** The current date and time in UTC, e.g. "2026-11-07 01:58:12 UTC", updated every second.
 *  Empty on the pre-rendered page, so the server and the browser render the same markup. */
function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return now ? `${now.toISOString().slice(0, 19).replace('T', ' ')} UTC` : '';
}

/** The UTC clock, drawn over the left screen's header on its own layer: it stays bright when that screen dims. */
function UtcClock() {
  const clock = useClock();
  return (
    <div className="cockpit-screen cockpit-screen--left cockpit-clock">
      <svg className="cs-svg" viewBox="0 0 300 205" preserveAspectRatio="none">
        <text className="cs-t end cs-clock" x="290" y="18">
          {clock}
        </text>
      </svg>
    </div>
  );
}

function Telemetry() {
  const alt = useDrift(408.2, 0.6, 1);
  const vel = useDrift(7.66, 0.02, 2);
  const g = useDrift(1.02, 0.03, 2);
  return (
    <svg className="cs-svg" viewBox="0 0 300 205" preserveAspectRatio="none">
      <circle className="cs-dot" cx="12" cy="14" r="3" />
      <text className="cs-t" x="20" y="17">
        TELEMETRY · ASCENT
      </text>

      <g className="cs-grid">
        {[44, 74, 104, 134].map((y) => (
          <path key={y} d={`M10 ${y}H290`} />
        ))}
      </g>
      <svg x="10" y="28" width="280" height="116" viewBox="0 0 280 116" preserveAspectRatio="none">
        <g className="cs-scroll">
          <path className="cs-area" d={`${wave(280, 116, 70, 34, 0.4)}L560,116L0,116Z`} />
          <path className="cs-line" d={wave(280, 116, 70, 34, 0.4)} />
          <path className="cs-line dim" d={wave(280, 116, 88, 20, 2.1)} />
        </g>
      </svg>
      <text className="cs-k" x="12" y="164">
        ALTITUDE
      </text>
      <text className="cs-v" x="12" y="188">
        {alt}
        <tspan className="cs-u"> km</tspan>
      </text>
      <text className="cs-k" x="112" y="164">
        VELOCITY
      </text>
      <text className="cs-v" x="112" y="188">
        {vel}
        <tspan className="cs-u"> km/s</tspan>
      </text>
      <text className="cs-k" x="214" y="164">
        G-LOAD
      </text>
      <text className="cs-v warm" x="214" y="188">
        {g}
        <tspan className="cs-u"> g</tspan>
      </text>
    </svg>
  );
}

function DataLink() {
  const link = useDrift(99.97, 0.02, 2);
  const lat = useDrift(42, 4, 0);
  const pps = useDrift(1284, 60, 0);
  return (
    <svg className="cs-svg" viewBox="0 0 285 205" preserveAspectRatio="none">
      <circle className="cs-dot" cx="12" cy="14" r="3" />
      <text className="cs-t" x="20" y="17">
        DATA LINK · HEALTH
      </text>
      <rect className="cs-pill" x="214" y="6" width="62" height="15" rx="7.5" />
      <text className="cs-t ok" x="245" y="17" textAnchor="middle">
        NOMINAL
      </text>
      <g className="cs-grid">
        {[44, 74, 104, 134].map((y) => (
          <path key={y} d={`M10 ${y}H275`} />
        ))}
      </g>
      <g className="cs-bars">
        {Array.from({ length: 16 }, (_, i) => (
          <rect
            key={i}
            x={14 + i * 16.2}
            y="40"
            width="10"
            height="100"
            style={{
              animationDelay: `${(-i * 0.37).toFixed(2)}s`,
              animationDuration: `${3.2 + (i % 5) * 0.45}s`,
            }}
          />
        ))}
      </g>
      <text className="cs-k" x="12" y="164">
        LINK
      </text>
      <text className="cs-v" x="12" y="188">
        {link}
        <tspan className="cs-u"> %</tspan>
      </text>
      <text className="cs-k" x="104" y="164">
        LATENCY
      </text>
      <text className="cs-v" x="104" y="188">
        {lat}
        <tspan className="cs-u"> ms</tspan>
      </text>
      <text className="cs-k" x="190" y="164">
        PACKETS
      </text>
      <text className="cs-v warm" x="190" y="188">
        {Number(pps).toLocaleString('en-GB')}
        <tspan className="cs-u">/s</tspan>
      </text>
    </svg>
  );
}

/** Positioned on the cockpit image itself, so the dashboards stay on its screens at any window size. */
export function CockpitScreens() {
  // When the intro text covers the left screen (narrower windows), that dashboard dims so the text stays readable.
  const left = useRef<HTMLDivElement>(null);
  const [covered, setCovered] = useState(false);
  useEffect(() => {
    const intro = document.querySelector('.cockpit-intro');
    const screen = left.current;
    if (!intro || !screen) return;
    // Measures the lines of text themselves, not the intro's box, which is wider than its text.
    const check = () => {
      const b = screen.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(intro);
      setCovered(
        [...range.getClientRects()].some(
          (r) => r.width > 0 && r.right > b.left + 8 && r.bottom > b.top + 8 && r.top < b.bottom - 8,
        ),
      );
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="cockpit-screens" aria-hidden="true">
      <div ref={left} className={`cockpit-screen cockpit-screen--left${covered ? ' is-covered' : ''}`}>
        <Telemetry />
      </div>
      <div className="cockpit-screen cockpit-screen--right">
        <DataLink />
      </div>
      <UtcClock />
    </div>
  );
}
