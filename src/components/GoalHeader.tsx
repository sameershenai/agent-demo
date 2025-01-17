import { Box, Paper, Typography, IconButton, Stack, Collapse, TextField, Button, Chip, Divider, Grid, LinearProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TargetIcon from '@mui/icons-material/TrackChanges';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BuildIcon from '@mui/icons-material/Build';
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

  const handleGoalUpdate = () => {
    if (onGoalUpdate) {
      onGoalUpdate(goalText);
    }
    setIsEditingGoal(false);
  };

  const insights = {
    searches: 12,
    totalJobs: 48,
    matchStats: {
      high: 35,
      medium: 45,
      low: 20,
    },
    skillGaps: [
      'Cloud Architecture',
      'System Design',
      'React Native',
    ],
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
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            Job Search Insights
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <InsightCard>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <WorkHistoryIcon color="primary" />
                  <Typography variant="subtitle2">Search Activity</Typography>
                </Stack>
                <Stack spacing={0.5}>
                  <Typography variant="h4" color="primary.main">
                    {insights.searches}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Searches this month
                  </Typography>
                  <Typography variant="body2">
                    {insights.totalJobs} jobs analyzed
                  </Typography>
                </Stack>
              </InsightCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <InsightCard>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingUpIcon color="primary" />
                  <Typography variant="subtitle2">Match Distribution</Typography>
                </Stack>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">High Match</Typography>
                      <Typography variant="body2" color="success.main">
                        {insights.matchStats.high}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={insights.matchStats.high}
                      color="success"
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">Medium Match</Typography>
                      <Typography variant="body2" color="warning.main">
                        {insights.matchStats.medium}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={insights.matchStats.medium}
                      color="warning"
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Stack>
              </InsightCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <InsightCard>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <BuildIcon color="primary" />
                  <Typography variant="subtitle2">Top Skill Gaps</Typography>
                </Stack>
                <Stack spacing={1}>
                  {insights.skillGaps.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                      sx={{ alignSelf: 'flex-start' }}
                    />
                  ))}
                </Stack>
              </InsightCard>
            </Grid>
          </Grid>
        </>
      )}
    </StyledPaper>
  );
}

export default GoalHeader;