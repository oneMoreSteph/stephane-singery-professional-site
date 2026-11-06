"""Build the EU-27 map used by "Why Europe" from Natural Earth 1:50m countries.
Usage: python3 scripts/build-eu-geography.py path/to/ne_50m_admin_0_countries.geojson
Coordinates are written in the scene's SVG units (same projection as euPoint in the output).
"""
import json, sys
from pathlib import Path

EU = {'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'}
CONTEXT = {'United Kingdom', 'Norway', 'Iceland', 'Switzerland', 'Liechtenstein', 'Albania', 'Bosnia and Herzegovina', 'Kosovo', 'Montenegro', 'North Macedonia', 'Republic of Serbia', 'Moldova', 'Ukraine', 'Belarus', 'Russia', 'Turkey', 'Northern Cyprus', 'Morocco', 'Algeria', 'Tunisia', 'Libya', 'Syria', 'Lebanon'}
LON, LAT = (-12, 37), (33.5, 71.5)
X0, Y0, KX, KY = 50, 130, 9.18, 14.8
inside = lambda x, y: LON[0] < x < LON[1] and LAT[0] < y < LAT[1]
project = lambda x, y: (X0 + (x + 11) * KX, Y0 + (71 - y) * KY)

def ring_path(ring):
    pts, last = [], None
    for x, y, *_ in ring:
        p = project(min(max(x, LON[0]), LON[1]), min(max(y, LAT[0]), LAT[1]))
        p = (round(p[0], 1), round(p[1], 1))
        if p != last:
            pts.append(p)
            last = p
    return 'M' + 'L'.join(f'{a},{b}' for a, b in pts) + 'Z' if len(pts) > 2 else ''

members, context = [], []
for f in json.load(open(sys.argv[1]))['features']:
    name = f['properties']['ADMIN']
    if name not in EU | CONTEXT:
        continue
    g = f['geometry']
    polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
    # Drops overseas territories and Svalbard: only what sits in the frame is kept.
    polys = [p for p in polys if any(inside(x, y) for x, y, *_ in p[0])]
    d = ' '.join(filter(None, (ring_path(r) for p in polys for r in p[:1])))
    (members if name in EU else context).append({'name': name, 'd': d})
assert len(members) == 27, len(members)
Path('app/drawings/data/geography-eu.ts').write_text(
    '// Boundary geometry only. Attribution in assets/geography/README.md.\n'
    f'export const euMembers = {json.dumps(sorted(members, key=lambda c: c["name"]), ensure_ascii=False, separators=(",", ":"))};\n'
    f'export const euContext = {json.dumps(sorted(context, key=lambda c: c["name"]), ensure_ascii=False, separators=(",", ":"))};\n'
    f'export const euPoint = (lon: number, lat: number): [number, number] => [{X0} + (lon + 11) * {KX}, {Y0} + (71 - lat) * {KY}];\n')
print(len(members), len(context))
