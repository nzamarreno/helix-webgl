import { Scene } from "./scene";
import { Render } from "./render";
import { Camera, CameraInitialization } from "./camera";
import { Mesh } from "./mesh";

export interface RGBA {
    r: number;
    b: number;
    g: number;
    a: number;
}

export class NZXT {
    Scene!: Scene;
    Render!: Render;
    Camera!: Camera;
    Mesh!: Mesh;
    program!: WebGLProgram;
    gl!: WebGLRenderingContext;

    static Scene(): Scene {
        this.Scene = new Scene();

        return this.Scene;
    }

    static Render(): Render {
        this.Render = new Render();
        this.gl = this.Render.getGLContext();
        this.program = this.Render.getGLProgram();

        return this.Render;
    }

    static Camera(options: CameraInitialization | undefined): Camera {
        this.Camera = new Camera(this.program, this.gl, options);

        return this.Camera;
    }

    static Mesh(geometry: number[], indices: number[]): Mesh {
        this.Mesh = new Mesh(this.program, this.gl, geometry, indices);

        return this.Mesh;
    }
}
