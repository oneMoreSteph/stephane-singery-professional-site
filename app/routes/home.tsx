import { Link } from 'react-router';
import { sectionPath } from '~/content';
import { metaForPath } from '~/meta';
import { sections } from '~/sections';
import { site } from '~/site';
import type { Route } from './+types/home';

export const meta: Route.MetaFunction = ({ location }) => metaForPath(location.pathname);

export default function Home() {
  return (
    <>
      <h1>{site.name}</h1>
      <p className="lede">
        {site.role}. From live rail operations to Data Platforms and observability: I design for production and
        think for operations. My next step: contributing to Europe’s technological sovereignty.
      </p>
      <ul className="text-list">
        {sections.map((s) => (
          <li key={s.slug}>
            <Link to={sectionPath(s)}>{s.title}</Link>
            <p>{s.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
