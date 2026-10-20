import type { APIRoute } from 'astro';
import { getAllPosts } from '../lib/posts';
import { getTopic } from '../lib/topics';
import { siteName, siteDescription } from '../lib/site';

// Summary-only RSS 2.0: no MDX, scripts, interactive controls, or math markup.
const xml = (value: string) => value.replace(/[<>&"']/g, character => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[character]!);
export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('RSS requires the canonical site URL');
  const posts = await getAllPosts();
  const items = posts.map(post => {
    const url = new URL(`/blog/${post.id}`, site).href;
    return `<item><title>${xml(post.data.title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(post.data.description)}</description><pubDate>${post.data.date.toUTCString()}</pubDate><category>${xml(getTopic(post.data.category).label)}</category></item>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(siteName)} — articles</title><link>${xml(new URL('/blog', site).href)}</link><description>${xml(siteDescription)}</description><language>en</language><atom:link href="${xml(new URL('/rss.xml', site).href)}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
