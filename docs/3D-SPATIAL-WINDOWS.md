# Guide — Fenêtres spatiales 3D pour portfolio

Ce guide explique comment créer une interface de **fenêtres spatiales immersives**
sur fond cosmique : des cartes (projets, expériences, soft skills, contact)
disposées dans un **repère cartésien 3D** avec profondeur sur l'axe Z, un rendu
**glassmorphism** et un **tilt au survol** piloté par la souris.

La solution combine :

- **Three.js** pour le décor (champ d'étoiles, caméra, post-processing) ;
- **CSS 3D transforms** pour les fenêtres interactives (plus performant et plus
  lisible que de rendre le texte en WebGL).

---

## 1. Architecture

```
┌─────────────────────────────────────────────┐
│  Three.js (arrière-plan)                    │
│  - PerspectiveCamera                        │
│  - Starfield (points + sprites)             │
│  - EffectComposer (bloom, afterimage)       │
├─────────────────────────────────────────────┤
│  DOM 3D (premier plan)                      │
│  .space-stage   → perspective + preserve-3d │
│   └ .space-window → translateZ (profondeur) │
│                    rotateX/rotateY (tilt)   │
│                    glare (reflet)           │
└─────────────────────────────────────────────┘
```

Les fenêtres ne sont **pas** rendues en WebGL : on utilise la perspective CSS,
ce qui garde le texte net, sélectionnable et accessible, tout en conservant la
cohérence visuelle avec le fond Three.js.

---

## 2. Perspective de caméra

### Côté Three.js

```js
this.camera = new THREE.PerspectiveCamera(
    70,                                   // champ de vision vertical (fov)
    window.innerWidth / window.innerHeight, // ratio d'aspect
    0.1,                                  // plan proche (near)
    10000                                 // plan lointain (far)
);
this.camera.position.set(0, 0, 200);
```

### Côté CSS

La **perspective CSS** joue le même rôle que la distance focale d'une caméra
perspective : c'est la distance entre l'observateur et le plan `Z = 0`.

```css
.space-stage {
    perspective: 1200px;       /* distance caméra → plan Z=0 */
    transform-style: preserve-3d;
}
```

**Règle pratique** : plus `perspective` est petite, plus la déformation est
dramatique (grand-angle). Une valeur de `900–1400px` donne un relief naturel
pour des cartes de ~230px de large.

---

## 3. Repère cartésien et profondeur Z

Chaque fenêtre reçoit une profondeur via `translateZ`, exposée par une variable
CSS `--depth` :

```css
.space-window {
    transform: translateZ(var(--depth)) rotateX(var(--rx)) rotateY(var(--ry));
}
```

La profondeur est répartie en **arc symétrique** : les cartes centrales
flottent vers l'avant (Z positif), les bords restent en retrait.

```js
const t = index / Math.max(total - 1, 1);
const depth = Math.round(min + (max - min) * Math.sin(t * Math.PI));
```

> Avec `perspective: 1200px` et `depth: 140px`, une carte avancée apparaît
> environ `1200 / (1200 - 140) ≈ 1,13` fois plus grande qu'une carte en retrait.

---

## 4. Glassmorphism

Le verre dépoli repose sur trois ingrédients :

1. **Fond semi-transparent** (dégradé subtil) ;
2. **`backdrop-filter: blur()`** pour flouter ce qui se trouve derrière ;
3. **Bordure lumineuse ambiante** (anneau dégradé).

```css
.space-window {
    background: linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.09),
        rgba(255, 255, 255, 0.02) 45%,
        rgba(18, 20, 40, 0.32)
    );
    backdrop-filter: blur(16px) saturate(140%);
    border: 1px solid rgba(255, 255, 255, 0.14);
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.12),
        0 24px 48px -24px rgba(0, 0, 0, 0.75),
        0 0 44px rgba(120, 140, 255, 0.08);
}
```

### Bordure ambiante (anneau dégradé)

On utilise un pseudo-élément `::before` avec `padding: 1px` et un masque qui ne
laisse visible que la fine couronne :

```css
.space-window::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.4),
        rgba(255, 255, 255, 0.04) 40%,
        rgba(130, 150, 255, 0.4)
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    pointer-events: none;
}
```

---

## 5. Tilt au survol piloté par la souris

### Principe mathématique

À chaque `mousemove` sur une carte, on normalise la position du curseur dans
l'intervalle `[-1, 1]` par rapport au centre de la carte :

```js
const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1..1
const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1..1
```

On en déduit la rotation cible :

```js
target.rotateY = nx * maxTilt;  // mouvement horizontal → rotation Y
target.rotateX = -ny * maxTilt; // mouvement vertical   → rotation X
```

Le signe négatif sur `rotateX` est important : déplacer la souris vers le bas
doit faire « pencher » le haut de la carte vers l'observateur.

### Lissage « physique » (inertie)

Au lieu d'appliquer directement la cible, on interpole (lerp) chaque image dans
une boucle `requestAnimationFrame`. Cela crée une inertie douce et évite les
sauts :

```js
current.rx += (target.rx - current.rx) * 0.12;
```

`0.12` est le coefficient de lissage (plus petit = plus d'inertie).

### Reflet spéculaire (glare)

Un calque `radial-gradient` suit le curseur pour simuler un reflet de lumière :

```js
glare.style.background =
    `radial-gradient(circle at ${gx}% ${gy}%, ` +
    `rgba(255,255,255,0.18) 0%, transparent 60%)`;
```

---

## 6. Parallaxe globale

En complément du tilt local, la **scène entière** se déplace légèrement selon la
position de la souris dans la fenêtre, renforçant la sensation de profondeur :

```js
this.container.style.transform =
    `translate3d(${px}px, ${py}px, 0)`;
```

---

## 7. Application à chaque section

La classe `TiltEffect` est **réutilisable** : on l'instancie sur n'importe quel
conteneur dont les enfants directs sont des cartes.

```js
import { TiltEffect } from './ui/TiltEffect.js';

const sections = [
    'projects-grid',     // 5 projets
    'experiences-grid',  // 7 expériences
    'skills-grid',       // 6 soft skills
    'contact-stage'      // 6 cartes de contact
];

sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.children.length) new TiltEffect(el);
});
```

### Réglages par section

```js
new TiltEffect(document.getElementById('projects-grid'), {
    maxTilt: 14,        // projets : inclinaison plus marquée
    depthRange: [0, 180],
    glareOpacity: 0.22
});

new TiltEffect(document.getElementById('skills-grid'), {
    maxTilt: 8,         // soft skills : mouvement plus discret
    depthRange: [0, 80],
    scale: 1.03
});
```

---

## 8. Performances et accessibilité

- **`prefers-reduced-motion`** : désactiver le tilt pour les utilisateurs qui le
  demandent (voir `destroy()`).
- **`will-change: transform`** : promouvoir les cartes animées sur leur propre
  calque GPU (à utiliser avec parcimonie).
- **Nombre de calques** : chaque carte animée = 1 calque compositeur. ~25 cartes
  est raisonnable ; au-delà, réduire `will-change` ou le nombre de cartes.
- **Tactile** : le tilt est inutile au toucher ; on peut ne l'activer qu'en
  présence d'un pointeur fin (`@media (hover: hover)`).

```js
// Exemple : ne pas activer sur appareil tactile
if (window.matchMedia('(hover: hover)').matches) {
    new TiltEffect(el);
}
```

---

## 9. Fichiers impliqués

| Fichier | Rôle |
|---------|------|
| `src/ui/TiltEffect.js` | Moteur 3D réutilisable (profondeur, tilt, glare, parallaxe) |
| `src/style.css` | `.space-stage`, `.space-window`, `.window-glare`, bordures ambiantes |
| `src/main.js` | Instanciation de `TiltEffect` sur chaque section |
| `index.html` | Conteneurs `card-grid` + cartes de contact |
