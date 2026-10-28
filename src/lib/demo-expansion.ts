import { fitPlotScale, readViewport, readCssLength } from './viewport';

for (const section of document.querySelectorAll<HTMLElement>('.interactive-demo')) {
  const button = section.querySelector<HTMLButtonElement>('[data-demo-expand]')!;
  const label = button.getAttribute('aria-label')!.replace(/^Expand /, '');
  const column = section.parentElement!;
  let expanded = false;
  let frame = 0;
  const length = (value: string, rootSize: number) => parseFloat(value) * (value.trim().endsWith('rem') ? rootSize : 1);
  const update = () => {
    frame = 0;
    const plots = [...section.querySelectorAll<HTMLElement>('.plotly-chart')];
    // Before the engine mounts (or on failure), keep the calculated reference intact.
    if (!plots.length) { button.hidden = true; return; }
    button.hidden = false;
    const root = getComputedStyle(document.documentElement);
    const rootSize = parseFloat(root.fontSize);
    const viewport = readViewport();
    const main = document.querySelector<HTMLElement>('#main-content')!.getBoundingClientRect();
    const availableWidth = Math.min(viewport.width, main.width) - 2 * readCssLength('--page-gutter');
    const availableHeight = viewport.height - length(root.getPropertyValue('--header-height'), rootSize)
      - 2 * length(root.getPropertyValue('--plot-viewport-padding'), rootSize)
      - section.firstElementChild!.getBoundingClientRect().height;
    const normalSectionWidth = column.getBoundingClientRect().width;
    const chrome = section.getBoundingClientRect().width - plots[0].getBoundingClientRect().width;
    const normalPlotWidth = normalSectionWidth - chrome;
    const maximumHeight = Math.max(...plots.map(plot => length(getComputedStyle(plot).getPropertyValue('--normal-plot-height'), rootSize)));
    const factor = fitPlotScale(normalPlotWidth, maximumHeight, availableWidth - chrome, availableHeight,
      parseFloat(root.getPropertyValue('--plot-max-scale')));
    section.style.setProperty('--plot-fitted-scale', String(factor));
    section.style.setProperty('--plot-fitted-width', `${chrome + normalPlotWidth * factor}px`);
    button.disabled = !expanded && factor <= 1.001;
    button.title = expanded ? 'Restore plot size' : button.disabled ? 'Plot already fills the available space' : 'Expand plot';
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const toggle = (value: boolean) => {
    expanded = value;
    update();
    section.classList.toggle('demo-expanded', value);
    button.setAttribute('aria-expanded', String(value));
    button.setAttribute('aria-label', `${value ? 'Restore' : 'Expand'} ${label}`);
  };
  document.addEventListener('reading-reset', () => toggle(false));
  button.addEventListener('click', () => toggle(!expanded));
  section.addEventListener('keydown', event => {
    if (event.key === 'Escape' && expanded) {
      event.preventDefault(); event.stopPropagation(); toggle(false); button.focus({ preventScroll: true });
    }
  }, true);
  const observer = new ResizeObserver(schedule);
  observer.observe(column);
  observer.observe(document.querySelector('#main-content')!);
  // Height presets change at responsive breakpoints; loaded/error states change the DOM.
  const mutations = new MutationObserver(schedule);
  mutations.observe(section.querySelector('[data-demo-live]')!, { childList: true });
  section.addEventListener('plot-ready', schedule);
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  update();
}
