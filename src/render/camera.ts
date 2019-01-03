import { mat4 } from "./../utils/mat4";

export interface position3D {
    x: number;
    y: number;
    z: number;
}

export interface CameraInitialization {
    height?: number;
    width?: number;
    angle?: number;
    zNear?: number;
    zFar?: number;
    orbit?: boolean;
    position?: position3D;
}

export class Camera {
    height: number;
    width: number;
    orbit: boolean;
    angle: number;
    zNear: number;
    zFar: number;
    position!: position3D;
    cMatrix!: number[];
    program: WebGLProgram;
    gl: WebGLRenderingContext;
    uniformLocation!: WebGLUniformLocation | null;

    constructor(
        program: WebGLProgram,
        gl: WebGLRenderingContext,
        initialization?: CameraInitialization
    ) {
        this.program = program;
        this.gl = gl;
        this.height =
            initialization && initialization.height
                ? initialization.height
                : window.innerHeight;
        this.width =
            initialization && initialization.width
                ? initialization.width
                : window.innerWidth;
        this.orbit =
            initialization && initialization.orbit
                ? initialization.orbit
                : false;
        this.angle =
            initialization && initialization.angle ? initialization.angle : 45;
        this.zNear =
            initialization && initialization.zNear ? initialization.zNear : 1;
        this.zFar =
            initialization && initialization.zFar ? initialization.zFar : 1000;

        this.init();
    }

    init() {
        this.position = { x: 0, y: 0, z: 0 };
        // this.setPosition(this.position);

        let aspect = this.width / this.height;
        this.cMatrix = mat4.perspective(45, aspect, this.zNear, this.zFar);

        this.uniformLocation = this.gl.getUniformLocation(
            this.program,
            "uMatrix"
        );
    }

    setPosition(position: position3D) {
        // return mat4.translate(this.cMatrix, [this.position.x, this.position.y, this.position.z]);
    }

    renderCamera() {
        this.gl.uniformMatrix2fv(this.uniformLocation, false, this.cMatrix);
    }
}
