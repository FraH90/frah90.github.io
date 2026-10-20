/** Stable route slugs, reader-facing labels, and presentation in display order. */
export const topics = [
  { slug: 'antennas', label: 'Antennas & Arrays', color: 'text-topic-antennas' },
  { slug: 'rf', label: 'RF & Microwave', color: 'text-topic-rf' },
  { slug: 'optics', label: 'Optics & Photonics', color: 'text-topic-optics' },
  { slug: 'dsp', label: 'Signal Processing', color: 'text-topic-dsp' },
  { slug: 'ml', label: 'Machine Learning', color: 'text-topic-ml' },
  { slug: 'misc', label: 'Other Topics', color: 'text-body' },
] as const;

export type TopicSlug = (typeof topics)[number]['slug'];
export const topicSlugs = topics.map(topic => topic.slug) as [TopicSlug, ...TopicSlug[]];

export function getTopic(slug: TopicSlug) {
  return topics.find(topic => topic.slug === slug)!;
}
