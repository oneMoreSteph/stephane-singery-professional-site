# Stéphane Singery — portfolio

My professional portfolio: from live rail operations to Data Platforms and observability, and my goal of contributing to European space.

A static website: HTML, CSS and JavaScript, with Three.js for the 3D. No backend.

## Run it locally

Requirements: Python 3 (any recent version), to serve the files.

```bash
python3 -m http.server 8901 --bind 127.0.0.1 --directory web
```

Then open http://127.0.0.1:8901/. A server is needed because browsers block JavaScript modules on a file opened directly.

## Structure

| Path | Content |
|---|---|
| `web/` | The site. `web/index.html` redirects to `web/mission-journey.html` |
| `web/assets/` | Images, 3D model, CV. Credits are in the `README.md` files under it |
| `web/vendor/three/` | Three.js |
| `scripts/` | Cache version script and map builders |

## After editing

```bash
python3 scripts/bump-version.py
```

This gives the files a new version, so browsers fetch them instead of cached copies.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `perf:`, `docs:`, `chore:`.
