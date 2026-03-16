import React, { useState } from 'react';
import { FileText, ArrowRight, Upload, X, CheckCircle } from 'lucide-react';

const JDUpload = ({ onAnalyze }) => {
  const [jdText, setJdText] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // HANDLE FILE SELECTION
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // SIMULATE PARSING TEXT FROM FILE
      // In a real app, you'd send this file to a backend/Groq to extract text
      setJdText(`[Extracted from ${selectedFile.name}]\n\nSenior React Developer\nMust know React, Node.js, and AWS...`); 
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setJdText(`[Extracted from ${droppedFile.name}]\n\nSenior React Developer\nMust know React, Node.js, and AWS...`);
    }
  };

  const removeFile = () => {
    setFile(null);
    setJdText('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Job Description</h2>
        <p className="text-slate-500">Paste your JD text or upload a document to get started.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* TABS / HEADER */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex gap-4 text-sm font-bold text-slate-500">
          <span className={!file ? "text-indigo-600" : ""}>Text Input</span>
          <span className={file ? "text-indigo-600" : ""}>File Upload</span>
        </div>

        <div className="p-6 space-y-6">
          
          {/* OPTION 1: FILE UPLOAD ZONE */}
          {!jdText && !file && (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative ${
                isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
              }`}
            >
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.txt" 
                onChange={handleFileChange} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Click to Upload or Drag & Drop</h3>
              <p className="text-slate-500 text-sm mt-1">Supports PDF, DOCX, TXT (Max 5MB)</p>
            </div>
          )}

          {/* FILE PREVIEW (IF UPLOADED) */}
          {file && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-md shadow-sm text-indigo-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{file.name}</h4>
                  <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB • Ready to Analyze</p>
                </div>
              </div>
              <button onClick={removeFile} className="text-slate-400 hover:text-red-500 p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* OPTION 2: TEXT AREA (OR FILE CONTENT PREVIEW) */}
          {(!file || jdText) && (
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  {file ? "Extracted Content Preview" : "Or Paste JD Text Here"}
                </label>
                {jdText && <span className="text-xs text-slate-400">{jdText.length} characters</span>}
              </div>
              <textarea 
                className="w-full h-64 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none font-mono text-sm leading-relaxed text-slate-700 bg-slate-50"
                placeholder="Job Title: Senior React Engineer..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              ></textarea>
            </div>
          )}

          {/* ACTION BUTTON */}
          <div className="flex justify-end pt-2">
            <button 
              onClick={() => onAnalyze(jdText)} 
              disabled={!jdText.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1"
            >
              Analyze with AI <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JDUpload;