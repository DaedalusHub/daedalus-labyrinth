import axios from 'axios';
import {WebSource} from './webSource';

interface CustomSearchResult {
  title: string;
  link: string;
  snippet: string;
}


export default async function search(query: string): Promise<WebSource[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '';
    const searchEngineId = process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID || '';

    console.log('API key: ', apiKey);
    console.log('Search engine ID: ', searchEngineId);
    const response = await axios.get(
      'https://www.googleapis.com/customsearch/v1',
      {
        params: {
          key: apiKey,
          cx: searchEngineId,
          q: query,
        },
      }
    );

    console.log('Response: ', response);
    const items: CustomSearchResult[] = response.data.items;
return items.map(
  (item) => new WebSource(item.title, item.link, item.snippet)
);
} catch (error) {
  // Handle errors (e.g. network issues, rate limits, API costs)
  console.error('Error fetching search results:', error);
  throw error;
}
}
