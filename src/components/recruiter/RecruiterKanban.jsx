import React, { useMemo, useState } from 'react';
import {
  MoreHorizontal, Plus, Search,
  ArrowRight, Briefcase, ArrowLeft, XCircle, FileText,
  X, User, Mail, Phone, MapPin, Calendar, Video, Link, CheckCircle,
  BrainCircuit, Clock, Star
} from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
import { useScheduleStore } from '../../core/stores/scheduleStore';
import { useApplicationStore } from '../../core/stores/applicationStore';

import RecruiterCandidateDetail from './RecruiterCandidateDetail';
import RecruiterJobDetailModal from './RecruiterJobDetailModal';

const COLUMNS_CONFIG = {
  sourced: { id: 'Sourced', title: 'Sourced', color: 'border-slate-300', bg: 'bg-slate-50' },
  screening: { id: 'Screening', title: 'Screening', color: 'border-indigo-300', bg: 'bg-indigo-50/50' },
  client_review: { id: 'Client Review', title: 'Client Review', color: 'border-purple-300', bg: 'bg-purple-50/50' },
  interview: { id: 'Interview', title: 'Interview', color: 'border-orange-300', bg: 'bg-orange-50/50' },
  offer: { id: 'Offer', title: 'Offer / Hired', color: 'border-emerald-300', bg: 'bg-emerald-50/50' },
  rejected: { id: 'Rejected', title: 'Rejected', color: 'border-red-300', bg: 'bg-red-50/50' }
};

const INTERVIEW_TYPES = [
  { id: 'video', label: 'Video Call' },
  { id: 'phone', label: 'Phone Screen' },
  { id: 'onsite', label: 'On-Site' }
];

// Candidate Dossier Drawer (Feature 5)
const CandidateDossierDrawer = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 h-full overflow-y-auto shadow-2xl border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">{candidate.name}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Match Score */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 flex items-center justify-between border border-indigo-100 dark:border-indigo-800/50">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-indigo-600" />
              <span className="font-bold text-slate-800 dark:text-white text-sm">Match Score</span>
            </div>
            <span className={`text-2xl font-black ${candidate.match >= 85 ? 'text-emerald-600' : candidate.match >= 70 ? 'text-amber-600' : 'text-red-500'}`}>
              {candidate.match}%
            </span>
          </div>

          {/* Contact Info */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact</h3>
            {candidate.email && (
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Mail size={13} className="text-slate-400 shrink-0" /> {candidate.email}
              </div>
            )}
            {candidate.phone && (
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Phone size={13} className="text-slate-400 shrink-0" /> {candidate.phone}
              </div>
            )}
            {candidate.location && (
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <MapPin size={13} className="text-slate-400 shrink-0" /> {candidate.location}
              </div>
            )}
          </div>

          {/* Logistics */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Logistics</h3>
            {[
              { label: 'Notice Period', value: candidate.noticePeriod },
              { label: 'Current CTC', value: candidate.currentCTC },
              { label: 'Expected CTC', value: candidate.expectedCTC },
              { label: 'Experience', value: candidate.totalExp },
              { label: 'Education', value: candidate.education }
            ].map(({ label, value }) => value && (
              <div key={label} className="flex justify-between text-sm border-b border-slate-50 dark:border-slate-700/50 py-1.5 last:border-0">
                <span className="text-slate-500 dark:text-slate-400">{label}</span>
                <span className="font-medium text-slate-800 dark:text-white">{value}</span>
              </div>
            ))}
          </div>

          {/* AI Analysis */}
          {candidate.aiAnalysis && (
            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800/50 p-4">
              <h3 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <BrainCircuit size={12} /> AI Analysis
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2 font-medium">
                {candidate.aiAnalysis.aiDecision}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {candidate.aiAnalysis.matchExplanation}
              </p>
            </div>
          )}

          {/* Interview Scheduled */}
          {candidate.interviewScheduled && (
            <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-200 dark:border-orange-800/50 p-4">
              <h3 className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Calendar size={12} /> Interview Scheduled
              </h3>
              <div className="space-y-1 text-sm">
                <p className="text-slate-700 dark:text-slate-300"><strong>Date:</strong> {candidate.interviewScheduled.date}</p>
                <p className="text-slate-700 dark:text-slate-300"><strong>Time:</strong> {candidate.interviewScheduled.time}</p>
                <p className="text-slate-700 dark:text-slate-300"><strong>Type:</strong> {candidate.interviewScheduled.type}</p>
                {candidate.interviewScheduled.meetingLink && (
                  <a href={candidate.interviewScheduled.meetingLink} target="_blank" rel="noreferrer" className="text-[#0A66C2] text-xs font-bold hover:underline flex items-center gap-1 mt-1">
                    <Link size={11}/> Join Meeting
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Resume Text */}
          {candidate.resumeText && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Resume Preview</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                {candidate.resumeText.substring(0, 400)}...
              </p>
            </div>
          )}

          {/* Comments */}
          {candidate.comments && candidate.comments.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Comments</h3>
              {candidate.comments.map((c) => (
                <div key={c.id} className="text-xs text-slate-600 dark:text-slate-400 py-2 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
                  <span className="font-bold text-slate-800 dark:text-white">{c.author}:</span> {c.text}
                  <span className="ml-2 text-slate-400">{c.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Schedule Interview Modal (Feature 6)
const ScheduleInterviewModal = ({ candidate, jobTitle, onClose, onScheduled }) => {
  const scheduleInterview = useScheduleStore(state => state.scheduleInterview);
  const updateCandidate = useRecruitmentStore(state => state.updateCandidate);
  const updateStatusByJobId = useApplicationStore(state => state.updateStatusByJobId);

  const today = new Date();
  const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [form, setForm] = useState({
    date: '',
    time: '10:00',
    type: 'video',
    meetingLink: '',
    duration: 45,
    interviewer: 'Jamie Davidson'
  });
  const [saved, setSaved] = useState(false);

  const handleConfirm = () => {
    if (!form.date || !form.time) return;

    const interviewData = {
      candidateId: candidate.id,
      candidateName: candidate.name,
      jobTitle: jobTitle,
      date: new Date(form.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: form.time,
      type: form.type,
      meetingLink: form.meetingLink,
      duration: form.duration,
      interviewer: form.interviewer
    };

    // Save to schedule store
    scheduleInterview(interviewData);

    // Update candidate record
    updateCandidate(candidate.id, {
      status: 'Interview',
      stage: 'Interview',
      interviewScheduled: {
        date: interviewData.date,
        time: form.time,
        type: form.type,
        meetingLink: form.meetingLink
      }
    });

    // Sync to application store
    if (candidate.jobId) {
      updateStatusByJobId(candidate.jobId, 'interviewing');
    }

    setSaved(true);
    setTimeout(() => {
      onScheduled?.();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar size={16} className="text-indigo-600" /> Schedule Interview
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{candidate.name} — {jobTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {saved ? (
            <div className="text-center py-6">
              <CheckCircle size={40} className="text-emerald-500 mx-auto mb-3" />
              <p className="font-bold text-slate-800 dark:text-white">Interview Scheduled!</p>
              <p className="text-xs text-slate-500 mt-1">Moving candidate to Interview stage...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Date *</label>
                  <input
                    type="date"
                    min={minDate}
                    value={form.date}
                    onChange={e => setForm({...form, date: e.target.value})}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-indigo-500 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Time *</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={e => setForm({...form, time: e.target.value})}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-indigo-500 text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Interview Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {INTERVIEW_TYPES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setForm({...form, type: t.id})}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all ${
                        form.type === t.id
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Meeting Link / Location</label>
                <input
                  type="text"
                  value={form.meetingLink}
                  onChange={e => setForm({...form, meetingLink: e.target.value})}
                  placeholder="https://meet.google.com/... or office address"
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-indigo-500 text-slate-800 dark:text-white placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Interviewer</label>
                <input
                  type="text"
                  value={form.interviewer}
                  onChange={e => setForm({...form, interviewer: e.target.value})}
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-indigo-500 text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!form.date || !form.time}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    form.date && form.time
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Confirm Interview
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Kanban Component
const RecruiterKanban = ({ jobId, jobTitle, onBack, onAddCandidate }) => {

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
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [dossierCandidate, setDossierCandidate] = useState(null);       // Feature 5
  const [scheduleCandidate, setScheduleCandidate] = useState(null);     // Feature 6

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
    const candidateId = e.dataTransfer.getData("candidateId");
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
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              {jobTitle}
            </h2>
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
            <input type="text" placeholder="Filter candidates..." className="pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 dark:text-white w-48" />
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
              className={`flex-1 min-w-[280px] flex flex-col rounded-xl border ${col.color} bg-slate-50 dark:bg-slate-900/50 h-full`}
            >
              <div className={`p-3 border-b ${col.color} flex justify-between items-center ${col.bg} rounded-t-xl`}>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-sm ${col.id === 'Rejected' ? 'text-red-700' : 'text-slate-700 dark:text-slate-200'}`}>{col.title}</h3>
                  <span className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full text-xs font-bold text-slate-500 dark:text-slate-400 shadow-sm">{col.candidates.length}</span>
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><MoreHorizontal className="w-4 h-4" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                {col.candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, candidate.id)}
                    className={`bg-white dark:bg-slate-900 p-4 rounded-lg border shadow-sm hover:shadow-md transition group relative cursor-grab active:cursor-grabbing ${col.id === 'Rejected' ? 'border-red-100 dark:border-red-900/30 opacity-75' : 'border-slate-200 dark:border-slate-800'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${col.id === 'Rejected' ? 'bg-red-100 text-red-700' : candidate.match >= 90 ? 'bg-green-100 text-green-700' : candidate.match >= 80 ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'}`}>
                        {candidate.match}% Match
                      </span>
                      {candidate.interviewScheduled && (
                        <span className="text-[9px] font-bold bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Calendar size={8} /> Sched.
                        </span>
                      )}
                    </div>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        {/* Feature 5: Clickable name opens dossier */}
                        <button
                          onClick={() => setDossierCandidate(candidate)}
                          className={`text-sm font-bold leading-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition text-left ${col.id === 'Rejected' ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-white'}`}
                        >
                          {candidate.name}
                        </button>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50 dark:border-slate-800">
                       {col.id !== 'Sourced' && (
                         <button
                           onClick={(e) => { e.stopPropagation(); const prev = getPrevStage(col.id); if (prev) moveCandidate(candidate.id, prev); }}
                           className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                           title="Move Back"
                         >
                           <ArrowLeft className="w-3 h-3" />
                         </button>
                       )}

                       {/* Feature 6: Schedule Interview button */}
                       <button
                         onClick={(e) => { e.stopPropagation(); setScheduleCandidate(candidate); }}
                         className="p-1.5 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                         title="Schedule Interview"
                       >
                         <Calendar className="w-3 h-3" />
                       </button>

                       <div className="flex-1"></div>

                       {col.id !== 'Offer' && col.id !== 'Rejected' && (
                         <button
                           onClick={(e) => { e.stopPropagation(); const next = getNextStage(col.id); if (next) moveCandidate(candidate.id, next); }}
                           className="flex items-center gap-1 text-[10px] font-bold bg-slate-900 dark:bg-slate-700 text-white px-3 py-1.5 rounded hover:bg-emerald-600 dark:hover:bg-emerald-600 transition"
                         >
                           Move Next <ArrowRight className="w-3 h-3" />
                         </button>
                       )}
                    </div>
                  </div>
                ))}

                {col.candidates.length === 0 && (
                  <div className="text-center py-10 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg">
                    <p className="text-xs text-slate-300 dark:text-slate-600 font-medium">Empty</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OLD CANDIDATE DRAWER (kept for compatibility) */}
      {selectedCandidate && (
        <RecruiterCandidateDetail
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      {/* Feature 5: DOSSIER DRAWER */}
      {dossierCandidate && (
        <CandidateDossierDrawer
          candidate={dossierCandidate}
          onClose={() => setDossierCandidate(null)}
        />
      )}

      {/* Feature 6: SCHEDULE INTERVIEW MODAL */}
      {scheduleCandidate && (
        <ScheduleInterviewModal
          candidate={scheduleCandidate}
          jobTitle={jobTitle}
          onClose={() => setScheduleCandidate(null)}
          onScheduled={() => setScheduleCandidate(null)}
        />
      )}

      {/* JOB DETAILS MODAL */}
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
