import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Paper,
  Stack,
  TextField,
  Avatar,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import MarkdownContent from './shared/MarkdownContent';
import { Job } from '../types/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

interface Props {
  open: boolean;
  onClose: () => void;
  job: Job;
}

const screeningQuestions = [
  {
    id: 1,
    question: "How many years of experience do you have with React?",
    answer: "I have 5 years of professional experience working with React, including building large-scale applications and design systems.",
    required: true,
  },
  {
    id: 2,
    question: "Are you authorized to work in the United States?",
    answer: "Yes, I am authorized to work in the United States.",
    required: true,
  },
  {
    id: 3,
    question: "Are you willing to work remotely?",
    answer: "Yes, I have 3 years of experience working in remote-first companies and am well-equipped for remote work.",
    required: true,
  },
  {
    id: 4,
    question: "What is your expected salary range?",
    answer: "My expected salary range is $130,000 - $180,000 annually, depending on the total compensation package.",
    required: false,
  },
];

const contactInfo = {
  name: "Justin Lai",
  email: "julai@example.com",
  phone: "+1 (555) 123-4567",
  linkedin: "linkedin.com/in/julai",
};

function ApplicationReview({ open, onClose, job }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3;
  const progress = ((activeStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    onClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Contact Info
            </Typography>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Avatar
                  sx={{ width: 64, height: 64 }}
                  src="https://via.placeholder.com/64"
                />
                <Box>
                  <Typography variant="h6">{contactInfo.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Engineering Manager
                  </Typography>
                </Box>
              </Stack>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon color="action" />
                  <Typography>{contactInfo.email}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneIcon color="action" />
                  <Typography>{contactInfo.phone}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LinkedInIcon color="action" />
                  <Typography>{contactInfo.linkedin}</Typography>
                </Stack>
              </Stack>
            </Paper>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                We'll use this info to contact you about your application
              </Typography>
            </Box>
          </Stack>
        );
      case 1:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Resume
            </Typography>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="primary">
                  john-doe-resume.pdf
                </Typography>
                <CheckCircleIcon color="success" />
              </Stack>
              <MarkdownContent content={job.resumeData} />
            </Paper>
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Additional Questions
            </Typography>
            {screeningQuestions.map((q) => (
              <Paper key={q.id} elevation={0} sx={{ p: 3, bgcolor: 'grey.50' }}>
                <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
                  <Typography variant="subtitle1" color="text.primary">
                    {q.question}
                  </Typography>
                  {q.required && (
                    <Typography color="error">*</Typography>
                  )}
                </Stack>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={q.answer}
                  variant="outlined"
                  sx={{
                    mt: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                    },
                  }}
                />
              </Paper>
            ))}
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { minHeight: '80vh' }
      }}
    >
      <DialogTitle sx={{ px: 3, py: 2 }}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Easy Apply
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.jobPostingData.title} at {job.jobPostingData.companyName}
              </Typography>
            </Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 4,
              borderRadius: 2,
              bgcolor: 'grey.100',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#057642',
              },
            }}
          />
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
          >
            Back
          </Button>
          {activeStep === totalSteps - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: '#057642',
                '&:hover': {
                  bgcolor: '#046236',
                },
              }}
            >
              Submit application
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ApplicationReview;