import { topics, getTopic, type TopicSlug } from './topics';

/** Specific tags plus broad slugs retained for legacy cross-subject links. */
const detail = (slug: string, label: string, group: TopicSlug) => ({ slug, label, category: group, color: getTopic(group).color });
export const tags = [
  ...topics,
  detail('phased-array', 'Phased arrays', 'antennas'),
  detail('beamforming', 'Beamforming', 'antennas'),
  detail('fft', 'FFT', 'dsp'),
  detail('windowing', 'Windowing', 'dsp'),
  detail('spectral-leakage', 'Spectral leakage', 'dsp'),
  detail('transmission-line', 'Transmission lines', 'rf'),
  detail('impedance', 'Impedance', 'rf'),
  detail('vswr', 'VSWR', 'rf'),
  detail('laser', 'Lasers', 'optics'),
  detail('gaussian-beam', 'Gaussian beams', 'optics'),
  detail('photonics', 'Photonics', 'optics'),
  detail('feature-engineering', 'Feature engineering', 'ml'),
  detail('pytorch', 'PyTorch', 'ml'),
];
export const tagSlugs = tags.map(tag => tag.slug) as [string, ...string[]];
export function getTag(slug: string) {
  const tag = tags.find(tag => tag.slug === slug);
  if (!tag) throw new Error(`Unknown tag: ${slug}. Register it in src/lib/tags.ts.`);
  return tag;
}
export function getPostTags(post: { data: { tags: string[] } }) {
  return [...new Set(post.data.tags)].map(getTag);
}

export function getDetailTags(slugs: string[]) {
  return [...new Set(slugs)].filter(slug => !topics.some(topic => topic.slug === slug)).map(getTag);
}
/** Previously public, over-specific demo tags retain inbound URLs. */
export const retiredTagCategories: Record<string, TopicSlug> = {
  beamforming: 'antennas', 'spectral-leakage': 'dsp', 'transmission-line': 'rf',
  vswr: 'rf', laser: 'optics', photonics: 'optics', 'feature-engineering': 'ml', pytorch: 'ml',
};

/** Specific tags refine their registered parent category; broad legacy slugs stay separate. */
export function getCategoryTags(slugs: string[], category: TopicSlug) {
  return getDetailTags(slugs).filter(tag => 'category' in tag && tag.category === category);
}
