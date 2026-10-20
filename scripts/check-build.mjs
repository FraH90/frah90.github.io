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
let pages = 0;
for (const file of files.filter(path => path.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  assert.ok(!html.includes('/cv.pdf') || existsSync(join(output, 'cv.pdf')), `Dead CV link in ${file}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1].replaceAll('&amp;', '&');
    if (/^(?:\/|https:\/\/frah90\.github\.io(?:\/|$))/.test(target)) {
      assertTarget(new URL(target, 'https://frah90.github.io'), file);
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
console.log(`Build output passed: ${pages} pages, internal links/assets, CV eligibility, social image, navigation, sitemap, and planning boundaries.`);
