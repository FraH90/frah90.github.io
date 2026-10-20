/** Keep Astro's native IDs and make section targets focusable without extra tab stops. */
export default function rehypeAccessibleHeadings() {
  return function transform(tree) {
    function visit(node) {
      if (node.type === 'element' && /^h[2-4]$/.test(node.tagName)) {
        node.properties ??= {};
        node.properties.tabIndex = -1;
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
