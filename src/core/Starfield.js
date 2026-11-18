import * as THREE from 'three';

export class Starfield {
    constructor(scene) {
        this.scene = scene;
        this.starLayers = [];

        this._createStars();
        this._createSprites();
    }

    _createStars() {
        const configs = [
            { count: 5000, radius: 800, size: 0.2 },
            { count: 4000, radius: 1400, size: 0.3 },
            { count: 2500, radius: 2200, size: 0.45 },
            { count: 1500, radius: 3200, size: 0.7 }
        ];

        configs.forEach((cfg) => {
            const geom = new THREE.BufferGeometry();
            const pos = new Float32Array(cfg.count * 3);
            const col = new Float32Array(cfg.count * 3);

            for (let i = 0; i < cfg.count; i++) {
                const r = cfg.radius * (0.8 + Math.random() * 0.6);
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);

                pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                pos[i * 3 + 2] = r * Math.cos(phi);

                const bright = 0.6 + Math.random() * 0.6;
                col[i * 3] = bright;
                col[i * 3 + 1] = bright;
                col[i * 3 + 2] = bright;
            }

            geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            geom.setAttribute('color', new THREE.BufferAttribute(col, 3));

            const mat = new THREE.PointsMaterial({
                size: cfg.size,
                vertexColors: true,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                sizeAttenuation: true
            });

            const points = new THREE.Points(geom, mat);
            this.scene.add(points);
            this.starLayers.push(points);
        });
    }

    _createSprites() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.6, 'rgba(255,255,255,0.7)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        const spriteTex = new THREE.CanvasTexture(canvas);

        for (let i = 0; i < 80; i++) {
            const material = new THREE.SpriteMaterial({
                map: spriteTex,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const sprite = new THREE.Sprite(material);
            const r = 1000 + Math.random() * 2500;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            sprite.position.set(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );
            sprite.scale.set(12, 12, 1);
            this.scene.add(sprite);
        }
    }

    updateParallax(cameraZ) {
        this.starLayers[0].position.z = cameraZ * 0.02;
        this.starLayers[1].position.z = cameraZ * 0.05;
        this.starLayers[2].position.z = cameraZ * 0.1;
        this.starLayers[3].position.z = cameraZ * 0.16;
    }

    rotate(yRot = 0.00015, xRot = 0.0001) {
        this.starLayers[0].rotation.y += yRot;
        this.starLayers[1].rotation.x += xRot;
    }
}
