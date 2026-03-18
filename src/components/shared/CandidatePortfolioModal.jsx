import React, { useState, useRef, useEffect } from 'react';
import {
  X, User, BrainCircuit, Video, FileText, MessageSquare,
  Play, Send, MapPin, Mail, Phone, Star, Zap, Target,
  DollarSign, BookOpen, Briefcase, ExternalLink, ChevronDown
} from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';

const TABS = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'analysis', label: 'Analysis', icon: BrainCircuit },
  { id: 'video', label: 'Video Pitch', icon: Video },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'chat', label: 'Chat', icon: MessageSquare }
];

const CandidatePortfolioModal = ({ candidate: candidateProp, job, onClose, viewerPortal = 'recruiter' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [chatText, setChatText] = useState('');
  const chatEndRef = useRef(null);

  const addComment = useRecruitmentStore(state => state.addComment);
  // Read candidate live from store so comments update in real-time
  const candidateFromStore = useRecruitmentStore(state =>
    state.candidates.find(c => c.id === candidateProp?.id)
  );
  const candidate = candidateFromStore || candidateProp;

  const deepAnalysis = candidate?.aiAnalysis || null;

  useEffect(() => {
    if (activeTab === 'chat' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab, candidate?.comments]);

  const handleSendComment = () => {
    const trimmed = chatText.trim();
    if (!trimmed || !candidate?.id) return;
    const authorName = viewerPortal === 'recruiter' ? 'Recruiter' : 'Hiring Manager';
    addComment(candidate.id, trimmed, authorName);
    setChatText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  if (!candidate) return null;

  const matchColor = candidate.match >= 85
    ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
    : candidate.match >= 70
    ? 'text-amber-600 bg-amber-50 border-amber-200'
    : 'text-red-500 bg-red-50 border-red-200';

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-4xl h-[90vh] sm:h-[85vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0A66C2]/20 to-indigo-100 dark:from-[#0A66C2]/30 dark:to-indigo-900/30 flex items-center justify-center font-black text-lg text-[#0A66C2]">
              {candidate.name?.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white leading-tight">{candidate.name}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.role} {job ? `· ${job.title}` : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {candidate.match && (
              <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${matchColor}`}>
                {candidate.match}% match
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 shrink-0 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-[#0A66C2] text-[#0A66C2]'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="p-5 space-y-5 animate-in fade-in">
              {/* Bio card */}
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A66C2]/20 to-indigo-100 dark:from-[#0A66C2]/30 dark:to-indigo-900/30 flex items-center justify-center font-black text-3xl text-[#0A66C2] shrink-0">
                  {candidate.name?.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{candidate.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{candidate.role}</p>
                  {candidate.location && (
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin size={11} /> {candidate.location}
                    </p>
                  )}
                </div>
                {candidate.match && (
                  <div className={`text-center px-3 py-2 rounded-xl border ${matchColor}`}>
                    <p className="text-xs font-bold opacity-60 uppercase tracking-wider">Match</p>
                    <p className="text-2xl font-black">{candidate.match}%</p>
                  </div>
                )}
              </div>

              {/* Contact */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Contact</p>
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
              </div>

              {/* Summary */}
              {candidate.summary && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Summary</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{candidate.summary}</p>
                </div>
              )}

              {/* Logistics */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Logistics</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Notice Period', value: candidate.noticePeriod },
                    { label: 'Current CTC', value: candidate.currentCTC },
                    { label: 'Expected CTC', value: candidate.expectedCTC },
                    { label: 'Experience', value: candidate.totalExp },
                    { label: 'Education', value: candidate.education },
                    { label: 'Current Org', value: candidate.currentOrg },
                    { label: 'Work Preference', value: candidate.workPreference }
                  ].filter(i => i.value).map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-medium text-slate-800 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANALYSIS */}
          {activeTab === 'analysis' && (
            <div className="p-5 space-y-4 animate-in fade-in">
              {!deepAnalysis ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <BrainCircuit className="w-12 h-12 text-slate-200 dark:text-slate-700 mb-4" />
                  <p className="text-slate-500 font-medium">No AI analysis available yet.</p>
                  <p className="text-xs text-slate-400 mt-1">Run analysis from the Recruiter portal to see results here.</p>
                </div>
              ) : (
                <>
                  {/* AI Decision Banner */}
                  {deepAnalysis.aiDecision && (
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-bold text-sm ${
                      deepAnalysis.aiDecision.toLowerCase().includes('strong') || deepAnalysis.aiDecision.toLowerCase().includes('recommend')
                        ? 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400'
                        : deepAnalysis.aiDecision.toLowerCase().includes('good') || deepAnalysis.aiDecision.toLowerCase().includes('consider')
                        ? 'text-[#0A66C2] bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                        : 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
                    }`}>
                      <Zap className="w-4 h-4 shrink-0" />
                      <span>{deepAnalysis.aiDecision}</span>
                    </div>
                  )}

                  {/* Match Explanation */}
                  {deepAnalysis.matchExplanation && (
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Star size={11} /> Match Analysis
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{deepAnalysis.matchExplanation}</p>
                    </div>
                  )}

                  {/* JD Skill Comparison */}
                  {deepAnalysis.jdComparison && (
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Target size={11} /> JD Skill Comparison
                      </p>
                      {(deepAnalysis.jdComparison.candidateHas || []).length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">Has</p>
                          <div className="flex flex-wrap gap-1.5">
                            {deepAnalysis.jdComparison.candidateHas.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold rounded-full border border-emerald-200">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {(deepAnalysis.jdComparison.missingSkills || []).length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1.5">Missing</p>
                          <div className="flex flex-wrap gap-1.5">
                            {deepAnalysis.jdComparison.missingSkills.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[11px] font-bold rounded-full border border-red-200">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {(deepAnalysis.jdComparison.additionalSkills || []).length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1.5">Additional</p>
                          <div className="flex flex-wrap gap-1.5">
                            {deepAnalysis.jdComparison.additionalSkills.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[11px] font-bold rounded-full border border-blue-200">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CTC & Notice Period Fit */}
                  {deepAnalysis.ctcAnalysis && (
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                        <DollarSign size={11} /> CTC & Notice Period Fit
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-500">Job Budget</span>
                          <span className="font-medium">{deepAnalysis.ctcAnalysis.jobMinCTC} – {deepAnalysis.ctcAnalysis.jobMaxCTC}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-500">Candidate Expects</span>
                          <span className="font-medium">{deepAnalysis.ctcAnalysis.candidateExpectedCTC}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-500">CTC Fit</span>
                          <span className={`font-bold ${deepAnalysis.ctcAnalysis.ctcFit?.toLowerCase().includes('within') ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {deepAnalysis.ctcAnalysis.ctcFit}
                          </span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-500">Job Notice Req.</span>
                          <span className="font-medium">{deepAnalysis.noticePeriodAnalysis?.jobRequirement}</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span className="text-slate-500">Candidate Notice</span>
                          <span className={`font-bold ${deepAnalysis.noticePeriodAnalysis?.noticeFit?.toLowerCase().includes('meets') ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {deepAnalysis.noticePeriodAnalysis?.candidateNoticePeriod} ({deepAnalysis.noticePeriodAnalysis?.noticeFit})
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Education + Experience */}
                  {(deepAnalysis.educationAnalysis || deepAnalysis.experienceAnalysis) && (
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                      {deepAnalysis.educationAnalysis && (
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><BookOpen size={11} /> Education</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{deepAnalysis.educationAnalysis}</p>
                        </div>
                      )}
                      {deepAnalysis.experienceAnalysis && (
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Briefcase size={11} /> Experience</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{deepAnalysis.experienceAnalysis}</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* TAB: VIDEO PITCH */}
          {activeTab === 'video' && (
            <div className="p-5 animate-in fade-in">
              {candidate.videoUrl ? (
                <div className="rounded-xl overflow-hidden bg-black shadow-lg">
                  <video
                    controls
                    src={candidate.videoUrl}
                    className="w-full rounded-xl"
                    style={{ maxHeight: '60vh' }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-900 rounded-xl text-white">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <Play size={28} className="text-white/60 ml-1" />
                  </div>
                  <p className="font-bold text-white/70">No video pitch on file</p>
                  <p className="text-xs text-white/40 mt-1">Candidate has not uploaded a video introduction.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: RESUME */}
          {activeTab === 'resume' && (
            <div className="p-5 animate-in fade-in space-y-4">
              {candidate.resumeUrl && candidate.resumeUrl !== '#' ? (
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <iframe
                    src={candidate.resumeUrl}
                    className="w-full"
                    style={{ height: '55vh' }}
                    title="Resume"
                  />
                  <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <a
                      href={candidate.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:underline"
                    >
                      <ExternalLink size={12} /> Open in new tab
                    </a>
                  </div>
                </div>
              ) : candidate.resumeText ? (
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Resume Text</p>
                  <pre className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap font-mono leading-relaxed overflow-y-auto max-h-[55vh]">
                    {candidate.resumeText}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FileText className="w-12 h-12 text-slate-200 dark:text-slate-700 mb-4" />
                  <p className="text-slate-500 font-medium">No resume on file</p>
                  <p className="text-xs text-slate-400 mt-1">Candidate has not uploaded a resume.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: CHAT */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full">
              {/* Messages */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[300px]">
                {(!candidate.comments || candidate.comments.length === 0) ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MessageSquare className="w-10 h-10 text-slate-200 dark:text-slate-700 mb-3" />
                    <p className="text-slate-400 text-sm font-medium">No messages yet</p>
                    <p className="text-xs text-slate-300 mt-1">Start the conversation below</p>
                  </div>
                ) : (
                  candidate.comments.map((comment) => {
                    const isRecruiter = comment.author === 'Recruiter';
                    const isCurrentViewer = (viewerPortal === 'recruiter' && isRecruiter) || (viewerPortal === 'client' && !isRecruiter);
                    return (
                      <div
                        key={comment.id}
                        className={`flex ${isCurrentViewer ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm ${
                          isRecruiter
                            ? 'bg-[#0A66C2] text-white rounded-br-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm'
                        }`}>
                          <p className={`text-[10px] font-bold mb-0.5 ${isRecruiter ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'}`}>
                            {comment.author}
                          </p>
                          <p className="text-sm leading-relaxed">{comment.text}</p>
                          <p className={`text-[9px] mt-1 text-right ${isRecruiter ? 'text-white/50' : 'text-slate-400'}`}>
                            {comment.timestamp}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-slate-200 dark:border-slate-800 p-4 flex gap-3 items-end bg-white dark:bg-slate-900 shrink-0">
                <textarea
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message as ${viewerPortal === 'recruiter' ? 'Recruiter' : 'Hiring Manager'}...`}
                  rows={2}
                  className="flex-1 resize-none border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-[#0A66C2] dark:text-white placeholder:text-slate-400 transition-colors"
                />
                <button
                  onClick={handleSendComment}
                  disabled={!chatText.trim()}
                  className={`p-3 rounded-xl transition-all ${
                    chatText.trim()
                      ? 'bg-[#0A66C2] hover:bg-[#004182] text-white shadow-md active:scale-95'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CandidatePortfolioModal;
