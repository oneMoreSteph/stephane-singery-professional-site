// ISS · Toyota Europe, summer 2013: the stakes, one afternoon of coordination, the next morning, and after.
// Disruption days, region positions and punctuality values are illustrative.
import { Fragment } from 'react';
import { CountryMap, project } from '~/drawings/france';
import { RfnNetwork } from '~/drawings/rail';
import { Inspectable } from '~/drawings/Inspectable';
import { Arrow, Check, Header, Lab, Link, Move, OpsDefs, Sub, T, User, Win, type Pt } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Console, Line } from '~/drawings/ops';
// The line the vehicle trains ran on: from the Dutch border, through Belgium and France, to the south-west. Schematic.
const stops: [string, Pt][] = [
  ['Roosendaal', [4.46, 51.53]],
  ['Antwerp', [4.4, 51.22]],
  ['Brussels', [4.35, 50.85]],
  ['Lille', [3.06, 50.63]],
  ['Paris', [2.35, 48.86]],
  ['Orléans', [1.9, 47.9]],
  ['Tours', [0.69, 47.39]],
  ['Poitiers', [0.34, 46.58]],
  ['Bordeaux', [-0.58, 44.84]],
  ['', [-1.05, 43.75]],
  ['', [-1.45, 43.45]],
];
const pts = stops.map(([, ll]) => project(ll));
const routeD = `M${pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join('L')}`;
const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
const total = lens.reduce((a, b) => a + b, 0);
const swFrom = lens.slice(0, 7).reduce((a, b) => a + b, 0) / total;
const sw = project([-0.9, 44.3]);
const labelled = ['Roosendaal', 'Brussels', 'Lille', 'Paris', 'Bordeaux'];

/** The map frame: shifted and clipped to the line's corridor. */
function M({ children }: { children: React.ReactNode }) {
  return (
    <g transform="translate(-70 140)">
      <clipPath id="tyClip">
        <rect x="90" y="10" width="500" height="500" />
      </clipPath>
      <g clipPath="url(#tyClip)">{children}</g>
    </g>
  );
}

/** A vehicle train along the line; a stuck one stops in the south-west. */
function Train({ c, stuck, begin }: { c: string; stuck: boolean; begin?: number }) {
  return (
    <g className={`train-marker ${c}`}>
      <rect className="tm-car" x="-27" y="-3.5" width="11" height="7" rx="1.5" />
      <rect className="tm-car" x="-14" y="-3.5" width="11" height="7" rx="1.5" />
      <rect className="tm-loco" x="-1" y="-4" width="12" height="8" rx="2" />
      <animateMotion
        dur="12s"
        begin={begin ? `-${begin}s` : undefined}
        repeatCount="indefinite"
        rotate="auto"
        calcMode="linear"
        {...(stuck && {
          keyPoints: `0;${(swFrom + 0.03).toFixed(3)};${(swFrom + 0.08).toFixed(3)};1`,
          keyTimes: '0;.45;.9;1',
        })}
        path={routeD}
      />
    </g>
  );
}

function MapBase() {
  return (
    <M>
      <CountryMap />
      <RfnNetwork />
      <Line d={routeD} c="route-glow" />
      <Line d={routeD} c="active-route" />
      {stops.map(([n], i) =>
        n ? (
          <Fragment key={n}>
            <circle
              className="city-dot"
              cx={pts[i][0].toFixed(1)}
              cy={pts[i][1].toFixed(1)}
              r={n === 'Roosendaal' ? 5 : 3.5}
            />
            {labelled.includes(n) &&
              (n === 'Roosendaal' ? (
                <T x={pts[i][0] - 9} y={pts[i][1] + 4} className="city-label small-city end">
                  Roosendaal · NL border
                </T>
              ) : (
                <T x={pts[i][0] + 9} y={pts[i][1] + 4} className="city-label small-city">
                  {n}
                </T>
              ))}
          </Fragment>
        ) : null,
      )}
    </M>
  );
}

// The right-hand column, clear of the map.
const X = 580;

/** A car-carrier wagon with two cars: Toyota’s vehicles. */
const CarCarrier = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-veh" transform={`translate(${x} ${y})`}>
    <rect x="0" y="10" width="64" height="8" rx="2" />
    <path d="M6 10V2H22L28 10M36 10V2H52L58 10" />
    <circle cx="12" cy="22" r="4" />
    <circle cx="52" cy="22" r="4" />
  </g>
);
const Loco = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-veh" transform={`translate(${x} ${y})`}>
    <rect x="0" y="4" width="54" height="16" rx="2" />
    <rect x="34" y="-6" width="20" height="12" rx="2" />
    <circle cx="12" cy="22" r="4" />
    <circle cx="42" cy="22" r="4" />
  </g>
);
const Network = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-icon" transform={`translate(${x} ${y})`}>
    <path d="M0 0L22-14L48-4L64-18M22-14L30 10L48-4" />
    <circle cx="0" cy="0" r="3" />
    <circle cx="22" cy="-14" r="3" />
    <circle cx="48" cy="-4" r="3" />
    <circle cx="30" cy="10" r="3" />
  </g>
);

// Five weeks of service days; red ones were disrupted.
const disrupted = [3, 7, 8, 11, 12, 13, 16, 17, 18, 19, 21, 22, 23, 24];

function Stakes() {
  return (
    <Layer steps={[0]}>
      <M>
        <Train c="" stuck={false} />
        <Train c="" stuck begin={4} />
        <g transform={`translate(${sw[0]} ${sw[1]})`}>
          <circle className="tx-ping" r="26" />
        </g>
      </M>
      <Inspectable
        id="ty-chain"
        title="Who ships, who runs, who manages the network"
        body="Toyota Europe shipped its vehicles by rail; a freight company ran the trains; SNCF Réseau managed the network.|I represented the network side."
      >
        <g>
          <CarCarrier x={X} y={96} />
          <Lab x={X + 84} y={110} t="TOYOTA EUROPE" />
          <Sub x={X + 84} y={130} t="Vehicles, Netherlands → south-west France" />
          <Loco x={X + 4} y={166} />
          <Lab x={X + 84} y={178} t="FREIGHT COMPANY" />
          <Sub x={X + 84} y={198} t="Runs the vehicle trains" />
          <Network x={X} y={248} />
          <Lab x={X + 84} y={246} t="SNCF RÉSEAU" c="warm" />
          <Sub x={X + 84} y={266} t="The network · my side" />
          <path className="tx-link" d={`M${X + 30} 134V156M${X + 30} 200V226`} />
        </g>
      </Inspectable>
      <Inspectable
        id="ty-weeks"
        title="Weeks of disruption"
        body="Repeated disruption for weeks, strongest in the south-west.|Each disrupted train had a heavy cost."
      >
        <g>
          <Lab x={X} y={320} t="WEEKS OF DISRUPTION" />
          {Array.from({ length: 25 }, (_, i) => (
            <rect
              key={i}
              className={`tx-run${disrupted.includes(i) ? ' ko' : ''}`}
              x={X + (i % 5) * 30}
              y={336 + Math.floor(i / 5) * 24}
              width="24"
              height="18"
              rx="2"
            />
          ))}
          <Sub x={X} y={480} t="Strongest in the south-west" />
        </g>
      </Inspectable>
      <Inspectable
        id="ty-risk"
        title="Another operator?"
        body="Toyota Europe was considering another freight operator.|The relationship was at risk."
      >
        <g>
          <rect className="tx-conflict" x={X + 190} y="330" width="180" height="44" rx="4" />
          <Lab x={X + 206} y={358} t="ANOTHER OPERATOR?" />
        </g>
      </Inspectable>
      <Inspectable
        id="ty-meeting"
        title="A meeting, next morning"
        body="A meeting with Toyota Europe was set for the next morning.|The clock for an answer."
      >
        <g>
          <rect className="tx-app" x={X + 190} y="400" width="180" height="76" rx="4" />
          <path className="tx-win-bar" d={`M${X + 190} 422H${X + 370}`} />
          <Lab x={X + 206} y={448} t="MEETING" c="warm" />
          <Sub x={X + 206} y={468} t="Next morning" />
        </g>
      </Inspectable>
    </Layer>
  );
}

const afternoon: [string, string, string][] = [
  ['14:00', 'I take the meeting', 'Set for the next morning, with Toyota Europe.'],
  ['15:00', 'Regional teams, together', 'One SNCF Réseau team per region the line crosses.'],
  ['16:00', 'Constraints, everywhere', 'Each region brings its own.'],
  ['17:00', 'Causes traced', 'Section by section, with each team.'],
  ['18:00', 'One solution across all', 'Drafted by me, part validated by the teams.'],
  ['19:00', 'Ready for the morning', 'Causes and solution, one answer.'],
];
const regions = [3, 4, 6, 8];

function Afternoon() {
  return (
    <Layer steps={[1]}>
      <M>
        {regions.map((k, i) => (
          <Inspectable
            key={k}
            id={`ty-region-${i}`}
            title={`Region ${i + 1}`}
            body="One SNCF Réseau regional team along the line, with its own constraints.|I coordinated all of them in the same afternoon."
          >
            <g transform={`translate(${pts[k][0] - 70} ${pts[k][1] + 10})`}>
              <Console x={0} y={0} s={0.7} />
              <T x={0} y={-36} className="center tx-win-t">{`REGION ${i + 1}`}</T>
              <path className="tx-beam" d={`M18 -10L64 -8`} />
            </g>
          </Inspectable>
        ))}
      </M>
      <Lab x={X} y={100} t="ONE AFTERNOON · ILLUSTRATIVE HOURS" c="warm" />
      <path className="tx-route" d={`M${X + 10} 130V560`} />
      {afternoon.map(([h, t, s], i) => (
        <Inspectable key={h} id={`ty-hour-${i}`} title={t} body={`${t}.|${s}`}>
          <g>
            <circle className={`tx-stage${i === 5 ? ' on' : ''}`} cx={X + 10} cy={140 + i * 82} r="8" />
            <Lab x={X + 32} y={136 + i * 82} t={h} />
            <Lab x={X + 100} y={136 + i * 82} t={t.toUpperCase()} />
            <Sub x={X + 100} y={158 + i * 82} t={s} />
          </g>
        </Inspectable>
      ))}
    </Layer>
  );
}

function NextMorning() {
  return (
    <Layer steps={[2]}>
      <Inspectable
        id="ty-table"
        title="Around the table"
        body="My main contact, the freight company’s director and Toyota Europe’s European CLO.|The people the answer had to convince."
      >
        <g>
          <rect className="tx-app" x="160" y="300" width="290" height="150" rx="14" />
          <User x={305} y={292} s={1.2} />
          <Sub x={305} y={244} t="Main contact" c="center" />
          <User x={305} y={506} s={1.2} />
          <Sub x={305} y={530} t="Freight company director" c="center" />
          <User x={82} y={398} s={1.2} c="on" />
          <Lab x={82} y={432} t="EUROPEAN CLO" c="center" />
          <Sub x={82} y={452} t="Toyota Europe" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="ty-me"
        title="Me, for SNCF Réseau"
        body="I represented the network at the table.|I explained the causes and presented the solutions."
      >
        <g>
          <circle className="ty-halo" cx={498} cy={376} r="34" />
          <User x={498} y={398} s={1.2} c="on" />
          <Lab x={498} y={432} t="ME" c="center warm" />
          <Sub x={498} y={452} t="SNCF Réseau" c="center" />
          <rect className="tx-doc" x="388" y="361" width="22" height="28" rx="2" />
          <rect className="tx-doc" x="416" y="361" width="22" height="28" rx="2" />
          <Move path="M400 375H190" dur={6}>
            <rect className="tx-doc ty-sheet" x="-11" y="-14" width="22" height="28" rx="2" />
          </Move>
          <Link d="M532 362L600 220" />
          <Link d="M532 392L600 420" />
        </g>
      </Inspectable>
      <Inspectable
        id="ty-why"
        title="Why the disruption happened"
        body="I explained the causes, section by section.|Facts first, before any solution."
      >
        <Win x={600} y={110} w={360} h={170} title="WHY IT HAPPENED">
          <path className="tx-route" d="M630 180H930" />
          {[0, 1, 2, 3].map((i) => (
            <Fragment key={i}>
              <circle className="tx-stop" cx={650 + i * 90} cy={180} r="6" />
              <T x={650 + i * 90} y={212} className="center tx-win-t">{`REGION ${i + 1}`}</T>
            </Fragment>
          ))}
          <circle className="tx-ping" cx={920} cy={180} r="12" />
          <Sub x={620} y={256} t="Causes, section by section" />
        </Win>
      </Inspectable>
      <Arrow from={[780, 306]} to={[780, 346]} />
      <Inspectable
        id="ty-solutions"
        title="Solutions to validate"
        body="I presented the solutions for them to validate.|A workable answer from the network."
      >
        <Win x={600} y={352} w={360} h={170} title="SOLUTIONS · TO VALIDATE">
          {['One solution across every region', 'Part validated by the teams', 'For them to validate'].map(
            (t, i) => (
              <Fragment key={t}>
                {i < 2 ? (
                  <Check x={624} y={396 + i * 40} />
                ) : (
                  <circle className="tx-stage on" cx={624} cy={476} r="8" />
                )}
                <Sub x={644} y={401 + i * 40} t={t} />
              </Fragment>
            ),
          )}
        </Win>
      </Inspectable>
      <Lab x={305} y={160} t="REPRESENT THE NETWORK" c="center warm" />
      <Sub x={305} y={182} t="With a workable answer" c="center" />
    </Layer>
  );
}

function Afterwards() {
  return (
    <Layer steps={[3]}>
      <M>
        <Train c="" stuck={false} />
        <Train c="" stuck={false} begin={6} />
        <g transform={`translate(${pts[8][0]} ${pts[8][1]})`}>
          <Check x={0} y={0} />
        </g>
      </M>
      <Inspectable
        id="ty-follow"
        title="Followed through the teams"
        body="I followed the solutions through the regional teams.|Until they held on the line."
      >
        <g>
          <Lab x={X} y={100} t="FOLLOWED THROUGH THE TEAMS" />
          {[0, 1, 2, 3].map((i) => (
            <Fragment key={i}>
              <Check x={X + 12 + i * 90} y={130} />
              <T x={X + 12 + i * 90} y={160} className="center tx-win-t">{`REGION ${i + 1}`}</T>
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="ty-improved"
        title="Circulation improved"
        body="The vehicle trains ran with far fewer disruptions.|A solution that worked."
      >
        <g>
          <Lab x={X} y={220} t="BEFORE" />
          {Array.from({ length: 20 }, (_, i) => (
            <rect
              key={i}
              className={`tx-run${[2, 4, 5, 8, 9, 12, 13, 15, 17].includes(i) ? ' ko' : ''}`}
              x={X + i * 19}
              y={232}
              width="15"
              height="15"
              rx="2"
            />
          ))}
          <Lab x={X} y={286} t="AFTER" c="warm" />
          {Array.from({ length: 20 }, (_, i) => (
            <rect
              key={i}
              className={`tx-run${i === 14 ? ' ko' : ''}`}
              x={X + i * 19}
              y={298}
              width="15"
              height="15"
              rx="2"
            />
          ))}
          <Sub x={X} y={338} t="Trains · illustrative" />
        </g>
      </Inspectable>
      <Inspectable
        id="ty-day"
        title="Under a day"
        body="From first call to validated answer: one afternoon and one morning.|Found through the coordination of several regional teams."
      >
        <g>
          <Lab x={X} y={400} t="FROM FIRST CALL TO VALIDATED ANSWER" c="warm" />
          <rect className="tx-track done" x={X} y={420} width="230" height="30" rx="3" />
          <T x={X + 115} y={440} className="center tx-win-t">
            ONE AFTERNOON
          </T>
          <rect className="tx-track now" x={X + 236} y={420} width="140" height="30" rx="3" />
          <T x={X + 306} y={440} className="center tx-win-t">
            ONE MORNING
          </T>
        </g>
      </Inspectable>
    </Layer>
  );
}

export default function ToyotaScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="TOYOTA EUROPE · SUMMER 2013" />
      <Layer steps={[0, 1, 3]} bare className="ty-map">
        <MapBase />
      </Layer>
      <Stakes />
      <Afternoon />
      <NextMorning />
      <Afterwards />
    </>
  );
}
