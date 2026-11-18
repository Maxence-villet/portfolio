export class UIManager {
    constructor(stationNames) {
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
        this.dots = document.querySelectorAll('.progress-dot');
        this.speedLabel = document.getElementById('speed-indicator');

        this.currentIndex = 0;

        if (this.sections.every((s) => s !== null) && this.dots.length > 0) {
            this.setActiveStation(0);
        } else {
            console.warn('UIManager: certains éléments UI sont introuvables.');
        }
    }

    setActiveStation(index) {
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

    updateSpeedLabel(index, velocityZ, autoPilot) {
        if (!this.speedLabel) return;
        const spd = Math.abs(velocityZ).toFixed(1);
        this.speedLabel.innerHTML = autoPilot
            ? `◈ AUTO-PILOT · ${spd}`
            : `◈ STATION ${index + 1} · VITESSE ${spd}`;
    }

    hideAllSections() {
        this.sections.forEach((s) => s && s.classList.remove('active'));
    }

    showSection(index) {
        if (this.sections[index]) this.sections[index].classList.add('active');
    }

    setupEventListeners(onDotClick) {
        this.dots.forEach((dot, idx) => {
            if (dot) {
                dot.addEventListener('click', () => {
                    if (onDotClick) onDotClick(idx);
                });
            }
        });
    }
}
