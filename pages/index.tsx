import * as React from 'react';
import Container from '@mui/material/Container';
import WebSearch from "@components/WebSearch";
import {Box} from "@mui/material";
import Title from "@components/Title";
import Copyright from "@components/Copyright";

export default function Home() {
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
        <Title/>
        <WebSearch/>
        <Copyright/>
      </Box>
    </Container>
  );
}
