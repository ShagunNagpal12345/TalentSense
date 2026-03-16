import { create } from 'zustand';

export const useRecruitmentStore = create((set, get) => ({
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
      id: Date.now(),
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

  // 👇 Also added updateCandidate so we can save the AI Analysis results
  updateCandidate: (id, updates) => set((state) => ({
    candidates: state.candidates.map(c => c.id === id ? { ...c, ...updates } : c)
  })),

  moveCandidate: (candidateId, newStage) => set((state) => ({
    candidates: state.candidates.map(c => 
      c.id === candidateId ? { ...c, status: newStage, stage: newStage } : c
    )
  })),

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
    // 👇 FIX: Pull 'jobs' from state so we can find the target job title
    const { currentCandidate, jobs } = state; 
    
    if (currentCandidate.appliedJobs.includes(jobId)) return state; 

    // 👇 Find the specific job they are applying for
    const targetJob = jobs.find(j => j.id === jobId);

    const newApplication = {
      id: `app-${Date.now()}`,
      jobId: jobId,
      
      // Captures name, EMAIL, phone, and skills from the form
      name: applicationData.name || currentCandidate.name,
      email: applicationData.email || currentCandidate.email,
      phone: applicationData.phone || "",
      
      // 👇 FIX 1: Set role to the actual Job Title instead of the default mock profile
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
}));