export type DotClickHandler = (index: number) => void;

export class UIManager {
    private readonly stationNames: readonly string[];
    private readonly sections: (HTMLElement | null)[];
    private readonly dots: NodeListOf<HTMLElement>;
    private readonly speedLabel: HTMLElement | null;

    currentIndex = 0;

    constructor(stationNames: readonly string[]) {
        this.stationNames = stationNames;
        this.sections = [
            document.getElementById('section-1'),
            document.getElementById('section-2'),
            document.getElementById('section-3'),
            document.getElementById('section-4'),
            document.getElementById('section-5'),
            document.getElementById('section-6'),
            document.getElementById('section-7')
        ];
        this.dots = document.querySelectorAll<HTMLElement>('.progress-dot');
        this.speedLabel = document.getElementById('speed-indicator');

        if (this.sections.every((s) => s !== null) && this.dots.length > 0) {
            this.setActiveStation(0);
        } else {
            console.warn('UIManager: certains éléments UI sont introuvables.');
        }
    }

    setActiveStation(index: number): void {
        if (!this.sections[index] || !this.dots[index]) return;

        this.sections.forEach((s, i) => {
            if (s) s.classList.toggle('active', i === index);
        });
        this.dots.forEach((d, i) => {
            if (d) d.classList.toggle('active', i === index);
        });
        this.currentIndex = index;
        if (this.speedLabel) {
            this.speedLabel.innerHTML = `◈ STATION ${index + 1} · ${this.stationNames[index]}`;
        }
    }

    updateSpeedLabel(index: number, velocityZ: number, autoPilot: boolean): void {
        if (!this.speedLabel) return;
        const spd = Math.abs(velocityZ).toFixed(1);
        this.speedLabel.innerHTML = autoPilot
            ? `◈ AUTO-PILOT · ${spd}`
            : `◈ STATION ${index + 1} · VITESSE ${spd}`;
    }

    hideAllSections(): void {
        this.sections.forEach((s) => s && s.classList.remove('active'));
    }

    showSection(index: number): void {
        const section = this.sections[index];
        if (section) section.classList.add('active');
    }

    setupEventListeners(onDotClick?: DotClickHandler): void {
        this.dots.forEach((dot, idx) => {
            if (dot) {
                dot.addEventListener('click', () => {
                    if (onDotClick) onDotClick(idx);
                });
            }
        });
    }
}
