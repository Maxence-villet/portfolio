import * as THREE from 'three';
import type { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export class PostProcessing {
    private readonly composer: EffectComposer;
    private readonly bloomPass: UnrealBloomPass;
    private readonly afterimagePass: AfterimagePass;

    constructor(composer: EffectComposer) {
        this.composer = composer;

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.0,
            0.3,
            0.9
        );
        this.bloomPass.threshold = 0.05;
        this.bloomPass.strength = 0.5;
        this.bloomPass.radius = 0.5;

        this.afterimagePass = new AfterimagePass(0.9);

        this.composer.addPass(this.afterimagePass);
        this.composer.addPass(this.bloomPass);
        this.composer.addPass(new OutputPass());
    }

    update(speedFactor: number): void {
        this.afterimagePass.uniforms['damp'].value = 0.88 + speedFactor * 0.08;
        this.bloomPass.strength = 0.4 + speedFactor * 1.2;
    }
}
