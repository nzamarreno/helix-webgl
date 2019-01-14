import { position3D } from "./../camera/Camera";
import { mat4 } from "gl-matrix";
import { IColorRGBA } from "../Helix";

export interface IMeshOptions {
    color?: IColorRGBA;
    wireframe?: boolean;
}

export class Mesh {
    geometry: number[];
    matrix: number[];
    indices: number[] | undefined;
    color: number[];
    wireframe: boolean | undefined;
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    position: position3D;
    rotate: position3D;

    // Shader
    aPosition: number | undefined;
    uColor: WebGLUniformLocation | null;

    constructor(
        program: WebGLProgram,
        gl: WebGLRenderingContext,
        geometry: number[],
        indices?: number[] | undefined,
        options?: IMeshOptions
    ) {
        this.gl = gl;
        this.geometry = geometry;
        this.program = program;
        this.matrix = mat4.create();
        this.indices = indices;
        this.position = { x: 0, y: 0, z: 0 };
        this.rotate = { x: 0, y: 0, z: 0 };

        this.color =
            options && options.color
                ? [
                    options.color.r,
                    options.color.g,
                    options.color.g,
                    options.color.a
                ]
                : [0.4, 0.4, 0.5, 1.0];
        this.wireframe =
            options && options.wireframe !== undefined
                ? options.wireframe
                : true;

        // Inialization Shader
        this.uColor = this.gl.getUniformLocation(this.program, "uColor");
        this.aPosition = this.gl.getAttribLocation(this.program, "aPosition");

        // Load Buffer
        this.loadBuffer(this.geometry);
        this.loadIndices(this.indices);
    }

    public multiplyScalar(position: position3D, scalar: number) {
        const coordinates = { x: 0, y: 0, z: 0 };
        coordinates.x = position.x * scalar;
        coordinates.y = position.y * scalar;
        coordinates.z = position.z * scalar;

        return coordinates;
    }

    public getGeometryPoints(): position3D[] {
        const coords: position3D[] = [];

        for (let i = 0; i < this.geometry.length / 3; i++) {
            const start = i * 3;
            let arrayPos = this.geometry.slice(start, start + 3);

            coords.push({ x: arrayPos[0], y: arrayPos[1], z: arrayPos[2] });
        }

        return coords;
    }

    public renderObject() {
        const type = this.wireframe ? this.gl.LINES : this.gl.TRIANGLES;

        // Vertices Geometry
        this.loadBuffer(this.geometry);

        if (this.aPosition == 0 && this.aPosition !== undefined) {
            this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(this.aPosition);
        }

        // Indices Geometry
        if (this.indices && this.indices.length > 0) {
            this.gl.drawElements(
                type,
                this.indices.length,
                this.gl.UNSIGNED_SHORT,
                0
            );
        } else {
            this.gl.drawArrays(type, 0, this.geometry.length / 3);
        }

        // Color Geometry
        this.gl.uniform4fv(this.uColor, this.color);
    }

    private loadBuffer(geometry: number[]) {
        let buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(geometry),
            this.gl.STATIC_DRAW
        );
    }

    private loadIndices(indices: number[] | undefined) {
        if (indices && indices.length > 0) {
            let bufferIndices = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, bufferIndices);
            this.gl.bufferData(
                this.gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(indices),
                this.gl.STATIC_DRAW
            );
        }
    }

    public getPosition(matrixCamera: number[]) {
        this.matrix = mat4.translate(matrixCamera, matrixCamera, [
            this.position.x,
            this.position.y,
            this.position.z
        ]);

        this.matrix = mat4.rotateY(this.matrix, this.matrix, this.rotate.y);
        this.matrix = mat4.rotateX(this.matrix, this.matrix, this.rotate.x);

        return this.matrix;
    }
}
