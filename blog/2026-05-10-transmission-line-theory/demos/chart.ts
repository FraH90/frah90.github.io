/** This article's charts: the model drawn as the reference figure and the
 *  preview card. */
import { demoColors } from '../../../src/lib/demo-colors';
import type { ChartSpec } from '../../../src/lib/chart-geometry';
import { computeTransmission } from './model';

export function transmissionChart(
  model: ReturnType<typeof computeTransmission>,
): ChartSpec {
  return {
    title: "Voltage standing-wave envelope",
    description:
      "Calculated lossless line with a passive load at z = 0, incident voltage amplitude 1. Negative z runs toward the source. The envelope is flat for a matched load.",
    xLabel: "z / λ",
    yLabel: "|V| / |V⁺|",
    yRange: [0, 2],
    traces: [
      {
        x: model.x,
        y: model.y,
        label: "Voltage magnitude",
        color: demoColors.transmission,
      },
    ],
  };
}
