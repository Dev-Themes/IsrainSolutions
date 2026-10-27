/* Original motion-design product ads. All inputs and outputs stay in this repo.
 * No stock video, remote requests, external fonts or rendering service required.
 * Run: node scripts/render-product-ads.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));

const root = path.resolve(scriptDirectory, "..");
const output = path.join(root, "public", "videos");
const profile = path.join(root, ".animation-review", "ad-render-profile");
const font = fs.readFileSync(path.join(root, "src/fonts/Geist-Latin-Variable.woff2")).toString("base64");
const concepts = [
  { slug: "aura-skin", brand: "AURA SKIN", width: 1280, height: 720, ink: "#f6f1e5", paper: "#e9e5d8", accent: "#f87966", dark: "#343c31", headline: ["A softer kind", "of ritual."], detail: ["Make space", "for yourself."], eyebrow: "THE EVERYDAY, REIMAGINED", cta: "DISCOVER YOUR RITUAL" },
  { slug: "soniq-lab", brand: "SONIQ LAB", width: 720, height: 960, ink: "#fffdfc", paper: "#172aef", accent: "#f87966", dark: "#111520", headline: ["Find your", "frequency."], detail: ["Less noise.", "More you."], eyebrow: "A MOMENT OF YOUR OWN", cta: "MEET YOUR NEXT LISTEN" },
  { slug: "noir-edition", brand: "NOIR ÉDITION", width: 1280, height: 720, ink: "#f6e7bd", paper: "#191715", accent: "#d5b777", dark: "#11100e", headline: ["Leave an", "impression."], detail: ["A presence.", "Not a word."], eyebrow: "THE SHAPE OF SCENT", cta: "DISCOVER NOIR ÉDITION" },
];

async function render(context, concept) {
  const page = await context.newPage();
  await page.setViewportSize({ width: concept.width, height: concept.height });
  await page.route("**/*", route => route.abort());
  const image = suffix => `data:image/webp;base64,${fs.readFileSync(path.join(root, "public/images/products", `${concept.slug}${suffix}.webp`)).toString("base64")}`;
  await page.setContent('<html><body style="margin:0"><canvas></canvas></body></html>');
  await page.evaluate(async ({ concept: ad, cover, detail, font }) => {
    const face = new FontFace("AdGeist", `url(data:font/woff2;base64,${font})`);
    await face.load(); document.fonts.add(face);
    const images = await Promise.all([cover, detail].map(src => new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = src; })));
    const canvas = document.querySelector("canvas");
    const W = canvas.width = ad.width, H = canvas.height = ad.height;
    const ctx = canvas.getContext("2d", { alpha: false });
    const portrait = H > W;
    const pad = portrait ? 44 : 64;
    const ease = (t, a, b) => { const x = Math.min(1, Math.max(0, (t - a) / (b - a))); return x * x * (3 - 2 * x); };
    function photo(img, x, y, w, h, zoom = 1, drift = 0) {
      ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
      const scale = Math.max(w / img.width, h / img.height) * zoom;
      ctx.drawImage(img, x + (w - img.width * scale) / 2 + drift, y + (h - img.height * scale) / 2, img.width * scale, img.height * scale);
      ctx.restore();
    }
    function text(value, x, y, size, color, weight = 500) {
      ctx.fillStyle = color; ctx.font = `${weight} ${size}px AdGeist, sans-serif`; ctx.fillText(value, x, y);
    }
    function headline(lines, y, time, color = ad.ink, size = portrait ? 78 : 82) {
      lines.forEach((line, i) => {
        const amount = ease(time, i * .13, .7 + i * .13);
        ctx.save(); ctx.globalAlpha = amount;
        text(line, pad, y + i * size * .98 + (1 - amount) * 30, size, color);
        ctx.restore();
      });
    }
    function draw(t) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = ad.dark; ctx.fillRect(0, 0, W, H);
      const transition = ease(t, 3.1, 3.8);
      photo(images[0], 0, 0, W, H, 1.02 + t * .007, Math.sin(t * .35) * 7);
      if (transition > 0) {
        ctx.save(); ctx.beginPath(); ctx.rect(W * (1 - transition), 0, W * transition, H); ctx.clip();
        photo(images[1], 0, 0, W, H, 1.08 + (t - 3) * .009, -Math.sin(t * .25) * 12); ctx.restore();
      }
      const shade = ctx.createLinearGradient(0, 0, portrait ? 0 : W, portrait ? H : 0);
      if (portrait) { shade.addColorStop(0, "#080d18bb"); shade.addColorStop(.3, "#080d1800"); shade.addColorStop(.58, "#080d1822"); shade.addColorStop(1, "#080d18ed"); }
      else { shade.addColorStop(0, "#10130fe8"); shade.addColorStop(.48, "#10130f70"); shade.addColorStop(1, "#10130f00"); }
      ctx.fillStyle = shade; ctx.fillRect(0, 0, W, H);
      const sceneTime = t < 3.45 ? t : t - 3.45;
      const lines = t < 3.45 ? ad.headline : ad.detail;
      text(ad.brand, pad, portrait ? 80 : 76, portrait ? 25 : 23, ad.ink, 550);
      text(ad.eyebrow, pad, portrait ? 125 : 120, 12, ad.ink, 400);
      headline(lines, portrait ? H * .69 : H * .60, sceneTime);
      ctx.fillStyle = ad.accent;
      ctx.fillRect(pad, portrait ? H - 158 : H - 135, 64 + ease(t, 0, 2.6) * 90, 3);
      text(ad.cta + "  ↗", pad, portrait ? H - 112 : H - 90, 14, ad.ink);
      if (portrait) {
        for (let i = 0; i < 35; i++) {
          const wave = 6 + Math.pow(Math.sin(i * .45 + t * 2.6), 2) * 22;
          ctx.fillStyle = i % 5 === 0 ? ad.accent : "#ffffff70";
          ctx.fillRect(pad + i * 8, H - 63 - wave / 2, 3, wave);
        }
      }
      const outro = ease(t, 7, 7.8);
      if (outro > 0) {
        ctx.save(); ctx.globalAlpha = outro;
        if (portrait) {
          ctx.fillStyle = ad.paper; ctx.fillRect(0, 0, W, H);
          photo(images[0], 40, 250, W - 80, H * .45, 1.02 + (t - 7) * .015);
          text(ad.brand, pad, 102, 44, ad.ink, 550);
          text("FIND YOUR FREQUENCY.", pad, 155, 19, ad.ink);
          text(ad.cta + "  ↗", pad, H - 140, 19, ad.ink);
        } else {
          ctx.fillStyle = ad.paper; ctx.fillRect(0, 0, W, H);
          photo(images[0], W * .51, 0, W * .49, H, 1.02 + (t - 7) * .012);
          const color = ad.slug === "aura-skin" ? ad.dark : ad.ink;
          text(ad.brand, pad, 100, 25, color, 550);
          headline(ad.headline, 300, t - 7, color, 65);
          text(ad.cta + "  ↗", pad, H - 140, 15, color);
          ctx.strokeStyle = ad.accent; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(W * .45, H - 125, 44 + Math.sin(t) * 3, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(W * .45, H - 125, 30, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
      }
      const footerColor = outro > .5 && ad.slug === "aura-skin" ? ad.dark : ad.ink;
      text("POPART AGENCY  /  CONCEPT FILM", pad, H - 28, portrait ? 11 : 10, footerColor, 400);
      ctx.fillStyle = ad.accent; ctx.fillRect(0, H - 3, W * Math.min(1, t / 10), 3);
    }
    window.renderAdFrame = draw;
    window.renderAdThumbnail = () => {
      canvas.width = 1280; canvas.height = 800;
      ctx.fillStyle = ad.dark; ctx.fillRect(0, 0, 1280, 800);
      photo(images[0], 600, 0, 680, 800, 1.02);
      text(ad.brand, 64, 84, 26, ad.ink, 550);
      text(ad.eyebrow, 64, 130, 12, ad.ink, 400);
      text("Find your", 64, 350, 78, ad.ink);
      text("frequency.", 64, 432, 78, ad.ink);
      ctx.fillStyle = ad.accent; ctx.fillRect(64, 490, 145, 3);
      text(ad.cta + "  ↗", 64, 548, 16, ad.ink);
      for (let i = 0; i < 35; i++) {
        const wave = 8 + Math.pow(Math.sin(i * .45), 2) * 35;
        ctx.fillStyle = i % 5 === 0 ? ad.accent : "#ffffff70";
        ctx.fillRect(64 + i * 10, 650 - wave / 2, 4, wave);
      }
      text("POPART AGENCY  /  CONCEPT FILM", 64, 756, 11, ad.ink, 400);
    };
    window.recordAd = async () => {
      const mimeType = 'video/mp4;codecs=avc1.42001E';
      if (!MediaRecorder.isTypeSupported(mimeType)) throw new Error("This Chromium build cannot encode H.264 MP4.");
      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 3500000 });
      const chunks = [];
      recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      const complete = new Promise(resolve => { recorder.onstop = resolve; });
      draw(0); recorder.start();
      await new Promise(resolve => {
        const start = performance.now();
        const tick = now => { const t = (now - start) / 1000; draw(Math.min(t, 10)); if (t < 10) requestAnimationFrame(tick); else resolve(); };
        requestAnimationFrame(tick);
      });
      recorder.stop(); await complete; stream.getTracks().forEach(track => track.stop());
      const blob = new Blob(chunks, { type: mimeType });
      return await new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve(reader.result.split(",")[1]); reader.readAsDataURL(blob); });
    };
    draw(1.7);
  }, { concept, cover: image(""), detail: image("-detail"), font });
  const poster = await page.locator("canvas").screenshot({ type: "jpeg", quality: 90 });
  fs.writeFileSync(path.join(output, `${concept.slug}-poster.jpg`), poster);
  const movie = await page.evaluate(() => window.recordAd());
  fs.writeFileSync(path.join(output, `${concept.slug}.mp4`), Buffer.from(movie, "base64"));
  if (concept.height > concept.width) {
    await page.evaluate(() => window.renderAdThumbnail());
    fs.writeFileSync(path.join(output, `${concept.slug}-thumbnail.jpg`), await page.locator("canvas").screenshot({ type: "jpeg", quality: 90 }));
  }
  console.log(`Rendered ${concept.slug}: ${(fs.statSync(path.join(output, `${concept.slug}.mp4`)).size / 1048576).toFixed(2)} MB`);
  await page.close();
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  fs.mkdirSync(profile, { recursive: true });
  const context = await chromium.launchPersistentContext(profile, { headless: true, args: ["--autoplay-policy=no-user-gesture-required", "--disable-background-timer-throttling", "--disable-renderer-backgrounding"] });
  const selected = process.argv[2];
  const targets = concepts.filter(concept => !selected || concept.slug === selected);
  try {
    if (!targets.length) throw new Error(`Unknown concept: ${selected}`);
    for (const concept of targets) await render(context, concept);
  }
  finally { await context.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
