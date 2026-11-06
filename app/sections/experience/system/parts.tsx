// Parts of the "one Data system" scenes: the system diagram shared by FoodChéri, Heetch and Verisure, and their readouts.
import { Fragment } from 'react';
import { useDrawing } from '~/drawings/context';
import { Inspectable } from '~/drawings/Inspectable';
import { Packet, T, vars } from '~/drawings/kit';
import { Corner, Crew, Line } from '~/drawings/ops';
import { SvgButton } from '~/drawings/spokenName';

export type Kind = 'food' | 'heetch' | 'verisure';
type ModuleId = 'src' | 'ing' | 'trf' | 'sto' | 'acc' | 'ppl';

export const sysCols: Record<ModuleId, number> = {
  src: 95,
  ing: 255,
  trf: 420,
  sto: 590,
  acc: 755,
  ppl: 905,
};
const titles: Record<ModuleId, string> = {
  src: 'SOURCES',
  ing: 'INGESTION',
  trf: 'TRANSFORMATION',
  sto: 'CURATED STORE',
  acc: 'ACCESS',
  ppl: 'PEOPLE',
};

const graphNodes: Record<string, [number, number]> = {
  a: [-36, -36],
  b: [-36, 0],
  c: [-36, 36],
  d: [0, -18],
  e: [0, 22],
  f: [36, 2],
};
const graphEdges = [
  ['a', 'd'],
  ['b', 'd'],
  ['b', 'e'],
  ['c', 'e'],
  ['d', 'f'],
  ['e', 'f'],
];

const icons: Record<ModuleId, React.ReactNode> = {
  src: [-36, -14, 8, 30].map((y, i) => (
    <Fragment key={y}>
      <rect className="sys-box" x="-42" y={y - 8} width="84" height="16" rx="2" />
      <circle className="sys-dot" cx="-32" cy={y} r="2.5" />
      <path className="sys-faint" d={`M-24 ${y}h${26 + i * 9}`} />
    </Fragment>
  )),
  ing: (
    <>
      <path className="sys-stroke" d="M-44-36C-8-36-12 0 18 0M-44 0H18M-44 36C-8 36-12 0 18 0" />
      <path className="sys-stroke" d="M18-12l17 12-17 12" />
      {[-36, 0, 36].map((y) => (
        <rect key={y} className="sys-chip" x="-48" y={y - 5} width="10" height="10" rx="1" />
      ))}
    </>
  ),
  trf: (
    <>
      {graphEdges.map(([p, q]) => (
        <path
          key={p + q}
          className="sys-edge"
          d={`M${graphNodes[p][0] + 7} ${graphNodes[p][1]}C${graphNodes[p][0] + 20} ${graphNodes[p][1]} ${graphNodes[q][0] - 20} ${graphNodes[q][1]} ${graphNodes[q][0] - 7} ${graphNodes[q][1]}`}
        />
      ))}
      {Object.entries(graphNodes).map(([k, [x, y]]) => (
        <rect key={k} className="sys-node" x={x - 7} y={y - 6} width="14" height="12" rx="2" />
      ))}
    </>
  ),
  sto: (
    <>
      <path className="sys-cyl" d="M-38-34v64c0 15 76 15 76 0v-64" />
      <ellipse className="sys-cyl-top" cy="-34" rx="38" ry="11" />
      {[-10, 12].map((y) => (
        <path key={y} className="sys-faint" d={`M-38 ${y}c0 15 76 15 76 0`} />
      ))}
    </>
  ),
  acc: (
    <>
      <rect className="sys-box" x="-44" y="-42" width="88" height="66" rx="3" />
      {[
        [-32, 14],
        [-18, 26],
        [-4, 20],
        [10, 34],
        [24, 42],
      ].map(([x, h]) => (
        <rect key={x} className="sys-bar" x={x} y={16 - h} width="9" height={h} />
      ))}
      <path className="sys-stroke thin" d="M-34-14L-18-24-2-18 14-32 32-36" />
      <path className="sys-faint" d="M-16 36h32M0 24v12" />
    </>
  ),
  ppl: [-30, 0, 30].flatMap((y) =>
    [-26, 0, 26].map((x) => <Crew key={`${x}${y}`} x={x} y={y - 6} s={0.62} />),
  ),
};

interface Copy {
  n: string;
  name: string;
  layer: string;
  org: string;
  years: string;
  sub: Record<ModuleId, string>;
  body: Record<ModuleId, string>;
  icon?: Partial<Record<ModuleId, React.ReactNode>>;
  scope: string;
  /** Per step: the modules brought forward. */
  focus: string[];
}

export const sysCopy: Record<Kind, Copy> = {
  food: {
    n: '01',
    name: 'FoodChéri',
    layer: 'Access',
    org: 'FOODCHÉRI / SEAZON',
    years: '2021–22',
    sub: {
      src: 'Multiple sources',
      ing: 'Ingestion pipelines',
      trf: 'SQL transformations',
      sto: 'BigQuery',
      acc: 'Metabase',
      ppl: 'Producers',
    },
    body: {
      src: 'Several business sources had to reach one shared foundation.',
      ing: 'I built ingestion pipelines to bring source data into the first end-to-end Data Platform.',
      trf: 'I wrote SQL transformations so analysis could rely on shared definitions.',
      sto: 'Curated BigQuery tables became the common foundation for analysis.',
      acc: 'Metabase: the BI layer where colleagues build their own questions and dashboards.',
      ppl: 'Colleagues across teams who build and improve their own analysis.',
    },
    scope: 'src ing trf sto acc ppl',
    focus: ['acc ppl', 'acc ppl', 'src ing trf sto', 'acc', 'ppl acc', 'src ing trf sto'],
  },
  heetch: {
    n: '02',
    name: 'Heetch',
    layer: 'Transformation',
    org: 'HEETCH',
    years: '2022–25',
    sub: {
      src: 'Raw arrivals',
      ing: 'BigQuery · raw',
      trf: 'Dataform',
      sto: 'BigQuery · curated',
      acc: 'BI · AI access',
      ppl: 'Downstream teams',
    },
    icon: {
      acc: (
        <>
          {(
            [
              ['LOOKER', 'BI', -24],
              ['VERTEX AI', 'AI', 24],
            ] as const
          ).map(([t, k, y]) => (
            <Fragment key={t}>
              <rect className="sys-box" x="-50" y={y - 19} width="100" height="38" rx="3" />
              <T x={0} y={y - 3} className="center mini-label">
                {k}
              </T>
              <T x={0} y={y + 12} className="center sys-sub">
                {t}
              </T>
            </Fragment>
          ))}
        </>
      ),
    },
    body: {
      src: 'Records arrive new, updated or late; the models have to account for each pattern.',
      ing: 'Raw Data landed in BigQuery, kept apart from curated Data.',
      trf: 'My SQL models and their incremental logic, in Dataform: Google Cloud’s equivalent of dbt.',
      sto: 'Curated datasets and views in BigQuery, available much sooner than the daily flow.',
      acc: 'BI access through Looker, AI access through Vertex AI.',
      ppl: 'Outside my main scope at Heetch: shown for context.',
    },
    scope: 'src ing trf sto acc',
    focus: ['', '', 'src ing trf sto acc', 'trf', '', 'trf'],
  },
  verisure: {
    n: '03',
    name: 'Verisure',
    layer: 'Observability',
    org: 'VERISURE',
    years: '2025–',
    sub: {
      src: 'Sources',
      ing: 'Ingestion',
      trf: 'dbt Core models',
      sto: 'Snowflake marts',
      acc: 'BI & decisions',
      ppl: 'Data teams',
    },
    body: {
      src: 'Outside my main scope at Verisure: shown for context.',
      ing: 'Outside my main scope at Verisure: shown for context.',
      trf: 'Tests run against the transformation layer that feeds the marts.',
      sto: '91 data marts are covered by automated quality monitoring.',
      acc: 'Unreliable data that is not caught early spreads into the decisions built on it.',
      ppl: 'A shared model helps Data teams qualify anomalies and coordinate a response.',
    },
    scope: 'trf sto acc ppl',
    focus: ['', 'acc ppl', 'band', 'band', 'band sto', 'band ppl acc'],
  },
};

function useFocus(kind: Kind) {
  const { step } = useDrawing();
  return (sysCopy[kind].focus[step] || '').split(' ');
}

function SysModule({ kind, id }: { kind: Kind; id: ModuleId }) {
  const c = sysCopy[kind];
  const focus = useFocus(kind);
  const x = sysCols[id];
  const w = id === 'ppl' ? 100 : 120;
  const t = titles[id];
  const cls = [
    'sys-module',
    `sys-${id}`,
    c.scope.split(' ').includes(id) && 'is-scope',
    focus.includes(id) && 'is-focus',
  ];
  return (
    <Inspectable
      id={`${kind}-${id}`}
      title={`${t[0]}${t.slice(1).toLowerCase()} · ${c.sub[id]}`}
      body={c.body[id]}
    >
      <g className={cls.filter(Boolean).join(' ')} data-id={id} transform={`translate(${x} 225)`}>
        <rect className="sys-frame" x={-w / 2} y="-75" width={w} height="150" rx="3" />
        <Corner w={w} h={150} ox={-w / 2} oy={-75} />
        <T x={-w / 2} y={-87} className="mini-label sys-title">
          {t}
        </T>
        <g className="sys-inner">{c.icon?.[id] || icons[id]}</g>
        <T x={0} y={62} className="center sys-sub">
          {c.sub[id]}
        </T>
      </g>
    </Inspectable>
  );
}

const chipCase: Record<Kind, string> = { food: 'food-data', heetch: 'heetch', verisure: 'verisure' };

/** The three roles as chips at the top: the current one marked, the others open their case. */
function ScopeChips({ kind }: { kind: Kind }) {
  return (
    <>
      {(Object.keys(chipCase) as Kind[]).map((k, i) => {
        const c = sysCopy[k];
        const current = k === kind;
        const x = 318 + i * 164;
        const face = (
          <>
            <rect width="156" height="44" rx="3" />
            <T x={12} y={19} className="chip-kicker">{`${c.n} ${c.layer.toUpperCase()}`}</T>
            <T x={12} y={35} className="chip-org">{`${c.org.split(' /')[0]} ${c.years}`}</T>
            <T x={144} y={35} className="chip-arrow end">
              {current ? '●' : '↗'}
            </T>
          </>
        );
        return current ? (
          <g key={k} className="scope-chip is-current" transform={`translate(${x} 18)`} aria-current="true">
            {face}
          </g>
        ) : (
          <SvgButton
            key={k}
            className="scope-chip"
            transform={`translate(${x} 18)`}
            data-open-case={chipCase[k]}
            purpose={`open the ${c.org} case`}
          >
            {face}
          </SvgButton>
        );
      })}
    </>
  );
}

const FLOW = 'M155 225H855';

/** The whole system diagram for one role, with that role's step layers below. */
export function SystemScene({ kind, children }: { kind: Kind; children: React.ReactNode }) {
  const c = sysCopy[kind];
  const focus = useFocus(kind);
  const verisure = kind === 'verisure';
  return (
    <g className={`sys sys--${kind}`} data-focus={JSON.stringify(c.focus)}>
      <T x={40} y={40} className="mini-label">
        ONE DATA SYSTEM · MY SCOPE BY ROLE
      </T>
      <T x={40} y={76} className="scene-heading">{`Layer ${Number(c.n)} · ${c.layer}`}</T>
      <ScopeChips kind={kind} />
      <Line d={FLOW} c="sys-conduit" />
      <Packet path={FLOW} delay={0} />
      <Packet path={FLOW} delay={2.4} />
      <Packet path={FLOW} delay={4.8} />
      <Inspectable
        id={`${kind}-band`}
        title="Observability · data health"
        body={
          verisure
            ? '525 automated Data tests run every day; anomalies become qualified, prioritised alerts in one shared model.'
            : `Not my focus at ${c.name}: this layer becomes the centre of my work at Verisure.`
        }
      >
        <g
          className={['sys-band', verisure && 'is-scope', focus.includes('band') && 'is-focus']
            .filter(Boolean)
            .join(' ')}
          data-id="band"
        >
          {Object.entries(sysCols)
            .filter(([id]) => id !== 'ppl')
            .map(([id, x]) => (
              <Line key={id} d={`M${x} 300V395`} c="sys-tap" />
            ))}
          <rect className="sys-frame" x="35" y="395" width="930" height="50" rx="3" />
          <Corner w={930} h={50} ox={35} oy={395} />
          <T x={35} y={386} className="mini-label sys-title">
            OBSERVABILITY · DATA HEALTH
          </T>
          {Array.from({ length: 62 }, (_, i) => (
            <rect
              key={i}
              className="band-tick"
              x={52 + i * 14.6}
              y="413"
              width="3"
              height="14"
              style={vars({ '--i': i })}
            />
          ))}
          {verisure && (
            <T x={282} y={386} className="mini-label warm">
              · ELEMENTARY · 525 DAILY TESTS
            </T>
          )}
        </g>
      </Inspectable>
      {(Object.keys(sysCols) as ModuleId[]).map((id) => (
        <SysModule key={id} kind={kind} id={id} />
      ))}
      <Line d="M35 470H965" c="fine-rule" />
      {children}
    </g>
  );
}

/** The large figure at the bottom left of each step. */
export function BigReadout({
  value,
  label,
  caption = '',
  word = false,
}: {
  value: string;
  label: string;
  caption?: string;
  word?: boolean;
}) {
  return (
    <>
      <T x={40} y={545} className={`readout-value${word ? ' word' : ''}`}>
        {value}
      </T>
      <T x={42} y={576} className="mini-label">
        {label}
      </T>
      {caption ? (
        <T x={42} y={602} className="readout-caption">
          {caption}
        </T>
      ) : null}
    </>
  );
}

export function Card(props: {
  x: number;
  y: number;
  w: number;
  h: number;
  kicker: string;
  title: string;
  body?: string;
  c?: string;
}) {
  const { x, y, w, h, kicker, title, body = '', c = '' } = props;
  return (
    <g transform={`translate(${x} ${y})`} className={`sys-card ${c}`}>
      <rect width={w} height={h} rx="3" />
      <T x={14} y={24} className="mini-label">
        {kicker}
      </T>
      <T x={14} y={50} className="card-title">
        {title}
      </T>
      {body ? (
        <T x={14} y={74} className="card-body">
          {body}
        </T>
      ) : null}
    </g>
  );
}

/** A link to another case, in the system scenes' format. */
export function SysLink({
  x,
  y,
  w,
  h = 58,
  to,
  label,
  kicker,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  to: string;
  label: string;
  kicker: string;
  sub: string;
}) {
  const tall = h === 58;
  return (
    <SvgButton className="case-link" transform={`translate(${x} ${y})`} data-open-case={to} purpose={label}>
      <rect width={w} height={h} rx="3" />
      <T x={16} y={tall ? 24 : 22} className="mini-label">
        {kicker}
      </T>
      <T x={16} y={tall ? 44 : 40} className="label small">
        {sub}
      </T>
      <T x={w - 18} y={tall ? 36 : 32} className="chip-arrow end">
        ↗
      </T>
    </SvgButton>
  );
}

/** A row of steps joined by arrows. */
export function StepRow({
  items,
  step,
  w,
  h,
  ty,
  arrowAt,
}: {
  items: string[];
  step: number;
  w: number;
  h: number;
  ty: number;
  arrowAt?: number;
}) {
  return (
    <>
      {items.map((t, i) => (
        <Fragment key={t}>
          <g className="mig-step" style={vars({ '--i': i })} transform={`translate(${i * step} 0)`}>
            <rect width={w} height={h} rx="3" />
            <T x={w / 2} y={ty} className="center chip-label strong">
              {t}
            </T>
          </g>
          {arrowAt !== undefined && i < items.length - 1 ? (
            <T x={i * step + arrowAt} y={30} className="chip-label">
              →
            </T>
          ) : null}
        </Fragment>
      ))}
    </>
  );
}
