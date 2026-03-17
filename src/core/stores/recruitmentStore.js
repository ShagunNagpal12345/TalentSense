import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useApplicationStore } from './applicationStore';

const MOCK_JOBS = [
  {
    id: 'mock-job-1',
    title: 'Lead BI Partner',
    client: 'TechCorp Analytics',
    location: 'London, UK',
    datePosted: '3/10/2026',
    salary: '£85,000 - £110,000',
    urgency: 'High',
    stage: 'Interviewing',
    candidateCount: 3,
    status: 'Active',
    skills: { hard: ['Power BI', 'SQL', 'Python', 'Tableau', 'Azure'], soft: ['Leadership', 'Communication'] },
    fullText: 'We are seeking an experienced Lead BI Partner to join our analytics team...'
  },
  {
    id: 'mock-job-2',
    title: 'Senior React Developer',
    client: 'Innovate Solutions',
    location: 'Remote',
    datePosted: '3/05/2026',
    salary: '$120,000 - $150,000',
    urgency: 'Critical',
    stage: 'Sourcing',
    candidateCount: 2,
    status: 'Active',
    skills: { hard: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'], soft: ['Problem-Solving', 'Teamwork'] },
    fullText: 'Looking for a Senior React Developer to lead our frontend architecture...'
  },
  {
    id: 'mock-job-3',
    title: 'Data Science Lead',
    client: 'FinServ Global',
    location: 'New York, US',
    datePosted: '3/01/2026',
    salary: '$130,000 - $160,000',
    urgency: 'High',
    stage: 'Reviewing',
    candidateCount: 4,
    status: 'Active',
    skills: { hard: ['Python', 'ML', 'TensorFlow', 'SQL', 'Spark'], soft: ['Analytical', 'Leadership'] },
    fullText: 'We need an exceptional Data Science Lead to build our ML platform...'
  },
  {
    id: 'mock-job-4',
    title: 'DevOps Engineer',
    client: 'CloudBase Inc',
    location: 'Berlin, Germany',
    datePosted: '2/20/2026',
    salary: '€90,000 - €120,000',
    urgency: 'Medium',
    stage: 'Offered',
    candidateCount: 2,
    status: 'Active',
    skills: { hard: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'AWS'], soft: ['Attention to Detail'] },
    fullText: 'Seeking a DevOps Engineer to modernise our cloud infrastructure...'
  }
];

const MOCK_CANDIDATES = [
  // Lead BI Partner candidates
  {
    id: 'mock-cand-1',
    jobId: 'mock-job-1',
    name: 'Priya Sharma',
    role: 'Senior BI Analyst',
    email: 'priya.sharma@example.com',
    phone: '+44 7700 900123',
    location: 'London, UK',
    skills: ['Power BI', 'SQL', 'Python', 'DAX', 'Azure', 'Tableau'],
    match: 94,
    status: 'Reviewing',
    stage: 'Reviewing',
    summary: 'Highly experienced BI professional with 7+ years transforming raw data into strategic insights.',
    dateApplied: '3/11/2026',
    resumeUrl: '#',
    comments: []
  },
  {
    id: 'mock-cand-2',
    jobId: 'mock-job-1',
    name: 'James Okafor',
    role: 'BI Developer & Analyst',
    email: 'james.okafor@example.com',
    phone: '+44 7700 900456',
    location: 'Manchester, UK',
    skills: ['Power BI', 'SQL', 'SSRS', 'Azure', 'DAX'],
    match: 87,
    status: 'New',
    stage: 'New',
    summary: 'Passionate data storyteller with strong Power BI portfolio and banking sector expertise.',
    dateApplied: '3/12/2026',
    resumeUrl: '#',
    comments: []
  },
  {
    id: 'mock-cand-3',
    jobId: 'mock-job-1',
    name: 'Sofia Mendes',
    role: 'Analytics Manager',
    email: 'sofia.mendes@example.com',
    phone: '+44 7700 900789',
    location: 'London, UK',
    skills: ['Tableau', 'SQL', 'Python', 'Looker', 'dbt'],
    match: 79,
    status: 'New',
    stage: 'New',
    summary: 'Analytics Manager with a track record of building self-service BI platforms from scratch.',
    dateApplied: '3/13/2026',
    resumeUrl: '#',
    comments: []
  },
  // Senior React Developer candidates
  {
    id: 'mock-cand-4',
    jobId: 'mock-job-2',
    name: 'Arjun Patel',
    role: 'Senior Frontend Engineer',
    email: 'arjun.patel@example.com',
    phone: '+1 555 0101',
    location: 'Remote (India)',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Redux'],
    match: 96,
    status: 'Interviewing',
    stage: 'Interviewing',
    summary: '6 years building high-performance React applications for Fortune 500 companies.',
    dateApplied: '3/06/2026',
    resumeUrl: '#',
    comments: []
  },
  {
    id: 'mock-cand-5',
    jobId: 'mock-job-2',
    name: 'Laura Chen',
    role: 'Full Stack Developer',
    email: 'laura.chen@example.com',
    phone: '+1 555 0202',
    location: 'Remote (US)',
    skills: ['React', 'TypeScript', 'Next.js', 'PostgreSQL', 'Docker'],
    match: 88,
    status: 'Reviewing',
    stage: 'Reviewing',
    summary: 'Full-stack developer specialising in React and serverless architectures.',
    dateApplied: '3/07/2026',
    resumeUrl: '#',
    comments: []
  },
  // Data Science Lead candidates
  {
    id: 'mock-cand-6',
    jobId: 'mock-job-3',
    name: 'Dr. Rahul Nair',
    role: 'Principal Data Scientist',
    email: 'rahul.nair@example.com',
    phone: '+1 212 555 0303',
    location: 'New York, US',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Spark', 'Kubernetes'],
    match: 92,
    status: 'Reviewing',
    stage: 'Reviewing',
    summary: 'PhD in Machine Learning, led data science teams at two fintech unicorns.',
    dateApplied: '3/02/2026',
    resumeUrl: '#',
    comments: []
  }
];

export const useRecruitmentStore = create(
  persist(
    (set, get) => ({
      // --- DATABASE ---
      jobs: MOCK_JOBS,
      candidates: MOCK_CANDIDATES,

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