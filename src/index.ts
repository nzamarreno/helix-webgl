import { Icosphere_vertices, Icosphere_indices } from "./geometry/sphere";
import Helix from "./lib/Helix";
import { Noise } from "./lib/helpers/perlin";
import { Mesh } from "./lib/geometry/Mesh";

const renderOptions = {
    background: Helix.Color("#000000")
};

const render = Helix.Render(renderOptions);
const scene = Helix.Scene();
const camera = Helix.Camera();
const music = Helix.Audio("./assets/music.mp3");
music.helper = true;

let sphere = Helix.Mesh(Icosphere_vertices, Icosphere_indices, {
    color: Helix.Color("FFFFFF"),
    wireframe: true
});

const geometryHelper = Helix.GeometryHelper();


function modifyGeometry(geometry: Mesh, average: number | undefined) {
    const newGeometry = [];
    const decomposedGeometry = geometryHelper.getGeometryPoints(Icosphere_vertices);

    if (average && average !== 0) {
        for (var i = 0; i < decomposedGeometry.length; i++) {
            let p = decomposedGeometry[i];
            const geometryTransform = geometryHelper.multiplyScalar(decomposedGeometry[i], 1 + (average / 10) * Noise.perlin3(p.x, p.y, p.z));
            newGeometry.push(geometryTransform.x, geometryTransform.y, geometryTransform.z);
        }
        geometry.geometry = newGeometry;
    }
    else {
        geometry.geometry = Icosphere_vertices;
    }

}

camera.position.z = 5;
camera.rotate.x = -0.1;
scene.add(sphere);


function draw() {
    const musicAverage = music.getTonality(21);
    const average = musicAverage ? musicAverage : undefined
    modifyGeometry(sphere, average);
    sphere.rotate.y += .01;
    sphere.rotate.x += .01;
    render.render(camera, scene);
    requestAnimationFrame(draw);
}

draw();
