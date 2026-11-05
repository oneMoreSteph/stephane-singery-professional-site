import { site } from '~/site';

const links = [
  { label: 'Email', href: `mailto:${site.contact.email}`, text: site.contact.email },
  { label: 'LinkedIn', href: site.contact.linkedin, text: 'linkedin.com/in/stephane-singery' },
  { label: 'GitHub', href: site.contact.github, text: 'github.com/oneMoreSteph' },
  { label: 'CV', href: site.cv, text: 'CV (PDF)' },
];

/** Email, LinkedIn, GitHub and CV, as a list of links. */
export function ContactLinks({
  className = 'contact-links',
  withText = false,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <ul className={className}>
      {links.map((l) => {
        const external = !l.href.startsWith('mailto:');
        return (
          <li key={l.label}>
            <a href={l.href} {...(external && { target: '_blank', rel: 'noopener' })}>
              <span className="contact-links__label">{l.label}</span>
              {withText && <span className="contact-links__text">{l.text}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
