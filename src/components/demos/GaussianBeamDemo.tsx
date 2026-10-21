import { useState, useMemo } from "react";
import Slider from "../ui/Slider";
import ScientificChart from "../ui/ScientificChart";
import { computeGaussian } from "../../lib/demo-models";
import { gaussianChart } from "../../lib/demo-charts";
export default function GaussianBeamDemo() {
  const [waist, setWaist] = useState(5),
    [wavelength, setWavelength] = useState(1.55),
    [extent, setExtent] = useState(2);
  const model = useMemo(
    () => computeGaussian(waist, wavelength, extent),
    [waist, wavelength, extent],
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Slider
          label="Waist radius w₀"
          min={1}
          max={50}
          step={0.5}
          value={waist}
          onChange={setWaist}
          unit=" µm"
        />
        <Slider
          label="Wavelength λ"
          min={0.4}
          max={2}
          step={0.05}
          value={wavelength}
          onChange={setWavelength}
          unit=" µm"
        />
        <Slider
          label="Propagation extent ±z"
          min={0.5}
          max={10}
          step={0.5}
          value={extent}
          onChange={setExtent}
          unit=" mm"
        />
      </div>
      <p className="demo-readout">
        zR = <output>{model.rayleighMm.toFixed(4)} mm</output> · w(zR) ={" "}
        <output>{(waist * Math.SQRT2).toFixed(2)} µm</output> · Divergence
        half-angle ≈{" "}
        <output>{((model.divergenceRad * 180) / Math.PI).toFixed(2)}°</output>
      </p>
      {model.divergenceRad > 0.1 && (
        <p className="demo-warning">
          Large divergence: the paraxial approximation becomes less reliable.
          Treat this setting as a model illustration, not a high-NA prediction.
        </p>
      )}
      <ScientificChart spec={gaussianChart(model)} />
    </div>
  );
}
