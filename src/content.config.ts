import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { topicSlugs } from './lib/topics';
import { isArticleLink } from './lib/article-links';

const text = z.string().trim().min(1);
const link = text.refine(isArticleLink, 'Use an HTTP(S) URL or a root-relative public path.');

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    date:        z.coerce.date(),
    category:    z.enum(topicSlugs),
    description: z.string(),
    tags:        z.array(z.string()).default([]),
    draft:       z.boolean().default(false),
    coverImage:  z.string().optional(),
    learningGoals: z.array(text).default([]),
    prerequisites: z.array(text).default([]),
    assumptions: z.array(text).default([]),
    relatedPosts: z.array(reference('blog')).default([]),
    resources: z.array(z.object({
      label: text,
      url: link,
      kind: z.enum(['code', 'notebook', 'project', 'data', 'report', 'other']).default('other'),
    })).default([]),
    references: z.array(z.object({
      id: text.regex(/^[a-z0-9][a-z0-9-]*$/, 'Reference IDs use lowercase letters, numbers, and hyphens.'),
      title: text,
      detail: text.optional(),
      url: link.optional(),
    })).default([]).refine(items => new Set(items.map(item => item.id)).size === items.length,
      'Reference IDs must be unique within an article.'),
  }),
});

export const collections = { blog };
