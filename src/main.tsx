import InputForm from './user_interface';
import React from 'react';
import { SearchEngine } from './data_retrieval/search_engine';
import { createRoot } from 'react-dom/client';

const searchEngine = new SearchEngine(
  import.meta.env.VITE_GOOGLE_API_KEY as string,
  import.meta.env.VITE_SEARCH_ENGINE_ID as string
);

const App = () => (
  <React.StrictMode>
    <InputForm searchEngine={searchEngine} />
  </React.StrictMode>
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
