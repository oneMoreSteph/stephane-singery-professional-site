import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { lines, pad } from '~/content';
import { DrawingContext } from '~/drawings/context';
import { Palette } from '~/drawings/Palette';
import { scenes } from '~/drawings/scenes';
import { LegacyScene } from '~/legacy/LegacyScene';
import type { Case } from '~/sections/types';
import { tourTargets, useHighlightTour, type TourTarget } from './useHighlightTour';

const DEFAULT_INFO = {
  title: 'Explore the work',
  body: 'Click an element in the illustration: what it is, and why it matters.',
  clicked: false,
};
const reducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The interactive window of a case: step buttons, drawing, story column and the "what it is" panel. */
export function CaseWindow({ item, onOpenCase }: { item: Case; onOpenCase: (key: string) => void }) {
  const drawing = item.drawing!;
  const Scene = scenes[drawing.scene];
  const [step, setStep] = useState(0);
  // Every step button press replays the step, even the current one, as the previous engine did.
  const [visit, setVisit] = useState(0);
  const go = (next: number) => {
    setStep(next);
    setVisit((v) => v + 1);
  };
  const [zoom, setZoom] = useState(1);
  const [paused, setPaused] = useState(reducedMotion);
  const [inspectedId, setInspectedId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [pick, setPick] = useState<string | null>(null);
  const [info, setInfo] = useState(DEFAULT_INFO);
  const [targets, setTargets] = useState<TourTarget[]>([]);
  const [hasPicks, setHasPicks] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const camera = useRef<SVGGElement>(null);
  const story = useRef<HTMLDivElement>(null);
  const [label, heading, body] = item.beats[step];

  const onLight = useCallback((t: TourTarget) => {
    setFocusId(t.id);
    setInfo({ title: t.title, body: t.body, clicked: false });
  }, []);
  const { touredId, takeOver } = useHighlightTour(targets, paused, onLight);

  // The drawing fades in once.
  useEffect(() => {
    if (!reducedMotion())
      camera.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, easing: 'ease-out' });
  }, []);

  // On each step: reset the panel, collect the step's tour, restart its cycling highlights together, animate the story.
  useLayoutEffect(() => {
    const cam = camera.current;
    if (!cam) return;
    setFocusId(null);
    setPick(null);
    setInfo(DEFAULT_INFO);
    setTargets(tourTargets(cam));
    setHasPicks(!!cam.querySelector('[data-states]:not(.layer-hidden) [data-pick]'));
    const now = document.timeline.currentTime;
    cam
      .querySelectorAll(
        '[data-states]:not(.layer-hidden) :is(.seq3,.seq4,.seq5,.seq6,.seq-b,.cap3,.cap4,.cap5,.trigger,.cover-case)',
      )
      .forEach((n) => n.getAnimations().forEach((a) => (a.startTime = now)));
    if (!reducedMotion())
      story.current?.animate(
        [
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'none' },
        ],
        {
          duration: 380,
          easing: 'cubic-bezier(.2,.72,.16,1)',
        },
      );
  }, [step, visit]);

  useEffect(() => {
    if (paused) svg.current?.pauseAnimations();
    else svg.current?.unpauseAnimations();
  }, [paused]);

  const inspect = (el: SVGElement) => {
    const id = el.dataset.inspect ?? '';
    setInspectedId(id);
    setFocusId(id);
    setInfo({ title: el.dataset.title ?? '', body: el.dataset.body ?? '', clicked: true });
    takeOver(id);
  };

  // Clicks and keys inside the drawing: links to other cases, choices, inspectable elements.
  const onSceneClick = (e: React.MouseEvent) => {
    const target = e.target as Element;
    const chip = target.closest<SVGElement>('[data-open-case]');
    if (chip) return onOpenCase(chip.dataset.openCase ?? '');
    const picked = target.closest<SVGElement>('[data-pick]');
    if (picked) return setPick(picked.dataset.pick ?? null);
    const obj = target.closest<SVGElement>('[data-inspect]');
    if (obj) inspect(obj);
  };
  const onSceneKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const target = e.target as Element;
    const chip = target.closest<SVGElement>('[data-open-case]');
    const picked = target.closest<SVGElement>('[data-pick]');
    const obj = target.closest<SVGElement>('[data-inspect]');
    if (!chip && !picked && !obj) return;
    e.preventDefault();
    if (chip) onOpenCase(chip.dataset.openCase ?? '');
    else if (picked) setPick(picked.dataset.pick ?? null);
    else if (obj) inspect(obj);
  };

  const [what, why] = info.body.split('|');
  const last = item.beats.length - 1;
  const state = useMemo(() => ({ step, touredId, inspectedId }), [step, touredId, inspectedId]);

  return (
    <section className={`case-experience${paused ? ' motion-paused' : ''}`} data-case={item.slug}>
      <nav className="case-stages" aria-label="Explore this experience">
        {drawing.labels.map((l, i) => (
          <button key={l} type="button" data-step={i} aria-pressed={i === step} onClick={() => go(i)}>
            <span>{pad(i + 1)}</span>
            {l}
          </button>
        ))}
      </nav>
      <div className="case-layout">
        <div className="case-visual-column">
          <div className="case-scene">
            <svg
              ref={svg}
              className="story-svg"
              viewBox="0 0 1000 730"
              role="group"
              aria-label="Interactive illustration of the work"
              onClick={onSceneClick}
              onKeyDown={onSceneKey}
            >
              <Palette />
              <rect width="1000" height="730" fill="url(#sceneGrid)" />
              <g
                ref={camera}
                className={`scene-camera${targets.length > 1 ? ' is-touring' : ''}`}
                data-stage={step}
                data-focus={focusId ?? undefined}
                data-pick={pick ?? undefined}
                style={{ transform: `translate(${500 - 500 * zoom}px,${365 - 365 * zoom}px) scale(${zoom})` }}
              >
                <DrawingContext.Provider value={state}>
                  {Scene ? <Scene /> : <LegacyScene name={drawing.scene} />}
                </DrawingContext.Provider>
              </g>
            </svg>
            <div className="scene-tools" aria-label="Illustration controls">
              <button
                type="button"
                aria-label="Zoom into illustration"
                onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
              >
                +
              </button>
              <button
                type="button"
                aria-label="Zoom out of illustration"
                onClick={() => setZoom((z) => Math.max(0.75, z - 0.2))}
              >
                −
              </button>
              <button type="button" aria-label="Reset illustration view" onClick={() => setZoom(1)}>
                ↺
              </button>
              <button
                type="button"
                aria-pressed={paused}
                aria-label={paused ? 'Play illustration motion' : 'Pause illustration motion'}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? '▷' : 'Ⅱ'}
              </button>
            </div>
            <span className="scene-interaction-hint" hidden={!targets.length && !hasPicks}>
              Highlights move every 2 s · click any element to inspect it
            </span>
          </div>
          <p className="scene-note">
            {drawing.note}{' '}
            {drawing.mapSources && (
              <a href="/assets/geography/README.md" target="_blank" rel="noopener">
                Map sources ↗
              </a>
            )}
          </p>
        </div>
        <div className="case-story" aria-live="polite" ref={story}>
          <span className="story-counter">{label}</span>
          <h3>{heading}</h3>
          <ul className="story-body bullets">
            {lines(body).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <div className="story-navigation">
            <button
              type="button"
              aria-label="Previous part of this experience"
              disabled={step === 0}
              onClick={() => go(Math.max(0, step - 1))}
            >
              ← Previous
            </button>
            <button type="button" disabled={step === last} onClick={() => go(Math.min(last, step + 1))}>
              {step === last ? 'End of this story ✓' : 'Next part →'}
            </button>
          </div>
          <div
            className="story-progress"
            aria-hidden="true"
            style={{ '--progress': `${((step + 1) / item.beats.length) * 100}%` } as React.CSSProperties}
          ></div>
          <div className={`scene-inspection${info.clicked && why ? ' has-why' : ''}`} aria-live="polite">
            <strong>{info.title}</strong>
            <p className="ins-def">
              {why && !info.clicked ? 'Click to see what it is and why it matters.' : what}
            </p>
            <p className="ins-why" hidden={!(info.clicked && why)}>
              {why || ''}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
