import { gaussianChart, type DemoReference } from '../../../src/lib/demo-charts';
import { computeGaussian } from '../../../src/lib/demo-models';

export default {
  label: 'Gaussian beam',
  parameters: 'w₀ = 5 µm, λ = 1.55 µm, z = ±2 mm; free-space paraxial Gaussian model, M² = 1.',
  observation:
    'zR ≈ 0.0507 mm; w(zR) ≈ 7.07 µm; divergence half-angle ≈ 5.65°. The waist is an intensity radius, and the corresponding diameter is 10 µm.',
  charts: [gaussianChart(computeGaussian(5, 1.55, 2))],
} satisfies DemoReference;
