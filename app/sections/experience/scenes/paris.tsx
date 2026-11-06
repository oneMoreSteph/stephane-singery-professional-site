// Earth · FoodChéri hubs: six delivery hubs on real Paris arrondissements; my week, the service, what it opened.
// Hub, stock and order positions are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import { CaseChip, Db, Lab, OpsDefs, Packet, Sub, T, vars, Win, Bars, type Pt } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Line } from '~/drawings/ops';
import { arrondissements } from '~/drawings/data/geography';

function Bike({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="bike">
      <circle cx="-15" cy="9" r="10" />
      <circle cx="18" cy="9" r="10" />
      <path d="M-15 9l9-20L4 9h-19L8-7l10 16M8-7l-3-8h7" />
      <circle className="bike-rider" cx="2" cy="-24" r="5" />
      <rect className="bike-box" x="-21" y="-23" width="12" height="11" rx="1" />
    </g>
  );
}
/** A delivery hub, seen from above. */
const Hub = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-icon hub-mark" transform={`translate(${x} ${y})`}>
    <rect x="-15" y="-11" width="30" height="24" rx="2" />
    <path d="M-15-11L0-21 15-11M-6 13V3H6V13" />
  </g>
);
/** Stacked crates: the food stock. */
const Crates = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    {[
      [-22, 0],
      [2, 0],
      [-10, -20],
    ].map(([cx, cy], i) => (
      <rect key={i} className="tx-crate" x={cx} y={cy} width="22" height="18" rx="2" />
    ))}
  </g>
);

const hubs: Pt[] = [
  [270, 235],
  [420, 180],
  [595, 250],
  [600, 410],
  [415, 465],
  [240, 390],
];
const roads = [
  'M180 350Q310 270 420 180T630 220',
  'M240 390Q390 315 595 250',
  'M270 235Q355 395 415 465',
  'M180 300L600 410',
  'M300 150L600 470',
  'M185 445L630 180',
  'M160 230Q410 130 660 340',
];
const rounds = [
  'M270 235Q310 235 330 280T370 330Q330 360 295 332',
  'M600 410Q640 375 615 340T560 310Q525 360 550 390',
  'M415 465Q385 420 420 390T470 330',
];
const orders: Pt[] = [
  [300, 190],
  [365, 250],
  [455, 215],
  [520, 190],
  [560, 300],
  [640, 330],
  [660, 445],
  [560, 470],
  [480, 420],
  [360, 430],
  [300, 350],
  [220, 300],
  [205, 440],
  [470, 320],
];
const near = ([x, y]: Pt) =>
  hubs.reduce((b, h) => (Math.hypot(h[0] - x, h[1] - y) < Math.hypot(b[0] - x, b[1] - y) ? h : b));
const seine = 'M170 310C240 270 220 425 320 421S350 320 430 330S490 410 560 370S620 340 690 400';

// The right-hand column, clear of the map.
const X = 756;
const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function MyWeek() {
  return (
    <Layer steps={[0]}>
      <rect className="map-panel" x={X - 16} y={86} width="240" height="440" rx="4" />
      <Inspectable
        id="hb-week"
        title="Evenings and weekends"
        body="SNCF in the day; FoodChéri’s hubs in the evenings and at weekends.|From 2016 to 2019."
      >
        <g>
          <Lab x={X} y={116} t="MY WEEK · 2016–2019" c="warm" />
          {days.map((d, i) => {
            const weekend = i > 4;
            return (
              <Fragment key={d}>
                <T x={X} y={158 + i * 34} className="tx-win-t">
                  {d}
                </T>
                {!weekend && (
                  <rect className="tx-gantt" x={X + 44} y={146 + i * 34} width="96" height="16" rx="2" />
                )}
                <rect
                  className="tx-gantt evening"
                  x={weekend ? X + 44 : X + 144}
                  y={146 + i * 34}
                  width={weekend ? 156 : 56}
                  height="16"
                  rx="2"
                />
              </Fragment>
            );
          })}
          <rect className="tx-gantt" x={X} y={404} width="16" height="12" rx="2" />
          <Sub x={X + 24} y={415} t="SNCF" />
          <rect className="tx-gantt evening" x={X} y={428} width="16" height="12" rx="2" />
          <Sub x={X + 24} y={439} t="FoodChéri hubs" />
        </g>
      </Inspectable>
      <Inspectable
        id="hb-goal"
        title="A second job, for a personal goal"
        body="A second job alongside SNCF.|Taken to reach a personal goal."
      >
        <g>
          <Lab x={X} y={480} t="A SECOND JOB" />
          <Sub x={X} y={502} t="For a personal goal" />
        </g>
      </Inspectable>
    </Layer>
  );
}

const service: [string, string, string, string, React.ReactNode][] = [
  [
    'hb-stock',
    'FOOD STOCK',
    'Six Paris hubs',
    'The food stock held in each hub.|Each order needs the right stock in the right hub.',
    <Crates key="c" x={X + 22} y={150} />,
  ],
  [
    'hb-orders',
    'ORDERS → RIGHT HUB',
    'Each one dispatched',
    'Every order, sent to the hub that serves it.|The first step of every delivery.',
    <g key="o">
      <circle className="order-pin" cx={X + 8} cy={224} r="5" />
      <path className="order-link" d={`M${X + 8} 224L${X + 34} 206`} />
      <Hub x={X + 40} y={206} />
    </g>,
  ],
  [
    'hb-rides',
    'MULTI-ORDER RIDES',
    'Bicycles and motorbikes',
    'Several orders grouped into one ride for a rider.|More deliveries per ride, on time.',
    <Bike key="b" x={X + 22} y={300} s={0.7} />,
  ],
  [
    'hb-care',
    'CUSTOMER CARE',
    'With customers',
    'Questions and issues from customers about their orders.|Handled during the service.',
    <path key="k" className="tx-bubble" d={`M${X} 370h46v28H${X + 18}l-8 9v-9H${X}z`} />,
  ],
];

function TheHubs() {
  return (
    <Layer steps={[1]}>
      {hubs.map(([x, y]) => (
        <Fragment key={x}>
          <Line d={`M82 510Q${x - 100} ${y + 100} ${x} ${y}`} c="stock-flow" />
          <Packet path={`M82 510Q${x - 100} ${y + 100} ${x} ${y}`} delay={x / 100} colour="#f3c88c" />
        </Fragment>
      ))}
      {orders.map((o, i) => {
        const [hx, hy] = near(o);
        return (
          <Fragment key={i}>
            <Line d={`M${o[0]} ${o[1]}L${hx} ${hy}`} c="order-link" />
            <circle className="order-pin" cx={o[0]} cy={o[1]} r="5" style={vars({ '--i': i })} />
          </Fragment>
        );
      })}
      {rounds.map((d) => (
        <Fragment key={d}>
          <Line d={d} c="delivery-route" />
          <Packet path={d} delay={1} />
        </Fragment>
      ))}
      <Bike x={345} y={307} s={0.7} />
      <Bike x={590} y={350} s={0.7} />
      <Bike x={444} y={397} s={0.7} />
      <rect className="map-panel" x={X - 16} y={86} width="240" height="350" rx="4" />
      <Lab x={X} y={116} t="EACH SERVICE" c="warm" />
      {service.map(([id, t, s, body, icon], i) => (
        <Inspectable key={id} id={id} title={t.charAt(0) + t.slice(1).toLowerCase()} body={body}>
          <g>
            {icon}
            <Lab x={X + 64} y={150 + i * 76} t={t} />
            <Sub x={X + 64} y={170 + i * 76} t={s} />
          </g>
        </Inspectable>
      ))}
    </Layer>
  );
}

function WhatItOpened() {
  return (
    <Layer steps={[2]}>
      <rect className="map-panel" x={X - 16} y={86} width="240" height="330" rx="4" />
      <Inspectable
        id="hb-inside"
        title="Inside a food-tech company"
        body="My first experience inside a food-tech company.|I saw how its teams used Data every day."
      >
        <g>
          <Lab x={X} y={116} t="2016 · THE HUBS" />
          <Sub x={X} y={138} t="Inside a food-tech company" />
          <path className="tx-route" d={`M${X + 6} 156V236`} />
          <circle className="tx-stage" cx={X + 6} cy={156} r="6" />
          <circle className="tx-stage on" cx={X + 6} cy={250} r="9" />
        </g>
      </Inspectable>
      <Inspectable
        id="hb-data"
        title="February 2021: the Data team"
        body="I joined FoodChéri’s Data team in February 2021.|The door the hubs had opened."
      >
        <g>
          <Lab x={X + 24} y={256} t="FEB 2021 · DATA TEAM" c="warm" />
          <Win x={X + 24} y={276} w={180} h={100} title="DATA">
            <Db cx={X + 66} y={306} w={50} h={58} />
            <Bars x={X + 108} y={310} w={84} h={52} vals={[0.4, 0.7, 0.55, 0.9]} />
          </Win>
        </g>
      </Inspectable>
      <CaseChip
        x={X - 10}
        y={440}
        w={240}
        to="food-data"
        kicker="NEXT · FOODCHÉRI DATA"
        sub="Where I started in Data"
      />
    </Layer>
  );
}

export default function ParisScene() {
  return (
    <g className="paris-map">
      <OpsDefs />
      {arrondissements.map((a) => (
        <Fragment key={a.number}>
          <path d={a.d} className="paris-arr" />
          <T x={a.center[0]} y={a.center[1]} className="arr-label">
            {a.number}
          </T>
        </Fragment>
      ))}
      {roads.map((d) => (
        <Line key={d} d={d} c="paris-road" />
      ))}
      <Line d={seine} c="seine-bank" />
      <Line d={seine} c="seine" />
      <T x={368} y={350} className="sea-label">
        SEINE
      </T>
      <Inspectable
        id="hb-hubs"
        title="Six delivery hubs"
        body="Six FoodChéri hubs across Paris, which I ran.|Positions are illustrative."
      >
        <g>
          {hubs.map(([x, y], i) => (
            <Fragment key={i}>
              <Hub x={x} y={y} />
              <Lab x={x} y={y + 34} t={`HUB ${i + 1}`} c="center" />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="hb-supply"
        title="Supply"
        body="The supply point that feeds the hubs’ stock.|Position illustrative."
      >
        <g>
          <Crates x={92} y={512} />
          <Lab x={82} y={560} t="SUPPLY" c="center" />
        </g>
      </Inspectable>
      <MyWeek />
      <TheHubs />
      <WhatItOpened />
    </g>
  );
}
