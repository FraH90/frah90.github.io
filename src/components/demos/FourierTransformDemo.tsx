import { useState, useMemo } from 'react';
import Slider from '../ui/Slider';
import PlotlyChart from '../ui/PlotlyChart';

import { computeFourier, type WindowType } from '../../lib/demo-models';

export default function FourierTransformDemo() {
  const [f1, setF1]   = useState(50);
  const [a1, setA1]   = useState(1.0);
  const [f2, setF2]   = useState(120);
  const [a2, setA2]   = useState(0.5);
  const [f3, setF3]   = useState(200);
  const [a3, setA3]   = useState(0.3);
  const [window, setWindow] = useState<WindowType>('rectangular');

  const { time: t, signal: timeSig, x: freqs, y: mag } = useMemo(
    () => computeFourier([f1, f2, f3], [a1, a2, a3], window),
    [f1, f2, f3, a1, a2, a3, window],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-3 border border-rule rounded p-3">
          <span className="text-xs font-mono text-muted uppercase">Component 1</span>
          <Slider label="f₁ (Hz)" min={10} max={450} step={5} value={f1} onChange={setF1} decimals={0} unit=" Hz" />
          <Slider label="A₁" min={0} max={2} step={0.1} value={a1} onChange={setA1} />
        </div>
        <div className="flex flex-col gap-3 border border-rule rounded p-3">
          <span className="text-xs font-mono text-muted uppercase">Component 2</span>
          <Slider label="f₂ (Hz)" min={10} max={450} step={5} value={f2} onChange={setF2} decimals={0} unit=" Hz" />
          <Slider label="A₂" min={0} max={2} step={0.1} value={a2} onChange={setA2} />
        </div>
        <div className="flex flex-col gap-3 border border-rule rounded p-3">
          <span className="text-xs font-mono text-muted uppercase">Component 3</span>
          <Slider label="f₃ (Hz)" min={10} max={450} step={5} value={f3} onChange={setF3} decimals={0} unit=" Hz" />
          <Slider label="A₃" min={0} max={2} step={0.1} value={a3} onChange={setA3} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono text-muted">Window:</span>
        {(['rectangular', 'hann', 'hamming', 'blackman'] as WindowType[]).map(w => (
          <button
            key={w}
            type="button" aria-pressed={window === w}
            onClick={() => setWindow(w)}
            className={`text-xs font-mono px-2.5 py-1 rounded transition-colors ${
              window === w
                ? 'bg-accent/20 text-accent'
                : 'bg-elevated text-muted hover:text-ink'
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      <PlotlyChart
        data={[{ x: t.slice(0, 200), y: timeSig.slice(0, 200), type: 'scatter', mode: 'lines',
                 line: { color: 'var(--plot-green)', width: 1 }, name: 'signal' }]}
        layout={{ title: { text: 'Time Domain', font: { size: 12 } },
                  xaxis: { title: 'time (s)' }, yaxis: { title: 'Amplitude (a.u.)' } }}
        className="w-full h-48"
      />

      <PlotlyChart
        data={[{ x: freqs, y: mag, type: 'bar', marker: { color: 'var(--plot-purple)' }, name: '|X[f]|' }]}
        layout={{ title: { text: 'Magnitude Spectrum', font: { size: 12 } },
                  xaxis: { title: 'frequency (Hz)', range: [0, 500] },
                  yaxis: { title: '|X| (a.u.)', range: [0, (Math.max(...mag) || 1) * 1.05] },
                  bargap: 0 }}
        className="w-full h-64"
      />
    </div>
  );
}
