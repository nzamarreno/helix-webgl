export class Axis {
    alias: string;
    dimension: number;
    vertices: number[];
    indices: number[];
    colors: number[];
    wireframe: boolean;
    perVertexColor: boolean;

    constructor() {
        this.alias = "axis";
        this.dimension = 10;
        this.vertices = [
            -10,
            0.0,
            0.0,
            10,
            0.0,
            0.0,
            0.0,
            -10 / 2,
            0.0,
            0.0,
            10 / 2,
            0.0,
            0.0,
            0.0,
            -10,
            0.0,
            0.0,
            10
        ];
        this.indices = [0, 1, 2, 3, 4, 5];
        this.colors = [
            1,
            1,
            0,
            1,
            1,
            1,
            0,
            1,
            0,
            1,
            0,
            1,
            0,
            1,
            0,
            1,
            0,
            0,
            1,
            1,
            0,
            0,
            1,
            1
        ];
        this.wireframe = true;
        this.perVertexColor = true;
    }

    private build(dimension: number) {
        if (dimension) this.dimension = dimension;
        this.vertices = [
            -dimension,
            0.0,
            0.0,
            dimension,
            0.0,
            0.0,
            0.0,
            -dimension / 2,
            0.0,
            0.0,
            dimension / 2,
            0.0,
            0.0,
            0.0,
            -dimension,
            0.0,
            0.0,
            dimension
        ];
    }
}
