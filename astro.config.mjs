// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  output: 'static',
  site: 'https://frah90.github.io',

  integrations: [react(), mdx(), sitemap({
    // Redirect aliases are useful inbound links, not canonical content.
    filter: page => !['/', '/projects', '/projects/'].includes(new URL(page).pathname),
  })],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['plotly.js-dist-min'],
    },
  },
});
