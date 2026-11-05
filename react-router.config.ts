import type { Config } from '@react-router/dev/config';

export default {
  // A static site: every address is rendered to HTML at build time, no server at runtime.
  ssr: false,
  prerender: true,
} satisfies Config;
