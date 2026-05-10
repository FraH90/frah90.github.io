import { useEffect, useRef } from 'react';

interface Props {
  data: object[];
  layout?: object;
  className?: string;
}

export default function PlotlyChart({ data, layout, className = 'w-full h-96' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Dynamic import so Plotly never runs at build time (would crash on window access)
    import('plotly.js-dist-min').then((Plotly: any) => {
      const defaultLayout = {
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: { color: '#a1a1aa', family: 'monospace', size: 11 },
        xaxis: { gridcolor: '#27272a', zerolinecolor: '#3f3f46' },
        yaxis: { gridcolor: '#27272a', zerolinecolor: '#3f3f46' },
        margin: { t: 40, r: 20, b: 50, l: 50 },
        ...layout,
      };
      Plotly.react(el, data, defaultLayout, { responsive: true, displayModeBar: false });
    });
  }, [data, layout]);

  return <div ref={ref} className={className} />;
}
