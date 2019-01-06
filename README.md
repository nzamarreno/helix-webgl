# Helix

_Little Library for help you to create WebGL WebSite_

## Summary

-   [Webpack CLI](#webpack-cli)
-   [Getting Start](#getting-start)
-   [Parameters](#parameters)

## Webpack CLI

_You have envy to begin now ! Launch this command line and appointment at your [localhost](http://localhost:9000)._

```bash
$ yarn install && yarn run server
```

## Getting Started

### Some implementations

#### Render with basics parameters

```javascript
import Helix from "./render/Helix";
import { Sphere, Sphere_indices } from "./geometry/sphere";

// Options for the render
// Helix Color transform your hexadecimal color in color normalize
const renderOptions = {
    color: Helix.Color("#0747A6")
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
```

### Parameters:
