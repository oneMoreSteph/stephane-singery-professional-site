import { Link, useLocation } from 'react-router';
import { aboutPath, casePath, findSection, plain } from '~/content';
import { LEVERS } from '~/sections/levers';
import { metaForPath } from '~/meta';
import type { Route } from './+types/section';

export const meta: Route.MetaFunction = ({ location }) => metaForPath(location.pathname);

export default function SectionPage() {
  const section = findSection(useLocation().pathname.split('/')[1]);
  if (!section?.stop) return null;
  return (
    <>
      <p className="eyebrow">{section.stop.eyebrow}</p>
      <h1>{plain(section.stop.titleHtml)}</h1>
      <p className="lede">{section.stop.intro}</p>
      <ul className="text-list">
        {section.cases.map((c) => (
          <li key={c.slug}>
            <Link to={casePath(section, c)}>{c.title}</Link>
            <small>{c.tag}</small>
            <p>{c.summary}</p>
            {c.value && (
              <p className="value-tags">
                <small className="value-tags-k">Brought ·</small>
                {c.value.levers.map((l) => (
                  <span key={l} title={`${l}: ${LEVERS[l]}`}>
                    {l}
                  </span>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
      <p>
        <Link to={aboutPath(section)}>{section.stop.about.title}</Link>
      </p>
    </>
  );
}
