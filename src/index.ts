import { Icosphere_vertices, Icosphere_indices } from "./geometry/sphere";
import Helix from "./lib/Helix";

const renderOptions = {
    background: Helix.Color("#000000")
};

const render = Helix.Render(renderOptions);
const scene = Helix.Scene();
const camera = Helix.Camera();

let sphere = Helix.Mesh(Icosphere_vertices, Icosphere_indices, {
    color: Helix.Color("FFFFFF"),
    wireframe: true
});

const floorGeometry = Helix.FloorGeometryHelper({ dimensions: 10, lines: 80 });

camera.position.z = 15;

// scene.add(floorGeometry);
scene.add(floorGeometry);
scene.add(sphere);

function draw() {
    camera.rotate.y += 0.001;
    camera.rotate.x += 0.001;

    render.render(camera, scene);

    requestAnimationFrame(draw);
}

draw();
