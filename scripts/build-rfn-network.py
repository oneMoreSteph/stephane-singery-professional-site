"""Build the real French rail network drawn under the SNCF Réseau case.
Input: SNCF Réseau, "Fichier de formes des lignes du Réseau Ferré National" (ODbL), GeoJSON export:
https://ressources.data.sncf.com/explore/dataset/formes-des-lignes-du-rfn/
Usage: python3 scripts/build-rfn-network.py path/to/formes-des-lignes-du-rfn.geojson
Keeps the lines in operation ("Exploitée"), projects them like france.tsx's project(), simplifies them
(Douglas-Peucker, about half a pixel) and writes app/drawings/data/rfn.ts.
"""
import json, sys
from pathlib import Path

TOLERANCE = 0.5  # SVG units
project = lambda lon, lat: (((lon + 6) * 44 + 30 - 365) * 0.795 + 365, (52.5 - lat) * 51 + 15)

def simplify(pts, tol):
    if len(pts) < 3:
        return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1
    norm = (dx * dx + dy * dy) ** 0.5
    best, index = -1.0, 0
    for i in range(1, len(pts) - 1):
        px, py = pts[i]
        d = abs(dy * px - dx * py + x2 * y1 - y2 * x1) / norm if norm else ((px - x1) ** 2 + (py - y1) ** 2) ** 0.5
        if d > best:
            best, index = d, i
    if best <= tol:
        return [pts[0], pts[-1]]
    return simplify(pts[: index + 1], tol)[:-1] + simplify(pts[index:], tol)

sys.setrecursionlimit(10000)
features = json.load(open(sys.argv[1]))['features']
parts, sections = [], 0
for f in sorted(features, key=lambda f: (f['properties']['code_ligne'], f['properties']['rg_troncon'])):
    if f['properties']['mnemo'] != 'EXPLOITE' or not f['geometry']:
        continue
    pts = simplify([project(lon, lat) for lon, lat, *_ in f['geometry']['coordinates']], TOLERANCE)
    out, last = [], None
    for x, y in pts:
        p = (round(x, 1), round(y, 1))
        if p != last:
            out.append(p)
            last = p
    if len(out) > 1:
        parts.append('M' + 'L'.join(f'{x:g},{y:g}' for x, y in out))
        sections += 1
Path('app/drawings/data/rfn.ts').write_text(
    '// Real lines in operation of the French national rail network (RFN). Source and ODbL notice in assets/geography/README.md.\n'
    f'export const rfnSections = {sections};\n'
    'export const rfnNetwork = ' + json.dumps(''.join(parts)) + ';\n'
)
print(sections, 'sections')
