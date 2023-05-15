import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WebSearch from "@src/components/WebSearch";
import {Source} from "@src/search/source";
import search from "@src/search/search";

export default function Home() {
  const [sources, setSources] = React.useState<Source[]>([]);

  const handleSearch = async (searchTerm: string) => {
    try {
      const newSources = await search(searchTerm);
      setSources(newSources);
    } catch (error) {
      console.error("Error occurred while searching:", error);
    }
  };
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Daedalus Labyrinth
        </Typography>
        <WebSearch sources={sources} onSearch={handleSearch} />
      </Box>
    </Container>
  );
}
