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
  alpha,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useRef, useEffect } from 'react';
import MarkdownContent from './shared/MarkdownContent';
import { Job } from '../types/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HtmlContent from './shared/HtmlContent';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ReactCanvasConfetti from 'react-canvas-confetti';
import CelebrationIcon from '@mui/icons-material/Celebration';

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
  const totalSteps = 5;
  const progress = ((activeStep + 1) / totalSteps) * 100;
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setActiveStep(0);
  }, [job.jobId]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    handleNext(); // Move to success screen
    // Add delay to let the success screen render before firing confetti
    setTimeout(() => {
      fire();
    }, 100);
  };

  const confettiConfig = {
    angle: 90,
    spread: 100,
    startVelocity: 40,
    elementCount: 150,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#057642", "#0a66c2", "#4CAF50", "#2196F3", "#FFC107"],
    origin: { x: 0.5, y: 0.25 },
    particleCount: 150,
    scalar: 1.2
  };

  const fire = () => {
    if (confettiRef.current) {
      // Initial burst
      confettiRef.current.confetti({
        ...confettiConfig,
        spread: 360,
        startVelocity: 45,
        gravity: 1,
        ticks: 400
      });

      // Multiple follow-up bursts
      setTimeout(() => {
        if (confettiRef.current) {
          confettiRef.current.confetti({
            ...confettiConfig,
            spread: 160,
            startVelocity: 35,
            origin: { x: 0.2, y: 0.35 }
          });
          confettiRef.current.confetti({
            ...confettiConfig,
            spread: 160,
            startVelocity: 35,
            origin: { x: 0.8, y: 0.35 }
          });
        }
      }, 250);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const confettiRef = useRef<any>(null);

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
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: 'primary.light',
                    fontSize: '1.5rem',
                  }}
                >
                  {contactInfo.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Cover Letter
              </Typography>
              <Button
                startIcon={<AutoFixHighIcon />}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 2,
                  color: 'primary.light',
                  borderColor: 'primary.light',
                  '&:hover': {
                    borderColor: 'primary.light',
                    backgroundColor: alpha('#057642', 0.04),
                  },
                }}
              >
                Rewrite
              </Button>
            </Stack>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: 'grey.50',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="primary">
                  cover-letter.pdf
                </Typography>
                <CheckCircleIcon color="success" />
              </Stack>
              <Box sx={{
                bgcolor: 'background.paper',
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                maxWidth: '800px',
                margin: '0 auto',
                '& > div': {
                  maxWidth: '600px',
                  margin: '0 auto',
                }
              }}>
                <HtmlContent content={job.coverLetterData} />
              </Box>
            </Paper>
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Resume
              </Typography>
              <Button
                startIcon={<AutoFixHighIcon />}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 2,
                  color: 'primary.light',
                  borderColor: 'primary.light',
                  '&:hover': {
                    borderColor: 'primary.light',
                    backgroundColor: alpha('#057642', 0.04),
                  },
                }}
              >
                Rewrite
              </Button>
            </Stack>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="primary">
                  justin-lai-resume.pdf
                </Typography>
                <CheckCircleIcon color="success" />
              </Stack>
              <MarkdownContent content={job.resumeData} />
            </Paper>
          </Stack>
        );
      case 3:
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
      case 4:
        return (
          <Stack spacing={4} alignItems="center" sx={{ py: 8 }}>
            <CelebrationIcon
              sx={{
                fontSize: 64,
                color: 'primary.light',
                animation: 'bounce 1s infinite',
              }}
            />
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Great job!
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 480 }}>
                Your application has been submitted to {job.jobPostingData.companyName}
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 480 }}>
                The AI agent will keep track of this application and notify you of any updates.
              </Typography>
            </Stack>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                mt: 4,
                bgcolor: '#057642',
                '&:hover': {
                  bgcolor: '#046236',
                },
              }}
            >
              Done
            </Button>
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
                Review Application
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
          <Stack direction="row" spacing={2} justifyContent="center">
            {['Contact Info', 'Cover Letter', 'Resume', 'Questions', 'Success'].map((label, index) => (
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: index === activeStep ? 'primary.main' : 'text.secondary',
                  fontWeight: index === activeStep ? 600 : 400,
                  fontSize: '0.875rem',
                }}
              >
                {label}
              </Box>
            ))}
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3, position: 'relative' }}>
        {renderStepContent(activeStep)}

        {activeStep < 4 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0 || isSubmitting}
              sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
            >
              Back
            </Button>
            {activeStep === totalSteps - 2 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting}
                sx={{
                  bgcolor: '#057642',
                  '&:hover': {
                    bgcolor: '#046236',
                  },
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit application'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                Next
              </Button>
            )}
          </Box>
        )}

        <ReactCanvasConfetti
          onInit={(instance) => {
            confettiRef.current = instance;
          }}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            zIndex: 1500,
            opacity: 1
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ApplicationReview;