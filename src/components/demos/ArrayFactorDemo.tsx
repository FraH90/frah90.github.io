import { useState, useMemo } from 'react';
import Slider from '../ui/Slider';
import PlotlyChart from '../ui/PlotlyChart';

interface Props {
  dataUrl?: string;
}

function computeAF(N: number, d: number, beta: number) {
  const points = 720;
  const theta = Array.from({ length: points }, (_, i) => (i * Math.PI) / (points - 1));
  const k = 2 * Math.PI;

  const AF = theta.map(t => {
    let re = 0, im = 0;
    for (let n = 0; n < N; n++) {
      const phase = n * (k * d * Math.cos(t) + beta);
      re += Math.cos(phase);
      im += Math.sin(phase);
    }
    return Math.sqrt(re * re + im * im) / N;
  });

  return {
    thetaDeg: theta.map(t => (t * 180) / Math.PI),
    AF,
    AFdB: AF.map(v => 20 * Math.log10(Math.max(v, 1e-6))),
  };
}

export default function ArrayFactorDemo({ dataUrl }: Props) {
  const [N, setN]       = useState(8);
  const [d, setD]       = useState(0.5);
  const [beta, setBeta] = useState(0);
  const [showdB, setShowdB] = useState(false);

  const { thetaDeg, AF, AFdB } = useMemo(() => computeAF(N, d, beta), [N, d, beta]);

  const yData = showdB ? AFdB : AF;
  const yLabel = showdB ? '|AF| dB' : '|AF| normalized';

  const steeringAngle = beta !== 0
    ? ((Math.acos(-beta / (2 * Math.PI * d)) * 180) / Math.PI).toFixed(1)
    : '90.0';

  return (
    <div className="flex flex-col gap-6">
      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Slider label="Elements (N)" min={2} max={64} step={1}
                value={N} onChange={setN} decimals={0} />
        <Slider label="Spacing d/λ" min={0.1} max={2.0} step={0.05}
                value={d} onChange={setD} unit="λ" />
        <Slider label="Phase shift β" min={-Math.PI} max={Math.PI} step={0.05}
                value={beta} onChange={setBeta} unit=" rad"
                minLabel="-π" maxLabel="π" />
      </div>

      {/* Info row */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
        <span>steering angle ≈ <span className="text-emerald-400">{steeringAngle}°</span></span>
        <span>3dB beamwidth ≈ <span className="text-emerald-400">{(102 / (N * d)).toFixed(1)}°</span></span>
        <label className="flex items-center gap-2 cursor-pointer ml-auto">
          <input type="checkbox" checked={showdB} onChange={e => setShowdB(e.target.checked)}
                 className="accent-emerald-400" />
          <span>dB scale</span>
        </label>
      </div>

      {/* Plot */}
      <PlotlyChart
        data={[{
          x: thetaDeg,
          y: yData,
          type: 'scatter',
          mode: 'lines',
          line: { color: '#34d399', width: 1.5 },
          name: yLabel,
        }]}
        layout={{
          title: { text: 'Array Factor vs. Angle', font: { size: 13 } },
          xaxis: { title: 'θ (degrees)', range: [0, 180], dtick: 30 },
          yaxis: { title: yLabel, range: showdB ? [-60, 0] : [0, 1] },
        }}
      />
    </div>
  );
}
