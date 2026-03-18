// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { ArrowLeft, Bot, LayoutGrid, ChevronRight, Bell } from 'lucide-react';

// // // IMPORT THE STORE
// // import { useRecruitmentStore } from '../core/stores/recruitmentStore';

// // // IMPORT SUB-COMPONENTS
// // import JDUpload from '../components/client/JDUpload';
// // import JDAnalysis from '../components/client/JDAnalysis';
// // import DashboardOverview from '../components/client/DashboardOverview';
// // import JobDetailView from '../components/client/JobDetailView';

// // const ClientDashboard = () => {
// //   const [view, setView] = useState('dashboard'); 
// //   const [createStep, setCreateStep] = useState('upload'); 
// //   const [uploadedJdText, setUploadedJdText] = useState('');
// //   const [selectedJob, setSelectedJob] = useState(null);
  
// //   const jobs = useRecruitmentStore((state) => state.jobs);
// //   const addJob = useRecruitmentStore((state) => state.addJob);
// //   const deleteJob = useRecruitmentStore((state) => state.deleteJob);

// //   const [showNotifs, setShowNotifs] = useState(false);
// //   const [notifications, setNotifications] = useState([
// //     { id: 1, text: "Recruiter added a note on Rahul Sharma", time: "2 mins ago", read: false },
// //     { id: 2, text: "New Candidate 'Vikram' added to DevOps role", time: "1 hour ago", read: false },
// //   ]);
// //   const unreadCount = notifications.filter(n => !n.read).length;

// //   const handleStartCreate = () => {
// //     setView('create');
// //     setCreateStep('upload');
// //     setUploadedJdText('');
// //   };

// //   const handleJobClick = (job) => {
// //     setSelectedJob(job);
// //     setView('details');
// //   };

// //   const handleAnalyze = (text) => {
// //     setUploadedJdText(text);
// //     setCreateStep('analysis');
// //   };

// //   // --- UPDATED: SAVE ALL AI ANALYSIS DATA ---
// //   const handleFinalize = (finalDetails) => {
// //     addJob({
// //       // 1. Basic Info
// //       title: finalDetails?.jobTitle || "Untitled Position", 
// //       client: "My Company Inc", 
// //       location: finalDetails?.location || "Remote",
// //       urgency: "High",
// //       stage: "Sourcing",
// //       datePosted: new Date().toLocaleDateString(),
      
// //       // 2. Formatted Salary (₹)
// //       salary: finalDetails.minSalary && finalDetails.maxSalary 
// //         ? `₹${finalDetails.minSalary} - ₹${finalDetails.maxSalary} ${finalDetails.currency || 'LPA'}`
// //         : "Not disclosed",
        
// //       fullText: finalDetails.fullText,
      
// //       // 3. RICH AI ANALYSIS DATA
// //       aiScore: finalDetails.aiScore || 0,
      
// //       marketData: finalDetails.marketData, // { timeToFill, difficulty, industrySalary }
      
// //       skills: finalDetails.skills, // { hard, soft }
      
// //       gaps: finalDetails.gaps, // Critical gaps found
      
// //       improvements: finalDetails.improvements, // Suggestions
      
// //       tests: finalDetails.selectedTests, // Array of Test IDs
      
// //       logistics: {
// //         shift: finalDetails.shiftTiming,
// //         workMode: finalDetails.workMode,
// //         noticePeriod: finalDetails.noticePeriod,
// //         qualification: finalDetails.qualification,
// //         expRange: `${finalDetails.minExp} - ${finalDetails.maxExp} Yrs`
// //       }
// //     });

// //     alert("Position Created & Sent to Recruiter!");
// //     setView('dashboard'); 
// //   };

// //   const handleDeleteJob = (jobId) => {
// //     if (window.confirm("Delete this position?")) {
// //       deleteJob(jobId);
// //       if (selectedJob && selectedJob.id === jobId) {
// //         setView('dashboard');
// //         setSelectedJob(null);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
// //       {/* HEADER */}
// //       <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
// //         <div className="max-w-7xl mx-auto flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition">
// //               <ArrowLeft className="w-5 h-5 text-slate-500" />
// //             </Link>
// //             <h1 className="text-xl font-bold flex items-center gap-2">
// //               <div className="bg-blue-600 p-1.5 rounded-lg">
// //                 <Bot className="w-5 h-5 text-white" />
// //               </div>
// //               Client Workspace
// //             </h1>
// //           </div>
          
// //           <div className="flex items-center gap-6">
// //             <div className="hidden md:flex items-center gap-2 text-sm">
// //               {view === 'dashboard' && <span className="font-bold text-slate-700 flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Overview</span>}
// //               {view === 'create' && <><button onClick={() => setView('dashboard')} className="text-slate-500 hover:text-indigo-600">Overview</button><ChevronRight className="w-4 h-4 text-slate-300" /><span className="font-bold text-slate-700">Create Position</span></>}
// //               {view === 'details' && selectedJob && <><button onClick={() => setView('dashboard')} className="text-slate-500 hover:text-indigo-600">Overview</button><ChevronRight className="w-4 h-4 text-slate-300" /><span className="font-bold text-slate-700 truncate max-w-[200px]">{selectedJob.title}</span></>}
// //             </div>

// //             <div className="relative">
// //               <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 rounded-full hover:bg-slate-100 transition text-slate-500">
// //                 <Bell className="w-5 h-5" />
// //                 {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
// //               </button>
// //               {showNotifs && (
// //                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
// //                    <div className="bg-slate-50 px-4 py-3 border-b text-xs font-bold text-slate-500 uppercase">Notifications</div>
// //                    <div className="max-h-64 overflow-y-auto">{notifications.map(n => <div key={n.id} className="px-4 py-3 border-b text-sm hover:bg-slate-50">{n.text}</div>)}</div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* MAIN CONTENT */}
// //       <main className="max-w-7xl mx-auto px-6 py-10">
// //         {view === 'dashboard' && <DashboardOverview jobs={jobs} onCreateNew={handleStartCreate} onJobClick={handleJobClick} onDeleteJob={handleDeleteJob} />}
// //         {view === 'create' && (
// //           <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
// //             {createStep === 'upload' && <JDUpload onAnalyze={handleAnalyze} />}
// //             {createStep === 'analysis' && <JDAnalysis initialText={uploadedJdText} onBack={() => setCreateStep('upload')} onFinalize={handleFinalize} />}
// //           </div>
// //         )}
// //         {view === 'details' && selectedJob && <JobDetailView job={selectedJob} onBack={() => setView('dashboard')} onDelete={() => handleDeleteJob(selectedJob.id)} />}
// //       </main>
// //     </div>
// //   );
// // };

// // export default ClientDashboard;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft, Bot, LayoutGrid, ChevronRight, Bell } from 'lucide-react';

// // IMPORT THE STORE
// import { useRecruitmentStore } from '../core/stores/recruitmentStore';

// // IMPORT SUB-COMPONENTS
// import JDUpload from '../components/client/JDUpload';
// import JDAnalysis from '../components/client/JDAnalysis';
// import DashboardOverview from '../components/client/DashboardOverview';
// import JobDetailView from '../components/client/JobDetailView';

// const ClientDashboard = () => {
//   const [view, setView] = useState('dashboard'); 
//   const [createStep, setCreateStep] = useState('upload'); 
//   const [uploadedJdText, setUploadedJdText] = useState('');
//   const [selectedJob, setSelectedJob] = useState(null);
  
//   const jobs = useRecruitmentStore((state) => state.jobs);
//   const addJob = useRecruitmentStore((state) => state.addJob);
//   const deleteJob = useRecruitmentStore((state) => state.deleteJob);

//   const [showNotifs, setShowNotifs] = useState(false);
//   const [notifications, setNotifications] = useState([
//     { id: 1, text: "Recruiter added a note on Rahul Sharma", time: "2 mins ago", read: false },
//     { id: 2, text: "New Candidate 'Vikram' added to DevOps role", time: "1 hour ago", read: false },
//   ]);
//   const unreadCount = notifications.filter(n => !n.read).length;

//   const handleStartCreate = () => {
//     setView('create');
//     setCreateStep('upload');
//     setUploadedJdText('');
//   };

//   const handleJobClick = (job) => {
//     setSelectedJob(job);
//     setView('details');
//   };

//   const handleAnalyze = (text) => {
//     setUploadedJdText(text);
//     setCreateStep('analysis');
//   };

//   // --- UPDATED: CAPTURE ALL DATA POINTS (FIXED) ---
//   const handleFinalize = (finalDetails) => {
//     const newJob = {
//       id: Date.now(), // Generate ID
      
//       // 1. Basic Info
//       title: finalDetails?.jobTitle || "Untitled Position", 
//       client: "My Company Inc", 
//       location: finalDetails?.location || "Remote",
//       department: finalDetails?.department || "General", // Captured from Inputs
//       urgency: "High",
//       stage: "Sourcing",
//       datePosted: new Date().toLocaleDateString(),
      
//       // 2. Formatted Salary (₹)
//       salary: finalDetails.minSalary && finalDetails.maxSalary 
//         ? `₹${finalDetails.minSalary} - ₹${finalDetails.maxSalary} ${finalDetails.currency || 'LPA'}`
//         : "Not disclosed",
        
//       fullText: finalDetails.fullText,
      
//       // 3. RICH AI ANALYSIS DATA (PASSED TO DETAIL VIEW)
//       aiScore: finalDetails.aiScore || 0,
      
//       marketData: finalDetails.marketData, // { timeToFill, difficulty, industrySalary }
      
//       skills: finalDetails.skills, // { hard, soft, tools }
      
//       // Sourcing & Interview (NEW - CRITICAL FOR RECRUITER)
//       sourcingStrategy: finalDetails.sourcingStrategy, 
//       interviewQuestions: finalDetails.interviewQuestions,
      
//       tests: finalDetails.selectedTests, 
      
//       // 4. Logistics Object (Matches JobDetailView)
//       logistics: {
//         shift: finalDetails.shiftTiming,
//         workMode: finalDetails.workMode,
//         employmentType: finalDetails.employmentType, // Added
//         noticePeriod: finalDetails.noticePeriod,
//         qualification: finalDetails.qualification,
//         expRange: `${finalDetails.minExp} - ${finalDetails.maxExp} Yrs`
//       }
//     };

//     addJob(newJob);
//     console.log("Job Created:", newJob); // Verify data in console
//     alert("Position Created & Sent to Recruiter!");
//     setView('dashboard'); 
//   };

//   const handleDeleteJob = (jobId) => {
//     if (window.confirm("Delete this position?")) {
//       deleteJob(jobId);
//       if (selectedJob && selectedJob.id === jobId) {
//         setView('dashboard');
//         setSelectedJob(null);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
//       {/* HEADER */}
//       <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition">
//               <ArrowLeft className="w-5 h-5 text-slate-500" />
//             </Link>
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <div className="bg-blue-600 p-1.5 rounded-lg">
//                 <Bot className="w-5 h-5 text-white" />
//               </div>
//               Client Workspace
//             </h1>
//           </div>
          
//           <div className="flex items-center gap-6">
//             <div className="hidden md:flex items-center gap-2 text-sm">
//               {view === 'dashboard' && <span className="font-bold text-slate-700 flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Overview</span>}
//               {view === 'create' && <><button onClick={() => setView('dashboard')} className="text-slate-500 hover:text-indigo-600">Overview</button><ChevronRight className="w-4 h-4 text-slate-300" /><span className="font-bold text-slate-700">Create Position</span></>}
//               {view === 'details' && selectedJob && <><button onClick={() => setView('dashboard')} className="text-slate-500 hover:text-indigo-600">Overview</button><ChevronRight className="w-4 h-4 text-slate-300" /><span className="font-bold text-slate-700 truncate max-w-[200px]">{selectedJob.title}</span></>}
//             </div>

//             <div className="relative">
//               <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 rounded-full hover:bg-slate-100 transition text-slate-500">
//                 <Bell className="w-5 h-5" />
//                 {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
//               </button>
//               {showNotifs && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
//                    <div className="bg-slate-50 px-4 py-3 border-b text-xs font-bold text-slate-500 uppercase">Notifications</div>
//                    <div className="max-h-64 overflow-y-auto">{notifications.map(n => <div key={n.id} className="px-4 py-3 border-b text-sm hover:bg-slate-50">{n.text}</div>)}</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <main className="max-w-7xl mx-auto px-6 py-10">
//         {view === 'dashboard' && <DashboardOverview jobs={jobs} onCreateNew={handleStartCreate} onJobClick={handleJobClick} onDeleteJob={handleDeleteJob} />}
//         {view === 'create' && (
//           <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
//             {createStep === 'upload' && <JDUpload onAnalyze={handleAnalyze} />}
//             {createStep === 'analysis' && <JDAnalysis initialText={uploadedJdText} onBack={() => setCreateStep('upload')} onFinalize={handleFinalize} />}
//           </div>
//         )}
//         {view === 'details' && selectedJob && <JobDetailView job={selectedJob} onBack={() => setView('dashboard')} onDelete={() => handleDeleteJob(selectedJob.id)} />}
//       </main>
//     </div>
//   );
// };

// export default ClientDashboard;

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, LayoutGrid, ChevronRight,
  Sun, Moon, Sparkles, Play, Calendar, Kanban, ExternalLink
} from 'lucide-react';

// IMPORT THE STORE
import { useRecruitmentStore } from '../core/stores/recruitmentStore';

// IMPORT SUB-COMPONENTS
import JDUpload from '../components/client/JDUpload';
import JDAnalysis from '../components/client/JDAnalysis';
import DashboardOverview from '../components/client/DashboardOverview';
import JobDetailView from '../components/client/JobDetailView';
import AsyncVideoReview from '../components/client/AsyncVideoReview';
import InterviewScheduler from '../components/shared/InterviewScheduler';
import ClientCandidateModal from '../components/client/ClientCandidateModal';
import NotificationBell from '../components/shared/NotificationBell';
import CandidatePortfolioModal from '../components/shared/CandidatePortfolioModal';

// Feature 10: Requisition Kanban sub-component
const REQ_KANBAN_COLS = ['Submitted', 'Shortlisted', 'Interview', 'Offer', 'Rejected'];

const RequisitionKanban = () => {
  const allCandidates = useRecruitmentStore(state => state.candidates);
  const updateCandidate = useRecruitmentStore(state => state.updateCandidate);
  const moveCandidate = useRecruitmentStore(state => state.moveCandidate);
  const jobs = useRecruitmentStore(state => state.jobs);
  const [selectedKanbanCandidate, setSelectedKanbanCandidate] = useState(null);
  const [selectedJobFilter, setSelectedJobFilter] = useState('all');
  const [dragId, setDragId] = useState(null);

  const clientCandidates = useMemo(() =>
    allCandidates.filter(c =>
      c.sentToClient === true || c.status === 'Client Review' ||
      REQ_KANBAN_COLS.includes(c.status)
    ).filter(c =>
      selectedJobFilter === 'all' || c.jobId == selectedJobFilter
    ),
    [allCandidates, selectedJobFilter]
  );

  const getColCandidates = (col) => clientCandidates.filter(c => {
    if (col === 'Submitted') return c.status === 'Client Review' || c.status === 'Submitted';
    return c.status === col;
  });

  const handleDrop = (col, e) => {
    e.preventDefault();
    if (!dragId) return;
    const mapped = col === 'Submitted' ? 'Client Review' : col;
    moveCandidate(dragId, mapped);
    setDragId(null);
  };

  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Requisition Kanban</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Track submitted candidates across stages</p>
        </div>
        <select
          value={selectedJobFilter}
          onChange={e => setSelectedJobFilter(e.target.value)}
          className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-[#0A66C2]"
        >
          <option value="all">All Positions</option>
          {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {REQ_KANBAN_COLS.map(col => (
          <div
            key={col}
            className="shrink-0 w-56"
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(col, e)}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{col}</span>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
                {getColCandidates(col).length}
              </span>
            </div>
            <div className="space-y-3 min-h-[200px]">
              {getColCandidates(col).map(c => (
                <div
                  key={c.id}
                  draggable
                  onDragStart={() => setDragId(c.id)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm cursor-grab hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] font-black text-sm flex items-center justify-center shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <button
                        onClick={() => setSelectedKanbanCandidate(c)}
                        className="font-bold text-sm text-slate-900 dark:text-white hover:text-[#0A66C2] transition-colors truncate block w-full text-left"
                      >
                        {c.name}
                      </button>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{c.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${c.match >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {c.match}% match
                    </span>
                    <span className="text-[10px] text-slate-400">{c.noticePeriod || ''}</span>
                  </div>
                  {/* Interview Details Badge */}
                  {c.interview && (
                    <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded-lg text-[10px]">
                      <p className="font-bold text-purple-600 flex items-center gap-1 mb-1">
                        <Calendar size={10} /> {c.interview.date}
                      </p>
                      <p className="text-slate-500">{c.interview.time}</p>
                      {c.interview.meetingLink && (
                        <a href={c.interview.meetingLink} target="_blank" rel="noreferrer"
                          className="text-[#0A66C2] font-bold hover:underline flex items-center gap-1 mt-1">
                          <ExternalLink size={10} /> Join
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {getColCandidates(col).length === 0 && (
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-slate-400 font-bold">Drop here</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedKanbanCandidate && (
        <CandidatePortfolioModal
          candidate={selectedKanbanCandidate}
          onClose={() => setSelectedKanbanCandidate(null)}
          viewerPortal="client"
        />
      )}
    </div>
  );
};

const ClientDashboard = () => {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'create' | 'details' | 'video-review' | 'scheduler' | 'req-kanban'
  const [createStep, setCreateStep] = useState('upload');
  const [uploadedJdText, setUploadedJdText] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [schedulerCandidate, setSchedulerCandidate] = useState(null);

  // Theme State
  const [isDark, setIsDark] = useState(false);

  const jobs = useRecruitmentStore((state) => state.jobs);
  const addJob = useRecruitmentStore((state) => state.addJob);
  const deleteJob = useRecruitmentStore((state) => state.deleteJob);

  // --- THEME EFFECT ---
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleStartCreate = () => {
    setView('create');
    setCreateStep('upload');
    setUploadedJdText('');
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setView('details');
  };

  const handleAnalyze = (text) => {
    setUploadedJdText(text);
    setCreateStep('analysis');
  };

  // --- SAVE ALL DATA POINTS ---
  const handleFinalize = (finalDetails) => {
    const newJob = {
      id: Date.now(),
      title: finalDetails?.jobTitle || "Untitled Position", 
      client: "My Company Inc", 
      location: finalDetails?.location || "Remote",
      department: finalDetails?.department || "General", 
      urgency: "High",
      stage: "Sourcing",
      datePosted: new Date().toLocaleDateString(),
      salary: finalDetails.minSalary && finalDetails.maxSalary 
        ? `₹${finalDetails.minSalary} - ₹${finalDetails.maxSalary} ${finalDetails.currency || 'LPA'}`
        : "Not disclosed",
      fullText: finalDetails.fullText,
      aiScore: finalDetails.aiScore || 0,
      marketData: finalDetails.marketData, 
      skills: finalDetails.skills, 
      sourcingStrategy: finalDetails.sourcingStrategy, 
      interviewQuestions: finalDetails.interviewQuestions,
      tests: finalDetails.selectedTests, 
      logistics: {
        shift: finalDetails.shiftTiming,
        workMode: finalDetails.workMode,
        employmentType: finalDetails.employmentType,
        noticePeriod: finalDetails.noticePeriod,
        qualification: finalDetails.qualification,
        expRange: `${finalDetails.minExp} - ${finalDetails.maxExp} Yrs`
      }
    };

    addJob(newJob);
    alert("Position Created & Sent to Recruiter!");
    setView('dashboard'); 
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Delete this position?")) {
      deleteJob(jobId);
      if (selectedJob && selectedJob.id === jobId) {
        setView('dashboard');
        setSelectedJob(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-200 transition-colors duration-300 relative flex flex-col">
      
      {/* 2-TONE BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-400/20 dark:bg-sky-900/30 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-500" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-900/30 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-500" />
      </div>

      {/* HEADER */}
      <header className="relative z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 px-6 py-4 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-500 dark:text-slate-400">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-sky-500/20">
                TS
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TalentSense</div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                  Client Portal
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Breadcrumbs / View Indicator */}
            <div className="hidden md:flex items-center gap-2 text-sm">
              {view === 'dashboard' && (
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <LayoutGrid className="w-4 h-4 text-sky-500" /> Overview
                </span>
              )}
              {view === 'create' && (
                <>
                  <button onClick={() => setView('dashboard')} className="text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 font-medium">Overview</button>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1"><Sparkles className="w-3 h-3"/> Create Position</span>
                </>
              )}
              {view === 'details' && selectedJob && (
                <>
                  <button onClick={() => setView('dashboard')} className="text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 font-medium">Overview</button>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  <span className="font-bold text-sky-600 dark:text-sky-400 truncate max-w-[200px]">{selectedJob.title}</span>
                </>
              )}
              {view === 'video-review' && (
                <>
                  <button onClick={() => setView('dashboard')} className="text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 font-medium">Overview</button>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1"><Play className="w-3 h-3"/> Video Review</span>
                </>
              )}
              {view === 'scheduler' && (
                <>
                  <button onClick={() => setView('dashboard')} className="text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 font-medium">Overview</button>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1"><Calendar className="w-3 h-3"/> Scheduler</span>
                </>
              )}
            </div>

            {/* Quick nav buttons */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setView('req-kanban')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${view === 'req-kanban' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                <Kanban className="w-3 h-3" /> Kanban
              </button>
              <button
                onClick={() => setView('video-review')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${view === 'video-review' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                <Play className="w-3 h-3" /> Video Review
              </button>
              <button
                onClick={() => { setSchedulerCandidate(null); setView('scheduler'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${view === 'scheduler' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                <Calendar className="w-3 h-3" /> Schedule
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4 sm:pl-6">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <NotificationBell portal="client" />

              {/* Profile Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 border border-sky-200 dark:border-indigo-800 flex items-center justify-center text-sky-700 dark:text-sky-400 font-bold text-sm shadow-sm cursor-pointer hover:shadow-md transition">
                MC
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
        
        {/* View Router */}
        {view === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <DashboardOverview 
              jobs={jobs} 
              onCreateNew={handleStartCreate} 
              onJobClick={handleJobClick} 
              onDeleteJob={handleDeleteJob} 
            />
          </div>
        )}
        
        {view === 'create' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {createStep === 'upload' && <JDUpload onAnalyze={handleAnalyze} />}
            {createStep === 'analysis' && <JDAnalysis initialText={uploadedJdText} onBack={() => setCreateStep('upload')} onFinalize={handleFinalize} />}
          </div>
        )}
        
        {view === 'details' && selectedJob && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <JobDetailView
              job={selectedJob}
              onBack={() => setView('dashboard')}
              onDelete={() => handleDeleteJob(selectedJob.id)}
            />
          </div>
        )}

        {/* VIEW: ASYNC VIDEO REVIEW */}
        {view === 'video-review' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 -mx-4 sm:-mx-6">
            <AsyncVideoReview
              onBack={() => setView('dashboard')}
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
              onBack={() => setView(schedulerCandidate ? 'video-review' : 'dashboard')}
              onConfirm={() => setView('dashboard')}
            />
          </div>
        )}

        {/* VIEW: REQUISITION KANBAN (Feature 10) */}
        {view === 'req-kanban' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <RequisitionKanban />
          </div>
        )}

      </main>
    </div>
  );
};

export default ClientDashboard;