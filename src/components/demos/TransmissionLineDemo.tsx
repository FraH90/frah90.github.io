import { useState, useMemo } from "react";
import Slider from "../ui/Slider";
import ScientificChart from "../ui/ScientificChart";
import { computeTransmission } from "../../lib/demo-models";
import { transmissionChart } from "../../lib/demo-charts";
const display = (value: number, digits = 2) =>
  Number.isFinite(value) ? value.toFixed(digits) : "∞";
export default function TransmissionLineDemo() {
  const [Z0, setZ0] = useState(50),
    [resistance, setResistance] = useState(100),
    [reactance, setReactance] = useState(0),
    [length, setLength] = useState(1);
  const model = useMemo(
    () => computeTransmission(Z0, resistance, reactance, length),
    [Z0, resistance, reactance, length],
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Slider
          label="Z₀"
          min={10}
          max={300}
          step={5}
          value={Z0}
          onChange={setZ0}
          decimals={0}
          unit=" Ω"
        />
        <Slider
          label="Load resistance R_L"
          min={0}
          max={500}
          step={5}
          value={resistance}
          onChange={setResistance}
          decimals={0}
          unit=" Ω"
        />
        <Slider
          label="Load reactance X_L"
          min={-300}
          max={300}
          step={5}
          value={reactance}
          onChange={setReactance}
          decimals={0}
          unit=" Ω"
        />
        <Slider
          label="Line length"
          min={0.5}
          max={3}
          step={0.25}
          value={length}
          onChange={setLength}
          unit=" λ"
        />
      </div>
      <p className="demo-readout">
        |Γ| = <output>{display(model.magnitude, 3)}</output> · VSWR ={" "}
        <output>{display(model.vswr)}</output> · Return loss ={" "}
        <output>{display(model.returnLoss, 1)} dB</output>
      </p>
      <ScientificChart spec={transmissionChart(model)} />
      <p className="text-sm text-muted">
        Positive real Z₀ and a passive finite load are assumed. A short (R_L =
        X_L = 0) or a purely reactive load has VSWR = ∞. An ideal open circuit
        is a limiting case, not the maximum-resistance slider position.
      </p>
    </div>
  );
}
