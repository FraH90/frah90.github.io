import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    date:        z.coerce.date(),
    category:    z.enum(['antennas', 'ml', 'rf', 'optics', 'dsp', 'misc']),
    description: z.string(),
    tags:        z.array(z.string()).default([]),
    draft:       z.boolean().default(false),
    coverImage:  z.string().optional(),
  }),
});

export const collections = { blog };
