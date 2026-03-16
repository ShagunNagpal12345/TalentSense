// import React, { useState } from 'react';
// import { 
// Upload, FileText, CheckCircle, AlertTriangle, ArrowLeft, 
// RefreshCw, BarChart3, Target, Layout, ShieldCheck, 
// Search, Briefcase, Zap, Info, UserCheck, FileDown, 
// Layers, HardDrive, TrendingUp, Sparkles, XCircle,
// Database, Edit3, ArrowRight, Lightbulb, PieChart, CheckSquare, ListChecks, ArrowUpCircle
// } from 'lucide-react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const ATSScore = () => {
// const [activeTab, setActiveTab] = useState('general'); 
// const [status, setStatus] = useState('idle'); 
// const [file, setFile] = useState(null);
// const [result, setResult] = useState(null);

// const handleFileChange = (e) => {
//    if (e.target.files[0]) {
//       setFile(e.target.files[0]);
//       setResult(null);
//       setStatus('idle');
//    }
// };

// const executeAudit = () => {
//    if (!file) return;
//    setStatus('scanning');
   
//    setTimeout(() => {
//       setResult({
//       overall: 84,
//       sentiment: "Highly Competitive",
//       summary: "Your profile ranks in the top 15% of candidates for Data Analytics roles. While technical parsing is flawless, your 'Impact Density' (quantifiable results) is currently below the senior benchmark.",
      
//       // PAGE 1: TECHNICAL PARSING & FORMATTING
//       parsing: {
//          score: 96,
//          checks: [
//             { label: "Standard Font Check", status: "pass", detail: "Arial & Calibri identified. No encoding errors." },
//             { label: "Section Header Logic", status: "pass", detail: "Standard headers (Experience, Education) mapped correctly." },
//             { label: "Image/Graphic Interference", status: "pass", detail: "No unreadable vector graphics found in text paths." },
//             { label: "Header/Footer Security", status: "fail", detail: "Email address detected in header; risk of bypass in legacy ATS." }
//          ]
//       },

//       // PAGE 2: KEYWORD & SEMANTIC INTELLIGENCE
//       keywords: {
//          score: 72,
//          hardSkills: [
//             { skill: "Python", density: "High", status: "found" },
//             { skill: "SQL Optimization", density: "Medium", status: "found" },
//             { skill: "Cloud Architecture", density: "None", status: "missing" },
//             { skill: "Tableau/Power BI", density: "High", status: "found" }
//          ],
//          acronyms: [
//             { term: "SEO", expanded: false, impact: "Critical" },
//             { term: "ETL", expanded: true, impact: "Low" }
//          ]
//       },

//       // PAGE 3: STRATEGIC LINE OPTIMIZATIONS
//       improvements: [
//          {
//             area: "Experience (Lead Analyst)",
//             current: "Responsible for creating data reports and dashboards for senior management.",
//             suggestion: "Engineered 12+ automated BI dashboards using SQL and Power BI, reducing manual reporting cycles by 40 hours per month.",
//             impact: "+12 Points",
//             benefit: "Quantifies impact and pairs hard skills with business outcomes."
//          },
//          {
//             area: "Skills Section",
//             current: "Skills: Machine Learning, Data Viz, Teamwork.",
//             suggestion: "Core Competencies: Predictive Modeling (Random Forest/XGBoost), Data Visualization (d3.js), and Agile Project Leadership.",
//             impact: "+15 Points",
//             benefit: "Aligns generic skills with specific, high-value ATS keywords."
//          },
//          {
//             area: "Academic Projects",
//             current: "Worked on a project to analyze sales data using Python.",
//             suggestion: "Applied Logistic Regression to a 500k-row retail dataset to predict customer churn with 88% precision.",
//             impact: "+10 Points",
//             benefit: "Demonstrates scale, methodology, and concrete results."
//          }
//       ],

//       // PAGE 4: HIERARCHY & FINAL VERDICT
//       hierarchy: {
//          score: 88,
//          findings: [
//             { label: "Date Formatting", status: "warn", note: "MM/YYYY is preferred over YYYY-MM for calculation accuracy." },
//             { label: "Contact Hyperlinks", status: "pass", note: "LinkedIn URL is live and clickable." },
//             { label: "Page Count", status: "pass", note: "1.5 Pages is optimal for your experience level." }
//          ]
//       },
//       parserPreview: "PARSED_TEXT_START >> NAME: PROF_CANDIDATE >> SUMMARY: DATA_ANALYTICS_EXPERT >> SKILLS: [SQL, PYTHON, TABLEAU] >> WORK_EXP: DS_TALENT_AI_LEAD..."
//       });
//       setStatus('result');
//    }, 3000);
// };

// const exportPDF = async () => {
//    const element = document.getElementById('full-report');
//    const canvas = await html2canvas(element, { scale: 2 });
//    const imgData = canvas.toDataURL('image/png');
//    const pdf = new jsPDF('p', 'mm', 'a4');
//    const imgProps = pdf.getImageProperties(imgData);
//    const pdfWidth = pdf.internal.pageSize.getWidth();
//    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//    pdf.save(`Comprehensive_Audit_Report.pdf`);
// };

// return (
//    // Changed background to match Candidate Portal
//    <div className="text-slate-900 dark:text-slate-200 font-sans p-4 md:p-10 transition-colors duration-300">
//       <div className="max-w-6xl mx-auto">

//       {status !== 'result' ? (
//          <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
//             <div className="lg:col-span-5 space-y-6">
//             <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
//                <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 p-6">
//                   <h2 className="font-bold text-slate-800 dark:text-white uppercase text-xs tracking-widest flex items-center gap-2"><Target className="w-4 h-4 text-violet-500"/> Audit Configuration</h2>
//                </div>
//                <div className="p-8 space-y-6">
//                   <label className="block relative cursor-pointer group">
//                   <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx" />
//                   {/* Updated hover and border colors to violet */}
//                   <div className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all ${file ? 'bg-violet-50 dark:bg-violet-900/10 border-violet-500' : 'border-slate-200 dark:border-slate-700 hover:border-violet-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
//                      <Upload size={40} className={`mb-4 transition-transform group-hover:-translate-y-1 ${file ? 'text-violet-600 dark:text-violet-400' : 'text-slate-300 dark:text-slate-600'}`}/>
//                      <h3 className="font-bold text-slate-800 dark:text-white">{file ? file.name : "Upload Master Resume"}</h3>
//                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 uppercase font-black tracking-widest">Supports .PDF & .DOCX</p>
//                   </div>
//                   </label>
//                   {/* Updated button to Violet gradient */}
//                   <button onClick={executeAudit} disabled={!file || status === 'scanning'} className="w-full bg-violet-600 text-white font-black py-4 rounded-xl shadow-lg shadow-violet-500/20 hover:bg-violet-700 transition-all disabled:opacity-50 uppercase text-xs tracking-widest flex justify-center items-center gap-2">
//                   {status === 'scanning' ? <><RefreshCw className="w-4 h-4 animate-spin"/> Running Multi-Stage Audit...</> : 'Execute Intelligence Audit'}
//                   </button>
//                </div>
//             </div>
//             </div>
//             <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-12 text-center shadow-sm">
//                {status === 'scanning' ? (
//                <div className="space-y-6">
//                   <RefreshCw size={56} className="text-violet-500 animate-spin mx-auto"/>
//                   <p className="text-lg font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tighter">Parsing Neural Layers...</p>
//                </div>
//                ) : (
//                <div className="opacity-20 space-y-4">
//                   <ShieldCheck size={100} strokeWidth={1} className="mx-auto text-slate-400" />
//                   <p className="font-black uppercase text-sm tracking-[0.4em] text-slate-500">Audit Standby</p>
//                </div>
//                )}
//             </div>
//          </div>
//       ) : (
//          /* --- THE 4-PAGE COMPREHENSIVE REPORT --- */
//          <div id="full-report" className="animate-in slide-in-from-bottom-8 duration-1000 space-y-12 pb-24">
            
//             <div className="flex justify-between items-center no-print">
//                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Audit Complete</h2>
//                <button onClick={() => {setStatus('idle'); setFile(null); setResult(null);}} className="text-sm font-bold text-slate-500 hover:text-violet-600 transition flex items-center gap-2">
//                   <RefreshCw className="w-4 h-4"/> Scan Another Resume
//                </button>
//             </div>

//             {/* PAGE 1: EXECUTIVE SUMMARY */}
//             <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
//                <div className="bg-slate-900 p-12 flex flex-col md:flex-row justify-between items-center gap-12 text-white">
//                   <div className="space-y-6 flex-1">
//                      <div className="flex items-center gap-4">
//                         <div className="bg-emerald-500 p-2 rounded-xl shadow-lg"><ShieldCheck size={32} className="text-white"/></div>
//                         <h2 className="text-4xl font-black uppercase tracking-tighter italic">Executive Dossier</h2>
//                      </div>
//                      <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">Audit Status: <span className="text-emerald-400 font-bold">{result?.sentiment}</span>. {result?.summary}</p>
//                      <div className="flex gap-4">
//                         <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">ISO-ATS Standard 2026</span>
//                         <span className="bg-violet-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-500/50">Candidate Rank: High</span>
//                      </div>
//                   </div>
//                   <div className="text-center min-w-[320px] bg-white text-slate-900 p-12 rounded-3xl shadow-2xl ring-4 ring-white/20">
//                      <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4">Total Match Score</p>
//                      <div className="text-[9rem] font-black leading-none tracking-tighter text-violet-600">{result?.overall}<span className="text-3xl text-slate-300 ml-2">%</span></div>
//                      <div className="mt-8 h-2 bg-slate-100 rounded-full overflow-hidden">
//                         <div className="h-full bg-violet-600" style={{width: `${result?.overall}%`}}/>
//                      </div>
//                   </div>
//                </div>

//                {/* PAGE 1.5: TECHNICAL BREAKDOWN */}
//                <div className="p-12 grid md:grid-cols-2 gap-12 border-t border-slate-100 dark:border-slate-800">
//                   <div className="space-y-8">
//                      <h3 className="font-black text-xs uppercase text-slate-400 tracking-widest flex items-center gap-3"><HardDrive className="text-violet-500"/> 1. Parsing & Formatting Audit</h3>
//                      <div className="space-y-4">
//                         {result?.parsing?.checks.map((c, i) => (
//                            <div key={i} className="flex justify-between items-start p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 group hover:border-violet-500 transition-colors">
//                               <div className="space-y-1">
//                                  <p className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter">{c.label}</p>
//                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-relaxed">{c.detail}</p>
//                               </div>
//                               {c.status === 'pass' ? <CheckCircle size={18} className="text-emerald-500"/> : <AlertTriangle size={18} className="text-amber-500"/>}
//                            </div>
//                         ))}
//                      </div>
//                   </div>
//                   <div className="space-y-8">
//                      <h3 className="font-black text-xs uppercase text-slate-400 tracking-widest flex items-center gap-3"><PieChart className="text-emerald-500"/> Efficiency Metrics</h3>
//                      <div className="space-y-10 bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
//                         <Zap className="absolute -right-4 -bottom-4 text-white opacity-5" size={140}/>
//                         {[
//                            {l: "Technical Readability", v: 92, c: "bg-violet-500"},
//                            {l: "Visual Accessibility", v: 88, c: "bg-emerald-500"},
//                            {l: "Contact Persistence", v: 65, c: "bg-amber-500"}
//                         ].map((m, i) => (
//                            <div key={i} className="space-y-2 relative z-10">
//                               <div className="flex justify-between text-[10px] font-black uppercase text-slate-400"><span>{m.l}</span><span>{m.v}%</span></div>
//                               <div className="h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner"><div className={`h-full ${m.c}`} style={{width: `${m.v}%`}}/></div>
//                            </div>
//                         ))}
//                      </div>
//                   </div>
//                </div>
//             </section>

//             {/* PAGE 2: SEMANTIC & KEYWORD INTELLIGENCE */}
//             <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-12 space-y-12">
//                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-8">
//                   <h3 className="text-2xl font-bold flex items-center gap-4 italic text-slate-800 dark:text-white"><Target className="text-red-500" size={28}/> 2. Semantic Keyword Audit</h3>
//                   <div className="text-right">
//                      <span className="text-3xl font-black text-violet-600 dark:text-violet-400">{result?.keywords.score}%</span>
//                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Keyword Density Score</p>
//                   </div>
//                </div>

//                <div className="grid md:grid-cols-3 gap-8">
//                   <div className="col-span-2 space-y-8">
//                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Our NLP engine identified the following technical clusters. Missing clusters (None) represent critical search gaps in enterprise ATS systems.</p>
//                      <div className="grid grid-cols-2 gap-4">
//                         {result?.keywords.hardSkills.map((s, i) => (
//                            <div key={i} className={`p-6 rounded-2xl border-2 flex justify-between items-center ${s.status === 'missing' ? 'border-red-200 bg-red-50 dark:bg-red-900/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950'}`}>
//                               <div>
//                                  <p className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-tight">{s.skill}</p>
//                                  <p className="text-[10px] font-bold text-slate-400 uppercase">Density: {s.density}</p>
//                               </div>
//                               {s.status === 'missing' ? <XCircle size={20} className="text-red-500"/> : <CheckSquare size={20} className="text-emerald-500"/>}
//                            </div>
//                         ))}
//                      </div>
//                   </div>
//                   <div className="bg-violet-50 dark:bg-violet-900/10 p-8 rounded-3xl border border-violet-100 dark:border-violet-900/50 space-y-6">
//                      <h4 className="text-xs font-black uppercase text-violet-700 dark:text-violet-400 tracking-widest flex items-center gap-2"><Layers size={16}/> Acronym Expansion</h4>
//                      <p className="text-[11px] text-violet-600 dark:text-violet-300 font-medium leading-relaxed italic">ATS search logic often look for both the shorthand and full term (e.g., 'Natural Language Processing' AND 'NLP').</p>
//                      <div className="space-y-4">
//                         {result?.keywords.acronyms.map((a, i) => (
//                            <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
//                               <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">{a.term}</span>
//                               <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${a.expanded ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
//                                  {a.expanded ? 'EXPANDED' : 'MISSING FULL TERM'}
//                               </span>
//                            </div>
//                         ))}
//                      </div>
//                   </div>
//                </div>
//             </section>

//             {/* PAGE 3: STRATEGIC LINE OPTIMIZATION */}
//             <section className="space-y-8">
//                <div className="flex items-center gap-4">
//                   <Edit3 className="text-violet-600" size={32}/>
//                   <div>
//                      <h3 className="text-2xl font-bold tracking-tighter italic uppercase text-slate-800 dark:text-white">3. AI Content Optimization Strategy</h3>
//                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Direct interventions for score enhancement</p>
//                   </div>
//                </div>
               
//                <div className="grid gap-8">
//                   {result?.improvements.map((item, i) => (
//                      <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:scale-[1.01] transition-all duration-500 group">
//                         <div className="flex flex-col lg:flex-row min-h-[220px]">
//                            {/* CURRENT */}
//                            <div className="flex-1 p-10 bg-slate-50/50 dark:bg-slate-950/50 border-r border-slate-100 dark:border-slate-800">
//                               <div className="flex items-center justify-between mb-6">
//                                  <span className="text-[10px] font-black uppercase text-red-500 tracking-[0.2em] flex items-center gap-2"><XCircle size={14}/> Weak Narrative</span>
//                                  <span className="text-[9px] font-bold text-slate-400 uppercase italic">Section: {item.area}</span>
//                               </div>
//                               <p className="text-slate-500 dark:text-slate-400 italic text-base leading-relaxed line-through decoration-red-400 decoration-2 opacity-60">"{item.current}"</p>
//                            </div>
                           
//                            {/* INTERSECTION */}
//                            <div className="hidden lg:flex items-center justify-center bg-white dark:bg-slate-900 px-4">
//                               <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-2xl shadow-violet-500/30 group-hover:rotate-12 transition-transform border-4 border-white dark:border-slate-900">
//                                  <ArrowRight size={24}/>
//                               </div>
//                            </div>

//                            {/* SUGGESTED */}
//                            <div className="flex-1 p-10 bg-white dark:bg-slate-900 relative overflow-hidden">
//                               <div className="absolute top-0 right-0 p-6">
//                                  <div className="flex flex-col items-end">
//                                     <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-[11px] font-black shadow-lg animate-pulse">{item.impact}</span>
//                                     <p className="text-[8px] font-black uppercase text-slate-400 mt-2">Potential Gain</p>
//                                  </div>
//                               </div>
//                               <div className="flex items-center gap-2 mb-6">
//                                  <span className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] flex items-center gap-2"><Zap size={14}/> AI-Quantified Power Statement</span>
//                               </div>
//                               <p className="text-slate-900 dark:text-white font-bold text-lg leading-relaxed tracking-tight">"{item.suggestion}"</p>
//                               <div className="mt-8 flex items-start gap-3 bg-violet-50 dark:bg-violet-900/20 p-4 rounded-2xl border border-violet-100 dark:border-violet-800/50">
//                                  <Lightbulb className="text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" size={18}/>
//                                  <p className="text-xs text-violet-700 dark:text-violet-300 font-bold leading-relaxed italic">{item.benefit}</p>
//                               </div>
//                            </div>
//                         </div>
//                      </div>
//                   ))}
//                </div>
//             </section>

//             {/* PAGE 4: HIERARCHY & VERDICT */}
//             <section className="grid lg:grid-cols-3 gap-8">
//                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-12">
//                   <h3 className="text-xl font-bold mb-8 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-3 text-slate-800 dark:text-white"><Layers className="text-violet-600"/> 4. Hierarchy & Sectional Integrity</h3>
//                   <div className="grid md:grid-cols-2 gap-6">
//                      {result?.hierarchy.findings.map((f, i) => (
//                         <div key={i} className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3 group hover:bg-white dark:hover:bg-slate-900 hover:border-violet-500 transition-colors">
//                            <div className="flex justify-between items-center">
//                               <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{f.label}</span>
//                               {f.status === 'pass' ? <CheckCircle size={16} className="text-emerald-500"/> : <AlertTriangle size={16} className="text-amber-500"/>}
//                            </div>
//                            <p className="text-xs text-slate-800 dark:text-slate-300 font-bold leading-relaxed italic group-hover:text-violet-600 transition-colors">"{f.note}"</p>
//                         </div>
//                      ))}
//                   </div>
//                   <div className="mt-12 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
//                      <div className="flex justify-between items-center">
//                         <h3 className="text-xs font-black text-violet-400 uppercase tracking-[0.3em] flex items-center gap-3"><Search size={16}/> Simulated Parser Log (v4.0)</h3>
//                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Read Latency: 42ms</span>
//                      </div>
//                      <div className="bg-black/50 p-6 rounded-xl border border-white/5 shadow-inner">
//                         <p className="text-emerald-400/70 font-mono text-[11px] leading-relaxed italic break-all">
//                            {result?.parserPreview}... [EOF_IDENTIFIED]
//                         </p>
//                      </div>
//                   </div>
//                </div>

//                {/* FINAL ACTION PLAN */}
//                <div className="bg-violet-600 text-white rounded-3xl shadow-2xl p-10 flex flex-col relative overflow-hidden group">
//                   <TrendingUp className="absolute -right-8 -top-8 text-white opacity-10 group-hover:scale-150 transition-transform duration-1000" size={240}/>
//                   <h3 className="text-lg font-black uppercase tracking-widest mb-10 flex items-center gap-3 relative z-10"><ListChecks size={24}/> Final Action Plan</h3>
//                   <div className="space-y-8 relative z-10 flex-1">
//                      {[
//                         { step: 1, text: "Expand SEO acronym in Professional Summary.", impact: "+5%" },
//                         { step: 2, text: "Rewrite Experience bullets using suggested 'Action + Result' formulas.", impact: "+12%" },
//                         { step: 3, text: "Move contact details out of the document header/footer.", impact: "Critical Fix" },
//                         { step: 4, text: "Standardize date formats to Month YYYY.", impact: "+3%" }
//                      ].map((s, i) => (
//                         <div key={i} className="flex gap-4 group/item">
//                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-sm shrink-0 border border-white/20 group-hover/item:bg-white group-hover/item:text-violet-600 transition-colors">{s.step}</div>
//                            <div>
//                               <p className="text-xs font-bold text-white/90 leading-relaxed">{s.text}</p>
//                               <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{s.impact} Potential Gain</span>
//                            </div>
//                         </div>
//                      ))}
//                   </div>
//                   <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="mt-12 bg-white text-violet-600 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl relative z-10 hover:bg-violet-50 transition-colors">
//                      <ArrowUpCircle size={18}/> Review Again
//                   </button>
//                </div>
//             </section>

//             {/* DOWNLOAD FOOTER */}
//             <div className="p-12 bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-800 rounded-[3rem] shadow-2xl flex flex-col md:flex-row gap-8 items-center no-print">
//                <div className="flex-1 space-y-2">
//                   <h4 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">Generate Professional Dossier</h4>
//                   <p className="text-sm text-slate-500 font-medium italic">Create a detailed technical audit report for your offline records.</p>
//                </div>
//                <div className="flex gap-4 w-full md:w-auto">
//                   <button onClick={exportPDF} className="flex-1 md:flex-none bg-violet-600 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-violet-500/30 hover:bg-violet-700 transition-all flex items-center justify-center gap-3">
//                      <FileDown size={20}/> Download Assessment PDF
//                   </button>
//                </div>
//             </div>
//          </div>
//       )}
//       </div>
//    </div>
// );
// };

// export default ATSScore;

import React, { useState } from 'react';
import {
  Upload, CheckCircle, AlertTriangle, ArrowLeft, RefreshCw,
  ShieldCheck, FileDown, Edit3, HardDrive, Search,
  Activity, ArrowUpCircle
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useATSStore } from '../../core/stores/atsStore';

const ATSScore = () => {

  const { latestAudit, saveAuditResult, isAuditing, setAuditing } = useATSStore();

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(latestAudit ? 'result' : 'idle');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
    }
  };

  const executeAudit = () => {
    if (!file) return;

    setStatus('scanning');
    setAuditing(true);

    setTimeout(() => {

      const auditResult = {
        overall: 84,
        sentiment: "Highly Competitive",
        date: new Date().toLocaleDateString(),
        summary:
          "Your resume performs well across ATS parsing and keyword coverage. Improvements in quantified impact and role targeting could increase recruiter response rates.",

        parsing: {
          score: 96,
          checks: [
            { label: "Standard Font Check", status: "pass", detail: "Arial & Calibri detected." },
            { label: "Section Header Logic", status: "pass", detail: "Experience, Skills, Education mapped." },
            { label: "Image/Graphic Interference", status: "pass", detail: "No embedded vector graphics." },
            { label: "Header/Footer Security", status: "fail", detail: "Email detected in header." }
          ]
        },

        keywords: {
          score: 72,
          found: ["Python", "SQL Optimization", "Tableau", "Power BI"],
          missing: ["Cloud Architecture", "Agile Leadership"]
        },

        improvements: [
          {
            area: "Experience (Lead Analyst)",
            current:
              "Responsible for creating data reports and dashboards for senior management.",
            suggestion:
              "Engineered 12 automated BI dashboards using SQL and Power BI reducing reporting workload by 40 hours/month.",
            impact: "+12%",
            benefit:
              "Quantifies impact and improves ATS keyword strength."
          },
          {
            area: "Technical Skills",
            current: "Skills: Machine Learning, Data Viz, Teamwork.",
            suggestion:
              "Core Skills: Predictive Modeling (XGBoost), Data Visualization (Tableau), Cross-Functional Leadership.",
            impact: "+15%",
            benefit:
              "Improves keyword targeting for recruiter searches."
          }
        ],

        hierarchy: {
          score: 88,
          findings: [
            { label: "Date Formatting", status: "warn", note: "Use MM/YYYY format." },
            { label: "Contact Hyperlinks", status: "pass", note: "LinkedIn detected." },
            { label: "Page Count", status: "pass", note: "Resume length optimal." }
          ]
        },

        parserPreview:
          "PARSED_TEXT >> NAME: PROF_CANDIDATE >> SKILLS: SQL | PYTHON | TABLEAU >> ROLE: DATA_ANALYST",

        /* ---------------- NEW ANALYSIS ---------------- */

        impactAnalysis: {
          score: 62,
          quantifiedAchievements: 3,
          genericStatements: 7
        },

        recruiterSimulation: {
          query: "Data Analyst Python SQL Tableau",
          matchScore: 82,
          matched: ["Python", "SQL", "Tableau"],
          missing: ["Data Warehousing"]
        },

        readability: {
          score: 71,
          avgBulletLength: 21,
          passiveVoice: "34%"
        },

        roleAlignment: {
          score: 78,
          detectedRoles: ["Data Analyst", "BI Analyst"],
          conflictingSignals: ["Machine Learning Engineer"]
        },

        skillDistribution: {
          technical: 78,
          tools: 82,
          leadership: 45,
          domain: 61
        }

      };

      saveAuditResult(auditResult);
      setStatus('result');

    }, 2500);
  };

  const exportPDF = async () => {

    const element = document.getElementById('report-container');

    const canvas = await html2canvas(element, { scale: 2 });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save(`ATS_Report_${Date.now()}.pdf`);
  };

  const data = latestAudit || {};

  return (

    <div className="max-w-6xl mx-auto py-10 space-y-10">

      {status !== 'result' ? (

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="bg-white border rounded-xl p-8">

            <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <Upload size={18}/> Upload Resume
            </h2>

            <input
              type="file"
              accept=".pdf,.docx"
              className="mb-6"
              onChange={handleFileChange}
            />

            <button
              onClick={executeAudit}
              disabled={!file || status === 'scanning'}
              className="px-6 py-3 bg-black text-white rounded-md font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {status === 'scanning'
                ? <><RefreshCw className="animate-spin" size={16}/> Analyzing...</>
                : "Run ATS Analysis"}
            </button>

          </div>

          <div className="bg-gray-50 border rounded-xl flex items-center justify-center">

            {status === 'scanning' ? (

              <div className="text-center space-y-4">

                <RefreshCw size={48} className="animate-spin mx-auto text-gray-600"/>

                <p className="text-gray-700 font-medium">
                  Running multi-layer ATS analysis
                </p>

              </div>

            ) : (

              <ShieldCheck size={120} className="text-gray-300"/>

            )}

          </div>

        </div>

      ) : (

        <div id="report-container" className="bg-white border rounded-xl p-10 space-y-10">

          <div className="flex justify-between items-center">

            <button
              onClick={() => setStatus('idle')}
              className="flex items-center gap-2 text-gray-500"
            >
              <ArrowLeft size={16}/> Back
            </button>

            <button
              onClick={exportPDF}
              className="flex items-center gap-2 border px-4 py-2 rounded-md"
            >
              <FileDown size={16}/> Download PDF
            </button>

          </div>

          {/* Score Overview */}

          <div className="grid grid-cols-4 gap-6">

            <Metric label="ATS Score" value={`${data.overall}%`} />
            <Metric label="Keyword Coverage" value={`${data.keywords?.score}%`} />
            <Metric label="Parsing Accuracy" value={`${data.parsing?.score}%`} />
            <Metric label="Structure Score" value={`${data.hierarchy?.score}%`} />

          </div>

          <Section title="Summary">
            <p className="text-gray-600">{data.summary}</p>
          </Section>

          <Section title="Parsing Checks">

            {data.parsing?.checks.map((check, i) => (

              <Row
                key={i}
                label={check.label}
                detail={check.detail}
                status={check.status}
              />

            ))}

          </Section>

          <Section title="Keyword Coverage">

            <div className="grid grid-cols-2 gap-6">

              <List title="Detected" items={data.keywords?.found}/>
              <List title="Missing" items={data.keywords?.missing}/>

            </div>

          </Section>

          <Section title="Experience Impact Analysis">

            <p>Quantified Achievements: {data.impactAnalysis?.quantifiedAchievements}</p>
            <p>Generic Statements: {data.impactAnalysis?.genericStatements}</p>
            <p>Impact Density Score: {data.impactAnalysis?.score}%</p>

          </Section>

          <Section title="Recruiter Search Simulation">

            <p className="mb-2">
              Query: {data.recruiterSimulation?.query}
            </p>

            <p>Match Score: {data.recruiterSimulation?.matchScore}%</p>

          </Section>

          <Section title="Resume Readability">

            <p>Readability Score: {data.readability?.score}%</p>
            <p>Average Bullet Length: {data.readability?.avgBulletLength} words</p>
            <p>Passive Voice Usage: {data.readability?.passiveVoice}</p>

          </Section>

          <Section title="ATS Parser Output">

            <div className="bg-black text-green-400 font-mono text-xs p-4 rounded">
              {data.parserPreview}
            </div>

          </Section>

        </div>

      )}

    </div>
  );
};

const Metric = ({ label, value }) => (
  <div className="border p-5 rounded-md text-center">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h3 className="font-semibold text-lg mb-4">{title}</h3>
    {children}
  </div>
);

const Row = ({ label, detail, status }) => (
  <div className="flex justify-between border-b py-3">
    <div>
      <p className="font-medium">{label}</p>
      <p className="text-gray-500 text-xs">{detail}</p>
    </div>
    {status === "pass"
      ? <CheckCircle className="text-green-500"/>
      : <AlertTriangle className="text-yellow-500"/>
    }
  </div>
);

const List = ({ title, items }) => (
  <div>
    <h4 className="font-semibold mb-2">{title}</h4>
    {items?.map((item, i) => (
      <p key={i}>{item}</p>
    ))}
  </div>
);

export default ATSScore;