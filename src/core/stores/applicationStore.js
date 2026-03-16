import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useApplicationStore = create(
  persist(
    (set, get) => ({
      applications: [], // <--- Starts completely empty!
      
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

      // 👇 NEW: Used by the Recruiter/Client to update the Candidate's board
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
        if (alreadyApplied) return false; // Returns false if already applied

        set({
          applications: [{
            id: Date.now().toString(),
            jobId: job.id, // Keep track of the original job ID
            jobTitle: job.title,
            company: job.client || job.company || "Confidential",
            location: job.location || "Remote",
            status: 'applied',
            appliedDate: new Date().toISOString().split('T')[0],
            salary: job.salary || 'Competitive',
            notes: 'Application submitted successfully.'
          }, ...currentApps]
        });

        return true; // Successfully applied
      }
    }),
    { name: 'talentsense-applications' }
  )
);