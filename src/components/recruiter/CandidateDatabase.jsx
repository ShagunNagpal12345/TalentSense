import React, { useState, useMemo } from 'react';
import { Search, Filter, Mail, Phone, User, BrainCircuit, Download, Briefcase, Activity, X, ChevronDown } from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
import CandidateDetailModal from './CandidateDetailModal';

const EXP_OPTIONS = [
  { value: '', label: 'Any Experience' },
  { value: '0-2', label: '0-2 years' },
  { value: '2-5', label: '2-5 years' },
  { value: '5-10', label: '5-10 years' },
  { value: '10+', label: '10+ years' }
];

const NOTICE_OPTIONS = [
  { value: '', label: 'Any Notice Period' },
  { value: 'immediate', label: 'Immediate' },
  { value: '10-30', label: '10-30 days' },
  { value: '30-60', label: '30-60 days' },
  { value: '60+', label: '60+ days' }
];

// Parse years from a totalExp string like "7 Years" -> 7
const parseExp = (exp) => {
  if (!exp) return null;
  const match = String(exp).match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
};

// Parse CTC value from strings like "₹ 1500000" or "$ 95000" or "15 LPA"
const parseCTC = (ctc) => {
  if (!ctc) return null;
  const cleanStr = String(ctc).replace(/[₹$£€,\s]/g, '');
  // Convert LPA to number (assume LPA = *100000 for INR)
  const lpaMatch = String(ctc).match(/(\d+(?:\.\d+)?)\s*LPA/i);
  if (lpaMatch) return parseFloat(lpaMatch[1]) * 100000;
  const num = parseFloat(cleanStr);
  return isNaN(num) ? null : num;
};

const matchesNotice = (candidateNotice, filterVal) => {
  if (!filterVal || !candidateNotice) return true;
  const n = candidateNotice.toLowerCase();
  if (filterVal === 'immediate') return n.includes('immediate') || n.includes('<10') || n.includes('0');
  if (filterVal === '10-30') return n.includes('10') || n.includes('20') || n.includes('30');
  if (filterVal === '30-60') return n.includes('30') || n.includes('45') || n.includes('60');
  if (filterVal === '60+') return n.includes('60') || n.includes('90') || n.includes('notice');
  return true;
};

const matchesExp = (expStr, filterVal) => {
  if (!filterVal) return true;
  const years = parseExp(expStr);
  if (years === null) return true; // can't filter, show it
  if (filterVal === '0-2') return years >= 0 && years <= 2;
  if (filterVal === '2-5') return years > 2 && years <= 5;
  if (filterVal === '5-10') return years > 5 && years <= 10;
  if (filterVal === '10+') return years > 10;
  return true;
};

const CandidateDatabase = () => {
  const candidates = useRecruitmentStore((state) => state.candidates);
  const jobs = useRecruitmentStore((state) => state.jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Feature 16: Advanced filters
  const [filters, setFilters] = useState({
    experience: '',
    location: '',
    minCTC: '',
    maxCTC: '',
    noticePeriod: ''
  });

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  const clearFilters = () => setFilters({ experience: '', location: '', minCTC: '', maxCTC: '', noticePeriod: '' });

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      // Text search
      const textMatch = !searchTerm ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        c.location?.toLowerCase().includes(searchTerm.toLowerCase());

      if (!textMatch) return false;

      // Experience filter
      if (filters.experience && !matchesExp(c.totalExp, filters.experience)) return false;

      // Location filter
      if (filters.location) {
        const loc = c.location?.toLowerCase() || '';
        const filterLoc = filters.location.toLowerCase();
        if (!loc.includes(filterLoc)) return false;
      }

      // CTC filter
      if (filters.minCTC) {
        const candidateCTC = parseCTC(c.currentCTC);
        if (candidateCTC !== null && candidateCTC < parseFloat(filters.minCTC)) return false;
      }
      if (filters.maxCTC) {
        const candidateCTC = parseCTC(c.currentCTC);
        if (candidateCTC !== null && candidateCTC > parseFloat(filters.maxCTC)) return false;
      }

      // Notice period filter
      if (filters.noticePeriod && !matchesNotice(c.noticePeriod, filters.noticePeriod)) return false;

      return true;
    });
  }, [candidates, searchTerm, filters]);

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Talent Database</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Browse, search, and track all parsed candidates and applications.
            <span className="ml-2 font-bold text-emerald-600 dark:text-emerald-400">{filteredCandidates.length} shown</span>
          </p>
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
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 text-xs font-bold ${
              showFilters || hasActiveFilters
                ? 'bg-emerald-600 text-white border border-emerald-600'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <Filter className="w-4 h-4" />
            {hasActiveFilters && <span>Active</span>}
          </button>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-sm border border-slate-700">
            <Download className="w-4 h-4"/> Export CSV
          </button>
        </div>
      </div>

      {/* Feature 16: Advanced Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-6 shadow-sm animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Filter size={14} className="text-emerald-600" /> Advanced Filters
            </h3>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition">
                <X size={12} /> Clear All Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Experience */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Experience</label>
              <div className="relative">
                <select
                  value={filters.experience}
                  onChange={e => setFilters({...filters, experience: e.target.value})}
                  className="w-full p-2.5 pr-8 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-emerald-500 appearance-none text-slate-800 dark:text-white"
                >
                  {EXP_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Location / Willing to Relocate</label>
              <input
                type="text"
                placeholder="City, Country..."
                value={filters.location}
                onChange={e => setFilters({...filters, location: e.target.value})}
                className="w-full p-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-emerald-500 text-slate-800 dark:text-white placeholder:text-slate-400"
              />
            </div>

            {/* Notice Period */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Notice Period</label>
              <div className="relative">
                <select
                  value={filters.noticePeriod}
                  onChange={e => setFilters({...filters, noticePeriod: e.target.value})}
                  className="w-full p-2.5 pr-8 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-emerald-500 appearance-none text-slate-800 dark:text-white"
                >
                  {NOTICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Min CTC */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Min Current CTC</label>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={filters.minCTC}
                onChange={e => setFilters({...filters, minCTC: e.target.value})}
                className="w-full p-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-emerald-500 text-slate-800 dark:text-white placeholder:text-slate-400"
              />
            </div>

            {/* Max CTC */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Max Current CTC</label>
              <input
                type="number"
                placeholder="e.g. 200000"
                value={filters.maxCTC}
                onChange={e => setFilters({...filters, maxCTC: e.target.value})}
                className="w-full p-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-emerald-500 text-slate-800 dark:text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-3 font-medium">
            Showing {filteredCandidates.length} of {candidates.length} candidates
          </p>
        </div>
      )}

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
                    {/* Feature 5: Clickable name */}
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-left hover:underline"
                    >
                      {candidate.name}
                    </button>
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
                {candidate.noticePeriod && (
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <span className="w-3.5 h-3.5 text-slate-400 flex items-center justify-center text-[10px] font-black">N</span> Notice: {candidate.noticePeriod}
                  </div>
                )}
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
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {hasActiveFilters ? 'Try adjusting your filters.' : 'Upload resumes in the pipeline or wait for candidates to apply.'}
            </p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="mt-3 text-sm font-bold text-emerald-600 hover:underline">Clear all filters</button>
            )}
          </div>
        )}
      </div>

      {/* Modal rendered when View Profile clicked */}
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
