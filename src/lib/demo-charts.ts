import type { ChartSpec } from "./chart-geometry";
import {
  computeArray,
  computeFourier,
  computeGaussian,
  computeTransmission,
  type WindowType,
} from "./demo-models";
export type DemoKind = "array" | "fourier" | "gaussian" | "transmission";
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
        color: "var(--plot-green)",
      },
    ],
  };
}
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
        color: "var(--plot-blue)",
      },
    ],
  };
}
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
      { x: model.x, y: model.y, label: "+w(z)", color: "var(--plot-orange)" },
      {
        x: model.x,
        y: model.y.map((v) => -v),
        label: "−w(z)",
        color: "var(--plot-blue)",
        dashed: true,
      },
    ],
  };
}
export function fourierCharts(
  model: ReturnType<typeof computeFourier>,
  window: WindowType,
): ChartSpec[] {
  return [
    {
      title: "Time-domain signal",
      description:
        "Calculated sum of three unitless sine waves, sampled at 1 kHz. The plot shows the first 200 of 512 samples before windowing.",
      xLabel: "Time (s)",
      yLabel: "Amplitude (a.u.)",
      traces: [
        {
          x: model.time.slice(0, 200),
          y: model.signal.slice(0, 200),
          label: "Unwindowed signal",
          color: "var(--plot-green)",
        },
      ],
    },
    {
      title: "One-sided amplitude spectrum",
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
          color: "var(--plot-purple)",
        },
      ],
    },
  ];
}
