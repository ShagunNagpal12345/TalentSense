import React, { useState } from 'react';
import {
  ArrowLeft, MapPin, Mail, Phone, Star, Award, Brain,
  Play, Pause, Volume2, Maximize2, Calendar,
  CheckCircle, TrendingUp, FileText, Briefcase, GraduationCap,
  ChevronRight, Zap, Shield, Users, Sparkles, Clock
} from 'lucide-react';
import { useRecruiterStore, DETAILED_PROFILES } from '../../core/stores/recruiterStore';

// Psychometric score bar
const PsychoBar = ({ label, value, color = 'bg-[#0A66C2]' }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</span>
      <span className="text-xs font-black text-slate-900 dark:text-white">{value}%</span>
    </div>
    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

// Circular ATS score ring
const ATSRing = ({ score }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? '#057642' : score >= 75 ? '#F59E0B' : '#EF4444';

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={radius} stroke="#E2E8F0" strokeWidth="8" fill="none" />
        <circle
          cx="44" cy="44" r={radius}
          stroke={color} strokeWidth="8" fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black text-slate-900 dark:text-white leading-none">{score}%</span>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">ATS</span>
      </div>
    </div>
  );
};

// Mock video player
const VideoPitchPlayer = ({ candidateName }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden bg-slate-900 relative group">
      {/* Video area */}
      <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 relative">
        {/* Mock thumbnail overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />
          {/* Candidate name overlay */}
          <div className="absolute bottom-3 left-4">
            <p className="text-white text-xs font-bold">{candidateName}</p>
            <p className="text-slate-400 text-[10px]">2:34 · Video Pitch</p>
          </div>
          {/* Play button */}
          <button
            onClick={() => setPlaying(!playing)}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center hover:bg-white/30 transition-all active:scale-95 z-10 group-hover:scale-110"
          >
            {playing
              ? <Pause className="w-7 h-7 text-white fill-white" />
              : <Play className="w-7 h-7 text-white fill-white ml-1" />
            }
          </button>
          {/* Mock waveform decorations */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-0.5 opacity-30">
            {[3, 6, 4, 8, 5, 9, 6, 4, 7, 5, 8, 6, 3, 7, 5, 4, 6, 8, 5, 7].map((h, i) => (
              <div key={i} className="w-1 bg-white rounded-full" style={{ height: `${h * 2}px` }} />
            ))}
          </div>
        </div>
      </div>
      {/* Controls bar */}
      <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between gap-3">
        <button onClick={() => setPlaying(!playing)} className="text-white hover:text-[#0A66C2] transition-colors">
          {playing ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
        </button>
        <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden cursor-pointer">
          <div className="h-full w-[35%] bg-[#0A66C2] rounded-full" />
        </div>
        <span className="text-slate-400 text-[10px] font-mono">0:48 / 2:34</span>
        <Volume2 size={14} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
        <Maximize2 size={14} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
      </div>
    </div>
  );
};

const TalentDossier = ({ candidate, onBack, onScheduleInterview }) => {
  const { getDetailedProfile } = useRecruiterStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Try to get the rich profile, fall back to basic candidate data
  const profile = getDetailedProfile(candidate?.id) || DETAILED_PROFILES[candidate?.id] || null;

  const name = profile?.name || candidate?.name || 'Unknown Candidate';
  const headline = profile?.headline || candidate?.role || 'Professional';
  const avatarInitials = profile?.avatarInitials || name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const avatarColor = profile?.avatarColor || 'from-slate-400 to-slate-500';
  const atsScore = profile?.atsScore || candidate?.match || 80;
  const matchScore = profile?.matchScore || candidate?.match || 80;
  const psychometric = profile?.psychometric || {
    leadership: 80, adaptability: 80, teamwork: 80, problemSolving: 80, communication: 80, emotionalIntelligence: 80
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'psychometric', label: 'Psychometric' },
    { id: 'video', label: 'Video Pitch' }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-400">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-[#0A66C2] font-bold text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Matches
      </button>

      {/* HERO CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mb-6">
        {/* Banner */}
        <div className={`h-24 bg-gradient-to-r ${avatarColor} opacity-20`} />
        <div className="px-6 pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-5">
            {/* Avatar */}
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-black text-2xl shadow-lg border-4 border-white dark:border-slate-900 shrink-0`}>
              {avatarInitials}
            </div>
            <div className="flex-1 pt-2 sm:pt-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{name}</h1>
                <span className="flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                  <Star size={10} fill="currentColor" /> {matchScore}% Match
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{headline}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                {(profile?.location || candidate?.location) && (
                  <span className="flex items-center gap-1"><MapPin size={12} /> {profile?.location || candidate?.location}</span>
                )}
                {(profile?.email || candidate?.email) && (
                  <span className="flex items-center gap-1"><Mail size={12} /> {profile?.email || candidate?.email}</span>
                )}
                {profile?.phone && (
                  <span className="flex items-center gap-1"><Phone size={12} /> {profile.phone}</span>
                )}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => onScheduleInterview && onScheduleInterview(candidate)}
                className="flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Calendar size={15} /> Schedule Interview
              </button>
              <button className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl font-bold text-sm transition-all">
                <Mail size={15} /> Contact
              </button>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700">
              <ATSRing score={atsScore} />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">ATS Compliance</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center">
              <div className="text-2xl font-black text-[#0A66C2]">{matchScore}%</div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">AI Match Score</p>
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className={i < Math.round(matchScore / 20) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700'} />
                ))}
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center">
              <div className="text-2xl font-black text-violet-600">{psychometric.leadership}%</div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Leadership Index</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center">
              <div className="text-2xl font-black text-emerald-600">{psychometric.adaptability}%</div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Adaptability</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-slate-100 dark:border-slate-800 px-6 flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap transition-all relative ${
                activeTab === tab.id
                  ? 'text-[#0A66C2]'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A66C2] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="animate-in fade-in duration-300">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* About */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#0A66C2]" /> About
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {profile?.about || 'No summary available.'}
                </p>
              </div>

              {/* Skills */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Zap size={14} className="text-[#0A66C2]" /> Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(profile?.skills || candidate?.skills || []).map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#EDF3F8] dark:bg-slate-800 text-[#0A66C2] dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-100 dark:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {profile?.certifications && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Award size={14} className="text-[#0A66C2]" /> Certifications
                  </h3>
                  <div className="space-y-2">
                    {profile.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Psychometric Summary */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Brain size={14} className="text-[#0A66C2]" /> Psychometric
                </h3>
                <div className="space-y-3">
                  <PsychoBar label="Leadership" value={psychometric.leadership} color="bg-violet-500" />
                  <PsychoBar label="Adaptability" value={psychometric.adaptability} color="bg-emerald-500" />
                  <PsychoBar label="Problem Solving" value={psychometric.problemSolving} color="bg-[#0A66C2]" />
                  <PsychoBar label="Communication" value={psychometric.communication} color="bg-amber-500" />
                  <PsychoBar label="Teamwork" value={psychometric.teamwork} color="bg-teal-500" />
                </div>
              </div>

              {/* Education */}
              {profile?.education && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <GraduationCap size={14} className="text-[#0A66C2]" /> Education
                  </h3>
                  {profile.education.map((edu, i) => (
                    <div key={i} className={i > 0 ? 'mt-3 pt-3 border-t border-slate-100 dark:border-slate-800' : ''}>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">{edu.degree}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{edu.school} · {edu.year}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Briefcase size={14} className="text-[#0A66C2]" /> Work Experience
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800" />
              <div className="space-y-8">
                {(profile?.experience || []).map((exp, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className="w-8 h-8 rounded-full bg-[#EDF3F8] dark:bg-slate-800 border-2 border-[#0A66C2] flex items-center justify-center shrink-0 z-10">
                      <Briefcase size={14} className="text-[#0A66C2]" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-bold text-slate-900 dark:text-white">{exp.role}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 mb-2">
                        <span>{exp.company}</span>
                        <span className="text-slate-300">·</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{exp.years}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
                {(!profile?.experience || profile.experience.length === 0) && (
                  <p className="text-sm text-slate-500 text-center py-8">No experience data available.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PSYCHOMETRIC TAB */}
        {activeTab === 'psychometric' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Brain size={14} className="text-[#0A66C2]" /> Full Psychometric Report
              </h3>
              <div className="space-y-4">
                <PsychoBar label="Leadership" value={psychometric.leadership} color="bg-violet-500" />
                <PsychoBar label="Adaptability" value={psychometric.adaptability} color="bg-emerald-500" />
                <PsychoBar label="Problem Solving" value={psychometric.problemSolving} color="bg-[#0A66C2]" />
                <PsychoBar label="Communication" value={psychometric.communication} color="bg-amber-500" />
                <PsychoBar label="Teamwork" value={psychometric.teamwork} color="bg-teal-500" />
                <PsychoBar label="Emotional Intelligence" value={psychometric.emotionalIntelligence} color="bg-pink-500" />
              </div>
            </div>

            <div className="space-y-4">
              {/* Interpretation Cards */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp size={14} className="text-emerald-500" /> Strengths
                </h3>
                {Object.entries(psychometric)
                  .filter(([, v]) => v >= 85)
                  .map(([key]) => (
                    <div key={key} className="flex items-center gap-2 mb-2">
                      <CheckCircle size={14} className="text-emerald-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300 font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  ))
                }
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Shield size={14} className="text-[#0A66C2]" /> AI Recommendation
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {matchScore >= 90
                    ? `Strong recommendation to advance ${name} to the interview stage. Psychometric profile indicates exceptional alignment with the role requirements.`
                    : matchScore >= 80
                    ? `Candidate shows solid potential. Consider a structured competency interview to validate leadership capabilities before proceeding.`
                    : `Proceed with caution. Recommend a thorough assessment before moving forward.`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIDEO PITCH TAB */}
        {activeTab === 'video' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Play size={14} className="text-[#0A66C2]" /> Video Pitch
                </h3>
                <VideoPitchPlayer candidateName={name} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-3">Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-bold text-slate-900 dark:text-white">2:34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Submitted</span>
                    <span className="font-bold text-slate-900 dark:text-white">3 days ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Clarity Score</span>
                    <span className="font-bold text-emerald-600">93%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Confidence</span>
                    <span className="font-bold text-emerald-600">High</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onScheduleInterview && onScheduleInterview(candidate)}
                className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar size={15} /> Schedule Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentDossier;
