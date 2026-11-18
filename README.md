# Portfolio — Three.js (Bun + Vite)

Refonte du portfolio de **Maxence VILLET SCHOUMAKER** en **Three.js**, en
reprenant l'esthétique minimaliste de l'introduction de *GlobalScale* :
fond noir, champ d'étoiles 3D, voyage entre stations et typographie fine.

## Prérequis

- [Bun](https://bun.sh) (utilisé comme gestionnaire de paquets et runtime)

## Installation

```bash
bun install
```

## Développement

```bash
bun run dev
```

Le serveur de développement démarre (par défaut sur `http://localhost:5173`).

## Build de production

```bash
bun run build
```

Le résultat est généré dans `dist/`. Pour le prévisualiser :

```bash
bun run preview
```

## Structure

```
portfolio-threejs/
├── index.html              # Markup des sections + overlay d'intro
├── public/
│   ├── images/             # Visuels, projets, certificats
│   └── cv.html             # Page CV (lien depuis l'accueil)
└── src/
    ├── main.js             # Orchestration + rendu du contenu
    ├── style.css           # Style global (design minimal)
    ├── data/content.js     # Données du portfolio (projets, expériences…)
    ├── core/
    │   ├── SceneManager.js # Scène, caméra, renderer, composer
    │   └── Starfield.js    # Champ d'étoiles multi-couches
    ├── travel/
    │   └── TravelController.js # Déplacement entre stations (scroll/auto-pilot)
    ├── ui/
    │   └── UIManager.js    # Sections, points de progression, labels
    └── effects/
        └── PostProcessing.js # Bloom + afterimage
```

## Navigation

- **Scroll** (ou geste tactile) : voyager entre les stations.
- **Espace** : activer/désactiver l'auto-pilot.
- **Points à droite** : sauter directement vers une section.
