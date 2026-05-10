import { getCollection } from 'astro:content';

export async function getAllPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPostsByCategory(category: string) {
  const all = await getAllPosts();
  return all.filter(p => p.data.category === category);
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return [...new Set(posts.map(p => p.data.category))];
}
