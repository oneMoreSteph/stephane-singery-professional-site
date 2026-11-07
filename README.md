# 🚀 Stéphane Singery — portfolio

**From live rail operations to Data Platforms and observability, and on to European space.**

My professional portfolio, built as a journey: you sit in a cockpit, pick a destination, and each stop tells one part of my path.

📧 [stephane.sing@gmail.com](mailto:stephane.sing@gmail.com) · 💼 [LinkedIn](https://www.linkedin.com/in/stephane-singery/) · 🐙 [GitHub](https://github.com/oneMoreSteph) · 📄 [CV](public/assets/cv.pdf)

---

## 🧭 What you will find

The site opens on a **cockpit**. From there, a 3D map leads to five stops, each with its own spacecraft and its case studies.

| Stop                             | Spacecraft     | What it covers                                                                                               |
| -------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| 🌍 **Professional experience**   | Earth          | Seven roles since 2010 on one timeline: rail operations at SNCF, then Data at FoodChéri, Heetch and Verisure |
| 🛰️ **High-stakes case studies**  | ISS / Columbus | Four situations where a decision had consequences                                                            |
| 🌊 **What makes the difference** | Sentinel-6     | Three habits: find a way, the need behind the need, build for production                                     |
| 🎓 **Education and development** | Galileo        | Logistics and transport, self-taught Data then a certified programme, an engineering degree at EFREI         |
| 🪐 **Why European space**        | Juice          | The next step, and how this experience transfers to it                                                       |

Three pages sit next to the journey:

| Page               | What it holds                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 🛠️ **How I build** | Sources, ELT and ETL, Data warehouses, BI and analytics, Data quality, observability, cloud: each skill linked to the work that shows it |
| 📚 **Courses**     | Engineering courses at EFREI: each course, its teacher, and the projects built for it                                                    |
| ✉️ **Contact**     | Email, LinkedIn, GitHub and CV                                                                                                           |

### 🚕 Featured project: NYC Taxi

> _One day, different journeys._ An interactive reading of 97,986 New York taxi trips, built for the **Data Visualisation & BI** course at EFREI.

- 🗺️ Nine steps on the site: data quality, clock and sample, distances, hours, map, travel time, weight, trip by trip, synthesis.
- 📓 An executed Jupyter notebook, with every figure explained.
- 🔁 Fully reproducible: raw data, pipeline, checks.

👉 Read the project: [`projects/nyc-taxi/`](projects/nyc-taxi/README.md)

---

## ⚡ Quick start

You need **Node.js 22 or later**.

```bash
npm install
```

```bash
npm run dev
```

Open the address printed in the terminal. Pages reload as you edit.

To see the site exactly as it will be published:

```bash
npm run build && npm run preview
```

Then open <http://127.0.0.1:8901>.

---

## 🧰 Tools

| Tool       | Version                           | Used for                        |
| ---------- | --------------------------------- | ------------------------------- |
| 🟢 Node.js | 22 or later (developed with 25.6) | Everything                      |
| 📦 npm     | 10 or later                       | Packages and scripts            |
| 🌐 Chrome  | Any recent version                | Tests and screenshot comparison |
| ☕ Java    | 11 or later                       | W3C HTML validation             |
| 🐍 Python  | 3.11 or later                     | The NYC Taxi analysis only      |

---

## 📋 Commands

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm install`     | Installs the packages, once                                         |
| `npm run dev`     | Development server with live reload                                 |
| `npm run build`   | Builds the production site into `build/client`                      |
| `npm run preview` | Serves `build/client` like GitHub Pages, at <http://127.0.0.1:8901> |
| `npm run check`   | Types, lint and formatting                                          |
| `npm run images`  | Rebuilds the web images from `assets-src/`                          |
| `npm run verify`  | Runs every quality gate below, in order                             |

---

## ✅ Quality gates

GitHub Actions runs them on every push and pull request ([`quality.yml`](.github/workflows/quality.yml)). Run them all locally with `npm run verify`.

| Gate             | Command                 | What it checks                                                                                                                                                       |
| ---------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🧹 Code          | `npm run check`         | Types, lint and formatting                                                                                                                                           |
| 🏷️ HTML          | `npm run validate:html` | Every built page against the W3C Nu HTML Checker, offline                                                                                                            |
| 🧪 Behaviour     | `npm test`              | Playwright: titles, texts and addresses of every page; journey and case windows; old addresses; contact; NYC Taxi and Courses; pages without JavaScript; phone width |
| ♿ Accessibility | `npm test`              | axe, WCAG 2.2 AA, on every kind of page and every case window                                                                                                        |
| 🏎️ Lighthouse    | `npm run lighthouse`    | Accessibility, best practices and SEO at 95 or more; performance at 85 or more on the cockpit and contact pages (desktop)                                            |

> 💡 `npm test` and `npm run lighthouse` read the built site: run `npm run build` first.

The site is static: every page is rendered to HTML at build time. It needs no server, reads without JavaScript and runs on any static host, such as GitHub Pages. The sitemap is written once `site.url` is set in [`app/site.ts`](app/site.ts); `robots.txt` is always written.

---

## 🗂️ Project structure

<details>
<summary><b>Open the folder map</b></summary>

| Path                     | What it holds                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `app/sections/`          | ⭐ **The content.** One folder per section; `index.ts` lists them in order              |
| `app/sections/courses/`  | Courses, their teachers and projects (`catalogue.ts`), and the NYC Taxi pages           |
| `app/sections/*/scenes/` | One drawing per file, picked up by its file name                                        |
| `app/sections/types.ts`  | The content model: section, stop, case                                                  |
| `app/content.ts`         | Everything derived from the section list: addresses, numbering, lookups                 |
| `app/routes.ts`          | Pages, generated from the section list                                                  |
| `app/routes/`            | Page components: home, section, case, "why this destination", 404                       |
| `app/journey/`           | The cockpit, its live screens and UTC clock, and the 3D map markup                      |
| `app/legacy/`            | The 3D journey script and its styles, from the previous version                         |
| `app/cases/`             | The case window: steps, story, highlight tour, "what it is / why it matters" panel      |
| `app/drawings/`          | What every drawing is built from: Layer, Inspectable, shared parts, maps, click texts   |
| `app/career/`            | Career timeline, study orbits, their wide views and figure drawings                     |
| `app/components/`        | Shared parts: navigation, path back to the cockpit, footer, contact links               |
| `app/styles/`            | Design tokens and page styles                                                           |
| `app/site.ts`            | Name, role, contact details, public address                                             |
| `projects/nyc-taxi/`     | The NYC Taxi analysis: raw data, pipeline, notebook, checks                             |
| `public/`                | Images (WebP), 3D model, CV, favicons. Credits in the `README.md` files under `assets/` |
| `assets-src/`            | Original images, used by `npm run images`                                               |
| `scripts/`               | Image building, 404 page, local server, HTML validation, Lighthouse, map builders       |
| `tests/e2e/`             | Playwright tests                                                                        |
| `tests/`                 | Screenshot capture and comparison                                                       |

</details>

---

## ✍️ How to…

<details>
<summary>➕ <b>Add a section</b></summary>

1. Create `app/sections/<slug>/index.ts` exporting a `Section` (see `types.ts`), with its cases in `cases/`.
2. Add it to the list in `app/sections/index.ts`.

Its pages, title, navigation entry and, for a journey stop, its map position and buttons follow from the list. A page-only section (`kind: 'page'`) also provides `page.tsx` in its folder, like `contact/`.

</details>

<details>
<summary>🎨 <b>Add or change a drawing</b></summary>

A case's `drawing.scene` names a file in its section's `scenes/` folder. A drawing returns SVG built from `app/drawings`:

- `<Layer steps={[…]}>` for what a step shows;
- `<Inspectable id title>` for what the highlight tour visits and visitors can click.

Click texts live in `app/drawings/data/concepts.ts`.

</details>

<details>
<summary>📚 <b>Add a course or a project</b></summary>

1. Add the course, its teacher and its projects to `app/sections/courses/catalogue.ts`.
2. For a project page, add its route in `app/routes.ts`, like `courses/nyc-taxi`.

The Courses page lists each course with its teacher. Its projects sit underneath, collapsed until a visitor opens them.

</details>

<details>
<summary>🖼️ <b>Add a portrait</b></summary>

Every portrait uses the same framing in its round frame: the whole hair at the top, the chin at about 86% of the height, the face centred.

1. Put the original photo in `assets-src/`.
2. Add one `portrait()` line in `scripts/optimize-images.mjs`, with the square to keep.
3. Run `npm run images`.

</details>

<details>
<summary>👀 <b>Check visual changes</b></summary>

```bash
npm run build && npm run preview                                   # in one terminal
node tests/capture.mjs http://127.0.0.1:8901 tests/__screens__/after new
node tests/compare.mjs tests/__screens__/before tests/__screens__/after tests/__screens__/diff
```

The capture covers the cockpit, the map, every chapter, both wide views and every step of every case.

</details>

---

## 📝 Commits

[Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `perf:`, `docs:`, `chore:`.

## 🙏 Credits

🛰️ Spacecraft images and the Galileo 3D model: ESA and NASA. 🗺️ Country outlines: Natural Earth, public domain. Each source and licence is listed in the `README.md` files under [`public/assets/`](public/assets/).
