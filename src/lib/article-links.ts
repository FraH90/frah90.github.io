/** URLs in article metadata are either local public paths or HTTP(S) sources. */
export function isArticleLink(value: string) {
  if (/^\/(?!\/)/.test(value) && !/[\\\s]/.test(value)) return true;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; }
}
