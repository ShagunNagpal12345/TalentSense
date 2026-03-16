import React, { useState } from 'react';
import { 
  Plus, MoreHorizontal, Briefcase, Users, Clock, 
  CheckCircle, Search, Filter, TrendingUp, BarChart3, Download
} from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';

const DashboardOverview = ({ jobs, onCreateNew, onJobClick, onDeleteJob }) => {
  const candidates = useRecruitmentStore((state) => state.candidates);
  
  // --- UI STATE FOR FILTERS ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // --- 1. CALCULATE LIVE METRICS ---
  const totalCandidates = candidates.length;
  const activeJobs = jobs.length;
  const interviewsScheduled = candidates.filter(c => c.status === 'Interview').length;
  const offersReleased = candidates.filter(c => c.status === 'Offer').length;

  // --- 2. CALCULATE LIVE FUNNEL DATA ---
  const funnelCounts = {
    sourced: totalCandidates,
    screening: candidates.filter(c => ['Screening', 'Client Review'].includes(c.status)).length,
    interview: interviewsScheduled,
    offer: offersReleased
  };

  // FIXED: Handle 0 counts correctly so bars don't show ghost data
  const getWidth = (count) => {
    if (totalCandidates === 0 || count === 0) return '0%';
    // Give non-zero counts at least 5% width so they are visible
    return `${Math.max((count / totalCandidates) * 100, 5)}%`; 
  };

  // --- 3. GET LIVE RECENT ACTIVITY ---
  const recentActivity = [...candidates]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5); 

  // --- 4. JOB FILTER LOGIC ---
  const getJobStatus = (job) => {
    const jobCandidates = candidates.filter(c => c.jobId === job.id);
    if (jobCandidates.length === 0) return { label: "Sent to Recruiter", color: "bg-slate-100 text-slate-600 border-slate-200" };
    const hasOffer = jobCandidates.some(c => c.status === 'Offer');
    if (hasOffer) return { label: "Offer Released", color: "bg-emerald-100 text-emerald-700 border-emerald-200" };
    const hasInterview = jobCandidates.some(c => c.status === 'Interview');
    if (hasInterview) return { label: "Interviews", color: "bg-orange-100 text-orange-700 border-orange-200" };
    return { label: "Sourcing", color: "bg-blue-50 text-blue-700 border-blue-100" };
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getJobStatus(job).label;
    const matchesStatus = filterStatus === 'All' || status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-in fade-in duration-300 space-y-8">
      
      {/* 1. HEADER & ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening in your hiring pipeline.</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition">
             <Download className="w-4 h-4" /> Export Report
           </button>
           <button 
            onClick={onCreateNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" /> Create New Position
          </button>
        </div>
      </div>

      {/* 2. METRICS & GRAPHS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* METRIC CARDS ROW */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
           {/* Active Jobs */}
           <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Jobs</p>
                 <h3 className="text-2xl font-black text-slate-800 mt-1">{activeJobs}</h3>
                 <span className="text-[10px] text-green-600 font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Live Positions</span>
              </div>
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center"><Briefcase className="w-5 h-5"/></div>
           </div>
           
           {/* Total Candidates */}
           <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidates</p>
                 <h3 className="text-2xl font-black text-slate-800 mt-1">{totalCandidates}</h3>
                 <span className="text-[10px] text-green-600 font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Total Sourced</span>
              </div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Users className="w-5 h-5"/></div>
           </div>

           {/* Interviews */}
           <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interviews</p>
                 <h3 className="text-2xl font-black text-slate-800 mt-1">{interviewsScheduled}</h3>
                 <span className="text-[10px] text-orange-600 font-bold flex items-center gap-1">In Progress</span>
              </div>
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center"><Clock className="w-5 h-5"/></div>
           </div>

           {/* Offers */}
           <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Offers</p>
                 <h3 className="text-2xl font-black text-slate-800 mt-1">{offersReleased}</h3>
                 <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">Released</span>
              </div>
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><CheckCircle className="w-5 h-5"/></div>
           </div>
        </div>

        {/* --- LIVE HIRING FUNNEL --- */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-indigo-500"/> Pipeline Funnel</h3>
              <div className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">All Jobs</div>
           </div>
           
           <div className="space-y-5">
              {/* Sourced */}
              <div className="space-y-1">
                 <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Total Sourced</span>
                    <span>{funnelCounts.sourced}</span>
                 </div>
                 <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    {/* FIXED: Width is 0% if count is 0 */}
                    <div style={{ width: totalCandidates > 0 ? '100%' : '0%' }} className="h-full bg-indigo-500 rounded-full transition-all duration-500"></div>
                 </div>
              </div>

              {/* Screening */}
              <div className="space-y-1">
                 <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Screening & Review</span>
                    <span>{funnelCounts.screening}</span>
                 </div>
                 <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div style={{ width: getWidth(funnelCounts.screening) }} className="h-full bg-blue-400 rounded-full transition-all duration-500"></div>
                 </div>
              </div>

              {/* Interview */}
              <div className="space-y-1">
                 <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Interview Stage</span>
                    <span>{funnelCounts.interview}</span>
                 </div>
                 <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div style={{ width: getWidth(funnelCounts.interview) }} className="h-full bg-orange-400 rounded-full transition-all duration-500"></div>
                 </div>
              </div>

              {/* Offer */}
              <div className="space-y-1">
                 <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Offer Released</span>
                    <span>{funnelCounts.offer}</span>
                 </div>
                 <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div style={{ width: getWidth(funnelCounts.offer) }} className="h-full bg-emerald-500 rounded-full transition-all duration-500"></div>
                 </div>
              </div>
           </div>
        </div>

        {/* --- LIVE RECENT ACTIVITY --- */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
           <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-indigo-500"/> Recent Updates</h3>
           <div className="space-y-0 flex-1 overflow-y-auto custom-scrollbar pr-2">
              {recentActivity.length > 0 ? (
                recentActivity.map((candidate) => (
                   <div key={candidate.id} className="flex gap-3 pb-3 mb-3 border-b border-slate-50 last:border-0 last:mb-0 last:pb-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-100">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-700">
                           <span className="text-indigo-600">{candidate.name}</span> is currently <span className="underline decoration-slate-300">{candidate.status}</span>
                         </p>
                         <p className="text-[10px] text-slate-400 mt-0.5">Role: {candidate.role}</p>
                      </div>
                   </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-50">
                  <p className="text-xs text-slate-400 italic">No recent activity.</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* 3. JOB LIST WITH FILTERS */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           <h3 className="text-lg font-bold text-slate-800">Your Requisitions</h3>
           <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   type="text" 
                   placeholder="Search jobs..." 
                   className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" 
                 />
              </div>
              <div className="relative">
                 <select 
                   value={filterStatus}
                   onChange={(e) => setFilterStatus(e.target.value)}
                   className="appearance-none bg-white border border-slate-200 rounded-lg pl-4 pr-10 py-2 text-sm font-bold text-slate-600 cursor-pointer focus:outline-none"
                 >
                   <option value="All">All Status</option>
                   <option value="Sourcing">Sourcing</option>
                   <option value="Interviews">Interviews</option>
                   <option value="Offer Released">Offers</option>
                 </select>
                 <Filter className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
           </div>
        </div>

        {/* JOB CARDS */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const status = getJobStatus(job);
              const candidateCount = candidates.filter(c => c.jobId === job.id).length;

              return (
                <div 
                  key={job.id} 
                  onClick={() => onJobClick(job)}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition cursor-pointer group relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition">
                      <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition" />
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDeleteJob(job.id); }}
                      className="text-slate-300 hover:text-red-500 transition p-1"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h4 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition">{job.title}</h4>
                  <p className="text-sm text-slate-500 mb-6">{job.location} • Posted {job.datePosted || "Today"}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                       <Users className="w-4 h-4 text-slate-400"/>
                       <span className="text-sm font-bold text-slate-600">{candidateCount}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wide ${status.color}`}>
                      {status.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-xl">
            <p className="text-slate-400 font-bold">No active positions matching filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;