// Sentinel · Find a way: one constraint and the way through it, in four real scenes.
// Station names, paths and positions are illustrative; constraints and outcomes are from each role.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  CaseChip,
  Check,
  FreightTrain,
  Header,
  Lab,
  Link,
  Move,
  OpsDefs,
  Sub,
  T,
  User,
  vars,
  Win,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

// ---------- shared ----------
function Close({ t, s, children }: { t: string; s: string; children?: React.ReactNode }) {
  return (
    <>
      <path className="tx-div" d="M40 566H960" />
      <Lab x={40} y={600} t={t} c="warm" />
      <Sub x={40} y={624} t={s} />
      {children}
    </>
  );
}
function Medal({
  x,
  y,
  r = 30,
  i,
  on,
}: {
  x: number;
  y: number;
  r?: number;
  i: React.ReactNode;
  on?: boolean;
}) {
  return (
    <>
      <circle className={`tx-stage${on ? ' vs-on' : ''}`} cx={x} cy={y} r={r} />
      <g className="tx-icon" transform={`translate(${x} ${y}) scale(${(r / 44) * 1.6})`}>
        {i}
      </g>
    </>
  );
}
const Loco = () => (
  <g className="freight-train">
    <path className="ft-loco" d="M-52 -6V-22H-16V-30H-5L0 -23V-6Z" />
    <rect className="ft-window" x="-13" y="-28" width="7" height="5" rx="1" />
    {[-44, -33, -21, -9].map((cx) => (
      <circle key={cx} className="ft-wheel" cx={cx} cy="-2.5" r="3.5" />
    ))}
  </g>
);
const Signal = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path className="fw-post" d={`M${x} ${y}V${y - 46}`} />
    <rect className="fw-head" x={x - 7} y={y - 62} width="14" height="20" rx="3" />
    <circle className="fw-red" cx={x} cy={y - 52} r="5" />
  </g>
);
const Rider = () => (
  <g className="fw-rider">
    <circle cx="-8" cy="0" r="6" />
    <circle cx="8" cy="0" r="6" />
    <path d="M-8 0L-2-10H6L8 0M-2-10L0-16M4-18a3 3 0 1 0 0.1 0" />
  </g>
);
const icon = {
  moon: <path d="M6-14A14 14 0 1 0 14 6 11 11 0 0 1 6-14Z" />,
  lens: (
    <>
      <circle cx="-3" cy="-3" r="10" />
      <path d="M4 4L14 14" />
    </>
  ),
  doc: (
    <>
      <path d="M-10-14H5L11-8V14H-10Z" />
      <path d="M-5-4H6M-5 2H6M-5 8H2" />
    </>
  ),
  control: (
    <>
      <rect x="-14" y="-12" width="28" height="18" rx="2" />
      <path d="M-8 12H8M0 6V12M-9-4L-3-8 3-3 9-7" />
    </>
  ),
};

// ---------- 1 · VFLI ----------
function Vfli() {
  return (
    <Layer steps={[0]}>
      <Lab x={40} y={92} t="VFLI · A TRAIN TO RUN TONIGHT, AS PROMISED" c="strong" />
      <Inspectable
        id="fw-shifts"
        title="3×8 shifts"
        body="Three shifts a day, day and night, every day of the year.|Problems arrive at any hour; so does the answer."
      >
        <g>
          <Medal x={910} y={140} r={28} i={icon.moon} />
          <Lab x={866} y={136} t="3×8 SHIFTS" c="end" />
          <Sub x={866} y={156} t="Day and night" c="end" />
        </g>
      </Inspectable>
      <path className="tx-route" d="M40 400H960" />
      <Inspectable
        id="fw-train"
        title="A train with no locomotive"
        body="The wagons are loaded and the customer expects them tonight, but the locomotive or its driver is missing.|The plan breaks at the last minute."
      >
        <g>
          <g className="fw-noloco">
            <FreightTrain x={470} y={400} s={1.4} wagons={5} />
          </g>
          <Lab x={270} y={330} t="NO LOCOMOTIVE · NO DRIVER" c="center" />
          <Sub x={270} y={436} t="Loaded, expected tonight" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="fw-company"
        title="Another company, convinced"
        body="I convinced another company to make a shunting locomotive or a driver available.|What the train needed, obtained."
      >
        <g>
          <path className="tx-layer top" d="M560 260V170L660 128 760 170V260Z" />
          <g transform="translate(700 252) scale(1.2)">
            <Loco />
          </g>
          <User x={600} y={252} s={0.9} c="on" />
          <Lab x={660} y={100} t="ANOTHER COMPANY" c="center" />
          <Sub x={660} y={118} t="Convinced to make one available" c="center" />
          <path className="fw-path" d="M640 290C620 340 560 400 520 400" />
          <Move path="M640 290C620 340 560 400 520 400" dur={4}>
            <g transform="scale(1.1)">
              <Loco />
            </g>
          </Move>
        </g>
      </Inspectable>
      <Inspectable
        id="fw-agreement"
        title="A last-minute agreement"
        body="A circulation agreement obtained with the network, at the last minute.|The path for the train, tonight."
      >
        <g>
          <Medal x={600} y={480} r={26} i={icon.doc} on />
          <Lab x={636} y={478} t="LAST-MINUTE AGREEMENT" />
          <Sub x={636} y={498} t="With the network, tonight" />
        </g>
      </Inspectable>
      <Inspectable
        id="fw-customer"
        title="The train runs, as promised"
        body="The customer’s train runs at the promised place and hour.|What a freight customer pays for."
      >
        <g>
          <Arrow from={[480, 400]} to={[846, 400]} />
          <Move path="M480 400H846" dur={5}>
            <circle className="tx-alert" r="6" />
          </Move>
          {[0, 1].map((i) => (
            <User key={i} x={890 + i * 30} y={392} s={0.8} />
          ))}
          <Lab x={905} y={430} t="CUSTOMER" c="center" />
          <Sub x={905} y={450} t="As promised" c="center" />
        </g>
      </Inspectable>
      <Close t="A LOCOMOTIVE, A DRIVER, AN AGREEMENT" s="Obtained, whatever the constraint.">
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="vfli"
          kicker="EARTH · EXPERIENCE · VFLI"
          sub="Rail Resources Manager"
        />
      </Close>
    </Layer>
  );
}

// ---------- 2 · SNCF Réseau ----------
const SY = [176, 236, 296, 356, 416];
const hx = (h: number) => 120 + h * 20;
/** A train path through the stations: [hour, station index] points; a flat segment is a wait at a station. */
const trainPath = (pts: [number, number][]) =>
  pts.map(([h, st], k) => `${k ? 'L' : 'M'}${hx(h)} ${SY[st]}`).join('');
/** Engineering works: a section between two stations, closed for a time window. */
const works: [number, number, number][] = [
  [1, 4.5, 7],
  [1, 10.5, 13],
  [3, 9, 11.5],
  [3, 13.5, 16],
];
/** Other operators. One stops at station C (the flat segment) while my customer’s train passes it. */
const run = (t0: number) => trainPath([0, 1, 2, 3, 4].map((st) => [t0 + st * 1.5, st] as [number, number]));
const STOPPED = trainPath([
  [5.5, 0],
  [7, 1],
  [8.5, 2],
  [10.75, 2],
  [12.5, 3],
]);
const others = [run(0.5), STOPPED, run(15), run(17.5)];
/** My customer’s train: it runs between the works, without a stop. */
const MINE = run(7.25);
function Reseau() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={92} t="SNCF RÉSEAU · A TRAIN PATH, KEPT ALIVE FOR YEARS" c="strong" />
      <Inspectable
        id="fw-graph"
        title="The space–time diagram"
        body="Each line is a train: where it is (stations, top to bottom) at each hour (left to right). A hatched block closes one section for engineering works; a flat segment is a train stopped at a station.|The shared network, as it is planned."
      >
        <g>
          <Win x={40} y={116} w={600} h={420} title="TRAIN PATHS · SPACE–TIME DIAGRAM">
            {SY.map((y, i) => (
              <Fragment key={y}>
                <path className="tx-grid" d={`M${hx(0)} ${y}H${hx(24)}`} />
                <T x={60} y={y + 4} className="tx-win-t dim">{`STATION ${'ABCDE'[i]}`}</T>
              </Fragment>
            ))}
            {[0, 6, 12, 18, 24].map((h) => (
              <T
                key={h}
                x={hx(h)}
                y={516}
                className="center tx-win-t dim"
              >{`${String(h).padStart(2, '0')}:00`}</T>
            ))}
            {works.map(([st, a, b]) => (
              <rect
                key={st}
                className="fw-wall"
                x={hx(a)}
                y={SY[st]}
                width={hx(b) - hx(a)}
                height={SY[st + 1] - SY[st]}
              />
            ))}
            {others.map((d) => (
              <path key={d} className="fw-other" d={d} />
            ))}
            <rect className="fw-wall" x={60} y={460} width="22" height="14" />
            <Sub x={90} y={472} t="Engineering works" />
            <path className="fw-other" d="M236 467H262" />
            <Sub x={270} y={472} t="Other operators" />
            <path className="fw-mine" d="M400 467H426" />
            <Sub x={434} y={472} t="My customer’s train" />
            <path className="fw-stop" d="M60 494H82" />
            <Sub x={90} y={499} t="A train stopped at a station, letting my customer’s train pass" />
          </Win>
        </g>
      </Inspectable>
      <Inspectable
        id="fw-path"
        title="My customer’s train path"
        body="The schedule that best fit the customer’s business: it runs between the works without a stop, and another operator’s train stops at station C to let it pass.|What I defended and obtained, then kept alive until the train ran."
      >
        <g>
          <path className="fw-mine" d={MINE} />
          <Move path={MINE} dur={8}>
            <circle className="tx-alert" r="6" />
          </Move>
          <Lab x={hx(7)} y={SY[0] - 14} t="MY CUSTOMER" c="warm" />
          <path className="fw-stop" d={`M${hx(8.5)} ${SY[2]}H${hx(10.75)}`} />
        </g>
      </Inspectable>
      <Inspectable
        id="fw-years"
        title="Kept alive for years"
        body="Each request started two or three years ahead and changed with works, competing demands and plans.|I kept it alive until the day the train ran."
      >
        <g>
          <Lab x={690} y={140} t="THE REQUEST, KEPT ALIVE" />
          <path className="tx-link" d="M710 176V456" />
          {(
            [
              ['Y−3', 'Built and defended'],
              ['Y−2', 'Through engineering works'],
              ['Y−1', 'Through competing demand'],
              ['D', 'The train runs'],
            ] as const
          ).map(([t, s], k) => (
            <Fragment key={t}>
              <circle className={`tx-stage${k === 3 ? ' vs-on' : ''}`} cx={710} cy={176 + k * 93} r="16" />
              <T x={710} y={180 + k * 93} className="center tx-win-t">
                {t}
              </T>
              <Sub x={738} y={181 + k * 93} t={s} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Close t="CAPACITY KEPT ALIVE FOR YEARS" s="From two or three years ahead to the day the train ran.">
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="rail"
          kicker="EARTH · EXPERIENCE · SNCF RÉSEAU"
          sub="Rail Capacity Consultation Officer"
        />
      </Close>
    </Layer>
  );
}

// ---------- 3 · Tour de France ----------
const RX = 700;
function Tour() {
  return (
    <Layer steps={[2]}>
      <Lab x={40} y={92} t="TOUR DE FRANCE · ONE CROSSING, EVERY REGION CONCERNED" c="strong" />
      <Inspectable
        id="fw-aso"
        title="Stage route and timing"
        body="ASO, the race organiser, gives each stage’s route and timing.|Where and when the riders will cross the railway."
      >
        <Win x={40} y={120} w={200} h={92} title="ASO · STAGE ROUTE">
          <path className="fw-mine" d="M60 190C90 150 130 190 160 160S210 150 222 176" />
          <Sub x={60} y={204} t="Route and timing" />
        </Win>
      </Inspectable>
      <Arrow from={[246, 166]} to={[296, 166]} />
      <Inspectable
        id="fw-plan"
        title="Crossing-by-crossing needs"
        body="I turned the race timing into needs for each level crossing and each region concerned.|One plan the regulation teams could act on."
      >
        <g>
          <Win x={302} y={120} w={190} h={92} title="CROSSING PLAN">
            {[0, 1, 2].map((i) => (
              <Fragment key={i}>
                <Check x={320} y={160 + i * 18} />
                <path className="tx-grid" d={`M336 ${160 + i * 18}H476`} />
              </Fragment>
            ))}
          </Win>
          <Lab x={397} y={232} t="MY PLAN" c="center warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="fw-regions"
        title="Each region concerned"
        body="The regulation team of each area the route crossed held or retimed its trains.|Five years, stage after stage."
      >
        <g>
          <Link d="M420 240C450 270 520 280 556 300" />
          <Link d="M492 160C640 170 800 210 846 280" />
          <Medal x={580} y={312} r={26} i={icon.control} on />
          <Medal x={870} y={300} r={26} i={icon.control} on />
          <Sub x={540} y={350} t="Region A" c="end" />
          <Sub x={906} y={346} t="Region B" />
          <path className="tx-grid" d="M600 330L628 362M852 322L788 362" />
        </g>
      </Inspectable>
      <Inspectable
        id="fw-crossing"
        title="The race at the crossing"
        body="Riders and trains need the same point at different moments.|Race first, trains held, then released."
      >
        <g>
          <rect className="fw-road" x={RX - 34} y={250} width="68" height="290" />
          <path className="fw-lane" d={`M${RX} 260V530`} />
          <path className="tx-route" d="M40 430H960" />
          <path className="fw-gate" d={`M${RX - 40} 414H${RX - 74}M${RX + 40} 446H${RX + 74}`} />
          <Move path={`M${RX} 266V540`} dur={5}>
            <Rider />
          </Move>
          <Move path={`M${RX} 266V540`} dur={5} begin={1.2}>
            <Rider />
          </Move>
          <Lab x={RX} y={240} t="THE RACE" c="center warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="fw-held"
        title="Trains held, then released"
        body="On each side, the train waits at its signal while the race passes.|Then live traffic resumes."
      >
        <g>
          <FreightTrain x={612} y={430} s={1.1} wagons={4} />
          <g transform="translate(788 430) scale(-1.1 1.1)">
            <FreightTrain wagons={2} />
          </g>
          <Signal x={628} y={426} />
          <Signal x={788} y={426} />
          <Sub x={360} y={466} t="Train held, then released" c="center" />
        </g>
      </Inspectable>
      <Close
        t="THE RACE AND THE TRAINS, AT THE SAME POINT"
        s="Five years, stage after stage: the race passed at full pace."
      >
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="tour"
          kicker="ISS · HIGH-STAKES · TOUR DE FRANCE"
          sub="Five years of rail coordination"
        />
      </Close>
    </Layer>
  );
}

// ---------- 4 · FoodChéri ----------
function FoodCheri() {
  return (
    <Layer steps={[3]}>
      <Lab x={40} y={92} t="FOODCHÉRI · SIX WEEKS FOR WHAT MATTERS" c="strong" />
      <Inspectable
        id="fw-wall"
        title="600+ dashboards"
        body="More than 600 Tableau dashboards; about one in ten used regularly.|Rebuilding all of them in six weeks was impossible, and useless."
      >
        <g>
          <Win x={40} y={120} w={320} h={250} title="TABLEAU · 600+ DASHBOARDS">
            {Array.from({ length: 150 }, (_, i) => (
              <rect
                key={i}
                className={i % 10 === 4 ? 'dl-tenth' : 'dl-cell'}
                style={i % 10 === 4 ? vars({ '--i': Math.floor(i / 10) }) : undefined}
                x={56 + (i % 15) * 19.5}
                y={152 + Math.floor(i / 15) * 21}
                width="15"
                height="15"
                rx="2"
              />
            ))}
          </Win>
          <Sub x={40} y={392} t="About one in ten used regularly" />
        </g>
      </Inspectable>
      <Arrow from={[366, 245]} to={[400, 245]} />
      <Inspectable
        id="fw-audit"
        title="My audit"
        body="Each view ranked by who depended on it: board first, finance at the top.|Six weeks spent on what the company could not run without."
      >
        <g>
          <Medal x={442} y={245} r={36} i={icon.lens} on />
          <Lab x={442} y={196} t="MY AUDIT" c="center warm" />
        </g>
      </Inspectable>
      <Arrow from={[484, 245]} to={[514, 245]} />
      <Inspectable
        id="fw-metabase"
        title="Live on day one"
        body="The critical board and finance views, rebuilt on the new stack before the licence ended.|The board kept its views on day one."
      >
        <Win x={520} y={120} w={220} h={250} title="METABASE · DAY ONE">
          {['BOARD', 'FINANCE'].map((t, k) => (
            <Fragment key={t}>
              <T x={538} y={168 + k * 104} className="tx-win-t">
                {t}
              </T>
              {[0.5, 0.7, 0.6, 0.9, 0.8].map((v, i) => (
                <rect
                  key={i}
                  className="tx-gauge-on"
                  x={540 + i * 26}
                  y={250 + k * 104 - 70 * v}
                  width="18"
                  height={70 * v}
                  rx="2"
                />
              ))}
              <Check x={712} y={164 + k * 104} />
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="fw-cost"
        title="The renewal avoided"
        body="A Tableau licence of several tens of thousands of euros a year, replaced by the open-source Metabase in one container I deployed.|The renewal avoided."
      >
        <g>
          <rect className="tx-app dashed" x={772} y={130} width="188" height="70" rx="6" />
          <T x={866} y={160} className="center tx-win-t dim">
            TABLEAU LICENCE
          </T>
          <Sub x={866} y={182} t="Tens of k€ a year" c="center" />
          <Arrow from={[866, 206]} to={[866, 254]} />
          <rect className="tx-app" x={772} y={260} width="188" height="70" rx="6" />
          <T x={866} y={290} className="center tx-win-t">
            METABASE · ONE CONTAINER
          </T>
          <Sub x={866} y={312} t="Open source, on App Engine" c="center" />
          <Lab x={866} y={360} t="RENEWAL AVOIDED" c="center warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="fw-weeks"
        title="Six weeks"
        body="Six weeks between the decision and the end of the licence.|The date held."
      >
        <g>
          <path className="tx-route" d="M40 470H740" />
          <path className="tx-draw" pathLength={1} d="M40 470H740" />
          {Array.from({ length: 6 }, (_, k) => (
            <Fragment key={k}>
              <path className="tx-tick" d={`M${40 + k * 116.7} 462V478`} />
              <T x={98 + k * 116.7} y={500} className="center tx-win-t dim">{`WEEK ${k + 1}`}</T>
            </Fragment>
          ))}
          <path className="tx-promise" d="M740 444V486" />
          <Lab x={756} y={474} t="LICENCE ENDS" c="warm" />
          <Move path="M40 470H740" dur={9}>
            <circle className="tx-alert" r="6" />
          </Move>
        </g>
      </Inspectable>
      <Close t="SIX WEEKS FOR WHAT MATTERS" s="The board kept its views on day one; the renewal avoided.">
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="food-deadline"
          kicker="ISS · HIGH-STAKES · SIX WEEKS"
          sub="600 dashboards, the full case"
        />
      </Close>
    </Layer>
  );
}

export default function FindWayScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="ACROSS EVERY ROLE · FIND A WAY" />
      <Vfli />
      <Reseau />
      <Tour />
      <FoodCheri />
    </>
  );
}
