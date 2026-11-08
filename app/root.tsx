import { useState } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation, useMatches } from 'react-router';
import type { Route } from './+types/root';
import { site } from './site';
import './legacy/mission-journey.css';
import './legacy/mission-visuals.css';
import './styles/tokens.css';
import './styles/site.css';

// Every page sets its own title; this one covers the 404 fallback, rendered before any page matches.
export const meta: Route.MetaFunction = () => [{ title: site.name }];

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'icon', href: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // Journey pages are full-screen scenes; other pages scroll like documents.
  const journey = useMatches().some((m) => m.id === 'routes/journey');
  // The first scene follows the address: a section never shows the cockpit while the 3D world loads.
  // It is set once on entering the journey; the journey changes it itself afterwards.
  const { pathname } = useLocation();
  const sceneHere = pathname === '/' ? 'cockpit' : pathname === '/map' ? 'map' : 'approaching';
  const [firstScene, setFirstScene] = useState<string | null>(null);
  if (journey && firstScene === null) setFirstScene(sceneHere);
  if (!journey && firstScene !== null) setFirstScene(null);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#061018" />
        <script src="/enhance.js"></script>
        <Meta />
        <Links />
      </head>
      <body {...(journey ? { 'data-scene': firstScene ?? sceneHere } : { className: 'page-body' })}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
