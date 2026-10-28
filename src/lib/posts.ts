import { getCollection, type CollectionEntry } from 'astro:content';
import { topics } from './topics';
import { tags, getPostTags } from './tags';

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

export async function getAllTags() {
  const posts = await getAllPosts();
  const populated = new Set(posts.flatMap(post => getPostTags(post).map(tag => tag.slug)));
  return tags.filter(tag => populated.has(tag.slug));
}
export async function getPostsByTag(slug: string) {
  return (await getAllPosts()).filter(post => post.data.tags.includes(slug));
}

/** Curated links first, then genuinely overlapping topics/tags. Never expose drafts. */
export async function getRelatedPosts(post: CollectionEntry<'blog'>, limit = 3) {
  const all = await getCollection('blog');
  const known = new Map(all.map(entry => [entry.id, entry]));
  const curated = post.data.relatedPosts.map(({ id }) => {
    const entry = known.get(id);
    if (!entry) throw new Error(`Article ${post.id} refers to missing related post ${id}`);
    return entry;
  }).filter(entry => entry.id !== post.id && isPublishedPost(entry));
  const tags = new Set(post.data.tags.map(tag => tag.toLowerCase()));
  const candidates = all.filter(entry => entry.id !== post.id && isPublishedPost(entry))
    .map(entry => ({ entry, score: new Set(entry.data.tags.map(tag => tag.toLowerCase()).filter(tag => tags.has(tag))).size }))
    .filter(candidate => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.entry.data.date.valueOf() - a.entry.data.date.valueOf()
      || a.entry.id.localeCompare(b.entry.id));
  return [...new Map([...curated, ...candidates.map(candidate => candidate.entry)]
    .map(entry => [entry.id, entry])).values()].slice(0, limit);
}
