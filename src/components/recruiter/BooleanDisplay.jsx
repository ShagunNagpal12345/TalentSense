import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

const BooleanDisplay = ({ booleanString }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(booleanString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700 mt-6">
      {/* Header of the 'Code Block' */}
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
          <Terminal className="w-4 h-4" />
          <span>GENERATED_BOOLEAN_QUERY.txt</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-white transition"
        >
          {copied ? <><Check className="w-3 h-3" /> COPIED</> : <><Copy className="w-3 h-3" /> COPY STRING</>}
        </button>
      </div>

      {/* The Actual String */}
      <div className="p-6 font-mono text-sm text-green-400 leading-relaxed break-words whitespace-pre-wrap">
        {booleanString}
      </div>
      
      <div className="bg-slate-800/50 px-4 py-2 text-[10px] text-slate-500 text-center">
         Use this string on LinkedIn Recruiter, Naukri, or Indeed.
      </div>
    </div>
  );
};

export default BooleanDisplay;