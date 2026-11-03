/**
 * Takeaways and references are written at the end of the article body
 * (`<Takeaways>`, `<References>`); `remark-end-matter.mjs` validates them and
 * passes them to the layout as remark frontmatter. This is their shape.
 */
export interface ArticleReference { id: string; title: string; detail?: string; url?: string; }
export interface EndMatter { takeaways: string[]; references: ArticleReference[]; }

export function endMatterOf(frontmatter: Record<string, unknown> | undefined): EndMatter {
  return {
    takeaways: Array.isArray(frontmatter?.takeaways) ? frontmatter.takeaways as string[] : [],
    references: Array.isArray(frontmatter?.references) ? frontmatter.references as ArticleReference[] : [],
  };
}
