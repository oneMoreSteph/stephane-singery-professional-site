import { Link, useLocation } from 'react-router';
import { Beats } from '~/components/Beats';
import { findSection, sectionPath } from '~/content';
import { metaForPath } from '~/meta';
import type { Route } from './+types/about';

export const meta: Route.MetaFunction = ({ location }) => metaForPath(location.pathname);

export default function AboutPage() {
  const section = findSection(useLocation().pathname.split('/')[1]);
  if (!section?.stop) return null;
  const { about } = section.stop;
  return (
    <article>
      <p className="eyebrow">{section.stop.hardware}</p>
      <h1>{about.title}</h1>
      <Beats beats={about.beats} />
      <p>
        <a href={about.url} target="_blank" rel="noopener">
          Spacecraft information ↗
        </a>
      </p>
      <p>
        <Link to={sectionPath(section)}>← {section.title}</Link>
      </p>
    </article>
  );
}
