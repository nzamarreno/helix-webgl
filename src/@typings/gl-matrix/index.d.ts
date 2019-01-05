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
    }

    const mat4: mat4;
}
