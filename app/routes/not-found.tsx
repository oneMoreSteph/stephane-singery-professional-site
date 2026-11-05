import { Link } from 'react-router';
import { SiteFooter } from '~/components/SiteFooter';
import { SiteNav } from '~/components/SiteNav';
import { site } from '~/site';
import type { Route } from './+types/not-found';

export const meta: Route.MetaFunction = () => [{ title: `Page not found | ${site.name}` }, { name: 'robots', content: 'noindex' }];

export default function NotFound() {
  return (
    <div className="page">
      <SiteNav />
      <main className="page__main">
        <p className="eyebrow">404</p>
        <h1>This page does not exist.</h1>
        <p className="lede">
          <Link to="/">Back to the cockpit</Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
