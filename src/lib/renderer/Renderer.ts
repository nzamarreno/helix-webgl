import { IColorRGBA } from "../Helix";
import { Camera } from "../camera/Camera";
import { Scene } from "../scene/Scene";
import { Mesh } from "../geometry/Mesh";
import { RendererDOM } from "./RendererDOM";

export interface IRenderInitialization {
    width?: number;
    height?: number;
    background?: IColorRGBA;
}

export class Render {
    background: IColorRGBA;
    rendererDOM: RendererDOM;

    constructor(options?: IRenderInitialization) {
        this.background =
            options && options.background
                ? options.background
                : {
                      r: 0.5,
                      g: 0.6,
                      b: 0.4,
                      a: 1.0
                  };

        const width = options && options.width ? options.width : undefined;
        const height = options && options.height ? options.height : undefined;
        this.rendererDOM = new RendererDOM(width, height);
    }

    public setBackground(color: IColorRGBA) {
        this.background = color;
    }

    public getGLContext(): WebGLRenderingContext {
        return this.rendererDOM.gl;
    }

    public getGLProgram() {
        return this.rendererDOM.program;
    }

    render(camera: Camera, scene: Scene) {
        this.rendererDOM.gl.clearColor(
            this.background.r,
            this.background.g,
            this.background.b,
            this.background.a
        );
        this.rendererDOM.gl.clear(this.rendererDOM.gl.COLOR_BUFFER_BIT);
        this.rendererDOM.gl.viewport(
            0,
            0,
            this.rendererDOM.width,
            this.rendererDOM.height
        );

        camera.renderCamera();

        // Render Scene
        scene.render(this.rendererDOM.width, this.rendererDOM.height);
        const objects: Mesh[] = scene.getObjectsOfScene();

        for (let i = 0; i < objects.length; i++) {
            objects[i].renderObject();
        }
    }
}
