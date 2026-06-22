import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  args: [
    '--no-sandbox',
    '--enable-unsafe-swiftshader',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--ignore-gpu-blocklist',
    '--enable-webgl',
    '--window-size=1600,1000',
  ],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1.5 });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERR: ' + e.message));

await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle2', timeout: 60000 });

// wait for loader to disappear (render started)
await page.waitForFunction(() => document.getElementById('loader')?.classList.contains('hidden'), { timeout: 30000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 2500)); // let fans spin / bloom settle

const max = await page.evaluate(() => document.body.scrollHeight - innerHeight);
const shots = [
  { name: 'hero',    y: 0 },
  { name: 'perf',    y: Math.round(max * 0.33) },
  { name: 'specs',   y: Math.round(max * 0.62) },
  { name: 'cta',     y: Math.round(max * 1.0) },
];

for (const s of shots) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), s.y);
  await new Promise((r) => setTimeout(r, 2200)); // camera lerp + reveals
  await page.screenshot({ path: `render_${s.name}.png` });
  console.log('shot:', s.name);
}

console.log('ERRORS:', errors.length ? errors.join('\n') : 'none');
await browser.close();
