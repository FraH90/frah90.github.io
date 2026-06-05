interface Props {
  children: React.ReactNode;
  label?: string;
}

export default function InteractiveFrame({ children, label = 'Interactive' }: Props) {
  return (
    <div className="not-prose my-8 rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
      <div className="border-b border-zinc-800 px-4 py-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
