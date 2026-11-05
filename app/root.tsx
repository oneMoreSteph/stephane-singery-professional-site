import { Links, Meta, Outlet, Scripts, ScrollRestoration, useMatches } from 'react-router';
import type { Route } from './+types/root';
import './legacy/mission-journey.css';
import './legacy/mission-visuals.css';
import './styles/tokens.css';
import './styles/site.css';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'icon', href: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // Journey pages are full-screen scenes; other pages scroll like documents.
  const journey = useMatches().some((m) => m.id === 'routes/journey');
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
      <body {...(journey ? { 'data-scene': 'cockpit' } : { className: 'page-body' })}>
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
