import React from 'react';
import { createRoot } from 'react-dom/client';
import { SummaryGenerator } from '@src/summarization/summaryGenerator';
import InputForm from '@src/components/InputForm';
import { SearchEngine } from '@src/search/searchEngine';

const searchEngine = new SearchEngine(
  import.meta.env.VITE_GOOGLE_API_KEY as string,
  import.meta.env.VITE_SEARCH_ENGINE_ID as string
);

const summaryGenerator = new SummaryGenerator(
  import.meta.env.VITE_OPENAI_API_KEY as string
);

const App = () => (
  <React.StrictMode>
    <InputForm
      searchEngine={searchEngine}
      summaryGenerator={summaryGenerator}
    />
  </React.StrictMode>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
