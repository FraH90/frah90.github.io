import { taxonomy } from './taxonomy';

/** Categories in display order, from `blog/taxonomy.json`. */
export const topics = taxonomy.categories;

export type TopicSlug = string;
export const topicSlugs = topics.map(topic => topic.slug) as [TopicSlug, ...TopicSlug[]];

export function getTopic(slug: TopicSlug) {
  const topic = topics.find(topic => topic.slug === slug);
  if (!topic) throw new Error(`Unknown category: ${slug}. Add it to blog/taxonomy.json.`);
  return topic;
}
