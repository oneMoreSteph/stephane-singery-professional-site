import { Link } from 'react-router';
import { sectionPath } from '~/content';
import { sections } from '~/sections';
import { site } from '~/site';

/** Name and the list of sections, generated from the section list. */
export function SiteNav() {
  return (
    <header className="site-header">
      <Link className="site-header__name" to="/">
        {site.name}
        <small>{site.role}</small>
      </Link>
      <nav aria-label="Sections">
        <ul>
          {sections.map((s) => (
            <li key={s.slug}>
              <Link to={sectionPath(s)}>{s.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
