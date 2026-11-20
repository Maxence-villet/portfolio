# Portfolio — Three.js (Bun + Vite + TypeScript)

Refonte du portfolio de **Maxence VILLET SCHOUMAKER** en **Three.js**, en
reprenant l'esthétique minimaliste de l'introduction de *GlobalScale* :
fond noir, champ d'étoiles 3D, voyage entre stations et typographie fine.

## Prérequis

- [Bun](https://bun.sh) (utilisé comme gestionnaire de paquets et runtime)

TypeScript est installé comme dépendance de développement, aucune installation
globale n'est nécessaire.

## Installation

```bash
bun install
```

## Développement

```bash
bun run dev
```

Le serveur de développement démarre (par défaut sur `http://localhost:5173`).

Vérification des types (sans émission de fichiers) :

```bash
bun run typecheck
```

## Build de production

```bash
bun run build
```

Le résultat est généré dans `dist/`. Pour le prévisualiser :

```bash
bun run preview
```

## Déploiement sur GitHub Pages

Le site est publié à l'adresse <https://maxence-villet.github.io/portfolio/>.

**Point important :** GitHub Pages sert le site depuis un sous-chemin
(`/portfolio/`). La `base` est donc définie dans `vite.config.ts` pour les
builds de production, et les images/données sont préfixées au runtime via
`import.meta.env.BASE_URL`. Si le dépôt est renommé, il suffit de mettre à
jour `REPO_NAME` dans `vite.config.ts`.

### Via la branche `gh-pages` (recommandé)

```bash
bun run deploy
```

La commande build le site puis publie le contenu de `dist/` sur la branche
`gh-pages`. Elle nécessite des droits de push sur le dépôt (SSH ou token
GitHub).

Ensuite, dans **Settings → Pages** du dépôt, choisir :

- **Source** : *Deploy from a branch*
- **Branch** : `gh-pages` / `/ (root)`

Après un premier déploiement, l'URL publique est disponible dans cette même
page. Chaque `bun run deploy` met le site à jour (délai de quelques minutes).

## Structure

```
portfolio-threejs/
├── index.html              # Markup des sections + overlay d'intro
├── tsconfig.json           # Configuration TypeScript (strict, noEmit)
├── vite.config.ts          # Base GitHub Pages + build
├── public/
│   ├── images/             # Visuels, projets, certificats
│   └── cv.pdf              # CV (lien depuis l'accueil)
└── src/
    ├── main.ts             # Orchestration + rendu du contenu
    ├── vite-env.d.ts       # Types Vite (import.meta.env, imports CSS)
    ├── style.css           # Style global (design minimal)
    ├── data/content.ts     # Données du portfolio + types (projets, expériences…)
    ├── core/
    │   ├── SceneManager.ts # Scène, caméra, renderer, composer
    │   └── Starfield.ts    # Champ d'étoiles multi-couches
    ├── travel/
    │   └── TravelController.ts # Déplacement entre stations (scroll/auto-pilot)
    ├── ui/
    │   └── UIManager.ts    # Sections, points de progression, labels
    └── effects/
        └── PostProcessing.ts # Bloom + afterimage
```

## Navigation

- **Scroll** (ou geste tactile) : voyager entre les stations.
- **Espace** : activer/désactiver l'auto-pilot.
- **Points à droite** : sauter directement vers une section.
