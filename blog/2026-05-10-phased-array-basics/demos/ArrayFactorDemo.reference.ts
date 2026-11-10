import { arrayChart, type DemoReference } from '../../../src/lib/demo-charts';
import { computeArray } from '../../../src/lib/demo-models';

export default {
  label: 'Array factor',
  parameters: 'N = 8, d/λ = 0.5, β = 0 rad; uniform amplitudes, isotropic uncoupled elements.',
  observation:
    'At θ = 90° all elements add in phase and the normalized amplitude is 1. Nulls occur at cos θ = ±0.25, ±0.5, ±0.75 (and the endfire endpoints).',
  charts: [arrayChart(computeArray(8, 0.5, 0))],
  previewAxis: '|AF|',
  previewSteering: true,
} satisfies DemoReference;
