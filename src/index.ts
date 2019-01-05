import Helix from './render/Helix';
import { Sphere, Sphere_indices } from './geometry/sphere';

const renderOptions = {
    color: Helix.Color("#0747A6")
}

const render = Helix.Render(renderOptions);
const scene = Helix.Scene();
const camera = Helix.Camera();
const mesh = Helix.Mesh(Sphere, Sphere_indices);

scene.add(mesh);

function draw() {
    render.render(camera, scene);
    requestAnimationFrame(draw);
}

draw();
