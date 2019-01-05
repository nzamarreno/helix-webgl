import { Scene } from "./scene";
import { Render, RenderInitialization } from "./render";
import { Camera, CameraInitialization } from "./camera";
import { Mesh } from "./mesh";
import { Color } from "../utils/color";

export interface RGBA {
    r: number;
    b: number;
    g: number;
    a: number;
}

class Helix {
    SceneRender!: Scene;
    RenderInstance!: Render;
    CameraInstance!: Camera;
    MeshInstance!: Mesh;
    program!: WebGLProgram;
    gl!: WebGLRenderingContext;

    public Scene(): Scene {
        this.SceneRender = new Scene();

        return this.SceneRender;
    }

    public Render(options?: RenderInitialization): Render {
        this.RenderInstance = new Render(options);
        this.gl = this.RenderInstance.getGLContext();
        this.program = this.RenderInstance.getGLProgram();

        return this.RenderInstance;
    }

    public Camera(options?: CameraInitialization): Camera {
        this.CameraInstance = new Camera(this.program, this.gl, options);

        return this.CameraInstance;
    }

    public Mesh(geometry: number[], indices?: number[]): Mesh {
        this.MeshInstance = new Mesh(this.program, this.gl, geometry, indices);

        return this.MeshInstance;
    }

    public Color(HexColor: string) {
        return Color.convertHexToRGB(HexColor);
    }
}

export default new Helix();
