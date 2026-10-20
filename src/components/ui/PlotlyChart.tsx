import { useEffect, useRef, useState } from 'react';

interface Props {
  data: object[];
  layout?: object;
  className?: string;
}

// Plotly needs resolved colors rather than CSS var() strings in its layout/data.
function resolveColors(value: any, styles: CSSStyleDeclaration): any {
  if (typeof value === 'string' && /^var\(--[\w-]+\)$/.test(value)) {
    return styles.getPropertyValue(value.slice(4, -1)).trim();
  }
  if (Array.isArray(value)) return value.map(item => resolveColors(item, styles));
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveColors(item, styles)]));
  }
  return value;
}

export default function PlotlyChart({ data, layout, className = 'w-full h-96' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const plotly = useRef<any>(null);
  const [themeVersion, setThemeVersion] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const update = () => setThemeVersion(version => version + 1);
    window.addEventListener('themechange', update);
    const element = ref.current;
    return () => {
      window.removeEventListener('themechange', update);
      if (element && plotly.current) plotly.current.purge(element);
    };
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let cancelled = false;

    // Dynamic import keeps browser-only plotting out of Astro's build-time render.
    import('plotly.js-dist-min').then(async module => {
      if (cancelled) return;
      // Production exposes a bundled default; the unoptimized dev UMD sets window.Plotly.
      const engine = module.default ?? (typeof module.react === 'function' ? module : (window as any).Plotly);
      if (!engine?.react) throw new Error('Plotly did not initialize');
      plotly.current = engine;
      const styles = getComputedStyle(document.documentElement);
      const color = (name: string) => styles.getPropertyValue(name).trim();
      const user = resolveColors(layout ?? {}, styles);
      const font = { color: color('--muted'), family: 'Inter, system-ui, sans-serif', size: 12 };
      const axis = (settings: any = {}) => ({
        color: color('--muted'), gridcolor: color('--rule'), zerolinecolor: color('--rule-strong'),
        automargin: true,
        ...settings,
        title: typeof settings.title === 'string' ? { text: settings.title } : settings.title,
      });
      const themedLayout = {
        paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        margin: { t: 50, r: 20, b: 55, l: 55 },
        // Theme updates preserve the reader's zoom and legend selection.
        uirevision: 'preserve-view',
        ...user,
        font: { ...font, ...user.font },
        xaxis: axis(user.xaxis), yaxis: axis(user.yaxis),
        legend: { ...user.legend, font: { ...font, ...user.legend?.font } },
        hoverlabel: { bgcolor: color('--surface'), bordercolor: color('--rule-strong'), font, ...user.hoverlabel },
      };
      await engine.react(element, resolveColors(data, styles), themedLayout, { responsive: true, displayModeBar: false });
      if (!cancelled) setError(false);
    }).catch(error => {
      if (!cancelled) {
        console.error('Unable to render chart', error);
        setError(true);
      }
    });
    return () => { cancelled = true; };
  }, [data, layout, themeVersion]);

  return (
    <div className="min-w-0">
      {error && <p role="status" className="text-sm text-muted">This chart could not load. Reload the page to try again.</p>}
      <div ref={ref} className={className} />
    </div>
  );
}
