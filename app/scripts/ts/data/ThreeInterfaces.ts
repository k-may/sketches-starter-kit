/**
 * Created by kevin.mayo on 18/08/16.
 */

import THREE = require("three");

export interface  IUniform {
    value: any;
    type: string
}

export class UniformF implements IUniform {
    value: number = 1.0;
    type: string = 'f';
}

export class UniformT implements IUniform {
    value: THREE.Texture;
    type: string = 't';

    constructor(value?: THREE.Texture) {
        this.value = value;
    }
}

export class UniformV2 implements IUniform {
    value: THREE.Vector2 = new THREE.Vector2();
    type: string = "v2";
}
