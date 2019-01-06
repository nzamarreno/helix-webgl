export interface IRendererDOMReturn {}

export class RendererDOM {
    program!: WebGLProgram;
    gl!: WebGLRenderingContext;

    canvas!: HTMLCanvasElement;
    height: number;
    width: number;
    canResize: boolean;
    vertexShader: any;
    fragmentShader: any;

    constructor(widthRender?: number, heightRender?: number) {
        this.canResize = widthRender && heightRender ? false : true;
        this.width = widthRender || window.innerWidth;
        this.height = heightRender || window.innerHeight;

        this.init(this.width, this.height);
        this.initShader();
        this.initProgram();
        this.initEventDOM();
    }

    private initEventDOM() {
        if (this.canResize) {
            window.addEventListener("resize", event => {
                this.width = window.innerWidth;
                this.height = window.innerHeight;
                this.canvas.width = this.width;
                this.canvas.height = this.height;
            });
        }
    }

    private init(width: number, height: number) {
        let canvasToInsert = document.createElement("canvas");
        canvasToInsert.setAttribute("id", "scene");
        canvasToInsert.setAttribute("width", width.toString());
        canvasToInsert.setAttribute("height", height.toString());
        document.querySelector("body")!.appendChild(canvasToInsert);

        let canvas = document.querySelector("canvas");

        if (canvas) {
            this.canvas = canvas;
            this.gl = this.canvas.getContext("webgl")!;
        }
    }

    private initShader() {
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

    private initProgram() {
        if (this.vertexShader && this.fragmentShader) {
            this.program = this.gl.createProgram()!;
            this.gl.attachShader(this.program, this.vertexShader);
            this.gl.attachShader(this.program, this.fragmentShader);
            this.gl.linkProgram(this.program);
            this.gl.useProgram(this.program);
        }
    }
}
