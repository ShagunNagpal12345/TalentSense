import React, { useState } from 'react';
import { 
  Upload, CheckCircle, BrainCircuit, User, MapPin, 
  DollarSign, Clock, Briefcase, FileText, ChevronLeft, Loader2, AlertCircle
} from 'lucide-react';

import { useRecruitmentStore } from '../../core/stores/recruitmentStore'; 
import { evaluateCandidate } from '../../core/services/recruiterGroqService';
import { extractTextFromFile } from '../../core/utils/fileParser';

const ResumeParser = ({ onBack, preSelectedJobId }) => {
  const [step, setStep] = useState('upload'); 
  const [resumeFile, setResumeFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New Error State
  
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
    setErrorMessage(""); // Reset error

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

      // 2. EXTRACT TEXT (With Real Error Handling)
      console.log("Step 1: Extracting text...");
      const realResumeText = await extractTextFromFile(file);
      console.log("Step 1 Success: Extracted", realResumeText.length, "characters");

      // 3. SEND TO AI
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
        });
        setStep('review');
      } else {
        throw new Error("AI returned empty result.");
      }

    } catch (err) {
      console.error("FULL ERROR:", err);
      setErrorMessage(err.message); // Show error in UI
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
    const newCandidate = {
      id: Date.now(),
      jobId: Number(selectedJobId),
      status: "Sourced", 
      resumeUrl: fileUrl, 
      ...formData 
    };
    addCandidate(newCandidate);
    setStep('success');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 text-sm font-bold">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-500">Target Job:</span>
          <select value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)} className="border p-2 rounded text-sm font-bold bg-white outline-none focus:ring-2 focus:ring-indigo-500">
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
            <div className="w-20 h-20 bg-white text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition"><Upload className="w-8 h-8"/></div>
            <h3 className="font-bold text-2xl text-slate-800 mb-2">Upload Resume</h3>
            <p className="text-slate-500">Supports PDF, DOCX, TXT. AI extraction active.</p>
          </label>
        </div>
      )}

      {/* STEP 2: SCANNING */}
      {step === 'scanning' && (
        <div className="text-center py-24">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-indigo-600">
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
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
             <div>
               <h2 className="font-bold text-2xl text-slate-800 flex items-center gap-2"><CheckCircle className="text-green-500 w-6 h-6"/> AI Review</h2>
               <p className="text-slate-500 text-sm mt-1">Review extracted data before saving.</p>
             </div>
             <div className="text-right bg-indigo-50 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-indigo-400 uppercase">Match Score</span>
                <div className="text-3xl font-black text-indigo-600">{formData.match}%</div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-5">
               <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide"><User className="w-4 h-4"/> Candidate Profile</h3>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Full Name</label><input name="name" value={formData.name} onChange={handleInputChange} className="w-full border p-2.5 rounded-lg text-sm font-bold text-slate-700 bg-slate-50" /></div>
               <div className="grid grid-cols-2 gap-4">
                 <div><label className="text-xs font-bold text-slate-500 uppercase">Current Role</label><input name="role" value={formData.role} onChange={handleInputChange} className="w-full border p-2.5 rounded-lg text-sm bg-slate-50" /></div>
                 <div><label className="text-xs font-bold text-slate-500 uppercase">Total Exp</label><input name="totalExp" value={formData.totalExp} onChange={handleInputChange} className="w-full border p-2.5 rounded-lg text-sm bg-slate-50" /></div>
               </div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Current Organization</label><input name="currentOrg" value={formData.currentOrg} onChange={handleInputChange} className="w-full border p-2.5 rounded-lg text-sm bg-slate-50" /></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Education</label><input name="education" value={formData.education} onChange={handleInputChange} className="w-full border p-2.5 rounded-lg text-sm bg-slate-50" /></div>
            </div>

            <div className="space-y-5">
               <h3 className="text-sm font-bold text-orange-700 flex items-center gap-2 uppercase tracking-wide"><Clock className="w-4 h-4"/> Logistics & Fit</h3>
               <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 space-y-4">
                 <div><label className="text-xs font-bold text-orange-800 uppercase">Notice Period</label><input name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} className="w-full border border-orange-200 p-2.5 rounded-lg text-sm bg-white" /></div>
                 <div className="grid grid-cols-2 gap-4">
                   <div><label className="text-xs font-bold text-orange-800 uppercase">Current CTC</label><input name="currentCTC" value={formData.currentCTC} onChange={handleInputChange} className="w-full border border-orange-200 p-2.5 rounded-lg text-sm bg-white" /></div>
                   <div><label className="text-xs font-bold text-orange-800 uppercase">Expected CTC</label><input name="expectedCTC" value={formData.expectedCTC} onChange={handleInputChange} className="w-full border border-orange-200 p-2.5 rounded-lg text-sm bg-white" /></div>
                 </div>
                 <div><label className="text-xs font-bold text-orange-800 uppercase">Location</label><input name="location" value={formData.location} onChange={handleInputChange} className="w-full border border-orange-200 p-2.5 rounded-lg text-sm bg-white" /></div>
               </div>
               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                 <h4 className="text-xs font-bold text-blue-800 uppercase mb-2 flex items-center gap-2"><BrainCircuit className="w-3 h-3"/> AI Summary</h4>
                 <p className="text-xs text-blue-700 leading-relaxed">{formData.summary}</p>
               </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
             <button onClick={() => setStep('upload')} className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition">Cancel</button>
             <button onClick={handleFinalSave} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg flex items-center gap-2"><CheckCircle className="w-5 h-5"/> Confirm & Add Candidate</button>
          </div>
        </div>
      )}

      {/* STEP 4: SUCCESS */}
      {step === 'success' && (
        <div className="text-center py-20 animate-in zoom-in">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-10 h-10"/></div>
          <h2 className="text-2xl font-bold mb-2">Candidate Added Successfully!</h2>
          <p className="text-slate-500 mb-6">Profile has been added to the <strong>{formData.match}% Match</strong> pipeline.</p>
          <button onClick={onBack} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">Back to Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default ResumeParser;