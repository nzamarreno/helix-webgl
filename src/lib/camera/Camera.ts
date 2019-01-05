import { mat4 } from "gl-matrix";

export interface position3D {
    x: number;
    y: number;
    z: number;
}

export class Camera {
    public position: position3D;
    program: WebGLProgram;
    gl: WebGLRenderingContext;
    uWMatrix!: number[];
    uPMatrixLocation!: WebGLUniformLocation | null;

    constructor(program: WebGLProgram, gl: WebGLRenderingContext) {
        this.position = { x: 0, y: 0, z: 0 };

        this.program = program;
        this.gl = gl;

        this.uWMatrix = mat4.create();
        this.uPMatrixLocation = this.gl.getUniformLocation(
            this.program,
            "uWMatrix"
        );
    }

    public setPosition(position: position3D) {
        // Code matrix World
    }

    public renderCamera() {
        this.gl.uniformMatrix4fv(this.uPMatrixLocation, false, this.uWMatrix);
    }
}
