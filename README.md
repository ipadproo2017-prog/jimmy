# GLÅCE — Frozen Intelligence ❄

Site one-page **ultra design, immersif et cinématique** dans l'esprit de
[igloo.inc](https://www.igloo.inc/). Ambiance glaciale et futuriste, objet 3D
signature réactif au scroll et à la souris, scrollytelling, glassmorphism et
micro-interactions.

> Marque fictive de démonstration : un studio créatif WebGL & IA.

## ✨ Caractéristiques

- **Smooth scroll inertiel** (Lenis) synchronisé avec **GSAP ScrollTrigger**
- **Objet 3D signature** : cristal de glace en verre dépoli (React Three Fiber +
  drei `MeshTransmissionMaterial`), qui tourne, réagit à la souris et évolue
  selon la progression du scroll
- **Post-processing** cinématique : bloom + vignette
- **Scrollytelling** : section *Showcase* épinglée (pin) avec étapes en crossfade
- **Manifeste** révélé ligne par ligne au scroll (scrub)
- **Préloader** animé (compteur %, reveal par rideau)
- **Curseur magnétique** personnalisé + **boutons magnétiques**
- **Compteurs animés**, **grille bento**, cartes en glass avec tilt 3D
- **Grain / noise** subtil en overlay

## 🧱 Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) + ScrollTrigger
- [Lenis](https://github.com/darkroomengineering/lenis) (smooth scroll)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) + [postprocessing](https://github.com/pmndrs/react-postprocessing)
- [Framer Motion](https://www.framer.com/motion/)

## 🚀 Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de production :

```bash
npm run build
npm start
```

## ⚡ Performance & accessibilité

- **3D adaptative** : DPR plafonné, `AdaptiveDpr`, `Preload` des assets.
- **Dégradation propre** : sur mobile, machines faibles ou
  `prefers-reduced-motion`, la 3D est remplacée par un halo CSS léger et les
  animations sont neutralisées.
- `prefers-reduced-motion` respecté partout (Lenis, GSAP, compteurs, framer-motion).
- Focus visibles, `aria-label`, contrastes élevés, navigation clavier.
- `will-change` ciblé pour viser **60 fps**.

## 📂 Architecture

```
app/
  layout.tsx          # fonts, métadonnées, overlay noise
  page.tsx            # assemblage + import dynamique de la 3D (ssr:false)
  globals.css         # base Tailwind, utilitaires glass/glow, reduced-motion
components/
  SmoothScroll.tsx    # Lenis ↔ GSAP ScrollTrigger
  CustomCursor.tsx    # curseur point + anneau inertiel
  MagneticButton.tsx  # bouton/lien magnétique
  Preloader.tsx       # préloader + reveal
  Navbar.tsx          # nav glass + menu mobile
  Reveal.tsx          # helper reveal au viewport
  three/
    Scene.tsx         # Canvas R3F + post-processing + fallback
    IceCrystal.tsx    # objet 3D signature
  sections/
    Hero.tsx Manifesto.tsx Features.tsx Showcase.tsx
    Stats.tsx Ecosystem.tsx CTA.tsx Footer.tsx
data/
  content.ts          # tout le contenu éditorial (FR)
lib/
  useScrollStore.ts   # progression de scroll partagée DOM ↔ 3D
```

## 🎨 Personnalisation

- **Couleurs / typo** : `tailwind.config.ts` (palette `glacier`, `frost`, `cyan.glow`).
- **Contenu** : `data/content.ts`.
- **Objet 3D** : `components/three/IceCrystal.tsx` (géométrie, matériau, animation).
