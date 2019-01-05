# Helix
_Little Library for help you to create WebGL WebSite_  

## Summary
- Webpack CLI
- Getting Start

### Webpack CLI
```bash
$ yarn install && yarn run server
```

### Getting Start
```javascript
import Helix from './render/Helix';
import { Sphere, Sphere_indices } from './geometry/sphere';

draw();

// Options for the render
// Helix Color transform your hexadecimal color in color normalize
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

```

#### Explication:
