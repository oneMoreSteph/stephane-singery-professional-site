import type { MetaDescriptor } from 'react-router';
import { ABOUT_SLUG, findCase, findSection } from './content';
import { site } from './site';

const HOME_TITLE = `${site.name} | ${site.role} | Portfolio`;

function tags(title: string, description: string, path: string): MetaDescriptor[] {
  const list: MetaDescriptor[] = [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: site.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:locale', content: 'en_GB' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
  if (site.url) {
    // GitHub Pages serves each page from a folder, at its address with a trailing slash.
    const url = `${site.url}${path.replace(/\/?$/, '/')}`;
    list.push(
      { tagName: 'link', rel: 'canonical', href: url },
      { property: 'og:url', content: url },
      { property: 'og:image', content: `${site.url}/assets/social-preview.jpg` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
    );
  }
  return list;
}

/** Title, description and link-preview tags for any address of the site. */
export function metaForPath(pathname: string): MetaDescriptor[] {
  const [slug, sub] = pathname.split('/').filter(Boolean);
  const named = (t: string) => `${t} | ${site.name}`;
  if (!slug) return tags(HOME_TITLE, site.description, '/');
  if (slug === 'map' && !sub) return tags(named('Experience map'), site.description, '/map');
  const section = findSection(slug);
  if (!section) return tags(named('Page not found'), site.description, pathname);
  if (!sub) return tags(named(section.title), section.description, pathname);
  if (sub === ABOUT_SLUG && section.stop)
    return tags(named(section.stop.about.title), section.description, pathname);
  const found = findCase(sub);
  if (!found) return tags(named('Page not found'), site.description, pathname);
  return tags(named(`${found.item.title} · ${section.title}`), found.item.takeaway, pathname);
}
