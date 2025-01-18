import { Box, Tab, Tabs, Typography, Fade, Paper } from '@mui/material';
import { useState } from 'react';
import { JobResponse } from '../types/types';
import JobDetails from './JobDetails';
import ResumeView from './ResumeView';
import CoverLetterView from './CoverLetterView';
import FeedbackView from './FeedbackView';

interface Props {
  response: JobResponse;
  selectedJobId: string | null;
}

function MainContent({ response, selectedJobId }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const selectedJob = response.jobs.find(job => job.jobId === selectedJobId);

  if (!selectedJob) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">
          Select a job from the list to view details
        </Typography>
      </Box>
    );
  }

  return (
    <Fade in={true}>
      <Box>
        <Paper sx={{ mb: 2 }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
            <Tab label="Job Details" />
            <Tab label="Resume" />
            <Tab label="Cover Letter" />
            <Tab label="Agent Feedback" />
          </Tabs>
        </Paper>

        {activeTab === 0 && <JobDetails job={selectedJob} />}
        {activeTab === 1 && <ResumeView resumeData={selectedJob.resumeData} />}
        {activeTab === 2 && <CoverLetterView coverLetterData={selectedJob.coverLetterData} />}
        {activeTab === 3 && <FeedbackView feedback={selectedJob.feedback} />}
      </Box>
    </Fade>
  );
}

export default MainContent;