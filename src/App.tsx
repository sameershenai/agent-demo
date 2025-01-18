import { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import JobSearchInput from './components/JobSearchInput';
import { JobResponse } from './types/types';
import { alpha } from '@mui/material/styles';
import Navbar from './components/Navbar';
import GoalHeader from './components/GoalHeader';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a66c2', // LinkedIn blue
      light: '#057642',
      dark: '#004182',
    },
    background: {
      default: '#f3f2ef', // LinkedIn background
      paper: '#ffffff',
    },
    text: {
      primary: '#191919',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Fira Sans,Ubuntu,Oxygen,Oxygen Sans,Cantarell,Droid Sans,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Lucida Grande,Helvetica,Arial,sans-serif',
    h4: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 16,
          padding: '8px 24px',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&:hover': {
            backgroundColor: alpha('#0a66c2', 0.08),
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  const [response, setResponse] = useState<JobResponse | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [currentGoal, setCurrentGoal] = useState<string>('');

  const handleJobSearch = (jsonData: string, goalText: string) => {
    try {
      // Parse and use the JSON data
      const jsonResponse = JSON.parse(jsonData);
      setResponse(jsonResponse);
      // Use the goal text for display
      setCurrentGoal(goalText);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  const handleGoalUpdate = (newGoal: string) => {
    setCurrentGoal(newGoal);
    handleJobSearch(newGoal, newGoal);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 52px)',
            bgcolor: 'background.default',
            background: 'linear-gradient(180deg, #f3f2ef 0%, #ffffff 100%)',
            mt: '52px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              maxWidth: '1440px', // Maximum width of the centered container
              margin: '0 auto',
            }}
          >
            {response && (
              <Sidebar
                jobs={response.jobs}
                selectedJobId={selectedJobId}
                onJobSelect={setSelectedJobId}
              />
            )}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 4,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ width: '100%', maxWidth: response ? '1200px' : '800px', margin: '0 auto' }}>
                <GoalHeader
                  goal={currentGoal}
                  onGoalUpdate={handleGoalUpdate}
                  showEditButton={!!response}
                />

                {!response && (
                  <JobSearchInput onSubmit={handleJobSearch} />
                )}
                {response && (
                  <MainContent
                    response={response}
                    selectedJobId={selectedJobId}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;