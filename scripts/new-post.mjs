import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { topicSlugs } from '../src/lib/topics.ts';

// An article is a folder: blog/<YYYY-MM-DD>-<slug>/index.mdx, with figures/ and data/ beside it.
const [name, ...extra] = process.argv.slice(2);
const match = name?.match(/^([a-z]+)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/);
if (!match || extra.length || !topicSlugs.includes(match[1])) {
  console.error(`Usage: npm run new:post -- <category>/<article-slug>\nCategories: ${topicSlugs.join(', ')}`);
  process.exitCode = 1;
} else {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const today = new Date().toISOString().slice(0, 10);
  const folder = `blog/${today}-${match[2]}`;
  const template = readFileSync(join(root, 'docs/templates/article.mdx'), 'utf8')
    .replace(/^date: .*$/m, `date: ${today}`)
    .replace(/^category: .*$/m, `category: ${match[1]}`)
    .replace(/^tags: .*$/m, `tags: [${match[1]}]`);
  try {
    mkdirSync(join(root, folder), { recursive: true });
    writeFileSync(join(root, folder, 'index.mdx'), template, { flag: 'wx' });
    console.log(`Created draft: ${folder}/index.mdx`);
  } catch (error) {
    if (error.code === 'EEXIST') console.error(`Article already exists: ${folder}. Nothing was overwritten.`);
    else console.error(error.message);
    process.exitCode = 1;
  }
}
