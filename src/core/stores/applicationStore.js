import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MOCK_APPLICATIONS = [
  {
    id: 'mock-app-1',
    jobId: 'mock-job-1',
    jobTitle: 'Lead BI Partner',
    company: 'TechCorp Analytics',
    location: 'London, UK',
    status: 'reviewing',
    appliedDate: '2026-03-10',
    salary: '£85,000 - £110,000',
    notes: 'Recruiter moved you to reviewing.'
  },
  {
    id: 'mock-app-2',
    jobId: 'mock-job-2',
    jobTitle: 'Senior React Developer',
    company: 'Innovate Solutions',
    location: 'Remote',
    status: 'interviewing',
    appliedDate: '2026-03-05',
    salary: '$120,000 - $150,000',
    notes: 'Recruiter moved you to interviewing.'
  },
  {
    id: 'mock-app-3',
    jobId: 'mock-job-3',
    jobTitle: 'Data Science Lead',
    company: 'FinServ Global',
    location: 'New York, US',
    status: 'applied',
    appliedDate: '2026-03-14',
    salary: '$130,000 - $160,000',
    notes: 'Application submitted successfully.'
  },
  {
    id: 'mock-app-4',
    jobId: 'mock-job-4',
    jobTitle: 'DevOps Engineer',
    company: 'CloudBase Inc',
    location: 'Berlin, Germany',
    status: 'offered',
    appliedDate: '2026-02-20',
    salary: '€90,000 - €120,000',
    notes: 'Congratulations! You have an offer. Action required.'
  },
  {
    id: 'mock-app-5',
    jobId: 'mock-job-5',
    jobTitle: 'Product Manager',
    company: 'GrowthLabs',
    location: 'San Francisco, US',
    status: 'applied',
    appliedDate: '2026-03-16',
    salary: '$140,000 - $180,000',
    notes: 'Application submitted successfully.'
  }
];

export const useApplicationStore = create(
  persist(
    (set, get) => ({
      applications: MOCK_APPLICATIONS,

      // Update status (Used for Accept/Reject Offer, or Withdrawing by the Candidate)
      updateStatus: (id, newStatus) => set((state) => ({
        applications: state.applications.map(app =>
          app.id === id ? {
            ...app,
            status: newStatus,
            notes: newStatus === 'accepted' ? 'Offer Accepted!' : 'Application Closed.'
          } : app
        )
      })),

      // Used by the Recruiter/Client to update the Candidate's board
      updateStatusByJobId: (jobId, newStatus) => set((state) => ({
        applications: state.applications.map(app =>
          app.jobId === jobId ? {
            ...app,
            status: newStatus,
            notes: newStatus === 'offered'
              ? 'Congratulations! You have an offer. Action required.'
              : `Recruiter moved you to ${newStatus}.`
          } : app
        )
      })),

      // Add a real application when they click "Apply"
      addApplication: (job) => {
        const currentApps = get().applications;

        // Anti-spam: Check if they already applied to this specific job
        const alreadyApplied = currentApps.some(app => app.jobId === job.id);
        if (alreadyApplied) return false;

        set({
          applications: [{
            id: Date.now().toString(),
            jobId: job.id,
            jobTitle: job.title,
            company: job.client || job.company || "Confidential",
            location: job.location || "Remote",
            status: 'applied',
            appliedDate: new Date().toISOString().split('T')[0],
            salary: job.salary || 'Competitive',
            notes: 'Application submitted successfully.'
          }, ...currentApps]
        });

        return true;
      }
    }),
    { name: 'talentsense-applications' }
  )
);
