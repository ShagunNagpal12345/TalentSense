import React from 'react';
import {
  Briefcase, Building2, MapPin, Clock,
  CheckCircle2, XCircle, AlertCircle,
  MoreHorizontal, ChevronRight, FileText, Calendar, ExternalLink
} from 'lucide-react';
import { useApplicationStore } from '../../core/stores/applicationStore';

// Define the columns in order
const COLUMNS = [
  { id: 'applied', label: 'Applied', color: 'border-slate-200 bg-slate-50' },
  { id: 'reviewing', label: 'Under Review', color: 'border-blue-200 bg-blue-50/50' },
  { id: 'interviewing', label: 'Interviewing', color: 'border-purple-200 bg-purple-50/50' },
  { id: 'offered', label: 'Offer Received', color: 'border-emerald-200 bg-emerald-50/50' }
];

const ApplicationKanban = () => {
  const { applications, updateStatus } = useApplicationStore();

  const handleOfferAction = (id, action) => {
    if (window.confirm(`Are you sure you want to ${action} this offer?`)) {
      updateStatus(id, action === 'accept' ? 'accepted' : 'rejected');
    }
  };

  const handleWithdraw = (id) => {
    if (window.confirm('Are you sure you want to withdraw your application? This cannot be undone.')) {
      updateStatus(id, 'withdrawn');
    }
  };

  return (
    <div className="bg-[#F3F2EF] dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-200 pb-20">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 shadow-sm mb-6 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold dark:text-white flex items-center gap-2">
                <FileText className="text-[#0A66C2]"/> Application Tracker
            </h1>
            <div className="text-sm text-slate-500 font-medium">
                {applications.filter(a => !['rejected', 'withdrawn', 'accepted'].includes(a.status)).length} Active Applications
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* KANBAN BOARD */}
        <div className="flex overflow-x-auto pb-8 gap-6 snap-x custom-scrollbar">
          {COLUMNS.map(col => {
            const colApps = applications.filter(app => app.status === col.id);
            
            return (
              <div key={col.id} className="flex-shrink-0 w-80 sm:w-96 flex flex-col snap-start">
                
                {/* COLUMN HEADER */}
                <div className={`px-4 py-3 rounded-t-xl border-t border-x ${col.color} flex justify-between items-center`}>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200">{col.label}</h3>
                  <span className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black px-2.5 py-1 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                    {colApps.length}
                  </span>
                </div>

                {/* COLUMN BODY */}
                <div className="flex-1 bg-slate-100/50 dark:bg-slate-900/50 border-x border-b border-slate-200 dark:border-slate-800 rounded-b-xl p-3 space-y-3 min-h-[60vh]">
                  {colApps.map(app => (
                    <div key={app.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow relative group">
                      
                      {/* ACTION MENU (Withdraw) */}
                      {['applied', 'reviewing'].includes(app.status) && (
                        <button 
                          onClick={() => handleWithdraw(app.id)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Withdraw Application"
                        >
                          <XCircle size={16} />
                        </button>
                      )}

                      {/* COMPANY ICON & TITLE */}
                      <div className="flex items-start gap-3 mb-3 pr-6">
                        <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[#0A66C2] font-black text-lg shrink-0">
                          {app.company.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{app.jobTitle}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{app.company}</p>
                        </div>
                      </div>

                      {/* DETAILS */}
                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          <MapPin size={12}/> {app.location}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          <Clock size={12}/> Applied: {new Date(app.appliedDate).toLocaleDateString()}
                        </div>
                      </div>

                      {/* INTERVIEW DETAILS BADGE */}
                      {app.interview && (
                        <div className="mt-2 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                          <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <Calendar size={11}/> Interview Scheduled
                          </p>
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{app.interview.date}</p>
                          <p className="text-xs text-slate-500">{app.interview.time} · {app.interview.type}</p>
                          {app.interview.meetingLink && (
                            <a href={app.interview.meetingLink} target="_blank" rel="noreferrer"
                              className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#0A66C2] hover:underline">
                              <ExternalLink size={11}/> Join Meeting
                            </a>
                          )}
                        </div>
                      )}

                      {/* DYNAMIC FOOTER BASED ON STATUS */}
                      {app.status === 'offered' ? (
                        <div className="border-t border-slate-100 dark:border-slate-700 pt-3 mt-2">
                          <div className="flex items-center gap-1.5 text-amber-600 text-[10px] font-bold uppercase tracking-wider mb-3">
                             <AlertCircle size={14}/> Action Required
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleOfferAction(app.id, 'accept')} className="flex-1 bg-[#057642] hover:bg-[#004b23] text-white py-2 rounded-lg text-xs font-bold transition-colors">
                              Accept Offer
                            </button>
                            <button onClick={() => handleOfferAction(app.id, 'reject')} className="flex-1 bg-white hover:bg-red-50 border border-slate-200 text-red-600 py-2 rounded-lg text-xs font-bold transition-colors">
                              Decline
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="border-t border-slate-100 dark:border-slate-700 pt-3 flex justify-between items-center">
                          <p className="text-[10px] font-medium text-slate-400 italic truncate pr-2">
                            {app.notes}
                          </p>
                          <ChevronRight size={14} className="text-slate-300"/>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* EMPTY STATE */}
                  {colApps.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 text-xs font-medium italic">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPLETED/ARCHIVED SECTION */}
        {applications.filter(a => ['accepted', 'rejected', 'withdrawn'].includes(a.status)).length > 0 && (
          <div className="mt-8 mb-12">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Archived / Closed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {applications.filter(a => ['accepted', 'rejected', 'withdrawn'].includes(a.status)).map(app => (
                 <div key={app.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 opacity-60 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm line-through">{app.jobTitle}</h4>
                      <p className="text-xs text-slate-500">{app.company}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                      app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {app.status}
                    </span>
                 </div>
               ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicationKanban;