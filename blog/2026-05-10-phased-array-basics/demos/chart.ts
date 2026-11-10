/** This article's charts: the model drawn as the reference figure and the
 *  preview card. */
import { demoColors } from '../../../src/lib/demo-colors';
import type { ChartSpec } from '../../../src/lib/chart-geometry';
import { computeArray } from './model';

export function arrayChart(
  model: ReturnType<typeof computeArray>,
  dB = false,
): ChartSpec {
  return {
    title: "Uniform array factor",
    description:
      "Calculated ideal isotropic-element array factor, normalized to the number of elements. θ is measured from the array axis. The dB view is clipped at −60 dB.",
    xLabel: "θ (degrees)",
    yLabel: dB ? "|AF| (dB)" : "|AF| (normalized)",
    xRange: [0, 180],
    yRange: dB ? [-60, 0] : [0, 1],
    traces: [
      {
        x: model.x,
        y: dB
          ? model.y.map((v) => 20 * Math.log10(Math.max(v, 1e-6)))
          : model.y,
        label: dB ? "Normalized array factor (dB)" : "Normalized array factor",
        color: demoColors.array,
      },
    ],
  };
}

/** The preview card's steering sweep: the default 8-element, half-wavelength
 *  array steered to `angle` degrees from the array axis. */
export function steer(angle: number) {
  return {
    chart: arrayChart(computeArray(8, 0.5, -Math.PI * Math.cos((angle * Math.PI) / 180))),
    label: `Calculated uniform eight-element isotropic array, half-wavelength spacing, steered to ${angle} degrees from the array axis. Normalized magnitude versus angle.`,
  };
}
