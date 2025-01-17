import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { JobFeedback } from '../types/types';

interface Props {
  feedback: JobFeedback;
}

function FeedbackView({ feedback }: Props) {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5">
            Match Level:
          </Typography>
          <Chip
            label={feedback.matchLevel.toUpperCase()}
            color={feedback.matchLevel === 'high' ? 'success' : 'primary'}
          />
        </Stack>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {feedback.additionalComment}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Suggestions
        </Typography>
        <List>
          {feedback.suggestions.map((suggestion, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <LightbulbIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Recommended Actions
        </Typography>
        <List>
          {feedback.actions.map((action, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <PlayArrowIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={action.description}
                secondary={`Action Type: ${action.actionType}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default FeedbackView;