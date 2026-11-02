/** Stable route slugs, reader-facing labels, and presentation in display order. */
export const topics = [
  { slug: 'antennas', label: 'Antennas & Arrays', color: 'text-topic-antennas', tone: '--plot-green' },
  { slug: 'rf', label: 'RF & Microwave', color: 'text-topic-rf', tone: '--plot-blue' },
  { slug: 'optics', label: 'Optics & Photonics', color: 'text-topic-optics', tone: '--plot-orange' },
  { slug: 'dsp', label: 'Signal Processing', color: 'text-topic-dsp', tone: '--plot-rose' },
  { slug: 'ml', label: 'Machine Learning', color: 'text-topic-ml', tone: '--plot-purple' },
  { slug: 'misc', label: 'Other Topics', color: 'text-body', tone: '--muted' },
] as const;

export type TopicSlug = (typeof topics)[number]['slug'];
export const topicSlugs = topics.map(topic => topic.slug) as [TopicSlug, ...TopicSlug[]];

export function getTopic(slug: TopicSlug) {
  return topics.find(topic => topic.slug === slug)!;
}
