/**
 * Demos belong to their article.
 *
 *   <InteractiveDemo src="./demos/ArrayFactorDemo.tsx" />
 *
 * The path is relative to the article, like its figures. This plugin checks
 * that the component and its `<Name>.reference.ts` exist beside the article
 * and rewrites `src` to the repository key the frame and its loader use
 * (`/blog/<folder>/demos/<Name>.tsx`), so no list of demos lives in `src/`.
 */
import { existsSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const LOCAL = /^\.\/demos\/[A-Za-z0-9_-]+\.tsx$/;

function fail(file, node, message) {
  const at = node?.position?.start ? `:${node.position.start.line}` : '';
  throw new Error(`${file.path ?? 'article'}${at}: ${message}`);
}

function visit(node, file) {
  if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'InteractiveDemo') {
    const src = node.attributes.find(attribute => attribute.type === 'mdxJsxAttribute' && attribute.name === 'src');
    if (!src || typeof src.value !== 'string') fail(file, node, 'InteractiveDemo needs src="./demos/<Name>.tsx".');
    if (!LOCAL.test(src.value)) fail(file, node, `InteractiveDemo src "${src.value}" must be ./demos/<Name>.tsx, beside the article.`);
    const directory = dirname(file.path);
    const component = join(directory, src.value);
    if (!existsSync(component)) fail(file, node, `No demo at ${src.value}.`);
    if (!existsSync(component.replace(/\.tsx$/, '.reference.ts'))) fail(file, node, `${src.value} has no .reference.ts beside it.`);
    src.value = `/blog/${basename(directory)}/${src.value.slice(2)}`;
  }
  for (const child of node.children ?? []) visit(child, file);
}

export default function remarkArticleDemos() {
  return (tree, file) => { if (file.path) visit(tree, file); };
}
