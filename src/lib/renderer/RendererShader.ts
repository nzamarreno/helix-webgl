export class RenderShader {
    program!: WebGLProgram;
    gl!: WebGLRenderingContext;

    canvas!: HTMLCanvasElement;
    height: number;
    width: number;
    canResize: boolean;
    vertexShader: any;
    fragmentShader: any;

    private shaderGeometry: string = `
        attribute vec3 aPosition;
        uniform mat4 uPMatrix;
        uniform mat4 uWMatrix;

        void main() {
            gl_Position = uPMatrix * uWMatrix * vec4(aPosition, 1.0);
        }
    `;

    private shaderMaterial: string = `
        precision mediump float;
        uniform vec4 uColor;

        void main() {
            gl_FragColor = uColor;
        }
    `;

    private shaderVertexLight: string = `
        attribute vec3 aPosition;
        attribute vec3 nPosition;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        uniform mat4 uNMatrix;

        uniform vec3 uLightDirection;
        uniform vec4 uLightDiffuse;
        uniform vec4 uMaterialDiffuse;

        varying vec4 vFinalColor;

        void main() {
            vec3 N = vec3(uNMatrix * vec4(nPosition, 1.0));

            vec3 L = normalize(uLightDirection);

            float lambertTerm = dot(N,-L);

            vec4 Id = uMaterialDiffuse * uLightDiffuse * lambertTerm;
            vFinalColor = Id;
            vFinalColor.a = 1.0;
                        
            gl_Position =  uPMatrix * uMVMatrix * vec4(aPosition, 1.0);
        }
    `;

    private shaderMaterialLight: string = `
        precision mediump float;
        varying vec4 vFinalColor;

        void main() {
            gl_FragColor = vFinalColor;
        }
    `;

    constructor(widthRender?: number, heightRender?: number) {
        this.canResize = widthRender && heightRender ? false : true;
        this.width = widthRender || window.innerWidth;
        this.height = heightRender || window.innerHeight;

        this.init(this.width, this.height);
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

        this.vertexShader = this.createShader(this.shaderGeometry, "vertex");
        this.fragmentShader = this.createShader(this.shaderMaterial, "fragment");
    }

    private createShader(shaderScript: string, type: "vertex" | "fragment") {
        let shaderCreated;

        if (shaderScript === undefined || shaderScript === null) {
            console.log("Your Shader Script is undefined");
            return;
        }

        if (type === "vertex") {
            shaderCreated = this.gl.createShader(this.gl.VERTEX_SHADER);
        } else {
            shaderCreated = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        }

        if (shaderCreated && shaderScript) {
            this.gl.shaderSource(shaderCreated, shaderScript);
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
    }

    public createShaderWithScriptDOM(idFragment: string, idVertex: string) {
        const vertex = document.getElementById(idVertex)!.textContent;
        const fragment = document.getElementById(idFragment)!.textContent;

        if (vertex && fragment) {
            this.vertexShader = this.createShader(vertex, "vertex");
            this.fragmentShader = this.createShader(fragment, "fragment");
            this.initProgram();
        } else {
            console.log("Script of Shader in Tag Script in the DOM are not found")
        }
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
