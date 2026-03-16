// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../core/stores/authStore";

// // Icons (TS-compatible)
// import { FcGoogle } from "react-icons/fc";
// import { FaLinkedin, FaEnvelope, FaKey, FaMobileAlt } from "react-icons/fa";

// const ClientLoginPage: React.FC = () => {
//   const [authMode, setAuthMode] = useState<"password" | "otp">("password");
//   const [resetMode, setResetMode] = useState(false);

//   const [companyName, setCompanyName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [statusMessage, setStatusMessage] = useState("");

//   const navigate = useNavigate();
//   // Assuming useAuthStore has a loginClient method, or reuse logic
//   const loginClient = useAuthStore((s) => s.loginClient || s.loginRecruiter); // Placeholder fallback

//   const performLogin = (name: string, email: string) => {
//     const client = {
//       id: "client-" + Date.now().toString(),
//       name,
//       email,
//       role: "client"
//     };
//     loginClient(client);
//     navigate("/client/dashboard");
//   };

//   // ---------------- PASSWORD LOGIN ----------------
//   const handlePasswordLogin = () => {
//     setStatusMessage("");

//     if (!companyName.trim() || !email.trim() || !password.trim()) {
//       setStatusMessage("Please complete all fields.");
//       return;
//     }

//     performLogin(companyName, email.toLowerCase());
//   };

//   // ---------------- OTP LOGIN ----------------
//   const handleSendOtp = () => {
//     if (!email.trim()) {
//       setStatusMessage("Enter your email for OTP.");
//       return;
//     }
//     setOtpSent(true);
//     setStatusMessage("OTP sent to your email. (Demo mode)");
//   };

//   const handleOtpLogin = () => {
//     if (!companyName.trim() || !email.trim() || !otp.trim()) {
//       setStatusMessage("Please fill in all fields.");
//       return;
//     }
//     performLogin(companyName, email.toLowerCase());
//   };

//   // ---------------- FORGOT PASSWORD ----------------
//   const handleForgotPasswordSubmit = () => {
//     if (!email.trim()) {
//       setStatusMessage("Enter email to receive reset link.");
//       return;
//     }
//     setStatusMessage("Password reset link sent. (Demo mode)");
//     setResetMode(false);
//   };

//   return (
//     <div className="relative min-h-screen bg-[#05080A] text-white overflow-hidden">
//       {/* Background FX (Blue/Cyan Theme for Clients) */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#0EA5E9]/25 rounded-full blur-3xl" />
//         <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#6366F1]/25 rounded-full blur-3xl" />

//         {/* Grid */}
//         <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/5 to-transparent">
//           <div className="absolute inset-0 opacity-20">
//             {[...Array(10)].map((_, i) => (
//               <div
//                 key={i}
//                 className="absolute w-px h-full bg-white/10"
//                 style={{ left: `${i * 10}%` }}
//               />
//             ))}
//             {[...Array(4)].map((_, i) => (
//               <div
//                 key={i}
//                 className="absolute h-px w-full bg-white/10"
//                 style={{ top: `${i * 25}%` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
//         <div className="flex w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">

//           {/* LEFT PANEL */}
//           <div className="hidden md:flex flex-col justify-center p-12 w-1/2 bg-gradient-to-br from-[#0EA5E9]/20 to-[#6366F1]/20 border-r border-white/10">
//             <h2 className="text-4xl font-extrabold mb-4">Client Portal</h2>
//             <p className="text-gray-300 text-lg mb-6">
//               Collaborate with recruiters, track requisitions, and approve your next hire with the TalentSense Client Suite.
//             </p>
//             <ul className="space-y-3 text-gray-300 text-sm">
//               <li>• Submit new job requisitions</li>
//               <li>• Review shortlisted profiles</li>
//               <li>• Interview feedback loop</li>
//               <li>• Real-time hiring analytics</li>
//             </ul>
//           </div>

//           {/* RIGHT PANEL */}
//           <div className="w-full md:w-1/2 p-8">
//             <h2 className="text-3xl font-bold text-center mb-6">Client Login</h2>

//             {/* Mode Switch */}
//             <div className="flex mb-6 bg-white/5 p-1 rounded-2xl">
//               <button
//                 onClick={() => setAuthMode("password")}
//                 className={`flex-1 py-2.5 rounded-2xl text-sm font-semibold ${
//                   authMode === "password"
//                     ? "bg-[#0EA5E9] text-white"
//                     : "text-gray-300"
//                 }`}
//               >
//                 Email & Password
//               </button>
//               <button
//                 onClick={() => setAuthMode("otp")}
//                 className={`flex-1 py-2.5 rounded-2xl text-sm font-semibold ${
//                   authMode === "otp"
//                     ? "bg-[#0EA5E9] text-white"
//                     : "text-gray-300"
//                 }`}
//               >
//                 OTP Login
//               </button>
//             </div>

//             {/* Company Name */}
//             <label className="text-sm text-gray-300 mb-1 block">Company Name</label>
//             <div className="flex items-center gap-2 border border-white/20 bg-white/10 rounded-xl px-3 mb-4">
//               <FaEnvelope size={16} color="#9CA3AF" />
//               <input
//                 value={companyName}
//                 onChange={(e) => setCompanyName(e.target.value)}
//                 placeholder="Enter company name"
//                 className="w-full p-2.5 bg-transparent outline-none text-sm placeholder-gray-400"
//               />
//             </div>

//             {/* Email */}
//             <label className="text-sm text-gray-300 mb-1 block">Work Email</label>
//             <div className="flex items-center gap-2 border border-white/20 bg-white/10 rounded-xl px-3 mb-4">
//               <FaEnvelope size={16} color="#9CA3AF" />
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="name@company.com"
//                 className="w-full p-2.5 bg-transparent outline-none text-sm placeholder-gray-400"
//               />
//             </div>

//             {/* PASSWORD MODE */}
//             {authMode === "password" && !resetMode && (
//               <>
//                 <label className="text-sm text-gray-300 mb-1 block">Password</label>
//                 <div className="flex items-center gap-2 border border-white/20 bg-white/10 rounded-xl px-3 mb-3">
//                   <FaKey size={16} color="#9CA3AF" />
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter password"
//                     className="w-full p-2.5 bg-transparent outline-none text-sm placeholder-gray-400"
//                   />
//                 </div>

//                 <button
//                   className="text-xs text-[#0EA5E9] hover:underline mb-4 float-right"
//                   onClick={() => setResetMode(true)}
//                 >
//                   Forgot password?
//                 </button>

//                 <button
//                   onClick={handlePasswordLogin}
//                   className="w-full bg-[#0EA5E9] hover:bg-[#0284c7] text-white p-3 rounded-xl font-semibold text-lg shadow-md transition-all"
//                 >
//                   Login to Dashboard
//                 </button>
//               </>
//             )}

//             {/* FORGOT PASSWORD MODE */}
//             {authMode === "password" && resetMode && (
//               <>
//                 <p className="text-sm text-gray-300 mb-4">
//                   Enter your email to receive reset instructions.
//                 </p>
//                 <button
//                   onClick={handleForgotPasswordSubmit}
//                   className="w-full bg-[#6366F1] hover:bg-[#4f46e5] text-white p-3 rounded-xl font-semibold text-lg shadow-md"
//                 >
//                   Send Reset Link
//                 </button>
//                 <button
//                   className="mt-3 w-full text-xs text-gray-300"
//                   onClick={() => setResetMode(false)}
//                 >
//                   ← Back
//                 </button>
//               </>
//             )}

//             {/* OTP MODE */}
//             {authMode === "otp" && (
//               <>
//                 <label className="text-sm text-gray-300 mb-1 block">OTP</label>
//                 <div className="flex items-center gap-2 border border-white/20 bg-white/10 rounded-xl px-3 mb-4">
//                   <FaMobileAlt size={16} color="#9CA3AF" />
//                   <input
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     placeholder="Enter OTP"
//                     className="w-full p-2.5 bg-transparent outline-none text-sm placeholder-gray-400"
//                   />
//                 </div>

//                 <div className="flex gap-3 mb-4">
//                   <button
//                     onClick={handleSendOtp}
//                     className="flex-1 border border-[#0EA5E9] text-[#0EA5E9] p-2.5 rounded-xl text-sm font-semibold"
//                   >
//                     {otpSent ? "Resend OTP" : "Send OTP"}
//                   </button>
//                   <button
//                     onClick={handleOtpLogin}
//                     className="flex-1 bg-[#0EA5E9] hover:bg-[#0284c7] text-white p-2.5 rounded-xl text-sm font-semibold"
//                   >
//                     Login with OTP
//                   </button>
//                 </div>
//               </>
//             )}

//             {statusMessage && (
//               <p className="text-xs text-center text-[#0EA5E9] mt-2">
//                 {statusMessage}
//               </p>
//             )}

//             {/* Divider */}
//             <div className="flex items-center my-6">
//               <div className="flex-grow h-px bg-white/20" />
//               <span className="px-4 text-gray-400 text-xs">
//                 OR CONTINUE WITH
//               </span>
//               <div className="flex-grow h-px bg-white/20" />
//             </div>

//             {/* GOOGLE */}
//             <button className="w-full flex items-center justify-center gap-3 bg-white text-black p-3 rounded-xl font-semibold text-sm hover:bg-gray-100 shadow-md">
//               <FcGoogle size={22} />
//               Continue with Google
//             </button>

//             {/* SSO / Microsoft */}
//             <button className="w-full flex items-center justify-center gap-3 bg-[#2F2F2F] text-white p-3 rounded-xl font-semibold text-sm hover:bg-[#1a1a1a] shadow-md mt-3 border border-gray-600">
//               <FaKey size={16} />
//               Enterprise SSO
//             </button>

//             <p className="text-center text-gray-400 text-xs mt-6">
//               By logging in, you agree to our{" "}
//               <span className="text-[#0EA5E9] underline cursor-pointer">
//                 Terms
//               </span>{" "}
//               &{" "}
//               <span className="text-[#0EA5E9] underline cursor-pointer">
//                 Privacy Policy
//               </span>.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientLoginPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../core/stores/authStore";
import { 
  Building, Mail, Key, Smartphone, Sun, Moon, 
  ArrowLeft, Sparkles, CheckCircle, LineChart, 
  Users, Target, ArrowRight 
} from "lucide-react";

const ClientLoginPage = () => {
  const navigate = useNavigate();
  
  // Theme state
  const [isDark, setIsDark] = useState(false);

  // Form states
  const [authMode, setAuthMode] = useState("password"); // "password" | "otp"
  const [resetMode, setResetMode] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const loginClient = useAuthStore((s) => s.loginClient || s.loginRecruiter);

  // Apply dark mode class to HTML root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const performLogin = (name, email) => {
    const client = {
      id: "client-" + Date.now().toString(),
      name,
      email,
      role: "client"
    };
    loginClient(client);
    navigate("/client/dashboard");
  };

  // --- HANDLERS ---
  const handlePasswordLogin = () => {
    setStatusMessage("");
    if (!companyName.trim() || !email.trim() || !password.trim()) {
      setStatusMessage("Please complete all fields.");
      return;
    }
    performLogin(companyName, email.toLowerCase());
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
    if (!companyName.trim() || !email.trim() || !otp.trim()) {
      setStatusMessage("Please fill in all fields.");
      return;
    }
    performLogin(companyName, email.toLowerCase());
  };

  const handleForgotPasswordSubmit = () => {
    if (!email.trim()) {
      setStatusMessage("Enter email to receive reset link.");
      return;
    }
    setStatusMessage("Password reset link sent. (Demo mode)");
    setResetMode(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans overflow-hidden transition-colors duration-300 relative flex flex-col">
      
      {/* Background Gradients (Client Theme: Sky & Indigo) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-400/20 dark:bg-sky-900/30 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-900/30 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* HEADER */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-sky-500/20">
            TS
          </div>
          <div className="hidden sm:block">
            <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TalentSense</div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
              Client Portal
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="flex w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">

          {/* LEFT PANEL (Value Prop) */}
          <div className="hidden lg:flex flex-col justify-between p-12 w-1/2 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border-r border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 dark:bg-sky-400/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-sky-600 dark:text-sky-400 mb-6 shadow-sm">
                <Sparkles className="w-3 h-3" /> Client Workspace
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                Hire your next <br/> top performer.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base font-medium mb-10 leading-relaxed">
                Collaborate directly with your recruitment team. Approve JDs, review AI-scored shortlists, and make data-driven hiring decisions in one place.
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 text-sky-500">
                    <Target className="w-5 h-5"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Define Requirements</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Submit roles and let AI refine the perfect JD.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 text-sky-500">
                    <Users className="w-5 h-5"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Review Shortlists</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">See only the top candidates with exact match scores.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 text-sky-500">
                    <LineChart className="w-5 h-5"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Track Progress</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get real-time insights on your hiring pipeline.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/50">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                "TalentSense gave us complete visibility into our hiring. We review candidates 3x faster now."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">S</div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</p>
                  <p className="text-slate-500 dark:text-slate-400">VP of Engineering</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (Login Form) */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">Sign in to your client workspace to continue.</p>

            {/* Mode Switch */}
            <div className="flex mb-8 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
              <button
                onClick={() => setAuthMode("password")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  authMode === "password"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                Password
              </button>
              <button
                onClick={() => setAuthMode("otp")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  authMode === "otp"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                OTP Login
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Company Name */}
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 block">Company Name</label>
                <div className="relative">
                  <Building className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="E.g. Acme Corp"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-sky-500 dark:focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 block">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-sky-500 dark:focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              {/* PASSWORD MODE */}
              {authMode === "password" && !resetMode && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Password</label>
                    <button onClick={() => setResetMode(true)} className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Key className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-sky-500 dark:focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* OTP MODE */}
              {authMode === "otp" && (
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 block">One Time Password</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-sky-500 dark:focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* STATUS MESSAGE */}
            {statusMessage && (
              <div className="mb-4 p-3 rounded-lg bg-sky-50 dark:bg-sky-900/30 border border-sky-100 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4"/> {statusMessage}
              </div>
            )}

            {/* ACTION BUTTONS */}
            {authMode === "password" && !resetMode && (
              <button
                onClick={handlePasswordLogin}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white p-3.5 rounded-xl font-bold text-sm shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 group"
              >
                Access Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
              </button>
            )}

            {authMode === "password" && resetMode && (
              <div className="space-y-3">
                <button onClick={handleForgotPasswordSubmit} className="w-full bg-sky-500 hover:bg-sky-600 text-white p-3.5 rounded-xl font-bold text-sm shadow-lg shadow-sky-500/20 transition-all">
                  Send Reset Link
                </button>
                <button onClick={() => setResetMode(false)} className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-3.5 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  Back to Login
                </button>
              </div>
            )}

            {authMode === "otp" && (
              <div className="flex gap-3">
                <button onClick={handleSendOtp} className="flex-1 bg-white dark:bg-slate-800 border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 p-3.5 rounded-xl font-bold text-sm hover:bg-sky-50 dark:hover:bg-slate-700 transition-all">
                  {otpSent ? "Resend" : "Send OTP"}
                </button>
                <button onClick={handleOtpLogin} className="flex-[2] bg-sky-500 hover:bg-sky-600 text-white p-3.5 rounded-xl font-bold text-sm shadow-lg shadow-sky-500/20 transition-all">
                  Verify & Login
                </button>
              </div>
            )}

            {/* DIVIDER */}
            {!resetMode && (
              <>
                <div className="flex items-center my-8">
                  <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800" />
                  <span className="px-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or continue with</span>
                  <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="space-y-3">
                  {/* Custom SVG Google Icon to avoid extra libraries */}
                  <button className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 p-3 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all shadow-sm">
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google Workspace
                  </button>

                  <button className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-slate-950 text-white p-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-sm border border-slate-800">
                    <Key className="w-5 h-5 text-slate-300" />
                    Enterprise SSO
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

export default ClientLoginPage;