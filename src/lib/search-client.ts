import { getCategoryTags, retiredTagCategories } from './tags';
import { topics } from './topics';
import { demoLabel, demoNotice } from './article-status';
// Native form/link navigation remains available; the search engine loads on demand.
type ResultData = { url: string; meta: { title?: string; tagIds?: string; tags?: string; topic?: string; status?: string }; excerpt: string };
type Result = { data: () => Promise<ResultData> };
type Search = { destroy: () => Promise<void>; search: (query: string) => Promise<{ results: Result[] }> };
const form = document.querySelector<HTMLFormElement>('#article-search')!;
const input = document.querySelector<HTMLInputElement>('#search-query')!;
const status = document.querySelector<HTMLElement>('#search-status')!;
const list = document.querySelector<HTMLOListElement>('#search-results')!;
const more = document.querySelector<HTMLButtonElement>('#search-more')!;
let engine: Promise<Search> | undefined;
let generation = 0;
let matches: Result[] = [];
let shown = 0;
let query = '';
let retryAll = false;
async function resetEngine() {
  const failed = engine;
  engine = undefined;
  await failed?.then(search => search.destroy()).catch(() => {});
}

function fail() {
  status.textContent = 'Search could not load. Submit your search to retry, or browse by category below.';
}
async function showBatch(version: number, focusNew = false) {
  more.hidden = true;
  list.setAttribute('aria-busy', 'true');
  try {
    const batch = await Promise.all(matches.slice(shown, shown + 10).map(result => result.data()));
    if (version !== generation) return;
    const fragment = document.createDocumentFragment();
    for (const result of batch) {
      // Only local article routes are valid search destinations.
      const url = new URL(result.url, location.origin);
      if (url.origin !== location.origin || !/^\/blog\/[^/]+\/[^/]+\/?$/.test(url.pathname)) continue;
      const item = document.createElement('li');
      const topic = document.createElement('div');
      topic.className = 'card-meta';
      const ids = result.meta.tagIds?.split(/\s+/).filter(Boolean) ?? [];
      const category = topics.find(topic => topic.slug === url.pathname.split('/')[2]);
      if (category) {
        const menu = document.createElement('details'); menu.className = 'category-menu';
        menu.style.setProperty('--category-color', `var(${category.tone})`);
        const summary = document.createElement('summary'); summary.className = 'category-badge'; summary.textContent = category.label;
        summary.setAttribute('aria-label', `${category.label} — show article tags`);
        const popover = document.createElement('div'); popover.className = 'category-popover';
        const tags = document.createElement('ul'); tags.className = 'tag-badges'; tags.setAttribute('aria-label', 'Article tags');
        const details = ids.flatMap(id => { try { return getCategoryTags([id], category.slug); } catch { return []; } });
        for (const tag of details) {
          const li = document.createElement('li'), badge = document.createElement('a');
          badge.className = 'tag-badge'; badge.href = retiredTagCategories[tag.slug] ? `/tags/${tag.slug}` : `/categories/${category.slug}/${tag.slug}`; badge.textContent = tag.label;
          li.append(badge); tags.append(li);
        }
        if (result.meta.status === demoLabel) {
          const info = document.createElement('li'); info.className = 'demo-info';
          const badge = document.createElement('button'); badge.type = 'button'; badge.className = 'tag-badge demo-badge'; badge.textContent = demoLabel;
          const explanation = document.createElement('span'); explanation.id = `search-demo-${url.pathname.replaceAll('/', '-')}`;
          explanation.className = 'demo-tooltip'; explanation.setAttribute('role', 'tooltip'); explanation.textContent = demoNotice;
          badge.setAttribute('aria-describedby', explanation.id); info.append(badge, explanation); tags.append(info);
        }
        popover.append(tags); menu.append(summary, popover); topic.append(menu);
      } else topic.textContent = result.meta.topic ?? '';
      const heading = document.createElement('h2');
      const link = document.createElement('a');
      link.href = url.pathname + url.hash;
      link.textContent = result.meta.title ?? 'Read article';
      heading.append(link);
      const excerpt = document.createElement('p');
      // Pagefind encodes article text and adds only its own <mark> tags.
      excerpt.innerHTML = result.excerpt;
      item.append(topic, heading, excerpt);
      fragment.append(item);
    }
    const firstLink = fragment.querySelector('h2 a');
    list.append(fragment);
    if (focusNew) firstLink?.focus();
    shown += batch.length;
    more.textContent = 'Show more results';
    status.textContent = matches.length === 0
      ? `No articles found for “${query}”. Try fewer words or browse a category.`
      : `${matches.length} ${matches.length === 1 ? 'article' : 'articles'} found for “${query}”. Showing ${shown}.`;
    more.hidden = shown >= matches.length;
  } catch {
    if (version === generation) {
      await resetEngine();
      if (version !== generation) return;
      retryAll = true;
      fail();
      more.hidden = false;
      more.textContent = 'Retry search';
      if (focusNew) more.focus();
    }
  } finally {
    if (version === generation) list.removeAttribute('aria-busy');
  }
}
async function search(updateUrl = true) {
  const version = ++generation;
  retryAll = false;
  query = input.value.trim().slice(0, 200);
  input.value = query;
  list.replaceChildren();
  matches = [];
  shown = 0;
  more.hidden = true;
  more.textContent = 'Show more results';
  if (updateUrl) {
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    history.replaceState(null, '', url);
  }
  if (!query) {
    list.removeAttribute('aria-busy');
    status.textContent = 'Enter a search, or browse by category below.';
    return;
  }
  status.textContent = 'Searching articles…';
  list.setAttribute('aria-busy', 'true');
  try {
    const modulePath = '/pagefind/pagefind.js';
    engine ??= import(/* @vite-ignore */ modulePath).catch(error => { engine = undefined; throw error; });
    const results = await (await engine).search(query);
    if (version !== generation) return;
    matches = results.results;
    await showBatch(version);
  } catch {
    if (version === generation) {
      await resetEngine();
      if (version === generation) { fail(); list.removeAttribute('aria-busy'); }
    }
  }
}
form.addEventListener('submit', event => { event.preventDefault(); void search(); });
more.addEventListener('click', () => { if (retryAll) void search(); else void showBatch(generation, true); });
input.addEventListener('keydown', event => {
  if (event.key === 'Escape') { input.value = ''; void search(); }
});
input.addEventListener('search', () => { if (!input.value) void search(); });
function restore() {
  input.value = new URL(location.href).searchParams.get('q')?.slice(0, 200) ?? '';
  void search(false);
}
window.addEventListener('popstate', restore);
restore();
// Dedicated search navigation places the keyboard at its primary control.
// Avoid stealing focus when returning via browser history or following a fragment.
if (!location.hash && (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type !== 'back_forward') input.focus({ preventScroll: true });
