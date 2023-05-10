import { Source } from '@src/data_retrieval/source';

describe('Source', () => {
  test('should create a Source object', () => {
    const title = 'Test Title';
    const url = 'https://example.com';
    const type = 'website';

    const source = new Source(title, url, type);

    expect(source.title).toBe(title);
    expect(source.url).toBe(url);
    expect(source.type).toBe(type);
  });

  test('should create a Source object with default type', () => {
    const title = 'Test Title';
    const url = 'https://example.com';

    const source = new Source(title, url);

    expect(source.title).toBe(title);
    expect(source.url).toBe(url);
    expect(source.type).toBe('website');
  });
});
