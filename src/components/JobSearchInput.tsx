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
  Link,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import { useState } from 'react';

interface Props {
  onSubmit: (input: string) => void;
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
  const [isJsonMode, setIsJsonMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit(goal);
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
                {isJsonMode ? 'Enter JSON Data' : "What's your dream job?"}
              </Typography>
              {!isJsonMode && (
                <Typography variant="body1" color="text.secondary" align="center">
                  Describe your ideal role and let our AI agent find the perfect matches for you
                </Typography>
              )}
            </Stack>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              multiline
              rows={isJsonMode ? 10 : 3}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder={isJsonMode
                ? "Paste your JSON data here..."
                : "Example: Looking for a Senior Frontend Engineer role at a tech company, preferably in San Francisco or remote. Interested in companies with strong engineering culture and work-life balance."
              }
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.50',
                  fontSize: '1.1rem',
                  fontFamily: isJsonMode ? 'monospace' : 'inherit',
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!goal.trim()}
              startIcon={isJsonMode ? <CodeIcon /> : <RocketLaunchIcon />}
              sx={{
                mt: 3,
                height: 48,
                fontSize: '1.1rem',
                maxWidth: 320,
              }}
            >
              {isJsonMode ? 'Load JSON Data' : 'Find Matching Jobs'}
            </Button>
          </Box>

          {!isJsonMode && (
            <>
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
            </>
          )}

          <Divider sx={{ width: '100%' }} />

          <Box>
            <Link
              component="button"
              variant="body2"
              onClick={() => setIsJsonMode(!isJsonMode)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <CodeIcon fontSize="small" />
              {isJsonMode ? 'Switch to Goal Input' : 'Switch to JSON Input'}
            </Link>
          </Box>
        </Stack>
      </StyledPaper>
    </Box>
  );
}

export default JobSearchInput;