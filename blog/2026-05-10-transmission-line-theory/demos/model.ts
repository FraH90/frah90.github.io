/** This article's own model: a lossless transmission line with a passive load. Ideal analytical teaching model, pure
 *  TypeScript with no imports: the demo, its reference and
 *  `scripts/check-demo-models.mjs` all use it. */

export function reflection(Z0: number, resistance: number, reactance: number) {
  const denominator = (resistance + Z0) ** 2 + reactance ** 2;
  const re = (resistance ** 2 - Z0 ** 2 + reactance ** 2) / denominator;
  const im = (2 * Z0 * reactance) / denominator;
  const magnitude = Math.hypot(re, im);
  // Passive purely reactive loads (including a short) reflect all incident power.
  const vswr = resistance === 0 ? Infinity : (1 + magnitude) / (1 - magnitude);
  return {
    re,
    im,
    magnitude,
    vswr,
    returnLoss: magnitude === 0 ? Infinity : -20 * Math.log10(magnitude),
  };
}

export function voltageAt(z: number, re: number, im: number) {
  const phase = 2 * Math.PI * z;
  return Math.hypot(
    Math.cos(-phase) + re * Math.cos(phase) - im * Math.sin(phase),
    Math.sin(-phase) + re * Math.sin(phase) + im * Math.cos(phase),
  );
}

export function computeTransmission(
  Z0: number,
  resistance: number,
  reactance: number,
  length: number,
) {
  const gamma = reflection(Z0, resistance, reactance);
  const x = Array.from({ length: 501 }, (_, i) => -length + (length * i) / 500);
  return { x, y: x.map((z) => voltageAt(z, gamma.re, gamma.im)), ...gamma };
}
