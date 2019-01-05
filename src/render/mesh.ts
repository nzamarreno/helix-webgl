import { RGBA } from './Helix';
import { mat4 } from './../utils/mat4';

export interface MeshOptions {
    color?: RGBA;
    wireframe?: boolean;
}

export class Mesh {
    geometry: number[];
    matrix: number[];
    indices: number[] | undefined;
    color: RGBA | undefined;
    wireframe: boolean | undefined;
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    aPosition: number | undefined;

    constructor(
        program: WebGLProgram,
        gl: WebGLRenderingContext,
        geometry: number[],
        indices?: number[] | undefined,
        options?: MeshOptions
    ) {
        this.gl = gl;
        this.geometry = geometry;
        this.program = program;
        this.matrix = mat4.createMatrix();
        this.indices = indices;

        if (options) {
            this.wireframe = options.wireframe || true;
            this.color = options.color || { r: 0.2, g: 0.4, b: 0.5, a: 1.0 };
        }

        this.loadBuffer(this.geometry);
        this.loadIndices(this.indices);
    }

    loadBuffer(geometry: number[]) {
        let buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(geometry), this.gl.STATIC_DRAW);

        this.aPosition = this.gl.getAttribLocation(this.program, 'aPosition');
    }

    loadIndices(indices: number[] | undefined) {
        if (indices && indices.length > 0) {
            let bufferIndices = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, bufferIndices);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
        }
    }

    renderObject() {
        const type = this.wireframe ? this.gl.LINES : this.gl.TRIANGLES;
        if (this.aPosition) {
            this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(this.aPosition);
        }
        
        if (this.indices && this.indices.length > 0) {
            this.gl.drawElements(type, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
        } else {
            this.gl.drawArrays(type, 0, this.geometry.length / 3);
        }
    }
}
