// Site-wide identity and contact details.
export const site = {
  name: 'Stéphane Singery',
  role: 'Data & Analytics Engineer',
  /** Full public address, without a trailing slash. Set at publication; enables canonical and preview-image tags. */
  url: '' as string,
  description:
    'I bring live-operations judgment into Data Platforms and observability. Explore my work and my ambition to contribute to Europe’s technological sovereignty.',
  cv: '/assets/cv.pdf',
  contact: {
    email: 'stephane.sing@gmail.com',
    linkedin: 'https://www.linkedin.com/in/stephane-singery/',
    github: 'https://github.com/oneMoreSteph',
  },
} as const;
