import { Audio, IAudio } from "./audio/Audio";
import { Render, IRenderInitialization } from "./renderer/Renderer";
import { Camera } from "./camera/Camera";
import { Mesh, IMeshOptions } from "./geometry/Mesh";
import { Color } from "./utils/color";
import { Scene } from "./scene/Scene";

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
    AudioInstance!: Audio;
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

    public Audio(filename: string, options?: IAudio) {
        this.AudioInstance = new Audio(filename, options);

        return this.AudioInstance;
    }
}

export default new Helix();
