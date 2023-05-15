'use client';
import React from 'react';
import { Source } from '../search/source';
import { Button, TextField, Box, Link, Container } from '@mui/material';
import * as styles from './WebSearchStyles';
import { useTheme } from '@mui/material/styles';

export interface WebSearchProps {
  sources: Source[];
  onSearch: (query: string) => void;
}

const WebSearch = ({ sources, onSearch }: WebSearchProps) => {
  const defaultInput = 'game development';
  const [input, setInput] = React.useState(defaultInput);
  const theme = useTheme();

  const handleInputClick = () => {
    if (input === defaultInput) {
      setInput('');
    }
  };

  const handleInputBlur = () => {
    if (input.trim() === '') {
      setInput(defaultInput);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSearch(input);
  };

  async function handleSummarize(source: Source) {
    const res = await fetch(`/api/summarize?url=${encodeURIComponent(source.url)}`);
    const data = await res.json();
    alert(`Summary for ${source.title}: ${data.summary}`);
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TextField
              id="outlined-basic"
              label="Enter your subject"
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onClick={handleInputClick}
              onBlur={handleInputBlur}
              sx={{ marginRight: 2 }}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
        {sources.map((source) => (
          <styles.StyledPaper elevation={3} key={source.title}>
            <styles.TitleContainer>
              <Link
                href={source.url}
                variant="body1"
                underline="hover"
                sx={{ color: theme.palette.text.primary, '&:hover': { color: theme.palette.primary.main } }}
              >
                {source.title}
              </Link>
              <styles.SummarizeButton variant="contained" color="secondary" onClick={() => handleSummarize(source)}>
                Summarize
              </styles.SummarizeButton>
            </styles.TitleContainer>
            <styles.Snippet variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {source.snippet}
            </styles.Snippet>
          </styles.StyledPaper>
        ))}
      </Box>
    </Container>
  );
}

export default WebSearch;
