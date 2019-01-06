export interface IFloor {
    dimensions?: number;
    lines?: number;
}

export class Floor {
    dimension: number;
    lines: number;
    geometry: number[];
    indices: number[];

    constructor(options?: IFloor) {
        this.dimension =
            options && options.dimensions ? options.dimensions : 50;
        this.lines = options && options.lines ? options.lines : 50;
        this.geometry = [];
        this.indices = [];
    }

    public build() {
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
        this.geometry = v;
        this.indices = i;
    }
}
