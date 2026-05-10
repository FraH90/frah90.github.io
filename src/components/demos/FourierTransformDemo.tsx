import { useState, useMemo } from 'react';
import Slider from '../ui/Slider';
import PlotlyChart from '../ui/PlotlyChart';

type WindowType = 'rectangular' | 'hann' | 'hamming' | 'blackman';

const N = 512;
const fs = 1000; // Hz

function applyWindow(signal: number[], type: WindowType): number[] {
  return signal.map((s, n) => {
    let w = 1;
    if (type === 'hann')    w = 0.5 * (1 - Math.cos(2 * Math.PI * n / (N - 1)));
    if (type === 'hamming') w = 0.54 - 0.46 * Math.cos(2 * Math.PI * n / (N - 1));
    if (type === 'blackman')w = 0.42 - 0.5 * Math.cos(2 * Math.PI * n / (N - 1)) + 0.08 * Math.cos(4 * Math.PI * n / (N - 1));
    return s * w;
  });
}

function computeDFT(signal: number[]) {
  const re = new Array(N).fill(0);
  const im = new Array(N).fill(0);
  for (let k = 0; k < N / 2; k++) {
    for (let n = 0; n < N; n++) {
      const angle = -2 * Math.PI * k * n / N;
      re[k] += signal[n] * Math.cos(angle);
      im[k] += signal[n] * Math.sin(angle);
    }
  }
  return re.map((r, k) => Math.sqrt(r * r + im[k] * im[k]) / N);
}

export default function FourierTransformDemo() {
  const [f1, setF1]   = useState(50);
  const [a1, setA1]   = useState(1.0);
  const [f2, setF2]   = useState(120);
  const [a2, setA2]   = useState(0.5);
  const [f3, setF3]   = useState(200);
  const [a3, setA3]   = useState(0.3);
  const [window, setWindow] = useState<WindowType>('rectangular');

  const t = useMemo(() => Array.from({ length: N }, (_, n) => n / fs), []);

  const { freqs, mag, timeSig } = useMemo(() => {
    const raw = t.map(ti =>
      a1 * Math.sin(2 * Math.PI * f1 * ti) +
      a2 * Math.sin(2 * Math.PI * f2 * ti) +
      a3 * Math.sin(2 * Math.PI * f3 * ti)
    );
    const windowed = applyWindow(raw, window);
    const mag = computeDFT(windowed);
    const freqs = Array.from({ length: N / 2 }, (_, k) => k * fs / N);
    return { freqs, mag, timeSig: raw };
  }, [f1, a1, f2, a2, f3, a3, window, t]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-3 border border-zinc-800 rounded p-3">
          <span className="text-xs font-mono text-zinc-400 uppercase">Component 1</span>
          <Slider label="f₁ (Hz)" min={10} max={450} step={5} value={f1} onChange={setF1} decimals={0} unit=" Hz" />
          <Slider label="A₁" min={0} max={2} step={0.1} value={a1} onChange={setA1} />
        </div>
        <div className="flex flex-col gap-3 border border-zinc-800 rounded p-3">
          <span className="text-xs font-mono text-zinc-400 uppercase">Component 2</span>
          <Slider label="f₂ (Hz)" min={10} max={450} step={5} value={f2} onChange={setF2} decimals={0} unit=" Hz" />
          <Slider label="A₂" min={0} max={2} step={0.1} value={a2} onChange={setA2} />
        </div>
        <div className="flex flex-col gap-3 border border-zinc-800 rounded p-3">
          <span className="text-xs font-mono text-zinc-400 uppercase">Component 3</span>
          <Slider label="f₃ (Hz)" min={10} max={450} step={5} value={f3} onChange={setF3} decimals={0} unit=" Hz" />
          <Slider label="A₃" min={0} max={2} step={0.1} value={a3} onChange={setA3} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-zinc-500">Window:</span>
        {(['rectangular', 'hann', 'hamming', 'blackman'] as WindowType[]).map(w => (
          <button
            key={w}
            onClick={() => setWindow(w)}
            className={`text-xs font-mono px-2.5 py-1 rounded transition-colors ${
              window === w
                ? 'bg-emerald-400/20 text-emerald-400'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      <PlotlyChart
        data={[{ x: t.slice(0, 200), y: timeSig.slice(0, 200), type: 'scatter', mode: 'lines',
                 line: { color: '#34d399', width: 1 }, name: 'signal' }]}
        layout={{ title: { text: 'Time Domain', font: { size: 12 } },
                  xaxis: { title: 'time (s)' }, yaxis: { title: 'amplitude' } }}
        className="w-full h-48"
      />

      <PlotlyChart
        data={[{ x: freqs, y: mag, type: 'bar', marker: { color: '#818cf8' }, name: '|X[f]|' }]}
        layout={{ title: { text: 'Magnitude Spectrum', font: { size: 12 } },
                  xaxis: { title: 'frequency (Hz)', range: [0, 500] },
                  yaxis: { title: '|X[f]|' },
                  bargap: 0 }}
        className="w-full h-64"
      />
    </div>
  );
}
