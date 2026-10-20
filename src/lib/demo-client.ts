// This small controller is the only demo code loaded before explicit activation.
const demos = {
  array: () => import("../components/demos/ArrayFactorDemo"),
  fourier: () => import("../components/demos/FourierTransformDemo"),
  gaussian: () => import("../components/demos/GaussianBeamDemo"),
  transmission: () => import("../components/demos/TransmissionLineDemo"),
};
for (const frame of document.querySelectorAll<HTMLElement>("[data-demo]")) {
  const kind = frame.dataset.demo as keyof typeof demos;
  const start = frame.querySelector<HTMLButtonElement>("[data-demo-start]")!;
  const toggle = frame.querySelector<HTMLButtonElement>(
    "[data-demo-static-toggle]",
  )!;
  const reference = frame.querySelector<HTMLElement>("[data-demo-static]")!;
  const live = frame.querySelector<HTMLElement>("[data-demo-live]")!;
  const status = frame.querySelector<HTMLElement>("[data-demo-status]")!;
  let cleanup: (() => void) | undefined;
  let generation = 0;
  let timer: ReturnType<typeof setTimeout>;
  start.hidden = false;
  status.textContent = "Explore other settings with the interactive demo.";
  function failed(version: number) {
    if (version !== generation) return;
    generation++;
    clearTimeout(timer);
    live.removeAttribute("aria-busy");
    const hadFocus = live.contains(document.activeElement);
    const unmount = cleanup;
    cleanup = undefined;
    // Root error callbacks can run during React's commit; unmount afterwards.
    if (unmount) queueMicrotask(unmount);
    live.hidden = true;
    reference.hidden = false;
    toggle.hidden = true;
    status.textContent =
      "The interactive demo could not load. The calculated reference case remains available.";
    start.textContent = "Retry interactive demo";
    start.disabled = false;
    start.hidden = false;
    if (hadFocus) start.focus();
  }
  start.addEventListener("click", async () => {
    const version = ++generation;
    start.disabled = true;
    status.textContent =
      "Loading interactive demo… The reference case remains available.";
    live.setAttribute("aria-busy", "true");
    // A stalled download must not leave readers waiting indefinitely.
    timer = setTimeout(() => failed(version), 15000);
    try {
      const [{ mountDemo }, module] = await Promise.all([
        import("./demo-mount"),
        demos[kind](),
      ]);
      if (version !== generation) return;
      live.hidden = false;
      cleanup = mountDemo(
        live,
        module.default,
        () => {
          if (version !== generation) return;
          clearTimeout(timer);
          reference.hidden = true;
          start.hidden = true;
          toggle.hidden = false;
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "Show reference case";
          live.removeAttribute("aria-busy");
          status.textContent =
            "Interactive demo ready. The reference case can be shown below.";
          live.focus({ preventScroll: true });
        },
        () => failed(version),
      );
    } catch {
      failed(version);
    }
  });
  toggle.addEventListener("click", () => {
    reference.hidden = !reference.hidden;
    toggle.setAttribute("aria-expanded", String(!reference.hidden));
    toggle.textContent = reference.hidden
      ? "Show reference case"
      : "Hide reference case";
  });
  // Support browser back/forward cache without leaving an unmounted empty panel.
  window.addEventListener("pagehide", (event) => {
    if (event.persisted) return;
    generation++;
    clearTimeout(timer);
    cleanup?.();
  });
}
