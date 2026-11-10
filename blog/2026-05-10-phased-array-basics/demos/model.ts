/** This article's own model: the uniform linear array factor. Ideal analytical teaching model, pure
 *  TypeScript with no imports: the demo, its reference and
 *  `scripts/check-demo-models.mjs` all use it. */

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
