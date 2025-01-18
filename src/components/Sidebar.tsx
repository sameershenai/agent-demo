import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  Chip,
  Stack,
  Tooltip,
  Slide,
  LinearProgress,
  Divider,
} from '@mui/material';
import { Job } from '../types/types';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  jobs: Job[];
  selectedJobId: string | null;
  onJobSelect: (jobId: string) => void;
}

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 1),
  padding: theme.spacing(2),
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
  },
}));

// const MatchIndicator = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: theme.spacing(0.5),
//   marginTop: theme.spacing(1),
// }));

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
}));

const MatchBar = styled(LinearProgress)(({ theme }) => ({
  width: 100,
  height: 8,
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.grey[300], 0.5),
  '.MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const getMatchScore = (matchLevel: string): number => {
  switch (matchLevel.toLowerCase()) {
    case 'high':
      return 100;
    case 'medium':
      return 65;
    default:
      return 35;
  }
};

const getMatchColor = (matchLevel: string) => {
  switch (matchLevel.toLowerCase()) {
    case 'high':
      return '#057642';
    case 'medium':
      return '#B15C00';
    default:
      return '#666666';
  }
};

const historyData = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Microsoft",
    date: "2024-03-15",
    status: "Interview Scheduled",
    statusType: "interview",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Amazon",
    date: "2024-03-14",
    status: "Applied",
    statusType: "applied",
  },
  {
    id: 3,
    title: "React Developer",
    company: "Meta",
    date: "2024-03-12",
    status: "Application Viewed",
    statusType: "viewed",
  },
];

const getStatusChipProps = (statusType: string) => {
  switch (statusType) {
    case 'interview':
      return {
        icon: <EventIcon />,
        color: 'success' as const,
        variant: 'filled' as const,
      };
    case 'applied':
      return {
        icon: <SendIcon />,
        color: 'primary' as const,
        variant: 'outlined' as const,
      };
    default:
      return {
        icon: <HistoryIcon />,
        color: 'default' as const,
        variant: 'outlined' as const,
      };
  }
};

function Sidebar({ jobs, selectedJobId, onJobSelect }: Props) {

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Box
        component={Paper}
        elevation={1}
        sx={{
          width: 380,
          flexShrink: 0,
          borderRight: 1,
          borderColor: 'divider',
          height: '100vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          boxShadow: '1px 0 8px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 52,
        }}
      >
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: 'divider',
            background: 'linear-gradient(to right, #ffffff, #f3f2ef)',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
          >
            Job Recommendations
          </Typography>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
            {jobs.length} matches found
          </Typography>
        </Box>

        <List>
          {jobs.map((job) => (
            <ListItem key={job.jobId} disablePadding>
              <StyledListItemButton
                selected={job.jobId === selectedJobId}
                onClick={() => onJobSelect(job.jobId)}
              >
                <Box sx={{ width: '100%' }}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight={600}>
                        {job.jobPostingData.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                          {job.jobPostingData.companyName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.jobPostingData.geoLocation}
                        </Typography>

                        <Stack spacing={1} sx={{ mt: 1.5 }}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <MatchBar
                              variant="determinate"
                              value={getMatchScore(job.feedback.matchLevel)}
                              sx={{
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getMatchColor(job.feedback.matchLevel),
                                },
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: getMatchColor(job.feedback.matchLevel),
                                fontWeight: 500,
                                minWidth: 85,
                              }}
                            >
                              {job.feedback.matchLevel.toUpperCase()} Match
                            </Typography>
                          </Stack>

                          <Stack direction="row" spacing={1}>
                            <Tooltip title={job.feedback.additionalComment}>
                              <StyledChip
                                icon={<TipsAndUpdatesIcon />}
                                label={`${job.feedback.suggestions.length} Tips`}
                                size="small"
                                variant="outlined"
                              />
                            </Tooltip>
                          </Stack>
                        </Stack>
                      </Box>
                    }
                  />
                </Box>
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ px: 3, pb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              mb: 2,
            }}
          >
            Application History
          </Typography>

          <Stack spacing={2}>
            {historyData.map((item) => (
              <Paper
                key={item.id}
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                }}
              >
                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={500}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.company}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      {...getStatusChipProps(item.statusType)}
                      label={item.status}
                      sx={{ ml: 1 }}
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    Applied {new Date(item.date).toLocaleDateString()}
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Box>
    </Slide>
  );
}

export default Sidebar;