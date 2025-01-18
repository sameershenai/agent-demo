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

  const handleJobSearch = (input: string) => {
    try {
      // Try to parse as JSON
      const jsonData = JSON.parse(input);
      setResponse(jsonData);

      // Create a dummy goal from the first job's title and company
      if (jsonData.jobs && jsonData.jobs.length > 0) {
        const firstJob = jsonData.jobs[0];
        const dummyGoal = `Looking for ${firstJob.jobPostingData.title} roles${
          firstJob.jobPostingData.companyName
            ? `, especially at companies like ${firstJob.jobPostingData.companyName}`
            : ''
        }`;
        setCurrentGoal(dummyGoal);
      }
    } catch {
      // If not JSON, use as goal text
      setCurrentGoal(input);
      const sampleResponse = {
        "response": "Thank you for using Job Seeker Agent, I've picked 3 jobs for you.",
        "goalId": "d2c88604-6794-40f7-aae0-264a3c15dc0f",
        "jobs": [
          {
            "jobId": "4128046946",
            "resumeData": "Mock resume data for job 4128046946, title:Engineering Manager, UI Components and Patterns",
            "coverLetterData": "Mock cover letter data for job 4128046946, title: FEngineering Manager, UI Components and Patterns",
            "feedback": {
              "matchLevel": "high",
              "additionalComment": "Great match for your skills",
              "suggestions": [
                "Improve your LinkedIn profile",
                "Reach out to connections at this company"
              ],
              "actions": [
                {
                  "actionType": "EDIT_RESUME",
                  "description": "Update your resume with recent projects",
                  "targetResource": "resume_link_4128046946"
                },
                {
                  "actionType": "ADD_SKILLS",
                  "description": "Add new skills to your profile",
                  "targetResource": "skills_link_4128046946"
                }
              ]
            },
            "jobPostingData": {
              "id": "4128046946",
              "title": "Frontend Engineer, UI Components and Patterns",
              "experienceLevel": "MID_SENIOR_LEVEL",
              "jobDescription": "Who we are\n**About Stripe**\nStripe is a financial infrastructure platform for businesses...",
              "company": "Stripe, Stripe is a financial infrastructure platform for businesses...",
              "compensationDescription": "$136.8K/year - $205.2K/year",
              "workplaceTypes": "[Remote]",
              "geoLocation": "United States",
              "companyName": "Stripe"
            }
          }
          // ... you can add the other jobs from input.json here
        ]
      };
      setResponse(sampleResponse);
    }
  };

  const handleGoalUpdate = (newGoal: string) => {
    setCurrentGoal(newGoal);
    handleJobSearch(newGoal);
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