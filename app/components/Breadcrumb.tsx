import { Link } from 'react-router';

/** The path from the cockpit to the current page. The last item is the page itself. */
export function Breadcrumb({ trail }: { trail: [label: string, to?: string][] }) {
  return (
    <nav className="course-breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">← Cockpit</Link>
        </li>
        {trail.map(([label, to]) => (
          <li key={label}>{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}
