import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const NEON = 0x00e5ff;
const NEON2 = 0x7a3cff;
const ACCENT = 0xff1f4b;

// ---------- Renderer ----------
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x04060a, 0.012);

const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 200);
camera.position.set(0, 1.5, 16);

// environment for nice metal reflections
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

// ---------- Lights ----------
scene.add(new THREE.AmbientLight(0x223044, 0.6));
const key = new THREE.DirectionalLight(0xffffff, 2.0);
key.position.set(6, 10, 8);
scene.add(key);
const rimA = new THREE.PointLight(NEON, 90, 60);
rimA.position.set(-8, 2, 6);
scene.add(rimA);
const rimB = new THREE.PointLight(NEON2, 80, 60);
rimB.position.set(9, -3, 4);
scene.add(rimB);
const under = new THREE.PointLight(ACCENT, 40, 40);
under.position.set(0, -5, 3);
scene.add(under);

// ---------- GPU model ----------
const gpu = new THREE.Group();
scene.add(gpu);

const matShroud = new THREE.MeshStandardMaterial({ color: 0x0c0f15, metalness: 0.85, roughness: 0.42 });
const matDark   = new THREE.MeshStandardMaterial({ color: 0x05070b, metalness: 0.6, roughness: 0.6 });
const matMetal  = new THREE.MeshStandardMaterial({ color: 0x1a2330, metalness: 0.95, roughness: 0.25 });
const matPCB    = new THREE.MeshStandardMaterial({ color: 0x07120c, metalness: 0.4, roughness: 0.7 });
const matNeon   = new THREE.MeshStandardMaterial({ color: NEON, emissive: NEON, emissiveIntensity: 3.2, metalness: 0.3, roughness: 0.4 });
const matNeon2  = new THREE.MeshStandardMaterial({ color: NEON2, emissive: NEON2, emissiveIntensity: 2.6, metalness: 0.3, roughness: 0.4 });
const matAccent = new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 2.4, metalness: 0.3, roughness: 0.4 });

const CARD_W = 11, CARD_H = 4.6, CARD_D = 2.4;

// PCB base
const pcb = new THREE.Mesh(new THREE.BoxGeometry(CARD_W, CARD_H * 0.78, 0.35), matPCB);
pcb.position.z = -CARD_D / 2 + 0.2;
gpu.add(pcb);

// Heatsink fin block (behind shroud)
const finMat = matMetal;
for (let i = 0; i < 26; i++) {
  const fin = new THREE.Mesh(new THREE.BoxGeometry(CARD_W * 0.94, CARD_H * 0.72, 0.05), finMat);
  fin.position.z = -CARD_D / 2 + 0.45 + i * 0.055;
  gpu.add(fin);
}

// Main shroud (front cover) with angular bevels
const shroud = new THREE.Mesh(new THREE.BoxGeometry(CARD_W, CARD_H, CARD_D * 0.55), matShroud);
shroud.position.z = CARD_D * 0.22;
gpu.add(shroud);

// Angular accent cuts on shroud
const cutGeo = new THREE.BoxGeometry(2.4, 0.16, 0.05);
for (let i = 0; i < 3; i++) {
  const cut = new THREE.Mesh(cutGeo, i === 1 ? matNeon : matMetal);
  cut.position.set(-CARD_W / 2 + 1.6 + i * 0.2, CARD_H / 2 - 0.45 - i * 0.35, CARD_D * 0.22 + CARD_D * 0.276);
  cut.rotation.z = -0.32;
  gpu.add(cut);
}

// ---- Three TORX fans ----
const fans = [];
function buildFan(x) {
  const fanGroup = new THREE.Group();
  fanGroup.position.set(x, 0, CARD_D * 0.22 + CARD_D * 0.276 + 0.02);

  // fan ring / housing
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.12, 16, 60), matMetal);
  fanGroup.add(ring);

  // hub
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.28, 32), matDark);
  hub.rotation.x = Math.PI / 2;
  fanGroup.add(hub);
  const logo = new THREE.Mesh(new THREE.CircleGeometry(0.3, 32), matAccent);
  logo.position.z = 0.15;
  fanGroup.add(logo);

  // blades
  const blades = new THREE.Group();
  const bladeGeo = new THREE.BoxGeometry(1.18, 0.5, 0.045);
  bladeGeo.translate(0.62, 0, 0);
  for (let b = 0; b < 9; b++) {
    const blade = new THREE.Mesh(bladeGeo, matShroud);
    blade.rotation.z = (b / 9) * Math.PI * 2;
    blade.rotation.y = 0.45;
    blades.add(blade);
  }
  fanGroup.add(blades);
  fanGroup.userData.blades = blades;
  fanGroup.userData.dir = x === 0 ? -1 : 1;
  gpu.add(fanGroup);
  fans.push(fanGroup);
}
const fanSpacing = 3.45;
buildFan(-fanSpacing);
buildFan(0);
buildFan(fanSpacing);

// RGB Mystic Light strip along the top edge
const stripGeo = new THREE.BoxGeometry(CARD_W * 0.96, 0.12, 0.12);
const strip = new THREE.Mesh(stripGeo, matNeon);
strip.position.set(0, CARD_H / 2 + 0.02, CARD_D * 0.22 + 0.1);
gpu.add(strip);

// Side "GEFORCE RTX" glowing bar (right edge)
const sideBar = new THREE.Mesh(new THREE.BoxGeometry(0.12, CARD_H * 0.6, 0.12), matNeon2);
sideBar.position.set(CARD_W / 2 + 0.02, 0, CARD_D * 0.22);
gpu.add(sideBar);

// Backplate
const backplate = new THREE.Mesh(new THREE.BoxGeometry(CARD_W, CARD_H, 0.18), matMetal);
backplate.position.z = -CARD_D / 2;
gpu.add(backplate);
// backplate cutout glow
const bpGlow = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.2), matNeon);
bpGlow.position.set(CARD_W / 2 - 2, -0.3, -CARD_D / 2 - 0.1);
bpGlow.rotation.y = Math.PI;
gpu.add(bpGlow);

// PCIe connector tab
const tab = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.5, 0.12), new THREE.MeshStandardMaterial({ color: 0xc9a227, metalness: 1, roughness: 0.3 }));
tab.position.set(-CARD_W / 2 + 2.2, -CARD_H / 2 - 0.3, -CARD_D / 2 + 0.25);
gpu.add(tab);

// 16-pin power connector glow
const power = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.5, 0.4), matDark);
power.position.set(CARD_W / 2 - 2.4, CARD_H / 2 + 0.1, 0);
gpu.add(power);

gpu.rotation.y = -0.5;
gpu.rotation.x = 0.12;

// ---------- Particle field ----------
const pCount = 1400;
const pPos = new Float32Array(pCount * 3);
const pCol = new Float32Array(pCount * 3);
const cA = new THREE.Color(NEON), cB = new THREE.Color(NEON2);
for (let i = 0; i < pCount; i++) {
  pPos[i * 3]     = (Math.random() - 0.5) * 70;
  pPos[i * 3 + 1] = (Math.random() - 0.5) * 45;
  pPos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10;
  const c = Math.random() > 0.5 ? cA : cB;
  pCol[i * 3] = c.r; pCol[i * 3 + 1] = c.g; pCol[i * 3 + 2] = c.b;
}
const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
  size: 0.08, vertexColors: true, transparent: true, opacity: 0.85,
  blending: THREE.AdditiveBlending, depthWrite: false,
}));
scene.add(particles);

// ground reflection glow plane
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(120, 120),
  new THREE.MeshStandardMaterial({ color: 0x02040a, metalness: 0.9, roughness: 0.35 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -6;
scene.add(floor);

// ---------- Post-processing (bloom) ----------
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.9, 0.6, 0.2);
composer.addPass(bloom);

// ---------- Controls ----------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = false;
controls.minPolarAngle = Math.PI * 0.28;
controls.maxPolarAngle = Math.PI * 0.72;
controls.target.set(0, 0, 0);

// pointer parallax
let pointer = { x: 0, y: 0 };
addEventListener('pointermove', (e) => {
  pointer.x = (e.clientX / innerWidth - 0.5) * 2;
  pointer.y = (e.clientY / innerHeight - 0.5) * 2;
});

// ---------- Scroll-driven camera ----------
let scrollT = 0;
function onScroll() {
  const max = document.body.scrollHeight - innerHeight;
  scrollT = max > 0 ? scrollY / max : 0;
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// keyframes for camera position based on scroll (0..1)
const camKeys = [
  { t: 0.0,  pos: new THREE.Vector3(0, 1.5, 16),   rotY: -0.5 },
  { t: 0.33, pos: new THREE.Vector3(-7, 1.0, 11),  rotY: 0.4  },
  { t: 0.66, pos: new THREE.Vector3(7, 2.5, 12),   rotY: 1.3  },
  { t: 1.0,  pos: new THREE.Vector3(0, 0.5, 9),    rotY: 2.4  },
];
function sampleCam(t) {
  for (let i = 0; i < camKeys.length - 1; i++) {
    const a = camKeys[i], b = camKeys[i + 1];
    if (t >= a.t && t <= b.t) {
      const k = (t - a.t) / (b.t - a.t);
      const e = k * k * (3 - 2 * k); // smoothstep
      return {
        pos: a.pos.clone().lerp(b.pos, e),
        rotY: a.rotY + (b.rotY - a.rotY) * e,
      };
    }
  }
  return { pos: camKeys[camKeys.length - 1].pos.clone(), rotY: camKeys[camKeys.length - 1].rotY };
}

// ---------- Animate ----------
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  const t = clock.elapsedTime;

  // fans spin
  fans.forEach((f, i) => { f.userData.blades.rotation.z += dt * (6 + i * 0.6) * f.userData.dir; });

  // RGB cycle on strips
  const hue = (t * 0.06) % 1;
  const cycle = new THREE.Color().setHSL(hue, 1, 0.55);
  strip.material.emissive.copy(cycle);
  sideBar.material.emissive.copy(new THREE.Color().setHSL((hue + 0.5) % 1, 1, 0.55));
  bpGlow.material.emissive.copy(cycle);

  // particles drift
  particles.rotation.y += dt * 0.02;
  particles.position.y = Math.sin(t * 0.3) * 0.5;

  // scroll camera blend + pointer parallax
  const ck = sampleCam(scrollT);
  camera.position.lerp(ck.pos, 0.05);
  gpu.rotation.y += ((ck.rotY) - gpu.rotation.y) * 0.04;
  gpu.rotation.x += ((0.12 + pointer.y * 0.15) - gpu.rotation.x) * 0.05;
  gpu.position.y = Math.sin(t * 0.6) * 0.18; // float

  // subtle light motion
  rimA.position.x = Math.sin(t * 0.5) * 8;
  rimB.position.x = Math.cos(t * 0.4) * 9;

  controls.target.lerp(new THREE.Vector3(pointer.x * 0.6, pointer.y * -0.4, 0), 0.05);
  controls.update();
  composer.render();
}

// ---------- Resize ----------
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
});

// ---------- Loader + scroll reveals + counters ----------
function startUI() {
  // reveal panels
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        if (en.target.dataset.counted !== '1') runCounters(en.target);
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.panel-inner').forEach((p) => io.observe(p));

  function runCounters(scope) {
    scope.dataset.counted = '1';
    scope.querySelectorAll('.stat-num').forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const dur = 1400; const start = performance.now();
      function tick(now) {
        const k = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - k, 3);
        const val = Math.floor(target * e);
        el.textContent = val.toLocaleString('fr-FR') + suffix;
        if (k < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString('fr-FR') + suffix;
      }
      requestAnimationFrame(tick);
    });
  }
}

// fake-ish progressive loader tied to first render
const loader = document.getElementById('loader');
const loadPct = document.getElementById('loadPct');
let pct = 0;
const li = setInterval(() => {
  pct = Math.min(100, pct + Math.random() * 18);
  loadPct.textContent = Math.floor(pct);
  if (pct >= 100) {
    clearInterval(li);
    setTimeout(() => { loader.classList.add('hidden'); startUI(); }, 350);
  }
}, 120);

animate();
