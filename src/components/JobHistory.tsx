import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Paper,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import SendIcon from '@mui/icons-material/Send';

const StatusChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
}));

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
  // Add more history items as needed
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
    case 'viewed':
      return {
        icon: <CheckCircleIcon />,
        color: 'default' as const,
        variant: 'outlined' as const,
      };
    default:
      return {
        color: 'default' as const,
        variant: 'outlined' as const,
      };
  }
};

function JobHistory() {
  return (
    <Paper
      sx={{
        mt: 2,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" fontWeight={600}>
          Application History
        </Typography>
      </Box>
      <List disablePadding>
        {historyData.map((item, index) => (
          <Box key={item.id}>
            <ListItem sx={{ py: 2 }}>
              <ListItemText
                primary={
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" fontWeight={500}>
                      {item.title}
                    </Typography>
                    <StatusChip
                      label={item.status}
                      size="small"
                      {...getStatusChipProps(item.statusType)}
                    />
                  </Stack>
                }
                secondary={
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.company}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(item.date).toLocaleDateString()}
                    </Typography>
                  </Stack>
                }
              />
            </ListItem>
            {index < historyData.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
}

export default JobHistory;