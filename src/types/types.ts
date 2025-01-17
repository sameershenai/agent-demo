export interface JobAction {
  actionType: string;
  description: string;
  targetResource: string;
}

export interface JobFeedback {
  matchLevel: string;
  additionalComment: string;
  suggestions: string[];
  actions: JobAction[];
}

export interface JobPostingData {
  id: string;
  title: string;
  experienceLevel: string;
  jobDescription: string;
  company: string;
  compensationDescription: string;
  workplaceTypes: string;
  geoLocation: string;
  companyName: string;
}

export interface Job {
  jobId: string;
  resumeData: string;
  coverLetterData: string;
  feedback: JobFeedback;
  jobPostingData: JobPostingData;
}

export interface JobResponse {
  response: string;
  goalId: string;
  jobs: Job[];
}