import { useState, useMemo } from 'react';
import Slider from '../ui/Slider';
import PlotlyChart from '../ui/PlotlyChart';
import { computeTransmission } from '../../lib/demo-models';

export default function TransmissionLineDemo() {
  const [Z0, setZ0]     = useState(50);
  const [RLreal, setRLreal] = useState(100);
  const [RLimag, setRLimag] = useState(0);
  const [length, setLength] = useState(1); // in wavelengths

  const { z, V, gamma, vswr } = useMemo(() => {
    const model = computeTransmission(Z0, RLreal, RLimag, length);
    return { z: model.x, V: model.y, gamma: model.magnitude, vswr: model.vswr };
  }, [Z0, RLreal, RLimag, length]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Slider label="Z₀ (Ω)" min={10} max={300} step={5} value={Z0} onChange={setZ0} decimals={0} unit="Ω" />
        <Slider label="R_L (Ω)" min={0} max={500} step={5} value={RLreal} onChange={setRLreal} decimals={0} unit="Ω" />
        <Slider label="X_L (Ω)" min={-300} max={300} step={5} value={RLimag} onChange={setRLimag} decimals={0} unit="Ω" />
        <Slider label="Line length" min={0.5} max={3} step={0.25} value={length} onChange={setLength} unit="λ" />
      </div>

      <div className="flex flex-wrap gap-6 text-xs font-mono">
        <span className="text-muted">|Γ| = <span className="text-accent">{gamma.toFixed(3)}</span></span>
        <span className="text-muted">VSWR = <span className="text-accent">{vswr.toFixed(2)}</span></span>
        <span className="text-muted">
          Return loss = <span className="text-accent">
            {gamma > 0 ? (-20 * Math.log10(gamma)).toFixed(1) : '∞'} dB
          </span>
        </span>
      </div>

      <PlotlyChart
        data={[{
          x: z,
          y: V,
          type: 'scatter',
          mode: 'lines',
          line: { color: 'var(--plot-blue)', width: 1.5 },
          name: '|V(z)|',
        }]}
        layout={{
          title: { text: 'Standing Wave Pattern |V(z)|', font: { size: 13 } },
          xaxis: { title: 'position (λ)', zeroline: false },
          yaxis: { title: '|V| (normalized)', rangemode: 'tozero' },
          shapes: [{ type: 'line', x0: 0, x1: 0, y0: 0, y1: 2,
                     line: { color: '#71717a', width: 1, dash: 'dot' } }],
          annotations: [{ x: 0, y: 1.95, text: 'load', font: { size: 10, color: '#71717a' },
                          showarrow: false }],
        }}
      />
    </div>
  );
}
