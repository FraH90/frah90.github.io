// Start each small demo automatically; the static reference remains until it is ready.
const demos = {
  array: () => import('../components/demos/ArrayFactorDemo'),
  fourier: () => import('../components/demos/FourierTransformDemo'),
  gaussian: () => import('../components/demos/GaussianBeamDemo'),
  transmission: () => import('../components/demos/TransmissionLineDemo'),
};
for (const frame of document.querySelectorAll<HTMLElement>('[data-demo]')) {
  const kind = frame.dataset.demo as keyof typeof demos;
  const actions = frame.querySelector<HTMLElement>('[data-demo-actions]')!;
  const retry = frame.querySelector<HTMLButtonElement>('[data-demo-retry]')!;
  const reference = frame.querySelector<HTMLElement>('[data-demo-static]')!;
  const live = frame.querySelector<HTMLElement>('[data-demo-live]')!;
  const status = frame.querySelector<HTMLElement>('[data-demo-status]')!;
  let cleanup: (() => void) | undefined;
  let generation = 0;
  let timer: ReturnType<typeof setTimeout>;
  function failed(version: number) {
    if (version !== generation) return;
    generation++;
    clearTimeout(timer);
    live.removeAttribute('aria-busy');
    const hadFocus = live.contains(document.activeElement);
    const unmount = cleanup;
    cleanup = undefined;
    if (unmount) queueMicrotask(unmount);
    live.hidden = true;
    reference.hidden = false;
    status.hidden = false;
    status.textContent = 'The interactive controls could not load. The calculated reference remains available.';
    actions.hidden = false;
    retry.disabled = false;
    if (hadFocus) retry.focus();
  }
  async function load(manual = false) {
    const version = ++generation;
    actions.hidden = true;
    retry.disabled = true;
    status.hidden = false;
    status.textContent = 'Loading interactive controls…';
    live.setAttribute('aria-busy', 'true');
    timer = setTimeout(() => failed(version), 15000);
    try {
      const [{ mountDemo }, module] = await Promise.all([import('./demo-mount'), demos[kind]()]);
      if (version !== generation) return;
      live.hidden = false;
      cleanup = mountDemo(live, module.default, () => {
        if (version !== generation) return;
        clearTimeout(timer);
        reference.hidden = true;
        live.removeAttribute('aria-busy');
        status.textContent = '';
        status.hidden = true;
        // Automatic loading must never move a reader's keyboard focus or scroll.
        if (manual) live.focus({ preventScroll: true });
      }, () => failed(version));
    } catch { failed(version); }
  }
  retry.addEventListener('click', () => { void load(true); });
  void load();
  window.addEventListener('pagehide', event => {
    if (event.persisted) return;
    generation++;
    clearTimeout(timer);
    cleanup?.();
  });
}
