export class Axis {
    dimension: number;
    geometry: number[];
    indices: number[];

    constructor(dimensions?: number) {
        this.dimension = dimensions || 50;
        this.geometry = [
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
    }

    public build() {
        this.geometry = [
            -this.dimension,
            0.0,
            0.0,
            this.dimension,
            0.0,
            0.0,
            0.0,
            -this.dimension / 2,
            0.0,
            0.0,
            this.dimension / 2,
            0.0,
            0.0,
            0.0,
            -this.dimension,
            0.0,
            0.0,
            this.dimension
        ];
    }
}
