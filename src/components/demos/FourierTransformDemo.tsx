import { useState, useMemo } from "react";
import Slider from "../ui/Slider";
import ScientificChart from "../ui/ScientificChart";
import { computeFourier, type WindowType } from "../../lib/demo-models";
import { fourierCharts } from "../../lib/demo-charts";
export default function FourierTransformDemo() {
  const [frequencies, setFrequencies] = useState([50, 120, 200]);
  const [amplitudes, setAmplitudes] = useState([1, 0.5, 0.3]);
  const [window, setWindow] = useState<WindowType>("rectangular");
  const model = useMemo(
    () => computeFourier(frequencies, amplitudes, window),
    [frequencies, amplitudes, window],
  );
  const update = (
    values: number[],
    set: (v: number[]) => void,
    index: number,
    value: number,
  ) => set(values.map((v, i) => (i === index ? value : v)));
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {frequencies.map((frequency, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 border border-rule rounded p-3"
          >
            <Slider
              label={`Frequency ${i + 1}`}
              min={10}
              max={450}
              step={5}
              value={frequency}
              onChange={(v) => update(frequencies, setFrequencies, i, v)}
              decimals={0}
              unit=" Hz"
            />
            <Slider
              label={`Amplitude ${i + 1}`}
              min={0}
              max={2}
              step={0.1}
              value={amplitudes[i]}
              onChange={(v) => update(amplitudes, setAmplitudes, i, v)}
              unit=" a.u."
            />
          </div>
        ))}
      </div>
      <fieldset>
        <legend className="text-sm text-muted mb-2">Window function</legend>
        <div className="flex flex-wrap gap-2">
          {(["rectangular", "hann", "hamming", "blackman"] as WindowType[]).map(
            (w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWindow(w)}
                aria-pressed={window === w}
                className={`min-h-11 px-3 py-2 text-sm rounded ${window === w ? "bg-accent/20 text-accent" : "bg-elevated text-muted hover:text-ink"}`}
              >
                {w}
              </button>
            ),
          )}
        </div>
      </fieldset>
      {fourierCharts(model, window).map((spec) => (
        <ScientificChart key={spec.title} spec={spec} />
      ))}
      <p className="text-sm text-muted">
        Frequencies remain below the 500 Hz Nyquist limit. These are sampled
        analytical signals, without noise, quantization or instrument response.
        The displayed transform is a direct DFT, not an FFT benchmark.
      </p>
    </div>
  );
}
