import type { DemoReference } from '../../../src/lib/demo-charts';
import { fourierCharts } from './chart';
import { computeFourier } from './model';

export default {
  label: 'Fourier transform',
  parameters: '512 samples at fs = 1 kHz; tones 50, 120, 200 Hz with amplitudes 1, 0.5, 0.3; rectangular window.',
  observation:
    'The tones are off the DFT bins and their spectra spread across neighboring bins. Windowing suppresses distant sidelobes but broadens peaks; coherent-gain correction does not eliminate off-bin scalloping.',
  charts: fourierCharts(computeFourier([50, 120, 200], [1, 0.5, 0.3], 'rectangular'), 'rectangular'),
  previewChart: 1,
} satisfies DemoReference;
