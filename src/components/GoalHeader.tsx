import { Box, Paper, Typography, IconButton, Stack, Collapse, TextField, Button, Chip, Divider, Grid, LinearProgress, Slide } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TargetIcon from '@mui/icons-material/TrackChanges';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

interface Props {
  goal: string;
  onGoalUpdate?: (newGoal: string) => void;
  showEditButton?: boolean;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  background: 'linear-gradient(to right, #ffffff, #f3f2ef)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
}));

const GoalText = styled(Typography)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(10, 102, 194, 0.08)',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(10, 102, 194, 0.16)',
  '&::before': {
    content: '"\\201C"',
    color: theme.palette.primary.main,
    fontSize: '1.5rem',
    position: 'absolute',
    left: 8,
    top: 4,
  },
  '&::after': {
    content: '"\\201D"',
    color: theme.palette.primary.main,
    fontSize: '1.5rem',
    position: 'absolute',
    right: 8,
    bottom: 4,
  },
}));

const InsightCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
  borderColor: theme.palette.divider,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

function GoalHeader({ goal, onGoalUpdate, showEditButton = true }: Props) {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalText, setGoalText] = useState(goal);
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);

  const handleGoalUpdate = () => {
    if (onGoalUpdate) {
      onGoalUpdate(goalText);
    }
    setIsEditingGoal(false);
  };

  const insights = {
    searches: 13,
    totalJobs: 48,
    matchStats: {
      high: 35,
      medium: 45,
      low: 20,
    },
    responseStats: {
      applied: 24,
      heardBack: 16,
      rate: 67, // percentage
    },
    interviewStages: [
      {
        stage: "Initial Screen",
        count: 8,
        status: "completed"
      },
      {
        stage: "Technical Round",
        count: 5,
        status: "completed"
      },
      {
        stage: "System Design",
        count: 3,
        status: "in_progress"
      },
      {
        stage: "Final Round",
        count: 2,
        status: "upcoming"
      }
    ],
    skillGaps: [
      'Cloud Architecture',
      'System Design',
      'React Native',
    ],
  };

  const insightCards = [
    {
      title: "Search Activity",
      icon: <WorkHistoryIcon color="primary" />,
      content: (
        <Stack spacing={0.5}>
          <Typography variant="h4" color="primary.main">
            {insights.searches}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {insights.totalJobs} jobs analyzed this month
          </Typography>
        </Stack>
      )
    },
    {
      title: "Response Rate",
      icon: <TrendingUpIcon color="primary" />,
      content: (
        <Stack spacing={1}>
          <Typography variant="h4" color="primary.main">
            {insights.responseStats.rate}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={insights.responseStats.rate}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'grey.100',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#057642',
              },
            }}
          />
        </Stack>
      )
    },
    {
      title: "Interview Pipeline",
      icon: <WorkHistoryIcon color="primary" />,
      content: (
        <Stack spacing={1}>
          {insights.interviewStages.slice(0, 2).map((stage) => (
            <Box key={stage.stage}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">{stage.stage}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {stage.count}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      )
    },
  ];

  const handleNextInsight = () => {
    setActiveInsightIndex((prev) => (prev + 1) % insightCards.length);
  };

  const handlePrevInsight = () => {
    setActiveInsightIndex((prev) => (prev - 1 + insightCards.length) % insightCards.length);
  };

  return (
    <StyledPaper elevation={0}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Chip
          icon={<TargetIcon />}
          label="Career Goal"
          color="primary"
          variant="outlined"
          size="small"
        />
        {showEditButton && (
          <IconButton
            size="small"
            onClick={() => setIsEditingGoal(!isEditingGoal)}
            sx={{ ml: 'auto' }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>

      <Collapse in={isEditingGoal}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            size="small"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
              },
            }}
            placeholder="Describe your ideal role, including preferred position, industry, and any specific requirements..."
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              size="small"
              onClick={() => setIsEditingGoal(false)}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleGoalUpdate}
            >
              Update Goal
            </Button>
          </Stack>
        </Box>
      </Collapse>

      {!isEditingGoal && goal && (
        <Box sx={{ position: 'relative' }}>
          <GoalText variant="body1" sx={{ pl: 4, pr: 4, py: 2, lineHeight: 1.6 }}>
            {goal}
          </GoalText>
        </Box>
      )}

      {!isEditingGoal && !goal && (
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '1px dashed',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No goal set yet. Click the edit button to define your career goal.
          </Typography>
        </Box>
      )}

      {goal && (
        <>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ position: 'relative' }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Job Seeking Goal Insights
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  size="small"
                  onClick={handlePrevInsight}
                  sx={{
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'grey.200' }
                  }}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleNextInsight}
                  sx={{
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'grey.200' }
                  }}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Stack>
            </Stack>

            <Box sx={{ position: 'relative', height: 140 }}>
              <Slide
                direction="left"
                in={true}
                mountOnEnter
                unmountOnExit
              >
                <Box sx={{ position: 'absolute', width: '100%' }}>
                  <Grid container spacing={2}>
                    {[0, 1, 2].map((offset) => {
                      const index = (activeInsightIndex + offset) % insightCards.length;
                      const card = insightCards[index];
                      return (
                        <Grid item xs={12} md={4} key={index}>
                          <InsightCard>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                              {card.icon}
                              <Typography variant="subtitle2">{card.title}</Typography>
                            </Stack>
                            {card.content}
                          </InsightCard>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Slide>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              {insightCards.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: index === activeInsightIndex ? 'primary.main' : 'grey.300',
                    mx: 0.5,
                    transition: 'background-color 0.3s',
                  }}
                />
              ))}
            </Box>
          </Box>
        </>
      )}
    </StyledPaper>
  );
}

export default GoalHeader;