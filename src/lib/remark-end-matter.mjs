/**
 * End-of-article sections written where they render.
 *
 * An article ends with optional `<Takeaways>` and `<References>` blocks:
 *
 *   <Takeaways>
 *
 *   - A conclusion the article supports.
 *
 *   </Takeaways>
 *
 *   <References>
 *     <Ref id="pozar" title="David M. Pozar — Microwave Engineering" detail="4th ed., Wiley, 2012." />
 *     <Ref id="astro" title="Astro content collections" url="https://docs.astro.build/" />
 *   </References>
 *
 * This plugin validates them, removes them from the body and hands their
 * data to the layout through `remarkPluginFrontmatter`, so the article page
 * renders them in the layout's own sections (callout, references list,
 * Contents entries) exactly as the old frontmatter fields did. It also checks
 * every `<Citation reference="…">` against the reference ids, failing the
 * build on a citation with nowhere to point.
 */
import { isArticleLink } from './article-links.ts';

const NAMES = ['Takeaways', 'References'];
const REF_ID = /^[a-z0-9][a-z0-9-]*$/;

function fail(file, node, message) {
  const at = node?.position?.start ? `:${node.position.start.line}` : '';
  throw new Error(`${file.path ?? 'article'}${at}: ${message}`);
}

function isJsx(node, name) {
  return (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && (!name || node.name === name);
}

/** Comments (`{/* … *\/}`) and blank text may sit between the blocks. */
function isIgnorable(node) {
  if (node.type === 'mdxFlowExpression') return /^\s*\/\*[\s\S]*\*\/\s*$/.test(node.value);
  return node.type === 'text' && !node.value.trim();
}

function attributes(file, node) {
  const out = {};
  for (const attr of node.attributes ?? []) {
    if (attr.type !== 'mdxJsxAttribute') fail(file, node, `<${node.name}> takes plain attributes only`);
    if (Object.hasOwn(out, attr.name)) fail(file, node, `<${node.name}> repeats attribute ${attr.name}`);
    if (typeof attr.value !== 'string') fail(file, node, `<${node.name} ${attr.name}> must be a quoted string`);
    out[attr.name] = attr.value;
  }
  return out;
}

/** Plain text of a takeaway; formatting is refused rather than dropped. */
function plainText(file, node) {
  if (node.type === 'text') return node.value;
  if (node.type === 'paragraph') return node.children.map(child => plainText(file, child)).join('');
  fail(file, node, 'Takeaways are plain text (no formatting, links or math)');
}

function takeaways(file, node) {
  const lists = node.children.filter(child => !isIgnorable(child));
  if (lists.length !== 1 || lists[0].type !== 'list' || lists[0].ordered) {
    fail(file, node, '<Takeaways> holds one bulleted list');
  }
  return lists[0].children.map(item => {
    const text = item.children.map(child => plainText(file, child)).join(' ').trim();
    if (!text) fail(file, item, 'A takeaway is empty');
    return text;
  });
}

function references(file, node) {
  const seen = new Set();
  return node.children.filter(child => !isIgnorable(child)).map(child => {
    if (!isJsx(child, 'Ref')) fail(file, child, '<References> holds only <Ref … /> entries');
    if (child.children?.length) fail(file, child, '<Ref> is self-closing: put the title in title="…"');
    const { id, title, detail, url, ...rest } = attributes(file, child);
    const extra = Object.keys(rest);
    if (extra.length) fail(file, child, `<Ref> has unknown attribute ${extra[0]}`);
    if (!id || !REF_ID.test(id)) fail(file, child, `Reference id ${JSON.stringify(id ?? '')} must be lowercase letters, numbers and hyphens`);
    if (seen.has(id)) fail(file, child, `Reference id "${id}" is used twice`);
    seen.add(id);
    if (!title?.trim()) fail(file, child, `Reference "${id}" needs a title`);
    if (detail !== undefined && !detail.trim()) fail(file, child, `Reference "${id}" has an empty detail`);
    if (url !== undefined && !isArticleLink(url)) fail(file, child, `Reference "${id}" url must be HTTP(S) or a root-relative public path`);
    return { id, title: title.trim(), ...(detail !== undefined ? { detail: detail.trim() } : {}), ...(url !== undefined ? { url } : {}) };
  });
}

function walk(node, visit, parent) {
  visit(node, parent);
  for (const child of node.children ?? []) walk(child, visit, node);
}

export default function remarkEndMatter() {
  return (tree, file) => {
    const found = {};
    const citations = [];
    walk(tree, (node, parent) => {
      if (isJsx(node) && NAMES.includes(node.name)) {
        if (parent !== tree) fail(file, node, `<${node.name}> belongs at the end of the article, not inside another block`);
        if (found[node.name]) fail(file, node, `<${node.name}> appears twice`);
        if (node.attributes?.length) fail(file, node, `<${node.name}> takes no attributes`);
        found[node.name] = node;
      }
      if (isJsx(node, 'Citation')) citations.push(node);
    });

    // Written where they render: nothing but the end blocks after the first one.
    const body = tree.children;
    const first = body.findIndex(node => isJsx(node) && NAMES.includes(node.name));
    if (first >= 0) {
      const tail = body.slice(first).filter(node => !isIgnorable(node));
      if (tail.some(node => !(isJsx(node) && NAMES.includes(node.name)))) {
        fail(file, body[first], `<${body[first].name}> must come last: only <Takeaways> then <References> may follow the article`);
      }
      if (tail.length === 2 && tail[0].name !== 'Takeaways') fail(file, tail[0], '<Takeaways> comes before <References>');
    }

    const data = {
      takeaways: found.Takeaways ? takeaways(file, found.Takeaways) : [],
      references: found.References ? references(file, found.References) : [],
    };
    const ids = new Set(data.references.map(ref => ref.id));
    for (const citation of citations) {
      const { reference } = attributes(file, citation);
      if (!ids.has(reference)) fail(file, citation, `<Citation reference="${reference}"> has no matching <Ref id="${reference}"> in <References>`);
    }

    if (first >= 0) tree.children = body.slice(0, first);
    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    Object.assign(file.data.astro.frontmatter, data);
  };
}
