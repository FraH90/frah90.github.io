import {
  arrayChart,
  transmissionChart,
  gaussianChart,
  fourierCharts,
  type DemoKind,
} from "./demo-charts";
import {
  computeArray,
  computeTransmission,
  computeGaussian,
  computeFourier,
} from "./demo-models";
import type { ChartSpec } from "./chart-geometry";
export const demoExamples: Record<
  DemoKind,
  {
    label: string;
    parameters: string;
    observation: string;
    charts: ChartSpec[];
  }
> = {
  array: {
    label: "Array factor",
    parameters:
      "N = 8, d/λ = 0.5, β = 0 rad; uniform amplitudes, isotropic uncoupled elements.",
    observation:
      "At θ = 90° all elements add in phase and the normalized amplitude is 1. Nulls occur at cos θ = ±0.25, ±0.5, ±0.75 (and the endfire endpoints).",
    charts: [arrayChart(computeArray(8, 0.5, 0))],
  },
  transmission: {
    label: "Transmission line",
    parameters:
      "Z₀ = 50 Ω, ZL = 100 + j0 Ω, length = 1λ; lossless line, incident amplitude 1.",
    observation:
      "Γ = 1/3, VSWR = 2, return loss ≈ 9.54 dB. The voltage envelope ranges from 2/3 to 4/3. A short has a voltage null at the load and a maximum λ/4 away.",
    charts: [transmissionChart(computeTransmission(50, 100, 0, 1))],
  },
  gaussian: {
    label: "Gaussian beam",
    parameters:
      "w₀ = 5 µm, λ = 1.55 µm, z = ±2 mm; free-space paraxial Gaussian model, M² = 1.",
    observation:
      "zR ≈ 0.0507 mm; w(zR) ≈ 7.07 µm; divergence half-angle ≈ 5.65°. The waist is an intensity radius, and the corresponding diameter is 10 µm.",
    charts: [gaussianChart(computeGaussian(5, 1.55, 2))],
  },
  fourier: {
    label: "Fourier transform",
    parameters:
      "512 samples at fs = 1 kHz; tones 50, 120, 200 Hz with amplitudes 1, 0.5, 0.3; rectangular window.",
    observation:
      "The tones are off the DFT bins and their spectra spread across neighboring bins. Windowing suppresses distant sidelobes but broadens peaks; coherent-gain correction does not eliminate off-bin scalloping.",
    charts: fourierCharts(
      computeFourier([50, 120, 200], [1, 0.5, 0.3], "rectangular"),
      "rectangular",
    ),
  },
};
