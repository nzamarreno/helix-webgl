declare module "gl-matrix" {
    export interface mat4 {
        perspective: (
            out: number[],
            fovy: number,
            aspect: number,
            near: number,
            far: number
        ) => number[];
        translate: (
            mat4Out: number[],
            mat4ToTranslate: number[],
            vec3: number[]
        ) => number[];
        create: () => number[];
        rotateX: (
            out: number[],
            mat4ToRotate: number[],
            rad: number
        ) => number[];
        rotateY: (
            out: number[],
            mat4ToRotate: number[],
            rad: number
        ) => number[];
        identity: (out: number[]) => number[];
        multiply: (
            out: number[],
            firstOperand: number[],
            secondOperand: number[]
        ) => number[];
        invert: (out: number[], sourceMatrix: number[]) => number[];
    }

    const mat4: mat4;
}
