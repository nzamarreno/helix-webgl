import { Audio } from "./lib/audio/Audio";
import { Mesh } from "./lib/geometry/Mesh";
import { Sphere, Sphere_indices } from "./geometry/sphere";
import Helix from "./lib/Helix";

const renderOptions = {
    background: Helix.Color("#0747A6")
};

const render = Helix.Render(renderOptions);
const scene = Helix.Scene();
const camera = Helix.Camera();
const music = Helix.Audio("./assets/music.mp3");
music.helper = true;

function renderSphere(numberOfSphere: number): Mesh[] {
    const position = [-5, 0, 5];
    const geometryScene = [];

    for (let i = 0; i < numberOfSphere; i++) {
        const sphere = Helix.Mesh(Sphere, Sphere_indices, {
            color: Helix.Color("FFFFFF"),
            wireframe: true
        });

        sphere.position.x = position[i];

        scene.add(sphere);

        geometryScene.push(sphere);
    }

    return geometryScene;
}

const floor = Helix.FloorGeometryHelper();
camera.position.z = 10;
camera.rotate.x = -0.1;

scene.add(floor);
function draw() {
    render.render(camera, scene);
    requestAnimationFrame(draw);
}

draw();
