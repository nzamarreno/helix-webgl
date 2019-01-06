import { Mesh } from "./lib/geometry/Mesh";
import { Sphere, Sphere_indices } from "./geometry/sphere";
import Helix from "./lib/Helix";

const renderOptions = {
    background: Helix.Color("#0747A6")
};

const render = Helix.Render(renderOptions);
const scene = Helix.Scene();
const camera = Helix.Camera();

function renderSphere(numberOfSphere: number): Mesh[] {
    const position = [-5, 0, 5];
    const geometryScene = [];

    for (let i = 0; i < numberOfSphere; i++) {
        const sphere = Helix.Mesh(Sphere, Sphere_indices, {
            color: Helix.Color("FFFFFF"),
            wireframe: false
        });

        sphere.position.x = position[i];

        scene.add(sphere);

        geometryScene.push(sphere);
    }

    return geometryScene;
}

camera.position.z = 10;
const myScene = renderSphere(3);

function draw() {
    myScene[0].rotate.x += 0.01;
    myScene[1].rotate.y += 0.01;
    myScene[2].rotate.x += 0.01;

    render.render(camera, scene);
    requestAnimationFrame(draw);
}

draw();
