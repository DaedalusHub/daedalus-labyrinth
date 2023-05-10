// src/data_retrieval/__tests__/search_engine.test.ts
import axios from 'axios';
import { SearchEngine } from '../../src/data_retrieval/search_engine';
import mocked = jest.mocked;

jest.mock('axios');

const mockedAxios = mocked(axios, { shallow: false });

const apiKey = 'your-api-key';
const searchEngineId = 'your-search-engine-id';
const testSearchEngine = new SearchEngine(apiKey, searchEngineId);

describe('SearchEngine', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  test('should fetch search results', async () => {
    const query = 'test query';
    const response = {
      data: {
        items: [
          {
            title: 'Test Title 1',
            link: 'https://example.com/1',
            snippet: 'Test snippet 1',
          },
          {
            title: 'Test Title 2',
            link: 'https://example.com/2',
            snippet: 'Test snippet 2',
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValue(response);

    const results = await testSearchEngine.search(query);
    expect(results.length).toBe(2);
    expect(results[0].title).toBe('Test Title 1');
    expect(results[0].url).toBe('https://example.com/1');
    expect(results[1].title).toBe('Test Title 2');
    expect(results[1].url).toBe('https://example.com/2');
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://www.googleapis.com/customsearch/v1',
      {
        params: {
          key: apiKey,
          cx: searchEngineId,
          q: query,
        },
      }
    );
  });

  // src/data_retrieval/__tests__/search_engine.test.ts
  test('should handle errors when fetching search results', async () => {
    const query = 'test query';
    const errorMessage = 'Network error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    // Temporarily suppress console.error output
    const originalConsoleError = console.error;
    console.error = jest.fn();

    try {
      await testSearchEngine.search(query);
    } catch (error) {
      expect((error as Error).message).toBe(errorMessage);
    }

    // Restore the original console.error function
    console.error = originalConsoleError;

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://www.googleapis.com/customsearch/v1',
      {
        params: {
          key: apiKey,
          cx: searchEngineId,
          q: query,
        },
      }
    );
  });
});
