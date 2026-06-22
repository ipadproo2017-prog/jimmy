/**
 * Contenu éditorial du site GLÅCE.
 * Marque fictive : studio de "frozen intelligence" / ingénierie d'expériences glaciales.
 * Tous les textes sont des placeholders soignés (pas de lorem ipsum).
 */

export const brand = {
  name: "GLÅCE",
  tagline: "Frozen Intelligence",
  email: "hello@glace.studio",
};

export const nav = [
  { label: "Vision", href: "#manifesto" },
  { label: "Savoir-faire", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Écosystème", href: "#ecosystem" },
  { label: "Contact", href: "#cta" },
];

export const hero = {
  eyebrow: "Studio créatif · WebGL & IA",
  titleLines: ["NOUS", "GELONS", "LE FUTUR"],
  subtitle:
    "GLÅCE conçoit des expériences numériques cristallines — là où l'ingénierie de pointe rencontre une esthétique glaciale et intemporelle.",
  cta: "Explorer",
};

export const manifesto = {
  eyebrow: "Manifeste",
  lines: [
    "Nous croyons que la technologie",
    "doit avoir la pureté de la glace :",
    "transparente, précise,",
    "et capable de plier la lumière.",
  ],
  paragraph:
    "Chaque pixel est taillé comme un cristal. Chaque interaction se fige dans l'instant parfait. Nous ne construisons pas des sites — nous sculptons des paysages numériques qui restent gravés dans la mémoire.",
};

export const features = [
  {
    index: "01",
    title: "Direction artistique",
    body: "Identités cinématiques, systèmes visuels et univers 3D conçus pour marquer durablement.",
    tag: "Design",
  },
  {
    index: "02",
    title: "Ingénierie WebGL",
    body: "Temps réel, shaders sur-mesure et rendu 3D performant, jusqu'à 60 fps sur tous les écrans.",
    tag: "Engineering",
  },
  {
    index: "03",
    title: "Motion & scrollytelling",
    body: "Narration pilotée au scroll, transitions fluides et micro-interactions millimétrées.",
    tag: "Motion",
  },
  {
    index: "04",
    title: "Intelligence générative",
    body: "Pipelines IA intégrés pour des expériences vivantes, adaptatives et personnalisées.",
    tag: "AI",
  },
];

export const showcase = {
  eyebrow: "Showcase",
  title: "Un cristal vivant",
  steps: [
    {
      title: "Genèse",
      body: "Tout commence par un fragment. Une idée brute, anguleuse, qui capte la première lumière.",
    },
    {
      title: "Cristallisation",
      body: "La structure se forme. Les facettes s'alignent, la matière devient géométrie pure.",
    },
    {
      title: "Réfraction",
      body: "La lumière traverse, se divise, se recompose. L'objet devient une expérience.",
    },
  ],
};

export const stats = [
  { value: 120, suffix: "+", label: "Projets cristallisés" },
  { value: 18, suffix: "", label: "Récompenses internationales" },
  { value: 60, suffix: "fps", label: "Fluidité garantie" },
  { value: 9, suffix: "ans", label: "À sculpter le web" },
];

export const ecosystem = {
  eyebrow: "Écosystème",
  title: "Une constellation glaciale",
  cells: [
    {
      title: "GLÅCE Labs",
      body: "Recherche en rendu temps réel et shaders expérimentaux.",
      span: "md:col-span-2 md:row-span-2",
      accent: true,
    },
    { title: "Studio", body: "Design & direction artistique.", span: "" },
    { title: "Forge", body: "Développement front-end de précision.", span: "" },
    {
      title: "Aurora",
      body: "Notre moteur 3D propriétaire, optimisé pour le web.",
      span: "md:col-span-2",
    },
    { title: "Frost API", body: "Outils IA pour studios créatifs.", span: "" },
  ],
};

export const cta = {
  eyebrow: "Travaillons ensemble",
  title: "Donnons forme à votre prochaine ère glaciaire.",
  button: "Démarrer un projet",
};

export const footer = {
  wordmark: "GLÅCE",
  columns: [
    {
      heading: "Studio",
      links: ["Vision", "Savoir-faire", "Showcase", "Écosystème"],
    },
    {
      heading: "Social",
      links: ["Awwwards", "Behance", "Instagram", "LinkedIn"],
    },
  ],
  legal: `© ${new Date().getFullYear()} GLÅCE Studio. Conçu dans le froid.`,
};
