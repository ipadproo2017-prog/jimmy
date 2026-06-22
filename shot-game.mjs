import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle',
    '--use-angle=swiftshader', '--window-size=1280,800'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
const errors = [];
page.on('pageerror', e => errors.push('PAGEERR: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('http://localhost:8001/battle-royale/index.html', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: 'game_start.png' });
console.log('shot: start');

// Start the match
await page.click('#startBtn');
await new Promise(r => setTimeout(r, 1500));

// Simulate gameplay: move + aim + shoot for a few seconds
await page.mouse.move(900, 300);
await page.keyboard.down('d');
await page.keyboard.down('w');
for (let i = 0; i < 30; i++) {
  await page.mouse.move(700 + Math.sin(i/3)*300, 400 + Math.cos(i/3)*200);
  await page.mouse.down(); await new Promise(r => setTimeout(r, 60)); await page.mouse.up();
  await new Promise(r => setTimeout(r, 90));
}
await page.keyboard.up('d'); await page.keyboard.up('w');
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: 'game_play.png' });
console.log('shot: play');

// read live state
const state = await page.evaluate(() => ({
  alive: window.alive, kills: window.player?.kills, hp: Math.ceil(window.player?.hp),
  bullets: window.bullets?.length, players: window.players?.length,
}));
console.log('STATE:', JSON.stringify(state));
console.log('ERRORS:', errors.length ? errors.join(' | ') : 'none');
await browser.close();
