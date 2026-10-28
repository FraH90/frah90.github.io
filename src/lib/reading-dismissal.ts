// A click outside the active reading tools returns the page to its normal layout.
// Preserve links, controls, interactions inside plots/panels, and text selection.
document.addEventListener('click', event => {
  const target = event.target;
  if (!(target instanceof Element) || event.defaultPrevented) return;
  if (target.closest('.panel-drawer, .interactive-demo, .reading-panel, a, button, input, select, textarea, label, summary')) return;
  if (!getSelection()?.isCollapsed) return;
  document.dispatchEvent(new Event('reading-reset'));
});
