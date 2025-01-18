import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Divider,
  styled,
  IconButton,
  Collapse,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WorkIcon from '@mui/icons-material/Work';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';

interface Props {
  onSubmit: (jsonData: string, goalText: string) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 680,
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const exampleGoals = [
  "Senior Frontend Engineer in San Francisco",
  "Remote React Developer position",
  "Engineering Manager role at a startup",
  "Full Stack Developer in fintech",
];

function JobSearchInput({ onSubmit }: Props) {
  const [goal, setGoal] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [showJson, setShowJson] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim() && jsonInput.trim()) {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubmit(jsonInput, goal);
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setGoal(example);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 180px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        mx: 'auto',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <StyledPaper elevation={0}>
        <Stack spacing={4} alignItems="center">
          <Box sx={{ maxWidth: 480, width: '100%' }}>
            <Stack spacing={2} alignItems="center">
              <WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h4" fontWeight={600} align="center" gutterBottom>
                What's your dream job?
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Describe your ideal role and let our AI agent find the perfect matches for you
              </Typography>
            </Stack>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Stack spacing={2} alignItems="center">
              <TextField
                fullWidth
                multiline
                rows={3}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Example: Looking for a Senior Frontend Engineer role at a tech company, preferably in San Francisco or remote. Interested in companies with strong engineering culture and work-life balance."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'grey.50',
                    fontSize: '1.1rem',
                  },
                  width: '100%',
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', width: '100%' }}>
                <Typography variant="body2" color="text.secondary">
                  More
                </Typography>
                <IconButton onClick={() => setShowJson(!showJson)} size="small">
                  {showJson ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={showJson} sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your JSON data here..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'grey.50',
                      fontSize: '1.1rem',
                      fontFamily: 'monospace',
                    },
                  }}
                />
              </Collapse>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!goal.trim() || !jsonInput.trim() || isLoading}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <RocketLaunchIcon />}
                sx={{
                  mt: 3,
                  height: 48,
                  fontSize: '1.1rem',
                  width: 320,
                }}
              >
                {isLoading ? 'Finding matches...' : 'Find Matching Jobs'}
              </Button>
            </Stack>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Or try these examples
              </Typography>
            </Divider>

            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={1}
              justifyContent="center"
              sx={{ gap: 1 }}
            >
              {exampleGoals.map((example) => (
                <Chip
                  key={example}
                  label={example}
                  onClick={() => handleExampleClick(example)}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white',
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{ maxWidth: 520 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Our AI agent will analyze your goal and find jobs that match your preferences,
              including company culture, location, and technical requirements.
            </Typography>
          </Box>
        </Stack>
      </StyledPaper>

      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
        open={isLoading}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress color="inherit" size={48} />
          <Typography variant="h6" color="inherit">
            Finding your perfect matches...
          </Typography>
        </Stack>
      </Backdrop>
    </Box>
  );
}

export default JobSearchInput;