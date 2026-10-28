import { useEffect, useRef, useState } from 'react';

interface Props {
  data: object[];
  layout?: object;
  className?: string;
  horizontalYLabel?: string;
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

export default function PlotlyChart({ data, layout, className = 'w-full h-72 sm:h-96', horizontalYLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const plotly = useRef<any>(null);
  const [themeVersion, setThemeVersion] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const update = () => setThemeVersion(version => version + 1);
    window.addEventListener('themechange', update);
    const element = ref.current;
    // A reading panel changes the chart container without resizing the window.
    // Plotly's responsive option alone only handles window resize events.
    let frame = 0;
    let disposed = false;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!element || !element.clientWidth || element.dataset.plotReady !== 'true') return;
        plotly.current?.Plots.resize(element).catch(() => {
          if (!disposed) setError(true);
        });
      });
    });
    if (element) observer.observe(element);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
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
      const font = { color: color('--muted'), family: 'monospace', size: 11 };
      const axis = (settings: any = {}) => ({
        color: color('--muted'), gridcolor: color('--rule'), zerolinecolor: color('--rule-strong'),
        automargin: true,
        ...settings,
        title: typeof settings.title === 'string' ? { text: settings.title } : settings.title,
      });
      const yLabel = horizontalYLabel ?? (typeof user.yaxis?.title === 'string' ? user.yaxis.title : user.yaxis?.title?.text);
      const themedLayout = {
        paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        margin: { t: 28, r: 10, b: 40, l: 36 },
        // Theme updates preserve the reader's zoom and legend selection.
        uirevision: 'preserve-view',
        ...user,
        title: { text: '' },
        dragmode: false,
        font: { ...font, ...user.font },
        xaxis: axis({ ...user.xaxis, fixedrange: true, automargin: false }),
        yaxis: axis({ ...user.yaxis, title: { text: '' }, fixedrange: true, automargin: false, labelalias: { ...user.yaxis?.labelalias, '0': '' } }),
        annotations: [
          ...(user.annotations ?? []),
          ...(yLabel ? [{
            text: yLabel, xref: 'paper', yref: 'paper', x: 0, y: 1,
            xanchor: 'left', yanchor: 'bottom', yshift: 6, showarrow: false, font,
          }] : []),
        ],
        legend: { ...user.legend, font: { ...font, ...user.legend?.font } },
        hoverlabel: { bgcolor: color('--surface'), bordercolor: color('--rule-strong'), font, ...user.hoverlabel },
      };
      await engine.react(element, resolveColors(data, styles), themedLayout, { responsive: true, displayModeBar: false });
      if (!cancelled) {
        setError(false);
        element.dataset.plotReady = 'true';
        element.dispatchEvent(new CustomEvent('plot-ready', { bubbles: true }));
      }
    }).catch(error => {
      if (!cancelled) {
        console.error('Unable to render chart', error);
        setError(true);
      }
    });
    return () => { cancelled = true; };
  }, [data, layout, themeVersion, horizontalYLabel]);

  if (error) throw new Error('Unable to render Plotly chart');

  return (
    <div className="min-w-0">
      {error && <p role="status" className="text-sm text-muted">This chart could not load. Reload the page to try again.</p>}
      <div ref={ref} className={className} data-plot-ready="false" role="img" aria-label={`${(layout as any)?.title?.text ?? 'Scientific plot'}. ${(layout as any)?.xaxis?.title ?? ''}; ${horizontalYLabel ?? (layout as any)?.yaxis?.title ?? ''}.`} />
    </div>
  );
}
