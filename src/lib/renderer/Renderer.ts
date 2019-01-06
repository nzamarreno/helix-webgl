import { IColorRGBA } from "../Helix";
import { Camera } from "../camera/Camera";
import { Mesh } from "../geometry/Mesh";
import { RendererDOM } from "./RendererDOM";
import { Scene } from "../scene/Scene";

export interface IRenderInitialization {
    width?: number;
    height?: number;
    background?: IColorRGBA;
}

export class Render {
    background: IColorRGBA;
    rendererDOM: RendererDOM;
    uPMatrixLocation!: WebGLUniformLocation | null;

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

        this.uPMatrixLocation = this.rendererDOM.gl.getUniformLocation(
            this.rendererDOM.program,
            "uWMatrix"
        );
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

        // Render Scene
        scene.render(this.rendererDOM.width, this.rendererDOM.height);
        const objects: Mesh[] = scene.getObjectsOfScene();

        for (let i = 0; i < objects.length; i++) {
            camera.renderCamera();

            objects[i].renderObject();
            const positionObject = objects[i].getPosition(camera.uWMatrix);

            this.rendererDOM.gl.uniformMatrix4fv(
                this.uPMatrixLocation,
                false,
                positionObject
            );
        }
    }
}
