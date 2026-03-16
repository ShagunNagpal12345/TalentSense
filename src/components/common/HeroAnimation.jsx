// import React, { useState, useEffect } from 'react';
// import { FileText, Globe, Zap, CheckCircle } from 'lucide-react';

// const HeroAnimation = () => {
//   const [score, setScore] = useState(0);
//   const [analyzing, setAnalyzing] = useState(true);

//   // Simulate AI JD Analysis
//   useEffect(() => {
//     let interval;
//     if (analyzing) {
//       interval = setInterval(() => {
//         setScore(prev => {
//           if (prev >= 95) {
//             setAnalyzing(false);
//             clearInterval(interval);
//             return 95;
//           }
//           return prev + 5;
//         });
//       }, 100);
//     }
//     return () => clearInterval(interval);
//   }, [analyzing]);

//   return (
//     <div className="relative hidden lg:block">
//       <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-sky-500/20 blur-3xl rounded-full" />
      
//       {/* Mock Application Window */}
//       <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 p-4 shadow-2xl backdrop-blur-xl transform rotate-1 hover:rotate-0 transition-transform duration-500 flex gap-4">
        
//         {/* Mock Live JD Editor */}
//         <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col">
//           <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
//             <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
//               <FileText className="w-3 h-3"/> Live JD Editor
//             </div>
//             <div className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${analyzing ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
//               JD Score: {score}/100
//             </div>
//           </div>
//           <div className="space-y-2 flex-1">
//             <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
//             <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
//             <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
//             <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded mt-4"></div>
//             <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-800 rounded"></div>
//           </div>
//           <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
//             <div className="h-6 w-24 bg-slate-900 dark:bg-white rounded-lg opacity-50 animate-pulse"></div>
//           </div>
//         </div>

//         {/* Mock Right Panel (Insights) */}
//         <div className="w-[220px] flex flex-col gap-3">
//            {/* AI Market Analysis */}
//            <div className="bg-indigo-900 text-white rounded-xl p-3 shadow-md relative overflow-hidden transition-all duration-700 delay-100" style={{ opacity: score > 30 ? 1 : 0, transform: score > 30 ? 'translateY(0)' : 'translateY(10px)' }}>
//              <Globe className="absolute top-1 right-1 text-indigo-700 w-12 h-12 opacity-30" />
//              <h4 className="text-[9px] font-bold text-indigo-300 uppercase mb-2">Market Intel</h4>
//              <div className="grid grid-cols-2 gap-2 relative z-10">
//                 <div><p className="text-[8px] text-indigo-400">Time to Fill</p><p className="text-sm font-bold">60-90 Days</p></div>
//                 <div><p className="text-[8px] text-indigo-400">Difficulty</p><p className="text-sm font-bold">High</p></div>
//              </div>
//            </div>

//            {/* Skills Matrix */}
//            <div className="bg-white dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-slate-800 transition-all duration-700 delay-300" style={{ opacity: score > 60 ? 1 : 0, transform: score > 60 ? 'translateY(0)' : 'translateY(10px)' }}>
//              <h4 className="text-[9px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><Zap className="w-3 h-3 text-emerald-500"/> Extracted Skills</h4>
//              <div className="flex flex-wrap gap-1">
//                <span className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded text-[9px] font-bold border border-indigo-100 dark:border-indigo-800">React.js</span>
//                <span className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded text-[9px] font-bold border border-indigo-100 dark:border-indigo-800">Node.js</span>
//                <span className="px-1.5 py-0.5 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded text-[9px] font-bold border border-pink-100 dark:border-pink-800">Leadership</span>
//              </div>
//            </div>

//            {/* Critical Gaps / Success */}
//            <div className={`rounded-xl p-3 border transition-all duration-700 delay-500 ${score === 95 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50'}`} style={{ opacity: score > 80 ? 1 : 0, transform: score > 80 ? 'translateY(0)' : 'translateY(10px)' }}>
//              {score === 95 ? (
//                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
//                  <CheckCircle className="w-4 h-4"/><span className="text-xs font-bold">JD Ready to Post</span>
//                </div>
//              ) : (
//                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
//                  <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
//                  <span className="text-xs font-bold">Fixing Gaps...</span>
//                </div>
//              )}
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroAnimation;


import React, { useState, useEffect } from "react";
import {
  FileText,
  Globe,
  Zap,
  CheckCircle,
  Users,
  Brain,
  TrendingUp,
} from "lucide-react";

const HeroAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("analysis");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setPhase("complete");
          clearInterval(interval);
          return 100;
        }

        if (prev > 70) setPhase("matching");
        else if (prev > 40) setPhase("skills");
        else if (prev > 10) setPhase("analysis");

        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden lg:block w-full max-w-6xl mx-auto">

      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 blur-3xl rounded-full" />

      <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 flex gap-6">

        {/* LEFT PANEL – JD EDITOR */}

        <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col">

          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
              <FileText size={14} />
              Live Job Description
            </div>

            <div className="text-xs font-bold px-3 py-1 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              AI Score {progress}%
            </div>
          </div>

          {/* Fake JD text */}

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">

            <p className="animate-pulse">
              We are looking for a Senior React Engineer...
            </p>

            <p className="animate-pulse">
              Build scalable frontend systems with modern frameworks...
            </p>

            <p className="animate-pulse">
              Collaborate with backend teams and product managers...
            </p>

            <p className="animate-pulse">
              Optimize performance and maintain clean architecture...
            </p>

          </div>

          {/* progress bar */}

          <div className="mt-auto pt-4">

            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="w-[260px] flex flex-col gap-4">

          {/* AI ANALYSIS */}

          <div
            className={`rounded-xl p-3 bg-indigo-900 text-white transition-all duration-700 ${
              progress > 10 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2 mb-2 text-indigo-300 text-xs font-semibold uppercase">
              <Brain size={14} />
              AI Analysis
            </div>

            <p className="text-xs text-indigo-200">
              Parsing role requirements, responsibilities, and experience level.
            </p>
          </div>

          {/* SKILLS EXTRACTION */}

          <div
            className={`rounded-xl border p-3 transition-all duration-700 ${
              progress > 40
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold mb-2">
              <Zap size={14} className="text-emerald-500" />
              Skills Extracted
            </div>

            <div className="flex flex-wrap gap-1 text-[10px]">
              <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                React
              </span>

              <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                Node
              </span>

              <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                Typescript
              </span>

              <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded">
                Leadership
              </span>
            </div>
          </div>

          {/* CANDIDATE MATCHING */}

          <div
            className={`rounded-xl border p-3 transition-all duration-700 ${
              progress > 70
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold mb-2">
              <Users size={14} className="text-blue-500" />
              Candidate Matches
            </div>

            <div className="space-y-2 text-[11px]">

              <div className="flex justify-between">
                <span>Candidate A</span>
                <span className="text-green-500 font-semibold">92%</span>
              </div>

              <div className="flex justify-between">
                <span>Candidate B</span>
                <span className="text-green-500 font-semibold">88%</span>
              </div>

              <div className="flex justify-between">
                <span>Candidate C</span>
                <span className="text-yellow-500 font-semibold">75%</span>
              </div>

            </div>
          </div>

          {/* MARKET INTEL */}

          <div
            className={`rounded-xl border p-3 transition-all duration-700 ${
              progress > 85
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold mb-2">
              <TrendingUp size={14} className="text-purple-500" />
              Market Insights
            </div>

            <div className="grid grid-cols-2 text-[11px] gap-2">
              <div>
                <p className="text-slate-400">Hiring Time</p>
                <p className="font-semibold">60 days</p>
              </div>

              <div>
                <p className="text-slate-400">Demand</p>
                <p className="font-semibold">High</p>
              </div>
            </div>
          </div>

          {/* FINAL RESULT */}

          <div
            className={`rounded-xl p-3 border ${
              phase === "complete"
                ? "bg-green-50 border-green-200"
                : "bg-amber-50 border-amber-200"
            }`}
          >
            {phase === "complete" ? (
              <div className="flex items-center gap-2 text-green-600 font-semibold text-xs">
                <CheckCircle size={16} />
                Job Ready to Publish
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600 font-semibold text-xs">
                <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                Optimizing Job Description...
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroAnimation;