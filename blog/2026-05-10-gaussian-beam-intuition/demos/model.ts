/** This article's own model: an ideal Gaussian beam. Ideal analytical teaching model, pure
 *  TypeScript with no imports: the demo, its reference and
 *  `scripts/check-demo-models.mjs` all use it. */

export function gaussianRadius(
  zMm: number,
  waistUm: number,
  wavelengthUm: number,
) {
  const rangeMm = (Math.PI * waistUm ** 2) / wavelengthUm / 1000;
  return waistUm * Math.hypot(1, zMm / rangeMm);
}

export function computeGaussian(
  waistUm: number,
  wavelengthUm: number,
  extentMm: number,
) {
  const x = Array.from(
    { length: 501 },
    (_, i) => -extentMm + (2 * extentMm * i) / 500,
  );
  return {
    x,
    y: x.map((z) => gaussianRadius(z, waistUm, wavelengthUm)),
    rayleighMm: (Math.PI * waistUm ** 2) / wavelengthUm / 1000,
    divergenceRad: wavelengthUm / (Math.PI * waistUm),
  };
}
