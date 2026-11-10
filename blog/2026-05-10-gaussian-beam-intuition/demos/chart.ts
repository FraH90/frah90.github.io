/** This article's charts: the model drawn as the reference figure and the
 *  preview card. */
import { demoColors } from '../../../src/lib/demo-colors';
import type { ChartSpec } from '../../../src/lib/chart-geometry';
import { computeGaussian } from './model';

export function gaussianChart(
  model: ReturnType<typeof computeGaussian>,
): ChartSpec {
  return {
    title: "Ideal Gaussian beam envelope",
    description:
      "Calculated free-space paraxial model (M² = 1). ±w marks the 1/e² intensity radius around the optical axis, not a hard beam edge. The waist is at z = 0.",
    xLabel: "z (mm)",
    yLabel: "Radius (µm)",
    traces: [
      { x: model.x, y: model.y, label: "+w(z)", color: demoColors.gaussian.upper },
      {
        x: model.x,
        y: model.y.map((v) => -v),
        label: "−w(z)",
        color: demoColors.gaussian.lower,
        dashed: true,
      },
    ],
  };
}
