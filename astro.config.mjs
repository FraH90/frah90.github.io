// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { retiredTagCategories } from './src/lib/tags.ts';
import rehypeAccessibleHeadings from './src/lib/rehype-accessible-headings.mjs';
import remarkEndMatter from './src/lib/remark-end-matter.mjs';

export default defineConfig({
  output: 'static',
  site: 'https://frah90.github.io',

  integrations: [react(), mdx(), sitemap({
    // Redirect aliases are useful inbound links, not canonical content.
    filter: page => !['/', '/projects', '/projects/'].includes(new URL(page).pathname)
      && !/^\/blog\/[^/]+\/?$/.test(new URL(page).pathname)
      && !/^\/categories\/[^/]+\/demo\/?$/.test(new URL(page).pathname)
      && !Object.keys(retiredTagCategories).some(slug => new URL(page).pathname.replace(/\/$/, '') === `/tags/${slug}`),
  })],

  markdown: {
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
      defaultColor: false,
    },
    remarkPlugins: [remarkMath, remarkEndMatter],
    rehypePlugins: [rehypeKatex, rehypeAccessibleHeadings],
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['plotly.js-dist-min'],
    },
  },
});
