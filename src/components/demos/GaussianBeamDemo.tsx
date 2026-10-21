import { useState, useMemo } from 'react';
import Slider from '../ui/Slider';
import PlotlyChart from '../ui/PlotlyChart';
import { computeGaussian } from '../../lib/demo-models';

export default function GaussianBeamDemo() {
  const [w0um, setW0um]   = useState(5);    // beam waist in µm
  const [lambdaUm, setLambdaUm] = useState(1.55); // wavelength in µm
  const [zMaxMm, setZMaxMm]   = useState(2);    // propagation range in mm

  const { z, w, zR, divergenceDeg } = useMemo(() => {
    const model = computeGaussian(w0um, lambdaUm, zMaxMm);
    return { z: model.x, w: model.y, zR: model.rayleighMm, divergenceDeg: model.divergenceRad * 180 / Math.PI };
  }, [w0um, lambdaUm, zMaxMm]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Slider label="Beam waist w₀" min={1} max={50} step={0.5} value={w0um} onChange={setW0um} unit="µm" />
        <Slider label="Wavelength λ" min={0.4} max={2.0} step={0.05} value={lambdaUm} onChange={setLambdaUm} unit="µm" />
        <Slider label="Propagation range" min={0.5} max={10} step={0.5} value={zMaxMm} onChange={setZMaxMm} unit="mm" />
      </div>

      <div className="flex flex-wrap gap-6 text-xs font-mono">
        <span className="text-muted">Rayleigh range z_R = <span className="text-accent">{zR.toFixed(2)} mm</span></span>
        <span className="text-muted">Divergence θ ≈ <span className="text-accent">{divergenceDeg.toFixed(2)}°</span></span>
        <span className="text-muted">w(z_R) = <span className="text-accent">{(w0um * Math.SQRT2).toFixed(2)} µm</span></span>
      </div>

      <PlotlyChart
        data={[
          { x: z, y: w,  type: 'scatter', mode: 'lines', line: { color: 'var(--plot-orange)', width: 2 }, name: '+w(z)', fill: 'none' },
          { x: z, y: w.map(v => -v), type: 'scatter', mode: 'lines', line: { color: 'var(--plot-orange)', width: 2 }, name: '-w(z)', fill: 'tonexty', fillcolor: 'rgba(251,146,60,0.08)' },
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
