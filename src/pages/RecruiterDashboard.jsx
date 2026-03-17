// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Briefcase, Users, Search, Bell, Menu, Upload, 
//   FileText, CheckCircle, Clock, MoreHorizontal, 
//   TrendingUp, Filter, ChevronRight, UserPlus, ArrowLeft
// } from 'lucide-react';

// // 1. IMPORT THE STORE (Connects to Real Data)
// import { useRecruitmentStore } from '../core/stores/recruitmentStore';

// // IMPORT COMPONENTS
// import RecruiterKanban from '../components/recruiter/RecruiterKanban';
// import ResumeParser from '../components/recruiter/ResumeParser';
// import CandidateDatabase from '../components/recruiter/CandidateDatabase';

// const RecruiterDashboard = () => {
//   // --- STATE ---
//   const [view, setView] = useState('dashboard'); // 'dashboard' | 'kanban' | 'parser' | 'candidates'
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [activeTab, setActiveTab] = useState('active'); 
//   const [parserTargetJobId, setParserTargetJobId] = useState(null);

//   // --- DATA FROM STORE ---
//   const assignedJobs = useRecruitmentStore((state) => state.jobs);

//   // --- HANDLERS ---
//   const handleOpenPipeline = (job) => {
//     setSelectedJob(job);
//     setView('kanban');
//   };

//   const handleOpenParser = (jobId = null) => {
//     setParserTargetJobId(jobId);
//     setView('parser');
//   };

//   const handleBackToDashboard = () => {
//     setView('dashboard');
//     setSelectedJob(null);
//     setParserTargetJobId(null);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      
//       {/* =========================================================
//           HEADER
//       ========================================================= */}
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
//           {/* Logo Section */}
//           <div className="flex items-center gap-4">
//             <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition">
//               <ArrowLeft className="w-5 h-5 text-slate-500" />
//             </Link>
//             <div className="flex items-center gap-2">
//               <div className="bg-emerald-600 p-1.5 rounded-lg">
//                 <Briefcase className="w-4 h-4 text-white" />
//               </div>
//               <h1 className="text-lg font-bold text-slate-800">Recruiter<span className="text-emerald-600">Pro</span></h1>
//             </div>
//           </div>

//           {/* Search & Profile */}
//           <div className="flex items-center gap-6">
//             <div className="hidden md:flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
//               <Search className="w-4 h-4 text-slate-400" />
//               <input type="text" placeholder="Search jobs..." className="bg-transparent text-sm focus:outline-none w-48 text-slate-600 placeholder:text-slate-400" />
//             </div>
//             <button className="relative text-slate-500 hover:text-emerald-600 transition">
//               <Bell className="w-5 h-5" />
//               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
//             </button>
//             <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs">JD</div>
//           </div>
//         </div>
//       </header>

//       {/* =========================================================
//           MAIN LAYOUT
//       ========================================================= */}
//       <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        
//         {/* ---------------- VIEW: DASHBOARD ---------------- */}
//         {view === 'dashboard' && (
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
            
//             {/* --- LEFT SIDEBAR --- */}
//             <div className="lg:col-span-3 space-y-6">
              
//               {/* Stats Card */}
//               <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><TrendingUp className="w-5 h-5" /></div>
//                   <div><p className="text-xs font-bold text-slate-400 uppercase">This Month</p><h3 className="text-lg font-bold text-slate-800">12 Placements</h3></div>
//                 </div>
//                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[75%] rounded-full"></div></div>
//                 <p className="text-xs text-slate-500 mt-2 flex justify-between"><span>Goal: 16</span><span className="text-emerald-600 font-bold">75%</span></p>
//               </div>

//               {/* Navigation Menu */}
//               <nav className="space-y-1">
//                 <button 
//                   onClick={() => setView('dashboard')}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${view === 'dashboard' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
//                 >
//                   <Briefcase className="w-4 h-4" /> My Requisitions
//                 </button>
//                 <button 
//                   onClick={() => setView('candidates')}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition ${view === 'candidates' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
//                 >
//                   <Users className="w-4 h-4" /> Candidate Database
//                 </button>
//               </nav>

//               {/* Quick Parse Button */}
//               <div onClick={() => handleOpenParser()} className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center hover:border-indigo-400 transition cursor-pointer group">
//                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition"><Upload className="w-6 h-6 text-indigo-600" /></div>
//                 <h4 className="text-sm font-bold text-indigo-900">Quick Parse</h4>
//                 <p className="text-xs text-indigo-600/70 mt-1 mb-3">Drop resume PDF here.</p>
//                 <button className="text-[10px] bg-indigo-600 text-white px-3 py-1 rounded font-bold">Upload</button>
//               </div>
//             </div>

//             {/* --- RIGHT CONTENT: JOB LIST --- */}
//             <div className="lg:col-span-9 space-y-6">
              
//               {/* Header Row */}
//               <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
//                 <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">Assigned Requisitions <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">{assignedJobs.length}</span></h2>
//                 <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
//                   <button onClick={() => setActiveTab('active')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${activeTab === 'active' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Active</button>
//                   <button onClick={() => setActiveTab('closed')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${activeTab === 'closed' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Closed</button>
//                 </div>
//               </div>

//               {/* Job Grid */}
//               <div className="grid gap-4">
//                 {assignedJobs.map((job) => (
//                   <div key={job.id} onClick={() => handleOpenPipeline(job)} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition group cursor-pointer">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <div className="flex items-center gap-3 mb-1">
//                           <h3 className="font-bold text-lg text-slate-800 group-hover:text-emerald-700 transition">{job.title}</h3>
//                           <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${job.urgency === 'High' || job.urgency === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{job.urgency} Priority</span>
//                         </div>
//                         <div className="flex items-center gap-4 text-sm text-slate-500">
//                           <span className="flex items-center gap-1 font-medium text-slate-700"><Briefcase className="w-3.5 h-3.5" /> {job.client}</span>
//                           <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Posted {job.datePosted || "Recently"}</span>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="flex items-center justify-end -space-x-2 mb-2">
//                           {/* Dynamic Candidate Avatars (Mock) */}
//                           <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] text-slate-500 font-bold">
//                              {job.candidateCount || 0}
//                           </div>
//                         </div>
//                         <p className="text-xs text-slate-400 font-medium">Stage: <span className="text-slate-700 font-bold">{job.stage}</span></p>
//                       </div>
//                     </div>
//                     <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
//                       <div className="flex gap-4">
//                         <div className="flex flex-col"><span className="text-[10px] font-bold text-slate-400 uppercase">Candidates</span><span className="text-sm font-bold text-slate-700">{job.candidateCount || 0}</span></div>
//                       </div>
//                       <button className="text-sm font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1">Manage Pipeline <ChevronRight className="w-4 h-4" /></button>
//                     </div>
//                   </div>
//                 ))}
                
//                 {/* Empty State */}
//                 {assignedJobs.length === 0 && (
//                   <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
//                     <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3"/>
//                     <p className="text-slate-500 font-medium">No active requisitions found.</p>
//                     <p className="text-xs text-slate-400 mt-1">Wait for a Client to post a new position.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ---------------- VIEW: KANBAN BOARD ---------------- */}
//         {view === 'kanban' && selectedJob && (
//           <RecruiterKanban 
//             jobId={selectedJob.id} // Pass ID to Kanban
//             jobTitle={selectedJob.title} 
//             onBack={handleBackToDashboard} 
//             onAddCandidate={() => handleOpenParser(selectedJob.id)} // Pass ID to handler
//           />
//         )}

//         {/* ---------------- VIEW: RESUME PARSER ---------------- */}
//         {view === 'parser' && (
//           <ResumeParser 
//             onBack={handleBackToDashboard} 
//             preSelectedJobId={parserTargetJobId} // Pass pre-selected Job ID
//           />
//         )}

//         {/* ---------------- VIEW: CANDIDATE DATABASE ---------------- */}
//         {view === 'candidates' && (
//           <CandidateDatabase />
//         )}

//       </main>
//     </div>
//   );
// };

// export default RecruiterDashboard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Users, Search, Upload,
  TrendingUp, ChevronRight, ArrowLeft, Info,
  Sun, Moon, Wand2, Calendar, XCircle, RefreshCw,
  UserCheck, BarChart2, ClipboardCheck
} from 'lucide-react';

// IMPORT THE STORE
import { useRecruitmentStore } from '../core/stores/recruitmentStore';

// IMPORT COMPONENTS
import RecruiterKanban from '../components/recruiter/RecruiterKanban';
import ResumeParser from '../components/recruiter/ResumeParser';
import CandidateDatabase from '../components/recruiter/CandidateDatabase';
import RecruiterJobDetailModal from '../components/recruiter/RecruiterJobDetailModal';
import MatchmakingDashboard from '../components/recruiter/MatchmakingDashboard';
import TalentDossier from '../components/recruiter/TalentDossier';
import InterviewScheduler from '../components/shared/InterviewScheduler';
import NotificationBell from '../components/shared/NotificationBell';

const RecruiterDashboard = () => {
  // --- STATE ---
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'kanban' | 'parser' | 'candidates' | 'matchmaker' | 'dossier' | 'scheduler'
  const [selectedJob, setSelectedJob] = useState(null);
  const [dossierCandidate, setDossierCandidate] = useState(null);
  const [schedulerCandidate, setSchedulerCandidate] = useState(null);

  // Modal States
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [activeTab, setActiveTab] = useState('active');
  const [parserTargetJobId, setParserTargetJobId] = useState(null);

  // Theme State
  const [isDark, setIsDark] = useState(false);

  // DATA
  const allJobs = useRecruitmentStore((state) => state.jobs);
  const candidates = useRecruitmentStore((state) => state.candidates);
  const closeJob = useRecruitmentStore((state) => state.closeJob);
  const reopenJob = useRecruitmentStore((state) => state.reopenJob);

  // Feature 8: Filter jobs by active tab
  const assignedJobs = allJobs.filter(j =>
    activeTab === 'active' ? (j.status !== 'Closed') : (j.status === 'Closed')
  );

  // Feature 15: Analytics metrics
  const openRequisitions = allJobs.filter(j => j.status !== 'Closed').length;
  const totalCandidates = candidates.length;
  const scheduledInterviews = candidates.filter(c => c.interviewScheduled).length;
  const placements = candidates.filter(c => c.status === 'Offer' || c.status === 'Placed').length;

  // --- THEME EFFECT ---
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // --- HANDLERS ---
  const handleOpenPipeline = (job) => {
    setSelectedJob(job);
    setView('kanban');
  };

  const handleOpenParser = (jobId = null) => {
    setParserTargetJobId(jobId);
    setView('parser');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    setSelectedJob(null);
    setParserTargetJobId(null);
  };

  const handleViewJobDetails = (e, job) => {
    e.stopPropagation(); 
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  // Helper for Sidebar Buttons to handle active state styling
  const getNavClass = (targetView) => {
    return `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
      view === targetView 
        ? 'bg-slate-900 dark:bg-emerald-500 text-white shadow-lg' 
        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
    }`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-200 transition-colors duration-300 relative flex flex-col">
      
      {/* 2-TONE BACKGROUND EFFECTS (Recruiter Theme: Emerald & Teal) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-900/30 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-500" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-400/20 dark:bg-teal-900/30 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-500" />
      </div>

      {/* HEADER */}
      <header className="relative z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 px-6 py-4 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-500 dark:text-slate-400">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20">
                TS
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TalentSense</div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  Recruiter Portal
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            
            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search jobs..." className="bg-transparent text-sm focus:outline-none w-48 text-slate-600 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500" />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4 sm:pl-6">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <NotificationBell portal="recruiter" />

              {/* Profile Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm shadow-sm cursor-pointer hover:shadow-md transition">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
          {/* LEFT SIDEBAR (Always visible to allow easy navigation) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><TrendingUp className="w-5 h-5" /></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">This Month</p><h3 className="text-lg font-extrabold text-slate-800 dark:text-white">12 Placements</h3></div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[75%] rounded-full"></div></div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex justify-between font-medium"><span>Goal: 16</span><span className="text-emerald-600 dark:text-emerald-400 font-bold">75%</span></p>
            </div>

            <nav className="space-y-2">
              <button onClick={() => setView('dashboard')} className={getNavClass('dashboard')}>
                <Briefcase className="w-4 h-4" /> My Requisitions
              </button>
              
              {/* 👇 NEW MATCHMAKER BUTTON */}
              <button onClick={() => setView('matchmaker')} className={getNavClass('matchmaker')}>
                <Wand2 className="w-4 h-4" /> AI Matchmaker
              </button>

              <button onClick={() => setView('candidates')} className={getNavClass('candidates')}>
                <Users className="w-4 h-4" /> Candidate Database
              </button>
              <button onClick={() => { setSchedulerCandidate(null); setView('scheduler'); }} className={getNavClass('scheduler')}>
                <Calendar className="w-4 h-4" /> Interview Scheduler
              </button>
            </nav>

            <div onClick={() => handleOpenParser()} className="bg-emerald-50 dark:bg-emerald-900/10 border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-6 text-center hover:border-emerald-400 dark:hover:border-emerald-500/50 transition cursor-pointer group">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform"><Upload className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /></div>
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">Quick Parse</h4>
              <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1 mb-3 font-medium">Drop resume PDF here.</p>
              <button className="text-[10px] uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg font-bold transition-colors">Upload</button>
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="lg:col-span-9">

            {/* VIEW: DASHBOARD (Job List) */}
            {view === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in duration-300">

                {/* Feature 15: Analytics Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Candidates", value: totalCandidates, icon: Users, color: "text-[#0A66C2]", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Open Requisitions", value: openRequisitions, icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Interviews Scheduled", value: scheduledInterviews, icon: Calendar, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
                    { label: "Placements", value: placements, icon: UserCheck, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
                  ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div>
                        <div className={`text-2xl font-black ${color}`}>{value}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h2 className="text-lg font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                    Assigned Requisitions
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-full text-xs">{assignedJobs.length}</span>
                  </h2>
                  <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button onClick={() => setActiveTab('active')} className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'active' ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                      Active <span className="ml-1 text-[10px]">({allJobs.filter(j => j.status !== 'Closed').length})</span>
                    </button>
                    <button onClick={() => setActiveTab('closed')} className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'closed' ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                      Closed <span className="ml-1 text-[10px]">({allJobs.filter(j => j.status === 'Closed').length})</span>
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {assignedJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => activeTab === 'active' && handleOpenPipeline(job)}
                      className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm transition-all group relative ${
                        activeTab === 'active'
                          ? 'border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 cursor-pointer'
                          : 'border-slate-200 dark:border-slate-800 opacity-80'
                      }`}
                    >
                      {/* Action buttons top right */}
                      <div className="absolute top-5 right-5 flex items-center gap-2 z-10" onClick={e => e.stopPropagation()}>
                        {activeTab === 'active' ? (
                          <>
                            <button
                              onClick={(e) => handleViewJobDetails(e, job)}
                              className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-colors"
                              title="View JD & Strategy"
                            >
                              <Info className="w-4 h-4"/>
                            </button>
                            <button
                              onClick={() => { if(window.confirm(`Close "${job.title}"? This will archive it.`)) closeJob(job.id); }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-xl text-xs font-bold hover:bg-red-100 transition"
                              title="Mark as Closed"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Close
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => reopenJob(job.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 rounded-xl text-xs font-bold hover:bg-emerald-100 transition"
                            title="Reopen Position"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> Reopen
                          </button>
                        )}
                      </div>

                      <div className="flex justify-between items-start pr-28">
                        <div>
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{job.title}</h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${
                              activeTab === 'closed'
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                : job.urgency === 'High' || job.urgency === 'Critical'
                                ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50'
                                : 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800/50'
                            }`}>
                              {activeTab === 'closed' ? 'Closed' : `${job.urgency || "High"} Priority`}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-emerald-500" /> {job.client}</span>
                            <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-xs">{job.location || "Remote"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <div className="flex gap-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Candidates</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{job.candidateCount || 0}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status</span>
                            <span className={`text-sm font-bold ${activeTab === 'closed' ? 'text-slate-500 dark:text-slate-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                              {activeTab === 'closed' ? 'Closed' : (job.stage || "Active")}
                            </span>
                          </div>
                        </div>
                        {activeTab === 'active' && (
                          <button className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
                            Manage Pipeline <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {assignedJobs.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
                      <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3"/>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        {activeTab === 'active' ? 'No active requisitions found.' : 'No closed requisitions.'}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        {activeTab === 'active' ? 'Wait for a Client to post a new position.' : 'Closed jobs will appear here.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW: AI MATCHMAKER */}
            {view === 'matchmaker' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <MatchmakingDashboard onViewDossier={(candidate) => {
                  setDossierCandidate(candidate);
                  setView('dossier');
                }} />
              </div>
            )}

            {/* VIEW: TALENT DOSSIER */}
            {view === 'dossier' && dossierCandidate && (
              <div className="animate-in fade-in slide-in-from-right duration-500">
                <TalentDossier
                  candidate={dossierCandidate}
                  onBack={() => setView('matchmaker')}
                  onScheduleInterview={(candidate) => {
                    setSchedulerCandidate(candidate);
                    setView('scheduler');
                  }}
                />
              </div>
            )}

            {/* VIEW: INTERVIEW SCHEDULER */}
            {view === 'scheduler' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <InterviewScheduler
                  candidate={schedulerCandidate}
                  onBack={() => setView(dossierCandidate ? 'dossier' : 'matchmaker')}
                  onConfirm={() => setView(dossierCandidate ? 'dossier' : 'matchmaker')}
                />
              </div>
            )}

            {/* VIEW: KANBAN BOARD */}
            {view === 'kanban' && selectedJob && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                <RecruiterKanban 
                  jobId={selectedJob.id} 
                  jobTitle={selectedJob.title} 
                  onBack={handleBackToDashboard} 
                  onAddCandidate={() => handleOpenParser(selectedJob.id)} 
                  onCandidateClick={handleCandidateClick}
                />
              </div>
            )}

            {/* VIEW: RESUME PARSER */}
            {view === 'parser' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ResumeParser onBack={handleBackToDashboard} preSelectedJobId={parserTargetJobId} />
              </div>
            )}

            {/* VIEW: CANDIDATE DATABASE */}
            {view === 'candidates' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CandidateDatabase />
              </div>
            )}
          </div>
        </div>

        {/* --- MODALS --- */}
        
        {/* 1. JOB DETAILS MODAL */}
        {showJobDetails && selectedJob && (
          <RecruiterJobDetailModal job={selectedJob} onClose={() => { setShowJobDetails(false); setSelectedJob(null); }} />
        )}

        {/* 2. CANDIDATE EMAIL/PITCH MODAL */}
        {selectedCandidate && selectedJob && (
          <CandidateDatabase 
            candidate={selectedCandidate} 
            job={selectedJob} 
            onClose={() => setSelectedCandidate(null)} 
          />
        )}

      </main>
    </div>
  );
};

export default RecruiterDashboard;