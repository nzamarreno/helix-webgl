import { IColorRGBA } from "../Helix";
import { Camera } from "../camera/Camera";
import { Mesh } from "../geometry/Mesh";
import { RenderShader } from "./RendererShader";
import { Scene } from "../scene/Scene";

export interface Shader<T> {
    uniforms: T;
    fragment: string;
    vertex: string;
}
export interface IRenderInitialization {
    width?: number;
    height?: number;
    background?: IColorRGBA;
}

export class Render {
    background: IColorRGBA;
    rendererShader: RenderShader;
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
        this.rendererShader = new RenderShader(width, height);
        this.uPMatrixLocation = this.rendererShader.gl.getUniformLocation(
            this.rendererShader.program,
            "uWMatrix"
        );
    }

    public setBackground(color: IColorRGBA) {
        this.background = color;
    }

    public getGLContext(): WebGLRenderingContext {
        return this.rendererShader.gl;
    }

    public getGLProgram() {
        return this.rendererShader.program;
    }

    render(camera: Camera, scene: Scene) {
        this.rendererShader.gl.clearColor(
            this.background.r,
            this.background.g,
            this.background.b,
            this.background.a
        );

        this.rendererShader.gl.clear(this.rendererShader.gl.COLOR_BUFFER_BIT);

        this.rendererShader.gl.viewport(
            0,
            0,
            this.rendererShader.width,
            this.rendererShader.height
        );

        // Render Scene
        scene.render(this.rendererShader.width, this.rendererShader.height);
        const objects: Mesh[] = scene.getObjectsOfScene();

        for (let i = 0; i < objects.length; i++) {
            camera.renderCamera();

            objects[i].renderObject();
            const positionObject = objects[i].getPosition(camera.uWMatrix);

            this.rendererShader.gl.uniformMatrix4fv(
                this.uPMatrixLocation,
                false,
                positionObject
            );
        }
    }
}
