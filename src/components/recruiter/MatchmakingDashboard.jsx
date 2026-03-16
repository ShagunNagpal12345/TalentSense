import React, { useState } from 'react';
import { 
  Search, Briefcase, Users, Star, ArrowLeft, 
  Filter, MoreHorizontal, CheckCircle, Clock, 
  MapPin, Sparkles, ChevronRight, User
} from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';

const MatchmakingDashboard = ({ onViewDossier }) => {
  const { jobs, getJobCandidates, moveCandidate } = useRecruitmentStore();
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Get ranked candidates for the selected job
  const jobCandidates = selectedJob ? getJobCandidates(selectedJob.id).sort((a, b) => b.match - a.match) : [];

  const handleStageChange = (candidateId, newStage) => {
    moveCandidate(candidateId, newStage);
  };

  // --- VIEW 1: MASTER JOB LIST ---
  if (!selectedJob) {
    return (
      <div className="animate-in fade-in duration-500 max-w-7xl mx-auto pb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="text-[#0A66C2]"/> AI Matchmaking Hub
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Select a requisition to view AI-ranked candidates.</p>
          </div>
          <button className="bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-all active:scale-95">
            + New Requisition
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex gap-4 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search requisitions by title or client..." 
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:border-[#0A66C2]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors">
              <Filter className="w-4 h-4"/> Filter
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {jobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.client.toLowerCase().includes(searchQuery.toLowerCase())).map(job => (
              <div 
                key={job.id} 
                onClick={() => setSelectedJob(job)}
                className="p-6 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#0A66C2] font-black text-xl shadow-inner group-hover:bg-white transition-colors border border-slate-200 dark:border-slate-700">
                    {job.client.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-[#0A66C2] transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 font-medium"><Briefcase className="w-3.5 h-3.5"/> {job.client}</span>
                      <span className="flex items-center gap-1 font-medium"><MapPin className="w-3.5 h-3.5"/> {job.location || 'Remote'}</span>
                      <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5"/> Posted {job.datePosted}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#0A66C2]">{getJobCandidates(job.id).length}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Candidates</p>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-[#0A66C2] transition-colors" />
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20"/>
                <p className="font-bold">No active jobs found.</p>
                <p className="text-sm">Create a new requisition to start gathering candidates.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: AI RANKED CANDIDATES FOR SPECIFIC JOB ---
  return (
    <div className="animate-in slide-in-from-right duration-500 max-w-7xl mx-auto pb-20">
      <button onClick={() => setSelectedJob(null)} className="flex items-center gap-2 text-slate-500 hover:text-[#0A66C2] font-bold text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4"/> Back to Requisitions
      </button>

      {/* JOB SUMMARY HEADER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{selectedJob.title}</h2>
          <p className="text-sm text-slate-500 font-medium">{selectedJob.client} • {jobCandidates.length} Active Candidates</p>
        </div>
        <div className="flex items-center gap-2 bg-[#F3F2EF] dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
          <Sparkles className="w-4 h-4 text-[#0A66C2]"/>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">AI Sorting Active</span>
        </div>
      </div>

      {/* RANKED CANDIDATE LIST */}
      <div className="space-y-4">
        {jobCandidates.map((candidate, index) => (
          <div key={candidate.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            
            {/* Rank Badge */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#0A66C2] opacity-80" />

            {/* Profile Info */}
            <div className="flex items-center gap-4 flex-1 w-full pl-2">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 overflow-hidden shrink-0">
                 {candidate.avatar ? <img src={candidate.avatar} alt="avatar" className="w-full h-full object-cover"/> : <User size={24}/>}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight flex items-center gap-2">
                  {candidate.name} 
                  {index === 0 && <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1"><Star size={10} fill="currentColor"/> Top Match</span>}
                </h3>
                <p className="text-sm text-slate-500 font-medium truncate max-w-sm">{candidate.role || "Professional"}</p>
                <div className="flex gap-2 mt-2">
                  {candidate.skills && candidate.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ATS Match Score */}
            <div className="text-center px-6 border-x border-slate-100 dark:border-slate-800 hidden md:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Match Index</p>
              <div className="flex items-center justify-center gap-1.5">
                <div className={`text-2xl font-black ${candidate.match >= 85 ? 'text-[#057642]' : candidate.match >= 70 ? 'text-amber-500' : 'text-red-500'}`}>
                  {candidate.match}%
                </div>
              </div>
            </div>

            {/* Stage Controls & Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <select 
                value={candidate.status}
                onChange={(e) => handleStageChange(candidate.id, e.target.value)}
                className="w-full sm:w-40 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg px-3 py-2.5 outline-none focus:border-[#0A66C2]"
              >
                <option value="New">New Applicant</option>
                <option value="Reviewing">Under Review</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Make Offer</option>
                <option value="Rejected">Reject</option>
              </select>

              <button 
                onClick={() => onViewDossier(candidate)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg font-bold text-xs shadow-md transition-all active:scale-95 whitespace-nowrap"
              >
                View Dossier
              </button>
            </div>
          </div>
        ))}

        {jobCandidates.length === 0 && (
          <div className="p-16 text-center text-slate-500 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-20"/>
            <p className="font-bold text-lg text-slate-700 dark:text-slate-300">No applicants yet</p>
            <p className="text-sm mt-1">Candidates who apply via the portal will appear here instantly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchmakingDashboard;