import { ContactLinks } from '~/components/ContactLinks';
import { SiteFooter } from '~/components/SiteFooter';
import { SiteNav } from '~/components/SiteNav';
import { metaForPath } from '~/meta';
import { site } from '~/site';
import type { Route } from './+types/page';

export const meta: Route.MetaFunction = ({ location }) => metaForPath(location.pathname);

export default function ContactPage() {
  return (
    <div className="page">
      <SiteNav />
      <main className="page__main">
        <img
          className="portrait"
          src="/assets/portrait-320.webp"
          alt={`Portrait of ${site.name}`}
          width="120"
          height="120"
        />
        <p className="eyebrow">CONTACT</p>
        <h1>Let’s talk.</h1>
        <p className="lede">
          {site.name}, {site.role}. The quickest way to reach me is by email or LinkedIn.
        </p>
        <ContactLinks className="contact-links contact-links--large" withText />
      </main>
      <SiteFooter />
    </div>
  );
}
