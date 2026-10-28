for (const section of document.querySelectorAll<HTMLElement>('.interactive-demo')) {
  const button = section.querySelector<HTMLButtonElement>('[data-demo-expand]')!;
  const label = button.getAttribute('aria-label')!.replace(/^Expand /, '');
  button.hidden = false;
  const toggle = (expanded: boolean) => {
    section.classList.toggle('demo-expanded', expanded);
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', `${expanded ? 'Restore' : 'Expand'} ${label}`);
    button.title = expanded ? 'Restore plot width' : 'Expand plot';
  };
  document.addEventListener('reading-reset', () => toggle(false));
  button.addEventListener('click', () => toggle(button.getAttribute('aria-expanded') !== 'true'));
  section.addEventListener('keydown', event => {
    if (event.key === 'Escape' && section.classList.contains('demo-expanded')) {
      event.preventDefault(); event.stopPropagation(); toggle(false); button.focus({ preventScroll: true });
    }
  }, true);
}
