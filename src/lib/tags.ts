import { topics, type TopicSlug } from './topics';
import { taxonomy } from './taxonomy';

/** Specific tags (from `blog/taxonomy.json`) plus the broad category slugs, retained for legacy cross-subject links. */
export const tags: { slug: string; label: string; category?: string }[] = [
  ...topics.map(({ slug, label }) => ({ slug, label })),
  ...taxonomy.tags,
];
export const tagSlugs = tags.map(tag => tag.slug) as [string, ...string[]];
export function getTag(slug: string) {
  const tag = tags.find(tag => tag.slug === slug);
  if (!tag) throw new Error(`Unknown tag: ${slug}. Add it to blog/taxonomy.json.`);
  return tag;
}
export function getPostTags(post: { data: { tags: string[] } }) {
  return [...new Set(post.data.tags)].map(getTag);
}

export function getDetailTags(slugs: string[]) {
  return [...new Set(slugs)].filter(slug => !topics.some(topic => topic.slug === slug)).map(getTag);
}
/** Previously public, over-specific demo tags retain inbound URLs. */
export const retiredTagCategories: Record<string, TopicSlug> = taxonomy.retiredTags;

/** Specific tags refine their registered parent category; broad legacy slugs stay separate. */
export function getCategoryTags(slugs: string[], category: TopicSlug) {
  return getDetailTags(slugs).filter(tag => 'category' in tag && tag.category === category);
}
