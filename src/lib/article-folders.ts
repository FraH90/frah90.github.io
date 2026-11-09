/** An article is a folder under the repository's `blog/`: `<YYYY-MM-DD>-<slug>/index.mdx`.
 *  The date prefix keeps folders in creation order; it never appears in a URL. */
export const ARTICLE_FOLDER = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)$/;

export function articleSlug(folder: string) {
  const match = folder.match(ARTICLE_FOLDER);
  if (!match) throw new Error(`Article folder "${folder}" must be named <YYYY-MM-DD>-<slug> (lower-case slug).`);
  return match[2];
}
