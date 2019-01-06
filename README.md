# Helix

_Little Library for help you to create WebGL WebSite_

## Summary

-   [Webpack CLI](#webpack-cli)
-   [Getting Start](#getting-start)
-   [Parameters](#parameters)
-   [Helpers](#helpers)

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
const optionsRender = {
    backgrond: Helix.Color("FFFFFF"),
    height: 400,
    width: 400
};
const render = new Render(optionsRender);
```

#### `Options` - _Object_

| Parameter  | Type   | Mandatory |        default value |
| ---------- | ------ | --------- | -------------------: |
| background | string | false     |              #FFFFFF |
| width      | number | false     |  `window.innerWidth` |
| height     | number | false     | `window.innerHeight` |

### Scene Constructor

```typescript
const optionsScene = {
    height: 400,
    width: 400,
    angle: 90,
    zNear: 10,
    zFear: 100
};
const scene = new Scene(optionsScene);
```

#### `Options` - _Object_

| Parameter | Type   | Mandatory |        default value |
| --------- | ------ | --------- | -------------------: |
| width     | number | false     |  `window.innerWidth` |
| height    | number | false     | `window.innerHeight` |
| angle     | number | false     |                   45 |
| zNear     | number | false     |                    1 |
| zFar      | number | false     |                 1000 |

### Audio Constructor

```typescript
const optionsAudio = {
    filename: "./assets/music.mp3",
    options: {
        sizeFFT: 64,
        helper: true
    }
};
const audio = new Audio(optionsScene);
```

#### `Options` - _Object_

| Parameter | Type    | Mandatory | default value |
| --------- | ------- | --------- | ------------: |
| sizeFFT   | number  | false     |            64 |
| helper    | boolean | false     |         false |

## Helpers
