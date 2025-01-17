import ReactMarkdown from 'react-markdown';
import { Box, styled } from '@mui/material';

const StyledMarkdown = styled(Box)(({ theme }) => ({
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.7,
  },
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  '& ul, & ol': {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
  },
  '& li': {
    marginBottom: theme.spacing(1),
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& strong': {
    fontWeight: 600,
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.grey[300]}`,
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0, 2),
    color: theme.palette.text.secondary,
  },
}));

interface Props {
  content: string;
}

function MarkdownContent({ content }: Props) {
  return (
    <StyledMarkdown>
      <ReactMarkdown>{content}</ReactMarkdown>
    </StyledMarkdown>
  );
}

export default MarkdownContent;