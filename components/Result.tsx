// src/user_interface/result.tsx

import React from 'react';
import {Box, Button, Link} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {WebSource} from "@src/search/webSource";
import * as styles from "./WebSearchStyles";

interface ResultProps {
  source: WebSource;
  onSummarize: (source: WebSource) => void;
}

const Result = ({source, onSummarize}: ResultProps) => {
  const theme = useTheme();

  return (
    <styles.StyledPaper elevation={3}>
      <styles.TitleContainer>
        <Link
          href={source.url}
          variant="body1"
          underline="hover"
          sx={{color: theme.palette.text.primary, '&:hover': {color: theme.palette.primary.main}}}
        >
          {source.title}
        </Link>
        <Button variant="contained" color="secondary" onClick={() => onSummarize(source)}>
          Summarize
        </Button>
      </styles.TitleContainer>
      <styles.Snippet variant="body2" sx={{color: theme.palette.text.secondary}}>
        {source.snippet}
      </styles.Snippet>
      {source.summary && (
        <Box marginTop={2}>
          <styles.Summary variant="body2">{source.summary}</styles.Summary>
        </Box>
      )}
    </styles.StyledPaper>
  );
};

export default Result;
