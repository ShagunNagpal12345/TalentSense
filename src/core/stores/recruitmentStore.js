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
    status: 'Closed',
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
    comments: [],
    noticePeriod: '30 days',
    currentCTC: '£75,000',
    expectedCTC: '£95,000',
    sentToClient: true,
    totalExp: '7 Years',
    education: 'B.Tech CS, University of London',
    currentOrg: 'DataViz Ltd',
    aiAnalysis: {
      basicInfo: { totalYearsExp: '7', education: 'B.Tech CS', currentRole: 'Senior BI Analyst', skills: ['Power BI', 'SQL', 'Python', 'DAX', 'Azure'] },
      noticePeriod: '30 days',
      matchScore: 94,
      matchExplanation: 'Strong alignment with all core BI requirements. Leadership experience noted.',
      aiDecision: 'Strong match - recommend shortlisting',
      educationAnalysis: 'B.Tech in Computer Science is relevant and meets the qualification bar.',
      experienceAnalysis: '7+ years of BI work with Power BI and SQL. Has led analytics teams.'
    }
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
    comments: [],
    noticePeriod: '60 days',
    currentCTC: '£65,000',
    expectedCTC: '£82,000',
    sentToClient: false,
    totalExp: '5 Years',
    education: 'BSc Economics, Manchester University',
    currentOrg: 'Barclays Bank'
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
    comments: [],
    noticePeriod: 'Immediate',
    currentCTC: '£70,000',
    expectedCTC: '£90,000',
    sentToClient: false,
    totalExp: '6 Years',
    education: 'MSc Data Science, UCL',
    currentOrg: 'Deloitte UK'
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
    comments: [],
    noticePeriod: '30 days',
    currentCTC: '₹ 2200000',
    expectedCTC: '₹ 3000000',
    sentToClient: true,
    totalExp: '6 Years',
    education: 'B.Tech CS, IIT Bombay',
    currentOrg: 'Stripe India',
    interviewScheduled: {
      date: 'Monday, 24 March 2026',
      time: '10:00 AM',
      type: 'video',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    }
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
    comments: [],
    noticePeriod: '10-20 Days',
    currentCTC: '$ 95000',
    expectedCTC: '$ 125000',
    sentToClient: false,
    totalExp: '4 Years',
    education: 'BS Computer Science, Stanford',
    currentOrg: 'Vercel'
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
    comments: [],
    noticePeriod: '60+ Days',
    currentCTC: '$ 180000',
    expectedCTC: '$ 220000',
    sentToClient: true,
    totalExp: '10 Years',
    education: 'PhD Machine Learning, MIT',
    currentOrg: 'Palantir',
    aiAnalysis: {
      basicInfo: { totalYearsExp: '10', education: 'PhD ML, MIT', currentRole: 'Principal Data Scientist', skills: ['Python', 'TensorFlow', 'PyTorch', 'Spark'] },
      noticePeriod: '60+ Days',
      matchScore: 92,
      matchExplanation: 'Exceptional ML credentials. PhD background exceeds requirements. Fintech experience highly relevant.',
      aiDecision: 'Exceptional match - priority candidate',
      educationAnalysis: 'PhD from MIT is outstanding for this Lead role.',
      experienceAnalysis: '10 years of ML research and commercial ML deployment. Led teams at fintech unicorns.'
    }
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
      addJob: (jobDetails) => {
        const newJob = {
          id: Date.now().toString(),
          ...jobDetails,
          status: "Active",
          datePosted: new Date().toLocaleDateString(),
          candidateCount: 0
        };

        set((state) => ({ jobs: [newJob, ...state.jobs] }));

        // Notify notification store
        try {
          const { useNotificationStore } = require('./notificationStore');
          useNotificationStore.getState().addNotification({
            type: 'position_created',
            message: `New position posted: ${newJob.title} at ${newJob.client || 'a client'}`,
            portal: 'recruiter'
          });
        } catch (e) {}
      },

      deleteJob: (jobId) => set((state) => ({
        jobs: state.jobs.filter(j => j.id !== jobId),
        candidates: state.candidates.filter(c => c.jobId !== jobId)
      })),

      closeJob: (jobId) => set((state) => ({
        jobs: state.jobs.map(j => j.id === jobId ? { ...j, status: 'Closed' } : j)
      })),

      reopenJob: (jobId) => set((state) => ({
        jobs: state.jobs.map(j => j.id === jobId ? { ...j, status: 'Active' } : j)
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

        // Notify
        try {
          const { useNotificationStore } = require('./notificationStore');
          useNotificationStore.getState().addNotification({
            type: 'candidate_applied',
            message: `${candidate.name || 'New candidate'} added to pipeline`,
            portal: 'recruiter'
          });
        } catch (e) {}

        return { candidates: newCandidates, jobs: newJobs };
      }),

      updateCandidate: (id, updates) => set((state) => ({
        candidates: state.candidates.map(c => c.id === id ? { ...c, ...updates } : c)
      })),

      // Sync Recruiter moves with the Candidate Kanban Board
      moveCandidate: (candidateId, newStage) => {
        const { candidates } = get();
        const candidate = candidates.find(c => c.id === candidateId);

        if (candidate && candidate.jobId) {
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

          useApplicationStore.getState().updateStatusByJobId(candidate.jobId, mappedStatus);

          // Notify recruiter about stage change
          try {
            const { useNotificationStore } = require('./notificationStore');
            useNotificationStore.getState().addNotification({
              type: 'stage_change',
              message: `${candidate.name} moved to ${newStage}`,
              portal: 'recruiter'
            });

            // Also notify client if candidate is being submitted for Client Review
            if (newStage.toLowerCase().includes('client') || newStage === 'Client Review') {
              useNotificationStore.getState().addNotification({
                type: 'stage_change',
                message: `${candidate.name} was submitted for Client Review on ${candidate.role || 'a role'}`,
                portal: 'client'
              });
            }
          } catch (e) {}
        }

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

        // Notify
        try {
          const { useNotificationStore } = require('./notificationStore');
          useNotificationStore.getState().addNotification({
            type: 'candidate_applied',
            message: `${newApplication.name} applied for ${targetJob?.title || 'a position'}`,
            portal: 'recruiter'
          });
        } catch (e) {}

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
    { name: 'talentsense-recruitment' }
  )
);
