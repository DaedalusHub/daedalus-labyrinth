import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { SearchEngine } from '../data_retrieval/search_engine';
import { Source } from '../data_retrieval/source';

interface InputFormProps {
  searchEngine: SearchEngine;
}

const InputForm = ({ searchEngine }: InputFormProps): React.JSX.Element => {
  const [input, setInput] = useState('');
  const [sources, setSources] = useState<Source[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newSources = await searchEngine.search(input);
    setSources(newSources);
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
        </div>
      ))}
    </Container>
  );
};

export default InputForm;
