/**
 * Callouts written the GitHub way, as a blockquote whose first line names
 * its kind:
 *
 *   > [!NOTE]
 *   > Background context.
 *
 * Kinds: NOTE, TIP, IMPORTANT, WARNING, CAUTION. An optional title may follow
 * the marker (`> [!TIP] Before you start`); without one the kind's own name
 * is the title. The blockquote becomes `<aside class="callout callout-<kind>">`
 * with a title line; an unknown marker fails the build rather than printing
 * `[!…]` into the article. A blockquote without a marker stays a quote.
 */
const KINDS = { NOTE: 'Note', TIP: 'Tip', IMPORTANT: 'Important', WARNING: 'Warning', CAUTION: 'Caution' };
const MARKER = /^\[!([A-Za-z]+)\][ \t]*([^\n]*)(?:\n|$)/;

function fail(file, node, message) {
  const at = node?.position?.start ? `:${node.position.start.line}` : '';
  throw new Error(`${file.path ?? 'article'}${at}: ${message}`);
}

function visit(node, file) {
  for (const child of node.children ?? []) {
    if (child.type === 'blockquote') callout(child, file);
    visit(child, file);
  }
}

function callout(quote, file) {
  const first = quote.children?.[0];
  const text = first?.type === 'paragraph' ? first.children?.[0] : null;
  if (text?.type !== 'text') return;
  const match = text.value.match(MARKER);
  if (!match) return;
  const kind = match[1].toUpperCase();
  if (!KINDS[kind]) fail(file, quote, `Unknown callout [!${match[1]}]: use ${Object.keys(KINDS).join(', ')}`);
  text.value = text.value.slice(match[0].length);
  if (!text.value) first.children.shift();
  if (!first.children.length) quote.children.shift();
  const name = kind.toLowerCase();
  quote.data = { ...(quote.data ?? {}), hName: 'aside', hProperties: { className: ['callout', `callout-${name}`], role: 'note' } };
  quote.children.unshift({
    type: 'paragraph',
    data: { hProperties: { className: ['callout-title'] } },
    children: [{ type: 'text', value: match[2].trim() || KINDS[kind] }],
  });
}

export default function remarkCallouts() {
  return (tree, file) => visit(tree, file);
}
