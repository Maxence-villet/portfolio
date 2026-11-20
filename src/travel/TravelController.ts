import type * as THREE from 'three';

export interface TravelStation {
    z: number;
}

export type StationChangeHandler = (index: number) => void;
export type NearStationHandler = (index: number, isNear: boolean) => void;
export type DepartureHandler = () => void;

export class TravelController {
    private readonly stations: readonly TravelStation[];
    private readonly camera: THREE.PerspectiveCamera;
    private readonly onStationChange: StationChangeHandler;

    onNearStationChange: NearStationHandler | null = null;
    onDeparture: DepartureHandler | null = null;

    currentIndex = 0;
    velocityZ = 0;
    scrollVelocity = 0;
    isScrolling = false;
    autoPilot = false;
    autoPilotTargetIndex = -1;
    arrivalPause = false;
    arrivalPauseTimer = 0;
    wasStationary = true;
    isDirectReturn = false;
    hasLeftStation = false;

    private readonly MAX_SPEED = 24.0;
    private readonly ACCEL = 1.2;
    private readonly FRICTION = 0.94;
    private readonly SNAP_DIST = 5.0;
    private readonly ARRIVAL_PAUSE_DURATION = 2000;
    private readonly DECEL_ZONE = 300;

    private baseCameraZ: number;
    private scrollTimeout: ReturnType<typeof setTimeout> | undefined;

    constructor(
        stations: readonly TravelStation[],
        camera: THREE.PerspectiveCamera,
        onStationChange: StationChangeHandler
    ) {
        this.stations = stations;
        this.camera = camera;
        this.onStationChange = onStationChange;

        this.baseCameraZ = stations[0].z;
        this.camera.position.z = this.baseCameraZ;

        this._bindEvents();
    }

    private _findScrollable(el: Element | null): Element | null {
        while (el && el !== document.body && el !== document.documentElement) {
            if (el.classList && el.classList.contains('scrollable')) return el;
            el = el.parentElement;
        }
        return null;
    }

    private _bindEvents(): void {
        window.addEventListener('wheel', (e: WheelEvent) => {
            const scrollable = this._findScrollable(e.target as Element | null);
            if (scrollable) {
                const canScrollUp = scrollable.scrollTop > 0;
                const canScrollDown = scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 1;
                if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
                    return; // la section défile nativement
                }
            }

            e.preventDefault();
            const delta = e.deltaY;
            this.scrollVelocity = Math.sign(delta) * Math.min(Math.abs(delta) * 0.7, 25);
            this.isScrolling = true;
            this.arrivalPause = false;
            this.isDirectReturn = false;
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => { this.isScrolling = false; }, 100);
        }, { passive: false });

        let touchStart = 0;
        window.addEventListener('touchstart', (e: TouchEvent) => {
            touchStart = e.touches[0].clientY;
        });
        window.addEventListener('touchmove', (e: TouchEvent) => {
            const scrollable = this._findScrollable(e.target as Element | null);
            if (scrollable) {
                const canScrollUp = scrollable.scrollTop > 0;
                const canScrollDown = scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 1;
                const dy = touchStart - e.touches[0].clientY;
                if ((dy < 0 && canScrollUp) || (dy > 0 && canScrollDown)) {
                    return;
                }
            }

            e.preventDefault();
            const dy = touchStart - e.touches[0].clientY;
            this.scrollVelocity = Math.sign(dy) * Math.min(Math.abs(dy) * 0.5, 20);
            this.isScrolling = true;
            this.arrivalPause = false;
            this.isDirectReturn = false;
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => { this.isScrolling = false; }, 150);
        }, { passive: false });

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.autoPilot = !this.autoPilot;
                if (this.autoPilot) {
                    if (this.currentIndex === this.stations.length - 1) {
                        this.autoPilotTargetIndex = 0;
                        this.isDirectReturn = true;
                    } else {
                        this.autoPilotTargetIndex = this.currentIndex + 1;
                        this.isDirectReturn = false;
                    }
                } else {
                    this.isDirectReturn = false;
                }
            }
        });
    }

    jumpToStation(index: number): void {
        this.currentIndex = index;
        this.velocityZ = 0;
        this.arrivalPause = false;
        this.baseCameraZ = this.stations[index].z;
        this.camera.position.z = this.baseCameraZ;
        this.isScrolling = false;
        this.wasStationary = true;
        this.hasLeftStation = false;
        this.isDirectReturn = false;
        this.onStationChange(index);
    }

    update(now: number, lastTime: number): number {
        const dt = now - lastTime;

        if (this.arrivalPause) {
            this.arrivalPauseTimer -= dt;
            this.velocityZ = 0;
            if (this.arrivalPauseTimer <= 0) {
                this.arrivalPause = false;
                this.hasLeftStation = false;
                if (this.onDeparture) this.onDeparture();
                if (this.autoPilot) {
                    if (this.currentIndex === this.stations.length - 1) {
                        this.autoPilotTargetIndex = 0;
                        this.isDirectReturn = true;
                    } else {
                        this.autoPilotTargetIndex = this.currentIndex + 1;
                        this.isDirectReturn = false;
                    }
                }
            } else {
                return 0;
            }
        }

        if (this.autoPilot && !this.isScrolling && !this.arrivalPause) {
            if (this.autoPilotTargetIndex < 0 || this.autoPilotTargetIndex >= this.stations.length) {
                this.autoPilot = false;
                this.isDirectReturn = false;
            } else {
                const targetZ = this.stations[this.autoPilotTargetIndex].z;
                const dir = targetZ - this.baseCameraZ;
                const absDist = Math.abs(dir);

                if (absDist > this.SNAP_DIST) {
                    const speedRatio = Math.min(absDist / this.DECEL_ZONE, 1.0);
                    const easedRatio = speedRatio * speedRatio;
                    const targetSpeed = 0.3 + easedRatio * (this.MAX_SPEED * 0.5 - 0.3);
                    const desiredVelocity = Math.sign(dir) * targetSpeed;
                    this.velocityZ += (desiredVelocity - this.velocityZ) * 0.3;
                    if (dir < 0 && this.velocityZ > 0) this.velocityZ = 0;
                    if (dir > 0 && this.velocityZ < 0) this.velocityZ = 0;

                    if (!this.hasLeftStation && absDist > 50) {
                        this.hasLeftStation = true;
                        this.currentIndex = this.autoPilotTargetIndex;
                        this.onStationChange(this.currentIndex);
                    }
                } else {
                    this.baseCameraZ = targetZ;
                    this.velocityZ = 0;
                    this.currentIndex = this.autoPilotTargetIndex;
                    this.onStationChange(this.currentIndex);
                    this.arrivalPause = true;
                    this.arrivalPauseTimer = this.ARRIVAL_PAUSE_DURATION;
                    this.hasLeftStation = false;
                    if (this.currentIndex === 0) this.isDirectReturn = false;
                    return 0;
                }
            }
        }

        if (this.isScrolling && Math.abs(this.scrollVelocity) > 0.5) {
            this.velocityZ -= this.scrollVelocity * this.ACCEL * 0.08;
            this.scrollVelocity *= 0.4;
        } else if (!this.autoPilot) {
            this.velocityZ *= this.FRICTION;
        }

        this.velocityZ = Math.max(-this.MAX_SPEED, Math.min(this.MAX_SPEED, this.velocityZ));
        this.baseCameraZ += this.velocityZ;

        let nearestIdx = 0;
        let minDist = Infinity;
        this.stations.forEach((s, i) => {
            const d = Math.abs(this.baseCameraZ - s.z);
            if (d < minDist) {
                minDist = d;
                nearestIdx = i;
            }
        });

        const isStationary = (minDist < this.SNAP_DIST && Math.abs(this.velocityZ) < 0.8);

        if (!isStationary && this.wasStationary) {
            if (this.onDeparture) this.onDeparture();
        }

        if (!this.autoPilot && !isStationary && minDist > 50) {
            if (this.currentIndex !== nearestIdx) {
                this.currentIndex = nearestIdx;
                this.onStationChange(this.currentIndex);
            }
        }

        if (isStationary) {
            this.hasLeftStation = false;
        }

        this.wasStationary = isStationary;

        if (!this.isScrolling && !this.autoPilot && minDist < this.SNAP_DIST && Math.abs(this.velocityZ) < 0.8) {
            this.baseCameraZ = this.stations[nearestIdx].z;
            this.velocityZ = 0;
            if (this.currentIndex !== nearestIdx) {
                this.currentIndex = nearestIdx;
                this.onStationChange(nearestIdx);
            }
            this.hasLeftStation = false;
        }

        this.camera.position.z = this.baseCameraZ;

        if (this.onNearStationChange) {
            let isNearStation = (minDist < 120);
            let displayIndex = nearestIdx;

            if (this.isDirectReturn) {
                const distToFirst = Math.abs(this.baseCameraZ - this.stations[0].z);
                isNearStation = (distToFirst < 120);
                displayIndex = 0;
            }

            this.onNearStationChange(displayIndex, isNearStation);
        }

        return Math.min(Math.abs(this.velocityZ) / this.MAX_SPEED, 1.0);
    }

    get currentStationIndex(): number {
        return this.currentIndex;
    }
}
