import React, {useState} from 'react';
import {Box, Container} from '@mui/material';
import SearchBox from './SearchBox';
import {WebSource} from "@src/search/webSource";
import Result from "./Result";
import search from "@src/search/search";

const WebSearch = () => {
  const [sources, setSources] = useState<{ source: WebSource; loading: boolean }[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Add this to store the last search query

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    try {
      const newSources = await search(query);
      setSources(newSources.map((source) => ({ source, loading: false })));
    } catch (error) {
      console.error("Error occurred while searching:", error);
    }
  };

  const handleSummarize = async (sourceInfo: { source: WebSource; loading: boolean }) => {
    setSources(
      sources.map((info) =>
        info.source.url === sourceInfo.source.url ? { ...info, loading: true } : info
      )
    );
    const res = await fetch(
      `/api/summarize?url=${encodeURIComponent(sourceInfo.source.url)}&searchPrompt=${encodeURIComponent(searchTerm)}`
    );
    const data = await res.json();
    sourceInfo.source.summary = data.summary;
    setSources(
      sources.map((info) =>
        info.source.url === sourceInfo.source.url ? { ...info, loading: false } : info
      )
    );
  };



  return (
    <Container maxWidth="md">
      <Box my={4}>
        <SearchBox onSearch={handleSearch}/>
        {sources.map((sourceInfo) => (
          <Result
            key={sourceInfo.source.title}
            sourceInfo={sourceInfo}
            onSummarize={handleSummarize}
          />
        ))}

      </Box>
    </Container>
  );
}

export default WebSearch;
