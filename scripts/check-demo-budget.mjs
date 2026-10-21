/** Deliberate conservative budget for all emitted application JS (not Pagefind). */
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
const directory = "dist/_astro";
assert.ok(
  existsSync(directory),
  "Run npm run build before checking demo payloads",
);
const scripts = readdirSync(directory).filter((file) => file.endsWith(".js"));
const sizes = scripts.map((file) => {
  const data = readFileSync(join(directory, file));
  return { file, raw: data.length, gzip: gzipSync(data).length };
});
const raw = sizes.reduce((sum, file) => sum + file.raw, 0),
  gzip = sizes.reduce((sum, file) => sum + file.gzip, 0);
assert.ok(
  raw <= 6 * 1024 * 1024,
  `Application JS ${raw} bytes exceeds 6 MiB decoded budget`,
);
assert.ok(
  gzip <= 1800 * 1024,
  `Application JS ${gzip} bytes exceeds 1800 KiB gzip budget`,
);
// Owner chose the original Plotly renderer on 2026-10-21. Keep its cost explicit.
const engine = sizes.filter(file => /plotly/i.test(file.file));
assert.equal(engine.length, 1, 'Expected one shared Plotly engine chunk');
assert.ok(engine[0].raw <= 5 * 1024 * 1024 && engine[0].gzip <= 1600 * 1024, 'Plotly engine exceeds its restored-renderer budget');
const controller = sizes.find((file) =>
  file.file.startsWith("InteractiveDemo."),
);
assert.ok(
  controller && controller.gzip <= 3 * 1024,
  "Initial demo controller exceeds 3 KiB gzip budget",
);
const articles = [
  "antennas/phased-array-basics",
  "dsp/spectral-leakage",
  "optics/gaussian-beam-intuition",
  "rf/transmission-line-theory",
];
for (const article of articles) {
  const html = readFileSync(`dist/blog/${article}/index.html`, "utf8");
  assert.match(html, /data-demo-static/, `Missing static demo in ${article}`);
  assert.match(
    html,
    /Calculated reference case/,
    `Missing model parameters in ${article}`,
  );
  assert.ok(
    !html.includes("client:only"),
    `Missing browser-safe demo mount boundary in ${article}`,
  );
  assert.ok(
    gzipSync(html).length <= 32 * 1024,
    `Article HTML exceeds 32 KiB gzip budget: ${article}`,
  );
}
console.log(
  `Demo payload passed: ${raw} bytes decoded / ${gzip} bytes gzip for all application JS; controller ${controller.gzip} bytes gzip; four static article pages each ≤32 KiB gzip. Runtime network checks remain separate.`,
);
