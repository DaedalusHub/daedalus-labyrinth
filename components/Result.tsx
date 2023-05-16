
import React from 'react';
import {Box, Button, Link, CircularProgress} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {WebSource} from "@src/search/webSource";
import * as styles from "./WebSearchStyles";


interface ResultProps {
  source: WebSource;
  onSummarize: (source: WebSource) => void;
}

const Result = ({ sourceInfo, onSummarize }: { sourceInfo: { source: WebSource; loading: boolean }; onSummarize: any }) => {
  const theme = useTheme();

  return (
    <styles.StyledPaper elevation={3}>
      <styles.TitleContainer>
        <Link
          href={sourceInfo.source.url}
          variant="body1"
          underline="hover"
          sx={{color: theme.palette.text.primary, '&:hover': {color: theme.palette.primary.main}}}
        >
          {sourceInfo.source.title}
        </Link>
        <Button variant="contained" color="secondary" onClick={() => onSummarize(sourceInfo)}>
          {sourceInfo.loading ? <CircularProgress size={24} color={"inherit"}/> : 'Summarize'}
        </Button>
      </styles.TitleContainer>
      <styles.Snippet variant="body2" sx={{color: theme.palette.text.secondary}}>
        {sourceInfo.source.snippet}
      </styles.Snippet>
      {sourceInfo.source.summary && (
        <Box marginTop={2}>
          <styles.Summary variant="body2">{sourceInfo.source.summary}</styles.Summary>
        </Box>
      )}
    </styles.StyledPaper>
  );
};

export default Result;
