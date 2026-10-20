/** Independent identities and known boundary values, not copies of the models. */
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import {
  arrayFactorAt,
  computeArray,
  reflection,
  voltageAt,
  computeTransmission,
  gaussianRadius,
  computeGaussian,
  spectrum,
  computeFourier,
} from "../src/lib/demo-models.ts";
const close = (actual, expected, tolerance = 1e-10) =>
  assert.ok(
    Math.abs(actual - expected) < tolerance,
    `${actual} != ${expected}`,
  );
// Uniform-array closed form is independent of the direct phasor summation.
for (const N of [2, 8, 64])
  for (const d of [0.1, 0.5, 2])
    for (const beta of [-Math.PI, 0.15, Math.PI])
      for (const theta of [0.13, 0.7, Math.PI / 2, 2.4]) {
        const phase = 2 * Math.PI * d * Math.cos(theta) + beta;
        const expected =
          Math.abs(Math.sin(phase / 2)) < 1e-10
            ? 1
            : Math.abs(Math.sin((N * phase) / 2) / (N * Math.sin(phase / 2)));
        close(arrayFactorAt(theta, N, d, beta), expected);
      }
close(arrayFactorAt(Math.PI / 2, 8, 0.5, 0), 1);
close(arrayFactorAt(Math.acos(0.25), 8, 0.5, 0), 0);
assert.deepEqual(computeArray(8, 0.1, Math.PI).directions, []);
assert.equal(computeArray(8, 0.5, Math.PI).directions.length, 2); // both endfire endpoints
for (const angle of computeArray(8, 2, 0.2).directions)
  close(arrayFactorAt((angle * Math.PI) / 180, 8, 2, 0.2), 1);
// Large-array first sidelobe approaches −13.3 dB, rather than vanishing with N.
const sidelobe = Math.max(
  ...Array.from({ length: 1001 }, (_, i) => {
    const phase = ((2 * Math.PI) / 64) * (1 + i / 1000);
    return arrayFactorAt(Math.acos(phase / Math.PI), 64, 0.5, 0);
  }),
);
close(20 * Math.log10(sidelobe), -13.3, 0.1);
// Independent half-power root brackets the long broadside-array approximation.
let low = 0,
  high = 0.1;
for (let i = 0; i < 60; i++) {
  const offset = (low + high) / 2;
  if (arrayFactorAt(Math.PI / 2 + offset, 64, 0.5, 0) > Math.SQRT1_2)
    low = offset;
  else high = offset;
}
close((((2 * (low + high)) / 2) * 180) / Math.PI, 50.8 / (64 * 0.5), 0.01);
const match = reflection(50, 50, 0);
close(match.magnitude, 0);
close(match.vswr, 1);
assert.equal(match.returnLoss, Infinity);
const normal = reflection(50, 100, 0);
close(normal.re, 1 / 3);
close(normal.vswr, 2);
close(normal.returnLoss, 9.542425094393248);
for (const x of [-300, 0, 300]) {
  const g = reflection(50, 0, x);
  close(g.magnitude, 1);
  assert.equal(g.vswr, Infinity);
}
const short = reflection(50, 0, 0);
close(voltageAt(0, short.re, short.im), 0);
close(voltageAt(-0.25, short.re, short.im), 2);
// Ideal open is the analytic Γ = +1 boundary; it is not a finite slider resistance.
close(voltageAt(0, 1, 0), 2);
close(voltageAt(-0.25, 1, 0), 0);
for (const r of [0, 50, 500])
  for (const x of [-300, 0, 300]) {
    const m = computeTransmission(50, r, x, 3);
    assert.ok(m.y.every((v) => Number.isFinite(v) && v >= 0 && v <= 2 + 1e-12));
  }
const g = computeGaussian(5, 1.55, 2);
close(g.rayleighMm, 0.05067084925144828);
close(gaussianRadius(0, 5, 1.55), 5);
close(gaussianRadius(g.rayleighMm, 5, 1.55), 5 * Math.SQRT2);
close(gaussianRadius(-2, 5, 1.55), gaussianRadius(2, 5, 1.55));
for (const waist of [1, 50])
  for (const wavelength of [0.4, 2])
    assert.ok(computeGaussian(waist, wavelength, 10).y.every(Number.isFinite));
const N = 512,
  fs = 1000,
  k = 32;
for (const w of ["rectangular", "hann", "hamming", "blackman"]) {
  const zero = spectrum(Array(N).fill(0), fs, w);
  assert.ok(zero.y.every((v) => v === 0));
  assert.equal(zero.x.length, 257);
  close(zero.x.at(-1), 500);
  close(spectrum(Array(N).fill(2), fs, w).y[0], 2);
  close(
    spectrum(
      Array.from({ length: N }, (_, n) => 2 * Math.cos(Math.PI * n)),
      fs,
      w,
    ).y[N / 2],
    2,
  );
  close(
    spectrum(
      Array.from(
        { length: N },
        (_, n) => 1.7 * Math.sin((2 * Math.PI * k * n) / N),
      ),
      fs,
      w,
    ).y[k],
    1.7,
    1e-5,
  );
}
const single = spectrum(
  Array.from({ length: N }, (_, n) => Math.sin((2 * Math.PI * k * n) / N)),
  fs,
  "rectangular",
);
assert.ok(single.y.every((v, i) => i === k || v < 1e-12));
const off = Array.from({ length: N }, (_, n) =>
  Math.sin((2 * Math.PI * (k + 0.5) * n) / N),
);
const rect = spectrum(off, fs, "rectangular"),
  hann = spectrum(off, fs, "hann");
const distant = (m) =>
  Math.max(...m.y.filter((_, i) => i >= k + 10 && i <= k + 40));
assert.ok(distant(hann) < distant(rect) / 10);
const timings = [];
for (let i = 0; i < 30; i++) {
  const t = performance.now();
  computeFourier([450, 440, 430], [2, 2, 2], "blackman");
  timings.push(performance.now() - t);
}
timings.sort((a, b) => a - b);
const p95 = timings[Math.ceil(timings.length * 0.95) - 1];
assert.ok(p95 < 50, `DFT p95 ${p95}ms exceeds 50ms local budget`);
console.log(
  `Demo models passed: closed-form arrays, steering/grating limits, match/short/reactive/open identities, Gaussian waist/range/symmetry, DFT DC/Nyquist/bin amplitude/leakage/zero. Local DFT p95 ${p95.toFixed(2)}ms (30 runs).`,
);
