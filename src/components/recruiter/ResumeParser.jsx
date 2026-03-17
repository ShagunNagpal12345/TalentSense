import React, { useState } from 'react';
import {
  Upload, CheckCircle, BrainCircuit, User, MapPin,
  DollarSign, Clock, Briefcase, FileText, ChevronLeft, Loader2, AlertCircle,
  Target, TrendingUp, BookOpen, Zap, XCircle, Star, BarChart2
} from 'lucide-react';

import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
import { evaluateCandidate, deepResumeAnalysis } from '../../core/services/groqService';
import { extractTextFromFile } from '../../core/utils/fileParser';

const ResumeParser = ({ onBack, preSelectedJobId }) => {
  const [step, setStep] = useState('upload');
  const [resumeFile, setResumeFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deepAnalysis, setDeepAnalysis] = useState(null);
  const [isDeepAnalyzing, setIsDeepAnalyzing] = useState(false);

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "", email: "", role: "", match: 0, skills: [], summary: "",
    interviewQuestions: [], currentOrg: "", education: "", location: "",
    totalExp: "", noticePeriod: "", currentCTC: "", expectedCTC: ""
  });

  const addCandidate = useRecruitmentStore(state => state.addCandidate);
  const jobs = useRecruitmentStore(state => state.jobs);
  const [selectedJobId, setSelectedJobId] = useState(preSelectedJobId || (jobs[0]?.id) || "");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    setErrorMessage("");
    setDeepAnalysis(null);

    if (!file) return;
    if (!selectedJobId) {
      alert("Please select a Job Position first!");
      return;
    }

    try {
      setStep('scanning');
      setResumeFile(file);
      setIsProcessing(true);

      // 1. GET JD TEXT
      const targetJob = jobs.find(j => j.id == selectedJobId);
      const jdText = targetJob ? targetJob.fullText : "Generic Software Role";

      // 2. EXTRACT TEXT
      console.log("Step 1: Extracting text...");
      const realResumeText = await extractTextFromFile(file);
      console.log("Step 1 Success: Extracted", realResumeText.length, "characters");

      // 3. SEND TO AI (standard evaluation)
      console.log("Step 2: Sending to AI...");
      const aiResult = await evaluateCandidate(realResumeText, jdText);

      if (aiResult) {
        setFormData({
          name: aiResult.profile?.name || file.name.split('.')[0],
          email: aiResult.profile?.email || "N/A",
          role: aiResult.profile?.currentRole || targetJob.title,
          currentOrg: aiResult.profile?.currentOrg || "Not specified",
          education: aiResult.profile?.education || "Not specified",
          totalExp: aiResult.profile?.totalExp || "N/A",
          location: aiResult.profile?.location || "N/A",
          match: aiResult.match || 0,
          skills: aiResult.skills || [],
          summary: aiResult.summary || "No summary generated.",
          interviewQuestions: aiResult.interviewQuestions || [],
          noticePeriod: aiResult.logistics?.noticePeriod || "N/A",
          currentCTC: aiResult.logistics?.currentCTC || "N/A",
          expectedCTC: aiResult.logistics?.expectedCTC || "N/A",
          _resumeText: realResumeText,
          _jdText: jdText,
        });

        // 4. DEEP RESUME ANALYSIS (runs in background while user reviews form)
        setStep('review');
        setIsDeepAnalyzing(true);
        try {
          const deepResult = await deepResumeAnalysis(realResumeText, jdText);
          setDeepAnalysis(deepResult);
        } catch (deepErr) {
          console.warn("Deep analysis failed:", deepErr);
        } finally {
          setIsDeepAnalyzing(false);
        }
      } else {
        throw new Error("AI returned empty result.");
      }

    } catch (err) {
      console.error("FULL ERROR:", err);
      setErrorMessage(err.message);
      setStep('upload');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinalSave = () => {
    const fileUrl = resumeFile ? URL.createObjectURL(resumeFile) : null;
    const { _resumeText, _jdText, ...cleanFormData } = formData;
    const newCandidate = {
      id: Date.now(),
      jobId: Number(selectedJobId),
      status: "Sourced",
      resumeUrl: fileUrl,
      aiAnalysis: deepAnalysis || null,
      ...cleanFormData
    };
    addCandidate(newCandidate);
    setStep('success');
  };

  const getDecisionColor = (decision = "") => {
    const d = decision.toLowerCase();
    if (d.includes("strong") || d.includes("recommend")) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (d.includes("good") || d.includes("consider")) return "text-blue-700 bg-blue-50 border-blue-200";
    if (d.includes("manual") || d.includes("review")) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-red-700 bg-red-50 border-red-200";
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-[#0A66C2]";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="text-slate-500 hover:text-[#0A66C2] flex items-center gap-1 text-sm font-bold">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-500">Target Job:</span>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="border p-2 rounded text-sm font-bold bg-white outline-none focus:ring-2 focus:ring-[#0A66C2]"
          >
            <option value="">-- Select Job --</option>
            {jobs.map(job => <option key={job.id} value={job.id}>{job.title}</option>)}
          </select>
        </div>
      </div>

      {/* ERROR MESSAGE BOX */}
      {errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* STEP 1: UPLOAD */}
      {step === 'upload' && (
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-16 text-center bg-slate-50 hover:bg-slate-100 transition group relative">
          <input type="file" className="hidden" id="resume-upload" onChange={handleFileUpload} accept=".pdf,.docx,.txt" />
          <label htmlFor="resume-upload" className="cursor-pointer">
            <div className="w-20 h-20 bg-white text-[#0A66C2] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition">
              <Upload className="w-8 h-8"/>
            </div>
            <h3 className="font-bold text-2xl text-slate-800 mb-2">Upload Resume</h3>
            <p className="text-slate-500">Supports PDF, DOCX, TXT. AI extraction + Deep Analysis active.</p>
          </label>
        </div>
      )}

      {/* STEP 2: SCANNING */}
      {step === 'scanning' && (
        <div className="text-center py-24">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-[#0A66C2]">
             <Loader2 className="w-16 h-16 animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Reading Resume...</h3>
          <p className="text-slate-500 mt-2">
            {isProcessing ? "Extracting text and analyzing against JD..." : "Please wait..."}
          </p>
        </div>
      )}

      {/* STEP 3: REVIEW */}
      {step === 'review' && (
        <div className="space-y-6">
          {/* Standard Review Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
               <div>
                 <h2 className="font-bold text-2xl text-slate-800 flex items-center gap-2">
                   <CheckCircle className="text-emerald-500 w-6 h-6"/> AI Review
                 </h2>
                 <p className="text-slate-500 text-sm mt-1">Review extracted data before saving.</p>
               </div>
               <div className="text-right bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                  <span className="text-xs font-bold text-[#0A66C2] uppercase">Match Score</span>
                  <div className={`text-3xl font-black ${getScoreColor(formData.match)}`}>{formData.match}%</div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-5">
                 <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
                   <User className="w-4 h-4"/> Candidate Profile
                 </h3>
                 <div>
                   <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                   <input name="name" value={formData.name} onChange={handleInputChange} className="w-full border p-2.5 rounded-lg text-sm font-bold text-slate-700 bg-slate-50 mt-1" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-xs font-bold text-slate-500 uppercase">Current Role</label>
                     <input name="role" value={formData.role} onChange={handleInputChange} className="w-full border p-2.5 rounded-lg text-sm bg-slate-50 mt-1" />
                   </div>
                   <div>
                     <label className="text-xs font-bold text-slate-500 uppercase">Total Exp</label>
                     <input name="totalExp" value={formData.totalExp} onChange={handleInputChange} className="w-full border p-2.5 rounded-lg text-sm bg-slate-50 mt-1" />
                   </div>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-500 uppercase">Current Organization</label>
                   <input name="currentOrg" value={formData.currentOrg} onChange={handleInputChange} className="w-full border p-2.5 rounded-lg text-sm bg-slate-50 mt-1" />
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-500 uppercase">Education</label>
                   <input name="education" value={formData.education} onChange={handleInputChange} className="w-full border p-2.5 rounded-lg text-sm bg-slate-50 mt-1" />
                 </div>
              </div>

              <div className="space-y-5">
                 <h3 className="text-sm font-bold text-orange-700 flex items-center gap-2 uppercase tracking-wide">
                   <Clock className="w-4 h-4"/> Logistics & Fit
                 </h3>
                 <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 space-y-4">
                   <div>
                     <label className="text-xs font-bold text-orange-800 uppercase">Notice Period</label>
                     <input name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} className="w-full border border-orange-200 p-2.5 rounded-lg text-sm bg-white mt-1" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-xs font-bold text-orange-800 uppercase">Current CTC</label>
                       <input name="currentCTC" value={formData.currentCTC} onChange={handleInputChange} className="w-full border border-orange-200 p-2.5 rounded-lg text-sm bg-white mt-1" />
                     </div>
                     <div>
                       <label className="text-xs font-bold text-orange-800 uppercase">Expected CTC</label>
                       <input name="expectedCTC" value={formData.expectedCTC} onChange={handleInputChange} className="w-full border border-orange-200 p-2.5 rounded-lg text-sm bg-white mt-1" />
                     </div>
                   </div>
                   <div>
                     <label className="text-xs font-bold text-orange-800 uppercase">Location</label>
                     <input name="location" value={formData.location} onChange={handleInputChange} className="w-full border border-orange-200 p-2.5 rounded-lg text-sm bg-white mt-1" />
                   </div>
                 </div>
                 <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                   <h4 className="text-xs font-bold text-[#0A66C2] uppercase mb-2 flex items-center gap-2">
                     <BrainCircuit className="w-3 h-3"/> AI Summary
                   </h4>
                   <p className="text-xs text-blue-700 leading-relaxed">{formData.summary}</p>
                 </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
               <button onClick={() => setStep('upload')} className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition">Cancel</button>
               <button onClick={handleFinalSave} className="bg-[#0A66C2] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#004182] transition shadow-md flex items-center gap-2">
                 <CheckCircle className="w-5 h-5"/> Confirm & Add Candidate
               </button>
            </div>
          </div>

          {/* DEEP AI ANALYSIS SECTION */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#0A66C2]/5 to-transparent">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-[#0A66C2]" />
                <h3 className="font-bold text-slate-800">Deep AI Analysis</h3>
                {isDeepAnalyzing && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-[#0A66C2] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    <Loader2 className="w-3 h-3 animate-spin" /> Analyzing...
                  </span>
                )}
                {deepAnalysis && !isDeepAnalyzing && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3" /> Complete
                  </span>
                )}
              </div>
              {deepAnalysis && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Match Score</span>
                  <span className={`text-xl font-black ${getScoreColor(deepAnalysis.matchScore)}`}>
                    {deepAnalysis.matchScore}%
                  </span>
                </div>
              )}
            </div>

            {isDeepAnalyzing && (
              <div className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 text-slate-500">
                  <Loader2 className="w-5 h-5 animate-spin text-[#0A66C2]" />
                  <p className="text-sm font-medium">Running deep structural analysis on resume vs. JD...</p>
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  {["Extracting skills", "JD comparison", "Scoring", "Final verdict"].map((label, i) => (
                    <span key={i} className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {deepAnalysis && !isDeepAnalyzing && (
              <div className="p-6 space-y-6">

                {/* AI Decision Banner */}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-bold text-sm ${getDecisionColor(deepAnalysis.aiDecision)}`}>
                  <Zap className="w-4 h-4 shrink-0" />
                  <span>{deepAnalysis.aiDecision}</span>
                </div>

                {/* Match Explanation */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Match Explanation</h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                    {deepAnalysis.matchExplanation}
                  </p>
                </div>

                {/* JD Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Candidate Has
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(deepAnalysis.jdComparison?.candidateHas || []).map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-emerald-200 text-emerald-700 text-[11px] font-bold rounded-full">
                          {skill}
                        </span>
                      ))}
                      {(deepAnalysis.jdComparison?.candidateHas || []).length === 0 && (
                        <span className="text-xs text-emerald-600 italic">None identified</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5" /> Additional Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(deepAnalysis.jdComparison?.additionalSkills || []).map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-blue-200 text-[#0A66C2] text-[11px] font-bold rounded-full">
                          {skill}
                        </span>
                      ))}
                      {(deepAnalysis.jdComparison?.additionalSkills || []).length === 0 && (
                        <span className="text-xs text-blue-600 italic">None</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-red-700 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" /> Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(deepAnalysis.jdComparison?.missingSkills || []).map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-red-200 text-red-600 text-[11px] font-bold rounded-full">
                          {skill}
                        </span>
                      ))}
                      {(deepAnalysis.jdComparison?.missingSkills || []).length === 0 && (
                        <span className="text-xs text-red-500 italic">None — great fit!</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Education & Experience Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Education Analysis
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">{deepAnalysis.educationAnalysis}</p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" /> Experience Analysis
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">{deepAnalysis.experienceAnalysis}</p>
                  </div>
                </div>

                {/* Notice Period */}
                {deepAnalysis.noticePeriod && deepAnalysis.noticePeriod !== 'N/A' && (
                  <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-sm font-medium text-amber-800">
                      Notice Period from Deep Analysis: <strong>{deepAnalysis.noticePeriod}</strong>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: SUCCESS */}
      {step === 'success' && (
        <div className="text-center py-20 animate-in zoom-in">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10"/>
          </div>
          <h2 className="text-2xl font-bold mb-2">Candidate Added Successfully!</h2>
          <p className="text-slate-500 mb-2">Profile has been added to the <strong>{formData.match}% Match</strong> pipeline.</p>
          {deepAnalysis && (
            <p className="text-sm text-[#0A66C2] font-medium mb-6">
              Deep AI Analysis stored — Match Score: <strong>{deepAnalysis.matchScore}%</strong>
            </p>
          )}
          <button onClick={onBack} className="bg-[#0A66C2] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#004182] transition">
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeParser;
