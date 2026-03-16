import React, { useState } from 'react';
import { 
  X, FileText, Mail, Copy, CheckCircle, ExternalLink, 
  User, BrainCircuit, Briefcase, Loader2, PlayCircle, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
import { generateClientEmail } from '../../core/services/emailGroqService';
// 👇 FIX: Import YOUR dedicated evaluateCandidate function
import { evaluateCandidate } from '../../core/services/recruiterGroqService'; 

const CandidateDetailModal = ({ candidate, job, onClose }) => {
  const moveCandidate = useRecruitmentStore(state => state.moveCandidate);
  const updateCandidate = useRecruitmentStore(state => state.updateCandidate); 

  const [activeTab, setActiveTab] = useState('analysis'); 
  const [emailData, setEmailData] = useState({ subject: "", body: "" });
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  
  const [hasRunAnalysis, setHasRunAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 👇 FIX: Use your dedicated Recruiter AI Service
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Calls your highly accurate evaluateCandidate function
      const analysisResult = await evaluateCandidate(
        candidate.resumeText || "Candidate applied manually without raw resume text.", 
        job?.fullText || "Generic Role"
      );

      if (analysisResult) {
        // Save the rich AI results to the Zustand store
        updateCandidate(candidate.id, {
          match: analysisResult.match || candidate.match,
          summary: analysisResult.summary || candidate.summary,
          skills: analysisResult.skills || candidate.skills,
          // We can also merge AI logistics if the candidate left them blank in the form
          noticePeriod: candidate.noticePeriod || analysisResult.logistics?.noticePeriod,
          currentCTC: candidate.currentCTC || analysisResult.logistics?.currentCTC,
          expectedCTC: candidate.expectedCTC || analysisResult.logistics?.expectedCTC,
          
          // 👇 FIX: Ensure we capture ALL the profile data extracted by the AI
          currentOrg: analysisResult.profile?.currentOrg || candidate.currentOrg || "Not specified",
          education: analysisResult.profile?.education || candidate.education || "Not specified",
          totalExp: analysisResult.profile?.totalExp || candidate.totalExp || "Not specified",
          location: candidate.location || analysisResult.profile?.location || "Not specified",
          interviewQuestions: analysisResult.interviewQuestions || candidate.interviewQuestions || []
        });
      }

      setHasRunAnalysis(true);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      alert("AI Analysis encountered an error.");
      setHasRunAnalysis(true); 
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApprove = () => {
    moveCandidate(candidate.id, 'Client Review');
    alert("Candidate approved and sent to Client dashboard!");
    onClose();
  };

  const handleReject = () => {
    moveCandidate(candidate.id, 'Rejected');
    onClose();
  };

  const handleGeneratePitch = async () => {
    setIsGeneratingEmail(true);
    setActiveTab('email');
    try {
      const response = await generateClientEmail(
        candidate.name, 
        job.title, 
        candidate.summary || "Strong technical background.", 
        job.fullText || ""
      );
      if (response) setEmailData(response);
    } catch (error) {
      setEmailData({ subject: "Candidate Pitch", body: "Could not generate email pitch at this time." });
    }
    setIsGeneratingEmail(false);
  };

  const handleSendEmail = () => {
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
    window.open(mailtoLink, '_blank');
  };

  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center font-bold text-xl">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">{candidate.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Applied for: <span className="font-bold text-emerald-600 dark:text-emerald-400">{job?.title || candidate.role}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
             {hasRunAnalysis ? (
               <div className="text-right">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">AI Match</span>
                  <span className={`text-xl font-black ${candidate.match >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                    {candidate.match}%
                  </span>
               </div>
             ) : (
               <span className="text-xs font-bold text-slate-400 uppercase">Analysis Pending</span>
             )}
             <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400 transition">
               <X className="w-6 h-6"/>
             </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col">
          
          <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <button onClick={() => setActiveTab('analysis')} className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === 'analysis' ? 'bg-emerald-500 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              <BrainCircuit className="w-4 h-4"/> AI Match Analysis
            </button>
            <button onClick={handleGeneratePitch} disabled={!hasRunAnalysis} className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${!hasRunAnalysis ? 'opacity-50 cursor-not-allowed' : ''} ${activeTab === 'email' ? 'bg-emerald-500 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              <Mail className="w-4 h-4"/> {emailData.body ? "Edit Pitch Email" : "Generate Client Pitch"}
            </button>
          </div>

          {activeTab === 'analysis' && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-left-4">
               
               {!hasRunAnalysis ? (
                  <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 p-10 text-center">
                    {isAnalyzing ? (
                      <>
                        <div className="text-emerald-500 mb-4 animate-spin"><Loader2 className="w-12 h-12"/></div>
                        <h3 className="font-bold text-slate-800 dark:text-white text-xl">Analyzing Resume vs JD...</h3>
                        <p className="text-slate-500 mt-2 max-w-sm">AI is extracting logistics and cross-referencing candidate skills against the required Job Description.</p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4"><BrainCircuit className="w-8 h-8"/></div>
                        <h3 className="font-bold text-slate-800 dark:text-white text-xl mb-2">Resume Evaluation Pending</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-md">Run the highly accurate AI evaluation to calculate fit score, extract missing logistics, and review the candidate.</p>
                        
                        <div className="flex gap-4">
                           {candidate.resumeUrl && (
                             <a href={candidate.resumeUrl} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition flex items-center gap-2">
                               <FileText className="w-4 h-4"/> View Candidate Resume
                             </a>
                           )}
                           <button onClick={handleRunAnalysis} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
                             <PlayCircle className="w-5 h-5"/> Run Deep AI Analysis
                           </button>
                        </div>
                      </>
                    )}
                  </div>
               ) : (
                 <>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mb-6">
                     <div className="space-y-6">
                       <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                          <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wide"><User className="w-4 h-4 text-emerald-500"/> AI Summary</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{candidate.summary || "No summary available."}</p>
                       </div>
                       
                       <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                          <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wide"><Briefcase className="w-4 h-4 text-emerald-500"/> Extracted Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills?.map((s, i) => (
                              <span key={i} className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded border border-emerald-200 dark:border-emerald-800/50">{s}</span>
                            ))}
                          </div>
                       </div>
                     </div>

                     <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wide flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-500"/> Candidate Logistics</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Notice Period</span><span className="font-medium text-slate-800 dark:text-white">{candidate.noticePeriod || "N/A"}</span></div>
                          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Current CTC</span><span className="font-medium text-slate-800 dark:text-white">{candidate.currentCTC || "N/A"}</span></div>
                          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Expected CTC</span><span className="font-medium text-slate-800 dark:text-white">{candidate.expectedCTC || "N/A"}</span></div>
                          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Location</span><span className="font-medium text-slate-800 dark:text-white">{candidate.location || "N/A"}</span></div>
                          <div className="flex justify-between py-2"><span className="text-slate-500 dark:text-slate-400">Work Pref.</span><span className="font-medium text-slate-800 dark:text-white">{candidate.workPreference || "N/A"}</span></div>
                        </div>
                        {candidate.resumeUrl && (
                          <a href={candidate.resumeUrl} target="_blank" rel="noreferrer" className="mt-6 block w-full text-center py-2.5 border-2 border-slate-200 dark:border-slate-800 rounded-lg font-bold text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500 transition text-sm flex items-center justify-center gap-2">
                            <FileText className="w-4 h-4"/> View Original Resume PDF
                          </a>
                        )}
                     </div>
                   </div>

                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex justify-between items-center shadow-sm mt-auto">
                      <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Decision required:</p>
                      <div className="flex gap-3">
                         <button onClick={handleReject} className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold rounded-lg transition flex items-center gap-2 text-sm">
                           <ThumbsDown className="w-4 h-4"/> Reject
                         </button>
                         <button onClick={handleApprove} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition flex items-center gap-2 text-sm">
                           <ThumbsUp className="w-4 h-4"/> Approve & Send to Client
                         </button>
                      </div>
                   </div>
                 </>
               )}
            </div>
          )}

          {activeTab === 'email' && (
            <div className="animate-in slide-in-from-right-4 h-full flex flex-col">
              {isGeneratingEmail ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                   <div className="text-emerald-500 mb-4 animate-spin"><Loader2 className="w-12 h-12"/></div>
                   <h3 className="font-bold text-slate-800 dark:text-white text-lg">Drafting Pitch...</h3>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                   <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/50 p-4 rounded-xl mb-4">
                      <h4 className="text-sm font-bold text-sky-800 dark:text-sky-300 mb-1 flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> AI Pitch Generator</h4>
                   </div>

                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex-1 flex flex-col shadow-sm overflow-hidden min-h-[300px]">
                      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50">
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-16">Subject:</span>
                         <input value={emailData.subject} onChange={(e) => setEmailData({...emailData, subject: e.target.value})} className="flex-1 font-bold text-slate-800 dark:text-white outline-none bg-transparent"/>
                      </div>
                      <textarea value={emailData.body} onChange={(e) => setEmailData({...emailData, body: e.target.value})} className="flex-1 p-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 bg-transparent outline-none resize-none font-mono"/>
                   </div>

                   <div className="flex justify-end gap-3 mt-4">
                      <button onClick={handleSendEmail} className="px-6 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 flex items-center gap-2 shadow-lg transition">
                        <ExternalLink className="w-4 h-4"/> Open Email App
                      </button>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailModal;