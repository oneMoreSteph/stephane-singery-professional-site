# Stéphane Singery — portfolio

My professional portfolio: from live rail operations to Data Platforms and observability, and my goal of
contributing to European space.

A static website built with React, React Router and TypeScript. Every page is rendered to HTML at build time,
so it needs no server, reads without JavaScript and works on any static host such as GitHub Pages.

## Tools

| Tool    | Version used                                      |
| ------- | ------------------------------------------------- |
| Node.js | 22 or later (developed with 25.6)                 |
| npm     | 10 or later                                       |
| Chrome  | Any recent version, for the screenshot comparison |

## Commands

```bash
npm install          # once
npm run dev          # development server with live reload
npm run build        # production site in build/client
npm run preview      # serves build/client like GitHub Pages, at http://127.0.0.1:8901
npm run check        # types, lint and formatting
npm run images       # rebuilds the web images from assets-src/
```

## Structure

| Path                     | Content                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `app/sections/`          | **The content.** One folder per section; `index.ts` lists them in order                 |
| `app/sections/types.ts`  | The content model: section, stop, case                                                  |
| `app/content.ts`         | Everything derived from the section list: addresses, numbering, lookups                 |
| `app/routes.ts`          | Pages, generated from the section list                                                  |
| `app/routes/`            | Page components: home, section, case, "why this destination", 404                       |
| `app/journey/`           | The cockpit and 3D map markup, and the island that starts the journey                   |
| `app/legacy/`            | The 3D journey script and its styles, from the previous version                         |
| `app/cases/`             | The case window: steps, story, highlight tour, "what it is / why it matters" panel      |
| `app/drawings/`          | What every drawing is built from: Layer, Inspectable, shared parts, maps, click texts   |
| `app/sections/*/scenes/` | One drawing per file, picked up by its file name                                        |
| `app/career/`            | Career timeline, study orbits, their wide views and figure drawings                     |
| `app/components/`        | Shared parts: navigation, footer, contact links                                         |
| `app/styles/`            | Design tokens and page styles                                                           |
| `app/site.ts`            | Name, role, contact details, public address                                             |
| `public/`                | Images (WebP), 3D model, CV, favicons. Credits in the `README.md` files under `assets/` |
| `assets-src/`            | Original images, used by `npm run images`                                               |
| `scripts/`               | Image optimisation, 404 page, local server, map builders                                |
| `tests/`                 | Screenshot capture and comparison                                                       |

## Add or change a drawing

A case's `drawing.scene` names a file in its section's `scenes/` folder. A drawing returns SVG built from
`app/drawings`: `<Layer steps={[…]}>` for what a step shows, `<Inspectable id title>` for what the highlight
tour visits and visitors can click. Click texts live in `app/drawings/data/concepts.ts`.

## Add a section

1. Create `app/sections/<slug>/index.ts` exporting a `Section` (see `types.ts`), with its cases in `cases/`.
2. Add it to the list in `app/sections/index.ts`.

Its pages, title, navigation entry and, for a journey stop, its map position and buttons follow from the list.
A page-only section (`kind: 'page'`) also provides `page.tsx` in its folder, like `contact/`.

## Check visual changes

```bash
npm run build && npm run preview                                   # in one terminal
node tests/capture.mjs http://127.0.0.1:8901 tests/__screens__/after new
node tests/compare.mjs tests/__screens__/before tests/__screens__/after tests/__screens__/diff
```

The capture covers the cockpit, the map, every chapter, both wide views and every step of every case.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `perf:`, `docs:`, `chore:`.
