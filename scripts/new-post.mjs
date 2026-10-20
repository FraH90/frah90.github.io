import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { topicSlugs } from '../src/lib/topics.ts';

const [name, ...extra] = process.argv.slice(2);
const match = name?.match(/^([a-z]+)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/);
if (!match || extra.length || !topicSlugs.includes(match[1])) {
  console.error(`Usage: npm run new:post -- <topic>/<article-slug>\nTopics: ${topicSlugs.join(', ')}`);
  process.exitCode = 1;
} else {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const path = join(root, 'src/content/blog', match[1], `${match[2]}.mdx`);
  const template = readFileSync(join(root, 'docs/templates/article.mdx'), 'utf8')
    .replace(/^date: .*$/m, `date: ${new Date().toISOString().slice(0, 10)}`)
    .replace(/^category: .*$/m, `category: ${match[1]}`);
  try {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, template, { flag: 'wx' });
    console.log(`Created draft: src/content/blog/${name}.mdx`);
  } catch (error) {
    if (error.code === 'EEXIST') console.error(`Article already exists: ${name}. Nothing was overwritten.`);
    else console.error(error.message);
    process.exitCode = 1;
  }
}
