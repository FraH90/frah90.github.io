import { topics, getTopic, type TopicSlug } from './topics';

/** One public taxonomy; legacy topic slugs remain valid tags and URL groups. */
const detail = (slug: string, label: string, group: TopicSlug) => ({ slug, label, color: getTopic(group).color });
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
