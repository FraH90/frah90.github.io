/** Demos belong to their article: `blog/<folder>/demos/<Name>.tsx` is the live
 *  React component, `<Name>.reference.ts` beside it the calculated case shown
 *  before (and without) JavaScript. An article writes
 *  `<InteractiveDemo src="./demos/<Name>.tsx" />`; `remark-article-demos.mjs`
 *  turns that relative path into the key used here. */
import type { DemoReference } from './demo-charts';

const references = import.meta.glob<DemoReference>('/blog/*/demos/*.reference.ts', { eager: true, import: 'default' });

/** `/blog/<folder>/demos/<Name>.tsx` → its reference. */
export function demoReference(src: string): DemoReference {
  const reference = references[src.replace(/\.tsx$/, '.reference.ts')];
  if (!reference) throw new Error(`Demo ${src} has no ${src.replace(/\.tsx$/, '.reference.ts')} beside it.`);
  return reference;
}

/** The first demo in an article folder, for its preview card. */
export function articleDemo(folder: string): DemoReference | undefined {
  const key = Object.keys(references).sort().find(path => path.startsWith(`/blog/${folder}/demos/`));
  return key ? references[key] : undefined;
}
