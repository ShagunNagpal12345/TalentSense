import React from 'react';
import { Briefcase, MapPin, DollarSign, Clock, ChevronRight, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';

const AvailableJobs = ({ onViewJob }) => {
  const jobs = useRecruitmentStore((state) => state.jobs);
  const currentCandidate = useRecruitmentStore((state) => state.currentCandidate);
  const applyForJob = useRecruitmentStore((state) => state.applyForJob);

  const handleApply = (jobId) => {
    applyForJob(jobId);
    alert("Application submitted! The recruiter has been notified.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Available Openings</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Discover roles that match your profile and AI score.</p>
        </div>
        <div className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 px-4 py-2 rounded-xl text-sm font-bold border border-violet-200 dark:border-violet-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4"/> {jobs.length} Jobs Found
        </div>
      </div>

      <div className="grid gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            const hasApplied = currentCandidate.appliedJobs.includes(job.id);
            
            return (
              <div key={job.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-700 transition-all group">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {job.title}
                      </h3>
                      {job.urgency === "High" && (
                        <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold rounded uppercase border border-red-100 dark:border-red-800">
                          Urgent
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-violet-500"/> {job.client}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-violet-500"/> {job.location || job.logistics?.workMode || "Remote"}</span>
                      <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-emerald-500"/> {job.salary}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400"/> {job.datePosted}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {hasApplied ? (
                      // 👇 FIX: Now shows both "Applied" and a "View JD" button
                      <>
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold text-sm border border-emerald-100 dark:border-emerald-800">
                          <CheckCircle className="w-4 h-4" /> Applied
                        </div>
                        <button 
                          onClick={() => onViewJob && onViewJob(job)}
                          className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm transition-all"
                        >
                          View JD
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => onViewJob && onViewJob(job)}
                        className="px-8 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2 group/btn"
                      >
                        View Details <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"/>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                   {job.skills?.hard?.slice(0, 3).map((s, i) => (
                     <span key={i} className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded uppercase tracking-wider">
                       {s}
                     </span>
                   ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50">
            <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4"/>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">No Jobs Posted Yet</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Positions created by clients will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableJobs;