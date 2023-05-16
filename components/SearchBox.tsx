// src/user_interface/search_box.tsx

import React from 'react';
import {Box, Button, TextField} from '@mui/material';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox = ({onSearch}: SearchBoxProps) => {
  const defaultInput = 'game development';
  const [input, setInput] = React.useState(defaultInput);

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
    onSearch(input);
  };

  return (
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
          sx={{marginRight: 2}}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default SearchBox;
