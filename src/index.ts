import { Icosphere_vertices, Icosphere_indices } from "./geometry/sphere";
import Helix from "./lib/Helix";
import Anime from "animejs";
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

let sphere2 = Helix.Mesh(Icosphere_vertices, Icosphere_indices, {
    color: Helix.Color("FFFFFF"),
    wireframe: true
});

let sphere3 = Helix.Mesh(Icosphere_vertices, Icosphere_indices, {
    color: Helix.Color("FFFFFF"),
    wireframe: true
});

sphere2.position.x = -5;
sphere3.position.x = 5;

const geometryHelper = Helix.GeometryHelper();

function modifyGeometry(geometry: Mesh, average: number | undefined) {
    const newGeometry = [];
    const decomposedGeometry = geometryHelper.getGeometryPoints(
        Icosphere_vertices
    );

    if (average && average !== 0) {
        // 1 + (average / 10) * Noise.perlin3(p.x, p.y, p.z)
        const displacement = 1 + average / 200;
        for (var i = 0; i < decomposedGeometry.length; i++) {
            let p = decomposedGeometry[i];
            const geometryTransform = geometryHelper.multiplyScalar(
                decomposedGeometry[i],
                displacement
            );
            newGeometry.push(
                geometryTransform.x,
                geometryTransform.y,
                geometryTransform.z
            );
        }
        geometry.geometry = newGeometry;
    } else {
        geometry.geometry = Icosphere_vertices;
    }
}

camera.position.z = 15;
camera.rotate.x = -0.1;
scene.add(sphere);
scene.add(sphere2);
scene.add(sphere3);

let myObject = {
    valueDynamic: 0
};

new Anime<{ valueDynamic: number }>({
    targets: myObject,
    duration: 10000,
    valueDynamic: 12,
    easing: "linear",
    round: 10,
    update: () => console.log(myObject.valueDynamic)
});
console.log(myObject.valueDynamic);
function draw() {
    const musicAverage = music.getTonality(10);
    const musicAverage3 = music.getTonality(20);
    const musicAverage2 = music.getTonality(1);
    camera.rotate.y += 0.02;
    camera.rotate.x += 0.02;
    const average = musicAverage ? musicAverage : undefined;
    modifyGeometry(sphere, average);
    modifyGeometry(sphere2, musicAverage2);
    modifyGeometry(sphere3, musicAverage3);
    sphere.rotate.y += 0.01;
    sphere.rotate.x += 0.01;
    render.render(camera, scene);
    requestAnimationFrame(draw);
}

draw();
