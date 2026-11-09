import data from '../../blog/taxonomy.json';

/**
 * The blog's categories and tags live in `blog/taxonomy.json` — content, not
 * code — so a new one is a data edit (by hand or from Article Studio). This
 * module checks the file once at build time; a broken file fails the build
 * with a sentence instead of a stack trace.
 */
export type Category = { slug: string; label: string; tone: string };
export type Tag = { slug: string; label: string; category: string };
export type Taxonomy = { categories: Category[]; tags: Tag[]; retiredTags: Record<string, string> };

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function checkTaxonomy(raw: unknown): Taxonomy {
  const fail = (why: string): never => { throw new Error(`blog/taxonomy.json: ${why}`); };
  const value = raw as Partial<Taxonomy>;
  if (!Array.isArray(value?.categories) || !value.categories.length) fail('"categories" must be a non-empty list');
  if (!Array.isArray(value?.tags)) fail('"tags" must be a list');
  const seen = new Set<string>();
  const categories = value.categories!.map((c) => {
    if (!SLUG.test(c?.slug ?? '') || !c.label?.trim()) fail(`category ${JSON.stringify(c)} needs a lower-case slug and a label`);
    if (seen.has(c.slug)) fail(`"${c.slug}" is listed twice`);
    seen.add(c.slug);
    return { slug: c.slug, label: c.label, tone: /^--[a-z0-9-]+$/.test(c.tone ?? '') ? c.tone : '--muted' };
  });
  const tags = value.tags!.map((t) => {
    if (!SLUG.test(t?.slug ?? '') || !t.label?.trim()) fail(`tag ${JSON.stringify(t)} needs a lower-case slug and a label`);
    if (seen.has(t.slug)) fail(`"${t.slug}" is used twice (category and tag slugs share one namespace)`);
    if (!categories.some((c) => c.slug === t.category)) fail(`tag "${t.slug}" names unknown category "${t.category}"`);
    seen.add(t.slug);
    return { slug: t.slug, label: t.label, category: t.category };
  });
  const retiredTags = { ...(value.retiredTags ?? {}) };
  for (const [slug, category] of Object.entries(retiredTags)) {
    if (!categories.some((c) => c.slug === category)) fail(`retired tag "${slug}" names unknown category "${category}"`);
  }
  return { categories, tags, retiredTags };
}

export const taxonomy = checkTaxonomy(data);
