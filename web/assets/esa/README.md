# ESA spacecraft assets in the portfolio

- `galileo/galileo.obj`, `galileo/galileo-foil.obj` and textures come from the [ESA GNSS Science Support Centre's Galileo 3D download](https://gssc.esa.int/education/galileo3d/), `Galileo_3D.zip`. The map uses this geometry with its colour, normal and roughness textures.
- `galileo/galileo-in-orbit.jpg` is [ESA's Galileo satellite in orbit](https://www.esa.int/ESA_Multimedia/Images/2014/07/Galileo_satellite_in_orbit), credit ESA / P. Carril, under the ESA Standard Licence. It appears in the education close view.
- `juice/juice-deployed.jpg` is a still from [ESA's Juice comes to life](https://www.esa.int/ESA_Multimedia/Images/2023/01/Juice_comes_to_life_artist_s_impression), credit ESA / ATG Medialab, under the ESA Standard Licence. It appears in the European space close view.
- The earlier `juice/*.obj` and `juice/juice_alb2.png`, now in `archive/web/assets/esa/juice/`, came from the [ESA Juice Science Operations Centre's spacecraft model](https://juicesoc.esac.esa.int/help/82_spacecraft_model.html) and its [SPICE model archive](https://spiftp.esac.esa.int/data/SPICE/JUICE/misc/models/). They are retained as source material but are not loaded in the current map.
- The JS OBJ loader is the matching Three.js r186 `OBJLoader.js`, from the [Three.js repository](https://github.com/mrdoob/three.js/tree/r186/examples/jsm/loaders), covered by the vendor's MIT licence in `web/vendor/three/LICENSE`.

The map is a portfolio navigation scene, so distances, orbits and relative on-screen sizes are illustrative. Spacecraft imagery accompanies sections about professional experience, not claims of employment on those missions.
