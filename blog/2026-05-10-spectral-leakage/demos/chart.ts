/** This article's charts: the model drawn as the reference figure and the
 *  preview card. */
import { demoColors } from '../../../src/lib/demo-colors';
import type { ChartSpec } from '../../../src/lib/chart-geometry';
import { type WindowType, spectrum, computeFourier } from './model';

export function fourierCharts(
  model: ReturnType<typeof computeFourier>,
  window: WindowType,
): ChartSpec[] {
  return [
    {
      title: "Time-domain signal",
      height: 200,
      description:
        "Calculated sum of three unitless sine waves, sampled at 1 kHz. The plot shows the first 200 of 512 samples before windowing.",
      xLabel: "Time (s)",
      yLabel: "Amplitude (a.u.)",
      traces: [
        {
          x: model.time.slice(0, 200),
          y: model.signal.slice(0, 200),
          label: "Unwindowed signal",
          color: demoColors.fourier.signal,
        },
      ],
    },
    {
      title: "One-sided amplitude spectrum",
      height: 250,
      description: `512-point DFT with ${window} window, bin spacing 1.953125 Hz. Amplitudes are corrected for window coherent gain; off-bin tones can still suffer scalloping. DC and Nyquist bins are not doubled.`,
      xLabel: "Frequency (Hz)",
      yLabel: "Peak amplitude (a.u.)",
      xRange: [0, 500],
      yRange: [0, Math.max(1, ...model.y) * 1.05],
      traces: [
        {
          x: model.x,
          y: model.y,
          label: `${window} spectrum`,
          color: demoColors.fourier.spectrum,
        },
      ],
    },
  ];
}
