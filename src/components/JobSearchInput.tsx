import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  styled
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  textTransform: 'none',
  borderRadius: '0 !important',
  borderTop: 'none !important',
  borderLeft: 'none !important',
  borderRight: 'none !important',
  borderBottom: '3px solid transparent',
  '&.Mui-selected': {
    backgroundColor: 'transparent',
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08)',
}));

interface Props {
  onSubmit: (goal: string) => void;
}

function JobSearchInput({ onSubmit }: Props) {
  const [inputMode, setInputMode] = useState<'goal' | 'json'>('goal');
  const [goal, setGoal] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (inputMode === 'json') {
      try {
        const parsedJson = JSON.parse(jsonInput);
        if (!parsedJson.jobs || !Array.isArray(parsedJson.jobs)) {
          throw new Error('Invalid JSON structure: missing jobs array');
        }
        onSubmit(jsonInput);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid JSON format');
      }
    } else {
      onSubmit(goal);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <StyledPaper>
        <Box sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <RocketLaunchIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight={600}>
              Job Seeker Agent
            </Typography>
          </Stack>

          <Typography variant="body1" color="text.secondary" paragraph>
            Let AI help you find the perfect job match. Enter your career goals or provide JSON data for testing.
          </Typography>
        </Box>

        <Divider />

        <ToggleButtonGroup
          value={inputMode}
          exclusive
          onChange={(_, newMode) => {
            if (newMode !== null) {
              setInputMode(newMode);
              setError(null);
            }
          }}
          sx={{ width: '100%' }}
        >
          <StyledToggleButton value="goal" sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <DescriptionIcon />
              <span>Goal Input</span>
            </Stack>
          </StyledToggleButton>
          <StyledToggleButton value="json" sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CodeIcon />
              <span>JSON Input</span>
            </Stack>
          </StyledToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {inputMode === 'goal' ? (
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    What are you looking for in your next role?
                  </Typography>
                  <Tooltip title="Describe your ideal position, including role, industry preferences, and any specific requirements">
                    <IconButton size="small">
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Example: I'm looking for a senior frontend developer position in a remote-first company, preferably in the fintech industry..."
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'background.paper',
                    },
                  }}
                />
              </Box>
            ) : (
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Test with JSON Data
                  </Typography>
                  <Tooltip title="Paste a valid JSON response to test the interface">
                    <IconButton size="small">
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <TextField
                  fullWidth
                  multiline
                  rows={12}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your JSON here..."
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'background.paper',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                    },
                  }}
                />
              </Box>
            )}

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={inputMode === 'goal' ? !goal.trim() : !jsonInput.trim()}
                startIcon={<RocketLaunchIcon />}
              >
                {inputMode === 'goal' ? 'Find Matching Jobs' : 'Load JSON Data'}
              </Button>
            </Stack>
          </form>
        </Box>
      </StyledPaper>
    </Box>
  );
}

export default JobSearchInput;