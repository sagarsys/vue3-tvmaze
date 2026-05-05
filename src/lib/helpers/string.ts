/**
 * Removes HTML tags for a plain-text preview.
 * Minimal sanitizer for untrusted rich HTML.
 */
export function stripHtmlToPlainText(html: string | null): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}
