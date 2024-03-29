# Helix

_Little Library for help you to create WebGL WebSite_

## Summary

-   [Webpack CLI](#webpack-cli)
-   [Getting Start](#getting-start)
-   [Parameters](#parameters)
-   [Helpers](#helpers)
- [Case Study](#case-study)
-   [Todo](#to-do)

## Webpack CLI

_You have envy to begin now ! Launch this command line and appointment at your [localhost](http://localhost:9000)._

```bash
$ yarn install && yarn run server
```

## Getting Started

### Some implementations

#### Render with basics parameters

```typescript
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
```

## Parameters

_Below, the fundamentales parameters for the elements of the scene_

### Render Constructor

```typescript
const options = {
    backgrond: Helix.Color("FFFFFF"),
    height: 400,
    width: 400
};
const render = new Render(options);
```

#### `options` - _Object_

| Parameter  | Type   | Mandatory |        default value |
| ---------- | ------ | --------- | -------------------: |
| background | string | false     |              #FFFFFF |
| width      | number | false     |  `window.innerWidth` |
| height     | number | false     | `window.innerHeight` |

### Scene Constructor

```typescript
const options = {
    height: 400,
    width: 400,
    angle: 90,
    zNear: 10,
    zFear: 100
};
const scene = new Scene(options);
```

#### `options` - _Object_

| Parameter | Type   | Mandatory |        default value |
| --------- | ------ | --------- | -------------------: |
| width     | number | false     |  `window.innerWidth` |
| height    | number | false     | `window.innerHeight` |
| angle     | number | false     |                   45 |
| zNear     | number | false     |                    1 |
| zFar      | number | false     |                 1000 |

### Audio Constructor

```typescript
const options = {
    filename: "./assets/music.mp3",
    options: {
        sizeFFT: 64,
        helper: true
    }
};
const audio = new Audio(options);
```

#### `options` - _Object_

| Parameter | Type    | Mandatory | default value |
| --------- | ------- | --------- | ------------: |
| sizeFFT   | number  | false     |            64 |
| helper    | boolean | false     |         false |

## Helpers

### FloorGeometryHelper Constructor

```typescript
const options = {
    dimensions: 50,
    lines: 10
};

const scene = Helix.Scene();
const FloorGeometry = new FloorGeometryHelper(options);
scene.add(FloorGeometry);
```

#### `options` - _Object_

| Parameter  | Type   | Mandatory | default value |
| ---------- | ------ | --------- | ------------: |
| dimensions | number | false     |            50 |
| lines      | number | false     |            50 |

### AxisGeometryHelper Constructor

```typescript
const option = 50;
const scene = Helix.Scene();
const AxisGeometry = new AxisGeometryHelper(option);
scene.add(AxisGeometry);
```

#### `option` - _Parameter_

| Parameter  | Type   | Mandatory | default value |
| ---------- | ------ | --------- | ------------: |
| dimensions | number | false     |            50 |

## Case Study

### Use Audio with average
```typescript
import { Icosphere_vertices, Icosphere_indices } from "./shapes";

// Load music & Active Helper vizualizer
const music = Helix.Audio("./assets/music.mp3");
music.helper = true;

// Instance Geometry Helper
const geometryHelper = Helix.GeometryHelper();

// Create form
let sphere = Helix.Mesh(Icosphere_vertices, Icosphere_indices, {
    color: Helix.Color("FFFFFF"),
    wireframe: true
});

function modifyGeometry(geometry: Mesh, average: number | undefined) {
    const newGeometry = [];

    // Return array with object {x: number, y: number, z: number}
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

function draw() {
    // Get Tonality
    const musicAverage = music.getTonality(10);

    camera.rotate.y += 0.02;
    camera.rotate.x += 0.02;

    modifyGeometry(sphere, average);

    render.render(camera, scene);
    requestAnimationFrame(draw);
}

draw();

```

### Use `Anime.js` library
```typescript
import Anime from "animejs";

let myObject = {
    valueDynamic: 0
};

// Basic usage
const animation = Anime<{ valueDynamic: number }>({
    targets: myObject,
    duration: 10000,
    valueDynamic: 12,
    easing: "linear",
    round: 10,
    update: () => console.log(myObject.valueDynamic)
});

```

## To do

-   Audio play and resume action

---

**Made with feeling & <3**
