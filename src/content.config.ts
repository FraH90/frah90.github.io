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

const demos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/demos' }),
  schema: z.object({
    title:            z.string(),
    domain:           z.enum(['antennas', 'optics', 'rf', 'signal-processing']),
    difficulty:       z.enum(['beginner', 'intermediate', 'advanced']),
    description:      z.string(),
    precomputed_data: z.string().optional(),
    techStack:        z.array(z.string()).default([]),
  }),
});

export const collections = { blog, demos };
