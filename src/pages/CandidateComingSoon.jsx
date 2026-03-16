import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Hammer, Construction, Rocket } from 'lucide-react';

const CandidateComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#05080A] text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#00E676]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#4FC3F7]/25 rounded-full blur-3xl" />

      <div className="z-10 text-center px-6 max-w-2xl">
        <div className="w-20 h-20 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-slate-700 shadow-xl">
          <Rocket className="w-10 h-10 text-emerald-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Candidate Portal <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Coming Soon
          </span>
        </h1>

        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          We are building the ultimate AI-powered career assistant. <br />
          Resume analysis, auto-applications, and interview coaching are just around the corner.
        </p>

        <div className="flex justify-center gap-4">
          <Link 
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <button className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition">
            Notify Me
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 text-xs text-slate-600 font-mono">
        BUILD_VER: 0.9.2-alpha
      </div>
    </div>
  );
};

export default CandidateComingSoon;