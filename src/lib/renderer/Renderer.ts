import { IColorRGBA } from "../Helix";
import { Camera } from "../camera/Camera";
import { Scene } from "../scene/Scene";
import { Mesh } from "../geometry/Mesh";

export interface IRenderInitialization {
    width?: number;
    height?: number;
    background?: IColorRGBA;
}

export class Render {
    canvas!: HTMLCanvasElement;
    program!: WebGLProgram;
    gl!: WebGLRenderingContext;
    vertexShader: any;
    fragmentShader: any;
    width: number;
    height: number;
    background: IColorRGBA;

    constructor(options?: IRenderInitialization) {
        this.width =
            options && options.width ? options.width : window.innerWidth;
        this.height = (options && options.height) || window.innerHeight;
        this.background =
            options && options.background
                ? options.background
                : {
                      r: 0.5,
                      g: 0.6,
                      b: 0.4,
                      a: 1.0
                  };

        this.init();
        this.initShader();
        this.initProgram();
    }

    init() {
        let canvasToInsert = document.createElement("canvas");
        canvasToInsert.setAttribute("id", "scene");
        canvasToInsert.setAttribute("width", this.width.toString());
        canvasToInsert.setAttribute("height", this.height.toString());
        document.querySelector("body")!.appendChild(canvasToInsert);

        let canvas = document.querySelector("canvas");

        if (canvas) {
            this.canvas = canvas;
            this.gl = this.canvas.getContext("webgl")!;
        }
    }

    getGLContext(): WebGLRenderingContext {
        return this.gl;
    }

    getGLProgram() {
        return this.program;
    }

    initShader() {
        const shader = (id: string, type: "vertex" | "fragment") => {
            let shaderCreated;
            const shaderScript = document.getElementById(id);

            if (shaderScript === undefined || shaderScript === null) {
                console.log("Your Shader Script is undefined");
                return;
            }

            if (type === "vertex") {
                shaderCreated = this.gl.createShader(this.gl.VERTEX_SHADER);
            } else {
                shaderCreated = this.gl.createShader(this.gl.FRAGMENT_SHADER);
            }

            if (shaderCreated && shaderScript.textContent) {
                this.gl.shaderSource(shaderCreated, shaderScript.textContent);
                this.gl.compileShader(shaderCreated);
                const shaderVextexStatus = this.gl.getShaderParameter(
                    shaderCreated,
                    this.gl.COMPILE_STATUS
                );
                console.log(type, shaderVextexStatus);

                return shaderCreated;
            } else {
                console.log("Warning");
            }
        };

        this.vertexShader = shader("vertex", "vertex");
        this.fragmentShader = shader("fragment", "fragment");
    }

    initProgram() {
        if (this.vertexShader && this.fragmentShader) {
            this.program = this.gl.createProgram()!;
            this.gl.attachShader(this.program, this.vertexShader);
            this.gl.attachShader(this.program, this.fragmentShader);
            this.gl.linkProgram(this.program);
            this.gl.useProgram(this.program);
        }
    }

    setBackground(color: IColorRGBA) {
        this.background = color;
    }

    render(camera: Camera, scene: Scene) {
        this.gl.clearColor(
            this.background.r,
            this.background.g,
            this.background.b,
            this.background.a
        );
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.viewport(0, 0, this.width, this.height);

        camera.renderCamera();

        // Render Scene
        scene.render();
        const objects: Mesh[] = scene.getObjectsOfScene();

        for (let i = 0; i < objects.length; i++) {
            objects[i].renderObject();
        }
    }
}