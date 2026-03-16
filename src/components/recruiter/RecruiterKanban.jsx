import React, { useMemo, useState } from 'react';
import { 
  MoreHorizontal, Plus, Search, 
  ArrowRight, Briefcase, ArrowLeft, XCircle, FileText 
} from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore'; 

import RecruiterCandidateDetail from './RecruiterCandidateDetail';
import RecruiterJobDetailModal from './RecruiterJobDetailModal'; // IMPORT NEW COMPONENT

const COLUMNS_CONFIG = {
  sourced: { id: 'Sourced', title: 'Sourced', color: 'border-slate-300', bg: 'bg-slate-50' },
  screening: { id: 'Screening', title: 'Screening', color: 'border-indigo-300', bg: 'bg-indigo-50/50' },
  client_review: { id: 'Client Review', title: 'Client Review', color: 'border-purple-300', bg: 'bg-purple-50/50' },
  interview: { id: 'Interview', title: 'Interview', color: 'border-orange-300', bg: 'bg-orange-50/50' },
  offer: { id: 'Offer', title: 'Offer / Hired', color: 'border-emerald-300', bg: 'bg-emerald-50/50' },
  rejected: { id: 'Rejected', title: 'Rejected', color: 'border-red-300', bg: 'bg-red-50/50' } 
};

const RecruiterKanban = ({ jobId, jobTitle, onBack, onAddCandidate }) => {
  
  // 1. GET FULL JOB DETAILS FROM STORE
  const jobs = useRecruitmentStore(state => state.jobs);
  const currentJob = jobs.find(j => j.id === jobId);

  const allCandidates = useRecruitmentStore(state => state.candidates);
  const moveCandidate = useRecruitmentStore(state => state.moveCandidate);

  const jobCandidates = useMemo(() => 
    allCandidates.filter(c => c.jobId === jobId), 
  [allCandidates, jobId]);

  const columns = Object.values(COLUMNS_CONFIG).map(colConfig => ({
    ...colConfig,
    candidates: jobCandidates.filter(c => c.status === colConfig.id)
  }));

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // STATE FOR JOB DETAIL MODAL
  const [showJobDetails, setShowJobDetails] = useState(false);

  const stagesList = Object.values(COLUMNS_CONFIG).map(c => c.id);

  const getNextStage = (currentStageId) => {
    if (currentStageId === 'Rejected') return null; 
    const idx = stagesList.indexOf(currentStageId);
    if (stagesList[idx + 1] === 'Rejected') return null; 
    return idx < stagesList.length - 1 ? stagesList[idx + 1] : null;
  };

  const getPrevStage = (currentStageId) => {
    if (currentStageId === 'Rejected') return 'Screening'; 
    const idx = stagesList.indexOf(currentStageId);
    return idx > 0 ? stagesList[idx - 1] : null;
  };

  const handleDragStart = (e, candidateId) => {
    e.dataTransfer.setData("candidateId", candidateId);
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();
    const candidateId = Number(e.dataTransfer.getData("candidateId"));
    if (candidateId) {
      moveCandidate(candidateId, newStage);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col relative">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onBack} className="text-slate-500 text-xs font-bold hover:text-indigo-600 mb-1 flex items-center gap-1">
             &larr; Back to Requisitions
          </button>
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {jobTitle} 
            </h2>
            
            {/* NEW BUTTON: VIEW JOB DETAILS */}
            <button 
              onClick={() => setShowJobDetails(true)}
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition"
            >
              <FileText className="w-3 h-3" /> View JD & Requirements
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Filter candidates..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48" />
          </div>
          <button 
            onClick={onAddCandidate} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Candidate
          </button>
        </div>
      </div>

      {/* BOARD AREA */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex gap-4 min-w-[1500px] h-full"> 
          {columns.map((col) => (
            <div 
              key={col.id} 
              onDragOver={(e) => e.preventDefault()} 
              onDrop={(e) => handleDrop(e, col.id)}
              className={`flex-1 min-w-[280px] flex flex-col rounded-xl border ${col.color} bg-slate-50 h-full`}
            >
              <div className={`p-3 border-b ${col.color} flex justify-between items-center ${col.bg} rounded-t-xl`}>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-sm ${col.id === 'Rejected' ? 'text-red-700' : 'text-slate-700'}`}>{col.title}</h3>
                  <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-slate-500 shadow-sm">{col.candidates.length}</span>
                </div>
                <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                {col.candidates.map((candidate) => (
                  <div 
                    key={candidate.id} 
                    draggable 
                    onDragStart={(e) => handleDragStart(e, candidate.id)}
                    onClick={() => setSelectedCandidate(candidate)} 
                    className={`bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition group relative cursor-grab active:cursor-grabbing ${col.id === 'Rejected' ? 'border-red-100 opacity-75' : 'border-slate-200'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${col.id === 'Rejected' ? 'bg-red-100 text-red-700' : candidate.match >= 90 ? 'bg-green-100 text-green-700' : candidate.match >= 80 ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'}`}>
                        {candidate.match}% Match
                      </span>
                    </div>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200">{candidate.name.charAt(0)}</div>
                      <div>
                        <h4 className={`text-sm font-bold leading-tight group-hover:text-indigo-600 transition ${col.id === 'Rejected' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{candidate.name}</h4>
                        <p className="text-xs text-slate-500">{candidate.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50">
                       {col.id !== 'Sourced' && (
                         <button 
                           onClick={(e) => { e.stopPropagation(); const prev = getPrevStage(col.id); if (prev) moveCandidate(candidate.id, prev); }}
                           className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                           title="Move Back"
                         >
                           <ArrowLeft className="w-3 h-3" />
                         </button>
                       )}
                       <div className="flex-1"></div>
                       {col.id !== 'Offer' && col.id !== 'Rejected' && (
                         <button 
                           onClick={(e) => { e.stopPropagation(); const next = getNextStage(col.id); if (next) moveCandidate(candidate.id, next); }}
                           className="flex items-center gap-1 text-[10px] font-bold bg-slate-900 text-white px-3 py-1.5 rounded hover:bg-emerald-600 transition"
                         >
                           Move Next <ArrowRight className="w-3 h-3" />
                         </button>
                       )}
                    </div>
                  </div>
                ))}
                
                {col.candidates.length === 0 && (
                  <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-lg">
                    <p className="text-xs text-slate-300 font-medium">Empty</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CANDIDATE DRAWER */}
      {selectedCandidate && (
        <RecruiterCandidateDetail 
          candidate={selectedCandidate} 
          onClose={() => setSelectedCandidate(null)} 
        />
      )}

      {/* JOB DETAILS MODAL (NEW) */}
      {showJobDetails && currentJob && (
        <RecruiterJobDetailModal 
          job={currentJob} 
          onClose={() => setShowJobDetails(false)} 
        />
      )}

    </div>
  );
};

export default RecruiterKanban;