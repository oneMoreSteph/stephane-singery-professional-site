import { site } from '~/site';
import { ContactLinks } from './ContactLinks';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        {site.name} · {site.role}
      </p>
      <ContactLinks />
    </footer>
  );
}
