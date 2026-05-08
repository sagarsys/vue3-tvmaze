/**
 * Converts the small HTML snippets returned by TVMaze into plain text previews.
 * Not intended for rendering sanitized HTML.
 */
export function stripHtmlToPlainText(html: string | null): string {
  if (!html) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  return doc.body.textContent?.trim() ?? '';
}
