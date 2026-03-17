import React, { useState } from 'react';
import {
  ArrowLeft, Play, Pause, ThumbsUp, ThumbsDown,
  Volume2, Maximize2, SkipForward, SkipBack,
  MessageSquare, Send, CheckCircle, X,
  User, Briefcase, Clock, Star, ChevronDown, ChevronUp,
  Calendar, Video
} from 'lucide-react';
import { useRecruiterStore } from '../../core/stores/recruiterStore';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';

// Mock video player component
const VideoPlayer = ({ candidate }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(22);

  return (
    <div className="rounded-2xl overflow-hidden bg-slate-950 shadow-2xl">
      {/* Video canvas area */}
      <div className="aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-black relative flex items-center justify-center group cursor-pointer"
        onClick={() => setPlaying(!playing)}>

        {/* Subtle grid overlay for tech look */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        {/* Candidate name badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${candidate.avatarColor} flex items-center justify-center text-white text-xs font-black shadow-lg`}>
            {candidate.avatarInitials}
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
            <p className="text-white text-xs font-bold leading-tight">{candidate.name}</p>
            <p className="text-slate-400 text-[9px]">{candidate.role}</p>
          </div>
        </div>

        {/* Recording indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-red-600 rounded-full px-2.5 py-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="text-white text-[10px] font-bold uppercase tracking-wider">REC</span>
        </div>

        {/* Center play button */}
        <div className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center transition-all z-10 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          {playing
            ? <Pause className="w-7 h-7 text-white fill-white" />
            : <Play className="w-7 h-7 text-white fill-white ml-1" />
          }
        </div>

        {/* Time overlay */}
        <div className="absolute bottom-3 right-4 bg-black/60 rounded px-2 py-0.5">
          <span className="text-white text-[11px] font-mono">{candidate.videoDuration}</span>
        </div>
      </div>

      {/* Progress + Controls */}
      <div className="bg-slate-900 px-4 py-3">
        {/* Progress bar */}
        <div
          className="w-full h-1.5 bg-slate-700 rounded-full mb-3 cursor-pointer overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
          }}
        >
          <div
            className="h-full bg-[#0A66C2] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-slate-400 hover:text-white transition-colors">
              <SkipBack size={16} />
            </button>
            <button
              onClick={() => setPlaying(!playing)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              {playing ? <Pause size={14} /> : <Play size={14} className="fill-white ml-0.5" />}
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <SkipForward size={16} />
            </button>
            <span className="text-slate-400 text-[11px] font-mono ml-1">
              {Math.floor(progress * 154 / 100 / 60)}:{String(Math.floor(progress * 154 / 100 % 60)).padStart(2, '0')} / {candidate.videoDuration}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Volume2 size={16} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
            <Maximize2 size={16} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Avatar color palette based on name hash
const AVATAR_COLORS = [
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-sky-500 to-blue-600',
  'from-rose-500 to-pink-600',
  'from-indigo-500 to-blue-700',
];
const getAvatarColor = (name = '') => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name = '') => name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

const AsyncVideoReview = ({ onBack, onScheduleInterview }) => {
  const { saveVideoReview, videoReviews } = useRecruiterStore();
  const allCandidates = useRecruitmentStore(state => state.candidates);
  const jobs = useRecruitmentStore(state => state.jobs);

  // Feature 11: Filter candidates with sentToClient===true OR stage==='Client Review'
  const videoQueue = allCandidates.filter(c =>
    c.sentToClient === true || c.status === 'Client Review' || c.stage === 'Client Review'
  ).map(c => ({
    id: c.id,
    name: c.name,
    role: c.role || c.currentRole || 'Candidate',
    appliedFor: jobs.find(j => j.id === c.jobId)?.title || 'Open Position',
    matchScore: c.match || 0,
    avatarInitials: getInitials(c.name),
    avatarColor: getAvatarColor(c.name),
    videoDuration: c.videoDuration || '2:00',
    submittedAgo: c.sentToClientDate || 'Recently',
    pitchSummary: c.summary || 'Candidate submitted for client review.',
    keyHighlights: c.skills?.slice(0, 3) || ['Reviewed by Recruiter'],
    videoIntroUrl: c.videoIntroUrl || null,
    noticePeriod: c.noticePeriod,
    currentCTC: c.currentCTC,
    expectedCTC: c.expectedCTC,
    location: c.location,
  }));

  const [selectedCandidate, setSelectedCandidate] = useState(videoQueue[0] || null);
  const [notes, setNotes] = useState('');
  const [notesSubmitted, setNotesSubmitted] = useState(false);
  const [showHighlights, setShowHighlights] = useState(true);

  const currentReview = videoReviews[selectedCandidate?.id];

  const handleDecision = (decision) => {
    saveVideoReview(selectedCandidate.id, decision, notes);
    // Move to next candidate after decision
    const currentIndex = videoQueue.findIndex(c => c.id === selectedCandidate.id);
    if (currentIndex < videoQueue.length - 1) {
      setTimeout(() => {
        setSelectedCandidate(videoQueue[currentIndex + 1]);
        setNotes('');
        setNotesSubmitted(false);
      }, 600);
    }
  };

  const handleSubmitNotes = () => {
    if (!notes.trim()) return;
    saveVideoReview(selectedCandidate.id, currentReview?.decision || null, notes);
    setNotesSubmitted(true);
    setTimeout(() => setNotesSubmitted(false), 2500);
  };

  const getDecisionStyle = (candidateId) => {
    const r = videoReviews[candidateId];
    if (!r) return null;
    if (r.decision === 'shortlist') return 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20';
    if (r.decision === 'reject') return 'border-red-300 bg-red-50 dark:bg-red-900/20';
    return null;
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-slate-950 pb-20 animate-in fade-in duration-400">

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition text-slate-500 dark:text-slate-400">
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Play size={18} className="text-[#0A66C2]" /> Async Video Review
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {videoQueue.length} pitches · {Object.keys(videoReviews).length} reviewed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold">
              <span className="flex items-center gap-1 text-emerald-600">
                <ThumbsUp size={12} fill="currentColor" />
                {Object.values(videoReviews).filter(r => r.decision === 'shortlist').length} Shortlisted
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-red-500">
                <ThumbsDown size={12} fill="currentColor" />
                {Object.values(videoReviews).filter(r => r.decision === 'reject').length} Rejected
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT: Queue */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Review Queue</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {videoQueue.length === 0 && (
                  <div className="p-6 text-center">
                    <Video className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-500">No candidates submitted for review yet.</p>
                    <p className="text-xs text-slate-400 mt-1">Recruiter will send candidates here.</p>
                  </div>
                )}
                {videoQueue.map(c => {
                  const review = videoReviews[c.id];
                  const isActive = selectedCandidate?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCandidate(c); setNotes(review?.notes || ''); setNotesSubmitted(false); }}
                      className={`w-full text-left px-4 py-3.5 transition-colors ${
                        isActive
                          ? 'bg-[#EDF3F8] dark:bg-slate-800'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.avatarColor} flex items-center justify-center text-white text-sm font-black shrink-0`}>
                          {c.avatarInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{c.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">{c.appliedFor}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-[#0A66C2]">{c.matchScore}%</span>
                            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
                              <Clock size={9} />{c.videoDuration}
                            </span>
                          </div>
                        </div>
                        {/* Decision badge */}
                        {review?.decision === 'shortlist' && <ThumbsUp size={14} className="text-emerald-500 fill-emerald-500 shrink-0 mt-0.5" />}
                        {review?.decision === 'reject' && <ThumbsDown size={14} className="text-red-400 fill-red-400 shrink-0 mt-0.5" />}
                        {isActive && !review && <div className="w-1.5 h-1.5 bg-[#0A66C2] rounded-full mt-1.5 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Video + Actions */}
          <div className="lg:col-span-9 space-y-5">

            {/* Empty state when no candidates in queue */}
            {!selectedCandidate && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-16 text-center">
                <Video className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">No Video Reviews Pending</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Candidates submitted for client review (with "sentToClient" flag or in "Client Review" stage) will appear here.
                </p>
              </div>
            )}

            {/* Video Player */}
            {selectedCandidate && <VideoPlayer candidate={selectedCandidate} />}

            {/* Candidate Info + Highlights */}
            {selectedCandidate && <div className={`bg-white dark:bg-slate-900 border-2 ${currentReview?.decision === 'shortlist' ? 'border-emerald-400' : currentReview?.decision === 'reject' ? 'border-red-300' : 'border-slate-200 dark:border-slate-800'} rounded-2xl shadow-sm p-5 transition-colors duration-300`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedCandidate.avatarColor} flex items-center justify-center text-white font-black text-lg shrink-0`}>
                  {selectedCandidate.avatarInitials}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">{selectedCandidate.name}</h2>
                    <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-black flex items-center gap-1">
                      <Star size={9} fill="currentColor" /> {selectedCandidate.matchScore}% Match
                    </span>
                    {currentReview?.decision === 'shortlist' && (
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-black flex items-center gap-1">
                        <CheckCircle size={9} /> Shortlisted
                      </span>
                    )}
                    {currentReview?.decision === 'reject' && (
                      <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-black flex items-center gap-1">
                        <X size={9} /> Rejected
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{selectedCandidate.role} · Applied for <span className="font-bold text-slate-900 dark:text-white">{selectedCandidate.appliedFor}</span></p>
                </div>
                {onScheduleInterview && (
                  <button
                    onClick={() => onScheduleInterview(selectedCandidate)}
                    className="flex items-center gap-2 bg-[#EDF3F8] dark:bg-slate-800 hover:bg-[#0A66C2] hover:text-white text-[#0A66C2] dark:text-blue-400 px-4 py-2 rounded-xl font-bold text-xs transition-all border border-blue-100 dark:border-slate-700 shrink-0"
                  >
                    <Calendar size={13} /> Schedule
                  </button>
                )}
              </div>

              {/* Pitch summary */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {selectedCandidate.pitchSummary}
              </p>

              {/* Highlights collapsible */}
              <button
                onClick={() => setShowHighlights(!showHighlights)}
                className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors mb-2"
              >
                {showHighlights ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                AI Highlights
              </button>
              {showHighlights && (
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.keyHighlights.map((h, i) => (
                    <span key={i} className="text-[11px] font-bold bg-[#EDF3F8] dark:bg-slate-800 text-[#0A66C2] dark:text-blue-400 px-3 py-1 rounded-lg border border-blue-100 dark:border-slate-700">
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>}

            {/* QUICK ACTIONS */}
            {selectedCandidate && <>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDecision('shortlist')}
                className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.97] shadow-sm ${
                  currentReview?.decision === 'shortlist'
                    ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-emerald-900/30'
                    : 'bg-white dark:bg-slate-900 border-2 border-emerald-400 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10'
                }`}
              >
                <ThumbsUp size={18} className={currentReview?.decision === 'shortlist' ? 'fill-white' : ''} />
                {currentReview?.decision === 'shortlist' ? 'Shortlisted' : 'Shortlist'}
              </button>
              <button
                onClick={() => handleDecision('reject')}
                className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.97] shadow-sm ${
                  currentReview?.decision === 'reject'
                    ? 'bg-red-500 text-white shadow-red-200 dark:shadow-red-900/30'
                    : 'bg-white dark:bg-slate-900 border-2 border-red-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10'
                }`}
              >
                <ThumbsDown size={18} className={currentReview?.decision === 'reject' ? 'fill-white' : ''} />
                {currentReview?.decision === 'reject' ? 'Rejected' : 'Reject'}
              </button>
            </div>

            {/* PRIVATE NOTES */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <MessageSquare size={14} className="text-[#0A66C2]" /> Private Notes for Recruiter
              </h3>
              <div className="relative">
                <textarea
                  value={notes}
                  onChange={(e) => { setNotes(e.target.value); setNotesSubmitted(false); }}
                  placeholder="Add your private notes here (only visible to the recruiter)..."
                  rows={3}
                  className="w-full text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A66C2] resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
                />
                {currentReview?.notes && notes === currentReview.notes && (
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 italic">Saved note</p>
                )}
              </div>
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSubmitNotes}
                  disabled={!notes.trim()}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    notes.trim()
                      ? 'bg-[#0A66C2] hover:bg-[#004182] text-white active:scale-95'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {notesSubmitted
                    ? <><CheckCircle size={14} /> Saved!</>
                    : <><Send size={14} /> Save Note</>
                  }
                </button>
              </div>
            </div>
          </>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsyncVideoReview;
