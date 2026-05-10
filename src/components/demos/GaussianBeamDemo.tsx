import { useState, useMemo } from 'react';
import Slider from '../ui/Slider';
import PlotlyChart from '../ui/PlotlyChart';

export default function GaussianBeamDemo() {
  const [w0um, setW0um]   = useState(5);    // beam waist in µm
  const [lambdaUm, setLambdaUm] = useState(1.55); // wavelength in µm
  const [zMaxMm, setZMaxMm]   = useState(2);    // propagation range in mm

  const { z, w, zR, divergenceDeg } = useMemo(() => {
    const w0  = w0um * 1e-6;
    const lam = lambdaUm * 1e-6;
    const zR  = (Math.PI * w0 * w0) / lam;
    const zMax = zMaxMm * 1e-3;
    const points = 500;
    const z = Array.from({ length: points }, (_, i) => -zMax + (2 * zMax * i) / (points - 1));
    const w = z.map(zi => w0 * Math.sqrt(1 + (zi / zR) ** 2));
    const divergenceDeg = (Math.atan(lam / (Math.PI * w0)) * 180) / Math.PI;
    return { z: z.map(zi => zi * 1e3), w: w.map(wi => wi * 1e6), zR: zR * 1e3, divergenceDeg };
  }, [w0um, lambdaUm, zMaxMm]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Slider label="Beam waist w₀" min={1} max={50} step={0.5} value={w0um} onChange={setW0um} unit="µm" />
        <Slider label="Wavelength λ" min={0.4} max={2.0} step={0.05} value={lambdaUm} onChange={setLambdaUm} unit="µm" />
        <Slider label="Propagation range" min={0.5} max={10} step={0.5} value={zMaxMm} onChange={setZMaxMm} unit="mm" />
      </div>

      <div className="flex flex-wrap gap-6 text-xs font-mono">
        <span className="text-zinc-400">Rayleigh range z_R = <span className="text-emerald-400">{zR.toFixed(2)} mm</span></span>
        <span className="text-zinc-400">Divergence θ ≈ <span className="text-emerald-400">{divergenceDeg.toFixed(2)}°</span></span>
        <span className="text-zinc-400">w(z_R) = <span className="text-emerald-400">{(w0um * Math.SQRT2).toFixed(2)} µm</span></span>
      </div>

      <PlotlyChart
        data={[
          { x: z, y: w,  type: 'scatter', mode: 'lines', line: { color: '#fb923c', width: 2 }, name: '+w(z)', fill: 'none' },
          { x: z, y: w.map(v => -v), type: 'scatter', mode: 'lines', line: { color: '#fb923c', width: 2 }, name: '-w(z)', fill: 'tonexty', fillcolor: 'rgba(251,146,60,0.08)' },
        ]}
        layout={{
          title: { text: 'Gaussian Beam Envelope w(z)', font: { size: 13 } },
          xaxis: { title: 'z (mm)', zeroline: true, zerolinecolor: '#3f3f46' },
          yaxis: { title: 'beam radius (µm)' },
          showlegend: false,
        }}
      />
    </div>
  );
}
