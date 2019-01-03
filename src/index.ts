import { NZXT } from './render/NZXT';
import { Sphere, Sphere_indices } from './geometry/sphere';

const render = NZXT.Render();
const scene = NZXT.Scene();
const camera = NZXT.Camera();
const mesh = NZXT.Mesh(Sphere);

scene.add(mesh);

function draw() {
    render.render(camera, scene);
    requestAnimationFrame(draw);
}

draw();
