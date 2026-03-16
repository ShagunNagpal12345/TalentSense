import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, ExternalLink, User, BrainCircuit, Download, Briefcase, Activity } from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
// 👇 FIX: Import the Evaluation Modal
import CandidateDetailModal from './CandidateDetailModal'; 

const CandidateDatabase = () => {
  const candidates = useRecruitmentStore((state) => state.candidates);
  const jobs = useRecruitmentStore((state) => state.jobs);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 👇 FIX: Track which candidate is selected
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getJobTitle = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : "General Pool";
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || 'new';
    if (s.includes('new')) return 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 border-sky-200 dark:border-sky-800';
    if (s.includes('shortlist') || s.includes('client')) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
    if (s.includes('interview')) return 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 border-violet-200 dark:border-violet-800';
    if (s.includes('reject')) return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
    return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Talent Database</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Browse, search, and track all parsed candidates and applications.</p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search skills, names, roles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-sm border border-slate-700">
            <Download className="w-4 h-4"/> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow group relative">
              <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-lg text-xs font-bold border shadow-sm flex items-center gap-1.5 ${getStatusBadge(candidate.status || candidate.stage)}`}>
                <Activity className="w-3.5 h-3.5"/>
                {candidate.status || candidate.stage || 'New'}
              </div>

              <div className="flex justify-between items-start mb-4 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-200 dark:border-emerald-800/50">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{candidate.name}</h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{candidate.role || "Candidate"}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-bold border ${candidate.match >= 80 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'}`}>
                  {candidate.match}% Match
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-bold bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                  <Briefcase className="w-4 h-4 text-emerald-500"/> Applied: {getJobTitle(candidate.jobId)}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <Mail className="w-3.5 h-3.5 text-slate-400"/> {candidate.email || `${candidate.name.split(' ')[0].toLowerCase()}@email.com`}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-400"/> {candidate.phone || "+1 (555) 000-0000"}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><BrainCircuit className="w-3 h-3"/> Top Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills?.slice(0, 4).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded border border-slate-200 dark:border-slate-700">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills?.length > 4 && (
                    <span className="px-2 py-1 bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] font-bold rounded border border-dashed border-slate-200 dark:border-slate-700">
                      +{candidate.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => setSelectedCandidate(candidate)} 
                  className="flex-1 py-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800 transition"
                >
                  View Full Profile & Analyze
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white/50 dark:bg-slate-900/50">
            <User className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"/>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-1">No Candidates Found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Upload resumes in the pipeline or wait for candidates to apply.</p>
          </div>
        )}
      </div>

      {/* 👇 FIX: Modal rendered when View Profile clicked */}
      {selectedCandidate && (
        <CandidateDetailModal 
          candidate={selectedCandidate} 
          job={jobs.find(j => j.id === selectedCandidate.jobId)} 
          onClose={() => setSelectedCandidate(null)} 
        />
      )}
    </div>
  );
};

export default CandidateDatabase;