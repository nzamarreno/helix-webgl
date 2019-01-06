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

        const height =
            options && options.height ? options.height : window.innerHeight;
        const width =
            options && options.width ? options.width : window.innerWidth;
        this.angle = options && options.angle ? options.angle : 45;
        this.zNear = options && options.zNear ? options.zNear : 1;
        this.zFar = options && options.zFar ? options.zFar : 1000;

        this.uPMatrixLocation = this.gl.getUniformLocation(
            this.program,
            "uPMatrix"
        );
    }

    public add(obj: Mesh): void {
        this.objects.push(obj);
    }

    public render(width: number, height: number) {
        this.createMatrix(width, height);
        this.gl.uniformMatrix4fv(this.uPMatrixLocation, false, this.uPMatrix);
    }

    public getObjectsOfScene(): Mesh[] {
        return this.objects;
    }

    private createMatrix(width: number, height: number) {
        let aspect = width / height;

        this.uPMatrix = mat4.perspective(
            mat4.create(),
            this.angle,
            aspect,
            this.zNear,
            this.zFar
        );
    }
}
