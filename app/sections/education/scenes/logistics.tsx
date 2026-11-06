// Galileo · Logistics and transport studies: flows and modes, the constraints of a shipment, and what it still gives me.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Barge,
  Bars,
  FreightTrain,
  Header,
  Lab,
  Move,
  OpsDefs,
  Plane,
  Ship,
  Sub,
  T,
  Truck,
  User,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

const modes: [string, string, string, string, string, React.ReactNode, number][] = [
  ['lg-air', 'Air', 'AIR', 'Fastest', '€€€€', <Plane s={0.85} />, 5],
  ['lg-road', 'Road', 'ROAD', 'Door to door', '€€€', <Truck s={0.7} />, 9],
  ['lg-rail', 'Rail', 'RAIL', 'Heavy loads, fixed paths', '€€', <FreightTrain s={0.7} wagons={2} />, 11],
  ['lg-river', 'River', 'RIVER', 'Large volumes', '€', <Barge s={0.75} />, 15],
  ['lg-sea', 'Sea', 'SEA', 'Worldwide, by container', '€', <Ship s={0.62} />, 18],
];
const laneY = (i: number) => 150 + i * 96;

function Flows() {
  return (
    <Layer steps={[0]}>
      <Inspectable id="lg-wh" title="Flows of goods, stock and costs">
        <g>
          <Lab x={100} y={205} t="STOCK" c="center" />
          <Sub x={100} y={228} t="What waits" c="center" />
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              className="tx-crate"
              x={58 + (i % 3) * 32}
              y={250 + Math.floor(i / 3) * 34}
              width="26"
              height="26"
              rx="2"
            />
          ))}
        </g>
      </Inspectable>
      {modes.map(([id, title, t, s, cost, vehicle, dur], i) => (
        <Fragment key={id}>
          <Inspectable id={id} title={title}>
            <g>
              <path className="tx-route" d={`M190 ${laneY(i)}H810`} />
              <Lab x={200} y={laneY(i) + 24} t={t} />
              <Sub x={270} y={laneY(i) + 24} t={s} />
              <T x={800} y={laneY(i) + 24} className="tx-label end warm">
                {cost}
              </T>
            </g>
          </Inspectable>
          <Move path={`M240 ${laneY(i) - 6}H770`} dur={dur} begin={i}>
            {vehicle}
          </Move>
        </Fragment>
      ))}
      <Inspectable id="lg-promise" title="The promise">
        <g>
          <Lab x={885} y={205} t="CUSTOMER" c="center" />
          <User x={885} y={300} s={1.4} c="on" />
          <Lab x={885} y={340} t="ON TIME" c="center warm" />
          <Lab x={885} y={362} t="RIGHT COST" c="center warm" />
        </g>
      </Inspectable>
    </Layer>
  );
}

const gates: [string, string, string, string, React.ReactNode][] = [
  [
    'm-cost',
    'Cost control',
    'COST CONTROL',
    'Budget per shipment',
    <path d="M12-14C2-20-14-14-14 0S2 20 12 14M-20-5H6M-20 5H6" />,
  ],
  [
    'm-law',
    'Transport law',
    'TRANSPORT LAW',
    'Rules for each mode',
    <path d="M8-16C0-22-10-16-4-9L6-2C14 4 6 12 0 8M-8 16C0 22 10 16 4 9L-6 2C-14-4-6-12 0-8" />,
  ],
  [
    'm-nego',
    'Negotiation',
    'NEGOTIATION',
    'Carriers, clients',
    <path d="M-20 0L-8-10 2-6 12-10 20 0 8 12-2 4M-8-10L-14 8-4 16 8 12" />,
  ],
  [
    'm-lang',
    'Languages',
    'LANGUAGES',
    'International logistics',
    <>
      <circle r="18" />
      <path d="M-18 0H18M0-18C-10-8-10 8 0 18M0-18C10-8 10 8 0 18" />
    </>,
  ],
];
const gateX = (i: number) => 170 + i * 220;

function Dock() {
  return (
    <Layer steps={[1]}>
      <Lab x={60} y={120} t="A SHIPMENT, FROM ORDER TO DELIVERY" c="strong" />
      <path className="tx-route" d="M60 400H940" />
      {gates.map(([id, title, t, s, icon], i) => (
        <Inspectable key={id} id={id} title={title}>
          <g>
            <path className="tx-link" d={`M${gateX(i)} 310V388`} />
            <circle className="tx-stage" cx={gateX(i)} cy="260" r="48" />
            <g className="tx-icon" transform={`translate(${gateX(i)} 260)`}>
              {icon}
            </g>
            <Lab x={gateX(i)} y={188} t={t} c="center" />
            <Sub x={gateX(i)} y={440} t={s} c="center" />
            <circle className="tx-stop" cx={gateX(i)} cy="400" r="7" />
          </g>
        </Inspectable>
      ))}
      <Move path="M90 394H910" dur={14}>
        <Truck s={0.8} />
      </Move>
      <Inspectable id="m-intern" title="A company internship">
        <g>
          <path className="tx-axis" d="M110 490V510H890V490" />
          <Lab x={500} y={545} t="COMPANY INTERNSHIP: REAL CONSTRAINTS, REAL COUNTERPARTS" c="center" />
          <Sub x={500} y={568} t="Two years of planning" c="center" />
        </g>
      </Inspectable>
    </Layer>
  );
}

const hx = (h: number) => 220 + (h - 5) * 165;
const rows: [string, number, number][] = [
  ['SOURCE EXTRACT', 5, 0.7],
  ['INGESTION', 5.7, 0.55],
  ['SQL MODELS', 6.25, 0.75],
  ['MARTS', 7, 0.4],
  ['DASHBOARD', 7.4, 0.4],
];
const rowsY = (i: number) => 172 + i * 42;
const Bar = ({ i }: { i: number }) => {
  const [, h, d] = rows[i];
  return (
    <rect
      className="tx-gantt "
      x={hx(h).toFixed(1)}
      y={rowsY(i) - 13}
      width={(d * 165).toFixed(1)}
      height="24"
      rx="3"
    />
  );
};

function SameReasoning() {
  return (
    <Layer steps={[2]}>
      <Lab x={40} y={92} t="A DATA PIPELINE RUN, EVERY MORNING" c="strong" />
      {[5, 6, 7, 8, 9].map((h) => (
        <Fragment key={h}>
          <path className="tx-grid" d={`M${hx(h)} 142V${rowsY(4) + 22}`} />
          <T x={hx(h)} y={134} className="tx-sub center">{`0${h}:00`}</T>
        </Fragment>
      ))}
      {rows.map(([t], i) => (
        <Lab key={t} x={40} y={rowsY(i) + 4} t={t} />
      ))}
      <Inspectable id="give-chain" title="The whole chain">
        <g>
          <Bar i={0} />
          <rect
            className="tx-gantt late"
            x={(hx(5) + 0.7 * 165).toFixed(1)}
            y={rowsY(0) - 13}
            height="24"
            rx="3"
            width="0"
          >
            <animate
              attributeName="width"
              values="0;0;75;75;0"
              keyTimes="0;.25;.45;.9;1"
              dur="9s"
              repeatCount="indefinite"
            />
          </rect>
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0;0 0;75 0;75 0;0 0"
              keyTimes="0;.25;.45;.9;1"
              dur="9s"
              repeatCount="indefinite"
            />
            {[1, 2, 3, 4].map((i) => (
              <Bar key={i} i={i} />
            ))}
          </g>
          <Lab x={hx(5)} y={rowsY(4) + 42} t="A DELAY UPSTREAM LANDS DOWNSTREAM" />
        </g>
      </Inspectable>
      <Inspectable id="give-promise" title="The promise">
        <g>
          <path className="tx-promise" d={`M${hx(8)} 108V${rowsY(4) + 22}`} />
          <Lab x={hx(8) + 8} y={118} t="THE PROMISE: READY AT 08:00" c="warm" />
        </g>
      </Inspectable>
      <path className="tx-div" d="M40 416H960" />
      <Inspectable id="give-limit" title="A real constraint">
        <g>
          <Lab x={40} y={454} t="CONSTRAINTS" />
          <Sub x={40} y={490} t="Warehouse quota" />
          <rect className="tx-gauge" x="40" y="500" width="220" height="12" rx="3" />
          <rect className="tx-gauge-on warn" x="40" y="500" width="185" height="12" rx="3" />
          <Sub x={40} y={546} t="Source available from 05:00" />
          <rect className="tx-gauge" x="40" y="556" width="220" height="12" rx="3" />
          <rect className="tx-gauge-on" x="110" y="556" width="110" height="12" rx="3" />
        </g>
      </Inspectable>
      <Inspectable id="give-trade" title="Time against cost">
        <g>
          <Lab x={350} y={454} t="TIME AGAINST COST" />
          <Sub x={350} y={490} t="Data freshness" />
          <path className="tx-axis" d="M350 512H620" />
          <circle className="tx-alert" cx="350" cy="512" r="8">
            <animate attributeName="cx" values="350;620;350" dur="8s" repeatCount="indefinite" />
          </circle>
          <Sub x={350} y={536} t="Daily" />
          <Sub x={620} y={536} t="Hourly" c="end" />
          <Sub x={350} y={570} t="Cost" />
          <Bars x={420} y={546} w={200} h={34} vals={[0.15, 0.3, 0.55, 0.8, 1]} />
        </g>
      </Inspectable>
      <Inspectable id="give-obtain" title="What I need, obtained">
        <g>
          <Lab x={710} y={454} t="NEGOTIATED" />
          <User x={745} y={530} c="on" />
          <Arrow from={[775, 516]} to={[860, 516]} />
          <Arrow from={[860, 502]} to={[775, 502]} />
          <User x={890} y={530} />
          <Sub x={745} y={554} t="Me" c="center" />
          <Sub x={890} y={554} t="Source owner" c="center" />
          <Sub x={710} y={586} t="A new delivery time, agreed" />
        </g>
      </Inspectable>
    </Layer>
  );
}

export default function LogisticsScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="IUT DE CHARTRES · LOGISTICS AND TRANSPORT · 2008–2010" />
      <Flows />
      <Dock />
      <SameReasoning />
    </>
  );
}
