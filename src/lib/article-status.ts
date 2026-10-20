/** Demo is an editorial label, independent of draft/publication eligibility. */
export const demoLabel = 'Demo';
export const demoNotice = 'Demo article used to demonstrate this site’s features. It is not a reviewed research publication.';
export function articleDisplayTitle(title: string, demo: boolean) {
  return demo ? `${demoLabel} — ${title}` : title;
}
