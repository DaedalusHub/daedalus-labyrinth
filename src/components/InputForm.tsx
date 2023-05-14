import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { SearchEngine } from '@src/search/searchEngine';
import { Source } from '@src/search/source';
import { SummaryGenerator } from '@src/summarization/summaryGenerator';

interface InputFormProps {
  searchEngine: SearchEngine;
  summaryGenerator: SummaryGenerator;
}

const InputForm = ({
  searchEngine,
  summaryGenerator,
}: InputFormProps): React.JSX.Element => {
  const [input, setInput] = useState('');
  const [sources, setSources] = useState<Source[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newSources = await searchEngine.search(input);
    setSources(newSources);
  };

  const handleSummarize = async (source: Source) => {
    const summary = await summaryGenerator.summarizeSource(source.url);
    alert(`Summary for ${source.title}: ${summary}`);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Enter your subject"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      {sources.map((source) => (
        <div key={source.title}>
          <h2>{source.title}</h2>
          <a href={source.url}>{source.url}</a>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSummarize(source)}
          >
            Summarize
          </Button>
        </div>
      ))}
    </Container>
  );
};

export default InputForm;
