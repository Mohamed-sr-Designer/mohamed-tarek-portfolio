// Re-captures live-site screenshots for the Vibe Coding cards by driving a
// local headless Edge (Chromium) over the DevTools protocol.
//
// Why not a hosted service, and why not a plain `--screenshot` run:
//   * mShots clips the right-hand side of the Arabic (RTL) pages — its renderer
//     captures with the horizontal scroll pinned left, so RTL content runs off
//     the right edge and you get dead space on the left.
//   * thum.io freezes the hero reveal mid-transform, leaving the headline and
//     CTAs ~200px off to the right.
//   * `msedge --screenshot` fires before the Arabic web font resolves, so the
//     fallback face overflows and the headline gets clipped.
// All three were checked against the live pages in a real browser: miraf and
// hrlink have zero horizontal overflow at 1200 and 1600 and the h1 fits its
// box exactly, so the sites are fine and the captures were not.
//
// Driving CDP lets us wait on document.fonts.ready, nudge the scroll to fire
// the IntersectionObserver reveals, and only then grab the frame.
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "web");

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9377;
const W = 1600;
const H = 1000;
const SCALE = 1; // deviceScaleFactor 2 stalls the headless compositor on the
                 // backdrop-filter-heavy pages, and 1600px is already the
                 // exact size the card renders at

// [slug, url, { w, scrollY }]
//
// Miraf's own hero is genuinely clipped on the live site: `.wrap.hero-content`
// carries no horizontal gutter, so the RTL headline, the CTA and the last stat
// all run past the right edge and get cut by an `overflow-x: hidden` ancestor.
// That ancestor is also why the page still reports scrollWidth === clientWidth
// — the overflow is hidden, not absent. It reproduces at 1280, 1600 and 1920,
// in headless and in a real browser, so no capture setting can rescue it; it
// needs fixing in the miraf-district project itself. Until then, shoot a
// section further down the page that composes cleanly.
const ALL_SITES = [
  ["hrlink", "https://mohamed-sr-designer.github.io/hrlink-redesign/"],
  ["baleine", "https://mohamed-sr-designer.github.io/baleine-bleu-maison/"],
  ["miraf", "https://mohamed-sr-designer.github.io/miraf-district/", { scrollY: 1000 }],
  ["jadeite", "https://mohamed-sr-designer.github.io/jadeite-office-villas/"],
  ["hrpath", "https://mohamed-sr-designer.github.io/hrpath-redesign/"],
  ["tilal", "https://mohamed-sr-designer.github.io/tilal-village/"],
  ["fresh-valley", "https://mohamed-sr-designer.github.io/fresh-valley/"],
  ["soic", "https://mohamed-sr-designer.github.io/soic-campus/"],
  ["the9", "https://mohamed-sr-designer.github.io/the-9-menu/"],
];

// `node scripts/reshoot-web.mjs hrpath tilal` re-shoots just those two
const only = process.argv.slice(2);
const SITES = only.length
  ? ALL_SITES.filter(([slug]) => only.includes(slug))
  : ALL_SITES;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await fs.mkdir(OUT, { recursive: true });
const profile = await fs.mkdtemp(path.join(os.tmpdir(), "edge-shot-"));

const edge = spawn(
  EDGE,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    `--window-size=${W},${H}`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

// ---- minimal CDP client -----------------------------------------------------
async function endpoint() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      return (await r.json()).webSocketDebuggerUrl;
    } catch {
      await sleep(400);
    }
  }
  throw new Error("Edge DevTools endpoint never came up");
}

function connect(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  const events = new Map();

  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method && events.has(msg.method)) {
      events.get(msg.method).forEach((fn) => fn(msg.params));
      events.delete(msg.method);
    }
  });

  const ready = new Promise((res, rej) => {
    ws.addEventListener("open", res);
    ws.addEventListener("error", rej);
  });

  return {
    ready,
    send: (method, params = {}, sessionId) =>
      new Promise((resolve, reject) => {
        const msgId = ++id;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
      }),
    once: (method) =>
      new Promise((res) => {
        if (!events.has(method)) events.set(method, []);
        events.get(method).push(res);
      }),
    close: () => ws.close(),
  };
}

const cdp = connect(await endpoint());
await cdp.ready;

// one tab, reused for every site
const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await cdp.send("Target.attachToTarget", {
  targetId,
  flatten: true,
});

await cdp.send("Page.enable", {}, sessionId);
await cdp.send("Runtime.enable", {}, sessionId);
await cdp.send(
  "Emulation.setDeviceMetricsOverride",
  { width: W, height: H, deviceScaleFactor: SCALE, mobile: false },
  sessionId
);

// Never block forever: a page whose fonts or promises never settle should cost
// us a few seconds, not the whole run.
const withTimeout = (promise, ms, fallback = null) =>
  Promise.race([promise, sleep(ms).then(() => fallback)]);

const evaluate = (expression, ms = 20000) =>
  withTimeout(
    cdp.send(
      "Runtime.evaluate",
      { expression, awaitPromise: true, returnByValue: true },
      sessionId
    ),
    ms
  );

for (const [slug, url, opts = {}] of SITES) {
  const shotW = opts.w ?? W;
  const restY = opts.scrollY ?? 0;
  const shotH = Math.round((shotW * H) / W); // keep 16:10

  await cdp.send(
    "Emulation.setDeviceMetricsOverride",
    { width: shotW, height: shotH, deviceScaleFactor: SCALE, mobile: false },
    sessionId
  );

  const loaded = cdp.once("Page.loadEventFired");
  await withTimeout(cdp.send("Page.navigate", { url }, sessionId), 30000);
  await withTimeout(loaded, 30000);

  // let the Arabic web font resolve before anything is measured
  await evaluate("document.fonts.ready.then(() => true)", 12000);
  await sleep(1200);

  // nudge the scroll so IntersectionObserver reveals fire, then settle where we
  // actually want the frame
  await evaluate(
    `(async () => {
      for (const y of [${restY} + 400, ${restY} + 900, ${restY} + 200, ${restY}]) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise(r => setTimeout(r, 350));
      }
      return true;
    })()`,
    12000
  );
  await sleep(1800);

  // Finish the entrance reveals so nothing is caught mid-transform. Infinite
  // loops are deliberately left running: pausing them freezes scroll-linked
  // hero transforms wherever they happen to be, which is what pushed miraf's
  // headline off to the right. Dropping deviceScaleFactor to 1 is what stopped
  // the compositor stalling, so there is nothing left to pause for.
  await evaluate(
    `(() => {
      for (const a of document.getAnimations()) {
        try {
          const t = a.effect && a.effect.getTiming ? a.effect.getTiming() : null;
          if (!t || t.iterations !== Infinity) a.finish();
        } catch {}
      }
      document.querySelectorAll('video').forEach(v => { try { v.pause(); } catch {} });
      window.scrollTo({ top: ${restY}, behavior: 'instant' });
      return true;
    })()`,
    8000
  );
  await sleep(900);

  const check = await evaluate(`(() => {
    const d = document.documentElement, h = document.querySelector('h1');
    return JSON.stringify({
      overflowX: d.scrollWidth - d.clientWidth,
      h1Overflow: h ? h.scrollWidth - h.clientWidth : null,
      font: h ? getComputedStyle(h).fontFamily.split(',')[0] : null
    });
  })()`);

  const shot = await withTimeout(
    cdp.send(
      "Page.captureScreenshot",
      { format: "png", captureBeyondViewport: false },
      sessionId
    ),
    45000
  );

  if (!shot) {
    console.warn(`  ! ${slug} — screenshot timed out, keeping the old file`);
    continue;
  }

  await sharp(Buffer.from(shot.data, "base64"))
    .resize(W, H, { fit: "cover", position: "top" })
    .webp({ quality: 88 })
    .toFile(path.join(OUT, `${slug}.webp`));

  console.log(
    `  ✓ ${slug} — ${shotW}x${shotH} @ y=${restY} — ${
      check?.result?.value ?? "(checks skipped)"
    }`
  );
}

cdp.close();
edge.kill();
await sleep(600);
await fs.rm(profile, { recursive: true, force: true }).catch(() => {});
console.log("Done.");
