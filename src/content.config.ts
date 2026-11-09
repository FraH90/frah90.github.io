import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { topicSlugs } from './lib/topics';
import { tagSlugs } from './lib/tags';
import { isArticleLink } from './lib/article-links';
import { articleSlug } from './lib/article-folders';

const text = z.string().trim().min(1);
const link = text.refine(isArticleLink, 'Use an HTTP(S) URL or a root-relative public path.');
/** Takeaways and references live at the end of the body (src/lib/remark-end-matter.mjs). */
const movedToBody = (field: string, block: string) => z.unknown()
  .refine(value => value === undefined, `\`${field}\` moved out of the frontmatter: write a ${block} block at the end of the article.`)
  .optional();

const blog = defineCollection({
  // One article = one folder: blog/<YYYY-MM-DD>-<slug>/index.mdx, with its figures and data beside it.
  loader: glob({
    pattern: '*/index.{md,mdx}', base: './blog',
    generateId: ({ entry }) => articleSlug(entry.split('/')[0]),
  }),
  schema: z.object({
    title:       z.string(),
    date:        z.coerce.date(),
    category:    z.enum(topicSlugs),
    description: z.string(),
    tags:        z.array(z.enum(tagSlugs)).default([]),
    draft:       z.boolean().default(false),
    demo:        z.boolean().default(false),
    coverImage: link.optional(),
    preview: z.discriminatedUnion('kind', [
      z.object({ kind: z.literal('image'), src: link, alt: text, width: z.number().int().positive(), height: z.number().int().positive() }),
      z.object({ kind: z.literal('gif'), src: link, poster: link, alt: text, width: z.number().int().positive(), height: z.number().int().positive() }),
      z.object({ kind: z.literal('video'), src: link, poster: link, alt: text }),
    ]).optional(),
    learningGoals: z.array(text).default([]),
    prerequisites: z.array(text).default([]),
    takeaways: movedToBody('takeaways', '<Takeaways>'),
    relatedPosts: z.array(reference('blog')).default([]),
    resources: z.array(z.object({
      label: text,
      url: link,
      kind: z.enum(['code', 'notebook', 'project', 'data', 'report', 'other']).default('other'),
    })).default([]),
    references: movedToBody('references', '<References>'),
  }).refine(data => data.draft || data.tags.length > 0, {
    path: ['tags'], message: 'Published articles need at least one registered tag.',
  }),
});

export const collections = { blog };
