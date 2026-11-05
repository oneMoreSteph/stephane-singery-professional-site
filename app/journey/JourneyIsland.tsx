import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ABOUT_SLUG, findStopByKey, stopSections } from '~/content';
import type { Journey, startJourney as StartJourney } from '~/legacy/journey.js';
import { JourneyMarkup } from './JourneyMarkup';

// The 3D journey and Three.js load only when needed: never for the cockpit alone.
const loadJourney = () => import('~/legacy/journey.js');

/** Old "#earth?case=rail" addresses become "/experience/rail". */
function fromOldHash(hash: string): string | null {
  const [id, query = ''] = hash.slice(1).split('?');
  if (!id || id === 'cockpit') return null;
  if (id === 'map') return '/map';
  const section = findStopByKey(id);
  if (!section) return null;
  const params = new URLSearchParams(query);
  const kase = params.get('case');
  const view = params.get('view');
  const sub = kase ? `/${kase.startsWith('hardware-') ? ABOUT_SLUG : kase}` : '';
  return `/${section.slug}${sub}${view && !kase ? `?view=${view}` : ''}`;
}

export function JourneyIsland() {
  const location = useLocation();
  const navigate = useNavigate();
  const journey = useRef<Journey | null>(null);
  const ownAddress = useRef<string | null>(null);
  const firstRun = useRef(true);

  /** Creates the journey once its code has loaded. Returns null if this island has gone meanwhile. */
  const create = useCallback(
    (startJourney: typeof StartJourney) => {
      journey.current ??= startJourney({
        stops: stopSections,
        aboutSlug: ABOUT_SLUG,
        // The journey reports its own moves, so they are not replayed when the address changes.
        navigate: (path: string, { replace = false } = {}) => {
          ownAddress.current = path;
          navigate(path, { replace, preventScrollReset: true });
        },
      });
      return journey.current;
    },
    [navigate],
  );

  // First load: redirect old # addresses, then start the journey unless the visitor is in the cockpit.
  useEffect(() => {
    let gone = false;
    const redirect = fromOldHash(window.location.hash);
    if (redirect) navigate(redirect, { replace: true });
    else if (window.location.pathname !== '/') {
      const { pathname, search } = window.location;
      loadJourney().then(({ startJourney }) => {
        if (!gone) create(startJourney).start(pathname, search);
      });
    }
    return () => {
      gone = true;
      journey.current?.destroy();
      journey.current = null;
    };
  }, [create, navigate]);

  // Back, forward and links: move the journey to the new address.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const here = `${location.pathname}${location.search}`;
    if (ownAddress.current === here) {
      ownAddress.current = null;
      return;
    }
    ownAddress.current = null;
    if (journey.current) journey.current.goTo(location.pathname, location.search);
    else if (location.pathname !== '/') {
      const { pathname, search } = location;
      loadJourney().then(({ startJourney }) => create(startJourney).goTo(pathname, search));
    }
  }, [location, create]);

  // Buttons pressed before the journey has loaded: load it, then go where the button points.
  const onStart = useCallback(
    (path: string) => {
      if (journey.current) return;
      loadJourney().then(({ startJourney }) => {
        create(startJourney);
        navigate(path);
      });
    },
    [create, navigate],
  );

  return <JourneyMarkup onStart={onStart} />;
}
