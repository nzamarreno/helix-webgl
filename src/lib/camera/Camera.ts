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
    uWMatrix: number[];
    cMatrix: number[];
    uPMatrixLocation!: WebGLUniformLocation | null;
    rotate: position3D;

    constructor(program: WebGLProgram, gl: WebGLRenderingContext) {
        this.position = { x: 0, y: 0, z: 5 };
        this.rotate = { x: 0, y: 0, z: 0 };

        this.program = program;
        this.gl = gl;

        this.uWMatrix = mat4.create();
        this.cMatrix = mat4.create();

        this.uPMatrixLocation = this.gl.getUniformLocation(
            this.program,
            "uWMatrix"
        );
    }

    public setPosition(position: position3D) {
        this.position = position;
    }

    public renderCamera() {
        mat4.identity(this.cMatrix);

        this.calculateRotation();
        this.calculatePosition();

        mat4.invert(this.uWMatrix, this.cMatrix);

        this.gl.uniformMatrix4fv(this.uPMatrixLocation, false, this.uWMatrix);
    }

    private calculatePosition() {
        // FIXME: Convert unity
        mat4.translate(this.cMatrix, this.cMatrix, [
            this.position.x,
            this.position.y,
            this.position.z
        ]);
    }

    private calculateRotation() {
        // FIXME: Convert unity
        mat4.rotateX(this.cMatrix, this.cMatrix, this.rotate.x);
        mat4.rotateY(this.cMatrix, this.cMatrix, this.rotate.y);
    }
}
