import { Paper, Typography, Box } from '@mui/material';
import MarkdownContent from './shared/MarkdownContent';

interface Props {
  resumeData: string;
}

function ResumeView({ resumeData }: Props) {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="500">
        Tailored Resume
      </Typography>
      <Box sx={{
        bgcolor: 'grey.50',
        p: 3,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'grey.200'
      }}>
        <MarkdownContent content={resumeData} />
      </Box>
    </Paper>
  );
}

export default ResumeView;