import { memo } from 'react';
import { Link } from 'react-router';
import { countWord, pad, stopCount, stopSections } from '~/content';
import { site } from '~/site';

const first = stopSections[0];
const last = stopSections[stopSections.length - 1];
const stopsWord = `${countWord(stopCount).toUpperCase()} STOPS`;

/**
 * The cockpit, map and chapter frames that app/legacy/journey.js brings to life.
 * Rendered once and never re-rendered: the journey script owns these nodes after it starts.
 */
export const JourneyMarkup = memo(function JourneyMarkup({ onStart }: { onStart: (path: string) => void }) {
  const start = (path: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    onStart(path);
  };
  return (
    <>
      <a className="skip-link" href={`/${first.slug}`} onClick={start(`/${first.slug}`)}>
        Skip to work and evidence
      </a>
      <main className="experience" id="experience">
        <canvas className="world-canvas" id="world-canvas" aria-hidden="true"></canvas>

        <section className="cockpit" id="cockpit" aria-labelledby="opening-title">
          <img
            className="cockpit-image"
            src="/assets/cockpit-center-seat.png"
            alt="View from the middle seat of a spacecraft cockpit with four windows ahead, hands and legs visible"
          />
          <div className="cockpit-shade" aria-hidden="true"></div>
          <div className="cockpit-identity">
            <span className="identity-mark">S</span>
            <span>
              {site.name.toUpperCase()}
              <small>{site.role.toUpperCase()}</small>
            </span>
          </div>
          <div className="cockpit-intro">
            <span className="eyebrow">OPERATIONS · DATA ENGINEERING · OBSERVABILITY</span>
            <h1 id="opening-title">
              Data systems
              <br />
              <em>people rely on.</em>
            </h1>
            <p>
              From live rail operations to Data Platforms and observability: I design for production and think for
              operations. My next step: contributing to Europe’s technological sovereignty.
            </p>
          </div>
          <button
            className="display-entry"
            id="open-map"
            type="button"
            aria-label={`Start the journey: open the map of the ${countWord(stopCount)} stops`}
            onClick={() => onStart('/map')}
          >
            <span className="display-corners" aria-hidden="true"></span>
            <span>
              START THE JOURNEY <b aria-hidden="true">↗</b>
            </span>
          </button>
          <div className="cockpit-bottom">
            <span>01 / COCKPIT</span>
            <span>
              {stopsWord} · FROM {first.stop.name.toUpperCase()} TO {last.title.replace(/^Why /, '').toUpperCase()}
            </span>
            <button className="text-link" id="quick-work" type="button" onClick={() => onStart(`/${first.slug}`)}>
              VIEW {first.title.toUpperCase()} ↗
            </button>
            <Link className="text-link" to="/contact">
              CONTACT ↗
            </Link>
          </div>
        </section>

        <section className="map scene-panel" id="map" aria-labelledby="map-title" inert>
          <header className="map-header">
            <span className="header-identity">
              SS <i>/</i> EXPERIENCE MAP
            </span>
            <span className="map-status">
              <i></i> FOLLOW THE ROUTE
            </span>
            <button className="text-link" id="map-to-cockpit" type="button">
              ↖ COCKPIT
            </button>
          </header>
          <div className="map-heading">
            <span className="eyebrow">THE JOURNEY · {stopsWord}</span>
            <h2 id="map-title">Follow the route.</h2>
            <p>
              Start on {first.stop.name} with every role, then fly out stop by stop to the next step:{' '}
              {last.title.replace(/^Why /, '').replace(/^./, (c) => c.toUpperCase())}. Any stop opens on its own.
            </p>
          </div>
          <div className="orbit-label orbit-label-inner" aria-hidden="true">
            LOW EARTH ORBIT
          </div>
          <div className="orbit-label orbit-label-outer" aria-hidden="true">
            OUTBOUND / DEEP SPACE
          </div>
          <nav className="destination-field" aria-label="Mission destinations">
            {stopSections.map((s, i) => (
              <button
                key={s.slug}
                className="destination-node"
                id={`node-${s.stop.key}`}
                data-destination={s.stop.key}
                type="button"
                aria-label={`${s.stop.spokenName}: ${s.title.charAt(0).toLowerCase()}${s.title.slice(1)}`}
              >
                <span className="node-index">{pad(i + 1)}</span>
                <span className="node-copy">
                  <b>{s.stop.label}</b>
                  <small>{s.stop.tagline}</small>
                </span>
                <span className="node-dot" aria-hidden="true"></span>
              </button>
            ))}
          </nav>
          <aside className="mission-brief" id="mission-brief">
            <div className="brief-route" role="group" aria-label="Stops on the route">
              {stopSections.map((s, i) => (
                <button
                  key={s.slug}
                  className="brief-stop"
                  type="button"
                  aria-label={`Stop ${i + 1}: ${s.title.charAt(0).toLowerCase()}${s.title.slice(1)}`}
                ></button>
              ))}
            </div>
            <div aria-live="polite">
              <span className="brief-number" id="brief-number">
                STOP 1 OF {stopCount} · {first.stop.name.toUpperCase()}
              </span>
              <h3 id="brief-title">{first.title}</h3>
              <p id="brief-text"></p>
            </div>
            <div className="brief-controls">
              <button className="brief-step" id="brief-prev" type="button" aria-label="Previous stop">
                ‹
              </button>
              <button className="primary-action" id="brief-action" type="button">
                {first.stop.action} <span aria-hidden="true">↗</span>
              </button>
              <button className="brief-step brief-step--next" id="brief-next" type="button" aria-label="Next stop">
                NEXT STOP ›
              </button>
            </div>
          </aside>
          <div className="map-bottom">
            <span>FOLLOW THE ROUTE · ← → TO MOVE BETWEEN STOPS · DRAG EARTH TO TURN IT</span>
          </div>
          <div className="map-loading" id="map-loading" role="status" hidden>
            PREPARING THE EXPERIENCE MAP<span aria-hidden="true">···</span>
          </div>
          <div className="map-fallback" id="map-fallback" hidden>
            <p>3D view unavailable. All {countWord(stopCount)} portfolio sections remain available through their labels.</p>
          </div>
        </section>

        <section className="chapter scene-panel" id="chapter" aria-labelledby="chapter-title" inert>
          <header className="chapter-header">
            <button className="text-link" id="back-to-map" type="button">
              ↖ EXPERIENCE MAP
            </button>
            <nav className="route-steps" id="chapter-route" aria-label="Journey stops"></nav>
            <button className="text-link" id="back-to-cockpit" type="button">
              COCKPIT ↗
            </button>
          </header>
          <figure className="chapter-visual" id="chapter-visual" hidden>
            <img id="chapter-visual-image" alt="" />
            <figcaption id="chapter-visual-credit"></figcaption>
          </figure>
          <div className="chapter-hardware">
            <span className="hardware-kicker" id="hardware-kicker">
              {first.stop.hardware} / {first.title.toUpperCase()}
            </span>
            <button className="hardware-info" id="hardware-info" type="button">
              WHY THIS DESTINATION? <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className="chapter-reading">
            <div className="chapter-heading">
              <span className="eyebrow" id="chapter-eyebrow"></span>
              <h2 id="chapter-title"></h2>
              <p id="chapter-intro"></p>
            </div>
            <div className="chapter-items" id="chapter-items"></div>
            <div className="chapter-next">
              <button className="secondary-action" id="next-destination" type="button"></button>
              <span className="chapter-links">
                <a href={site.cv} target="_blank" rel="noopener">
                  OPEN CV ↗
                </a>
                <Link to="/contact">CONTACT ↗</Link>
              </span>
            </div>
          </div>
        </section>

        <div className="track-overlay" id="track-overlay" hidden></div>

        <div className="detail-overlay" id="detail-overlay" hidden>
          <button className="detail-scrim" id="detail-scrim" type="button" aria-label="Close detail"></button>
          <article className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <header>
              <span className="detail-brand">
                <img id="detail-logo" alt="" hidden />
                <span id="detail-category"></span>
              </span>
              <button className="detail-close" id="detail-close" type="button" aria-label="Close detail">
                ×
              </button>
            </header>
            <div className="detail-content">
              <span className="eyebrow" id="detail-eyebrow">
                INSIDE THE WORK
              </span>
              <h2 id="detail-title"></h2>
              <p className="detail-lede" id="detail-lede" hidden></p>
              <div className="detail-beats" id="detail-beats"></div>
              <p className="detail-source" id="detail-source"></p>
            </div>
          </article>
        </div>
      </main>
    </>
  );
});
