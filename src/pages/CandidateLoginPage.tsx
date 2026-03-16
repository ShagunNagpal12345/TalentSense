import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../core/stores/authStore";
import { 
  User, Mail, Key, Smartphone, Sun, Moon, 
  ArrowLeft, Sparkles, CheckCircle, 
  FileText, Video, Target, ArrowRight, Linkedin
} from "lucide-react";

const CandidateLoginPage = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const [authMode, setAuthMode] = useState("password"); 
  const [resetMode, setResetMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Assuming your store has a login function. If not, this is a placeholder.
  const login = useAuthStore((s) => s.loginCandidate || s.loginRecruiter);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const performLogin = (name, email) => {
    const candidate = {
      id: "cand-" + Date.now().toString(),
      name: name || "Candidate User",
      email,
      role: "candidate"
    };
    login(candidate);
    navigate("/candidate/dashboard");
  };

  const handlePasswordLogin = () => {
    setStatusMessage("");
    if (!email.trim() || !password.trim()) {
      setStatusMessage("Please complete all fields.");
      return;
    }
    performLogin(fullName, email.toLowerCase());
  };

  const handleSendOtp = () => {
    if (!email.trim()) {
      setStatusMessage("Enter your email for OTP.");
      return;
    }
    setOtpSent(true);
    setStatusMessage("OTP sent to your email. (Demo mode)");
  };

  const handleOtpLogin = () => {
    if (!email.trim() || !otp.trim()) {
      setStatusMessage("Please fill in all fields.");
      return;
    }
    performLogin(fullName, email.toLowerCase());
  };

  const handleForgotPasswordSubmit = () => {
    if (!email.trim()) {
      setStatusMessage("Enter email to receive reset link.");
      return;
    }
    setStatusMessage("Password reset link sent.");
    setResetMode(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans overflow-hidden transition-colors duration-300 relative flex flex-col">
      
      {/* Background Gradients (Candidate Theme: Violet & Fuchsia) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-400/20 dark:bg-violet-900/30 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-fuchsia-400/20 dark:bg-fuchsia-900/30 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* HEADER */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-violet-500/20">
            TS
          </div>
          <div className="hidden sm:block">
            <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TalentSense</div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1">
              Candidate Portal
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="flex w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">

          {/* LEFT PANEL */}
          <div className="hidden lg:flex flex-col justify-between p-12 w-1/2 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 border-r border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-400/10 dark:bg-violet-400/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-violet-600 dark:text-violet-400 mb-6 shadow-sm">
                <Sparkles className="w-3 h-3" /> Career Hub
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                Land your <br/> dream role.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base font-medium mb-10 leading-relaxed">
                Check your ATS score, record video introductions, and apply to top companies with a single click.
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 text-violet-500">
                    <Target className="w-5 h-5"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">ATS Score Checker</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Optimize your resume against actual Job Descriptions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 text-violet-500">
                    <Video className="w-5 h-5"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Video Introductions</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Stand out to recruiters by recording a 30s intro.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 text-violet-500">
                    <FileText className="w-5 h-5"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">1-Click Apply</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Easily track all your applications and interview stages.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT PANEL (Login Form) */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">Sign in to access your candidate profile.</p>

            <div className="flex mb-8 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
              <button onClick={() => setAuthMode("password")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${authMode === "password" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}>Password</button>
              <button onClick={() => setAuthMode("otp")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${authMode === "otp" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}>OTP Login</button>
            </div>

            <div className="space-y-4 mb-6">
              {authMode === "password" && !resetMode && (
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 block">Full Name (Optional for Login)</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors" />
                </div>
              </div>

              {authMode === "password" && !resetMode && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Password</label>
                    <button onClick={() => setResetMode(true)} className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">Forgot?</button>
                  </div>
                  <div className="relative">
                    <Key className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors" />
                  </div>
                </div>
              )}

              {authMode === "otp" && (
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 block">One Time Password</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors" />
                  </div>
                </div>
              )}
            </div>

            {statusMessage && (
              <div className="mb-4 p-3 rounded-lg bg-violet-50 dark:bg-violet-900/30 border border-violet-100 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4"/> {statusMessage}
              </div>
            )}

            {/* ACTION BUTTONS */}
            {authMode === "password" && !resetMode && (
              <button onClick={handlePasswordLogin} className="w-full bg-violet-600 hover:bg-violet-700 text-white p-3.5 rounded-xl font-bold text-sm shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2 group">
                Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
              </button>
            )}

            {authMode === "password" && resetMode && (
              <div className="space-y-3">
                <button onClick={handleForgotPasswordSubmit} className="w-full bg-violet-600 hover:bg-violet-700 text-white p-3.5 rounded-xl font-bold text-sm shadow-lg transition-all">Send Reset Link</button>
                <button onClick={() => setResetMode(false)} className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-3.5 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Back to Login</button>
              </div>
            )}

            {authMode === "otp" && (
              <div className="flex gap-3">
                <button onClick={handleSendOtp} className="flex-1 bg-white dark:bg-slate-800 border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 p-3.5 rounded-xl font-bold text-sm hover:bg-violet-50 dark:hover:bg-slate-700 transition-all">{otpSent ? "Resend" : "Send OTP"}</button>
                <button onClick={handleOtpLogin} className="flex-[2] bg-violet-600 hover:bg-violet-700 text-white p-3.5 rounded-xl font-bold text-sm shadow-lg transition-all">Verify & Login</button>
              </div>
            )}

            {/* SSO */}
            {!resetMode && (
              <>
                <div className="flex items-center my-8">
                  <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800" />
                  <span className="px-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or continue with</span>
                  <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 p-3 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all shadow-sm">
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg> Google
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 bg-[#0A66C2] text-white p-3 rounded-xl font-bold text-sm hover:bg-[#004182] transition-all shadow-sm border border-[#0A66C2]">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateLoginPage;