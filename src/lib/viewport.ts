/** Usable browser layout size in CSS pixels; independent of monitor resolution/DPR. */
export function readViewport() {
  return { width: document.documentElement.clientWidth, height: window.innerHeight };
}

/** Never shrink the normal chart; use one factor for both expanded dimensions. */
export function fitPlotScale(normalWidth: number, normalHeight: number, availableWidth: number, availableHeight: number, maximum: number) {
  if (normalWidth <= 0 || normalHeight <= 0) return 1;
  return Math.max(1, Math.min(maximum, availableWidth / normalWidth, availableHeight / normalHeight));
}

let lengthProbe: HTMLDivElement | undefined;
/** Resolve a CSS length token, including rem/clamp(), using the browser's layout. */
export function readCssLength(token: string) {
  if (!lengthProbe) {
    lengthProbe = document.createElement('div');
    lengthProbe.setAttribute('aria-hidden', 'true');
    lengthProbe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;height:0;inset:0 auto auto 0;';
    document.body.append(lengthProbe);
  }
  lengthProbe.style.width = `var(${token})`;
  return lengthProbe.getBoundingClientRect().width;
}
