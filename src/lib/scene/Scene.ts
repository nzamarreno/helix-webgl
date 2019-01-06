import { mat4 } from "gl-matrix";
import { Mesh } from "../geometry/Mesh";

export interface IScene {
    height?: number;
    width?: number;
    angle?: number;
    zNear?: number;
    zFar?: number;
}

export class Scene {
    private height: number;
    private width: number;
    private angle: number;
    private zNear: number;
    private zFar: number;
    public objects: Mesh[] = [];
    program!: WebGLProgram;
    gl!: WebGLRenderingContext;

    uPMatrix: number[] = [];
    uPMatrixLocation: WebGLUniformLocation | null;

    constructor(
        program: WebGLProgram,
        gl: WebGLRenderingContext,
        options?: IScene
    ) {
        this.program = program;
        this.gl = gl;

        this.height =
            options && options.height ? options.height : window.innerHeight;
        this.width =
            options && options.width ? options.width : window.innerWidth;
        this.angle = options && options.angle ? options.angle : 45;
        this.zNear = options && options.zNear ? options.zNear : 1;
        this.zFar = options && options.zFar ? options.zFar : 1000;

        this.uPMatrixLocation = this.gl.getUniformLocation(
            this.program,
            "uPMatrix"
        );

        this.init();
    }

    public init() {
        let aspect = this.width / this.height;

        this.uPMatrix = mat4.perspective(
            mat4.create(),
            45,
            aspect,
            this.zNear,
            this.zFar
        );
    }

    public add(obj: Mesh): void {
        this.objects.push(obj);
    }

    public render() {
        this.gl.uniformMatrix4fv(this.uPMatrixLocation, false, this.uPMatrix);
    }

    public getObjectsOfScene(): Mesh[] {
        return this.objects;
    }
}
