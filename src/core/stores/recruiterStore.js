import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Detailed candidate profiles keyed by candidate ID
// These enrich the basic data in recruitmentStore with psychometric, ATS, and video data
export const DETAILED_PROFILES = {
  'mock-cand-1': {
    id: 'mock-cand-1',
    name: 'Priya Sharma',
    headline: '7+ yrs in Business Intelligence | Power BI Expert | Azure Data Engineer Certified',
    email: 'priya.sharma@example.com',
    phone: '+44 7700 900123',
    location: 'London, UK',
    avatarInitials: 'PS',
    avatarColor: 'from-violet-500 to-purple-600',
    atsScore: 92,
    matchScore: 94,
    skills: ['Power BI', 'SQL', 'Python', 'DAX', 'Azure', 'Tableau', 'SSAS', 'ETL'],
    psychometric: {
      leadership: 88,
      adaptability: 91,
      teamwork: 85,
      problemSolving: 90,
      communication: 87,
      emotionalIntelligence: 82
    },
    experience: [
      { company: 'DataTech Solutions', role: 'BI Lead Analyst', years: '2021 – Present', desc: 'Led a team of 4 analysts delivering exec-level dashboards for FTSE 100 clients.' },
      { company: 'Barclays Analytics', role: 'Senior BI Developer', years: '2018 – 2021', desc: 'Built enterprise Power BI platform serving 2,000+ daily users.' },
      { company: 'Accenture', role: 'BI Consultant', years: '2016 – 2018', desc: 'Delivered data migration and reporting for financial services clients.' }
    ],
    education: [
      { degree: 'MSc Business Analytics', school: 'University College London', year: '2016' },
      { degree: 'BEng Computer Science', school: 'University of Manchester', year: '2014' }
    ],
    certifications: ['Microsoft Azure Data Engineer Associate', 'Power BI Data Analyst', 'Tableau Desktop Specialist'],
    about: 'Results-driven BI professional with a passion for turning complex datasets into clear, actionable insights. Proven track record of delivering scalable analytics platforms in fast-paced, high-stakes environments.'
  },
  'mock-cand-2': {
    id: 'mock-cand-2',
    name: 'James Okafor',
    headline: 'BI Developer | Power BI & SQL Expert | Banking & Finance Specialist',
    email: 'james.okafor@example.com',
    phone: '+44 7700 900456',
    location: 'Manchester, UK',
    avatarInitials: 'JO',
    avatarColor: 'from-sky-500 to-blue-600',
    atsScore: 84,
    matchScore: 87,
    skills: ['Power BI', 'SQL', 'SSRS', 'Azure', 'DAX', 'Excel', 'Python'],
    psychometric: {
      leadership: 75,
      adaptability: 83,
      teamwork: 91,
      problemSolving: 86,
      communication: 80,
      emotionalIntelligence: 88
    },
    experience: [
      { company: 'HSBC', role: 'BI Developer', years: '2020 – Present', desc: 'Developed risk reporting dashboards used by senior management globally.' },
      { company: 'Lloyds Banking Group', role: 'Data Analyst', years: '2017 – 2020', desc: 'Automated weekly financial reports, saving 15 hours per month.' }
    ],
    education: [
      { degree: 'BSc Mathematics & Statistics', school: 'University of Leeds', year: '2017' }
    ],
    certifications: ['Power BI Data Analyst', 'Azure Fundamentals'],
    about: 'Dedicated BI developer with strong banking domain knowledge and a passion for data quality and governance.'
  },
  'mock-cand-4': {
    id: 'mock-cand-4',
    name: 'Arjun Patel',
    headline: 'Senior Frontend Engineer | React & TypeScript | Building scalable web platforms',
    email: 'arjun.patel@example.com',
    phone: '+1 555 0101',
    location: 'Remote (India)',
    avatarInitials: 'AP',
    avatarColor: 'from-emerald-500 to-teal-600',
    atsScore: 96,
    matchScore: 96,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Redux', 'Jest', 'Docker'],
    psychometric: {
      leadership: 82,
      adaptability: 94,
      teamwork: 88,
      problemSolving: 95,
      communication: 85,
      emotionalIntelligence: 79
    },
    experience: [
      { company: 'Stripe', role: 'Senior Frontend Engineer', years: '2022 – Present', desc: 'Architected React component library used across 12 product teams.' },
      { company: 'Flipkart', role: 'Frontend Engineer', years: '2019 – 2022', desc: 'Built high-throughput e-commerce UI serving 50M+ daily users.' }
    ],
    education: [
      { degree: 'BTech Computer Engineering', school: 'IIT Bombay', year: '2019' }
    ],
    certifications: ['AWS Solutions Architect Associate', 'Meta React Developer'],
    about: 'Passionate frontend engineer who thrives at the intersection of design systems and performance engineering. Open-source contributor with 2k+ GitHub stars.'
  },
  'mock-cand-6': {
    id: 'mock-cand-6',
    name: 'Dr. Rahul Nair',
    headline: 'Principal Data Scientist | PhD ML | Fintech & NLP Expert',
    email: 'rahul.nair@example.com',
    phone: '+1 212 555 0303',
    location: 'New York, US',
    avatarInitials: 'RN',
    avatarColor: 'from-amber-500 to-orange-600',
    atsScore: 89,
    matchScore: 92,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Spark', 'Kubernetes', 'NLP', 'MLOps'],
    psychometric: {
      leadership: 86,
      adaptability: 88,
      teamwork: 80,
      problemSolving: 96,
      communication: 83,
      emotionalIntelligence: 77
    },
    experience: [
      { company: 'Brex', role: 'Principal Data Scientist', years: '2021 – Present', desc: 'Built fraud detection model saving $40M annually. Led team of 8 ML engineers.' },
      { company: 'Goldman Sachs', role: 'Quantitative Analyst', years: '2018 – 2021', desc: 'Developed NLP-based risk assessment models for credit decisioning.' }
    ],
    education: [
      { degree: 'PhD Machine Learning', school: 'Carnegie Mellon University', year: '2018' },
      { degree: 'BTech Computer Science', school: 'IIT Delhi', year: '2013' }
    ],
    certifications: ['Google Professional ML Engineer', 'Databricks ML Associate'],
    about: 'Research-driven data scientist with expertise in production ML systems at scale. Published 6 papers in top-tier ML conferences. Passionate about responsible AI.'
  }
};

export const useRecruiterStore = create(
  persist(
    (set, get) => ({
      // Detailed profiles map (enriches basic recruitmentStore data)
      detailedProfiles: DETAILED_PROFILES,

      // Video review decisions keyed by candidate ID
      videoReviews: {},

      // Save a video review decision
      saveVideoReview: (candidateId, decision, notes) => set((state) => ({
        videoReviews: {
          ...state.videoReviews,
          [candidateId]: {
            decision, // 'shortlist' | 'reject' | null
            notes,
            reviewedAt: new Date().toISOString()
          }
        }
      })),

      // Get detailed profile for a candidate (falls back gracefully)
      getDetailedProfile: (candidateId) => {
        return get().detailedProfiles[candidateId] || null;
      }
    }),
    { name: 'talentsense-recruiter' }
  )
);
