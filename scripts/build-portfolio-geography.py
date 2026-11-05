"""Build compact, local SVG geography from public boundary datasets.
Inputs: Natural Earth 1:50m countries; Paris Data arrondissements (see asset README).
"""
import json
from pathlib import Path

def path(coords, project, stride=1):
    return ' '.join('M'+'L'.join(','.join(f'{v:.1f}' for v in project(*pt[:2])) for pt in ring[::stride])+ 'Z' for ring in coords)

countries=json.load(open('/private/tmp/portfolio-countries.geojson'))
features=[]
for f in countries['features']:
    name=f['properties']['ADMIN']
    if name not in ['France','Switzerland','Italy','Belgium','Germany','Spain','Luxembourg','Netherlands','United Kingdom','Austria']: continue
    polys=f['geometry']['coordinates'] if f['geometry']['type']=='MultiPolygon' else [f['geometry']['coordinates']]
    polys=[p for p in polys if any(-8<x<20 and 39<y<54 for x,y,*_ in p[0])]
    d=' '.join(path(p,lambda x,y:((x+6)*44+30,(52.5-y)*51+15)) for p in polys)
    features.append({'name':name,'d':d})
paris=json.load(open('/private/tmp/portfolio-paris.geojson'))
arr=[]
proj=lambda x,y:((x-2.22)*3400+45,(48.912-y)*5100+75)
for f in sorted(paris['features'],key=lambda x:x['properties']['c_ar']):
    p=f['properties']; g=f['geometry']; polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
    xy=proj(p['geom_x_y']['lon'],p['geom_x_y']['lat'])
    arr.append({'number':p['c_ar'],'d':' '.join(path(poly,proj,2) for poly in polys),'center':xy})
Path('web/mission-geography.js').write_text('// Boundary geometry only. Attribution in assets/geography/README.md.\nexport const countries = '+json.dumps(features,separators=(',',':'))+';\nexport const arrondissements = '+json.dumps(arr,separators=(',',':'))+';\n')
