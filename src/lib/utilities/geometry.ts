import { position3D } from "../camera/Camera";

export class Geometry {
    public getGeometryPoints(geometry: number[]): position3D[] {
        const coords: position3D[] = [];

        for (let i = 0; i < geometry.length / 3; i++) {
            const start = i * 3;
            let arrayPos = geometry.slice(start, start + 3);

            coords.push({ x: arrayPos[0], y: arrayPos[1], z: arrayPos[2] });
        }

        return coords;
    }

    public multiplyScalar(position: position3D, scalar: number) {
        const coordinates = { x: 0, y: 0, z: 0 };
        coordinates.x = position.x * scalar;
        coordinates.y = position.y * scalar;
        coordinates.z = position.z * scalar;

        return coordinates;
    }
}