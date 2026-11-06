// Earth · Verisure: the observability layer — from reactive checks to a shared model of Data health.
import { Fragment } from 'react';
import { Packet, T } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Line } from '~/drawings/ops';
import { BigReadout, Card, StepRow, SysLink, SystemScene } from '../system/parts';

export default function SystemVerisureScene() {
  return (
    <SystemScene kind="verisure">
      <Layer steps={[0]}>
        <BigReadout value="Worldwide" label="THE SCALE OF THE COMPANY" word />
        <Card
          x={390}
          y={500}
          w={270}
          h={96}
          kicker="MY ROLE"
          title="Analytics Engineer"
          body="apprentice at Verisure"
        />
        <Card x={690} y={500} w={270} h={96} kicker="IN PARALLEL" title="EFREI" body="engineering degree" />
      </Layer>
      <Layer steps={[1]}>
        <g transform="translate(642 150)" className="alert-mark">
          <path d="M0-14l14 25h-28z" />
          <T x={0} y={7} className="center alert-glyph">
            !
          </T>
        </g>
        <Line d="M590 225H905" c="sys-spread" />
        <Packet path="M590 225H905" delay={0} colour="#f0a868" />
        <Packet path="M590 225H905" delay={3} colour="#f0a868" />
        <Line d="M905 300C905 360 420 360 420 302" c="sys-report" />
        <T x={662} y={372} className="center mini-label warm">
          FOUND THROUGH A BUSINESS REPORT
        </T>
        <BigReadout
          value="Reactive"
          label="HOW ANOMALIES WERE FOUND"
          caption="Manual checks, business reports."
          word
        />
        <g transform="translate(390 520)">
          <T x={0} y={0} className="mini-label">
            THE REQUEST
          </T>
          <T x={0} y={28} className="card-title">
            A mechanism to test Data
          </T>
          <T x={0} y={52} className="card-title">
            and detect anomalies proactively.
          </T>
        </g>
      </Layer>
      <Layer steps={[2, 3, 4, 5]}>
        <Line d="M420 300V395M590 300V395" c="sys-tap lit" />
      </Layer>
      <Layer steps={[2]}>
        <BigReadout value="Signals" label="TESTS ARE ONE SOURCE" word />
        <g transform="translate(390 510)">
          <StepRow
            items={['DETECT', 'QUALIFY', 'PRIORITISE', 'HISTORY', 'NOTIFY', 'GOVERN']}
            step={96}
            w={88}
            h={44}
            ty={27}
          />
          <T x={0} y={80} className="mini-label">
            OBSERVING DATA HEALTH
          </T>
        </g>
      </Layer>
      <Layer steps={[3]}>
        <g transform="translate(560 322)">
          <rect className="tag-box is-lit-box" width="130" height="40" rx="3" />
          <T x={65} y={25} className="center chip-label strong">
            DBT TESTS
          </T>
        </g>
        {[700, 835].map((x) => (
          <Fragment key={x}>
            <g transform={`translate(${x} 322)`}>
              <rect className="tag-box dashed" width="120" height="40" rx="3" />
              <T x={60} y={17} className="center chip-label strong">
                + OBSERVABILITY
              </T>
              <T x={60} y={32} className="center chip-label strong">
                DOMAIN
              </T>
            </g>
            <Line d={`M${x + 60} 362V395`} c="sys-tap dashed" />
          </Fragment>
        ))}
        <BigReadout
          value="Common"
          label="ALERT MODEL · TRANSVERSE LAYER"
          caption="dbt Core · Snowflake · Elementary."
          word
        />
        <Card
          x={390}
          y={500}
          w={270}
          h={96}
          kicker="FIRST OBSERVABILITY DOMAIN"
          title="dbt tests"
          body="live today"
        />
        <T x={670} y={555} className="card-title">
          →
        </T>
        <Card
          x={690}
          y={500}
          w={270}
          h={96}
          kicker="NEXT OBSERVABILITY DOMAINS"
          title="No redesign, just plug in"
          body="same alert model"
          c="dashed"
        />
      </Layer>
      <Layer steps={[4]}>
        <BigReadout value="525" label="TESTS EVERY DAY" caption="About 60,000 executions so far." />
        <g transform="translate(390 492)" className="issue-card">
          <rect width="270" height="100" rx="3" />
          <T x={14} y={24} className="mini-label warm">
            AUTOMATIC ALERT
          </T>
          <T x={14} y={50} className="chip-label strong">
            Qualified · prioritised
          </T>
          <T x={14} y={72} className="chip-label">
            Teams respond quickly
          </T>
        </g>
        <g transform="translate(690 492)">
          <rect className="ind" width="270" height="100" rx="3" />
          <T x={14} y={24} className="mini-label">
            MONITORING · TRENDS
          </T>
          <Line d="M14 84L70 70 126 76 182 56 256 44" c="spark" />
        </g>
      </Layer>
      <Layer steps={[5]}>
        <BigReadout value="Trust" label="IN DATA, ACROSS THE COMPANY" caption="Fewer manual controls." word />
        {['ISSUES SURFACE EARLIER', 'FEWER MANUAL CONTROLS', 'TRUST AT EVERY LEVEL'].map((t, i) => (
          <g key={t} transform={`translate(390 ${494 + i * 34})`}>
            <rect className="tag-box" width="270" height="26" rx="2" />
            <T x={12} y={18} className="chip-label strong">
              {t}
            </T>
          </g>
        ))}
        <SysLink
          x={690}
          y={494}
          w={270}
          to="signal"
          label="Open the signal or noise case"
          kicker="HIGH-STAKES · SIGNAL OR NOISE"
          sub="Governed alert exceptions"
        />
      </Layer>
    </SystemScene>
  );
}
