# Guide — Disposition spatiale courbe « spatial computing »

Ce guide explique comment disposer des cartes sur les **côtés latéraux**, selon
un **arc diagonal concave** qui entoure l'utilisateur, à la manière d'un
environnement de spatial computing (fenêtres flottantes orientées vers le centre).

Le décor cosmique reste géré par **Three.js** (champ d'étoiles), tandis que les
fenêtres sont positionnées en **CSS 3D transforms** (texte net et performant).

---

## 1. Principe géométrique

On place chaque fenêtre sur un cercle dans le plan **X-Z**, centré sur
l'utilisateur. Pour une carte située à l'angle latéral `θ` :

```
theta = (t - 0.5) * 2 * maxAngle        # t ∈ [0,1] réparti sur l'arc

x     = radius * sin(theta)             # décalage latéral (gauche/droite)
z     = radius * (cos(theta) - 1)       # profondeur (≤ 0 : les côtés reculent)
yaw   = -theta (en degrés)              # rotation Y vers le centre
```

- `θ = 0` → carte centrale, face à l'utilisateur (`x = 0`, `z = 0`, `yaw = 0`).
- `θ > 0` (droite) → `x > 0`, `z < 0` (en retrait), `yaw < 0` (tournée vers la gauche).
- `θ < 0` (gauche) → `x < 0`, `z < 0`, `yaw > 0` (tournée vers la droite).

C'est le `cos(theta) - 1` qui produit la courbure concave : plus une carte est
sur le côté, plus elle est en retrait, créant l'effet « d'encercler » l'utilisateur.

---

## 2. Orientation vers le centre (signe de `rotateY`)

En CSS, `rotateY(angle)` suit la règle de la main droite (+X à droite, +Y vers le
bas, +Z vers l'observateur) :

- `rotateY(+angle)` tourne la face de la carte vers la **droite** ;
- `rotateY(-angle)` tourne la face vers la **gauche**.

Donc pour orienter chaque fenêtre vers le centre :

```js
const yaw = -theta * (180 / Math.PI);
```

Une carte à gauche (`θ < 0`) reçoit un `yaw` positif → elle regarde vers la
droite (le centre). Une carte à droite (`θ > 0`) reçoit un `yaw` négatif → elle
regarde vers la gauche. ✅

---

## 3. Transformation CSS appliquée

La fenêtre est centrée (`left/top: 50%`) puis transformée :

```js
card.style.transform =
    `translate(-50%, -50%) ` +              // centrage sur le point d'ancrage
    `translate3d(${x}px, ${y}px, ${z}px) ` + // position cartésienne X/Y/Z
    `rotateY(${yaw}deg) ` +                  // orientation vers le centre
    `rotateX(${rx}deg) ` +                   // tilt local (survol)
    `scale3d(${s}, ${s}, 1)`;                // zoom (survol)
```

---

## 4. Perspective de caméra

```css
.spatial-stage {
    perspective: 1600px;
    perspective-origin: 50% 50%;
    transform-style: preserve-3d;
}
```

`perspective` est la distance observateur → plan `Z = 0`. Une valeur trop faible
rend la courbure exagérée ; trop élevée la rend imperceptible. `1400–1800px`
convient pour un rayon d'arc de ~500px.

---

## 5. Effet de profondeur au survol

Au survol, la fenêtre **avance en Z** (effet de profondeur), s'incline vers le
curseur et zoome légèrement :

```js
state.tz = hoverDepth;  // +70px → la carte « sort » vers l'utilisateur
state.trx = -ny * hoverTilt;
state.try =  nx * hoverTilt;
state.tscale = scale;   // 1.05
```

Le tout est **lissé par lerp** dans `requestAnimationFrame` pour une inertie
naturelle :

```js
state.z += (state.tz - state.z) * 0.12;   // 0.12 = coefficient de lissage
```

Un **reflet spéculaire** (`radial-gradient`) suit le curseur, en cohérence avec
le glassmorphism.

---

## 6. Glassmorphism (partagé)

Les fenêtres réutilisent les classes `.space-window` / `.window-glare` définies
pour la grille 3D :

- fond semi-transparent dégradé ;
- `backdrop-filter: blur(16px) saturate(140%)` ;
- bordure ambiante (anneau dégradé via `mask-composite: exclude`).

---

## 7. Repli mobile

Au-dessous de `900px`, les fenêtres redeviennent une grille classique (le tilt
et la rotation Y sont désactivés) :

```css
@media (max-width: 900px) {
    .spatial-stage {
        min-height: 0;
        display: flex;
        flex-wrap: wrap;
        perspective: none;
    }
    .spatial-stage .space-window {
        position: static;
        transform: none !important;
    }
}
```

---

## 8. Réglages

```js
new SpatialLayout(document.getElementById('projects-grid'), {
    radius: 560,      // arc plus ouvert
    maxAngle: 60,     // enveloppe plus large
    hoverDepth: 90,   // avancée plus prononcée au survol
    hoverTilt: 10,
    perspective: 1500
});
```

---

## 9. Fichiers impliqués

| Fichier | Rôle |
|---------|------|
| `src/ui/SpatialLayout.js` | Positionnement X/Z, rotation Y d'orientation, profondeur au survol |
| `src/style.css` | `.spatial-stage` (perspective) + repli mobile |
| `src/main.js` | `new SpatialLayout(projectsGrid)` |
| `index.html` | Conteneur `#projects-grid` (sans grille flex) |
