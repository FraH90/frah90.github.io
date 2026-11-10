/** This article's own model: windowed DFT spectral leakage. Ideal analytical teaching model, pure
 *  TypeScript with no imports: the demo, its reference and
 *  `scripts/check-demo-models.mjs` all use it. */

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
