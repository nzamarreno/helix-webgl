import { Mesh } from './mesh';

export class Scene {
    objects: Mesh[] = [];

    add(obj: Mesh) {
        this.objects.push(obj);
    }

    getObjectsOfScene(): Mesh[] {
        return this.objects;
    }
}
