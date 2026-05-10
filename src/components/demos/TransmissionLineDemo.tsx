import { useState, useMemo } from 'react';
import Slider from '../ui/Slider';
import PlotlyChart from '../ui/PlotlyChart';

export default function TransmissionLineDemo() {
  const [Z0, setZ0]     = useState(50);
  const [RLreal, setRLreal] = useState(100);
  const [RLimag, setRLimag] = useState(0);
  const [length, setLength] = useState(1); // in wavelengths

  const { z, V, gamma, vswr } = useMemo(() => {
    const ZL = { re: RLreal, im: RLimag };
    const denom_re = ZL.re + Z0, denom_im = ZL.im;
    const num_re   = ZL.re - Z0, num_im   = ZL.im;
    const denom2   = denom_re * denom_re + denom_im * denom_im;
    const gRe = (num_re * denom_re + num_im * denom_im) / denom2;
    const gIm = (num_im * denom_re - num_re * denom_im) / denom2;
    const gamma = Math.sqrt(gRe * gRe + gIm * gIm);
    const vswr = (1 + gamma) / Math.max(1 - gamma, 0.001);

    const points = 500;
    const z = Array.from({ length: points }, (_, i) => -length + (i * length) / (points - 1));
    const beta = 2 * Math.PI;
    const V = z.map(zi => {
      const betaZ = beta * zi;
      const re = Math.cos(-betaZ) + gamma * Math.cos(betaZ + Math.atan2(gIm, gRe));
      const im = Math.sin(-betaZ) + gamma * Math.sin(betaZ + Math.atan2(gIm, gRe));
      return Math.sqrt(re * re + im * im);
    });

    return { z, V, gamma, vswr };
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
        <span className="text-zinc-400">|Γ| = <span className="text-emerald-400">{gamma.toFixed(3)}</span></span>
        <span className="text-zinc-400">VSWR = <span className="text-emerald-400">{vswr.toFixed(2)}</span></span>
        <span className="text-zinc-400">
          Return loss = <span className="text-emerald-400">
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
          line: { color: '#38bdf8', width: 1.5 },
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
