import { Link, useLocation } from 'react-router';
import { Beats } from '~/components/Beats';
import { findCase, sectionPath } from '~/content';
import { metaForPath } from '~/meta';
import type { Route } from './+types/case';

export const meta: Route.MetaFunction = ({ location }) => metaForPath(location.pathname);

export default function CasePage() {
  const found = findCase(useLocation().pathname.split('/')[2]);
  if (!found) return null;
  const { section, item } = found;
  return (
    <article>
      <p className="eyebrow">{item.category}</p>
      <h1>{item.title}</h1>
      <p className="lede">{item.takeaway}</p>
      <Beats beats={item.beats} />
      <p>
        <Link to={sectionPath(section)}>← {section.title}</Link>
      </p>
    </article>
  );
}
