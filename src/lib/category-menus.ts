const menus = () => [...document.querySelectorAll<HTMLDetailsElement>('.category-menu')];
const owner = (target: EventTarget | null) => target instanceof Element ? target.closest<HTMLDetailsElement>('.category-menu') : null;
const closeOthers = (keep?: HTMLDetailsElement) => { for (const menu of menus()) if (menu !== keep) { menu.open = false; delete menu.dataset.hoverOpen; } };
document.addEventListener('pointerover', event => {
  const menu = owner(event.target);
  if (event.pointerType !== 'mouse' || !menu || (event.relatedTarget instanceof Node && menu.contains(event.relatedTarget))) return;
  closeOthers(menu); if (!menu.open) menu.dataset.hoverOpen = 'true'; menu.open = true;
});
document.addEventListener('pointerout', event => {
  const menu = owner(event.target);
  if (event.pointerType !== 'mouse' || !menu || (event.relatedTarget instanceof Node && menu.contains(event.relatedTarget))) return;
  if (document.documentElement.dataset.input === 'keyboard' && menu.contains(document.activeElement)) return;
  menu.open = false; delete menu.dataset.hoverOpen;
});
document.addEventListener('click', event => {
  const menu = owner(event.target);
  const summary = event.target instanceof Element ? event.target.closest('summary') : null;
  if (event.detail > 0 && menu?.dataset.hoverOpen && summary === menu.querySelector('summary')) {
    event.preventDefault(); delete menu.dataset.hoverOpen; menu.open = true;
  }
});
document.addEventListener('pointerdown', event => { const menu = owner(event.target); closeOthers(menu ?? undefined); });
document.addEventListener('focusout', event => {
  const menu = owner(event.target);
  if (!menu) return;
  requestAnimationFrame(() => { if (!menu.contains(document.activeElement) && !menu.matches(':hover')) menu.open = false; });
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const target = event.target instanceof Element ? event.target : null;
  const info = target?.closest<HTMLElement>('.demo-info');
  if (info && !info.dataset.dismissed) { info.dataset.dismissed = 'true'; event.preventDefault(); return; }
  const menu = owner(event.target);
  if (!menu?.open) return;
  menu.open = false; menu.querySelector<HTMLElement>('summary')?.focus(); event.preventDefault();
});
for (const name of ['pointerout', 'focusout'] as const) document.addEventListener(name, event => {
  const info = event.target instanceof Element ? event.target.closest<HTMLElement>('.demo-info') : null;
  if (info && !(event.relatedTarget instanceof Node && info.contains(event.relatedTarget))) delete info.dataset.dismissed;
});
document.addEventListener('reading-reset', () => closeOthers());
