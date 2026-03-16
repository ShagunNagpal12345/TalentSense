// // import React, { useState } from 'react';
// // import { 
// //   ArrowLeft, MapPin, Users, DollarSign, MoreHorizontal, FileText, 
// //   Briefcase, Clock, Globe, BrainCircuit, ListChecks, Zap, TrendingUp,
// //   AlertTriangle, Search, Filter, ArrowUpDown,BarChart3
// // } from 'lucide-react';
// // import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
// // import ClientCandidateModal from './ClientCandidateModal';

// // const JobDetailView = ({ job, onBack, onDelete }) => {
// //   const allCandidates = useRecruitmentStore(state => state.candidates);
  
// //   // --- PIPELINE FILTER STATE ---
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterStage, setFilterStage] = useState('All');
// //   const [activeTab, setActiveTab] = useState('pipeline');
// //   const [selectedCandidate, setSelectedCandidate] = useState(null);

// //   // --- FILTER LOGIC ---
// //   const jobCandidates = allCandidates.filter(c => c.jobId === job.id).filter(c => {
// //     const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesStage = filterStage === 'All' || c.status === filterStage;
// //     return matchesSearch && matchesStage;
// //   });

// //   return (
// //     <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
      
// //       {/* HEADER */}
// //       <div className="flex justify-between items-start mb-6">
// //         <div>
// //           <button onClick={onBack} className="text-slate-500 hover:text-indigo-600 text-sm font-bold flex items-center gap-1 mb-2">
// //             <ArrowLeft className="w-4 h-4" /> Back to Dashboard
// //           </button>
// //           <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
// //           <div className="flex items-center gap-4 text-slate-500 mt-2 text-sm">
// //             <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
// //             <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold uppercase">{job.stage || "Active"}</span>
// //             <span className="flex items-center gap-1 font-medium text-slate-700"><DollarSign className="w-4 h-4 text-slate-400"/> {job.salary}</span>
// //           </div>
// //         </div>
// //         <button onClick={onDelete} className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200 transition">Delete Job</button>
// //       </div>

// //       {/* TABS */}
// //       <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 w-fit border border-slate-200">
// //          <button onClick={() => setActiveTab('pipeline')} className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'pipeline' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Candidate Pipeline</button>
// //          <button onClick={() => setActiveTab('info')} className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'info' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>JD & Analysis</button>
// //       </div>

// //       {/* PIPELINE TAB */}
// //       {activeTab === 'pipeline' && (
// //         <>
// //           {/* STATS */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// //             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><div className="flex items-center gap-3 mb-1"><div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Users className="w-5 h-5"/></div><span className="text-slate-500 text-xs font-bold uppercase">Total Candidates</span></div><p className="text-2xl font-bold text-slate-800 ml-1">{jobCandidates.length}</p></div>
// //             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><div className="flex items-center gap-3 mb-1"><div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><FileText className="w-5 h-5"/></div><span className="text-slate-500 text-xs font-bold uppercase">Avg Match Score</span></div><p className="text-2xl font-bold text-slate-800 ml-1">85%</p></div>
// //           </div>

// //           {/* FILTERS & LIST */}
// //           <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
// //             <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
// //                <h3 className="font-bold text-slate-800 text-lg">Candidates</h3>
// //                <div className="flex gap-2">
// //                   <div className="relative">
// //                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
// //                      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-1.5 border rounded-lg text-sm outline-none" />
// //                   </div>
// //                   <select value={filterStage} onChange={(e) => setFilterStage(e.target.value)} className="border rounded-lg px-3 py-1.5 text-sm outline-none"><option value="All">All Stages</option><option value="Interview">Interview</option><option value="Offer">Offer</option></select>
// //                </div>
// //             </div>
// //             <div className="divide-y divide-slate-100">
// //               {jobCandidates.length > 0 ? jobCandidates.map((candidate) => (
// //                 <div key={candidate.id} onClick={() => setSelectedCandidate(candidate)} className="px-6 py-4 flex items-center justify-between hover:bg-indigo-50/50 transition cursor-pointer group">
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">{candidate.name.charAt(0)}</div>
// //                     <div><h4 className="font-bold text-slate-800 group-hover:text-indigo-600">{candidate.name}</h4><p className="text-xs text-slate-500">{candidate.role}</p></div>
// //                   </div>
// //                   <div className="flex items-center gap-8">
// //                     <div className="text-right"><span className="block text-xs font-bold text-slate-400 uppercase">Status</span><span className="text-sm font-bold text-slate-700">{candidate.status}</span></div>
// //                     <div className="text-right"><span className="block text-xs font-bold text-slate-400 uppercase">Match</span><span className="text-sm font-bold text-green-600">{candidate.match}%</span></div>
// //                   </div>
// //                 </div>
// //               )) : <div className="p-12 text-center text-slate-400 font-bold">No candidates found</div>}
// //             </div>
// //           </div>
// //         </>
// //       )}

// //       {/* JOB INFO TAB */}
// //       {activeTab === 'info' && (
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //            <div className="lg:col-span-2 space-y-6">
// //               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
// //                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-600"/> Job Description</h3>
// //                  <div className="prose prose-sm prose-slate max-w-none font-medium whitespace-pre-wrap text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100 max-h-[400px] overflow-y-auto">{job.fullText}</div>
// //               </div>
// //               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
// //                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-indigo-600"/> Skills</h3>
// //                  <div className="space-y-4">
// //                    <div><p className="text-xs font-bold text-slate-400 uppercase mb-2">Hard Skills</p><div className="flex flex-wrap gap-2">{job.skills?.hard?.map((s,i) => <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">{s}</span>)}</div></div>
// //                    <div><p className="text-xs font-bold text-slate-400 uppercase mb-2">Soft Skills</p><div className="flex flex-wrap gap-2">{job.skills?.soft?.map((s,i) => <span key={i} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-lg text-xs font-bold">{s}</span>)}</div></div>
// //                  </div>
// //               </div>
// //            </div>
// //            <div className="space-y-6">
// //               <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
// //                  <Globe className="absolute top-2 right-2 text-indigo-700 w-24 h-24 opacity-20" />
// //                  <h4 className="text-xs font-bold text-indigo-300 uppercase mb-4 flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> Market Analysis</h4>
// //                  <div className="space-y-4 relative z-10">
// //                     <div><p className="text-[10px] text-indigo-300 uppercase">Avg Time to Fill</p><p className="text-xl font-bold">{job.marketData?.timeToFill}</p></div>
// //                     <div><p className="text-[10px] text-indigo-300 uppercase">Difficulty</p><p className="text-xl font-bold">{job.marketData?.difficulty}</p></div>
// //                  </div>
// //               </div>
// //               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
// //                  <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase flex items-center gap-2"><BarChart3 className="w-4 h-4"/> Logistics</h4>
// //                  <div className="space-y-4">
// //                     <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Shift</span><span className="text-sm font-bold text-slate-700">{job.logistics?.shift}</span></div>
// //                     <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Work Mode</span><span className="text-sm font-bold text-slate-700">{job.logistics?.workMode}</span></div>
// //                     <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Experience</span><span className="text-sm font-bold text-slate-700">{job.logistics?.expRange}</span></div>
// //                  </div>
// //               </div>
// //               <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
// //                  <h4 className="font-bold text-purple-900 mb-4 text-sm flex items-center gap-2"><ListChecks className="w-4 h-4"/> Selected Tests</h4>
// //                  {job.tests && job.tests.length > 0 ? (
// //                     <ul className="space-y-2">{job.tests.map((t, i) => <li key={i} className="text-xs font-bold text-purple-700 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>{t.name}</li>)}</ul>
// //                  ) : <p className="text-xs text-purple-400 italic">No tests.</p>}
// //               </div>
// //            </div>
// //         </div>
// //       )}

// //       {selectedCandidate && <ClientCandidateModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />}
// //     </div>
// //   );
// // };

// // export default JobDetailView;

// import React, { useState } from 'react';
// import { 
//   ArrowLeft, MapPin, Users, DollarSign, MoreHorizontal, FileText, 
//   Briefcase, Clock, Globe, BrainCircuit, ListChecks, Zap, TrendingUp,
//   AlertTriangle, Search, Filter, ArrowUpDown, BarChart3, Target, HelpCircle, CheckCircle, Copy
// } from 'lucide-react';
// import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
// import ClientCandidateModal from './ClientCandidateModal';

// const JobDetailView = ({ job, onBack, onDelete }) => {
//   const allCandidates = useRecruitmentStore(state => state.candidates);
  
//   // --- PIPELINE FILTER STATE ---
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStage, setFilterStage] = useState('All');
//   const [activeTab, setActiveTab] = useState('pipeline');
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   // --- FILTER LOGIC ---
//   const jobCandidates = allCandidates.filter(c => c.jobId === job.id).filter(c => {
//     const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStage = filterStage === 'All' || c.status === filterStage;
//     return matchesSearch && matchesStage;
//   });

//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
      
//       {/* HEADER */}
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <button onClick={onBack} className="text-slate-500 hover:text-indigo-600 text-sm font-bold flex items-center gap-1 mb-2">
//             <ArrowLeft className="w-4 h-4" /> Back to Dashboard
//           </button>
//           <div className="flex items-center gap-3">
//             <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
//             {job.aiScore && (
//               <span className={`text-xs font-bold px-2 py-1 rounded border ${job.aiScore >= 80 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
//                 JD Score: {job.aiScore}/100
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-4 text-slate-500 mt-2 text-sm">
//             <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
//             <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold uppercase">{job.stage || "Active"}</span>
//             <span className="flex items-center gap-1 font-medium text-slate-700"><DollarSign className="w-4 h-4 text-slate-400"/> {job.salary}</span>
//           </div>
//         </div>
//         <button onClick={onDelete} className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200 transition">Delete Job</button>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 w-fit border border-slate-200">
//          <button onClick={() => setActiveTab('pipeline')} className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'pipeline' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Candidate Pipeline</button>
//          <button onClick={() => setActiveTab('info')} className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'info' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>JD & AI Strategy</button>
//       </div>

//       {/* PIPELINE TAB */}
//       {activeTab === 'pipeline' && (
//         <>
//           {/* STATS */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><div className="flex items-center gap-3 mb-1"><div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Users className="w-5 h-5"/></div><span className="text-slate-500 text-xs font-bold uppercase">Total Candidates</span></div><p className="text-2xl font-bold text-slate-800 ml-1">{jobCandidates.length}</p></div>
//             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><div className="flex items-center gap-3 mb-1"><div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><FileText className="w-5 h-5"/></div><span className="text-slate-500 text-xs font-bold uppercase">Avg Match Score</span></div><p className="text-2xl font-bold text-slate-800 ml-1">85%</p></div>
//           </div>

//           {/* FILTERS & LIST */}
//           <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
//             <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
//                <h3 className="font-bold text-slate-800 text-lg">Candidates</h3>
//                <div className="flex gap-2">
//                   <div className="relative">
//                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-1.5 border rounded-lg text-sm outline-none" />
//                   </div>
//                   <select value={filterStage} onChange={(e) => setFilterStage(e.target.value)} className="border rounded-lg px-3 py-1.5 text-sm outline-none"><option value="All">All Stages</option><option value="Interview">Interview</option><option value="Offer">Offer</option></select>
//                </div>
//             </div>
//             <div className="divide-y divide-slate-100">
//               {jobCandidates.length > 0 ? jobCandidates.map((candidate) => (
//                 <div key={candidate.id} onClick={() => setSelectedCandidate(candidate)} className="px-6 py-4 flex items-center justify-between hover:bg-indigo-50/50 transition cursor-pointer group">
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">{candidate.name.charAt(0)}</div>
//                     <div><h4 className="font-bold text-slate-800 group-hover:text-indigo-600">{candidate.name}</h4><p className="text-xs text-slate-500">{candidate.role}</p></div>
//                   </div>
//                   <div className="flex items-center gap-8">
//                     <div className="text-right"><span className="block text-xs font-bold text-slate-400 uppercase">Status</span><span className="text-sm font-bold text-slate-700">{candidate.status}</span></div>
//                     <div className="text-right"><span className="block text-xs font-bold text-slate-400 uppercase">Match</span><span className="text-sm font-bold text-green-600">{candidate.match}%</span></div>
//                   </div>
//                 </div>
//               )) : <div className="p-12 text-center text-slate-400 font-bold">No candidates found</div>}
//             </div>
//           </div>
//         </>
//       )}

//       {/* JOB INFO TAB (UPDATED WITH ALL NEW DATA) */}
//       {activeTab === 'info' && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
//            {/* LEFT COLUMN: JD, SKILLS, STRATEGY */}
//            <div className="lg:col-span-2 space-y-6">
              
//               {/* JD Text */}
//               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-600"/> Job Description</h3>
//                  <div className="prose prose-sm prose-slate max-w-none font-medium whitespace-pre-wrap text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100 max-h-[300px] overflow-y-auto custom-scrollbar">{job.fullText}</div>
//               </div>

//               {/* Skills Matrix */}
//               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-indigo-600"/> Skills Matrix</h3>
//                  <div className="space-y-4">
//                    <div><p className="text-xs font-bold text-slate-400 uppercase mb-2">Hard Skills</p><div className="flex flex-wrap gap-2">{job.skills?.hard?.map((s,i) => <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100">{s}</span>)}</div></div>
//                    <div><p className="text-xs font-bold text-slate-400 uppercase mb-2">Soft Skills</p><div className="flex flex-wrap gap-2">{job.skills?.soft?.map((s,i) => <span key={i} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-lg text-xs font-bold border border-pink-100">{s}</span>)}</div></div>
//                    {job.skills?.tools?.length > 0 && <div><p className="text-xs font-bold text-slate-400 uppercase mb-2">Tools</p><div className="flex flex-wrap gap-2">{job.skills?.tools?.map((s,i) => <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200">{s}</span>)}</div></div>}
//                  </div>
//               </div>

//               {/* Sourcing Strategy (RESTORED BULLION) */}
//               {job.sourcingStrategy && (
//                 <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
//                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2"><Target className="w-5 h-5"/> Sourcing Strategy (Recruiter Brief)</h3>
//                    <div className="space-y-6">
//                       {/* Boolean Strings - NOW VISIBLE */}
//                       <div className="grid grid-cols-1 gap-4">
//                         <div>
//                           <label className="text-xs font-bold text-blue-800 uppercase mb-1 block">Naukri Boolean String</label>
//                           <div className="flex gap-2">
//                             <code className="flex-1 bg-white p-2 rounded border border-blue-200 text-xs font-mono text-slate-600 overflow-x-auto whitespace-nowrap">{job.sourcingStrategy.naukriBoolean || "N/A"}</code>
//                             <button className="p-2 bg-white rounded border border-blue-200 text-blue-600 hover:bg-blue-50" title="Copy"><Copy className="w-4 h-4"/></button>
//                           </div>
//                         </div>
//                         <div>
//                           <label className="text-xs font-bold text-blue-800 uppercase mb-1 block">LinkedIn Boolean String</label>
//                           <div className="flex gap-2">
//                             <code className="flex-1 bg-white p-2 rounded border border-blue-200 text-xs font-mono text-slate-600 overflow-x-auto whitespace-nowrap">{job.sourcingStrategy.linkedinBoolean || "N/A"}</code>
//                             <button className="p-2 bg-white rounded border border-blue-200 text-blue-600 hover:bg-blue-50" title="Copy"><Copy className="w-4 h-4"/></button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Targets */}
//                       <div className="grid grid-cols-2 gap-4 border-t border-blue-200/50 pt-4">
//                         <div><p className="text-xs font-bold text-blue-800 uppercase mb-1">Target Titles</p><p className="text-sm text-blue-700">{job.sourcingStrategy.targetTitles?.join(", ") || "N/A"}</p></div>
//                         <div><p className="text-xs font-bold text-blue-800 uppercase mb-1">Target Companies</p><p className="text-sm text-blue-700">{job.sourcingStrategy.targetCompanies?.join(", ") || "N/A"}</p></div>
//                       </div>
//                    </div>
//                 </div>
//               )}

//               {/* Interview Questions */}
//               {job.interviewQuestions && job.interviewQuestions.length > 0 && (
//                 <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
//                    <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5"/> Interview Guide</h3>
//                    <ul className="space-y-2">
//                       {job.interviewQuestions.map((q, i) => (
//                         <li key={i} className="flex gap-3 text-sm text-orange-800 bg-white p-3 rounded border border-orange-200">
//                            <span className="font-bold text-orange-400">Q{i+1}.</span> {q}
//                         </li>
//                       ))}
//                    </ul>
//                 </div>
//               )}
//            </div>

//            {/* RIGHT COLUMN: MARKET, LOGISTICS, TESTS */}
//            <div className="space-y-6">
              
//               {/* Market Data */}
//               <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
//                  <Globe className="absolute top-2 right-2 text-indigo-700 w-24 h-24 opacity-20" />
//                  <h4 className="text-xs font-bold text-indigo-300 uppercase mb-4 flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> Market Analysis</h4>
//                  <div className="space-y-4 relative z-10">
//                     <div><p className="text-[10px] text-indigo-300 uppercase">Avg Time to Fill</p><p className="text-xl font-bold">{job.marketData?.timeToFill || "N/A"}</p></div>
//                     <div><p className="text-[10px] text-indigo-300 uppercase">Difficulty</p><p className="text-xl font-bold">{job.marketData?.difficulty || "Medium"}</p></div>
//                     <div className="pt-4 border-t border-indigo-800"><p className="text-[10px] text-indigo-300 uppercase">Industry Salary</p><p className="text-sm font-bold">{job.marketData?.industrySalary || "N/A"}</p></div>
//                  </div>
//               </div>

//               {/* Logistics (Updated with all fields) */}
//               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//                  <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase flex items-center gap-2"><BarChart3 className="w-4 h-4"/> Logistics & Params</h4>
//                  <div className="space-y-3">
//                     <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Department</span><span className="text-sm font-bold text-slate-700">{job.department || "N/A"}</span></div>
//                     <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Work Mode</span><span className="text-sm font-bold text-slate-700">{job.logistics?.workMode}</span></div>
//                     <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Shift</span><span className="text-sm font-bold text-slate-700">{job.logistics?.shift}</span></div>
//                     <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Experience</span><span className="text-sm font-bold text-slate-700">{job.logistics?.expRange}</span></div>
//                     <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Qualification</span><span className="text-sm font-bold text-slate-700">{job.logistics?.qualification || "Any"}</span></div>
//                     <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Notice Prd</span><span className="text-sm font-bold text-slate-700">{job.logistics?.noticePeriod || "Any"}</span></div>
//                  </div>
//               </div>

//               {/* Tests */}
//               <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
//                  <h4 className="font-bold text-purple-900 mb-4 text-sm flex items-center gap-2"><ListChecks className="w-4 h-4"/> Selected Tests</h4>
//                  {job.tests && job.tests.length > 0 ? (
//                     <ul className="space-y-2">{job.tests.map((t, i) => <li key={i} className="text-xs font-bold text-purple-700 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>{t.name}</li>)}</ul>
//                  ) : <p className="text-xs text-purple-400 italic">No tests.</p>}
//               </div>
//            </div>
//         </div>
//       )}

//       {selectedCandidate && <ClientCandidateModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />}
//     </div>
//   );
// };

// export default JobDetailView;

import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Users, DollarSign, MoreHorizontal, FileText, 
  Briefcase, Clock, Globe, BrainCircuit, ListChecks, Zap, TrendingUp,
  AlertTriangle, Search, Filter, ArrowUpDown, BarChart3, Target, HelpCircle, CheckCircle, Copy
} from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
import ClientCandidateModal from './ClientCandidateModal';

const JobDetailView = ({ job, onBack, onDelete }) => {
  const allCandidates = useRecruitmentStore(state => state.candidates);
  
  // --- PIPELINE FILTER STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('All');
  const [activeTab, setActiveTab] = useState('pipeline');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // --- FILTER LOGIC (UPDATED TO PROTECT CLIENT VIEW) ---
  const jobCandidates = allCandidates.filter(c => {
    // 1. Must belong to this specific job
    if (c.jobId !== job.id) return false;
    
    // 2. ONLY show if the recruiter has moved them past the "New" or initial screening stages
    const currentStage = c.stage || c.status || '';
    const allowedClientStages = ['Client Review', 'Shortlisted', 'Interview', 'Offer', 'Hired'];
    
    if (!allowedClientStages.includes(currentStage)) {
      return false; // Hide from client!
    }

    // 3. Apply standard Search and Dropdown Filters
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'All' || currentStage === filterStage;
    
    return matchesSearch && matchesStage;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <button onClick={onBack} className="text-slate-500 hover:text-indigo-600 text-sm font-bold flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
            {job.aiScore && (
              <span className={`text-xs font-bold px-2 py-1 rounded border ${job.aiScore >= 80 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
                JD Score: {job.aiScore}/100
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-slate-500 mt-2 text-sm">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold uppercase">{job.stage || "Active"}</span>
            <span className="flex items-center gap-1 font-medium text-slate-700"><DollarSign className="w-4 h-4 text-slate-400"/> {job.salary}</span>
          </div>
        </div>
        <button onClick={onDelete} className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200 transition">Delete Job</button>
      </div>

      {/* TABS */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 w-fit border border-slate-200">
         <button onClick={() => setActiveTab('pipeline')} className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'pipeline' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Candidate Pipeline</button>
         <button onClick={() => setActiveTab('info')} className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'info' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>JD & AI Strategy</button>
      </div>

      {/* PIPELINE TAB */}
      {activeTab === 'pipeline' && (
        <>
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><div className="flex items-center gap-3 mb-1"><div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Users className="w-5 h-5"/></div><span className="text-slate-500 text-xs font-bold uppercase">Total Candidates</span></div><p className="text-2xl font-bold text-slate-800 ml-1">{jobCandidates.length}</p></div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><div className="flex items-center gap-3 mb-1"><div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><FileText className="w-5 h-5"/></div><span className="text-slate-500 text-xs font-bold uppercase">Avg Match Score</span></div><p className="text-2xl font-bold text-slate-800 ml-1">85%</p></div>
          </div>

          {/* FILTERS & LIST */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
               <h3 className="font-bold text-slate-800 text-lg">Candidates</h3>
               <div className="flex gap-2">
                  <div className="relative">
                     <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-1.5 border rounded-lg text-sm outline-none" />
                  </div>
                  <select value={filterStage} onChange={(e) => setFilterStage(e.target.value)} className="border rounded-lg px-3 py-1.5 text-sm outline-none"><option value="All">All Stages</option><option value="Interview">Interview</option><option value="Offer">Offer</option></select>
               </div>
            </div>
            <div className="divide-y divide-slate-100">
              {jobCandidates.length > 0 ? jobCandidates.map((candidate) => (
                <div key={candidate.id} onClick={() => setSelectedCandidate(candidate)} className="px-6 py-4 flex items-center justify-between hover:bg-indigo-50/50 transition cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">{candidate.name.charAt(0)}</div>
                    <div><h4 className="font-bold text-slate-800 group-hover:text-indigo-600">{candidate.name}</h4><p className="text-xs text-slate-500">{candidate.role}</p></div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right"><span className="block text-xs font-bold text-slate-400 uppercase">Status</span><span className="text-sm font-bold text-slate-700">{candidate.status || candidate.stage}</span></div>
                    <div className="text-right"><span className="block text-xs font-bold text-slate-400 uppercase">Match</span><span className="text-sm font-bold text-green-600">{candidate.match}%</span></div>
                  </div>
                </div>
              )) : <div className="p-12 text-center text-slate-400 font-bold">No candidates found for review yet. Waiting on Recruiter.</div>}
            </div>
          </div>
        </>
      )}

      {/* JOB INFO TAB (UPDATED WITH ALL NEW DATA) */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* LEFT COLUMN: JD, SKILLS, STRATEGY */}
           <div className="lg:col-span-2 space-y-6">
              
              {/* JD Text */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-600"/> Job Description</h3>
                 <div className="prose prose-sm prose-slate max-w-none font-medium whitespace-pre-wrap text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100 max-h-[300px] overflow-y-auto custom-scrollbar">{job.fullText}</div>
              </div>

              {/* Skills Matrix */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-indigo-600"/> Skills Matrix</h3>
                 <div className="space-y-4">
                   <div><p className="text-xs font-bold text-slate-400 uppercase mb-2">Hard Skills</p><div className="flex flex-wrap gap-2">{job.skills?.hard?.map((s,i) => <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100">{s}</span>)}</div></div>
                   <div><p className="text-xs font-bold text-slate-400 uppercase mb-2">Soft Skills</p><div className="flex flex-wrap gap-2">{job.skills?.soft?.map((s,i) => <span key={i} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-lg text-xs font-bold border border-pink-100">{s}</span>)}</div></div>
                   {job.skills?.tools?.length > 0 && <div><p className="text-xs font-bold text-slate-400 uppercase mb-2">Tools</p><div className="flex flex-wrap gap-2">{job.skills?.tools?.map((s,i) => <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200">{s}</span>)}</div></div>}
                 </div>
              </div>

              {/* Sourcing Strategy (RESTORED BULLION) */}
              {job.sourcingStrategy && (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                   <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2"><Target className="w-5 h-5"/> Sourcing Strategy (Recruiter Brief)</h3>
                   <div className="space-y-6">
                      {/* Boolean Strings - NOW VISIBLE */}
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="text-xs font-bold text-blue-800 uppercase mb-1 block">Naukri Boolean String</label>
                          <div className="flex gap-2">
                            <code className="flex-1 bg-white p-2 rounded border border-blue-200 text-xs font-mono text-slate-600 overflow-x-auto whitespace-nowrap">{job.sourcingStrategy.naukriBoolean || "N/A"}</code>
                            <button className="p-2 bg-white rounded border border-blue-200 text-blue-600 hover:bg-blue-50" title="Copy"><Copy className="w-4 h-4"/></button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-blue-800 uppercase mb-1 block">LinkedIn Boolean String</label>
                          <div className="flex gap-2">
                            <code className="flex-1 bg-white p-2 rounded border border-blue-200 text-xs font-mono text-slate-600 overflow-x-auto whitespace-nowrap">{job.sourcingStrategy.linkedinBoolean || "N/A"}</code>
                            <button className="p-2 bg-white rounded border border-blue-200 text-blue-600 hover:bg-blue-50" title="Copy"><Copy className="w-4 h-4"/></button>
                          </div>
                        </div>
                      </div>

                      {/* Targets */}
                      <div className="grid grid-cols-2 gap-4 border-t border-blue-200/50 pt-4">
                        <div><p className="text-xs font-bold text-blue-800 uppercase mb-1">Target Titles</p><p className="text-sm text-blue-700">{job.sourcingStrategy.targetTitles?.join(", ") || "N/A"}</p></div>
                        <div><p className="text-xs font-bold text-blue-800 uppercase mb-1">Target Companies</p><p className="text-sm text-blue-700">{job.sourcingStrategy.targetCompanies?.join(", ") || "N/A"}</p></div>
                      </div>
                   </div>
                </div>
              )}

              {/* Interview Questions */}
              {job.interviewQuestions && job.interviewQuestions.length > 0 && (
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
                   <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5"/> Interview Guide</h3>
                   <ul className="space-y-2">
                      {job.interviewQuestions.map((q, i) => (
                        <li key={i} className="flex gap-3 text-sm text-orange-800 bg-white p-3 rounded border border-orange-200">
                           <span className="font-bold text-orange-400">Q{i+1}.</span> {q}
                        </li>
                      ))}
                   </ul>
                </div>
              )}
           </div>

           {/* RIGHT COLUMN: MARKET, LOGISTICS, TESTS */}
           <div className="space-y-6">
              
              {/* Market Data */}
              <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                 <Globe className="absolute top-2 right-2 text-indigo-700 w-24 h-24 opacity-20" />
                 <h4 className="text-xs font-bold text-indigo-300 uppercase mb-4 flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> Market Analysis</h4>
                 <div className="space-y-4 relative z-10">
                    <div><p className="text-[10px] text-indigo-300 uppercase">Avg Time to Fill</p><p className="text-xl font-bold">{job.marketData?.timeToFill || "N/A"}</p></div>
                    <div><p className="text-[10px] text-indigo-300 uppercase">Difficulty</p><p className="text-xl font-bold">{job.marketData?.difficulty || "Medium"}</p></div>
                    <div className="pt-4 border-t border-indigo-800"><p className="text-[10px] text-indigo-300 uppercase">Industry Salary</p><p className="text-sm font-bold">{job.marketData?.industrySalary || "N/A"}</p></div>
                 </div>
              </div>

              {/* Logistics (Updated with all fields) */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase flex items-center gap-2"><BarChart3 className="w-4 h-4"/> Logistics & Params</h4>
                 <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Department</span><span className="text-sm font-bold text-slate-700">{job.department || "N/A"}</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Work Mode</span><span className="text-sm font-bold text-slate-700">{job.logistics?.workMode}</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Shift</span><span className="text-sm font-bold text-slate-700">{job.logistics?.shift}</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Experience</span><span className="text-sm font-bold text-slate-700">{job.logistics?.expRange}</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Qualification</span><span className="text-sm font-bold text-slate-700">{job.logistics?.qualification || "Any"}</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-400">Notice Prd</span><span className="text-sm font-bold text-slate-700">{job.logistics?.noticePeriod || "Any"}</span></div>
                 </div>
              </div>

              {/* Tests */}
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                 <h4 className="font-bold text-purple-900 mb-4 text-sm flex items-center gap-2"><ListChecks className="w-4 h-4"/> Selected Tests</h4>
                 {job.tests && job.tests.length > 0 ? (
                    <ul className="space-y-2">{job.tests.map((t, i) => <li key={i} className="text-xs font-bold text-purple-700 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>{t.name}</li>)}</ul>
                 ) : <p className="text-xs text-purple-400 italic">No tests.</p>}
              </div>
           </div>
        </div>
      )}

      {selectedCandidate && <ClientCandidateModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />}
    </div>
  );
};

export default JobDetailView;