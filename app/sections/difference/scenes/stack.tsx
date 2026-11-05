// Sentinel · The Data system: one system, three layers, the role I held in each.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  Check,
  Code,
  Db,
  Graph,
  Header,
  Lab,
  Move,
  OpsDefs,
  Sub,
  User,
  Win,
  type Pt,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

const css = (vars: Record<string, number>) => vars as React.CSSProperties;
const inflow = ['NEW', 'UPDATED', 'LATE'];
const dataformNodes: Pt[] = [
  [376, 300],
  [376, 360],
  [376, 420],
  [470, 330],
  [470, 410],
  [564, 370],
];
const marts = [370, 475, 580];

function Users({ xs, y }: { xs: number[]; y: number }) {
  return (
    <>
      {xs.map((x) => (
        <User key={x} x={x} y={y} />
      ))}
    </>
  );
}

function Access() {
  return (
    <Layer steps={[0]}>
      <Lab x={40} y={110} t="LAYER 1 · ACCESS · FOODCHÉRI" c="strong" />
      <Inspectable id="s-red" title="Redshift">
        <g>
          <Lab x={100} y={235} t="REDSHIFT" c="center" />
          <Db cx={100} y={250} w={120} h={130} />
          <Sub x={100} y={402} t="Raw Data" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[164, 315]} to={[212, 315]} />
      <Inspectable id="s-pump" title="Ingestion tool">
        <g>
          <Lab x={270} y={235} t="INGESTION" c="center" />
          <path className="tx-conn" d="M270 268L312 292V340L270 364 228 340V292Z" />
          <g className="tx-icon" transform="translate(270 316)">
            <path d="M-10-14V-4M10-14V-4M-16-4H16V4C16 12 8 16 0 16S-16 12-16 4ZM0 16V24" />
          </g>
          <Sub x={270} y={402} t="Ready-made tool" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[316, 315]} to={[362, 315]} />
      <Inspectable id="s-plant" title="SQL models">
        <Win x={368} y={222} w={212} h={188} title="SQL MODELS">
          <Code
            x={384}
            y={272}
            lh={24}
            lines={['SELECT order_id,', '  SUM(amount) AS total', 'FROM raw.orders', 'GROUP BY 1']}
          />
        </Win>
      </Inspectable>
      <Arrow from={[584, 315]} to={[626, 315]} />
      <Inspectable id="s-tower" title="BigQuery">
        <g>
          <Lab x={690} y={235} t="BIGQUERY" c="center" />
          <Db cx={690} y={250} w={120} h={130} />
          <Sub x={690} y={402} t="Curated tables" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[754, 315]} to={[790, 315]} />
      <Inspectable id="s-tap" title="Metabase">
        <Win x={796} y={222} w={170} h={188} title="METABASE">
          <Bars x={812} y={262} w={138} h={130} vals={[0.4, 0.7, 0.5, 0.9, 0.65]} />
        </Win>
      </Inspectable>
      <Arrow from={[880, 416]} to={[880, 486]} />
      <Inspectable id="s-users" title="Business teams">
        <g>
          <Users xs={[800, 850, 900, 950]} y={548} />
          <Lab x={875} y={576} t="BUSINESS TEAMS" c="center" />
          <Sub x={875} y={596} t="Self-service BI" c="center" />
        </g>
      </Inspectable>
    </Layer>
  );
}

function Transformation() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={110} t="LAYER 2 · TRANSFORMATION · HEETCH" c="strong" />
      {inflow.map((t, i) => (
        <Fragment key={t}>
          <Inspectable id={`s-in-${i}`} title={`${t.charAt(0)}${t.slice(1).toLowerCase()} records`}>
            <g>
              <Lab x={40} y={265 + i * 60} t={t} />
            </g>
          </Inspectable>
          <Arrow from={[112, 260 + i * 60]} to={[168, 315]} />
        </Fragment>
      ))}
      <Inspectable id="s-raw" title="BigQuery · raw">
        <g>
          <Lab x={230} y={235} t="BIGQUERY · RAW" c="center" />
          <Db cx={230} y={255} w={110} h={120} />
        </g>
      </Inspectable>
      <Arrow from={[288, 315]} to={[322, 315]} />
      <Inspectable id="s-orch" title="Orchestration and tags">
        <g>
          <Lab x={330} y={150} t="ORCHESTRATION · TAG POLICY" />
          <path className="tx-axis" d="M330 165H630" />
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} className="tx-tick" d={`M${345 + i * 66} 158V172`} />
          ))}
          <Move path="M345 165H615" dur={6}>
            <circle className="tx-alert" r="6" />
          </Move>
        </g>
      </Inspectable>
      <Inspectable id="s-df" title="Dataform">
        <Win x={328} y={186} w={306} h={300} title="DATAFORM · INCREMENTAL SQL MODELS">
          <Graph
            nodes={dataformNodes}
            edges={[
              [0, 3],
              [1, 3],
              [1, 4],
              [2, 4],
              [3, 5],
              [4, 5],
            ]}
          />
        </Win>
      </Inspectable>
      <Inspectable id="s-tests" title="Reusable tests in Dataform">
        <g>
          <Check x={470} y={330} />
          <Check x={470} y={410} />
          <Check x={564} y={370} />
          <Lab x={345} y={472} t="REUSABLE DATA TESTS" />
        </g>
      </Inspectable>
      <Arrow from={[638, 315]} to={[662, 315]} />
      <Inspectable id="s-cur" title="BigQuery · curated">
        <g>
          <Lab x={722} y={235} t="BIGQUERY · CURATED" c="center" />
          <Db cx={722} y={255} w={110} h={120} />
          <Sub x={722} y={398} t="Daily toward hourly" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[780, 290]} to={[812, 240]} />
      <Arrow from={[780, 340]} to={[812, 405]} />
      <Inspectable id="s-looker" title="Looker">
        <Win x={816} y={160} w={150} h={145} title="LOOKER · BI">
          <Bars x={830} y={198} w={122} h={92} vals={[0.4, 0.75, 0.55, 0.9]} />
        </Win>
      </Inspectable>
      <Inspectable id="s-vertex" title="Vertex AI">
        <Win x={816} y={340} w={150} h={145} title="VERTEX AI · AI">
          <Graph
            nodes={[
              [840, 385],
              [840, 440],
              [890, 370],
              [890, 412],
              [890, 455],
              [940, 412],
            ]}
            edges={[
              [0, 2],
              [0, 3],
              [0, 4],
              [1, 2],
              [1, 3],
              [1, 4],
              [2, 5],
              [3, 5],
              [4, 5],
            ]}
          />
        </Win>
      </Inspectable>
    </Layer>
  );
}

function Observability() {
  return (
    <Layer steps={[2]}>
      <Lab x={40} y={110} t="LAYER 3 · OBSERVABILITY · VERISURE" c="strong" />
      <Inspectable id="o-dbt" title="dbt Core">
        <Win x={40} y={210} w={225} h={210} title="DBT CORE · MODELS">
          <Graph
            nodes={[
              [75, 275],
              [75, 335],
              [75, 395],
              [155, 305],
              [155, 375],
              [230, 340],
            ]}
            edges={[
              [0, 3],
              [1, 3],
              [1, 4],
              [2, 4],
              [3, 5],
              [4, 5],
            ]}
          />
        </Win>
      </Inspectable>
      <Arrow from={[270, 315]} to={[308, 315]} />
      <Inspectable id="o-marts" title="Snowflake marts">
        <g>
          <Lab x={475} y={205} t="SNOWFLAKE MARTS" c="center" />
          {marts.map((x) => (
            <Db key={x} cx={x} y={245} w={90} h={110} />
          ))}
        </g>
      </Inspectable>
      <Inspectable id="o-sensors" title="Elementary tests">
        <g>
          {marts.map((x) => (
            <Check key={x} x={x} y={228} />
          ))}
          <Lab x={475} y={392} t="ELEMENTARY TESTS" c="center" />
          <Sub x={475} y={412} t="525 a day" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="o-leak" title="An anomaly, caught early">
        <g>
          <circle className="tx-ping" cx="580" cy="300" r="24" />
          <circle className="tx-alert" cx="580" cy="300" r="7" />
          <Lab x={585} y={378} t="ANOMALY" c="center warm" />
        </g>
      </Inspectable>
      <Arrow from={[632, 315]} to={[672, 315]} />
      <Inspectable id="o-room" title="Shared model">
        <Win x={678} y={195} w={288} h={225} title="SHARED OBSERVABILITY MODEL">
          {['DETECT', 'QUALIFY', 'PRIORITISE'].map((t, i) => (
            <Fragment key={t}>
              <circle className="tx-stage" style={css({ '--i': i })} cx="705" cy={252 + i * 56} r="13" />
              <Lab x={730} y={257 + i * 56} t={t} />
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Arrow from={[822, 426]} to={[822, 480]} />
      <Inspectable id="o-teams" title="Data teams">
        <g>
          <Users xs={[735, 785, 835, 885]} y={545} />
          <Lab x={810} y={574} t="DATA TEAMS" c="center" />
          <Sub x={810} y={594} t="Alerts worth acting on" c="center" />
        </g>
      </Inspectable>
    </Layer>
  );
}

export default function StackScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="ONE DATA SYSTEM · THREE LAYERS, THREE ROLES" />
      <Access />
      <Transformation />
      <Observability />
    </>
  );
}
