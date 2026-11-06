// Earth · SNCF Réseau: one shared network, my portfolio of freight customers, and the years each request lasted.
import { Fragment } from 'react';
import { mid, route } from '~/drawings/france';
import { Inspectable } from '~/drawings/Inspectable';
import { CaseChip, T } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Line, TrainMarker } from '~/drawings/ops';
import { Panel, RailBase, RailCities } from '~/drawings/rail';

const lines = [
  route(['Lille', 'Paris', 'Dijon', 'Lyon', 'Marseille']),
  route(['Paris', 'Metz', 'Strasbourg']),
  route(['Bordeaux', 'Lyon']),
];
const others = [
  route(['Paris', 'Rennes', 'Nantes', 'Bordeaux', 'Toulouse']),
  route(['Paris', 'Metz', 'Strasbourg', 'Mulhouse']),
  route(['Toulouse', 'Marseille']),
];
const works = [mid('Dijon', 'Lyon'), mid('Bordeaux', 'Toulouse')];

const legend: [string, string, React.ReactNode][] = [
  [
    'Freight trains',
    'My customers’ trains, on paths I secured.',
    <rect className="tm-loco" x="0" y="-4" width="14" height="8" rx="2" />,
  ],
  [
    'Other operators',
    'Passenger and freight trains of other operators, on the same lines.',
    <rect className="tm-car other" x="0" y="-4" width="14" height="8" rx="2" />,
  ],
  [
    'Engineering works',
    'Works close sections of the network for a period and take capacity away.',
    <rect className="works-mark" x="0" y="-4" width="14" height="8" rx="2" />,
  ],
];

function SharedNetwork() {
  return (
    <Layer steps={[0]}>
      <g className="rf-other">
        {others.map((d, i) => (
          <TrainMarker key={i} path={d} dur={18 + i * 4} begin={i * 5} c="other-op" />
        ))}
      </g>
      <g className="rf-freight">
        <TrainMarker path={lines[0]} dur={24} begin={2} />
        <TrainMarker path={lines[1]} dur={16} begin={6} />
      </g>
      <g className="rf-works">
        {works.map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect className="works-mark" x="-12" y="-6" width="24" height="12" rx="2" />
            <circle className="works-ping" r="16" />
          </g>
        ))}
      </g>
      <Panel x={700} y={96} w={270} h={150} />
      <T x={720} y={124} className="mini-label">
        ONE NETWORK, SHARED
      </T>
      {legend.map(([t, body, swatch], i) => (
        <Inspectable key={t} id={`lg-${i}`} title={t} body={body}>
          <g transform={`translate(720 ${146 + i * 26})`}>
            {swatch}
            <T x={24} y={4} className="label small">
              {t}
            </T>
          </g>
        </Inspectable>
      ))}
      <T x={720} y={230} className="mini-label muted-label">
        Same train paths, same hours
      </T>
    </Layer>
  );
}

const portfolio: [string, string][] = [
  ['Greenmodal (CMA CGM)', 'Freight customer'],
  ['Freight customer', 'Illustrative'],
  ['Freight customer', 'Illustrative'],
];

function Customers() {
  return (
    <Layer steps={[1]}>
      {lines.map((d, i) => (
        <g key={i} className={`rf-cust rf-cust-${i}`}>
          <Line d={d} c="route-glow" />
          <Line d={d} c="active-route" />
          <TrainMarker path={d} dur={[24, 14, 16][i]} begin={i * 3} />
        </g>
      ))}
      <Panel x={700} y={96} w={270} h={250} />
      <T x={720} y={124} className="mini-label warm">
        MY PORTFOLIO
      </T>
      {portfolio.map(([t, s2], i) => (
        <Inspectable
          key={i}
          id={`cust-${i}`}
          title={t}
          body={
            i
              ? 'A freight customer of my portfolio. Illustrative row.'
              : 'Greenmodal (CMA CGM), one of the freight customers I managed.'
          }
        >
          <g transform={`translate(720 ${150 + i * 46})`}>
            <rect className="tm-loco" x="0" y="-4" width="14" height="8" rx="2" />
            <T x={24} y={4} className="card-title small-title">
              {t}
            </T>
            <T x={24} y={22} className="card-body">
              {s2}
            </T>
          </g>
        </Inspectable>
      ))}
      <Line d="M720 300H950" c="fine-rule" />
      <Inspectable
        id="defend"
        title="Before the entity granting the agreements"
        body="For each customer, I built the requests, defended them and obtained the schedules that best fit their business."
      >
        <g>
          <T x={720} y={326} className="mini-label">
            DEFENDED BEFORE THE ENTITY
          </T>
          <T x={720} y={342} className="mini-label">
            GRANTING THE AGREEMENTS
          </T>
        </g>
      </Inspectable>
    </Layer>
  );
}

const ticks: [string, number][] = [
  ['Y−3', 60],
  ['Y−2', 290],
  ['Y−1', 520],
  ['D−1', 800],
  ['D', 940],
];

function LongClock() {
  return (
    <g className="long-clock" transform="translate(0 520)">
      <Panel x={40} y={0} w={920} h={170} />
      <T x={60} y={30} className="mini-label">
        YEARS AHEAD · ONE CUSTOMER REQUEST
      </T>
      <Line d="M60 100H940" c="clock-axis" />
      {ticks.map(([l, x]) => (
        <Fragment key={l}>
          <Line d={`M${x} 94V106`} c="clock-axis" />
          <T x={x} y={128} className="center axis-label">
            {l}
          </T>
        </Fragment>
      ))}
      <Inspectable
        id="wk"
        title="Engineering works"
        body="Works take capacity away for a period: the request has to hold through them."
      >
        <g>
          <rect className="works-window" x="330" y="74" width="150" height="20" rx="2" />
          <T x={405} y={66} className="center mini-label warm">
            WORKS
          </T>
        </g>
      </Inspectable>
      <Inspectable id="od" title="Other demands" body="Other operators want the same capacity.">
        <g>
          <rect className="other-use" x="580" y="74" width="120" height="20" rx="2" />
          <T x={640} y={66} className="center mini-label">
            OTHER DEMANDS
          </T>
        </g>
      </Inspectable>
      <Line
        d="M60 84H310C322 84 322 110 334 110H476C488 110 488 84 500 84H566C574 84 574 110 586 110H694C706 110 706 84 718 84H940"
        c="clock-path"
      />
      <Inspectable
        id="runs"
        title="The train runs"
        body="I followed each request until the day of circulation."
      >
        <T x={940} y={150} className="end mini-label warm">
          THE TRAIN RUNS
        </T>
      </Inspectable>
    </g>
  );
}

export default function RffScene() {
  return (
    <>
      <RailBase />
      <SharedNetwork />
      <Customers />
      <Layer steps={[2]}>
        <Line d={lines[0]} c="route-glow" />
        <Line d={lines[0]} c="active-route" />
        <TrainMarker path={lines[0]} dur={24} begin={6} />
        <LongClock />
        <Panel x={700} y={96} w={270} h={170} />
        <T x={720} y={124} className="mini-label">
          MOMENTS FROM THESE YEARS
        </T>
        <CaseChip x={716} y={140} w={238} to="toyota" kicker="HIGH-STAKES · TOYOTA" sub="Europe, 2013" />
        <CaseChip
          x={716}
          y={204}
          w={238}
          to="tour"
          kicker="HIGH-STAKES · TOUR"
          sub="Level crossings, five years"
        />
      </Layer>
      <Layer steps={[3]}>
        <Inspectable
          id="nov16"
          title="November 2016"
          body="I chose a role on the passenger side of the railway: Transilien Ligne C."
        >
          <g>
            <Panel x={560} y={520} w={400} h={170} />
            <T x={580} y={550} className="mini-label warm">
              NOVEMBER 2016
            </T>
            <T x={580} y={580} className="card-title">
              Toward passengers
            </T>
          </g>
        </Inspectable>
        <CaseChip
          x={576}
          y={608}
          w={368}
          to="ligne-c"
          kicker="NEXT · TRANSILIEN LIGNE C"
          sub="Passenger-care plans for 42 stations"
        />
      </Layer>
      <RailCities />
    </>
  );
}
