import { Link } from 'react-router';
import { SiteFooter } from '~/components/SiteFooter';
import { SiteNav } from '~/components/SiteNav';
import { casePath, findCase } from '~/content';
import { metaForPath } from '~/meta';
import type { Route } from './+types/page';
import { chain, groups, proofLabel } from './stack';

export const meta: Route.MetaFunction = ({ location }) => metaForPath(location.pathname);

/** An id-safe version of a group title: lower case, words joined by hyphens. */
const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** A link to the case that shows a skill. */
function Proof({ slug }: { slug: string }) {
  const found = findCase(slug);
  if (!found) return null;
  return (
    <Link className="stack-proof" to={casePath(found.section, found.item)}>
      {proofLabel[slug] ?? found.item.title} ↗
    </Link>
  );
}

export default function HowIBuildPage() {
  return (
    <div className="page">
      <SiteNav />
      <main className="page__main page__main--wide">
        <p className="eyebrow">ENGINEERING</p>
        <h1>How I build.</h1>
        <p className="lede">
          The skills and tools behind my Data work, each linked to the case that shows it.
        </p>
        <p className="stack-chain">
          {chain.map((c, i) => (
            <span key={c} className="stack-chain__part">
              {i > 0 && (
                <span className="stack-chain__arrow" aria-hidden="true">
                  →
                </span>
              )}
              <span className="stack-chain__chip">{c}</span>
            </span>
          ))}
        </p>
        <p className="stack-types">Structured, semi-structured and unstructured Data.</p>
        <div className="stack-grid">
          {groups.map((g) => (
            <section key={g.title} className="stack-card" aria-labelledby={`g-${slug(g.title)}`}>
              <h2 id={`g-${slug(g.title)}`}>{g.title}</h2>
              <ul>
                {g.items.map((it) => (
                  <li key={it.name}>
                    <strong>{it.name}</strong>
                    <span>{it.what}</span>
                    <span className="stack-proofs">
                      {it.cases.map((c) => (
                        <Proof key={c} slug={c} />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
