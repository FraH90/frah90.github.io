// Native disclosures are the no-script fallback; dialogs add responsive focus behavior.
const docked = () => getComputedStyle(document.documentElement).getPropertyValue('--panel-docked').trim() === '1';
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const duration = () => {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--panel-duration').trim();
  return parseFloat(value) * (value.endsWith('ms') ? 1 : 1000);
};
interface Panel {
  dialog: HTMLDialogElement;
  trigger: HTMLElement;
  open: () => void;
  close: (immediate?: boolean, restoreFocus?: boolean) => Promise<void>;
}
let active: Panel | undefined;
let request = 0;
if (typeof HTMLDialogElement !== 'undefined') {
  for (const details of document.querySelectorAll<HTMLDetailsElement>('[data-reading-panel]')) {
    const trigger = details.querySelector<HTMLElement>('summary')!;
    const drawer = details.querySelector<HTMLElement>('.panel-drawer')!;
    const side = details.dataset.readingPanel!;
    const dialog = document.createElement('dialog');
    dialog.id = `${details.id}-dialog`;
    dialog.className = 'reading-dialog';
    dialog.dataset.side = side;
    dialog.setAttribute('aria-labelledby', drawer.querySelector('h2')!.id);
    dialog.append(drawer);
    document.body.append(dialog);
    trigger.setAttribute('aria-controls', dialog.id);
    trigger.setAttribute('aria-expanded', 'false');
    const button = drawer.querySelector<HTMLButtonElement>('.panel-close')!;
    button.hidden = false;
    let closing: Promise<void> | undefined;
    let finish: (() => void) | undefined;
    let modal = false;
    const panel: Panel = {
      dialog, trigger,
      open() {
        modal = !docked();
        if (modal) dialog.showModal(); else dialog.show();
        document.body.dataset.activePanel = side;
        trigger.setAttribute('aria-expanded', 'true');
        if (modal) trigger.setAttribute('aria-haspopup', 'dialog'); else trigger.removeAttribute('aria-haspopup');
        button.focus({ preventScroll: true });
        // Native dialog autofocus can scroll toward the initially off-screen drawer.
        // Keep that transient offset from shifting the whole panel on mobile WebKit.
        dialog.scrollLeft = 0;
        dialog.scrollTop = 0;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (dialog.open && !closing) {
            dialog.scrollLeft = 0;
            dialog.scrollTop = 0;
            dialog.classList.add('is-visible');
          }
        }));
      },
      close(immediate = false, restoreFocus = true) {
        if (!dialog.open) return Promise.resolve();
        if (closing) { if (immediate) finish?.(); return closing ?? Promise.resolve(); }
        closing = new Promise<void>(resolve => {
          let timer: ReturnType<typeof setTimeout>;
          finish = () => {
            clearTimeout(timer);
            dialog.close();
            dialog.classList.remove('is-visible', 'is-closing');
            trigger.setAttribute('aria-expanded', 'false');
            if (active === panel) { active = undefined; delete document.body.dataset.activePanel; }
            if (restoreFocus) trigger.focus({ preventScroll: true });
            finish = undefined;
            resolve();
          };
          dialog.classList.remove('is-visible');
          dialog.classList.add('is-closing');
          delete document.body.dataset.activePanel;
          if (immediate || reduced()) finish();
          else timer = setTimeout(() => finish?.(), duration() + 50);
        });
        const result = closing;
        result.then(() => { closing = undefined; });
        return result;
      },
    };
    trigger.addEventListener('click', async event => {
      event.preventDefault();
      const token = ++request;
      if (dialog.open) { await panel.close(); return; }
      if (active) await active.close(false, false);
      if (token !== request) return;
      active = panel;
      panel.open();
    });
    button.addEventListener('click', () => { ++request; void panel.close(); });
    dialog.addEventListener('cancel', event => { event.preventDefault(); void panel.close(); });
    drawer.addEventListener('transitionend', event => {
      if (event.target === drawer && event.propertyName === 'transform' && closing) finish?.();
    });
    drawer.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (!docked()) void panel.close(false, false).then(() => target?.focus({ preventScroll: true }));
        else requestAnimationFrame(() => target?.focus({ preventScroll: true }));
      });
    });
  }
  document.addEventListener('keydown', event => {
    if ((event.target as Element)?.closest?.('.demo-expanded')) return;
    if (event.key === 'Escape' && active && !event.defaultPrevented) {
      event.preventDefault(); event.stopPropagation(); ++request; void active.close();
    }
  }, true);
  let wasDocked = docked();
  window.addEventListener('resize', async () => {
    const now = docked();
    if (now === wasDocked) return;
    wasDocked = now;
    if (active) {
      const panel = active, token = ++request;
      await panel.close(true, false);
      if (token === request) { active = panel; panel.open(); }
    }
  });
}
// Background clicks restore the page without interrupting controls or content links.
document.addEventListener('reading-reset', () => {
  ++request;
  if (active) void active.close();
  for (const details of document.querySelectorAll<HTMLDetailsElement>('[data-reading-panel]')) details.open = false;
});
// Follow the reading position without a layout pass on every scroll event.
const links = [...document.querySelectorAll<HTMLAnchorElement>('.contents-drawer nav a')];
let scheduled = false;
const update = () => {
  scheduled = false;
  let current: HTMLAnchorElement | undefined;
  for (const link of links) {
    const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (heading && heading.getBoundingClientRect().top <= 160) current = link;
  }
  links.forEach(link => link === current ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
};
document.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
}, { passive: true });
update();
