import { Box } from '@mui/material';
import DOMPurify from 'dompurify';

interface Props {
  content: string;
}

function HtmlContent({ content }: Props) {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href', 'target'],
  });

  return (
    <Box
      sx={{
        '& p': {
          margin: 0,
          padding: 0,
          lineHeight: 1.8,
          fontSize: '0.975rem',
          '&:not(:last-child)': {
            marginBottom: '1.5em',
          },
          '& strong': {
            display: 'block',
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '1.5em',
          },
        },
        '& br': {
          display: 'none',
        },
        '& a': {
          color: 'primary.main',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        letterSpacing: '0.015em',
        color: 'text.primary',
        fontFamily: (theme) => theme.typography.fontFamily,
      }}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}

export default HtmlContent;