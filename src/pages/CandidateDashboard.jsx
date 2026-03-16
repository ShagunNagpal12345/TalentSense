import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AvailableJobs from '../components/candidate/AvailableJobs';
import ATSScore from '../components/candidate/ATSScore';
import CandidateOverview from '../components/candidate/CandidateOverview';
import CandidateJobDetail from '../components/candidate/CandidateJobDetail';
import VideoIntro from '../components/candidate/VideoIntro';
import PracticeInterview from '../components/candidate/PracticeInterview';
import ProfileEditor from '../components/candidate/ProfileEditor';
import ApplicationKanban from '../components/candidate/ApplicationKanban';

import { 
  ArrowLeft, LayoutDashboard, User, Video, 
  Briefcase, LineChart, Bell, Sun, Moon, 
  Menu, X, Search, Home, Brain, Layers
} from 'lucide-react';

const CandidateDashboard = () => {
  const [view, setView] = useState('overview'); 
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Reusable Nav Item Component for the Top Bar
  const NavItem = ({ id, icon: Icon, label }) => {
    const isActive = view === id;
    return (
      <button 
        onClick={() => { setView(id); setSelectedJob(null); setMobileMenuOpen(false); }}
        className={`flex flex-col items-center justify-center min-w-[70px] h-full transition-all relative group ${
          isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
        }`}
      >
        <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
        <span className="text-[10px] mt-1 font-medium hidden md:block">{label}</span>
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 dark:bg-white animate-in slide-in-from-bottom-full" />
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-200 transition-colors duration-300">
      
      {/* LINKEDIN STYLE TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 h-16 shadow-sm">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
          
          {/* Logo & Search Area */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <Link to="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition shrink-0">
              <div className="w-8 h-8 rounded bg-[#0A66C2] flex items-center justify-center text-white font-black text-lg">TS</div>
            </Link>
            
            <div className="relative hidden sm:block w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search jobs, audits, history..." 
                className="w-full bg-[#EDF3F8] dark:bg-slate-800 border-none rounded-md py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0A66C2] transition-all"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex h-full items-center">
            <NavItem id="overview" icon={Home} label="Home" />
            <NavItem id="profile" icon={User} label="Profile" />
            <NavItem id="video" icon={Video} label="Pitch" />
            <NavItem id="jobs" icon={Briefcase} label="Jobs" />
            <NavItem id="ats" icon={LineChart} label="Audit" />
            <NavItem id="interview" icon={Brain} label="Practice" />
            <NavItem id="tracker" icon={Layers} label="Tracker" />
          </nav>

          {/* User Tools */}
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </button>
            <button className="md:hidden p-2 text-slate-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-white shadow-sm flex items-center justify-center text-[10px] font-bold shrink-0">TS</div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-[90] bg-white dark:bg-slate-900 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 overflow-y-auto pb-24">
          <button onClick={() => { setView('overview'); setMobileMenuOpen(false); }} className="flex items-center gap-4 text-lg font-bold p-3 border-b">Overview</button>
          <button onClick={() => { setView('profile'); setMobileMenuOpen(false); }} className="flex items-center gap-4 text-lg font-bold p-3 border-b">My Profile</button>
          <button onClick={() => { setView('video'); setMobileMenuOpen(false); }} className="flex items-center gap-4 text-lg font-bold p-3 border-b">Video Pitch</button>
          <button onClick={() => { setView('jobs'); setMobileMenuOpen(false); }} className="flex items-center gap-4 text-lg font-bold p-3 border-b">Job Openings</button>
          <button onClick={() => { setView('ats'); setMobileMenuOpen(false); }} className="flex items-center gap-4 text-lg font-bold p-3 border-b">ATS Checker</button>
          <button onClick={() => { setView('interview'); setMobileMenuOpen(false); }} className="flex items-center gap-4 text-lg font-bold p-3 border-b">Mock Interview</button>
          <button onClick={() => { setView('tracker'); setMobileMenuOpen(false); }} className="flex items-center gap-4 text-lg font-bold p-3 border-b border-slate-200 dark:border-slate-800">Application Tracker</button>
        </div>
      )}

      {/* MAIN CONTENT - FULL PAGE WIDTH */}
      <main className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
        <div className="w-full">
           
           {/* VIEW: OVERVIEW */}
           {view === 'overview' && (
             <CandidateOverview onNavigate={(targetView) => setView(targetView)} />
           )}

           {/* VIEW: PROFILE */}
           {view === 'profile' && (
             <div className="bg-[#F3F2EF] dark:bg-slate-950 min-h-screen pt-4">
               <ProfileEditor />
             </div>
           )}

           {/* VIEW: VIDEO INTRO */}
           {view === 'video' && <VideoIntro />}

           {/* VIEW: JOB OPENINGS */}
           {view === 'jobs' && !selectedJob && (
             <div className="animate-in fade-in duration-500">
               <AvailableJobs onViewJob={(job) => setSelectedJob(job)} />
             </div>
           )}

           {/* VIEW: JOB DETAIL */}
           {view === 'jobs' && selectedJob && (
             <div className="animate-in slide-in-from-right duration-500">
               <CandidateJobDetail 
                 job={selectedJob} 
                 onBack={() => setSelectedJob(null)} 
               />
             </div>
           )}

           {/* VIEW: ATS CHECKER */}
           {view === 'ats' && (
             <div className="animate-in fade-in duration-500">
               <ATSScore />
             </div>
           )}

           {/* VIEW: PRACTICE INTERVIEW */}
           {view === 'interview' && (
             <div className="animate-in fade-in duration-500">
               <PracticeInterview />
             </div>
           )}

           {/* VIEW: APPLICATION KANBAN TRACKER */}
           {view === 'tracker' && (
             <div className="animate-in fade-in duration-500">
               <ApplicationKanban />
             </div>
           )}

        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;