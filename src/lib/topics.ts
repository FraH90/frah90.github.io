/** Stable route slugs, reader-facing labels, and presentation in display order. */
export const topics = [
  { slug: 'antennas', label: 'Antennas & Arrays', color: 'text-emerald-400' },
  { slug: 'rf', label: 'RF & Microwave', color: 'text-sky-400' },
  { slug: 'optics', label: 'Optics & Photonics', color: 'text-amber-400' },
  { slug: 'dsp', label: 'Signal Processing', color: 'text-rose-400' },
  { slug: 'ml', label: 'Machine Learning', color: 'text-violet-400' },
  { slug: 'misc', label: 'Other Topics', color: 'text-zinc-300' },
] as const;

export type TopicSlug = (typeof topics)[number]['slug'];
export const topicSlugs = topics.map(topic => topic.slug) as [TopicSlug, ...TopicSlug[]];

export function getTopic(slug: TopicSlug) {
  return topics.find(topic => topic.slug === slug)!;
}
