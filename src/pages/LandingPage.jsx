// import React from "react";
// import { useNavigate } from "react-router-dom";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
//       {/* HEADER / NAV */}
//       <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-lg">
//             TS
//           </div>
//           <div>
//             <div className="text-lg font-semibold tracking-tight">
//               TalentSense
//             </div>
//             <div className="text-xs text-slate-400">
//               AI-Powered Hiring Platform
//             </div>
//           </div>
//         </div>

//         <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
//           <a href="#about" className="hover:text-emerald-300 transition-colors">
//             About
//           </a>
//           <a href="#how-it-works" className="hover:text-emerald-300 transition-colors">
//             How it Works
//           </a>
//           <a href="#candidates" className="hover:text-emerald-300 transition-colors">
//             For Candidates
//           </a>
//           <a href="#recruiters" className="hover:text-emerald-300 transition-colors">
//             For Recruiters
//           </a>
//           <a href="#pricing" className="hover:text-emerald-300 transition-colors">
//             Pricing
//           </a>
//           <a href="#faq" className="hover:text-emerald-300 transition-colors">
//             FAQ
//           </a>
//         </nav>

//         <div className="hidden md:flex gap-3">
//           <button
//             onClick={() => navigate("/candidate/login")}
//             className="px-4 py-2 rounded-lg border border-emerald-400/50 text-emerald-300 text-sm hover:bg-emerald-400/10 transition"
//           >
//             Candidate Login
//           </button>
//           <button
//             onClick={() => navigate("/recruiter/login")}
//             className="px-4 py-2 rounded-lg bg-emerald-400 text-slate-950 text-sm font-semibold hover:bg-emerald-300 transition"
//           >
//             Recruiter Login
//           </button>
//           <button
//             onClick={() => navigate("/client/login")}
//             className="px-4 py-2 rounded-lg bg-sky-500 text-slate-950 text-sm font-semibold hover:bg-sky-400 transition"
//           >
//             Client Login
//           </button>
//         </div>
//       </header>

//       {/* HERO SECTION */}
//       <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 grid md:grid-cols-[1.3fr,1fr] gap-12 items-center">
//         {/* Left: Text */}
//         <div>
//           <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80 mb-3">
//             One platform. Infinite Possibilities.
//           </p>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
//             A Complete Recruitment Solution
//             <span className="block text-emerald-300 mt-1">
//               for Recruiters, Clients & Candidates
//             </span>
//           </h1>
//           <p className="mt-5 text-base md:text-lg text-slate-300 max-w-xl">
//             TalentSense automates sourcing, testing, resume screening and interview
//             insights so you can hire faster, smarter and with full visibility
//             across every stage of the hiring pipeline.
//           </p>

//           {/* Hero CTAs */}
//           <div className="mt-8 flex flex-col sm:flex-row gap-4">

//           <button
//               onClick={() => navigate("/client/login")}
//               className="px-8 py-3 rounded-xl bg-sky-500 text-slate-950 font-semibold text-sm shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition"
//             >
//               I’m a Client
//             </button>
            
//             <button
//               onClick={() => navigate("/recruiter/login")}
//               className="px-8 py-3 rounded-xl bg-emerald-400 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 transition"
//             >
//               I’m a Recruiter
//             </button>
            
//             <button
//               onClick={() => navigate("/candidate/login")}
//               className="px-8 py-3 rounded-xl border border-slate-500 text-slate-100 font-semibold text-sm hover:border-emerald-300 hover:text-emerald-200 transition"
//             >
//               I’m a Candidate
//             </button>
//           </div>

//           {/* Hero highlights */}
//           <div className="mt-8 flex flex-wrap gap-6 text-xs md:text-sm text-slate-300">
//             <Highlight stat="67%" label="Reduction in time per hire" />
//             <Highlight stat="$600" label="Average cost saved per hire" />
//             <Highlight stat="AI-Driven" label="Resume & interview analytics" />
//           </div>
//         </div>

//         {/* Right: Visual placeholder */}
//         <div className="relative">
//           <div className="absolute -inset-6 bg-emerald-500/20 blur-3xl rounded-[40px]" />
//           <div className="relative rounded-[28px] border border-emerald-400/40 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-900/90 p-5 shadow-[0_0_40px_rgba(16,185,129,0.25)]">
//             <div className="text-xs uppercase tracking-[0.24em] text-emerald-300 mb-3">
//               Dashboard Preview
//             </div>
//             <div className="h-60 md:h-72 rounded-2xl border border-dashed border-emerald-300/40 flex items-center justify-center text-xs md:text-sm text-emerald-200/80 bg-slate-900/80">
//               {/* Replace with real screenshot later */}
//               Dashboard Visualization Placeholder
//             </div>
//             <p className="mt-3 text-[11px] text-slate-400">
//               Visualise candidate pipelines, scores, ATS match and interview
//               analytics in one place.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ABOUT / WHAT THE TOOL DOES */}
//       <section id="about" className="max-w-6xl mx-auto px-6 pb-16">
//         <div className="grid md:grid-cols-[1.4fr,1fr] gap-10 items-start">
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold mb-4">
//               What is TalentSense?
//             </h2>
//             <p className="text-slate-300 text-sm md:text-base">
//               TalentSense is a recruitment solution designed to automate and simplify
//               the hiring process. It streamlines candidate sourcing, evaluation and
//               selection so that recruiters spend less time on manual tasks and more
//               time on strategic decisions.
//             </p>

//             <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
//               <AboutChip title="Automated" desc="JD → Tests → Emails → Interviews" />
//               <AboutChip title="AI-Powered" desc="Resume & interview intelligence" />
//               <AboutChip title="Scalable" desc="Multiple roles & high-volume hiring" />
//             </div>
//           </div>

//           <div className="bg-slate-900/70 rounded-2xl border border-slate-700 p-5 text-sm text-slate-200">
//             <h3 className="text-sm font-semibold mb-3 text-emerald-300">
//               Why TalentSense is Needed
//             </h3>
//             <ul className="space-y-2 list-disc list-inside">
//               <li>Manual resume sorting and follow-ups are slow and inconsistent.</li>
//               <li>High operational costs for every new hire.</li>
//               <li>Shortlisting often depends on subjective judgment.</li>
//             </ul>
//             <p className="mt-3 text-slate-300">
//               TalentSense combines automation and AI to reduce manual effort,
//               increase accuracy and provide a transparent experience for both
//               recruiters and candidates.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section
//         id="how-it-works"
//         className="max-w-6xl mx-auto px-6 pb-20 border-t border-slate-800 pt-14"
//       >
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
//           How TalentSense Works
//         </h2>
//         <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto text-center mb-10">
//           A single workflow that connects JDs, tests, resumes, interviews and offers.
//         </p>
//         <div className="grid md:grid-cols-4 gap-6 text-sm">
//           {[
//             "Upload job description",
//             "Platform generates recommended tests",
//             "Invite candidates via email",
//             "Candidates create profile & upload resume",
//             "AI matches resumes & JDs with a fit score",
//             "Candidates complete tests & intro video",
//             "Recruiters review scores & schedule interview",
//             "Offers rolled out & status tracked end-to-end",
//           ].map((step, idx) => (
//             <div
//               key={idx}
//               className="relative bg-slate-900/80 rounded-xl border border-slate-700 p-4"
//             >
//               <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold flex items-center justify-center mb-3">
//                 {idx + 1}
//               </div>
//               <p className="text-slate-200">{step}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* EXPERIENCES SECTION */}
//       <section
//         id="candidates"
//         className="max-w-6xl mx-auto px-6 pb-20 border-t border-slate-800 pt-14"
//       >
//         <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
//           Tailored Experiences for Everyone
//         </h2>
//         <p className="text-slate-300 text-sm md:text-base max-w-3xl mx-auto text-center mb-10">
//           TalentSense serves all sides of the hiring journey. Candidates build
//           stronger profiles, Recruiters find talent faster, and Clients get full visibility.
//         </p>

//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Candidate Experience */}
//           <div className="bg-slate-900/70 rounded-2xl border border-slate-700 p-6">
//             <h3 className="text-xl font-semibold mb-1">For Candidates</h3>
//             <p className="text-xs uppercase text-emerald-300 mb-4">
//               Build. Improve. Track.
//             </p>
//             <ul className="space-y-2 text-sm text-slate-200">
//               <li>• Create rich profiles & upload resumes</li>
//               <li>• Check <span className="text-emerald-300">ATS scores</span> vs JDs</li>
//               <li>• Take skill tests & micro-courses</li>
//               <li>• Record intro videos & interviews</li>
//             </ul>
//           </div>

//           {/* Recruiter Experience */}
//           <div id="recruiters" className="bg-slate-900/70 rounded-2xl border border-slate-700 p-6">
//             <h3 className="text-xl font-semibold mb-1">For Recruiters</h3>
//             <p className="text-xs uppercase text-sky-300 mb-4">
//               Source. Screen. Select.
//             </p>
//             <ul className="space-y-2 text-sm text-slate-200">
//               <li>• Post jobs & get recommended tests</li>
//               <li>• Bulk email invites & tracking</li>
//               <li>• View <span className="text-sky-300">AI fit scores</span> & video analytics</li>
//               <li>• Manage end-to-end pipeline</li>
//             </ul>
//           </div>

//           {/* Client Experience */}
//           <div className="bg-slate-900/70 rounded-2xl border border-slate-700 p-6">
//             <h3 className="text-xl font-semibold mb-1">For Clients</h3>
//             <p className="text-xs uppercase text-purple-300 mb-4">
//               Collaborate. Approve. Hire.
//             </p>
//             <ul className="space-y-2 text-sm text-slate-200">
//               <li>• Submit requisitions to recruiters</li>
//               <li>• Review shortlisted candidate profiles</li>
//               <li>• Give feedback on interviews</li>
//               <li>• Track time-to-fill & ROI analytics</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* FINAL CTA */}
//       <section className="border-t border-slate-800">
//         <div className="max-w-6xl mx-auto px-6 py-14 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-3">
//             TalentSense: Transforming Recruitment.
//           </h2>
//           <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mb-8">
//             Save time, cut costs and hire smarter — with a single platform that
//             respects recruiter workflows, client needs, and candidate growth journeys.
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               onClick={() => navigate("/recruiter/login")}
//               className="px-10 py-3 rounded-xl bg-emerald-400 text-slate-950 font-semibold text-sm hover:bg-emerald-300 transition"
//             >
//               Recruiter Login
//             </button>
//             <button
//               onClick={() => navigate("/client/login")}
//               className="px-10 py-3 rounded-xl bg-sky-500 text-slate-950 font-semibold text-sm hover:bg-sky-400 transition"
//             >
//               Client Login
//             </button>
//             <button
//               onClick={() => navigate("/candidate/login")}
//               className="px-10 py-3 rounded-xl border border-slate-600 text-slate-100 font-semibold text-sm hover:border-emerald-300 hover:text-emerald-200 transition"
//             >
//               Candidate Login
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// /* Helper components */
// const Highlight = ({ stat, label }) => (
//   <div className="flex items-center gap-3">
//     <div className="text-lg font-semibold text-emerald-300">{stat}</div>
//     <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
//   </div>
// );

// const AboutChip = ({ title, desc }) => (
//   <div className="bg-slate-900/80 rounded-xl border border-slate-700 px-4 py-3">
//     <div className="text-xs font-semibold text-emerald-300 mb-1">{title}</div>
//     <div className="text-xs text-slate-300">{desc}</div>
//   </div>
// );

// export default LandingPage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, Sparkles, BrainCircuit, Zap, Users, 
  Briefcase, Building, CheckCircle, LineChart, Target, 
  ShieldCheck, FileText, Sun, Moon, ChevronDown, Star, Globe, Clock, Search,
  Monitor, Settings, LifeBuoy, Facebook, Twitter, Linkedin, Instagram, Youtube, Send, Shield, Award, Smartphone
} from "lucide-react";

// --- IMPORT THE NEW ANIMATION COMPONENT ---
import HeroAnimation from "../components/common/HeroAnimation";

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Theme state: defaults to light mode
  const [isDark, setIsDark] = useState(false);

  // --- FIXED THEME SWITCHER LOGIC ---
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 selection:bg-emerald-500/30 font-sans overflow-x-hidden transition-colors duration-300 flex flex-col">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-400/10 dark:bg-emerald-900/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-500" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-sky-400/10 dark:bg-sky-900/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-500" />
      </div>

      <div className="relative z-10 flex-grow">
        {/* HEADER / NAV */}
        <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20">
              TS
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                TalentSense
              </div>
              <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI-Powered Hiring
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600 dark:text-slate-400">
            <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Products</a>
            <a href="#gaps" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Why Us</a>
            <a href="#businesses" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Solutions</a>
            <a href="#faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate("/candidate/login")}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Candidate Login
              </button>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-800 mx-1"></div>
              <button
                onClick={() => navigate("/client/login")}
                className="px-4 py-2 rounded-lg bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 text-sm font-bold hover:bg-sky-200 dark:hover:bg-sky-500/20 transition"
              >
                Client
              </button>
              <button
                onClick={() => navigate("/recruiter/login")}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-white dark:text-slate-950 text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition"
              >
                Recruiter
              </button>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-[1.1fr,1.1fr] gap-12 items-center">
          {/* Left: Text */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              The Complete Hiring Infrastructure
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-6">
              Hire Smarter, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500 dark:from-emerald-400 dark:to-sky-400">
                Not Harder.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-10 leading-relaxed font-medium">
              Automate your entire recruitment workflow. Let AI analyze Job Descriptions, match resumes, and uncover real market intelligence instantly.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => navigate("/recruiter/login")}
                className="group px-8 py-4 rounded-xl bg-emerald-500 text-white dark:text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Recruiter Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/client/login")}
                className="px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white font-bold text-sm shadow-sm hover:border-sky-400 dark:hover:border-sky-500/50 hover:-translate-y-0.5 transition-all"
              >
                I am a Client
              </button>
            </div>

            {/* Hero highlights */}
            <div className="flex flex-wrap gap-8 text-sm border-t border-slate-200 dark:border-slate-800 pt-8">
              <Highlight icon={<LineChart/>} stat="60%" label="Faster Turnaround" />
              <Highlight icon={<Target/>} stat="1M+" label="Candidate Database" />
            </div>
          </div>

          {/* Right: INFORMATIVE UI ANIMATION PULLED FROM EXTERNAL COMPONENT */}
          <HeroAnimation />

        </section>

        {/* WHAT WE OFFER */}
        <section id="about" className="py-24 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">What TalentSense offers</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
                We handle everything—from AI-driven JD planning and branding to sourcing, so you can focus on interviewing the best talent.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <OfferingCard 
                title="Smart Job Posting" 
                desc="Receive applications and quickly connect with high-quality, AI-matched relevant candidates." 
                icon={<FileText className="w-6 h-6 text-sky-500" />}
              />
              <OfferingCard 
                title="Resume Database" 
                desc="Access & attract from a pool of 10 crore+ active jobseekers—all processed in real-time." 
                icon={<Search className="w-6 h-6 text-emerald-500" />}
              />
              <OfferingCard 
                title="Expert AI Assist" 
                desc="Leave sourcing, boolean strings, and shortlisting to our AI agents. You focus on interviewing." 
                icon={<BrainCircuit className="w-6 h-6 text-indigo-500" />}
              />
              <OfferingCard 
                title="Employer Branding" 
                desc="Showcase your employer brand story to millions of relevant job seekers automatically." 
                icon={<Star className="w-6 h-6 text-amber-500" />}
              />
              <OfferingCard 
                title="Talent Pulse Analytics" 
                desc="Future-proof your hiring strategy with predictive data-driven talent planning tools." 
                icon={<LineChart className="w-6 h-6 text-pink-500" />}
              />
              <div className="bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-900/20 dark:to-sky-900/20 border border-indigo-100 dark:border-indigo-800/50 p-8 rounded-2xl flex flex-col justify-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Need Help?</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 font-medium">Let us help you find the perfect hiring solution for your team size.</p>
                <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: TEAMS ACTIVELY HIRING FACE THESE COSTLY GAPS --- */}
        <section id="gaps" className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.3fr,1.2fr] gap-16 items-center">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50 text-[10px] uppercase font-bold tracking-wider">
                  IS THIS YOUR HIRING REALITY?
               </div>
               <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Teams actively hiring face these <span className="text-indigo-600 dark:text-indigo-400">costly gaps</span>
               </h2>
               
               <div className="space-y-6 pt-6">
                 <GapItem icon={<Users/>} text="Receive high applicant volumes but lack structured shortlisting" />
                 <GapItem icon={<Clock/>} text="Spend hours manually screening resumes" />
                 <GapItem icon={<Target/>} text="Work across fragmented tools and job boards" />
                 <GapItem icon={<Zap/>} text="Experience slow shortlist-to-interview cycles" />
                 <GapItem icon={<LineChart/>} text="Scaling hiring without scalable screening intelligence" />
               </div>
               
               <p className="text-slate-600 dark:text-slate-400 mt-6 font-medium">
                 The issue usually isn't sourcing more candidates — it's screening and prioritization. That's exactly what this platform is designed to test and resolve.
               </p>
               <button onClick={() => navigate("/client/login")} className="mt-4 px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg hover:bg-indigo-700 transition w-fit">
                 Try TalentSense for FREE
               </button>
            </div>

            {/* Right Side: The Pilot Addresses Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 blur-3xl rounded-full"></div>
               
               <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">The Platform Addresses Exactly:</h4>
               <div className="flex flex-wrap gap-2 mb-10">
                 {["Resume Overload", "Manual Screening", "Candidate Ranking", "Slow Pipelines", "ATS Fragmentation", "Inconsistent Evaluation", "Screening Bias", "Scorecard Generation", "Interview Readiness"].map(chip => (
                   <span key={chip} className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700">
                     {chip}
                   </span>
                 ))}
               </div>

               <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-8"></div>

               <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">What You Get After Implementation:</h4>
               <ul className="space-y-4">
                 <CheckItem text="Screened, ranked candidate shortlist" />
                 <CheckItem text="AI-generated scorecards per candidate" />
                 <CheckItem text="Screening transcripts + evaluations" />
                 <CheckItem text="Clear view on whether AI fits your team" />
               </ul>
            </div>
        </section>

        {/* --- NEW SECTION: THREE PHASES --- */}
        <section className="py-24 bg-slate-100 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
                Three phases. <span className="text-indigo-600 dark:text-indigo-400">Visible outcomes.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
                Throughout the process, your dedicated AI works directly with your team to configure roles, review outputs, and ensure meaningful outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <PhaseCard 
                number="1"
                icon={<Settings className="w-6 h-6"/>}
                title="Configure Your Hiring"
                items={["Select 3 active, open positions", "Upload job descriptions — AI refines them instantly", "Import your internal talent pool", "Route all applications for automated screening"]}
                footer="SIMPLE INPUT. ZERO COMPLEXITY."
              />
              <PhaseCard 
                number="2"
                icon={<BrainCircuit className="w-6 h-6"/>}
                title="AI Drives Execution"
                items={["AI enhances job clarity & role alignment", "Smart matching ranks by contextual fit %", "Automated chat, voice or video screening", "Structured scorecards with strengths & gaps"]}
                footer="AUTOMATION REPLACES MANUAL SCREENING."
              />
              <PhaseCard 
                number="3"
                icon={<ShieldCheck className="w-6 h-6"/>}
                title="Review Ranked Shortlists"
                items={["Ranked shortlists based on AI-calculated fit scores", "Screening transcripts with evaluation insights", "Compare via scorecards & skill-gap analysis", "Move top candidates forward with full clarity"]}
                footer="YOU REVIEW. YOU DECIDE. YOU MOVE FASTER."
              />
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: BEST VIRTUAL INTERVIEW PLATFORM --- */}
        <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.3fr,1fr] gap-16 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                Why TalentSense is the Best Virtual Interview Platform
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                Backed by advanced AI tools and proctoring solutions to ensure process integrity and quality of hires, even at scale.
              </p>
            </div>

            <div className="space-y-8">
              <PlatformFeature icon={<Users/>} title="Massive Talent Pool & Pre-Screening Ease" desc="Get instant access to a 29M+ community. Easily take online assessments with AI proctoring to pre-screen on a single platform." />
              <PlatformFeature icon={<Monitor/>} title="Interview for Any (Every) Role + High Volume" desc="Conduct thousands of interviews for diverse roles simultaneously. Whether technical or creative, the platform delivers." />
              <PlatformFeature icon={<LineChart/>} title="Real-Time Analytics + ONE Dashboard" desc="Detailed data tracking & analytics made easy with smart ATS and interactive dashboard: automated tracking, AI insights, instantly." />
              <PlatformFeature icon={<Zap/>} title="Full Funnel Automation = Seamless Experience" desc="Easy interview scheduling, automated calendar syncs, reminders, and updates to ensure a seamless candidate experience." />
              <PlatformFeature icon={<LifeBuoy/>} title="Dedicated Support & Guaranteed Success" desc="Enjoy dedicated customer support throughout the hiring lifecycle. We ensure a positive experience for both you and candidates." />
            </div>
          </div>

          {/* Right side: Actual Company Logo Wall (6 Lines Infinite Marquee) */}
<div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-sky-100 dark:border-sky-900/50 py-8 sm:py-10 shadow-2xl relative overflow-hidden flex flex-col gap-3 sm:gap-4">
  <div className="absolute -top-6 -right-6 w-24 h-24 bg-sky-400/20 rounded-full blur-2xl z-0"></div>

  {/* Inline CSS for the infinite scrolling animations */}
  <style>{`
    @keyframes marquee-left {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes marquee-right {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    .animate-marquee-left {
      animation: marquee-left 180s linear infinite;
    }
    .animate-marquee-right {
      animation: marquee-right 200s linear infinite;
    }
    .pause-on-hover:hover {
      animation-play-state: paused;
    }
  `}</style>

  {/* Gradient Masks for smooth fading on edges */}
  <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-20 pointer-events-none"></div>
  <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-20 pointer-events-none"></div>

  {/* Generate 6 Rows dynamically */}
  {[0, 1, 2, 3, 4, 5].map((rowIndex) => {
    // Original array of 24 companies
    const companies = [
      { name: "Google", domain: "google.com" },
      { name: "Microsoft", domain: "microsoft.com" },
      { name: "Meta", domain: "meta.com" },
      { name: "Amazon", domain: "amazon.com" },
      { name: "Uber", domain: "uber.com" },
      { name: "Netflix", domain: "netflix.com" },
      { name: "Tesla", domain: "tesla.com" },
      { name: "Nvidia", domain: "nvidia.com" },
      { name: "Intel", domain: "intel.com" },
      { name: "IBM", domain: "ibm.com" },
      { name: "Oracle", domain: "oracle.com" },
      { name: "Cisco", domain: "cisco.com" },
      { name: "PayPal", domain: "paypal.com" },
      { name: "Visa", domain: "visa.com" },
      { name: "Mastercard", domain: "mastercard.com" },
      { name: "Airbnb", domain: "airbnb.com" },
      { name: "Disney", domain: "disney.com" },
      { name: "Nike", domain: "nike.com" },
      { name: "Ford", domain: "ford.com" },
      { name: "Target", domain: "target.com" },
      { name: "FedEx", domain: "fedex.com" },
      { name: "HP", domain: "hp.com" },
      { name: "PWC", domain: "pwc.com" },
      { name: "Accenture", domain: "accenture.com" },
    
      { name: "Apple", domain: "apple.com" },
      { name: "Samsung", domain: "samsung.com" },
      { name: "Adobe", domain: "adobe.com" },
      { name: "Salesforce", domain: "salesforce.com" },
      { name: "Spotify", domain: "spotify.com" },
      { name: "LinkedIn", domain: "linkedin.com" },
      { name: "Twitter", domain: "twitter.com" },
      { name: "Snap", domain: "snap.com" },
      { name: "Reddit", domain: "reddit.com" },
      { name: "Dropbox", domain: "dropbox.com" },
      { name: "Shopify", domain: "shopify.com" },
      { name: "Stripe", domain: "stripe.com" },
      { name: "Square", domain: "squareup.com" },
      { name: "Coinbase", domain: "coinbase.com" },
      { name: "Robinhood", domain: "robinhood.com" },
      { name: "Zoom", domain: "zoom.us" },
      { name: "Atlassian", domain: "atlassian.com" },
      { name: "ServiceNow", domain: "servicenow.com" },
      { name: "Snowflake", domain: "snowflake.com" },
      { name: "Databricks", domain: "databricks.com" },
      { name: "Palantir", domain: "palantir.com" },
      { name: "SAP", domain: "sap.com" },
      { name: "Capgemini", domain: "capgemini.com" },
      { name: "Deloitte", domain: "deloitte.com" },
      { name: "EY", domain: "ey.com" },
      { name: "KPMG", domain: "kpmg.com" },
      { name: "Infosys", domain: "infosys.com" },
      { name: "TCS", domain: "tcs.com" },
      { name: "Wipro", domain: "wipro.com" },
      { name: "HCL", domain: "hcltech.com" },
      { name: "Cognizant", domain: "cognizant.com" },
      { name: "Booking", domain: "booking.com" },
      { name: "Expedia", domain: "expedia.com" },
      { name: "Pinterest", domain: "pinterest.com" },
      { name: "GitHub", domain: "github.com" },
      { name: "OpenAI", domain: "openai.com" }
    ];

    // Offset the companies by 4 for each row so they don't look identical stacked up
    const offset = rowIndex * 1;
    const staggeredCompanies = [...companies.slice(offset), ...companies.slice(0, offset)];
    
    // Alternate direction: Even rows go left, Odd rows go right
    const isEven = rowIndex % 2 === 0;
    const animationClass = isEven ? "animate-marquee-left" : "animate-marquee-right";

    return (
      <div key={rowIndex} className="relative w-full overflow-hidden z-10 flex">
        <div className={`flex w-max gap-3 sm:gap-4 ${animationClass} pause-on-hover px-2`}>
          {/* We duplicate the staggered array so the marquee loops seamlessly without jumping */}
          {[...staggeredCompanies, ...staggeredCompanies].map((company, i) => (
            <div 
              key={`${rowIndex}-${i}`} 
              className="flex-shrink-0 w-24 sm:w-32 h-12 sm:h-16 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-center p-2 sm:p-3 hover:shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all group cursor-pointer"
            >
              <img 
                src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`} 
                alt={company.name}
                className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 text-center tracking-tight transition-colors">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  })}
</div>
        </section>

        {/* BUILT FOR EVERY BUSINESS */}
        <section id="businesses" className="py-24 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Hiring made simple for every business</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
                Big or small, we've got you covered every step of the way with tailored solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <BusinessTierCard 
                title="Large companies & enterprises"
                items={[
                  "Fill any role, from bulk hiring to leadership positions",
                  "Get AI-powered candidate insights and market trends",
                  "Boost brand visibility with custom branding solutions"
                ]}
                img="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=400"
              />
              <BusinessTierCard 
                title="Small & medium businesses"
                items={[
                  "Find local candidates across your region & get quick applies",
                  "Hire candidates with highly relevant industry experience",
                  "Start hiring with flexible, low-cost plans that deliver value"
                ]}
                img="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=400"
              />
              <BusinessTierCard 
                title="Consultants & agencies"
                items={[
                  "Speed up your hiring with an automated faster turnaround time",
                  "Track your recruitment team's performance with data insights",
                  "Instantly connect with candidates via automated emails"
                ]}
                img="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800&h=400"
              />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-24 bg-slate-100 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Here's why recruiters trust us</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                Testimonials from valued clients who've elevated their hiring with TalentSense.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <TestimonialCard 
                text="As a Core Engineering Employer, I feel confident of having relevant, available and genuine Resumes through the AI Database. Its Search Engine Capabilities and Resume Parsing techniques are unmatched."
                name="Kreeti Mathur"
                title="HR Development Manager @ ISGEC"
              />
              <TestimonialCard 
                text="TalentSense has been one of our most reliable sources for recruitment with a very efficient AI workflow that goes out of its way to make sure requests are handled immediately."
                name="Naveen Malhotra"
                title="Sr. Manager Talent Acquisition @ Group IRIS"
              />
              <TestimonialCard 
                text="The platform has a strong database of profiles. It has given vast accessibility to most of the job seekers, and the relevancy of the AI fit scores is undoubtedly good."
                name="Padma Thyagarajan"
                title="Head - HR @ Niteo Technologies"
              />
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-10 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            <FaqItem 
              index={0} active={activeFaq} onClick={toggleFaq}
              question="How can a recruiter sign up for an account?" 
              answer="Signing up is easy! Simply click on the 'Recruiter Login' button at the top right, select 'Create an account', and follow the guided onboarding steps to set up your company profile." 
            />
            <FaqItem 
              index={1} active={activeFaq} onClick={toggleFaq}
              question="How does pricing work for recruiter plans and job postings?" 
              answer="We offer flexible pricing tiers based on your hiring volume. You can choose from Pay-Per-Post models for occasional hiring, or subscription plans for continuous pipeline management. Contact sales for enterprise quotes." 
            />
            <FaqItem 
              index={2} active={activeFaq} onClick={toggleFaq}
              question="What support, insight, and team collaboration features are offered?" 
              answer="The platform includes shared Kanban boards, AI-generated candidate summaries, automated client pitch emails, and real-time market intelligence (average salary, time-to-fill) directly on the JD editor." 
            />
            <FaqItem 
              index={3} active={activeFaq} onClick={toggleFaq}
              question="How can I find the right candidates using the platform?" 
              answer="Our AI automatically generates optimized Boolean search strings for both our internal database and external networks like LinkedIn, ensuring you target the exact skills required." 
            />
            <FaqItem 
              index={4} active={activeFaq} onClick={toggleFaq}
              question="Are there any tips for writing effective job postings?" 
              answer="Yes! Our built-in 'JD Architect' acts as an AI consultant. It analyzes your draft and prompts you to clarify missing details (like shift timings, exact salary, or specific frameworks) to ensure a 100/100 Quality Score before posting." 
            />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 border-t border-slate-200 dark:border-slate-800/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
              Ready to transform your hiring?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 font-medium">
              Join the platform that perfectly aligns recruiters, clients, and candidates.
            </p>
            <button
              onClick={() => navigate("/recruiter/login")}
              className="px-10 py-4 rounded-xl bg-emerald-500 text-white dark:text-slate-950 font-bold text-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:-translate-y-1 transition-all"
            >
              Get Started Today
            </button>
          </div>
        </section>
      </div>

      {/* ================= MASSIVE FOOTER (Unstop Style) ================= */}
      <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 mt-auto">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Top Brand Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 dark:border-slate-800 pb-8 mb-10 gap-6">
             <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-sm">TS</div>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">TalentSense</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Built with in India for the world</p>
             </div>
             <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
                <a href="#" className="hover:text-emerald-500 transition"><Facebook className="w-5 h-5"/></a>
                <a href="#" className="hover:text-emerald-500 transition"><Twitter className="w-5 h-5"/></a>
                <a href="#" className="hover:text-emerald-500 transition"><Instagram className="w-5 h-5"/></a>
                <a href="#" className="hover:text-emerald-500 transition"><Linkedin className="w-5 h-5"/></a>
                <a href="#" className="hover:text-emerald-500 transition"><Youtube className="w-5 h-5"/></a>
             </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
            
            {/* Column 1 & 2 combined for layout logic */}
            <div className="col-span-2 md:col-span-4 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Products</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <li><a href="#" className="hover:text-emerald-500 transition">Brand & Engage</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Source</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Screen</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Assess</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Interview</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Hiring Automation</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Advertise with us</a></li>
                </ul>
                <h4 className="font-bold text-slate-900 dark:text-white mt-8 mb-4">Hiring Automation</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <li><a href="#" className="hover:text-emerald-500 transition">Virtual Hiring</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Campus Hiring</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Lateral Hiring</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Brand & Engage</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <li><a href="#" className="hover:text-emerald-500 transition">Company Profile & Reviews</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Build Your Talent Community</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Hackathons</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Quizzes</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Business Simulations</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Ideathons</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Data Science Hackathons</a></li>
                </ul>
                <h4 className="font-bold text-slate-900 dark:text-white mt-8 mb-4">Source</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <li><a href="#" className="hover:text-emerald-500 transition">List Jobs & Internships</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Talent Community Strength</a></li>
                </ul>
              </div>

              <div className="col-span-2">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Assess</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <li><a href="#" className="hover:text-emerald-500 transition">MCQ & Aptitude Tests</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Coding Assessment</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Roles Based Assessments</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">SQL Assessments</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Communication Skill Assessments</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Business Competency Simulation Games</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Proctoring</a></li>
                </ul>
                <h4 className="font-bold text-slate-900 dark:text-white mt-8 mb-4">Our Properties</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <li><a href="#" className="hover:text-emerald-500 transition">Talent Awards 2026</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Talent Meet 2026</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Talent Report 2025</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition">Education Loan Calculator</a></li>
                </ul>
              </div>
            </div>

            {/* Right Panel (Newsletter & Buttons) */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2 bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50">
              <div className="inline-block bg-amber-400 text-amber-950 px-3 py-1 rounded font-black text-lg transform -rotate-2 mb-6">
                We're Hiring!
              </div>
              
              <div className="space-y-4 mb-8">
                 <a href="#" className="flex items-center justify-between font-bold text-slate-900 dark:text-white hover:text-emerald-500 transition">Contact Us <ArrowRight className="w-4 h-4"/></a>
                 <a href="#" className="flex items-center justify-between font-bold text-slate-900 dark:text-white hover:text-emerald-500 transition">Share Your Story Now <ArrowRight className="w-4 h-4"/></a>
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Stay Updated</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-4">We'll send you updates on the latest opportunities to showcase your talent.</p>
              
              <div className="flex items-center mb-8 relative">
                <input type="email" placeholder="Subscribe to our newsletter!" className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-emerald-500 transition"/>
                <button className="absolute right-1 top-1 bottom-1 bg-slate-800 dark:bg-slate-700 text-white rounded-md px-4 flex items-center justify-center hover:bg-emerald-600 transition">
                  <Send className="w-4 h-4"/>
                </button>
              </div>

              <div className="flex gap-3">
                 <button className="flex-1 bg-slate-900 text-white dark:bg-black rounded-lg py-2 flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800 transition">
                   <Smartphone className="w-5 h-5"/>
                   <div className="text-left">
                     <div className="text-[8px] uppercase tracking-wider text-slate-300">Get it on</div>
                     <div className="text-xs font-bold leading-none">Google Play</div>
                   </div>
                 </button>
                 <button className="flex-1 bg-slate-900 text-white dark:bg-black rounded-lg py-2 flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800 transition">
                   <Shield className="w-5 h-5"/>
                   <div className="text-left">
                     <div className="text-[8px] uppercase tracking-wider text-slate-300">Available on the</div>
                     <div className="text-xs font-bold leading-none">App Store</div>
                   </div>
                 </button>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Badges */}
          <div className="py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-center gap-6">
             <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
               Copyright © 2026 TalentSense Consulting Pvt Ltd - All rights reserved.
             </div>
             
             {/* Fake Badges representing Unstop's bottom area */}
             <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 px-3 py-1 rounded text-xs font-bold border border-sky-200 dark:border-sky-800/50">
                  <ShieldCheck className="w-3 h-3"/> 100% safe & secure
                </div>
                <div className="flex items-center gap-3 grayscale opacity-60 dark:opacity-40">
                  <span className="font-bold text-slate-800 dark:text-white text-sm">VISA</span>
                  <span className="font-bold text-slate-800 dark:text-white text-sm">UPI</span>
                  <span className="font-bold text-slate-800 dark:text-white text-sm">Pay</span>
                </div>
                <div className="flex gap-2 ml-4">
                  <Award className="w-8 h-8 text-slate-300 dark:text-slate-600"/>
                  <Award className="w-8 h-8 text-slate-300 dark:text-slate-600"/>
                </div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

const Highlight = ({ icon, stat, label }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">{stat}</div>
      <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">{label}</div>
    </div>
  </div>
);

const OfferingCard = ({ title, desc, icon }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl hover:shadow-lg transition-shadow">
    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6">{desc}</p>
    <button className="text-sm font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">View plans &rarr;</button>
  </div>
);

const GapItem = ({ icon, text }) => (
  <div className="flex items-center gap-5 pb-5 border-b border-slate-200 dark:border-slate-800 last:border-0 last:pb-0">
    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
      {icon}
    </div>
    <p className="text-slate-800 dark:text-slate-200 font-medium text-base">{text}</p>
  </div>
);

const CheckItem = ({ text }) => (
  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm font-medium">
    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
    <span>{text}</span>
  </li>
);

const PhaseCard = ({ number, icon, title, items, footer }) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative">
    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
      {icon}
    </div>
    <div className="absolute top-8 right-8 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs">
      {number}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">{title}</h3>
    <ul className="space-y-4 mb-8 flex-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm font-medium">
          <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <div className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 border-t border-slate-100 dark:border-slate-800 pt-5">
      {footer}
    </div>
  </div>
);

const PlatformFeature = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-100 dark:border-sky-800">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const BusinessTierCard = ({ title, items, img }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
    <div className="h-48 relative overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent flex items-end p-6">
        <h3 className="text-2xl font-bold text-white leading-tight">{title}</h3>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <ul className="space-y-4 mb-8 flex-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm font-medium">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition">
        Request callback
      </button>
    </div>
  </div>
);

const TestimonialCard = ({ text, name, title }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm">
    <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-relaxed mb-8">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{name}</h4>
        <p className="text-xs font-medium text-slate-500">{title}</p>
      </div>
    </div>
  </div>
);

const FaqItem = ({ question, answer, active, index, onClick }) => {
  const isOpen = active === index;
  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <button 
        onClick={() => onClick(index)}
        className="w-full flex justify-between items-center py-5 text-left focus:outline-none"
      >
        <span className="font-bold text-slate-900 dark:text-slate-200 text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-5' : 'max-h-0'}`}>
        <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default LandingPage;