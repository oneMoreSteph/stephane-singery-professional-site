import { defineConfig } from '@playwright/test';

// End-to-end and accessibility checks against the built site, served the way GitHub Pages serves it.
// Run `npm run build` first; `npm test` then starts the local server on port 8903.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  // Each journey page renders 3D in software when headless: a few at a time keeps them responsive.
  workers: process.env.CI ? 2 : 4,
  timeout: 60_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:8903',
    // Installed Google Chrome (also present on GitHub's Ubuntu runners); WebGL through SwiftShader when headless.
    channel: 'chrome',
    launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] },
    viewport: { width: 1440, height: 900 },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve.mjs 8903',
    url: 'http://127.0.0.1:8903/',
    reuseExistingServer: !process.env.CI,
  },
});
