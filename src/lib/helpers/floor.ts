export class Floor {
    alias: string;
    wireframe: boolean;
    dimension: number;
    lines: number;
    vertices: number[];
    indices: number[];
    diffuse: number[];

    constructor() {
        this.alias = "floor";
        this.wireframe = true;
        this.dimension = 50;
        this.lines = 50;
        this.vertices = [];
        this.indices = [];
        this.diffuse = [0.7, 0.7, 0.7, 1.0];
    }

    private build(dimension: number, lines: number) {
        if (dimension) this.dimension = dimension;
        if (lines) this.lines = (2 * this.dimension) / lines;

        var inc = (2 * this.dimension) / this.lines;
        var v = [];
        var i = [];

        for (var l = 0; l <= this.lines; l++) {
            v[6 * l] = -this.dimension;
            v[6 * l + 1] = 0;
            v[6 * l + 2] = -this.dimension + l * inc;

            v[6 * l + 3] = this.dimension;
            v[6 * l + 4] = 0;
            v[6 * l + 5] = -this.dimension + l * inc;

            v[6 * (this.lines + 1) + 6 * l] = -this.dimension + l * inc;
            v[6 * (this.lines + 1) + 6 * l + 1] = 0;
            v[6 * (this.lines + 1) + 6 * l + 2] = -this.dimension;

            v[6 * (this.lines + 1) + 6 * l + 3] = -this.dimension + l * inc;
            v[6 * (this.lines + 1) + 6 * l + 4] = 0;
            v[6 * (this.lines + 1) + 6 * l + 5] = this.dimension;

            i[2 * l] = 2 * l;
            i[2 * l + 1] = 2 * l + 1;
            i[2 * (this.lines + 1) + 2 * l] = 2 * (this.lines + 1) + 2 * l;
            i[2 * (this.lines + 1) + 2 * l + 1] =
                2 * (this.lines + 1) + 2 * l + 1;
        }
        this.vertices = v;
        this.indices = i;
    }
}
