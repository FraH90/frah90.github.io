import assert from 'node:assert/strict';
import { compile } from '@mdx-js/mdx';
import endMatter from '../src/lib/remark-end-matter.mjs';

const parse = source => compile({ value: source, path: 'fixture.mdx' }, { remarkPlugins: [endMatter] });
const good = await parse('Prose.\n\n<Citation reference="source" />\n\n<Takeaways>\n\n- A supported conclusion.\n\n</Takeaways>\n\n<References>\n<Ref id="source" title="A &amp; B" url="https://example.com/" />\n</References>');
assert.deepEqual(good.data.astro.frontmatter, {
  takeaways: ['A supported conclusion.'], references: [{ id: 'source', title: 'A & B', url: 'https://example.com/' }],
});
assert.doesNotMatch(String(good), /_components\.(Takeaways|References|Ref)\b/);
for (const [source, error] of [
  ['<Citation reference="missing" />', /no matching/],
  ['<References>\n<Ref id="a" title="A" />\n<Ref id="a" title="B" />\n</References>', /used twice/],
  ['<References>\n<Ref id="a" title="A" url="javascript:alert(1)" />\n</References>', /HTTP/],
  ['<References>\n<Ref id="a" title={secret} />\n</References>', /quoted string/],
  ['<References>\n<Ref id="a" title="A" title="B" />\n</References>', /repeats attribute/],
  ['<References />\n\nMore prose.', /must come last/],
  ['<Takeaways>\n\n- **Silently discarded formatting**\n\n</Takeaways>', /plain text/],
  ['<Takeaways bad="yes">\n\n- A\n\n</Takeaways>', /no attributes/],
  ['<References />\n\n<Takeaways>\n\n- A\n\n</Takeaways>', /comes before/],
]) await assert.rejects(() => parse(source), error);
console.log('End-matter parsing, citation, ordering and invalid-input checks passed.');
