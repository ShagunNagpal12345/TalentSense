import React, { useState } from 'react';
import { 
  ArrowLeft, Briefcase, MapPin, DollarSign, Clock, 
  CheckCircle, FileText, X, Video, UploadCloud, Loader2
} from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
// 👇 FIX: Import your working file parser utility
import { extractTextFromFile } from '../../core/utils/fileParser';

const CandidateJobDetail = ({ job, onBack }) => {
  const currentCandidate = useRecruitmentStore((state) => state.currentCandidate);
  const applyForJob = useRecruitmentStore((state) => state.applyForJob);
  const hasApplied = currentCandidate.appliedJobs.includes(job.id);

  const [showApplyModal, setShowApplyModal] = useState(false);
  
  // 👇 NEW: States for file parsing
  const [isParsing, setIsParsing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [formData, setFormData] = useState({
    name: currentCandidate.name || "",
    email: currentCandidate.email || "",
    phone: "",
    skills: "",
    resumeText: "", // Will be filled automatically by the parser
    resumeUrl: "",  // Will hold the local blob URL for the Recruiter to view
    noticePeriod: "",
    currentCTC: "",
    expectedCTC: "",
    location: currentCandidate.profile?.location || "",
    workPreference: "",
    videoUrl: ""
  });

  // 👇 NEW: Handle File Upload & Parsing (Matches Recruiter logic)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    try {
      // 1. Extract text for the AI
      const extractedText = await extractTextFromFile(file);
      
      // 2. Create a temporary URL so the Recruiter can view the original PDF
      const fileUrl = URL.createObjectURL(file);

      // 3. Save to form data
      setFormData(prev => ({ 
        ...prev, 
        resumeText: extractedText,
        resumeUrl: fileUrl 
      }));
      setUploadedFileName(file.name);
      
    } catch (error) {
      console.error("Failed to parse candidate resume:", error);
      alert("Could not read the file. Please try another PDF or DOCX.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.resumeText) {
      alert("Please upload a resume first.");
      return;
    }
    applyForJob(job.id, formData);
    setShowApplyModal(false);
    alert("Application submitted successfully!");
  };

  return (
    <div className="animate-in fade-in duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 font-bold text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4"/> Back to Openings
      </button>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-violet-500"/> {job.client}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-violet-500"/> {job.location || job.logistics?.workMode}</span>
              <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-emerald-500"/> {job.salary}</span>
            </div>
          </div>
          
          <div>
            {hasApplied ? (
              <div className="px-8 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold border border-emerald-100 dark:border-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5"/> Application Submitted
              </div>
            ) : (
              <button onClick={() => setShowApplyModal(true)} className="px-10 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 transition-all">
                Apply for this Role
              </button>
            )}
          </div>
        </div>

        {/* JOB DESCRIPTION BODY */}
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the Role</h3>
          <div className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
            {job.fullText || "No detailed description provided for this role. Please reach out to the recruiter for more information."}
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills?.hard?.map((s, i) => (
              <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* APPLICATION MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Submit Application</h2>
              <button onClick={() => setShowApplyModal(false)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                <X className="w-6 h-6"/>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* 👇 FIX: Smart Uploader that uses extractTextFromFile */}
              <div className="border-2 border-dashed border-violet-200 dark:border-violet-900/50 bg-violet-50 dark:bg-violet-900/10 rounded-2xl p-6 text-center relative overflow-hidden group">
                <input 
                  type="file" 
                  id="candidate-resume-upload"
                  className="hidden" 
                  onChange={handleFileUpload} 
                  accept=".pdf,.docx,.txt"
                  required={!formData.resumeText}
                />
                <label htmlFor="candidate-resume-upload" className="cursor-pointer block">
                  {isParsing ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-8 h-8 text-violet-500 mx-auto mb-2 animate-spin"/>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Reading Resume...</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Extracting text for AI Analysis.</p>
                    </div>
                  ) : uploadedFileName ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2"/>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Resume Uploaded Successfully!</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-2 font-medium">{uploadedFileName}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider group-hover:text-violet-500 transition">Click to upload a different file</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <UploadCloud className="w-8 h-8 text-violet-500 mx-auto mb-2 group-hover:scale-110 transition-transform"/>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Upload Latest Resume *</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">PDF, DOCX up to 5MB</p>
                      <span className="px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-bold rounded-lg border border-violet-200 dark:border-violet-800">Select File</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Full Name *</label>
                    <input required type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-violet-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address *</label>
                    <input required type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-violet-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Phone Number *</label>
                  <input required type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-violet-500" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Top 3 Skills (Comma Separated) *</label>
                  <input required type="text" placeholder="React, Node.js, AWS" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-violet-500" />
                </div>

                {/* Logistics */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Notice Period *</label>
                  <select required value={formData.noticePeriod} onChange={e => setFormData({...formData, noticePeriod: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-violet-500">
                    <option value="">Select Notice Period</option>
                    <option value="Immediate (<10 Days)">Immediate (&lt;10 Days)</option>
                    <option value="10-20 Days">10-20 Days</option>
                    <option value="20-30 Days">20-30 Days</option>
                    <option value="30-60 Days">30-60 Days</option>
                    <option value="60+ Days">60+ Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Work Preference *</label>
                  <select required value={formData.workPreference} onChange={e => setFormData({...formData, workPreference: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-violet-500">
                    <option value="">Select Preference</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="In-Office">In-Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Current CTC (LPA) *</label>
                  <input required type="text" placeholder="e.g. 15 LPA" value={formData.currentCTC} onChange={e => setFormData({...formData, currentCTC: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-violet-500" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Expected CTC (LPA) *</label>
                  <input required type="text" placeholder="e.g. 22 LPA" value={formData.expectedCTC} onChange={e => setFormData({...formData, expectedCTC: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-violet-500" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Current Location *</label>
                  <input required type="text" placeholder="City, State" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-violet-500" />
                </div>

                <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Video className="w-4 h-4"/> Video Introduction *</label>
                  <select required value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none focus:border-violet-500">
                    <option value="">Choose a recorded intro...</option>
                    <option value="https://example.com/video1.mp4">Intro 1: General Software Engineer Pitch (30s)</option>
                    <option value="https://example.com/video2.mp4">Intro 2: Frontend Focused Pitch (45s)</option>
                    <option value="https://example.com/video3.mp4">Intro 3: Leadership/Management Pitch (60s)</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Recruiters will view this video alongside your resume.</p>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setShowApplyModal(false)} className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                  Cancel
                </button>
                <button type="submit" disabled={isParsing} className={`px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-lg shadow-violet-500/20 transition-all ${isParsing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateJobDetail;