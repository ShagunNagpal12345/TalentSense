import { create } from 'zustand';

// Initial Mock Data (so the dashboard isn't empty on first load)
const INITIAL_JOBS = [
  { id: 101, title: "Senior React Developer", client: "TechFlow Solutions", location: "Mumbai", urgency: "High", stage: "Screening", candidates: 12, daysOpen: 4, status: "Active" },
  { id: 102, title: "Marketing Manager", client: "Creative Corp", location: "Delhi", urgency: "Medium", stage: "Client Review", candidates: 5, daysOpen: 8, status: "Active" },
];

export const useJobStore = create((set) => ({
  jobs: INITIAL_JOBS,

  // Action to add a new job
  addJob: (newJob) => set((state) => ({ 
    jobs: [newJob, ...state.jobs] 
  })),

  // Action to update status (optional for later)
  updateJobStage: (jobId, stage) => set((state) => ({
    jobs: state.jobs.map(job => job.id === jobId ? { ...job, stage } : job)
  }))
}));