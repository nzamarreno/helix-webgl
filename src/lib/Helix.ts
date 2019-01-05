import { Scene } from "./scene/Scene";
import { Render, IRenderInitialization } from "./renderer/Renderer";
import { Camera } from "./camera/Camera";
import { Mesh, IMeshOptions } from "./geometry/Mesh";
import { Color } from "./utils/color";

export interface IColorRGBA {
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
        this.SceneRender = new Scene(this.program, this.gl);

        return this.SceneRender;
    }

    public Render(options?: IRenderInitialization): Render {
        this.RenderInstance = new Render(options);
        this.gl = this.RenderInstance.getGLContext();
        this.program = this.RenderInstance.getGLProgram();

        return this.RenderInstance;
    }

    public Camera(): Camera {
        this.CameraInstance = new Camera(this.program, this.gl);

        return this.CameraInstance;
    }

    public Mesh(
        geometry: number[],
        indices?: number[],
        options?: IMeshOptions
    ): Mesh {
        this.MeshInstance = new Mesh(
            this.program,
            this.gl,
            geometry,
            indices,
            options
        );

        return this.MeshInstance;
    }

    public Color(HexColor: string) {
        return Color.convertHexToRGB(HexColor);
    }
}

export default new Helix();
