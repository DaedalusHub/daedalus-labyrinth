import { Source } from '../../src/search/source';
import { expect } from '@jest/globals';

describe('Source', () => {
  test('should create a Source object', () => {
    const title = 'Test Title';
    const url = 'https://example.com';
    const snippet = 'Test snippet';
    const type = 'website';

    const source = new Source(title, url, snippet, type);

    expect(source.title).toBe(title);
    expect(source.url).toBe(url);
    expect(source.snippet).toBe(snippet);
    expect(source.type).toBe(type);
  });

  test('should create a Source object with default type', () => {
    const title = 'Test Title';
    const url = 'https://example.com';
    const snippet = 'Test snippet';

    const source = new Source(title, url, snippet);

    expect(source.title).toBe(title);
    expect(source.url).toBe(url);
    expect(source.type).toBe('website');
  });
});
