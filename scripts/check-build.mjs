/** Check public output rather than implementation details. Run after npm run build. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const output = resolve('dist');
assert.ok(existsSync(output), 'Build the site before checking output');
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}
const files = walk(output);
function assertTarget(url, source) {
  if (url.origin !== 'https://frah90.github.io') return;
  const path = resolve(output, `.${decodeURIComponent(url.pathname)}`);
  assert.ok(path === output || path.startsWith(`${output}/`), `Invalid path in ${source}`);
  assert.ok(existsSync(path) && (!statSync(path).isDirectory() || existsSync(join(path, 'index.html'))), `Missing target ${url.pathname} in ${source}`);
}
// Validate rendered fragment targets as well as files (contents, figures, citations).
const documents = new Map();
const decode = text => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
for (const file of files.filter(path => path.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map(match => decode(match[1]));
  assert.equal(new Set(ids).size, ids.length, `Duplicate IDs in ${file}`);
  documents.set(file, new Set(ids));
}
let pages = 0;
for (const file of files.filter(path => path.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  assert.ok(!html.includes('/cv.pdf') || existsSync(join(output, 'cv.pdf')), `Dead CV link in ${file}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1].replaceAll('&amp;', '&');
    if (/^(?:#|\/|https:\/\/frah90\.github\.io(?:\/|$))/.test(target)) {
      const route = file.slice(output.length).replace(/index\.html$/, '');
      const url = new URL(target, `https://frah90.github.io${route}`);
      assertTarget(url, file);
      if (url.origin === 'https://frah90.github.io' && url.hash) {
        let destination = resolve(output, `.${decodeURIComponent(url.pathname)}`);
        if (statSync(destination).isDirectory()) destination = join(destination, 'index.html');
        const ids = documents.get(destination);
        if (ids) assert.ok(ids.has(decodeURIComponent(url.hash.slice(1))), `Missing fragment ${url.hash} in ${destination} (linked from ${file})`);
      }
    }
  }
  for (const match of html.matchAll(/<meta property="og:image" content="([^"]+)"/g)) {
    assertTarget(new URL(match[1]), file);
  }
  if (file.endsWith('/index.html') && !html.includes('http-equiv="refresh"')) {
    assert.match(html, /aria-label="Main navigation"/, `Missing main navigation in ${file}`);
    assert.match(html, /id="main-content"/, `Missing skip-link destination in ${file}`);
    assert.match(html, /<link rel="canonical" href="https:\/\/frah90\.github\.io\//, `Invalid canonical URL in ${file}`);
  }
  pages++;
}
assert.ok(pages > 0, 'No built pages found; wait for a successful production build');
assert.ok(existsSync(join(output, 'blog/index.html')), 'Writing index missing');
assert.ok(existsSync(join(output, 'about/index.html')), 'About page missing');
const urls = files.filter(path => /sitemap.*\.xml$/.test(path)).flatMap(path =>
  [...readFileSync(path, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1])));
assert.ok(urls.length > 0, 'Missing or empty sitemap');
for (const url of urls) {
  assertTarget(url, 'sitemap');
  assert.ok(!['/', '/projects', '/projects/'].includes(url.pathname), `Redirect in sitemap: ${url.pathname}`);
  assert.ok(!/^\/(?:\.work|research|docs)\//.test(url.pathname), `Planning material in sitemap: ${url.pathname}`);
}
assert.ok(!['.work', 'research', 'docs'].some(dir => existsSync(join(output, dir))), 'Planning material copied into public output');
// Search and feed must cover exactly the published article routes.
const articleFiles = files.filter(path => path.endsWith('.html') && readFileSync(path, 'utf8').includes('data-pagefind-body'));
const articleUrls = articleFiles.map(path => `https://frah90.github.io${path.slice(output.length).replace(/\/index\.html$/, '')}`).sort();
assert.ok(existsSync(join(output, 'search/index.html')), 'Search page missing');
assert.ok(existsSync(join(output, 'pagefind/pagefind.js')), 'Search engine missing: run the complete npm run build');
const entry = JSON.parse(readFileSync(join(output, 'pagefind/pagefind-entry.json'), 'utf8'));
assert.equal(Object.values(entry.languages).reduce((sum, lang) => sum + lang.page_count, 0), articleUrls.length, 'Search index/article count mismatch');
const feed = readFileSync(join(output, 'rss.xml'), 'utf8');
assert.match(feed, /<rss version="2.0"/);
assert.match(feed, /rel="self" type="application\/rss\+xml"/);
const items = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(match => match[1]);
const feedUrls = items.map(item => item.match(/<link>([^<]+)<\/link>/)?.[1]).sort();
assert.deepEqual(feedUrls, articleUrls, 'RSS must contain exactly the published article routes');
for (const item of items) {
  assert.match(item, /<guid isPermaLink="true">https:\/\/frah90\.github\.io\/blog\//);
  assert.ok(Number.isFinite(Date.parse(item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1])), 'Invalid RSS publication date');
}
for (const file of files.filter(path => path.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes('http-equiv="refresh"')) assert.match(html, /rel="alternate" type="application\/rss\+xml"/, `Missing RSS autodiscovery in ${file}`);
}
// Editorial demo status must agree between public article HTML and RSS.
for (const file of articleFiles) {
  const html = readFileSync(file, 'utf8');
  const url = `https://frah90.github.io${file.slice(output.length).replace(/\/index\.html$/, '')}`;
  const item = items.find(item => item.includes(`<link>${url}</link>`));
  const demo = html.includes('data-article-demo="true"');
  assert.equal(item.includes('<category>Demo</category>'), demo, `RSS demo status mismatch: ${url}`);
  if (demo) {
    assert.ok(!html.includes('class="demo-notice'), `Persistent demo notice in ${file}`);
    assert.match(html, /aria-describedby="demo-explanation"/);
    assert.match(html, /id="demo-explanation"[^>]*role="tooltip"/);
    assert.match(html, /not a reviewed research publication/);
    assert.match(item, /<title>Demo — /);
  }
}
for (const file of files.filter(path => path.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  assert.ok(!/href="mailto:/i.test(html), `Public contact email in ${file}`);
}
console.log(`Build output passed: ${pages} pages, internal links/assets/fragments, duplicate IDs, CV eligibility, social image, navigation, sitemap, planning boundaries, search index/article count, RSS article membership/dates, feed discovery, demo status, and contact omission.`);
