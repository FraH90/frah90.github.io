import type { DemoReference } from '../../../src/lib/demo-charts';
import { arrayChart } from './chart';
import { computeArray } from './model';

export default {
  label: 'Array factor',
  parameters: 'N = 8, d/λ = 0.5, β = 0 rad; uniform amplitudes, isotropic uncoupled elements.',
  observation:
    'At θ = 90° all elements add in phase and the normalized amplitude is 1. Nulls occur at cos θ = ±0.25, ±0.5, ±0.75 (and the endfire endpoints).',
  charts: [arrayChart(computeArray(8, 0.5, 0))],
  previewAxis: '|AF|',
  previewSteering: { caption: 'Calculated · 8 elements · d/λ = 0.5', label: 'Steering angle', min: 45, max: 135, value: 90, unit: '°', valueText: 'degrees from the array axis' },
} satisfies DemoReference;
