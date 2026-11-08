// ISS · Castor works on RER C: the stakes, six months of preparation, the six weeks, recognised.
// The closed section follows the public works notices; the schematic is not to scale.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  CaseChip,
  Check,
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
const icon = {
  building: <path d="M-14 14V-6L0-15 14-6V14ZM-7 14V2H7V14" />,
  rail: <path d="M-8-15L-12 15M8-15L12 15M-10-6H10M-11 4H11" />,
  authority: <path d="M-15-6L0-15 15-6ZM-12-4V10M-4-4V10M4-4V10M12-4V10M-15 13H15" />,
  provider: (
    <>
      <circle cy="-8" r="6" />
      <path d="M-12 14V9A12 9 0 0 1 12 9V14M5 3H12V10H5Z" />
    </>
  ),
  security: (
    <>
      <path d="M0-15L13-10V0C13 8 7 13 0 16C-7 13-13 8-13 0V-10Z" />
      <path d="M-6 0L-2 5 7-5" />
    </>
  ),
  bus: (
    <>
      <rect x="-14" y="-13" width="28" height="23" rx="3" />
      <path d="M-14-3H14" />
      <circle cx="-8" cy="13" r="2.5" />
      <circle cx="8" cy="13" r="2.5" />
    </>
  ),
  metro: <path d="M-12 12V-12L0 4 12-12V12" />,
  train: (
    <>
      <rect x="-12" y="-14" width="24" height="24" rx="5" />
      <path d="M-12 0H12M-6 14L-10 18M6 14L10 18" />
    </>
  ),
};

// ---------- 1 · The stakes ----------
type St = [string, number, number, boolean, number, number, string];
// name, x, y, terminus, label dx, label dy, anchor
const stations: St[] = [
  ['Paris-Austerlitz', 880, 330, true, 0, 34, 'center'],
  ['Saint-Michel Notre-Dame', 760, 300, false, 0, -20, 'center'],
  ['Musée d’Orsay', 640, 290, false, 0, 30, 'center'],
  ['Invalides', 520, 290, false, 0, -20, 'center'],
  ['Pont de l’Alma', 400, 300, false, 0, 30, 'center'],
  ['Champ de Mars', 300, 330, false, -16, 26, 'end'],
  ['Javel', 200, 420, true, -16, 5, 'end'],
  ['Av. du Président Kennedy', 250, 250, false, 16, 5, ''],
  ['Boulainvilliers', 220, 190, false, 16, 5, ''],
  ['Avenue Henri-Martin', 200, 130, true, 16, 5, ''],
];
const LINE = 'M880 330L760 300 640 290 520 290 400 300 300 330 200 420M300 330L250 250 220 190 200 130';

function TheStakes() {
  return (
    <Layer steps={[0]}>
      <Lab x={40} y={92} t="CASTOR · RER C CLOSED IN CENTRAL PARIS" c="strong" />
      <Inspectable
        id="cs-map"
        title="The closed section"
        body="The shared central section of RER C, under central Paris: 7 stations closed, three temporary terminuses.|The works close it every summer, for six weeks."
      >
        <g>
          <path className="cs-seine" d="M960 400C840 440 720 380 580 400S380 460 260 430 100 380 40 420" />
          <T x={60} y={452} className="tx-win-t dim">
            SEINE
          </T>
          <path className="cs-closed" d={LINE} />
          <path className="cs-open" d="M880 330H960M200 420L150 470M200 130L186 112" />
          {stations.map(([n, x, y, term, dx, dy, a]) => (
            <Fragment key={n}>
              {term && <circle className="tx-ping" cx={x} cy={y} r="14" />}
              <circle className={term ? 'cs-term' : 'cs-stop'} cx={x} cy={y} r={term ? 9 : 7} />
              {term ? (
                <Lab x={x + dx} y={y + dy} t={n.toUpperCase()} c={a} />
              ) : (
                <Sub x={x + dx} y={y + dy} t={n} c={a} />
              )}
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="cs-figures"
        title="Six weeks, 7 stations"
        body="Every summer, from mid-July to late August, the central section closes.|Several hundred thousand passengers to reroute."
      >
        <g>
          <T x={600} y={160} className="tx-big small">
            6 WEEKS
          </T>
          <Sub x={600} y={184} t="Every summer, mid-July to late August" />
          <T x={600} y={232} className="tx-big small">
            7 STATIONS
          </T>
          <Sub x={790} y={226} t="Closed" />
        </g>
      </Inspectable>
      <circle className="cs-term" cx={620} cy={498} r="8" />
      <Sub x={636} y={503} t="Temporary terminus" />
      <circle className="cs-stop" cx={800} cy={498} r="7" />
      <Sub x={816} y={503} t="Closed station" />
      <Close
        t="ONE OF THE BIGGEST DISRUPTIONS IN ÎLE-DE-FRANCE"
        s="Several hundred thousand passengers to reroute."
      />
    </Layer>
  );
}

// ---------- 2 · Six months ----------
const partners: [string, React.ReactNode][] = [
  ['LIGNE C', icon.building],
  ['SNCF RÉSEAU', icon.rail],
  ['AUTHORITIES', icon.authority],
  ['PROVIDERS', icon.provider],
  ['SECURITY', icon.security],
];
const px = (k: number) => 100 + k * 140;
const TY = 430;

function SixMonths() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={92} t="ONE PLAN, MANY PARTNERS" c="strong" />
      <Inspectable
        id="cs-partners"
        title="The partners"
        body="The Ligne C management, SNCF Réseau, the authorities, service providers and security.|Each one’s part, written into one plan."
      >
        <g>
          <path className="tx-route" d="M70 200H790" />
          <Move path="M70 200H794" dur={6}>
            <circle className="tx-alert" r="5" />
          </Move>
          {partners.map(([t, i], k) => (
            <Fragment key={t}>
              <Medal x={px(k)} y={200} i={i} />
              <Lab x={px(k)} y={256} t={t} c="center" />
            </Fragment>
          ))}
          <Arrow from={[740, 200]} to={[794, 200]} />
        </g>
      </Inspectable>
      <Inspectable
        id="cs-plan"
        title="The passenger-care plan"
        body="I managed the entire passenger-care plan of the works.|Who stands where, what each one says, where each passenger goes."
      >
        <g>
          <Win x={800} y={130} w={150} h={140} title="CARE PLAN">
            {[0, 1, 2, 3].map((i) => (
              <Fragment key={i}>
                <Check x={820} y={174 + i * 24} />
                <path className="tx-grid" d={`M836 ${174 + i * 24}H936`} />
              </Fragment>
            ))}
          </Win>
          <Sub x={875} y={294} t="I managed all of it" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="cs-prep"
        title="Six months of preparation"
        body="Six months of preparation before each closure.|On top of my day-to-day mission."
      >
        <g>
          <path className="tx-promise" d={`M100 ${TY - 34}V${TY - 42}H760V${TY - 34}`} />
          <Lab x={430} y={TY - 52} t="SIX MONTHS OF PREPARATION" c="center warm" />
          <path className="tx-route" d={`M100 ${TY}H760`} />
          <path className="tx-draw" pathLength={1} d={`M100 ${TY}H760`} />
          {Array.from({ length: 6 }, (_, k) => (
            <Fragment key={k}>
              <path className="tx-tick" d={`M${100 + k * 110} ${TY - 8}V${TY + 8}`} />
              <T x={155 + k * 110} y={TY + 28} className="center tx-win-t dim">{`M−${6 - k}`}</T>
            </Fragment>
          ))}
          <rect className="cs-weeks" x={764} y={TY - 12} width="150" height="24" rx="4" />
          <T x={839} y={TY + 5} className="center tx-win-t">
            SIX WEEKS
          </T>
          <path className="tx-grid" d={`M100 ${TY + 56}H914`} />
          <Sub x={100} y={TY + 80} t="My day-to-day mission, alongside" />
        </g>
      </Inspectable>
      <Close t="SIX MONTHS OF PREPARATION" s="On top of my day-to-day mission." />
    </Layer>
  );
}

// ---------- 3 · The six weeks ----------
const alts: [string, React.ReactNode, number][] = [
  ['BUSES', icon.bus, 200],
  ['METRO', icon.metro, 330],
  ['SHUTTLE', icon.train, 460],
];
const agents = ['SNCF station agents', 'Service-provider agents', 'Security agents'];

function SixWeeks() {
  return (
    <Layer steps={[2]}>
      <Lab x={40} y={92} t="SIX WEEKS · EVERY PASSENGER REROUTED" c="strong" />
      <Inspectable
        id="cs-station"
        title="A closed station"
        body="Each of the 7 stations closed for six weeks.|Its entrances became the place to guide every passenger."
      >
        <g>
          <rect className="tx-layer top" x={300} y={140} width="240" height="160" rx="6" />
          <rect className="tx-ticket" x={330} y={156} width="70" height="26" rx="13" />
          <T x={365} y={174} className="center tx-win-t dark">
            RER C
          </T>
          <rect className="cs-shutter" x={380} y={210} width="80" height="90" rx="3" />
          <T x={420} y={260} className="center tx-win-t late">
            CLOSED
          </T>
          <Sub x={420} y={322} t="7 stations, six weeks" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="cs-flow"
        title="Passengers rerouted"
        body="Passengers were guided outside the stations, toward the alternatives.|Several hundred thousand over the six weeks."
      >
        <g>
          <path className="tx-route" d="M40 360H620" />
          {[0, 1, 2, 3].map((i) => (
            <Move key={i} path="M40 360H620" dur={6} begin={i * 1.5}>
              <circle className="tx-alert" r="5" />
            </Move>
          ))}
          <Lab x={40} y={344} t="PASSENGERS" />
          {alts.map(([t, , y], k) => (
            <Fragment key={t}>
              <Link d={`M620 360C700 360 700 ${y} 776 ${y}`} />
              <Move path={`M620 360C700 360 700 ${y} 776 ${y}`} dur={2.4} begin={k * 0.8}>
                <circle className="tx-alert" r="5" />
              </Move>
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="cs-alts"
        title="The alternatives"
        body="Replacement buses, a shuttle and the metro, as set out in the works notices.|Every passenger sent somewhere that runs."
      >
        <g>
          {alts.map(([t, i, y]) => (
            <Fragment key={t}>
              <Medal x={810} y={y} i={i} on />
              <Lab x={852} y={y + 5} t={t} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="cs-agents"
        title="Agents at each closed station"
        body="SNCF station agents, service-provider agents and security agents, side by side.|Each with the information to guide passengers."
      >
        <g>
          {agents.map((t, k) => (
            <Fragment key={t}>
              {[0, 1].map((j) => (
                <User key={j} x={110 + k * 180 + j * 30} y={460} s={0.9} c={k === 0 ? 'on' : ''} />
              ))}
              <Sub x={125 + k * 180} y={490} t={t} c="center" />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Close
        t="EVERY PASSENGER REROUTED"
        s="Several hundred thousand passengers, guided outside the stations."
      />
    </Layer>
  );
}

// ---------- 4 · Recognised ----------
const LC = { x: 740, y: 300 };
function Recognised() {
  return (
    <Layer steps={[3]}>
      <Lab x={40} y={92} t="THREE SUMMERS · PLANS OTHERS CAME TO STUDY" c="strong" />
      <Inspectable
        id="cs-summers"
        title="Every summer of my role"
        body="The Castor works came back every summer; I ran the plan each time.|2017, 2018, 2019."
      >
        <g>
          {[2017, 2018, 2019].map((yr, k) => (
            <Win key={yr} x={40 + k * 150} y={130} w={136} h={110} title={`SUMMER ${yr}`}>
              {Array.from({ length: 6 }, (_, w) => (
                <rect
                  key={w}
                  className="cs-week"
                  style={vars({ '--i': k * 6 + w })}
                  x={56 + k * 150 + w * 18}
                  y={170}
                  width="14"
                  height="22"
                  rx="2"
                />
              ))}
              <Check x={156 + k * 150} y={218} />
            </Win>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="cs-passengers"
        title="Several hundred thousand passengers"
        body="Rerouted each summer, outside the closed stations.|One of the biggest disruptions in Île-de-France, held."
      >
        <g>
          <Lab x={40} y={300} t="SEVERAL HUNDRED THOUSAND PASSENGERS" />
          {Array.from({ length: 24 }, (_, i) => (
            <User key={i} x={52 + i * 18} y={350} s={0.5} c="tx-lit-seq" style={vars({ '--i': i })} />
          ))}
          <Sub x={40} y={380} t="Rerouted, each summer" />
        </g>
      </Inspectable>
      <Inspectable
        id="cs-benchmark"
        title="Benchmarked by other Transilien lines"
        body="Other Transilien lines sent counterparts to study our plans.|Ligne C’s passenger care became a reference."
      >
        <g>
          <Lab x={LC.x} y={120} t="OTHER TRANSILIEN LINES" c="center" />
          {[-150, 0, 150].map((dx, k) => (
            <Fragment key={dx}>
              <Medal x={LC.x + dx} y={170} r={24} i={icon.train} />
              {k !== 1 && <Arrow from={[LC.x + dx * 0.8, 196]} to={[LC.x + dx * 0.3, 252]} />}
            </Fragment>
          ))}
          <Arrow from={[LC.x, 196]} to={[LC.x, 250]} />
          <Medal x={LC.x} y={LC.y} r={44} i={icon.train} on />
          <Lab x={LC.x + 60} y={LC.y + 5} t="LIGNE C" c="warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="cs-ratp"
        title="Recognised by RATP’s RER B"
        body="RATP’s RER B recognised the quality of our plans and of our operational follow-up.|Recognition from another operator."
      >
        <g>
          <Arrow from={[LC.x, 418]} to={[LC.x, 352]} />
          <Medal x={LC.x} y={448} r={28} i={icon.train} />
          <Lab x={LC.x + 40} y={446} t="RATP · RER B" />
          <Sub x={LC.x + 40} y={466} t="Recognised the quality" />
        </g>
      </Inspectable>
      <Close
        t="PLANS OTHERS CAME TO STUDY"
        s="Benchmarked by other Transilien lines, recognised by RATP’s RER B."
      >
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="ligne-c"
          kicker="EARTH · EXPERIENCE · LIGNE C"
          sub="The Passenger Care and Information Manager role"
        />
      </Close>
    </Layer>
  );
}

export default function CastorScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="SNCF · LIGNE C · CASTOR WORKS" />
      <TheStakes />
      <SixMonths />
      <SixWeeks />
      <Recognised />
    </>
  );
}
