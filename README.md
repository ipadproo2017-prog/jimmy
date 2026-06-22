# RTX 5090 GAMING TRIO OC — Site 3D

Site vitrine single-page en WebGL (Three.js) pour la MSI GeForce RTX 5090 32G GAMING TRIO OC.
Modèle 3D procédural (PCB, dissipateur, 3 ventilateurs TORX animés, RGB Mystic Light),
post-processing bloom néon, caméra pilotée au scroll, parallaxe souris.

## 100% autonome
Three.js et les polices sont embarqués en local (dossier `vendor/`).
**Aucune connexion internet requise.**

## Lancer le site

Les modules JavaScript imposent un petit serveur local (un double-clic sur
`index.html` ne suffira pas à cause de la politique CORS des navigateurs).

### Option A — Python (déjà installé sur Mac/Linux)
```bash
python3 -m http.server 8000
```
Puis ouvre http://localhost:8000

### Option B — VSCode (le plus simple)
1. Installe l'extension **Live Server** (Ritwick Dey)
2. Clic droit sur `index.html` → **Open with Live Server**

### Option C — Node
```bash
npx serve .
```

## Structure
```
index.html        Structure + importmap
styles.css        Design (glassmorphism, néon, responsive)
main.js           Scène 3D, animation, scroll, bloom
vendor/           Three.js + polices (local, ne pas modifier)
```

## Personnalisation rapide (dans main.js)
- Couleurs néon : constantes `NEON`, `NEON2`, `ACCENT` en haut du fichier
- Vitesse des ventilateurs : `f.userData.blades.rotation.z += dt * (6 + ...)`
- Intensité du glow : paramètres du `UnrealBloomPass`
- Trajectoire caméra au scroll : tableau `camKeys`
