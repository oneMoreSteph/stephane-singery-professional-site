// Earth · Heetch: the transformation layer — from a daily flow toward hourly, on a platform I built most of.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import { Packet, T, vars } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Line } from '~/drawings/ops';
import { BigReadout, Card, StepRow, SysLink, sysCols, SystemScene } from '../system/parts';

/** 24 hourly slots; lit at one hour, or all of them. */
function Hours({ y, label, lit }: { y: number; label: string; lit: number | 'all' }) {
  return (
    <g transform={`translate(380 ${y})`}>
      <T x={0} y={-10} className="mini-label">
        {label}
      </T>
      {Array.from({ length: 24 }, (_, i) => (
        <rect
          key={i}
          className={`hour${lit === 'all' || lit === i ? ' is-lit' : ''}${lit === 'all' ? ' is-seq' : ''}`}
          x={i * 24}
          y="0"
          width="18"
          height="22"
          rx="2"
          style={vars({ '--i': i })}
        />
      ))}
      {[0, 6, 12, 18].map((h) => (
        <T key={h} x={h * 24} y={40} className="chip-label">{`${String(h).padStart(2, '0')}:00`}</T>
      ))}
    </g>
  );
}

const before: ['ing' | 'trf' | 'sto' | 'acc', string, string, string][] = [
  ['ing', 'S3', 'Raw storage', 'Raw Data landed in S3.'],
  [
    'trf',
    'DATAIKU',
    'Most transformations',
    'Transformations ran mostly in Dataiku, where I developed a lot.',
  ],
  ['sto', 'REDSHIFT', 'Raw + curated, mixed', 'Raw and curated Data were mixed in Redshift.'],
  [
    'acc',
    'LOOKER',
    'Refreshed once a day',
    'Looker dashboards refreshed once a day, while the company needed Data every hour.',
  ],
];
const chain = ['RAW BIGQUERY', 'MODELS DATAFORM', 'ORCHESTRATION', 'LOOKER VERTEX AI'];
const life = ['GENERATE', 'INGEST', 'STORE', 'TRANSFORM', 'SERVE', 'OBSERVE'];
const arrivals: [string, number][] = [
  ['NEW', 350],
  ['UPDATED', 420],
  ['LATE', 490],
];
const workflows: [string, number, string][] = [
  ['ETL PIPELINES', 110, 'ETL pipelines for operational business workflows, beyond the platform.'],
  ['MICROSERVICES', 290, 'Microservices for operational business workflows, beyond the platform.'],
];

export default function SystemHeetchScene() {
  return (
    <SystemScene kind="heetch">
      <Layer steps={[0]}>
        <BigReadout value="Maturity" label="A MORE MATURE DATA ORGANISATION" word />
        <g transform="translate(390 510)">
          <StepRow
            items={['FIRST INTERVIEW', 'TECHNICAL TEST', 'DATA ENGINEER']}
            step={190}
            w={170}
            h={48}
            ty={29}
            arrowAt={175}
          />
        </g>
      </Layer>
      <Layer steps={[0, 2, 3, 4, 5]}>
        <path className="bq-bracket" d="M190 130v-9H655v9" />
        <T x={422} y={112} className="center mini-label bq-label">
          ALL IN BIGQUERY · GOOGLE CLOUD
        </T>
      </Layer>
      <Layer steps={[1]}>
        <g data-tour-only="">
          {before.map(([id, t, sub, body]) => (
            <Fragment key={id}>
              <rect className="old-back" x={sysCols[id] - 64} y="145" width="128" height="176" rx="3" />
              <Inspectable
                id={`old-${id}`}
                title={`Before · ${t.charAt(0) + t.slice(1).toLowerCase()}`}
                body={body}
              >
                <g className="old-card" transform={`translate(${sysCols[id]} 225)`}>
                  <rect x="-64" y="-80" width="128" height="176" rx="3" />
                  <T x={0} y={-52} className="center mini-label old-tag">
                    BEFORE
                  </T>
                  <T x={0} y={6} className="center old-name">
                    {t}
                  </T>
                  <T x={0} y={34} className="center sys-sub">
                    {sub}
                  </T>
                </g>
              </Inspectable>
            </Fragment>
          ))}
        </g>
        <T x={170} y={345} className="mini-label muted">
          BEFORE · S3 → REDSHIFT → DATAIKU → LOOKER
        </T>
        <BigReadout value="Daily" label="THE EXISTING REFRESH" word />
        <Hours y={520} label="ONE REFRESH A DAY" lit={6} />
        <Hours y={610} label="THE NEED · EVERY HOUR" lit="all" />
      </Layer>
      <Layer steps={[2]}>
        <BigReadout
          value="Built by me"
          label="MOST OF THE NEW PLATFORM"
          caption="From raw storage to BI and AI delivery"
          word
        />
        <g transform="translate(390 500)">
          {chain.map((t, i) => {
            const [first, ...rest] = t.split(' ');
            return (
              <g key={t} className="chain-step is-mine" transform={`translate(${i * 145} 0)`}>
                <rect width="132" height="60" rx="3" />
                <T x={66} y={35} className="center chip-label strong">
                  {first}
                </T>
                {rest.length ? (
                  <T x={66} y={50} className="center chip-label">
                    {rest.join(' ')}
                  </T>
                ) : null}
              </g>
            );
          })}
          <T x={0} y={86} className="mini-label muted">
            ON GOOGLE CLOUD
          </T>
        </g>
      </Layer>
      <Layer steps={[3]}>
        {arrivals.map(([t, x], i) => (
          <Fragment key={t}>
            <Line d={`M${x} 370Q${x} 330 ${400 + i * 20} 302`} c="sys-tap lit" />
            <g transform={`translate(${x - 34} 370)`}>
              <rect className="tag-box" width="68" height="24" rx="2" />
              <T x={34} y={16} className="center chip-label strong">
                {t}
              </T>
            </g>
          </Fragment>
        ))}
        {['DATAFORM TESTS', 'ORCHESTRATION', 'TAG POLICY'].map((t, i) => (
          <g key={t} transform={`translate(560 ${322 + i * 22})`} className="check">
            <T x={0} y={0} className="chip-label strong">{`✓ ${t}`}</T>
          </g>
        ))}
        <BigReadout value="Incremental" label="NEARLY ALL THE SQL MODELS" word />
        <g transform="translate(400 500)">
          {['New records', 'Updates', 'Late arrivals'].map((t, i) => {
            const d = `M120 ${12 + i * 40}C230 ${12 + i * 40} 250 52 330 52`;
            return (
              <Fragment key={t}>
                <T x={0} y={18 + i * 40} className="card-body">
                  {t}
                </T>
                <Line d={d} c="sys-tap lit" />
                <Packet path={d} delay={i * 1.4} />
              </Fragment>
            );
          })}
          <rect className="tag-box" x="330" y="30" width="200" height="44" rx="3" />
          <T x={345} y={58} className="chip-label strong">
            CURATED DATASETS
          </T>
        </g>
      </Layer>
      <Layer steps={[4]}>
        <g data-tour-only="">
          {workflows.map(([t, x, body]) => (
            <Inspectable key={t} id={`wf-${t}`} title={t.charAt(0) + t.slice(1).toLowerCase()} body={body}>
              <g transform={`translate(${x} 330)`}>
                <rect className="tag-box" width="120" height="44" rx="3" />
                <T x={60} y={27} className="center chip-label strong">
                  {t}
                </T>
              </g>
            </Inspectable>
          ))}
          <BigReadout value="End to end" label="OPERATIONAL WORKFLOWS" word />
          {['Requirements', 'Implementation', 'Production support'].map((t, i) => (
            <Fragment key={t}>
              <Inspectable
                id={`wf-step-${i}`}
                title={t}
                body="Owned end to end, from requirements to production support."
              >
                <Card
                  x={390 + i * 195}
                  y={500}
                  w={175}
                  h={96}
                  kicker={String(i + 1).padStart(2, '0')}
                  title={t}
                />
              </Inspectable>
              {i < 2 ? (
                <T x={570 + i * 195} y={555} className="card-title">
                  →
                </T>
              ) : null}
            </Fragment>
          ))}
        </g>
      </Layer>
      <Layer steps={[5]}>
        <BigReadout value="→ hourly" label="DATA AVAILABILITY" caption="From a daily refresh." word />
        <g transform="translate(390 492)">
          <T x={0} y={-10} className="mini-label">
            THE DATA LIFECYCLE · STILL TO MASTER
          </T>
          {life.map((t, i) => (
            <g
              key={t}
              className={`life-step${['TRANSFORM', 'OBSERVE'].includes(t) ? ' is-mine' : ''}`}
              transform={`translate(${i * 96} 6)`}
            >
              <rect width="88" height="40" rx="20" />
              <T x={44} y={25} className="center chip-label strong">
                {t}
              </T>
            </g>
          ))}
        </g>
        <SysLink
          x={390}
          y={572}
          w={330}
          h={52}
          to="study-efrei"
          label="Open EFREI in Galileo"
          kicker="GALILEO · EFREI"
          sub="The engineering programme"
        />
      </Layer>
    </SystemScene>
  );
}
