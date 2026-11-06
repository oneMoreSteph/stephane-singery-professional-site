// Galileo · Self-taught, then Jedha: the evening desk, the programme, the reasoning it built, where it led.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  CaseChip,
  Check,
  Code,
  Db,
  Graph,
  Header,
  Lab,
  OpsDefs,
  Spark,
  Sub,
  T,
  User,
  vars,
  Win,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

function Desk() {
  return (
    <Layer steps={[0]}>
      <Inspectable id="l-python" title="Python">
        <Win x={40} y={86} w={290} h={245} title="PYTHON">
          <Code
            x={58}
            y={138}
            lh={26}
            lines={[
              'import pandas as pd',
              '',
              'df = pd.read_csv("x.csv")',
              'df.groupby("city")',
              '  .size()',
              '  .sort_values()',
            ]}
          />
        </Win>
      </Inspectable>
      <Inspectable id="l-sql" title="SQL">
        <Win x={355} y={86} w={290} h={245} title="SQL">
          <Code
            x={373}
            y={138}
            lh={26}
            lines={[
              'SELECT city, COUNT(*)',
              'FROM orders',
              'GROUP BY city',
              'ORDER BY 2 DESC',
              '',
              'LIMIT 10',
            ]}
          />
        </Win>
      </Inspectable>
      <Inspectable id="l-stats" title="Statistics">
        <Win x={670} y={86} w={290} h={245} title="STATISTICS">
          <Bars x={695} y={130} w={240} h={170} vals={[0.12, 0.3, 0.55, 0.85, 1, 0.8, 0.5, 0.28, 0.1]} />
        </Win>
      </Inspectable>
      <Inspectable id="l-window" title="From 2019">
        <g>
          <T x={40} y={440} className="tx-big">
            2019
          </T>
          <Lab x={40} y={468} t="SELF-TAUGHT" />
          <Sub x={40} y={490} t="In the evenings" />
        </g>
      </Inspectable>
      <Inspectable id="l-laptop" title="Practice, until it holds">
        <g>
          {(
            [
              ['GOAL', 330],
              ['METHOD', 540],
              ['PRACTICE', 750],
            ] as const
          ).map(([t, x]) => (
            <Fragment key={t}>
              <circle className="tx-stage" cx={x} cy="440" r="42" />
              <Lab x={x} y={445} t={t} c="center" />
            </Fragment>
          ))}
          <Arrow from={[374, 440]} to={[494, 440]} />
          <Arrow from={[584, 440]} to={[704, 440]} />
          <path className="tx-link" d="M750 484V540H330V492" />
          <path className="tx-flow" d="M750 484V540H330V492" />
          <path className="tx-head" transform="translate(330 490) rotate(-90)" d="M2 0L-9-6V6Z" />
          <Lab x={540} y={570} t="AGAIN, UNTIL IT HOLDS" c="center" />
          {[0, 1, 2].map((i) => (
            <Check key={i} x={850 + i * 34} y={440} ok={i === 2} />
          ))}
        </g>
      </Inspectable>
    </Layer>
  );
}

const mlPoints: [number, number][] = [
  [710, 225],
  [735, 195],
  [760, 215],
  [775, 175],
  [810, 150],
  [840, 170],
  [860, 130],
  [895, 145],
];
const camps: [string, React.ReactNode][] = [
  [
    'PYTHON',
    <Code
      x={62}
      y={150}
      lh={24}
      lines={['def clean(df):', '  return df.dropna()', '', 'clean(raw).head()']}
    />,
  ],
  [
    'ANALYSIS · VISUALISATION',
    <Bars x={380} y={128} w={240} h={120} vals={[0.3, 0.55, 0.4, 0.8, 0.65, 0.95]} />,
  ],
  [
    'MACHINE LEARNING',
    <>
      <g className="tx-graph">
        {mlPoints.map(([x, y], i) => (
          <circle key={i} style={vars({ '--i': i })} cx={x} cy={y} r="5" />
        ))}
      </g>
      <path className="tx-spark on" d="M700 235L915 125" />
    </>,
  ],
  [
    'DEEP LEARNING',
    <Graph
      nodes={[
        [75, 350],
        [75, 400],
        [75, 450],
        [165, 335],
        [165, 375],
        [165, 425],
        [165, 465],
        [255, 375],
        [255, 425],
      ]}
      edges={[
        [0, 3],
        [0, 4],
        [0, 5],
        [1, 3],
        [1, 4],
        [1, 5],
        [1, 6],
        [2, 5],
        [2, 6],
        [3, 7],
        [4, 7],
        [4, 8],
        [5, 7],
        [5, 8],
        [6, 8],
      ]}
    />,
  ],
  [
    'DATA ENGINEERING',
    <>
      <Db cx={400} y={362} w={56} h={70} />
      <Arrow from={[432, 398]} to={[478, 398]} />
      <Db cx={510} y={362} w={56} h={70} />
      <Arrow from={[542, 398]} to={[588, 398]} />
      <Db cx={618} y={362} w={56} h={70} />
    </>,
  ],
  [
    'FINAL PROJECT',
    <>
      <User x={775} y={465} c="on" />
      <Arrow from={[800, 440]} to={[846, 400]} />
      <rect className="tx-app" x="850" y="350" width="80" height="60" rx="4" />
      <Check x={890} y={380} />
    </>,
  ],
];
const pos = (i: number) => [40 + (i % 3) * 315, 86 + Math.floor(i / 3) * 210];

function Programme() {
  return (
    <Layer steps={[1]}>
      {camps.map(([t, inner], i) => (
        <Inspectable key={t} id={`camp-${i}`} title={t.charAt(0) + t.slice(1).toLowerCase()}>
          <Win x={pos(i)[0]} y={pos(i)[1]} w={290} h={195} title={t}>
            {inner}
          </Win>
        </Inspectable>
      ))}
      <Inspectable id="cert" title="A state-recognised certification">
        <g>
          <rect className="tx-gauge" x="40" y="524" width="920" height="14" rx="3" />
          <rect className="tx-gauge-on" x="40" y="524" width="920" height="14" rx="3">
            <animate
              attributeName="width"
              values="0;920;920"
              keyTimes="0;.8;1"
              dur="10s"
              repeatCount="indefinite"
            />
          </rect>
          <Lab x={40} y={568} t="ABOUT 450 INTENSIVE HOURS" />
          <Lab x={960} y={568} t="STATE-RECOGNISED CERTIFICATION" c="end warm" />
          <Sub x={960} y={590} t="Data Science Developer" c="end" />
        </g>
      </Inspectable>
    </Layer>
  );
}

const steps = [140, 390, 640, 860];

function Reasoning() {
  return (
    <Layer steps={[2]}>
      <Inspectable id="q-who" title="A business question">
        <g>
          <Lab x={steps[0]} y={150} t="BUSINESS QUESTION" c="center" />
          <path className="tx-bubble" d="M90 180H190V240H130L112 258V240H90Z" />
          <T x={140} y={222} className="tx-big center">
            ?
          </T>
          <User x={140} y={330} s={1.2} />
        </g>
      </Inspectable>
      <Arrow from={[236, 250]} to={[306, 250]} />
      <Inspectable id="q-prob" title="A Data problem">
        <g>
          <Lab x={steps[1]} y={150} t="DATA PROBLEM" c="center" />
          <g className="tx-table">
            {Array.from({ length: 5 }, (_, r) =>
              Array.from({ length: 4 }, (_, c) => (
                <rect
                  key={`${r}${c}`}
                  className={c === 3 ? 'target' : ''}
                  x={318 + c * 36}
                  y={180 + r * 26}
                  width="36"
                  height="26"
                />
              )),
            )}
          </g>
          <Sub x={steps[1]} y={335} t="A target to predict" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[474, 250]} to={[544, 250]} />
      <Inspectable id="q-test" title="A tested answer">
        <g>
          <Lab x={steps[2]} y={150} t="TESTED ANSWER" c="center" />
          <path className="tx-axis" d="M560 180V320H720" />
          <path className="tx-spark on" d="M560 320C580 240 620 200 720 186" />
          <path className="tx-grid" d="M560 320L720 180" />
          <Sub x={steps[2]} y={345} t="Model, metric, limits" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[730, 250]} to={[790, 250]} />
      <Inspectable id="q-ship" title="Shipped">
        <g>
          <Lab x={steps[3]} y={150} t="SHIPPED" c="center" />
          <Win x={795} y={172} w={130} h={100} title="APP">
            <Spark x={810} y={208} w={100} h={50} vals={[0.2, 0.5, 0.4, 0.8, 0.9]} />
          </Win>
          <User x={860} y={330} s={1.2} c="on" />
          <Sub x={steps[3]} y={352} t="Someone uses it" c="center" />
        </g>
      </Inspectable>
      {steps.map((x) => (
        <Arrow key={x} from={[x, 470]} to={[x, 390]} />
      ))}
      <Inspectable id="beneath" title="Beneath every model">
        <g>
          <path className="tx-pipe" d="M60 500H940" />
          <path className="tx-pipe-flow" d="M60 500H940" />
          <Lab x={500} y={545} t="BENEATH EVERY MODEL: DATA THAT MUST BE RELIABLE" c="center warm" />
        </g>
      </Inspectable>
    </Layer>
  );
}

function WhereItLed() {
  return (
    <Layer steps={[3]}>
      <path className="tx-route" d="M60 170H940" />
      <Inspectable id="led-path" title="From Jedha">
        <g>
          <circle className="tx-stop" cx="120" cy="170" r="9" />
          <circle className="tx-stop" cx="370" cy="170" r="9" />
          <Lab x={120} y={140} t="2019" c="center" />
          <Sub x={120} y={200} t="Self-taught" c="center" />
          <Lab x={370} y={140} t="JEDHA" c="center" />
          <Sub x={370} y={200} t="Certified programme" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="led-date" title="February 2021">
        <g>
          <circle className="tx-stage on" cx="700" cy="170" r="15" />
          <Lab x={700} y={138} t="FEBRUARY 2021" c="center warm" />
          <Sub x={700} y={204} t="From operations to a Data team" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="led-food" title="FoodChéri’s Data team">
        <g>
          <Lab x={40} y={280} t="FOODCHÉRI DATA TEAM · WITH REAL USERS" c="strong" />
          <Lab x={130} y={335} t="INGESTION" c="center" />
          <Db cx={130} y={350} w={110} h={110} />
          <Arrow from={[190, 405]} to={[278, 405]} />
          <Win x={285} y={330} w={210} h={150} title="SQL MODELS">
            <Code x={301} y={378} lh={26} lines={['SELECT *', 'FROM raw.orders']} />
          </Win>
          <Arrow from={[500, 405]} to={[588, 405]} />
          <Win x={595} y={330} w={180} h={150} title="SELF-SERVICE">
            <Bars x={611} y={366} w={148} h={96} vals={[0.4, 0.7, 0.55, 0.9]} />
          </Win>
          <Arrow from={[780, 405]} to={[830, 405]} />
          <User x={860} y={425} c="on" />
          <User x={905} y={425} c="on" />
          <User x={950} y={425} c="on" />
          <Lab x={905} y={455} t="USERS" c="center" />
        </g>
      </Inspectable>
      <CaseChip
        x={40}
        y={540}
        w={420}
        to="food-data"
        kicker="NEXT · FOODCHÉRI DATA"
        sub="A first Data Platform, analysis opened to all"
      />
    </Layer>
  );
}

export default function LearningScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="SELF-TAUGHT, THEN JEDHA · 2019–2021" />
      <Desk />
      <Programme />
      <Reasoning />
      <WhereItLed />
    </>
  );
}
