import { describe, expect, it } from 'vitest';

import { stripHtmlToPlainText } from '@/lib/helpers/string';

describe('stripHtmlToPlainText', () => {
  it('returns empty string for null or empty', () => {
    expect(stripHtmlToPlainText(null)).toBe('');
    expect(stripHtmlToPlainText('')).toBe('');
  });

  it('strips simple tags and trims', () => {
    expect(stripHtmlToPlainText('  <p>Hello</p>  ')).toBe('Hello');
  });

  it('removes nested tags', () => {
    expect(stripHtmlToPlainText('<div><b>One</b> <i>Two</i></div>')).toBe('One Two');
  });
});
