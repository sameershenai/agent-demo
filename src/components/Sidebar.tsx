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
  Slide
} from '@mui/material';
import { Job } from '../types/types';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

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

const MatchIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
}));

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

                        <MatchIndicator>
                          <CheckCircleIcon
                            sx={{
                              color: getMatchColor(job.feedback.matchLevel),
                              fontSize: 20
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: getMatchColor(job.feedback.matchLevel),
                              fontWeight: 500
                            }}
                          >
                            {job.feedback.matchLevel.toUpperCase()} Match
                          </Typography>
                        </MatchIndicator>

                        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                          <Tooltip title={job.feedback.additionalComment}>
                            <StyledChip
                              icon={<TipsAndUpdatesIcon />}
                              label={`${job.feedback.suggestions.length} Tips`}
                              size="small"
                              variant="outlined"
                            />
                          </Tooltip>
                        </Stack>
                      </Box>
                    }
                  />
                </Box>
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Slide>
  );
}

export default Sidebar;