import { Sphere, Sphere_indices } from "./geometry/sphere";
import Helix from "./lib/Helix";

const renderOptions = {
    background: Helix.Color("#0747A6")
};

const render = Helix.Render(renderOptions);
const scene = Helix.Scene();
const camera = Helix.Camera();
const mesh = Helix.Mesh(Sphere, Sphere_indices, {
    color: Helix.Color("#FFFFFF"),
    wireframe: false
});

scene.add(mesh);

function draw() {
    render.render(camera, scene);
    requestAnimationFrame(draw);
}

draw();
