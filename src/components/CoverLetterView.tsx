import { Paper, Typography, Box } from '@mui/material';

interface Props {
  coverLetterData: string;
}

function CoverLetterView({ coverLetterData }: Props) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Generated Cover Letter
      </Typography>
      <Box sx={{
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
        bgcolor: 'grey.50',
        p: 2,
        borderRadius: 1
      }}>
        {coverLetterData}
      </Box>
    </Paper>
  );
}

export default CoverLetterView;