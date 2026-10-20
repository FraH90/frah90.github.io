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
  raw <= 250 * 1024,
  `Application JS ${raw} bytes exceeds 250 KiB decoded budget`,
);
assert.ok(
  gzip <= 80 * 1024,
  `Application JS ${gzip} bytes exceeds 80 KiB gzip budget`,
);
assert.ok(
  !scripts.some((file) => /plotly/i.test(file)),
  "Plotly must not be shipped by the current simple demos",
);
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
    `Eager browser-only demo in ${article}`,
  );
  assert.ok(
    gzipSync(html).length <= 32 * 1024,
    `Article HTML exceeds 32 KiB gzip budget: ${article}`,
  );
}
console.log(
  `Demo payload passed: ${raw} bytes decoded / ${gzip} bytes gzip for all application JS; controller ${controller.gzip} bytes gzip; four static article pages each ≤32 KiB gzip. Runtime network checks remain separate.`,
);
