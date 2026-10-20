import { useState, useMemo } from "react";
import Slider from "../ui/Slider";
import ScientificChart from "../ui/ScientificChart";
import { computeArray } from "../../lib/demo-models";
import { arrayChart } from "../../lib/demo-charts";
export default function ArrayFactorDemo() {
  const [N, setN] = useState(8),
    [spacing, setSpacing] = useState(0.5),
    [phaseDegrees, setPhaseDegrees] = useState(0),
    [dB, setDB] = useState(false);
  const beta = (phaseDegrees * Math.PI) / 180;
  const model = useMemo(
    () => computeArray(N, spacing, beta),
    [N, spacing, beta],
  );
  const cosine = -beta / (2 * Math.PI * spacing);
  const primary =
    Math.abs(cosine) <= 1
      ? `${((Math.acos(cosine) * 180) / Math.PI).toFixed(1)}°`
      : "No visible solution";
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Slider
          label="Elements N"
          min={2}
          max={64}
          step={1}
          value={N}
          onChange={setN}
          decimals={0}
        />
        <Slider
          label="Spacing d/λ"
          min={0.1}
          max={2}
          step={0.05}
          value={spacing}
          onChange={setSpacing}
        />
        <Slider
          label="Phase shift β"
          min={-180}
          max={180}
          step={1}
          value={phaseDegrees}
          onChange={setPhaseDegrees}
          decimals={0}
          unit="°"
        />
      </div>
      <p className="demo-readout">
        ψ = 0 direction: <output>{primary}</output>. In-phase directions (all
        orders):{" "}
        <output>
          {model.directions.length
            ? model.directions.map((d) => `${d.toFixed(1)}°`).join(", ")
            : "None in the visible range"}
        </output>
        .
      </p>
      <label className="flex items-center gap-2 min-h-11 text-sm">
        <input
          type="checkbox"
          checked={dB}
          onChange={(e) => setDB(e.target.checked)}
        />{" "}
        dB scale (floor −60 dB)
      </label>
      <ScientificChart spec={arrayChart(model, dB)} />
      <p className="text-sm text-muted">
        Uniform weights do not independently lower sidelobes as N increases.
        Multiple in-phase directions indicate grating lobes. Element patterns,
        coupling, losses and bandwidth are omitted.
      </p>
    </div>
  );
}
