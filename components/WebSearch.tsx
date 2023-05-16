import React, {useState} from 'react';
import {Box, Container} from '@mui/material';
import SearchBox from './SearchBox';
import {WebSource} from "@src/search/webSource";
import Result from "./Result";
import search from "@src/search/search";

const WebSearch = () => {
  const [sources, setSources] = useState<WebSource[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Add this to store the last search query

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    try {
      const newSources = await search(query); // Use `query` directly
      setSources(newSources);
    } catch (error) {
      console.error("Error occurred while searching:", error);
    }
  };

  const handleSummarize = async (source: WebSource) => {
    const res = await fetch(`/api/summarize?url=${encodeURIComponent(source.url)}&searchPrompt=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();
    source.summary = data.summary;
    setSources([...sources]);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <SearchBox onSearch={handleSearch}/>
        {sources.map((source) => (
          <Result key={source.title} source={source} onSummarize={handleSummarize}/>
        ))}
      </Box>
    </Container>
  );
}

export default WebSearch;
