# Portfolio maps

Country outlines: Natural Earth 1:50m Admin 0 Countries, public domain.
https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson

Paris arrondissement boundaries: Ville de Paris, Paris Data, ODbL.
https://opendata.paris.fr/explore/dataset/arrondissements/
Retrieved 31 October 2026. Simplified and projected into local SVG coordinates by scripts/build-portfolio-geography.py.

French national rail network in the SNCF Réseau case: SNCF Réseau, "Fichier de formes des lignes du Réseau Ferré National", Open Database License (ODbL) 1.0.
https://ressources.data.sncf.com/explore/dataset/formes-des-lignes-du-rfn/
Dataset last modified 24 March 2022, retrieved 6 November 2026. Only the lines in operation ("Exploitée") are kept: 766 sections. Projected and simplified by scripts/build-rfn-network.py into app/drawings/data/rfn.ts. That derived file is made available under the ODbL 1.0: https://opendatacommons.org/licenses/odbl/1-0/

Train routes drawn over this network are schematic connections between city locations, not a track survey. In the other rail scenes, rail links are schematic in the same way. The Lille–Marseille example and the Swiss/Italian links illustrate coordination, not an assertion about a particular historical train. Paris hubs and delivery rounds illustrate operating roles, not verified historical street addresses. The Tour de France scene is an illustrative crossing, not a specific edition's route.

EU map in "Why Europe": Natural Earth 1:50m Admin 0 Countries, public domain, retrieved 5 November 2026. Built by scripts/build-eu-geography.py. Overseas territories are left out; country boundaries are shown as published by Natural Earth.
