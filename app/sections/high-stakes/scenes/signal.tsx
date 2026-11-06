// ISS · Verisure, signal or noise: the stakes, why a severity operational measurement, what it brings, the result.
// Queue contents, names and dates are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import { Arrow, Check, Code, Header, Lab, Link, OpsDefs, Sub, T, User, Win } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

/** An alert row: `critical` ones need action, the others are valid but harmless. */
const Alert = ({ x, y, w, critical }: { x: number; y: number; w: number; critical?: boolean }) => (
  <g>
    <rect className={`sg-alert${critical ? ' critical' : ''}`} x={x} y={y} width={w} height="16" rx="2" />
    <path className="tx-grid" d={`M${x + 10} ${y + 8}H${x + w * 0.5}`} />
  </g>
);
const Bell = ({ x, y, muted }: { x: number; y: number; muted?: boolean }) => (
  <g className="tx-icon" transform={`translate(${x} ${y})`}>
    <path d="M-10 6V-2A10 10 0 0 1 10-2V6L13 10H-13Z" />
    <path d="M-3 14H3" />
    {muted && <path className="sg-cross" d="M-15-15L15 15" />}
  </g>
);
const queue = [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];

function Stakes() {
  return (
    <Layer steps={[0]}>
      <Inspectable
        id="sg-valid"
        title="Valid, and harmless"
        body="Some tests raised alerts technically valid but operationally harmless.|Right on the Data, nothing for the team to do."
      >
        <Win x={40} y={96} w={280} h={170} title="TEST RESULT">
          <Code x={56} y={140} lh={22} lines={['test: accepted_values', 'status: FAIL', 'rows: 3']} />
          <Lab x={56} y={226} t="VALID · HARMLESS" c="warm" />
        </Win>
      </Inspectable>
      <Arrow from={[326, 180]} to={[396, 180]} />
      <Inspectable
        id="sg-queue"
        title="The team’s alert queue"
        body="Left as they were, harmless alerts flooded the teams.|They buried the alerts on business-critical Data."
      >
        <Win x={402} y={96} w={300} h={330} title="TEAM ALERT QUEUE">
          {queue.map((c, i) => (
            <Alert key={i} x={418} y={130 + i * 22} w={268} critical={!!c} />
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="sg-buried"
        title="Critical alerts, buried"
        body="Alerts on business-critical Data sat among the harmless ones.|Easy to miss."
      >
        <g>
          <Alert x={740} y={140} w={60} critical />
          <Lab x={812} y={154} t="BUSINESS-CRITICAL" />
          <Alert x={740} y={176} w={60} />
          <Lab x={812} y={190} t="HARMLESS" />
          <Sub x={740} y={226} t="Buried in the same queue" />
        </g>
      </Inspectable>
      <Inspectable
        id="sg-options"
        title="Leave them, or silence them"
        body="Left as they were: they flooded the teams. Silenced: they would hide real problems.|Neither option was acceptable."
      >
        <g>
          <rect className="tx-conflict" x="40" y="470" width="430" height="110" rx="4" />
          <Bell x={80} y={520} />
          <Lab x={110} y={510} t="LEFT AS THEY WERE" />
          <Sub x={110} y={532} t="They flood the teams" />
          <rect className="tx-conflict" x="530" y="470" width="430" height="110" rx="4" />
          <Bell x={570} y={520} muted />
          <Lab x={600} y={510} t="SILENCED" />
          <Sub x={600} y={532} t="They would hide real problems" />
        </g>
      </Inspectable>
    </Layer>
  );
}

function WhySeverityMeasure() {
  return (
    <Layer steps={[1]}>
      <Inspectable
        id="sg-test"
        title="The test keeps running"
        body="The test keeps running and detecting, every day.|Nothing is switched off."
      >
        <Win x={40} y={120} w={220} h={150} title="DATA TEST">
          <Check x={64} y={170} />
          <Sub x={84} y={175} t="Runs every day" />
          <Check x={64} y={210} />
          <Sub x={84} y={215} t="Detects" />
        </Win>
      </Inspectable>
      <Arrow from={[266, 195]} to={[316, 195]} />
      <Inspectable
        id="sg-detect"
        title="Detection"
        body="The anomaly is detected, as before.|Detection stays exactly the same."
      >
        <g>
          <circle className="tx-stage" cx={370} cy={195} r="34" />
          <Lab x={370} y={256} t="DETECTION" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[408, 195]} to={[468, 195]} />
      <Inspectable
        id="sg-qualify"
        title="Qualification, with the severity operational measurement"
        body="The severity operational measurement only changes how the alert is qualified.|Detection and qualification, separated."
      >
        <g>
          <circle className="tx-stage on" cx={530} cy={195} r="34" />
          <Lab x={530} y={256} t="QUALIFICATION" c="center warm" />
          <rect className="tx-ticket" x="406" y="96" width="248" height="30" rx="4" />
          <T x={530} y={116} className="center tx-win-t dark">
            SEVERITY OPERATIONAL MEASUREMENT
          </T>
          <path className="tx-link" d="M530 126V160" />
        </g>
      </Inspectable>
      <Link d="M566 182C640 150 690 140 760 140" />
      <Link d="M566 208C640 240 690 250 760 250" />
      <Inspectable
        id="sg-routes"
        title="Two routes"
        body="Alerts that need action go to the teams; harmless ones stay on record.|Every alert keeps its trace."
      >
        <g>
          <Alert x={766} y={132} w={70} critical />
          <Lab x={846} y={146} t="TO THE TEAMS" />
          <Alert x={766} y={242} w={70} />
          <Lab x={846} y={256} t="ON RECORD" />
        </g>
      </Inspectable>
      <Inspectable
        id="sg-common"
        title="A capability of the common layer"
        body="Requalifying an alert became a capability of the common layer.|Available to every observability domain, not a workaround for one."
      >
        <g>
          <rect className="tx-layer top" x="40" y="380" width="920" height="60" rx="4" />
          <Lab
            x={60}
            y={416}
            t="COMMON LAYER · SEVERITY OPERATIONAL MEASUREMENTS FOR EVERY DOMAIN"
            c="warm"
          />
          {['DOMAIN 1 · DBT TESTS', 'NEXT DOMAIN', 'NEXT DOMAIN'].map((t, i) => (
            <Fragment key={i}>
              <rect
                className={`tx-app${i ? ' dashed' : ''}`}
                x={40 + i * 320}
                y={480}
                width="280"
                height="54"
                rx="4"
              />
              <Sub x={60 + i * 320} y={512} t={t} />
              <path className="tx-link" d={`M${180 + i * 320} 440V480`} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
    </Layer>
  );
}

const fields: [string, string][] = [
  ['JUSTIFICATION', 'Why this alert is harmless'],
  ['OWNER', 'Who answers for it'],
  ['REVIEW DATE', 'When it is checked again'],
  ['DURATION', 'When it ends'],
  ['TRACE', 'Kept in the history'],
];

function WhatItBrings() {
  return (
    <Layer steps={[2]}>
      <Inspectable
        id="sg-record"
        title="A severity operational measurement record"
        body="Each severity operational measurement: a justification, an owner, a review date, a duration.|Always traceable."
      >
        <Win x={40} y={96} w={440} h={340} title="SEVERITY OPERATIONAL MEASUREMENT · ONE ALERT">
          {fields.map(([k, v], i) => (
            <Fragment key={k}>
              <rect className="tx-table-row" x="58" y={132 + i * 58} width="404" height="46" rx="3" />
              <Check x={80} y={155 + i * 58} />
              <Lab x={102} y={150 + i * 58} t={k} />
              <Sub x={102} y={170 + i * 58} t={v} />
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="sg-owner"
        title="Owned"
        body="Every severity operational measurement has an owner.|Someone answers for each exception."
      >
        <g>
          <User x={600} y={170} s={1.3} c="on" />
          <Lab x={640} y={150} t="OWNED" />
          <Sub x={640} y={172} t="Someone answers for it" />
        </g>
      </Inspectable>
      <Inspectable
        id="sg-duration"
        title="When the duration ends"
        body="When the duration ends, the alert returns to its normal qualification.|Nothing silenced for good."
      >
        <g>
          <Lab x={560} y={260} t="DURATION" />
          <rect className="tx-gauge" x="560" y="276" width="380" height="20" rx="3" />
          <rect className="tx-gauge-on" x="560" y="276" width="380" height="20" rx="3">
            <animate
              attributeName="width"
              values="380;0;0"
              keyTimes="0;.8;1"
              dur="10s"
              repeatCount="indefinite"
            />
          </rect>
          <path className="tx-promise" d="M940 266V306" />
          <Lab x={560} y={340} t="THEN, BACK TO NORMAL QUALIFICATION" c="warm" />
          <Sub x={560} y={362} t="Nothing silenced for good" />
        </g>
      </Inspectable>
      <Lab x={40} y={500} t="OWNED · REVIEWED · VISIBLE" c="strong" />
      <Sub x={40} y={524} t="The exception never hides" />
    </Layer>
  );
}

function Result() {
  return (
    <Layer steps={[3]}>
      <Inspectable
        id="sg-before"
        title="Before"
        body="Every valid alert reached the team, harmless or not.|The real ones were buried."
      >
        <Win x={40} y={96} w={280} h={330} title="BEFORE · EVERY ALERT RINGS">
          {queue.map((c, i) => (
            <Alert key={i} x={56} y={130 + i * 22} w={248} critical={!!c} />
          ))}
        </Win>
      </Inspectable>
      <Arrow from={[326, 260]} to={[376, 260]} />
      <Inspectable
        id="sg-after"
        title="After"
        body="Harmless alerts leave the teams’ queue and stay on record.|What reaches the teams is worth acting on."
      >
        <g>
          <Win x={382} y={96} w={280} h={150} title="AFTER · TO THE TEAMS">
            <Alert x={398} y={130} w={248} critical />
            <Alert x={398} y={152} w={248} critical />
          </Win>
          <Win x={382} y={276} w={280} h={150} title="ON RECORD · HARMLESS">
            {queue.slice(0, 5).map((_, i) => (
              <Alert key={i} x={398} y={310 + i * 20} w={248} />
            ))}
          </Win>
        </g>
      </Inspectable>
      <Inspectable
        id="sg-volume"
        title="525 tests a day"
        body="525 tests a day, about 60,000 executions so far.|The volume behind every alert."
      >
        <g>
          <T x={720} y={140} className="tx-big">
            525 / day
          </T>
          <Sub x={720} y={166} t="Automated Data tests" />
          <T x={720} y={240} className="tx-big">
            ~60,000
          </T>
          <Sub x={720} y={266} t="Executions so far" />
        </g>
      </Inspectable>
      <Inspectable
        id="sg-trust"
        title="Teams trust their alerts"
        body="Teams act on what they receive.|Teams trust their alerts."
      >
        <g>
          {[0, 1, 2].map((i) => (
            <User key={i} x={740 + i * 50} y={380} c="on" />
          ))}
          <Check x={900} y={360} />
          <Lab x={720} y={420} t="TRUSTED" c="warm" />
          <Sub x={720} y={442} t="Alerts teams act on" />
        </g>
      </Inspectable>
    </Layer>
  );
}

export default function SignalScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="VERISURE · SIGNAL OR NOISE" />
      <Stakes />
      <WhySeverityMeasure />
      <WhatItBrings />
      <Result />
    </>
  );
}
