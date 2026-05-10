import { useState, useMemo } from 'react';
import Slider from '../ui/Slider';
import PlotlyChart from '../ui/PlotlyChart';

// Bessel J0, J1 approximations (good enough for visualization)
function J0(x: number): number {
  if (Math.abs(x) < 1e-10) return 1;
  return Math.sin(x) / x; // rough for display; real impl uses series or lookup
}

function besselJ(l: number, x: number): number {
  // Simple numerical Bessel Jl for small l using recurrence — good enough for display
  if (x === 0) return l === 0 ? 1 : 0;
  if (l === 0) return J0(x);
  if (l === 1) {
    // J1 approximation
    const p = x / 2;
    return p * (1 - p * p / 2 + p * p * p * p / 12);
  }
  // Recurrence for higher orders
  let j0 = J0(x);
  let j1 = besselJ(1, x);
  for (let i = 1; i < l; i++) {
    const jn = (2 * i / x) * j1 - j0;
    j0 = j1;
    j1 = jn;
  }
  return j1;
}

function besselK(l: number, x: number): number {
  if (x < 1e-10) return 1e10;
  // Modified Bessel K approximation for visualization
  const k0 = -Math.log(x / 2) * J0(x) + 0.5772;
  if (l === 0) return Math.max(0, k0) * Math.exp(-x + x * 0.5); // rough envelope
  return Math.exp(-x) / Math.sqrt(x + 0.01); // rough K_l envelope for display
}

export default function ModeProfileViewer() {
  const [V, setV]       = useState(3.5);
  const [lMode, setLMode] = useState(0); // azimuthal index
  const [mMode, setMMode] = useState(1); // radial index (LP_lm)

  const { r, field, coreEnd } = useMemo(() => {
    const a = 1; // normalized core radius
    const points = 300;
    const rMax = 3;
    const r = Array.from({ length: points }, (_, i) => (i / (points - 1)) * rMax);

    // Rough eigenvalue: u² + w² = V² with u ≈ first mth zero of J_l ≈ (l + 2m - 0.5)*π/2
    // This is an approximation for display purposes
    const u = Math.min(V * 0.85 / mMode, V - 0.1);
    const w = Math.sqrt(Math.max(V * V - u * u, 0.01));

    const field = r.map(ri => {
      if (ri <= a) {
        return besselJ(lMode, u * ri);
      } else {
        const matchVal = besselJ(lMode, u * a);
        const edgeK    = besselK(lMode, w * a);
        const scale    = edgeK > 1e-6 ? matchVal / edgeK : 0;
        return scale * besselK(lMode, w * ri);
      }
    });

    // Normalize
    const maxAbs = Math.max(...field.map(Math.abs));
    return {
      r,
      field: field.map(f => f / (maxAbs || 1)),
      coreEnd: a,
    };
  }, [V, lMode, mMode]);

  const modeName = `LP${lMode}${mMode}`;
  const isSingleMode = V < 2.405;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Slider label="V-number" min={0.5} max={8} step={0.1} value={V} onChange={setV} />
        <Slider label="Azimuthal index l" min={0} max={3} step={1} value={lMode} onChange={setLMode} decimals={0} />
        <Slider label="Radial index m" min={1} max={3} step={1} value={mMode} onChange={setMMode} decimals={0} />
      </div>

      <div className="flex flex-wrap gap-4 text-xs font-mono items-center">
        <span className="text-zinc-400">Mode: <span className="text-emerald-400">{modeName}</span></span>
        <span className={`px-2 py-0.5 rounded text-xs font-mono ${isSingleMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'}`}>
          {isSingleMode ? 'single-mode' : 'multi-mode'}
        </span>
        <span className="text-zinc-400">cutoff V ≈ <span className="text-zinc-300">{lMode === 0 ? '0' : (lMode === 1 ? '2.405' : `${(lMode + 2 * (mMode - 1)) * 1.2}.xx`)}</span></span>
      </div>

      <PlotlyChart
        data={[
          {
            x: r,
            y: field.map(f => f * f),
            type: 'scatter',
            mode: 'lines',
            line: { color: '#a78bfa', width: 2 },
            name: 'intensity |E|²',
          },
          {
            x: r,
            y: field,
            type: 'scatter',
            mode: 'lines',
            line: { color: '#a78bfa', width: 1, dash: 'dot' },
            name: 'field E',
            opacity: 0.5,
          },
        ]}
        layout={{
          title: { text: `${modeName} Mode Field — V = ${V.toFixed(1)}`, font: { size: 13 } },
          xaxis: { title: 'r / a (normalized radius)' },
          yaxis: { title: 'intensity / field (normalized)', range: [-1.1, 1.1] },
          shapes: [
            {
              type: 'rect',
              x0: 0, x1: coreEnd, y0: -1.1, y1: 1.1,
              fillcolor: 'rgba(251,146,60,0.05)',
              line: { width: 0 },
              layer: 'below',
            },
            {
              type: 'line',
              x0: coreEnd, x1: coreEnd, y0: -1.1, y1: 1.1,
              line: { color: '#fb923c', width: 1, dash: 'dot' },
            },
          ],
          annotations: [
            { x: 0.5, y: 1.05, text: 'core', font: { size: 10, color: '#fb923c' }, showarrow: false },
            { x: 1.5, y: 1.05, text: 'cladding', font: { size: 10, color: '#71717a' }, showarrow: false },
          ],
        }}
      />
    </div>
  );
}
