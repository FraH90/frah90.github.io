import { demoLabel } from './article-status';
// Native form/link navigation remains available; the search engine loads on demand.
type ResultData = { url: string; meta: { title?: string; topic?: string; status?: string }; excerpt: string };
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
  status.textContent = 'Search could not load. Submit your search to retry, or browse by topic below.';
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
      const topic = document.createElement('p');
      topic.className = 'text-sm text-muted mb-2';
      topic.textContent = result.meta.topic ?? '';
      if (result.meta.status === demoLabel) {
        const badge = document.createElement('span');
        badge.className = 'demo-badge ml-3';
        badge.textContent = demoLabel;
        topic.append(badge);
      }
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
    const firstLink = fragment.querySelector('a');
    list.append(fragment);
    if (focusNew) firstLink?.focus();
    shown += batch.length;
    more.textContent = 'Show more results';
    status.textContent = matches.length === 0
      ? `No articles found for “${query}”. Try fewer words or browse a topic.`
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
    status.textContent = 'Enter a search, or browse by topic below.';
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
