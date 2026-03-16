import React, { useState, useRef, useEffect } from 'react';
import { 
  X, User, Mail, Phone, MapPin, Download, 
  MessageSquare, Send, FileText, CheckCircle, 
  XCircle, ExternalLink, Calendar, Briefcase, BrainCircuit
} from 'lucide-react';

import { useRecruitmentStore } from '../../core/stores/recruitmentStore';

const RecruiterCandidateDetail = ({ candidate: initialCandidate, onClose }) => {
  const moveCandidate = useRecruitmentStore(state => state.moveCandidate);
  const addComment = useRecruitmentStore(state => state.addComment);
  
  // 1. GET LIVE DATA
  const candidate = useRecruitmentStore(state => 
    state.candidates.find(c => c.id === initialCandidate.id)
  ) || initialCandidate;

  const [activeTab, setActiveTab] = useState('overview'); 
  const [chatMsg, setChatMsg] = useState('');
  const [emailSubject, setEmailSubject] = useState(`Update on your application for ${candidate.role}`);
  const [emailBody, setEmailBody] = useState(`Hi ${candidate.name.split(' ')[0]},\n\nWe have reviewed your profile and would like to move you to the next stage.\n\nBest,\nRecruitment Team`);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'client_chat') {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [candidate.comments, activeTab]);

  // 2. SEND AS RECRUITER
  const handleSendChat = () => {
    if (!chatMsg.trim()) return;
    addComment(candidate.id, chatMsg, "Recruiter"); 
    setChatMsg("");
  };

  const handleSendEmail = () => { alert(`Email sent to ${candidate.name}! (Mock Action)`); };
  const handleMoveStage = (newStage) => { moveCandidate(candidate.id, newStage); onClose(); };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40" onClick={onClose}></div>

      <div className="fixed inset-y-0 right-0 w-full md:w-[650px] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col animate-in slide-in-from-right">
        
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-start bg-slate-50">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl border-2 border-white shadow-sm">{candidate.name.charAt(0)}</div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{candidate.name}</h2>
              <p className="text-sm text-slate-500 font-medium">{candidate.role}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {candidate.location || "Remote"}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3"/> {candidate.totalExp || "Exp N/A"}</span>
                <span className={`px-2 py-0.5 rounded font-bold ${candidate.match >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>{candidate.match}% Match</span>
                <span className={`px-2 py-0.5 rounded border text-xs font-bold ${candidate.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>{candidate.status}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition"><X className="w-6 h-6" /></button>
        </div>

        {/* TABS */}
        <div className="flex border-b border-slate-200">
          <button onClick={() => setActiveTab('overview')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition ${activeTab === 'overview' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/30' : 'border-transparent text-slate-500'}`}>Overview & Resume</button>
          <button onClick={() => setActiveTab('client_chat')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition ${activeTab === 'client_chat' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/30' : 'border-transparent text-slate-500'}`}>Client Feedback</button>
          <button onClick={() => setActiveTab('email')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition ${activeTab === 'email' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/30' : 'border-transparent text-slate-500'}`}>Email Candidate</button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex gap-3">
                <button onClick={() => candidate.resumeUrl && window.open(candidate.resumeUrl, '_blank')} className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> Download Resume</button>
                <button className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 flex items-center justify-center gap-2"><ExternalLink className="w-4 h-4" /> LinkedIn Profile</button>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2"><FileText className="w-4 h-4 text-emerald-600" /> Resume Highlights</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><label className="text-xs text-slate-400 font-bold uppercase">Education</label><p className="text-slate-700 font-medium">{candidate.education || "N/A"}</p></div>
                  <div><label className="text-xs text-slate-400 font-bold uppercase">Notice Period</label><p className="text-slate-700 font-medium">{candidate.noticePeriod || "N/A"}</p></div>
                  <div><label className="text-xs text-slate-400 font-bold uppercase">Current CTC</label><p className="text-slate-700 font-medium">{candidate.currentCTC || "N/A"}</p></div>
                  <div><label className="text-xs text-slate-400 font-bold uppercase">Expected CTC</label><p className="text-slate-700 font-medium">{candidate.expectedCTC || "N/A"}</p></div>
                </div>
                <div><label className="text-xs text-slate-400 font-bold uppercase">Key Skills</label><div className="flex flex-wrap gap-2 mt-2">{candidate.skills?.map(s => <span key={s} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold border border-slate-200">{s}</span>)}</div></div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100"><h3 className="font-bold text-emerald-800 text-sm mb-2 flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> AI Summary</h3><p className="text-xs text-emerald-700 leading-relaxed">{candidate.summary}</p></div>
            </div>
          )}

          {activeTab === 'client_chat' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 space-y-4 mb-4 min-h-[300px]">
                {(!candidate.comments || candidate.comments.length === 0) ? (
                  <div className="text-center mt-20 opacity-50"><MessageSquare className="w-10 h-10 mx-auto mb-2 text-slate-300" /><p className="text-sm text-slate-400 italic">No messages yet.</p></div>
                ) : (
                  candidate.comments.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.author === 'Recruiter' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${msg.author === 'Recruiter' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{msg.author.charAt(0)}</div>
                      <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.author === 'Recruiter' ? 'bg-emerald-50 text-slate-800 rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'}`}>
                        <div className="font-bold text-[10px] mb-1 opacity-60 uppercase">{msg.author === 'Recruiter' ? 'You' : 'Client'} • {msg.timestamp}</div>{msg.text}
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="bg-white p-2 border border-slate-200 rounded-lg flex gap-2">
                <input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendChat()} placeholder="Message to client..." className="flex-1 text-sm outline-none px-2"/>
                <button onClick={handleSendChat} className="p-2 bg-slate-900 text-white rounded-md hover:bg-emerald-600 transition"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase">Subject</label><input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"/></div>
              <div className="flex-1 flex flex-col"><label className="text-xs font-bold text-slate-500 uppercase">Message</label><textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} className="w-full mt-1 p-3 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none h-48 resize-none"></textarea></div>
              <div className="flex justify-end gap-3 pt-2"><button className="px-4 py-2 text-slate-500 text-sm font-bold hover:text-slate-800">Save Template</button><button onClick={handleSendEmail} className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 flex items-center gap-2"><Send className="w-4 h-4" /> Send Email</button></div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-400 uppercase">Current: {candidate.status}</span>
          <div className="flex gap-2">
            <button onClick={() => handleMoveStage('Rejected')} className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 rounded-lg text-xs font-bold hover:bg-red-100 flex items-center gap-2"><XCircle className="w-4 h-4" /> Reject</button>
            <button onClick={() => handleMoveStage('Client Review')} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 transition flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Move to Client Review</button>
          </div>
        </div>

      </div>
    </>
  );
};

export default RecruiterCandidateDetail;