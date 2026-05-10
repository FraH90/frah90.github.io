interface Props {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  decimals?: number;
}

export default function Slider({ label, min, max, step, value, onChange, unit = '', decimals = 2 }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-mono text-zinc-400">{label}</label>
        <span className="text-xs font-mono text-emerald-400">
          {value.toFixed(decimals)}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded appearance-none bg-zinc-700 cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-emerald-400"
      />
      <div className="flex justify-between text-[10px] font-mono text-zinc-600">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
