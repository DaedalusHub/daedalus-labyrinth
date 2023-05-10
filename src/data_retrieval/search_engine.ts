import axios from 'axios';
import { Source } from './source';

interface CustomSearchResult {
  title: string;
  link: string;
  snippet: string;
}

export class SearchEngine {
  private apiKey: string;
  private searchEngineId: string;

  constructor(apiKey: string, searchEngineId: string) {
    this.apiKey = apiKey;
    this.searchEngineId = searchEngineId;
  }

  async search(query: string): Promise<Source[]> {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/customsearch/v1',
        {
          params: {
            key: this.apiKey,
            cx: this.searchEngineId,
            q: query,
          },
        }
      );

      const items: CustomSearchResult[] = response.data.items;
      return items.map((item) => new Source(item.title, item.link));
    } catch (error) {
      // Handle errors (e.g. network issues, rate limits, API costs)
      console.error('Error fetching search results:', error);
      throw error;
    }
  }
}
