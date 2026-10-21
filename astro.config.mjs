// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeAccessibleHeadings from './src/lib/rehype-accessible-headings.mjs';

export default defineConfig({
  output: 'static',
  site: 'https://frah90.github.io',

  integrations: [react(), mdx(), sitemap({
    // Redirect aliases and temporary design reviews are not discovery destinations.
    filter: page => !['/', '/projects', '/projects/', '/design-review', '/design-review/'].includes(new URL(page).pathname),
  })],

  markdown: {
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
      defaultColor: false,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeAccessibleHeadings],
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['plotly.js-dist-min'],
    },
  },
});
