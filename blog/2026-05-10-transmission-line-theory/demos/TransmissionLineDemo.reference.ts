import type { DemoReference } from '../../../src/lib/demo-charts';
import { transmissionChart } from './chart';
import { computeTransmission } from './model';

export default {
  label: 'Transmission line',
  parameters: 'Z₀ = 50 Ω, ZL = 100 + j0 Ω, length = 1λ; lossless line, incident amplitude 1.',
  observation:
    'Γ = 1/3, VSWR = 2, return loss ≈ 9.54 dB. The voltage envelope ranges from 2/3 to 4/3. A short has a voltage null at the load and a maximum λ/4 away.',
  charts: [transmissionChart(computeTransmission(50, 100, 0, 1))],
} satisfies DemoReference;
