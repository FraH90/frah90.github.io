/** Ideal analytical teaching models. Distances/impedances are defined by each function. */
export function arrayFactorAt(
  theta: number,
  N: number,
  spacing: number,
  beta: number,
) {
  let re = 0,
    im = 0;
  const phase = 2 * Math.PI * spacing * Math.cos(theta) + beta;
  for (let n = 0; n < N; n++) {
    re += Math.cos(n * phase);
    im += Math.sin(n * phase);
  }
  return Math.hypot(re, im) / N;
}
export function computeArray(N: number, spacing: number, beta: number) {
  const x = Array.from({ length: 721 }, (_, i) => i / 4);
  const y = x.map((degrees) =>
    arrayFactorAt((degrees * Math.PI) / 180, N, spacing, beta),
  );
  const directions: number[] = [];
  for (
    let order = -Math.ceil(spacing + 1);
    order <= Math.ceil(spacing + 1);
    order++
  ) {
    const cosine = (2 * Math.PI * order - beta) / (2 * Math.PI * spacing);
    if (Math.abs(cosine) <= 1 + 1e-12)
      directions.push(
        (Math.acos(Math.max(-1, Math.min(1, cosine))) * 180) / Math.PI,
      );
  }
  directions.sort((a, b) => a - b);
  return { x, y, directions };
}
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
export type WindowType = "rectangular" | "hann" | "hamming" | "blackman";
export function windowWeight(n: number, count: number, type: WindowType) {
  const phase = (2 * Math.PI * n) / (count - 1);
  if (type === "hann") return 0.5 - 0.5 * Math.cos(phase);
  if (type === "hamming") return 0.54 - 0.46 * Math.cos(phase);
  if (type === "blackman")
    return 0.42 - 0.5 * Math.cos(phase) + 0.08 * Math.cos(2 * phase);
  return 1;
}
/** One-sided peak amplitude, window coherent-gain corrected. Includes DC and Nyquist. */
export function spectrum(
  signal: number[],
  sampleRate: number,
  window: WindowType,
) {
  const count = signal.length;
  const weights = signal.map((_, n) => windowWeight(n, count, window));
  const gain = weights.reduce((sum, weight) => sum + weight, 0);
  const x: number[] = [],
    y: number[] = [];
  for (let k = 0; k <= count / 2; k++) {
    let re = 0,
      im = 0;
    for (let n = 0; n < count; n++) {
      const phase = (-2 * Math.PI * k * n) / count;
      re += signal[n] * weights[n] * Math.cos(phase);
      im += signal[n] * weights[n] * Math.sin(phase);
    }
    x.push((k * sampleRate) / count);
    y.push((Math.hypot(re, im) / gain) * (k === 0 || k === count / 2 ? 1 : 2));
  }
  return { x, y };
}
export function computeFourier(
  frequencies: number[],
  amplitudes: number[],
  window: WindowType,
) {
  const time = Array.from({ length: 512 }, (_, n) => n / 1000);
  const signal = time.map((t) =>
    frequencies.reduce(
      (sum, frequency, i) =>
        sum + amplitudes[i] * Math.sin(2 * Math.PI * frequency * t),
      0,
    ),
  );
  return { time, signal, ...spectrum(signal, 1000, window) };
}
