import React from 'react';
import { 
  X, MapPin, DollarSign, Briefcase, Globe, BrainCircuit, FileText, 
  Zap, Target, HelpCircle, ListChecks, Copy
} from 'lucide-react';

const RecruiterJobDetailModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-start bg-slate-50">
          <div>
            <div className="flex items-center gap-3">
               <h2 className="text-2xl font-bold text-slate-900">{job.title}</h2>
               {job.aiScore && <span className="text-xs font-bold px-2 py-1 rounded bg-indigo-100 text-indigo-700 border border-indigo-200">JD Score: {job.aiScore}</span>}
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {job.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> {job.client || "Client"}</span>
              <span className="flex items-center gap-1 font-bold text-slate-700">
                <DollarSign className="w-4 h-4 text-emerald-600"/> {job.salary}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* SCROLLABLE CONTENT (Same Layout as JD Analysis) */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/30">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: JD, SKILLS, STRATEGY */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* JD Text */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-indigo-600"/> Job Description
                </h3>
                <div className="prose prose-sm prose-slate max-w-none text-slate-600 bg-slate-50 p-5 rounded-xl border border-slate-200 font-medium whitespace-pre-wrap">
                  {job.fullText}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3"><Zap className="w-4 h-4 text-indigo-600"/> Required Skills</h3>
                <div className="space-y-3">
                  <div><p className="text-xs font-bold text-slate-400 uppercase mb-1">Hard Skills</p><div className="flex flex-wrap gap-2">{job.skills?.hard?.map((s, i) => <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100">{s}</span>)}</div></div>
                  <div><p className="text-xs font-bold text-slate-400 uppercase mb-1">Soft Skills</p><div className="flex flex-wrap gap-2">{job.skills?.soft?.map((s, i) => <span key={i} className="px-2 py-1 bg-pink-50 text-pink-700 rounded-lg text-xs font-bold border border-pink-100">{s}</span>)}</div></div>
                </div>
              </div>

              {/* Sourcing Strategy (Bullion) */}
              {job.sourcingStrategy && (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                   <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2"><Target className="w-4 h-4"/> Sourcing Strategy (Boolean)</h3>
                   <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="text-xs font-bold text-blue-800 uppercase mb-1 block">Naukri String</label>
                          <div className="flex gap-2">
                            <code className="flex-1 bg-white p-2 rounded border border-blue-200 text-xs font-mono text-slate-600 overflow-x-auto whitespace-nowrap">{job.sourcingStrategy.naukriBoolean || "N/A"}</code>
                            <button className="p-2 bg-white rounded border border-blue-200 text-blue-600 hover:bg-blue-50" title="Copy"><Copy className="w-3 h-3"/></button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-blue-800 uppercase mb-1 block">LinkedIn String</label>
                          <div className="flex gap-2">
                            <code className="flex-1 bg-white p-2 rounded border border-blue-200 text-xs font-mono text-slate-600 overflow-x-auto whitespace-nowrap">{job.sourcingStrategy.linkedinBoolean || "N/A"}</code>
                            <button className="p-2 bg-white rounded border border-blue-200 text-blue-600 hover:bg-blue-50" title="Copy"><Copy className="w-3 h-3"/></button>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-t border-blue-200/50 pt-3">
                        <div><p className="text-xs font-bold text-blue-800 uppercase mb-1">Target Titles</p><p className="text-xs text-blue-700">{job.sourcingStrategy.targetTitles?.join(", ") || "N/A"}</p></div>
                        <div><p className="text-xs font-bold text-blue-800 uppercase mb-1">Target Companies</p><p className="text-xs text-blue-700">{job.sourcingStrategy.targetCompanies?.join(", ") || "N/A"}</p></div>
                      </div>
                   </div>
                </div>
              )}

              {/* Interview Questions */}
              {job.interviewQuestions && job.interviewQuestions.length > 0 && (
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
                   <h3 className="text-sm font-bold text-orange-900 mb-3 flex items-center gap-2"><HelpCircle className="w-4 h-4"/> Hiring Manager's Interview Guide</h3>
                   <ul className="space-y-2">
                      {job.interviewQuestions.map((q, i) => (
                        <li key={i} className="text-xs text-orange-800 bg-white p-3 rounded border border-orange-200 font-medium">
                           <span className="font-bold text-orange-500 mr-2">Q{i+1}.</span>{q}
                        </li>
                      ))}
                   </ul>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: INTELLIGENCE SIDEBAR */}
            <div className="space-y-6">
              
              {/* Market Intel */}
              <div className="bg-indigo-900 text-white rounded-xl p-6 relative overflow-hidden shadow-lg">
                <Globe className="absolute top-2 right-2 text-indigo-700 w-16 h-16 opacity-20" />
                <h3 className="text-xs font-bold text-indigo-300 uppercase mb-3 flex items-center gap-2"><BrainCircuit className="w-3 h-3"/> Market Intel</h3>
                <div className="space-y-3 relative z-10">
                  <div><p className="text-[10px] text-indigo-300 uppercase">Avg Time to Fill</p><p className="text-lg font-bold">{job.marketData?.timeToFill || "N/A"}</p></div>
                  <div><p className="text-[10px] text-indigo-300 uppercase">Difficulty</p><p className="text-lg font-bold">{job.marketData?.difficulty || "Medium"}</p></div>
                  <div className="pt-2 border-t border-indigo-800"><p className="text-[10px] text-indigo-300 uppercase">Industry Salary</p><p className="text-sm font-bold">{job.marketData?.industrySalary || "N/A"}</p></div>
                </div>
              </div>

              {/* Logistics Card (Full) */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Briefcase className="w-4 h-4"/> Logistics & Params</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-xs text-slate-500">Department</span><span className="text-xs font-bold text-slate-800">{job.department || "N/A"}</span></div>
                  <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-xs text-slate-500">Type</span><span className="text-xs font-bold text-slate-800">{job.logistics?.employmentType || "Full-time"}</span></div>
                  <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-xs text-slate-500">Shift</span><span className="text-xs font-bold text-slate-800">{job.logistics?.shift || "General"}</span></div>
                  <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-xs text-slate-500">Work Mode</span><span className="text-xs font-bold text-slate-800">{job.logistics?.workMode || "Hybrid"}</span></div>
                  <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-xs text-slate-500">Experience</span><span className="text-xs font-bold text-slate-800">{job.logistics?.expRange || "N/A"}</span></div>
                  <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-xs text-slate-500">Notice Period</span><span className="text-xs font-bold text-slate-800">{job.logistics?.noticePeriod || "Immediate"}</span></div>
                  <div className="flex justify-between pt-1"><span className="text-xs text-slate-500">Qualification</span><span className="text-xs font-bold text-slate-800 text-right max-w-[150px] truncate">{job.logistics?.qualification || "Any"}</span></div>
                </div>
              </div>

              {/* Tests */}
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                <h3 className="text-xs font-bold text-purple-800 uppercase mb-3 flex items-center gap-2"><ListChecks className="w-3 h-3"/> Required Tests</h3>
                {job.tests && job.tests.length > 0 ? (
                  <ul className="space-y-2">
                    {job.tests.map((test, i) => (
                      <li key={i} className="text-xs font-bold text-purple-700 flex items-center gap-2 bg-white/50 p-2 rounded">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>{test.name}
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-xs text-purple-400 italic">No tests assigned.</p>}
              </div>

            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button onClick={onClose} className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition">Close Details</button>
        </div>

      </div>
    </div>
  );
};

export default RecruiterJobDetailModal;