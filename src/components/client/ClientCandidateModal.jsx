import React, { useState, useEffect, useRef } from 'react';
import { 
  X, BrainCircuit, HelpCircle, Briefcase, MapPin, 
  GraduationCap, Clock, DollarSign, FileText, 
  Send, MessageSquare, CheckCircle, AlertCircle, User
} from 'lucide-react';

import { useRecruitmentStore } from '../../core/stores/recruitmentStore';

const ClientCandidateModal = ({ candidate: initialCandidate, onClose }) => {
  const moveCandidate = useRecruitmentStore(state => state.moveCandidate);
  const addComment = useRecruitmentStore(state => state.addComment);
  
  // 1. GET LIVE DATA (CRITICAL FOR CHAT)
  const candidate = useRecruitmentStore(state => 
    state.candidates.find(c => c.id === initialCandidate.id)
  ) || initialCandidate;

  const [newComment, setNewComment] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [candidate.comments]);

  if (!candidate) return null;

  const handleViewResume = () => {
    if (candidate.resumeUrl) window.open(candidate.resumeUrl, '_blank');
    else alert("No original resume file found.");
  };

  const onStatusChange = (newStage) => {
    moveCandidate(candidate.id, newStage);
    onClose(); 
  };

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    addComment(candidate.id, newComment, "Client"); // Author = Client
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row h-full md:h-auto">
        
        {/* LEFT: PROFILE & LOGISTICS */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-slate-100 min-w-0 bg-white">
          
          {/* HEADER */}
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-start shrink-0">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl border border-indigo-100 shadow-sm shrink-0">
                {candidate.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-extrabold text-slate-800 truncate">{candidate.name}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="text-sm text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-bold">{candidate.role || "Candidate"}</span>
                  <span className={`px-2 py-0.5 text-xs font-bold rounded flex items-center gap-1 ${candidate.match >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                   {candidate.match}% Match
                 </span>
                 <span className="px-2 py-0.5 text-xs font-bold bg-slate-200 text-slate-600 rounded">
                   {candidate.stage || candidate.status}
                 </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="md:hidden p-2 hover:bg-slate-200 rounded-full text-slate-400"><X className="w-6 h-6" /></button>
          </div>

          {/* SCROLLABLE BODY (Matched to your Screenshot UI) */}
          <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar flex-1 bg-white">
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              
              {/* Professional Details (Left Column) */}
              <div className="space-y-4">
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-2 mb-4"><User className="w-4 h-4 text-slate-400" /> Candidate Profile</h4>
                  
                  <div><label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name</label><div className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-800">{candidate.name}</div></div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Current Role</label><div className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-800">{candidate.role || "Not specified"}</div></div>
                    <div><label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Exp</label><div className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-800">{candidate.totalExp || "Not specified"}</div></div>
                  </div>

                  <div><label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Current Organization</label><div className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-800">{candidate.currentOrg || "Not specified"}</div></div>
                  
                  <div><label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Education</label><div className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-800">{candidate.education || "Not specified"}</div></div>
              </div>

              {/* Logistics & Expectations (Right Column) */}
              <div className="bg-orange-50/50 dark:bg-orange-50/30 p-6 rounded-2xl border border-orange-100">
                  <h4 className="text-sm font-extrabold text-orange-800 uppercase tracking-wide flex items-center gap-2 mb-6"><Clock className="w-4 h-4 text-orange-600" /> Logistics & Fit</h4>
                  
                  <div className="space-y-4">
                    <div><label className="text-xs font-bold text-orange-800 uppercase tracking-wider block mb-1">Notice Period</label><div className="w-full bg-white border border-orange-200 p-3 rounded-xl text-sm font-bold text-slate-800">{candidate.noticePeriod || "Not specified"}</div></div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs font-bold text-orange-800 uppercase tracking-wider block mb-1">Current CTC</label><div className="w-full bg-white border border-orange-200 p-3 rounded-xl text-sm font-bold text-slate-800">{candidate.currentCTC || "Not specified"}</div></div>
                      <div><label className="text-xs font-bold text-orange-800 uppercase tracking-wider block mb-1">Expected CTC</label><div className="w-full bg-white border border-orange-200 p-3 rounded-xl text-sm font-bold text-slate-800">{candidate.expectedCTC || "Not specified"}</div></div>
                    </div>

                    <div><label className="text-xs font-bold text-orange-800 uppercase tracking-wider block mb-1">Location</label><div className="w-full bg-white border border-orange-200 p-3 rounded-xl text-sm font-bold text-slate-800">{candidate.location || "Remote"}</div></div>
                  </div>
              </div>
            </div>

            {/* AI Summary (Full Width) */}
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3 uppercase tracking-wide"><BrainCircuit className="w-4 h-4 text-blue-600" /> AI Assessment</h3>
              <p className="text-blue-800 leading-relaxed text-sm font-medium">{candidate.summary || "AI analysis pending..."}</p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Skills Detected</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills && candidate.skills.length > 0 ? candidate.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold shadow-sm">{skill}</span>
                )) : <span className="text-sm text-slate-400 italic">No specific skills extracted.</span>}
              </div>
            </div>

            {/* Suggested Interview Questions */}
            {candidate.interviewQuestions && candidate.interviewQuestions.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Suggested Interview Questions</h3>
                <ul className="space-y-3">
                  {candidate.interviewQuestions.map((q, i) => (
                    <li key={i} className="text-sm text-slate-700 flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">
                      <span className="font-bold text-indigo-500 shrink-0">Q{i+1}.</span>{q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* View Resume Link */}
            {candidate.resumeUrl && (
              <div className="text-center pt-4">
                 <button onClick={handleViewResume} className="inline-flex items-center justify-center gap-2 text-indigo-600 font-bold text-sm hover:text-indigo-800 transition">
                   <FileText className="w-4 h-4" /> View Original Resume PDF
                 </button>
              </div>
            )}
          </div>

          {/* ACTION FOOTER */}
          <div className="px-6 py-4 border-t border-slate-100 bg-white flex gap-3 shrink-0">
            <button onClick={() => onStatusChange('Interview')} className="flex-1 py-3.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition shadow-sm flex justify-center items-center gap-2">Shortlist</button>
            <button onClick={() => onStatusChange('Offer')} className="flex-1 py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex justify-center items-center gap-2"><CheckCircle className="w-5 h-5"/> Offer</button>
            <button onClick={() => onStatusChange('Rejected')} className="flex-1 py-3.5 bg-white border-2 border-red-100 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 transition shadow-sm flex justify-center items-center gap-2"><AlertCircle className="w-5 h-5"/> Reject</button>
          </div>
        </div>

        {/* RIGHT: CHAT (Untouched Logic) */}
        <div className="w-full md:w-[400px] bg-slate-50 flex flex-col border-l border-slate-200 h-[50vh] md:h-auto shrink-0">
          <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center shrink-0 h-[89px]">
             <h3 className="font-bold text-slate-800 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-indigo-600"/> Recruiter Chat</h3>
             <button onClick={onClose} className="hidden md:block text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition"><X className="w-5 h-5"/></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {(!candidate.comments || candidate.comments.length === 0) ? (
              <div className="text-center mt-20 opacity-50 flex flex-col items-center justify-center h-full">
                <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center mb-4"><MessageSquare className="w-6 h-6 text-slate-400" /></div>
                <p className="text-sm text-slate-500 font-bold mb-1">No messages yet</p>
                <p className="text-xs text-slate-400">Start a discussion with the recruiter.</p>
              </div>
            ) : (
              candidate.comments.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.author === 'Client' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm max-w-[90%] shadow-sm leading-relaxed ${msg.author === 'Client' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1.5 font-bold px-1 uppercase tracking-wider">{msg.author === 'Client' ? 'You' : 'Recruiter'} • {msg.timestamp}</span>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <div className="flex gap-2 items-center bg-slate-50 rounded-xl px-2 py-1.5 border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition">
              <input value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendComment()} placeholder="Type a note to recruiter..." className="flex-1 bg-transparent border-none px-2 py-2 text-sm focus:ring-0 outline-none text-slate-700 placeholder:text-slate-400 font-medium" />
              <button onClick={handleSendComment} disabled={!newComment.trim()} className={`p-2.5 rounded-lg transition ${newComment.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientCandidateModal;