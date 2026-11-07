import { useEffect, useRef, useState } from 'react';

export type Trace = Record<string, unknown>;
export type Layout = Record<string, unknown>;
export interface PlotPoint {
  x?: number | string;
  y?: number | string;
  customdata?: unknown;
}
export interface PlotEvent {
  points?: PlotPoint[];
}
type PlotDiv = HTMLDivElement & {
  on?: (event: string, callback: (event: PlotEvent) => void) => void;
  removeAllListeners?: (event: string) => void;
};
interface PlotlyAPI {
  react: (
    element: HTMLElement,
    traces: Trace[],
    layout: Layout,
    config: Record<string, unknown>,
  ) => Promise<PlotDiv>;
  purge: (element: HTMLElement) => void;
  Plots: { resize: (element: HTMLElement) => void };
}
declare global {
  interface Window {
    Plotly?: PlotlyAPI;
  }
}

let loading: Promise<PlotlyAPI> | undefined;
function loadPlotly() {
  if (window.Plotly) return Promise.resolve(window.Plotly);
  if (!loading)
    loading = new Promise<PlotlyAPI>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/courses/nyc-taxi/vendor/plotly.min.js';
      script.async = true;
      script.onload = () =>
        window.Plotly ? resolve(window.Plotly) : reject(new Error('Plotly did not initialise.'));
      script.onerror = () => {
        loading = undefined;
        script.remove();
        reject(new Error('Unable to load the bundled chart library.'));
      };
      document.head.appendChild(script);
    });
  return loading;
}

export const axis = {
  gridcolor: 'rgba(169,231,241,.10)',
  zerolinecolor: 'rgba(169,231,241,.22)',
  tickfont: { size: 11, color: '#abc4cd' },
  title: { font: { size: 12, color: '#abc4cd' } },
  automargin: true,
  fixedrange: false,
};

/** The few MapLibre methods used to wait for a basemap. */
interface BaseMap {
  isStyleLoaded: () => boolean;
  once: (event: string, listener: () => void) => void;
}

/** The basemap of a Plotly map chart, if the chart is a map. */
const basemapOf = (target: HTMLElement | null) =>
  (target as unknown as { _fullLayout?: { map?: { _subplot?: { map?: BaseMap } } } } | null)?._fullLayout?.map
    ?._subplot?.map;

/** Resolves once a map's basemap has loaded; at once for other charts. */
const basemapReady = (target: HTMLElement | null) =>
  new Promise<void>((resolve) => {
    const map = basemapOf(target);
    if (map && !map.isStyleLoaded()) map.once('idle', () => resolve());
    else resolve();
  });

/** Native Plotly charts, styled with the portfolio palette and bundled for offline use. */
export function Plot({
  traces,
  layout,
  label,
  height = 370,
  onClick,
}: {
  traces: Trace[];
  layout?: Layout;
  label: string;
  height?: number;
  onClick?: (event: PlotEvent) => void;
}) {
  const element = useRef<PlotDiv>(null);
  const click = useRef(onClick);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  // The last render. A map is purged only once its basemap has loaded, or Plotly throws.
  const drawing = useRef<Promise<unknown>>(Promise.resolve());
  useEffect(() => {
    click.current = onClick;
  }, [onClick]);
  useEffect(() => {
    const target = element.current;
    if (!target) return;
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    let visibility: IntersectionObserver | undefined;
    const render = () =>
      void (drawing.current = loadPlotly()
        .then(async (api) => {
          await basemapReady(target);
          if (cancelled) return;
          const chart = await api.react(
            target,
            traces,
            {
              autosize: true,
              height,
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: {
                family: 'Inter, Avenir Next, Avenir, Helvetica, Arial, sans-serif',
                color: '#eaf3f4',
                size: 12,
              },
              margin: { l: 58, r: 24, t: 24, b: 60 },
              xaxis: { ...axis },
              yaxis: { ...axis },
              hoverlabel: {
                bgcolor: '#102b39',
                bordercolor: '#a9e7f1',
                font: { color: '#eaf3f4', size: 13 },
              },
              legend: { orientation: 'h', y: -0.25, x: 0, font: { color: '#abc4cd', size: 11 } },
              colorway: ['#a9e7f1', '#f6d77a', '#9ba5ed', '#75d3ae', '#e5b0ca'],
              ...layout,
            },
            {
              responsive: true,
              displaylogo: false,
              displayModeBar: 'hover',
              modeBarButtonsToRemove: ['lasso2d', 'select2d'],
              toImageButtonOptions: { format: 'png', scale: 2 },
            },
          );
          if (cancelled) return;
          setError('');
          setReady(true);
          chart.removeAllListeners?.('plotly_click');
          chart.on?.('plotly_click', (event) => click.current?.(event));
          observer = new ResizeObserver(() => {
            if (!cancelled) api.Plots.resize(target);
          });
          observer.observe(target);
        })
        .catch((reason) => {
          if (!cancelled) setError(String(reason));
        }));
    if (window.Plotly && target.classList.contains('js-plotly-plot')) render();
    else if ('IntersectionObserver' in window) {
      visibility = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            visibility?.disconnect();
            render();
          }
        },
        { rootMargin: '250px 0px' },
      );
      visibility.observe(target);
    } else render();
    return () => {
      cancelled = true;
      visibility?.disconnect();
      observer?.disconnect();
      target.removeAllListeners?.('plotly_click');
    };
  }, [traces, layout, height]);
  useEffect(() => {
    const target = element.current;
    const last = drawing;
    const purge = () => {
      try {
        if (target && window.Plotly) window.Plotly.purge(target);
      } catch {
        // The chart is already gone from the page.
      }
    };
    return () => {
      // A map whose basemap is still loading throws if purged: wait for it.
      void last.current.finally(() => basemapReady(target).then(purge));
    };
  }, []);
  return (
    <>
      <div className="taxi-plot-shell">
        <div
          ref={element}
          className="taxi-plot"
          role="group"
          aria-label={label}
          style={{ minHeight: height }}
        />
        {!ready && !error && (
          <span className="taxi-plot-loading" aria-hidden="true">
            Loading interactive chart…
          </span>
        )}
      </div>
      {error && (
        <p role="alert" className="taxi-chart-error">
          {error} The analytical findings and data tables remain available below.
        </p>
      )}
    </>
  );
}
