import React, { useState } from 'react';
import {
  ArrowLeft, Briefcase, MapPin, DollarSign, Clock,
  CheckCircle, FileText, X, Video, UploadCloud, Loader2
} from 'lucide-react';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
import { useApplicationStore } from '../../core/stores/applicationStore';
import { useVideoStore } from '../../core/stores/videoStore';
import { extractTextFromFile } from '../../core/utils/fileParser';
import CurrencyInput from '../shared/CurrencyInput';

const CandidateJobDetail = ({ job, onBack }) => {
  const currentCandidate = useRecruitmentStore((state) => state.currentCandidate);
  const applyForJob = useRecruitmentStore((state) => state.applyForJob);

  const { applications, addApplication } = useApplicationStore();
  const hasApplied = applications.some(app => app.jobId === job.id);

  // Feature 1: use real video store
  const { videoIntros } = useVideoStore();

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [formData, setFormData] = useState({
    name: currentCandidate.name || "",
    email: currentCandidate.email || "",
    phone: "",
    skills: "",
    resumeText: "",
    resumeUrl: "",
    noticePeriod: "",
    currentCTC: "",
    expectedCTC: "",
    location: currentCandidate.profile?.location || "",
    workPreference: "",
    videoUrl: ""
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    try {
      const extractedText = await extractTextFromFile(file);
      const fileUrl = URL.createObjectURL(file);

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

    const success = addApplication(job);

    if (success) {
      applyForJob(job.id, formData);
      setShowApplyModal(false);
      alert("Application submitted successfully! You can track it in your Tracker.");
    } else {
      alert("You have already applied for this role.");
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-[#0A66C2] dark:hover:text-blue-400 font-bold text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4"/> Back to Openings
      </button>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-[#0A66C2]"/> {job.client}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#0A66C2]"/> {job.location || job.logistics?.workMode || "Remote"}</span>
              <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-emerald-500"/> {job.salary || "Competitive"}</span>
            </div>
          </div>

          <div className="w-full md:w-auto">
            {hasApplied ? (
              <div className="px-8 py-3 w-full md:w-auto justify-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5"/> Applied
              </div>
            ) : (
              <button onClick={() => setShowApplyModal(true)} className="w-full md:w-auto px-10 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl font-bold shadow-lg shadow-[#0A66C2]/20 transition-all active:scale-95">
                Easy Apply Now
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

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4 border-t border-slate-100 dark:border-slate-800 pt-8">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {(job.skills?.hard || job.skills || []).map((s, i) => (
              <span key={i} className="px-3 py-1.5 bg-[#F3F2EF] dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* APPLICATION MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">

            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Submit Application</h2>
              <button onClick={() => setShowApplyModal(false)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                <X className="w-6 h-6"/>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              {/* Smart Uploader */}
              <div className="border-2 border-dashed border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-6 text-center relative overflow-hidden group hover:bg-blue-50 transition-colors">
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
                      <Loader2 className="w-8 h-8 text-[#0A66C2] mx-auto mb-2 animate-spin"/>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Reading Resume...</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Extracting text for AI Analysis.</p>
                    </div>
                  ) : uploadedFileName ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2"/>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Resume Uploaded Successfully!</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-2 font-medium">{uploadedFileName}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider group-hover:text-[#0A66C2] transition">Click to upload a different file</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <UploadCloud className="w-8 h-8 text-[#0A66C2] mx-auto mb-2 group-hover:scale-110 transition-transform"/>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Upload Latest Resume *</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">PDF, DOCX up to 5MB</p>
                      <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-[#0A66C2] dark:text-blue-300 text-xs font-bold rounded-lg border border-blue-200 dark:border-blue-800">Select File</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Full Name *</label>
                    <input required type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-[#0A66C2]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address *</label>
                    <input required type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-[#0A66C2]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Phone Number *</label>
                  <input required type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-[#0A66C2]" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Top 3 Skills (Comma Separated) *</label>
                  <input required type="text" placeholder="React, Node.js, AWS" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-[#0A66C2]" />
                </div>

                {/* Logistics */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Notice Period *</label>
                  <select required value={formData.noticePeriod} onChange={e => setFormData({...formData, noticePeriod: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-[#0A66C2]">
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
                  <select required value={formData.workPreference} onChange={e => setFormData({...formData, workPreference: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-[#0A66C2]">
                    <option value="">Select Preference</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="In-Office">In-Office</option>
                  </select>
                </div>

                {/* Feature 12: CurrencyInput for CTC fields */}
                <div>
                  <CurrencyInput
                    label="Current CTC"
                    value={formData.currentCTC}
                    onChange={(val) => setFormData({...formData, currentCTC: val})}
                    placeholder="e.g. 1500000"
                    required
                  />
                </div>

                <div>
                  <CurrencyInput
                    label="Expected CTC"
                    value={formData.expectedCTC}
                    onChange={(val) => setFormData({...formData, expectedCTC: val})}
                    placeholder="e.g. 2200000"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Current Location *</label>
                  <input required type="text" placeholder="City, State" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium outline-none focus:border-[#0A66C2]" />
                </div>

                {/* Feature 1: Dynamic video dropdown from videoStore */}
                <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#0A66C2]"/> Video Introduction
                  </label>
                  <select
                    value={formData.videoUrl}
                    onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                    className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none focus:border-[#0A66C2]"
                  >
                    <option value="">Attach your recorded pitch (optional)...</option>
                    {videoIntros.length === 0 ? (
                      <option value="" disabled>No Video Uploaded — Record one in Video Pitch tab</option>
                    ) : (
                      videoIntros.map((v) => (
                        <option key={v.id} value={v.url || v.id}>
                          {v.title} — Recorded {v.date}
                        </option>
                      ))
                    )}
                  </select>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    {videoIntros.length === 0
                      ? 'Record your video pitch in the Video Pitch tab to attach it to your application.'
                      : 'Recruiters will view this video alongside your resume and ATS score.'
                    }
                  </p>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setShowApplyModal(false)} className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                  Cancel
                </button>
                <button type="submit" disabled={isParsing} className={`px-8 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-bold rounded-xl shadow-lg shadow-[#0A66C2]/20 transition-all ${isParsing ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}>
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
