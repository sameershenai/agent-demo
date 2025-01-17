import { Box, Typography, Paper, Chip, Stack, Divider, Button } from '@mui/material';
import { Job } from '../types/types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PaidIcon from '@mui/icons-material/Paid';
import BusinessIcon from '@mui/icons-material/Business';
import MarkdownContent from './shared/MarkdownContent';
import ApplicationReview from './ApplicationReview';
import { useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';

interface Props {
  job: Job;
}

function JobDetails({ job }: Props) {
  const { jobPostingData } = job;
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 2 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="500">
            {jobPostingData.title}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <BusinessIcon color="action" />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 500 }}>
              {jobPostingData.companyName}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 3 }}>
            <Chip
              icon={<LocationOnIcon />}
              label={jobPostingData.geoLocation}
              variant="outlined"
              sx={{ borderRadius: 1 }}
            />
            <Chip
              icon={<WorkIcon />}
              label={jobPostingData.workplaceTypes.replace(/[\[\]"]/g, '')}
              variant="outlined"
              sx={{ borderRadius: 1 }}
            />
            {jobPostingData.compensationDescription && (
              <Chip
                icon={<PaidIcon />}
                label={jobPostingData.compensationDescription}
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            )}
          </Stack>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setIsReviewOpen(true)}
              startIcon={<ArticleIcon />}
            >
              Easy Apply
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Save Job
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Company Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight="500">
            About the Company
          </Typography>
          <MarkdownContent content={jobPostingData.company} />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Job Description Section */}
        <Box>
          <Typography variant="h6" gutterBottom fontWeight="500">
            Job Description
          </Typography>
          <MarkdownContent content={jobPostingData.jobDescription} />
        </Box>

        <ApplicationReview
          open={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          job={job}
        />
      </Paper>
    </Box>
  );
}

export default JobDetails;