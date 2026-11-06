// Earth · FoodChéri / Seazon Data: the access layer — a first Data Platform, and analysis opened to every team.
import { T, vars } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Crew, Line } from '~/drawings/ops';
import { BigReadout, Card, StepRow, SysLink, SystemScene } from '../system/parts';

/** 25 colleagues; the lit ones build their own analysis. */
function ProducerGrid({ lit, x = 760, y = 486 }: { lit: number; x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="producer-grid">
      {Array.from({ length: 25 }, (_, i) => (
        <g
          key={i}
          transform={`translate(${(i % 5) * 38} ${Math.floor(i / 5) * 30})`}
          className={`producer${i < lit ? ' is-lit' : ''}${i >= 2 && lit > 2 ? ' is-new' : ''}`}
          style={vars({ '--i': i })}
        >
          <Crew x={0} y={0} s={0.5} />
        </g>
      ))}
      <T x={76} y={166} className="center mini-label">
        {lit > 2 ? '25 ACTIVE PRODUCERS' : '2 ACTIVE PRODUCERS'}
      </T>
    </g>
  );
}

export default function SystemFoodScene() {
  return (
    <SystemScene kind="food">
      <Layer steps={[0]}>
        <BigReadout
          value="600+"
          label="TABLEAU DASHBOARDS IN MY AUDIT"
          caption="About one in ten used regularly."
        />
        <T x={390} y={516} className="card-title">
          2 producers
        </T>
        <T x={390} y={542} className="card-title">
          for 250 employees.
        </T>
        <T x={390} y={580} className="card-body">
          Each lit marker is one colleague
        </T>
        <T x={390} y={600} className="card-body">
          building analysis.
        </T>
        <ProducerGrid lit={2} />
      </Layer>
      <Layer steps={[1]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            className="request-line"
            d={`M${880 - i * 6} ${300}C${870 - i * 10} ${360 - i * 4} ${790} ${372 - i * 6} ${790 - i * 14} ${340 + i * 2}`}
          />
        ))}
        <g transform="translate(700 318)">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} className="queue-card" x={i * 6} y={i * 6} width="70" height="34" rx="2" />
          ))}
          <T x={40} y={74} className="center mini-label warm">
            REQUESTS QUEUE
          </T>
        </g>
        <BigReadout value="Bottleneck" label="DEMAND GROWS · CAPACITY STAYS" word />
        <Card
          x={390}
          y={500}
          w={270}
          h={96}
          kicker="MUST CHANGE · 1"
          title="How Data is made available"
          body="sources → curated tables"
        />
        <Card
          x={690}
          y={500}
          w={270}
          h={96}
          kicker="MUST CHANGE · 2"
          title="The BI tool"
          body="one anyone can use"
        />
      </Layer>
      <Layer steps={[2]}>
        <Line d="M155 225H650" c="sys-highlight" />
        <BigReadout value="1st" label="END-TO-END DATA PLATFORM" caption="Every block chosen and built." />
        <Card x={370} y={500} w={180} h={96} kicker="01" title="Ingestion" body="From Redshift" />
        <Card x={565} y={500} w={180} h={96} kicker="02" title="SQL models" body="Transformations" />
        <Card x={760} y={500} w={200} h={96} kicker="03" title="Curated tables" body="In BigQuery" />
      </Layer>
      <Layer steps={[3]}>
        <g transform="translate(690 322)">
          <rect className="tag-box" width="130" height="40" rx="3" />
          <T x={65} y={25} className="center chip-label strong">
            TABLEAU → METABASE
          </T>
        </g>
        <BigReadout value="Metabase" label="DEFENDED BEFORE THE BOARD" word />
        <g transform="translate(390 500)">
          <StepRow
            items={['EXPLORE', 'BENCHMARK', 'TRIAL', 'BOARD', 'MIGRATION']}
            step={116}
            w={104}
            h={48}
            ty={29}
            arrowAt={108}
          />
        </g>
        <SysLink
          x={390}
          y={572}
          w={330}
          h={52}
          to="food-deadline"
          label="Open the six-week deadline case"
          kicker="HIGH-STAKES · SIX WEEKS"
          sub="Critical board dashboards, on time"
        />
      </Layer>
      <Layer steps={[4]}>
        <BigReadout value="2 → 25" label="ACTIVE ANALYSIS PRODUCERS" caption="After a short training." />
        {['Documentation', 'How-to videos', 'Training per team'].map((t, i) => (
          <g key={t} transform={`translate(390 ${506 + i * 34})`}>
            <rect className="tag-box" width="200" height="26" rx="2" />
            <T x={12} y={18} className="chip-label strong">
              {t}
            </T>
          </g>
        ))}
        <ProducerGrid lit={25} />
      </Layer>
      <Layer steps={[5]}>
        <Line d="M755 300V330H420V302" c="sys-tap lit" />
        <T x={588} y={352} className="center mini-label warm">
          WHAT HAPPENS BENEATH DATA ANALYSIS
        </T>
        <BigReadout value="Beneath" label="THE PULL TOWARD ENGINEERING" word />
        <SysLink
          x={390}
          y={520}
          w={360}
          to="heetch"
          label="Open the Heetch role"
          kicker="AUGUST 2022 · HEETCH"
          sub="Data Engineer"
        />
      </Layer>
    </SystemScene>
  );
}
