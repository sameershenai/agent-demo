import { Box, Paper } from '@mui/material';
import HtmlContent from './shared/HtmlContent';

interface Props {
  coverLetterData: string;
}

function CoverLetterView({ coverLetterData }: Props) {
  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Box sx={{
          maxWidth: '800px',
          margin: '0 auto',
          '& > div': {
            maxWidth: '600px',
            margin: '0 auto',
          }
        }}>
          <HtmlContent content={coverLetterData} />
        </Box>
      </Paper>
    </Box>
  );
}

export default CoverLetterView;