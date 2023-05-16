import {styled} from '@mui/system';
import {Box, Button, Paper, Typography} from '@mui/material';

export const StyledPaper = styled(Paper)(({theme}) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  display: 'flex',
  flexDirection: 'column',
}));

export const TitleContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(1),
}));

export const SummarizeButton = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-start',
  marginTop: theme.spacing(1),
}));

export const Snippet = styled(Typography)(({theme}) => ({
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginTop: theme.spacing(1),
}));

export const Summary = styled(Typography)({  // Add this style
  marginTop: '8px',
  color: '#999',
});
