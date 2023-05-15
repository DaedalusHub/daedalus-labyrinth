import axios from 'axios';
import mocked = jest.mocked;
import search from "../../src/search/search";
import { expect } from '@jest/globals';

jest.mock('axios');

const mockedAxios = mocked(axios, { shallow: false });
const apiKey = 'your-api-key';
const searchEngineId = 'your-search-engine-id';

process.env.NEXT_PUBLIC_GOOGLE_API_KEY = apiKey;
process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID = searchEngineId;

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

    const results = await search(query);
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

  test('should handle errors when fetching search results', async () => {
    const query = 'test query';
    const errorMessage = 'Network error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(search(query)).rejects.toThrow(errorMessage);

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
