import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, ChevronDown, ChevronUp, Layout, ArrowLeft, Settings, 
  TrendingUp, AlertTriangle, Zap, DollarSign, Clock, MapPin, 
  Briefcase, BarChart3, CheckCircle, ListChecks, BrainCircuit, 
  Sparkles, FileCheck, Target, Globe, Users, Bot, Search, Copy, HelpCircle, GraduationCap
} from 'lucide-react';

import { extractJobDetails, generateTestRecommendations } from '../../core/services/clientGroqService';

const JDAnalysis = ({ initialText, onBack, onFinalize }) => {
  
  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState('insights'); 
  const [analyzing, setAnalyzing] = useState(true);
  const [fullJDText, setFullJDText] = useState(initialText || "");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [openSection, setOpenSection] = useState('basics'); 

  // --- DATA STATE ---
  const [details, setDetails] = useState({
    // 1. Basic Info
    jobTitle: "", 
    role: "", 
    department: "", 
    
    // 2. Logistics
    location: "", 
    workMode: "Hybrid", 
    shiftTiming: "General", 
    employmentType: "Full-time", 
    
    // 3. Requirements
    qualification: "", 
    noticePeriod: "",
    minExp: 0, 
    maxExp: 0,
    
    // 4. Compensation
    minSalary: "", 
    maxSalary: "", 
    currency: "INR",
    
    // AI Data
    skills: { hard: [], soft: [], tools: [] },
    marketData: { industrySalary: "Analyzing...", timeToFill: "Analyzing...", difficulty: "Medium" },
    gaps: [],
    improvements: [],
    aiScore: 0,
    clarificationQuestions: [],
    interviewQuestions: [],
    sourcingStrategy: { naukriBoolean: "", linkedinBoolean: "", targetTitles: [], targetCompanies: [] }
  });

  const [availableTests, setAvailableTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);

  // --- HELPERS ---
  const isMissing = (val) => !val || val === "Not specified" || val === 0 || val === "0" || val === "Analyzing...";
  
  // Check the 12 Critical Fields
  const getMissingInputCount = () => {
    let count = 0;
    if (isMissing(details.jobTitle)) count++;
    if (isMissing(details.department)) count++;
    if (isMissing(details.employmentType)) count++;
    if (isMissing(details.workMode)) count++;
    if (isMissing(details.location)) count++;
    if (isMissing(details.shiftTiming)) count++;
    if (isMissing(details.qualification)) count++;
    if (isMissing(details.noticePeriod)) count++;
    if (isMissing(details.minSalary)) count++;
    if (isMissing(details.maxSalary)) count++;
    if (isMissing(details.minExp)) count++;
    if (isMissing(details.maxExp)) count++;
    return count;
  };
  
  const missingCount = getMissingInputCount();

  const calculateLiveScore = () => {
    let score = details.aiScore || 50; 
    // Reward filling fields
    if (!isMissing(details.jobTitle)) score += 2;
    if (!isMissing(details.minSalary)) score += 5;
    if (!isMissing(details.minExp)) score += 2;
    if (!isMissing(details.noticePeriod)) score += 3;
    if (!isMissing(details.qualification)) score += 3;
    // Penalty for criticals
    if (isMissing(details.jobTitle)) score -= 5;
    return Math.min(Math.max(score, 0), 100); 
  };

  const liveScore = calculateLiveScore();

  // --- ANALYSIS EFFECT ---
  useEffect(() => {
    const runAnalysis = async () => {
      if (!initialText) return;

      try {
        const data = await extractJobDetails(initialText);
        
        if (data) {
          const safeNum = (v) => parseInt(v) || 0;
          const safeStr = (v) => v || "";
          const safeArr = (v) => Array.isArray(v) ? v : [];

          setDetails({
            jobTitle: safeStr(data.basicInfo?.jobTitle),
            role: safeStr(data.basicInfo?.role),
            department: safeStr(data.basicInfo?.department),
            location: safeStr(data.basicInfo?.location),
            workMode: safeStr(data.basicInfo?.workMode) || "Hybrid",
            shiftTiming: safeStr(data.basicInfo?.shiftTiming) || "General",
            employmentType: safeStr(data.basicInfo?.employmentType) || "Full-time",
            
            minExp: safeNum(data.compensation?.minExp),
            maxExp: safeNum(data.compensation?.maxExp),
            minSalary: safeStr(data.compensation?.minSalary),
            maxSalary: safeStr(data.compensation?.maxSalary),
            currency: safeStr(data.compensation?.currency) || "INR",
            
            skills: {
              hard: safeArr(data.skills?.hardSkills),
              soft: safeArr(data.skills?.softSkills),
              tools: safeArr(data.skills?.tools)
            },
            
            marketData: {
              industrySalary: safeStr(data.marketIntelligence?.industrySalaryRange) || "N/A",
              timeToFill: safeStr(data.marketIntelligence?.avgTimeToFill) || "30 Days",
              difficulty: safeStr(data.marketIntelligence?.difficultyLevel) || "Medium"
            },
            
            gaps: safeArr(data.qualityCheck?.criticalGaps),
            improvements: safeArr(data.qualityCheck?.improvements),
            aiScore: safeNum(data.qualityCheck?.jdScore),
            
            qualification: safeStr(data.sourcingParams?.qualification),
            noticePeriod: safeStr(data.sourcingParams?.noticePeriod),
            
            clarificationQuestions: safeArr(data.clarificationQuestions),
            interviewQuestions: safeArr(data.interviewQuestions),
            sourcingStrategy: data.sourcingStrategy || { naukriBoolean: "", linkedinBoolean: "", targetTitles: [], targetCompanies: [] }
          });

          const skillsStr = (data.skills?.hardSkills || []).join(", ");
          const tests = await generateTestRecommendations(data.basicInfo?.jobTitle, skillsStr);
          setAvailableTests(tests);
          setSelectedTests(tests.filter(t => t.recommended).map(t => t.id));
        }
      } catch (err) {
        console.error("Analysis Error:", err);
      } finally {
        setAnalyzing(false);
      }
    };
    runAnalysis();
  }, [initialText]);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const toggleTest = (testId) => {
    setSelectedTests(prev => prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]);
  };

  const handleRegenerateJD = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      const header = `
ROLE: ${details.jobTitle.toUpperCase()}
DEPARTMENT: ${details.department || "Engineering"}
LOCATION: ${details.location} (${details.workMode})
SHIFT: ${details.shiftTiming} | TYPE: ${details.employmentType}
--------------------------------------------------
COMPENSATION: ${details.minSalary} - ${details.maxSalary} ${details.currency}
EXPERIENCE: ${details.minExp} - ${details.maxExp} Years
NOTICE PERIOD: ${details.noticePeriod}
EDUCATION: ${details.qualification}
--------------------------------------------------
`.trim();
      const bodySeparator = "--------------------------------------------------";
      const originalBody = fullJDText.includes(bodySeparator) ? fullJDText.split(bodySeparator).pop() : fullJDText;
      setFullJDText(`${header}\n\n${originalBody.trim()}`);
      setIsRegenerating(false);
      setActiveTab('insights'); 
    }, 1000);
  };

  const handleAnswerQuestion = (questionId, answer) => {
    const newText = `${fullJDText}\n\n[Update]: Requirement clarified - ${answer}`;
    setFullJDText(newText);
    setDetails(prev => ({
      ...prev,
      clarificationQuestions: prev.clarificationQuestions.filter(q => q.id !== questionId)
    }));
  };

  const handleFinalizeClick = () => {
    const fullTestObjects = availableTests.filter(t => selectedTests.includes(t.id));
    onFinalize({ ...details, aiScore: liveScore, fullText: fullJDText, selectedTests: fullTestObjects });
  };

  const inputClass = (val) => `w-full mt-1 p-2 border rounded text-sm transition ${isMissing(val) ? 'border-amber-300 bg-amber-50 focus:ring-amber-200' : 'border-slate-200 focus:ring-indigo-500'}`;

  if (analyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center animate-in fade-in">
        <div className="relative w-24 h-24 mb-6">
           <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
           <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
           <Sparkles className="absolute inset-0 m-auto text-indigo-600 w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Analyzing JD...</h2>
        <p className="text-slate-500 mt-2">Extracting skills, benchmarking salary, and calculating score.</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto pb-6">
      
      {/* LEFT COLUMN: LIVE EDITOR */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-700 font-bold"><Layout className="w-5 h-5 text-indigo-600" /> Live JD Editor</div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Quality Score</span>
            <span className={`text-xs font-bold px-2 py-1 rounded border ${liveScore >= 80 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
               {liveScore}/100
            </span>
          </div>
        </div>
        <textarea value={fullJDText} onChange={(e) => setFullJDText(e.target.value)} className={`flex-1 w-full p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed text-slate-700 custom-scrollbar ${isRegenerating ? 'opacity-50' : ''}`} placeholder="Job Description content..."></textarea>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
           <button onClick={onBack} className="text-slate-500 font-bold text-sm flex items-center gap-2 hover:text-indigo-600 transition"><ArrowLeft className="w-4 h-4" /> Back</button>
           <button onClick={handleFinalizeClick} className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-600 transition flex items-center gap-2 shadow-lg text-sm"><FileCheck className="w-4 h-4" /> Finalize & Post</button>
        </div>
      </div>

      {/* RIGHT COLUMN: INTELLIGENCE PANEL */}
      <div className="w-full lg:w-[500px] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        
        {/* TABS */}
        <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-hide">
          <button onClick={() => setActiveTab('insights')} className={`flex-1 min-w-[80px] py-3 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${activeTab === 'insights' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}><BarChart3 className="w-4 h-4" /> Insights</button>
          
          <button onClick={() => setActiveTab('consultant')} className={`flex-1 min-w-[80px] py-3 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${activeTab === 'consultant' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}>
            <Bot className="w-4 h-4" /> Refine {details.clarificationQuestions.length > 0 && <span className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] ml-1">{details.clarificationQuestions.length}</span>}
          </button>

          <button onClick={() => setActiveTab('inputs')} className={`flex-1 min-w-[80px] py-3 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${activeTab === 'inputs' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}>
            <Settings className="w-4 h-4" /> Inputs {missingCount > 0 && <span className="w-4 h-4 bg-amber-500 text-white rounded-full flex items-center justify-center text-[9px] ml-1">{missingCount}</span>}
          </button>

          <button onClick={() => setActiveTab('sourcing')} className={`flex-1 min-w-[80px] py-3 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${activeTab === 'sourcing' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}><Search className="w-4 h-4" /> Source</button>
          
          <button onClick={() => setActiveTab('tests')} className={`flex-1 min-w-[80px] py-3 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${activeTab === 'tests' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}><ListChecks className="w-4 h-4" /> Tests</button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 pb-20 bg-slate-50/50">
          
          {/* TAB 1: INSIGHTS */}
          {activeTab === 'insights' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div><h3 className="font-bold text-slate-800 text-lg">{details.jobTitle || "Job Position"}</h3><div className="flex gap-2 text-xs text-slate-500 mt-1"><span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {details.location || "N/A"}</span><span className="flex items-center gap-1"><Users className="w-3 h-3"/> {details.workMode}</span></div></div>
                  <div className={`text-3xl font-black ${liveScore >= 80 ? 'text-green-600' : 'text-orange-500'}`}>{liveScore}</div>
                </div>
                {details.gaps.length > 0 ? (
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2"><h4 className="text-xs font-bold text-red-800 flex items-center gap-1 mb-2"><AlertTriangle className="w-3 h-3" /> Critical Gaps</h4><ul className="space-y-1">{details.gaps.map((gap, i) => <li key={i} className="text-[11px] text-red-700 flex gap-2"><span>•</span> {gap}</li>)}</ul></div>
                ) : <div className="bg-green-50 p-2 rounded-lg border border-green-100 text-[11px] text-green-700 font-bold flex items-center gap-2 mt-2"><CheckCircle className="w-3 h-3"/> AI Analysis Passed</div>}
              </div>

              {/* MARKET INTEL */}
              <div className="bg-indigo-900 text-white p-5 rounded-xl shadow-lg relative overflow-hidden">
                 <Globe className="absolute top-2 right-2 text-indigo-700 w-20 h-20 opacity-20" />
                 <h4 className="text-xs font-bold text-indigo-300 uppercase mb-3 flex items-center gap-2"><Target className="w-3 h-3"/> Market Intelligence (India)</h4>
                 <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div><p className="text-[10px] text-indigo-300 uppercase">Avg Time to Fill</p><p className="text-lg font-bold">{details.marketData.timeToFill}</p></div>
                    <div><p className="text-[10px] text-indigo-300 uppercase">Difficulty</p><p className="text-lg font-bold">{details.marketData.difficulty}</p></div>
                    <div className="col-span-2 pt-2 border-t border-indigo-800/50"><p className="text-[10px] text-indigo-300 uppercase">Industry Salary Standard</p><p className="text-sm font-bold">{details.marketData.industrySalary}</p></div>
                 </div>
              </div>

              {/* SKILLS */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                 <h4 className="font-bold text-slate-700 text-sm mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-indigo-500" /> Extracted Skills</h4>
                 <div className="space-y-3">
                   <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Hard Skills</p><div className="flex flex-wrap gap-1">{details.skills.hard.map((s, i) => <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-[10px] font-semibold">{s}</span>)}</div></div>
                   <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Soft Skills</p><div className="flex flex-wrap gap-1">{details.skills.soft.map((s, i) => <span key={i} className="px-2 py-0.5 bg-pink-50 text-pink-700 border border-pink-100 rounded text-[10px] font-semibold">{s}</span>)}</div></div>
                   {details.skills.tools.length > 0 && (
                     <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tools & Tech</p><div className="flex flex-wrap gap-1">{details.skills.tools.map((s, i) => <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded text-[10px] font-semibold">{s}</span>)}</div></div>
                   )}
                 </div>
              </div>

              {/* INTERVIEW QUESTIONS */}
              {details.interviewQuestions.length > 0 && (
                <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 shadow-sm">
                  <h4 className="font-bold text-orange-800 text-sm mb-3 flex items-center gap-2"><HelpCircle className="w-4 h-4"/> Suggested Interview Questions</h4>
                  <ul className="space-y-3">{details.interviewQuestions.map((q, i) => (<li key={i} className="text-xs text-orange-700 bg-white p-2 rounded border border-orange-200">{q}</li>))}</ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AI CONSULTANT */}
          {activeTab === 'consultant' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl text-white shadow-md">
                 <div className="flex items-center gap-3 mb-2"><div className="bg-white/20 p-2 rounded-lg"><Bot className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-sm">AI Consultant</h3><p className="text-xs text-indigo-100">I have a few questions to improve your JD.</p></div></div>
              </div>
              {details.clarificationQuestions.length > 0 ? (
                details.clarificationQuestions.map((q) => (
                  <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{q.question}</h4>
                    <div className="space-y-2 mt-3">{q.options.map((opt, idx) => (<button key={idx} onClick={() => handleAnswerQuestion(q.id, opt)} className="w-full text-left px-3 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition border border-indigo-100">{opt}</button>))}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-50"><CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" /><p className="text-sm font-bold text-slate-600">All set! JD looks clear.</p></div>
              )}
            </div>
          )}

          {/* TAB 3: INPUTS (ALL 12 FIELDS) */}
          {activeTab === 'inputs' && (
            <div className="space-y-4 animate-in fade-in">
              {missingCount > 0 && <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-center gap-2 text-amber-700 text-xs font-bold"><AlertTriangle className="w-4 h-4" /> Please fill the highlighted fields below.</div>}
              
              {/* 1. ROLE BASICS */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <button onClick={() => setOpenSection(openSection === 'basics' ? '' : 'basics')} className="w-full px-4 py-3 bg-slate-50 flex justify-between items-center text-xs font-bold uppercase text-slate-500 hover:bg-slate-100"><span>1. Role Basics</span><ChevronDown size={16}/></button>
                {openSection === 'basics' && (
                  <div className="p-4 space-y-3">
                    <div><label className="text-xs text-slate-500 font-semibold">Job Title</label><input name="jobTitle" value={details.jobTitle} onChange={handleInputChange} className={inputClass(details.jobTitle)} /></div>
                    <div><label className="text-xs text-slate-500 font-semibold">Department</label><input name="department" value={details.department} onChange={handleInputChange} className={inputClass(details.department)} /></div>
                    <div className="grid grid-cols-2 gap-2">
                       <div><label className="text-xs text-slate-500">Employment Type</label><select name="employmentType" value={details.employmentType} onChange={handleInputChange} className={inputClass(details.employmentType)}><option>Full-time</option><option>Contract</option><option>Part-time</option></select></div>
                       <div><label className="text-xs text-slate-500">Work Mode</label><select name="workMode" value={details.workMode} onChange={handleInputChange} className={inputClass(details.workMode)}><option>Hybrid</option><option>Remote</option><option>On-site</option></select></div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. LOGISTICS */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <button onClick={() => setOpenSection(openSection === 'logistics' ? '' : 'logistics')} className="w-full px-4 py-3 bg-slate-50 flex justify-between items-center text-xs font-bold uppercase text-slate-500 hover:bg-slate-100"><span>2. Logistics & Sourcing</span><ChevronDown size={16}/></button>
                {openSection === 'logistics' && (
                  <div className="p-4 space-y-3">
                    <div><label className="text-xs text-slate-500">Location</label><input name="location" value={details.location} onChange={handleInputChange} className={inputClass(details.location)} /></div>
                    <div><label className="text-xs text-slate-500">Shift Timing</label><select name="shiftTiming" value={details.shiftTiming} onChange={handleInputChange} className={inputClass(details.shiftTiming)}><option>General</option><option>UK Shift</option><option>US Shift</option><option>Rotational</option></select></div>
                    <div><label className="text-xs text-slate-500">Notice Period</label><input name="noticePeriod" value={details.noticePeriod} onChange={handleInputChange} className={inputClass(details.noticePeriod)} /></div>
                  </div>
                )}
              </div>

              {/* 3. REQUIREMENTS (New) */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <button onClick={() => setOpenSection(openSection === 'reqs' ? '' : 'reqs')} className="w-full px-4 py-3 bg-slate-50 flex justify-between items-center text-xs font-bold uppercase text-slate-500 hover:bg-slate-100"><span>3. Requirements</span><ChevronDown size={16}/></button>
                {openSection === 'reqs' && (
                  <div className="p-4 space-y-3">
                    <div><label className="text-xs text-slate-500">Qualification</label><input name="qualification" value={details.qualification} onChange={handleInputChange} className={inputClass(details.qualification)} /></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="text-xs text-slate-500">Min Exp (Yrs)</label><input type="number" name="minExp" value={details.minExp} onChange={handleInputChange} className={inputClass(details.minExp)} /></div>
                      <div><label className="text-xs text-slate-500">Max Exp (Yrs)</label><input type="number" name="maxExp" value={details.maxExp} onChange={handleInputChange} className={inputClass(details.maxExp)} /></div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. COMPENSATION */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <button onClick={() => setOpenSection(openSection === 'comp' ? '' : 'comp')} className="w-full px-4 py-3 bg-slate-50 flex justify-between items-center text-xs font-bold uppercase text-slate-500 hover:bg-slate-100"><span>4. Compensation</span><ChevronDown size={16}/></button>
                {openSection === 'comp' && (
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="text-xs text-slate-500">Min Salary (INR)</label><input name="minSalary" value={details.minSalary} onChange={handleInputChange} className={inputClass(details.minSalary)} /></div>
                      <div><label className="text-xs text-slate-500">Max Salary (INR)</label><input name="maxSalary" value={details.maxSalary} onChange={handleInputChange} className={inputClass(details.maxSalary)} /></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SOURCING STRATEGY */}
          {activeTab === 'sourcing' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800">
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><Target className="w-4 h-4"/> Targeting Strategy</h4>
                <p className="text-xs">Based on the JD, here are the best Boolean strings and target lists.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Naukri Boolean Search</label>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono break-all text-slate-600">{details.sourcingStrategy.naukriBoolean || "Generating..."}</div>
                  <button className="text-[10px] font-bold text-indigo-600 mt-2 flex items-center gap-1 hover:underline"><Copy className="w-3 h-3"/> Copy String</button>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">LinkedIn Boolean Search</label>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono break-all text-slate-600">{details.sourcingStrategy.linkedinBoolean || "Generating..."}</div>
                  <button className="text-[10px] font-bold text-indigo-600 mt-2 flex items-center gap-1 hover:underline"><Copy className="w-3 h-3"/> Copy String</button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                   <h5 className="text-xs font-bold text-slate-400 uppercase mb-3">Target Job Titles</h5>
                   <div className="flex flex-wrap gap-2">{details.sourcingStrategy.targetTitles.length > 0 ? details.sourcingStrategy.targetTitles.map((t, i) => <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">{t}</span>) : <span className="text-xs text-slate-400">Analyzing...</span>}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                   <h5 className="text-xs font-bold text-slate-400 uppercase mb-3">Target Companies (Domain)</h5>
                   <div className="flex flex-wrap gap-2">{details.sourcingStrategy.targetCompanies.length > 0 ? details.sourcingStrategy.targetCompanies.map((t, i) => <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-bold">{t}</span>) : <span className="text-xs text-slate-400">Analyzing...</span>}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TESTS */}
          {activeTab === 'tests' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-2">
                <h4 className="text-xs font-bold text-purple-800 flex items-center gap-1 mb-1"><BrainCircuit className="w-3 h-3" /> Auto-Generated Tests</h4>
                <p className="text-[11px] text-purple-600">Select assessments to include in the candidate pipeline.</p>
              </div>
              {availableTests.length > 0 ? availableTests.map(test => (
                <label key={test.id} className={`flex items-center gap-3 p-3 rounded-lg border transition cursor-pointer hover:bg-slate-50 ${selectedTests.includes(test.id) ? 'border-purple-500 bg-purple-50/50' : 'border-slate-200'}`}>
                  <input type="checkbox" checked={selectedTests.includes(test.id)} onChange={() => toggleTest(test.id)} className="w-4 h-4 text-purple-600 rounded" />
                  <div className="flex-1"><span className={`text-sm font-bold ${selectedTests.includes(test.id) ? 'text-purple-900' : 'text-slate-700'}`}>{test.name}</span></div>
                </label>
              )) : <p className="text-center text-slate-400 text-sm italic mt-4">No tests generated yet.</p>}
            </div>
          )}
        </div>

        {/* --- GLOBAL FIXED UPDATE BUTTON --- */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-10">
          <button 
            onClick={handleRegenerateJD} 
            disabled={isRegenerating} 
            className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition flex items-center justify-center gap-2 shadow-lg shadow-amber-100"
          >
            {isRegenerating ? <RefreshCw className="w-5 h-5 animate-spin"/> : <RefreshCw className="w-5 h-5" />}
            {isRegenerating ? "Updating..." : "Update JD Text & Score"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default JDAnalysis;