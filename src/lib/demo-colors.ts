import { getTopic, type TopicSlug } from './topics';

const primary = (category: TopicSlug) => `var(${getTopic(category).tone})`;

/** Scientific roles shared by thumbnails, static figures and live renderers. */
export const demoColors = {
  array: primary('antennas'),
  transmission: primary('rf'),
  gaussian: { upper: primary('optics'), lower: primary('optics'), fill: 'var(--plot-fill)' },
  fourier: { signal: primary('dsp'), spectrum: primary('dsp') },
} as const;
