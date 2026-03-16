import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useApplicationStore } from './applicationStore';

export const useRecruitmentStore = create(
  persist(
    (set, get) => ({
      // --- DATABASE ---
      jobs: [],
      candidates: [],

      // --- CANDIDATE PORTAL STATE ---
      currentCandidate: {
        id: 'cand-user-1',
        name: "Jane Doe",
        email: "jane.doe@example.com",
        role: "Full Stack Engineer",
        appliedJobs: [],
        profile: {
          about: "",
          experience: [],
          education: [],
          skills: ["JavaScript", "React", "Node.js"],
          videoIntroUrl: null,
          resumeText: "",
          atsScore: null
        }
      },

      // --- JOB ACTIONS ---
      addJob: (jobDetails) => set((state) => {
        const newJob = {
          id: Date.now().toString(),
          ...jobDetails,
          status: "Active",
          datePosted: new Date().toLocaleDateString(),
          candidateCount: 0
        };
        return { jobs: [newJob, ...state.jobs] };
      }),

      deleteJob: (jobId) => set((state) => ({
        jobs: state.jobs.filter(j => j.id !== jobId),
        candidates: state.candidates.filter(c => c.jobId !== jobId)
      })),

      // --- CANDIDATE ACTIONS ---
      addCandidate: (candidate) => set((state) => {
        const newCandidates = [{
          ...candidate, 
          comments: [] 
        }, ...state.candidates];
        
        const newJobs = state.jobs.map(job => 
          job.id === candidate.jobId 
            ? { ...job, candidateCount: (job.candidateCount || 0) + 1 } 
            : job
        );

        return { candidates: newCandidates, jobs: newJobs };
      }),

      updateCandidate: (id, updates) => set((state) => ({
        candidates: state.candidates.map(c => c.id === id ? { ...c, ...updates } : c)
      })),

      // 👇 THE MAGIC: Sync Recruiter moves with the Candidate Kanban Board
      moveCandidate: (candidateId, newStage) => {
        const { candidates } = get();
        const candidate = candidates.find(c => c.id === candidateId);

        if (candidate && candidate.jobId) {
          // 1. Map Recruiter stages to Candidate Kanban columns
          let mappedStatus = 'applied';
          const stageLower = newStage.toLowerCase();

          if (stageLower.includes('screen') || stageLower.includes('review') || stageLower.includes('shortlist')) {
            mappedStatus = 'reviewing';
          } else if (stageLower.includes('interview')) {
            mappedStatus = 'interviewing';
          } else if (stageLower.includes('offer')) {
            mappedStatus = 'offered';
          } else if (stageLower.includes('reject') || stageLower.includes('decline')) {
            mappedStatus = 'rejected';
          } else if (stageLower.includes('hire') || stageLower.includes('accept')) {
            mappedStatus = 'accepted';
          }

          // 2. Trigger the sync to the Candidate's Application Store!
          useApplicationStore.getState().updateStatusByJobId(candidate.jobId, mappedStatus);
        }

        // 3. Update the Recruiter's view
        set((state) => ({
          candidates: state.candidates.map(c => 
            c.id === candidateId ? { ...c, status: newStage, stage: newStage } : c
          )
        }));
      },

      // --- CHAT ACTION ---
      addComment: (candidateId, text, author) => set((state) => ({
        candidates: state.candidates.map(c => 
          c.id === candidateId ? { 
            ...c, 
            comments: [
              ...(c.comments || []),
              { 
                id: Date.now(), 
                text, 
                author, 
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
              }
            ] 
          } : c
        )
      })),

      // --- CANDIDATE PORTAL ACTIONS ---
      updateCandidateProfile: (updates) => set((state) => ({
        currentCandidate: {
          ...state.currentCandidate,
          profile: { ...state.currentCandidate.profile, ...updates }
        }
      })),

      applyForJob: (jobId, applicationData = {}) => set((state) => {
        const { currentCandidate, jobs } = state; 
        
        if (currentCandidate.appliedJobs.includes(jobId)) return state; 

        const targetJob = jobs.find(j => j.id === jobId);

        const newApplication = {
          id: `app-${Date.now()}`,
          jobId: jobId,
          
          name: applicationData.name || currentCandidate.name,
          email: applicationData.email || currentCandidate.email,
          phone: applicationData.phone || "",
          
          role: targetJob ? targetJob.title : currentCandidate.role,
          
          resumeText: applicationData.resumeText || currentCandidate.profile.resumeText,
          noticePeriod: applicationData.noticePeriod,
          currentCTC: applicationData.currentCTC,
          expectedCTC: applicationData.expectedCTC,
          location: applicationData.location,
          workPreference: applicationData.workPreference,
          videoUrl: applicationData.videoUrl || currentCandidate.profile.videoIntroUrl,
          
          skills: applicationData.skills 
            ? applicationData.skills.split(',').map(s => s.trim()) 
            : currentCandidate.profile.skills,

          match: currentCandidate.profile.atsScore || Math.floor(Math.random() * 20) + 75,
          status: 'New', 
          stage: 'New', 
          summary: currentCandidate.profile.about || "Applied via Candidate Portal",
          dateApplied: new Date().toLocaleDateString(),
          resumeUrl: applicationData.resumeUrl || "https://example.com/mock-resume.pdf",
          comments: [] 
        };

        const newJobs = jobs.map(job => 
          job.id === jobId 
            ? { ...job, candidateCount: (job.candidateCount || 0) + 1 } 
            : job
        );

        return {
          candidates: [newApplication, ...state.candidates],
          jobs: newJobs,
          currentCandidate: {
            ...currentCandidate,
            appliedJobs: [...currentCandidate.appliedJobs, jobId]
          }
        };
      }),

      // --- SELECTORS ---
      getJobCandidates: (jobId) => {
        return get().candidates.filter(c => c.jobId === jobId);
      }
    }),
    { name: 'talentsense-recruitment' } // Persist key
  )
);