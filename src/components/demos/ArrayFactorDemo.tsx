import { useState, useMemo } from 'react';
import Slider from '../ui/Slider';
import PlotlyChart from '../ui/PlotlyChart';
import { computeArray } from '../../lib/demo-models';

export default function ArrayFactorDemo() {
  const [N, setN]       = useState(8);
  const [d, setD]       = useState(0.5);
  const [beta, setBeta] = useState(0);
  const [showdB, setShowdB] = useState(false);

  const { thetaDeg, AF, AFdB } = useMemo(() => {
    const model = computeArray(N, d, beta);
    return {
      thetaDeg: model.x,
      AF: model.y,
      AFdB: model.y.map(value => 20 * Math.log10(Math.max(value, 1e-6))),
    };
  }, [N, d, beta]);

  const yData = showdB ? AFdB : AF;
  const yLabel = showdB ? '|AF| dB' : '|AF| normalized';

  const steeringAngle = beta !== 0
    ? (Math.abs(-beta / (2 * Math.PI * d)) <= 1 ? ((Math.acos(-beta / (2 * Math.PI * d)) * 180) / Math.PI).toFixed(1) + '°' : 'No visible solution')
    : '90.0°';

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
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
        <span>steering angle ≈ <span className="text-accent">{steeringAngle}</span></span>
        <span>Broadside HPBW ≈ <span className="text-accent">{(50.8 / (N * d)).toFixed(1)}°</span></span>
        <label className="flex items-center gap-2 cursor-pointer ml-auto">
          <input type="checkbox" checked={showdB} onChange={e => setShowdB(e.target.checked)}
                 className="accent-accent" />
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
          line: { color: 'var(--plot-green)', width: 1.5 },
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
