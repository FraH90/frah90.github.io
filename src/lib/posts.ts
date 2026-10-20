import { getCollection, type CollectionEntry } from 'astro:content';
import { topics } from './topics';

/** Shared eligibility for routes and every published-content discovery surface. */
export function isPublishedPost(post: Pick<CollectionEntry<'blog'>, 'data'>) {
  return !post.data.draft;
}

export async function getAllPosts() {
  const posts = await getCollection('blog', isPublishedPost);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id));
}

export async function getPostsByCategory(category: string) {
  const all = await getAllPosts();
  return all.filter(post => post.data.category === category);
}

export async function getAllCategories() {
  const posts = await getAllPosts();
  const populated = new Set(posts.map(post => post.data.category));
  return topics.filter(topic => populated.has(topic.slug));
}
