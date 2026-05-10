import { getCollection } from 'astro:content';

export async function getAllDemos() {
  return getCollection('demos');
}
