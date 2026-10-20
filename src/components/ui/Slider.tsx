import { useId } from 'react';

interface Props {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  decimals?: number;
  minLabel?: string;
  maxLabel?: string;
}

function fmt(value: number, decimals: number, unit: string) {
  return value.toFixed(decimals) + unit;
}

export default function Slider({
  label, min, max, step, value, onChange,
  unit = '', decimals = 2, minLabel, maxLabel,
}: Props) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <div className="flex flex-wrap justify-between items-baseline gap-x-2 gap-y-1">
        <label htmlFor={id} className="text-xs font-mono text-muted">{label}</label>
        <output htmlFor={id} className="text-xs font-mono text-accent">{fmt(value, decimals, unit)}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        aria-valuetext={fmt(value, decimals, unit)}
        onChange={event => onChange(Number(event.target.value))}
        className="w-full min-h-8 cursor-pointer accent-accent" />
      <div className="flex justify-between text-[11px] font-mono text-muted" aria-hidden="true">
        <span>{minLabel ?? fmt(min, decimals, unit)}</span>
        <span>{maxLabel ?? fmt(max, decimals, unit)}</span>
      </div>
    </div>
  );
}
