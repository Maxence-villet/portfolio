import './style.css';

import { SceneManager } from './core/SceneManager.js';
import { Starfield } from './core/Starfield.js';
import {
    STATIONS,
    STATION_NAMES,
    PROJECTS,
    EXPERIENCES,
    SOFT_SKILLS,
    CERTIFICATES
} from './data/content.js';
import { UIManager } from './ui/UIManager.js';
import { TravelController } from './travel/TravelController.js';
import { PostProcessing } from './effects/PostProcessing.js';
import type { ProjectLink } from './data/content.js';

// Préfixe les fichiers de public/ avec la base Vite ('/portfolio/' sur
// GitHub Pages, '/' en développement).
const asset = (path: string): string =>
    `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const ESCAPE_MAP: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

function escapeHtml(value: string): string {
    return String(value).replace(/[&<>"']/g, (c) => ESCAPE_MAP[c] ?? c);
}

function renderLinks(links: ProjectLink[]): string {
    return links
        .map((l) => `<a href="${escapeHtml(l.href)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`)
        .join('');
}

function renderProjects(): void {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = PROJECTS.map((p) => `
        <div class="card">
            <img class="card-thumb" src="${escapeHtml(asset(p.image))}" alt="${escapeHtml(p.title)}">
            <div class="card-body">
                <h3>${escapeHtml(p.title)}</h3>
                <p>${escapeHtml(p.description)}</p>
                <div class="links">${renderLinks(p.links)}</div>
            </div>
        </div>
    `).join('');
}

function renderExperiences(): void {
    const grid = document.getElementById('experiences-grid');
    if (!grid) return;

    grid.innerHTML = EXPERIENCES.map((x) => `
        <div class="card xp-card">
            ${x.image ? `<span class="card-thumb-frame"><img class="card-thumb" src="${escapeHtml(asset(x.image))}" alt="${escapeHtml(x.title)}"></span>` : ''}
            <div class="card-body">
                <h3>${escapeHtml(x.title)}</h3>
                <p class="muted">${escapeHtml(x.subtitle)}</p>
                <div class="badges">
                    <span>${escapeHtml(x.contract)}</span>
                    <span>${escapeHtml(x.period)}</span>
                </div>
                <p>${escapeHtml(x.description)}</p>
            </div>
        </div>
    `).join('');
}

function renderSkills(): void {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    grid.innerHTML = SOFT_SKILLS.map((s) => `
        <div class="card skill-card">
            <div class="card-body">
                <h3>${escapeHtml(s.title)}</h3>
                <p>${escapeHtml(s.description)}</p>
            </div>
        </div>
    `).join('');
}

function renderCertificates(): void {
    const container = document.getElementById('certificates-logos');
    if (!container) return;

    const imgs = CERTIFICATES
        .map((src) => `<img src="${escapeHtml(asset(src))}" alt="Certificat" loading="lazy">`)
        .join('');
    container.innerHTML = `<div class="logo-slide">${imgs}</div><div class="logo-slide">${imgs}</div>`;
}

// Initialisation
const sceneManager = new SceneManager();
const { scene, camera, composer } = sceneManager;

const starfield = new Starfield(scene);
const uiManager = new UIManager(STATION_NAMES);
const travel = new TravelController(
    STATIONS,
    camera,
    (index) => uiManager.setActiveStation(index)
);

// Affiche la station 1 au démarrage
travel.jumpToStation(0);
uiManager.setActiveStation(0);

travel.onNearStationChange = (nearestIdx, isNear) => {
    uiManager.hideAllSections();
    if (isNear) {
        uiManager.showSection(nearestIdx);
    }
};

uiManager.setupEventListeners((index) => {
    travel.jumpToStation(index);
});

const postProcessing = new PostProcessing(composer);

// Rendu du contenu
renderProjects();
renderExperiences();
renderSkills();
renderCertificates();

// CTA depuis l'accueil vers les projets
const projectsCta = document.getElementById('projects-cta');
if (projectsCta) {
    projectsCta.addEventListener('click', () => travel.jumpToStation(2));
}

let lastTime = performance.now();
let animationStarted = false;

function animate(): void {
    requestAnimationFrame(animate);

    if (!animationStarted) return;

    const now = performance.now();
    const speedFactor = travel.update(now, lastTime);
    lastTime = now;

    starfield.updateParallax(camera.position.z);
    starfield.rotate(0.00015, 0.0001);

    uiManager.updateSpeedLabel(
        travel.currentStationIndex,
        travel.velocityZ,
        travel.autoPilot
    );

    postProcessing.update(speedFactor);
    composer.render();
}

animate();

window.addEventListener('resize', () => sceneManager.onResize());

// Overlay d'introduction
const overlay = document.getElementById('intro-overlay');
const enterBtn = document.getElementById('enter-btn');

function startExperience(): void {
    if (overlay) {
        overlay.style.opacity = '0';
    }
    setTimeout(() => {
        if (overlay) overlay.style.display = 'none';
    }, 1000);

    animationStarted = true;

    setTimeout(() => {
        travel.velocityZ = -1.2;
        travel.isScrolling = false;
    }, 300);
}

if (enterBtn) {
    enterBtn.addEventListener('click', startExperience);
}

console.log('◈ Portfolio · Cliquez sur Entrer pour commencer');
