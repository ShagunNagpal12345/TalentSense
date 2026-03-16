// // import React from 'react';
// // import { 
// //   ShieldCheck, ArrowRight, Zap, Briefcase, 
// //   MapPin, Camera, MoreHorizontal, MessageSquare, 
// //   ThumbsUp, Share2, Award, Bookmark, User, Clock, Mail
// // } from 'lucide-react';
// // import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
// // import { useATSStore } from '../../core/stores/atsStore';
// // import { useProfileStore } from '../../core/stores/profileStore';

// // const CandidateOverview = ({ onNavigate }) => {
// //   const jobs = useRecruitmentStore((state) => state.jobs);
// //   const latestAudit = useATSStore((state) => state.latestAudit);
// //   const { profileData } = useProfileStore();
  
// //   const firstName = profileData?.name ? profileData.name.split(' ')[0] : 'Candidate';
// //   const latestExp = profileData?.experience?.[0];

// //   return (
// //     <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
      
// //       {/* LEFT COLUMN: MINI PROFILE CARD */}
// //       <div className="lg:col-span-3 space-y-4">
// //         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
// //           <div className="h-16 bg-gradient-to-r from-[#0A66C2] to-emerald-500 relative" />
// //           <div className="px-4 pb-4">
// //             <div className="relative -mt-10 mb-3 flex justify-center">
// //               <div className="w-16 h-16 bg-white rounded-full p-1 border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center">
// //                 {profileData.profileImage ? (
// //                   <img src={profileData.profileImage} className="w-full h-full rounded-full object-cover" alt="Profile" />
// //                 ) : (
// //                   <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center font-black text-xl text-slate-400 uppercase">
// //                     {profileData.name ? profileData.name.charAt(0) : <User size={24}/>}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //             <div className="text-center border-b border-slate-100 pb-4">
// //               <h2 onClick={() => onNavigate('profile')} className="text-md font-bold text-slate-900 hover:underline cursor-pointer">
// //                 {profileData.name || "Set Your Name"}
// //               </h2>
// //               <p className="text-[11px] text-slate-500 mt-1 leading-tight line-clamp-2">
// //                 {profileData.headline || "Add your professional headline"}
// //               </p>
// //             </div>
// //             <div className="py-4 space-y-3">
// //               <div className="flex justify-between text-[11px] font-bold">
// //                 <span className="text-slate-500">Profile followers</span>
// //                 <span className="text-[#0A66C2]">{profileData.followers || 0}</span>
// //               </div>
// //               <div className="flex justify-between text-[11px] font-bold">
// //                 <span className="text-slate-500">Connections</span>
// //                 <span className="text-[#0A66C2]">{profileData.connections || 0}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* QUICK ANALYTICS */}
// //         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm sticky top-24">
// //           <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Dashboard Metrics</h3>
// //           <div className="space-y-4">
// //             <div className="flex items-start gap-3">
// //               <Award size={18} className="text-violet-600 shrink-0" />
// //               <div>
// //                 <p className="text-[11px] font-bold text-slate-700">ATS Ranking</p>
// //                 <p className="text-[10px] text-slate-500">
// //                    {latestAudit ? `Verified: ${latestAudit.overall}%` : "Not Audited"}
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex items-start gap-3">
// //               <Mail size={18} className="text-blue-600 shrink-0" />
// //               <div>
// //                 <p className="text-[11px] font-bold text-slate-700">Email Status</p>
// //                 <p className="text-[10px] text-slate-500 truncate">{profileData.email || "No email set"}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* CENTER COLUMN: THE FEED */}
// //       <div className="lg:col-span-6 space-y-4">
        
// //         {/* TOP AVAILABLE OPENINGS (Replaced Start Post) */}
// //         <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
// //           <div className="flex justify-between items-center mb-6">
// //             <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
// //               <Briefcase size={18} className="text-[#0A66C2]" /> Recommended Job Openings
// //             </h3>
// //             <button onClick={() => onNavigate('jobs')} className="text-xs font-bold text-[#0A66C2] hover:underline">
// //               View All
// //             </button>
// //           </div>

// //           <div className="space-y-4">
// //             {jobs.length > 0 ? (
// //               jobs.slice(0, 3).map((job) => (
// //                 <div key={job.id} className="flex gap-4 p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => onNavigate('jobs')}>
// //                   <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A66C2] font-bold shrink-0">
// //                     {job.client.charAt(0)}
// //                   </div>
// //                   <div className="flex-1 min-w-0">
// //                     <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0A66C2] group-hover:underline truncate">{job.title}</h4>
// //                     <p className="text-xs text-slate-600">{job.client}</p>
// //                     <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
// //                       <span className="flex items-center gap-1"><MapPin size={12}/> {job.location || 'Remote'}</span>
// //                       <span className="flex items-center gap-1"><Clock size={12}/> {job.datePosted || 'New'}</span>
// //                     </div>
// //                   </div>
// //                   <ArrowRight size={16} className="text-slate-300 group-hover:text-[#0A66C2] transition-colors" />
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl">
// //                 <Briefcase size={32} className="mx-auto text-slate-200 mb-2" />
// //                 <p className="text-sm font-bold text-slate-400">No openings currently available</p>
// //                 <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Check back later for AI-matched roles</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* FEED ITEM: ATS SCORE UPDATE */}
// //         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
// //           <div className="p-4 flex justify-between items-start">
// //             <div className="flex gap-2">
// //               <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center text-white font-black text-xs">TS</div>
// //               <div>
// //                 <h4 className="text-sm font-bold text-slate-900">TalentSense Intelligence</h4>
// //                 <p className="text-[10px] text-slate-500 font-bold">System Insights • Now</p>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="px-6 pb-6 pt-2">
// //             <p className="text-sm text-slate-800 leading-relaxed mb-4">
// //               {latestAudit 
// //                 ? `${firstName}, your technical dossier is synchronized. You currently hold a ${latestAudit.overall}% match compatibility for ${profileData.headline || 'your career path'}.` 
// //                 : `Welcome ${firstName}. Initiate an ATS audit to cross-reference your documentation against enterprise-grade Job Descriptions.`}
// //             </p>
// //             {latestAudit && (
// //               <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center">
// //                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Technical Compliance Score</p>
// //                  <div className="text-6xl font-black text-[#0A66C2] tracking-tighter">{latestAudit.overall}%</div>
// //                  <button onClick={() => onNavigate('ats')} className="mt-4 text-xs font-black text-[#0A66C2] hover:underline flex items-center justify-center gap-1 mx-auto">
// //                    Analyze Detailed Report <ArrowRight size={14}/>
// //                  </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* RIGHT COLUMN: PROFESSIONAL HIGHLIGHTS */}
// //       <div className="lg:col-span-3 space-y-4">
// //         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
// //           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Expertise</h3>
// //           <div className="flex flex-wrap gap-2">
// //             {profileData.topSkills?.length > 0 ? (
// //               profileData.topSkills.map((skill, i) => (
// //                 <span key={i} className="px-2 py-1 bg-slate-50 text-[10px] font-bold text-slate-600 border border-slate-100 rounded">
// //                   {skill}
// //                 </span>
// //               ))
// //             ) : (
// //               <p className="text-[10px] text-slate-400 italic">No skills listed</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Footer Area */}
// //         <div className="p-4 text-center">
// //            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-4">
// //              {['Privacy', 'Accessibility', 'Help', 'Terms'].map(link => (
// //                <span key={link} className="text-[10px] text-slate-500 hover:text-[#0A66C2] cursor-pointer font-bold">{link}</span>
// //              ))}
// //            </div>
// //            <p className="text-[10px] text-slate-400 font-medium">TalentSense Intelligence © 2026</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CandidateOverview;

// import React from 'react';
// import { 
//   ShieldCheck, ArrowRight, Zap, Briefcase, 
//   MapPin, Camera, MoreHorizontal, MessageSquare, 
//   ThumbsUp, Share2, Award, Bookmark, User, Clock, Mail
// } from 'lucide-react';

// import { useRecruitmentStore } from '../../core/stores/recruitmentStore';
// import { useATSStore } from '../../core/stores/atsStore';
// import { useProfileStore } from '../../core/stores/profileStore';


// const CandidateOverview = ({ onNavigate }) => {

//   const jobs = useRecruitmentStore((state) => state.jobs);
//   const latestAudit = useATSStore((state) => state.latestAudit);
//   const { profileData } = useProfileStore();

//   const firstName = profileData?.name ? profileData.name.split(' ')[0] : 'Candidate';
//   const latestExp = profileData?.experience?.[0];



//   /* ------------------------------
//      PROFILE COMPLETION ANALYSIS
//   ------------------------------ */

//   const profileChecks = [
//     profileData.name,
//     profileData.headline,
//     profileData.email,
//     profileData.location,
//     profileData.about,
//     profileData.topSkills?.length > 0,
//     profileData.experience?.length > 0,
//     profileData.education?.length > 0,
//     profileData.projects?.length > 0
//   ];

//   const profileCompletion = Math.round(
//     (profileChecks.filter(Boolean).length / profileChecks.length) * 100
//   );



//   /* ------------------------------
//      SKILL GAP ANALYSIS
//   ------------------------------ */

//   const demandedSkills = [
//     "React",
//     "Node",
//     "Python",
//     "SQL",
//     "AWS",
//     "System Design"
//   ];

//   const missingSkills = demandedSkills.filter(
//     skill => !profileData.topSkills?.includes(skill)
//   );



//   /* ------------------------------
//      SALARY ESTIMATION
//   ------------------------------ */

//   const salaryEstimate = latestExp
//     ? "$120K - $160K"
//     : "$80K - $110K";



//   /* ------------------------------
//      RECRUITER VISIBILITY
//   ------------------------------ */

//   const recruiterScore =
//     (profileCompletion * 0.6) +
//     ((latestAudit?.overall || 0) * 0.4);



//   return (
//     <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">


//       {/* LEFT COLUMN */}
//       <div className="lg:col-span-3 space-y-4">

//         {/* MINI PROFILE CARD */}
//         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">

//           <div className="h-16 bg-gradient-to-r from-[#0A66C2] to-emerald-500 relative" />

//           <div className="px-4 pb-4">

//             {/* PROFILE IMAGE */}
//             <div className="relative -mt-10 mb-3 flex justify-center">

//               <div className="w-16 h-16 bg-white rounded-full p-1 border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center">

//                 {profileData.profileImage ? (

//                   <img
//                     src={profileData.profileImage}
//                     className="w-full h-full rounded-full object-cover"
//                     alt="Profile"
//                   />

//                 ) : (

//                   <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center font-black text-xl text-slate-400 uppercase">
//                     {profileData.name
//                       ? profileData.name.charAt(0)
//                       : <User size={24}/>}
//                   </div>

//                 )}

//               </div>

//             </div>


//             {/* NAME + HEADLINE */}

//             <div className="text-center border-b border-slate-100 pb-4">

//               <h2
//                 onClick={() => onNavigate('profile')}
//                 className="text-md font-bold text-slate-900 hover:underline cursor-pointer"
//               >
//                 {profileData.name || "Set Your Name"}
//               </h2>

//               <p className="text-[11px] text-slate-500 mt-1 leading-tight line-clamp-2">
//                 {profileData.headline || "Add your professional headline"}
//               </p>

//               {latestExp && (
//                 <p className="text-[10px] text-slate-400 mt-1">
//                   {latestExp.title} @ {latestExp.company}
//                 </p>
//               )}

//             </div>



//             {/* FOLLOWERS */}

//             <div className="py-4 space-y-3">

//               <div className="flex justify-between text-[11px] font-bold">
//                 <span className="text-slate-500">Profile followers</span>
//                 <span className="text-[#0A66C2]">
//                   {profileData.followers || 0}
//                 </span>
//               </div>

//               <div className="flex justify-between text-[11px] font-bold">
//                 <span className="text-slate-500">Connections</span>
//                 <span className="text-[#0A66C2]">
//                   {profileData.connections || 0}
//                 </span>
//               </div>

//             </div>

//           </div>

//         </div>



//         {/* QUICK ANALYTICS */}

//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm sticky top-24">

//           <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
//             Dashboard Metrics
//           </h3>

//           <div className="space-y-4">


//             {/* ATS SCORE */}

//             <div className="flex items-start gap-3">

//               <Award size={18} className="text-violet-600 shrink-0" />

//               <div>

//                 <p className="text-[11px] font-bold text-slate-700">
//                   ATS Ranking
//                 </p>

//                 <p
//                   onClick={() => onNavigate('ats')}
//                   className="text-[10px] text-slate-500 cursor-pointer hover:underline"
//                 >
//                   {latestAudit
//                     ? `Verified: ${latestAudit.overall}%`
//                     : "Run ATS Audit"}
//                 </p>

//               </div>

//             </div>



//             {/* EMAIL */}

//             <div className="flex items-start gap-3">

//               <Mail size={18} className="text-blue-600 shrink-0" />

//               <div>

//                 <p className="text-[11px] font-bold text-slate-700">
//                   Email Status
//                 </p>

//                 <p className="text-[10px] text-slate-500 truncate">
//                   {profileData.email || "No email set"}
//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>



//       {/* CENTER COLUMN */}

//       <div className="lg:col-span-6 space-y-4">

//         {/* JOB RECOMMENDATIONS */}

//         <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

//           <div className="flex justify-between items-center mb-6">

//             <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
//               <Briefcase size={18} className="text-[#0A66C2]" />
//               Recommended Job Openings
//             </h3>

//             <button
//               onClick={() => onNavigate('jobs')}
//               className="text-xs font-bold text-[#0A66C2] hover:underline"
//             >
//               View All
//             </button>

//           </div>


//           <div className="space-y-4">

//             {jobs.length > 0 ? (

//               jobs.slice(0, 3).map((job) => (

//                 <div
//                   key={job.id}
//                   className="flex gap-4 p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors group cursor-pointer"
//                   onClick={() => onNavigate('jobs')}
//                 >

//                   <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A66C2] font-bold shrink-0">
//                     {job.client.charAt(0)}
//                   </div>

//                   <div className="flex-1 min-w-0">

//                     <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0A66C2] group-hover:underline truncate">
//                       {job.title}
//                     </h4>

//                     <p className="text-xs text-slate-600">
//                       {job.client}
//                     </p>

//                     <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">

//                       <span className="flex items-center gap-1">
//                         <MapPin size={12}/>
//                         {job.location || 'Remote'}
//                       </span>

//                       <span className="flex items-center gap-1">
//                         <Clock size={12}/>
//                         {job.datePosted || 'New'}
//                       </span>

//                     </div>

//                   </div>

//                   <ArrowRight size={16} className="text-slate-300 group-hover:text-[#0A66C2]" />

//                 </div>

//               ))

//             ) : (

//               <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl">

//                 <Briefcase size={32} className="mx-auto text-slate-200 mb-2" />

//                 <p className="text-sm font-bold text-slate-400">
//                   No openings currently available
//                 </p>

//                 <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
//                   Check back later for AI-matched roles
//                 </p>

//               </div>

//             )}

//           </div>

//         </div>



//         {/* ATS INSIGHT FEED */}

//         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

//           <div className="p-4 flex justify-between items-start">

//             <div className="flex gap-2">

//               <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center text-white font-black text-xs">
//                 TS
//               </div>

//               <div>

//                 <h4 className="text-sm font-bold text-slate-900">
//                   TalentSense Intelligence
//                 </h4>

//                 <p className="text-[10px] text-slate-500 font-bold">
//                   System Insights • Now
//                 </p>

//               </div>

//             </div>

//           </div>



//           <div className="px-6 pb-6 pt-2">

//             <p className="text-sm text-slate-800 leading-relaxed mb-4">

//               {latestAudit

//                 ? `${firstName}, your technical dossier is synchronized. You currently hold a ${latestAudit.overall}% match compatibility for ${profileData.headline || 'your career path'}.`

//                 : `Welcome ${firstName}. Initiate an ATS audit to cross-reference your documentation against enterprise-grade Job Descriptions.`}

//             </p>


//             {latestAudit && (

//               <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center">

//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
//                   Technical Compliance Score
//                 </p>

//                 <div className="text-6xl font-black text-[#0A66C2] tracking-tighter">
//                   {latestAudit.overall}%
//                 </div>

//                 <button
//                   onClick={() => onNavigate('ats')}
//                   className="mt-4 text-xs font-black text-[#0A66C2] hover:underline flex items-center justify-center gap-1 mx-auto"
//                 >
//                   Analyze Detailed Report
//                   <ArrowRight size={14}/>
//                 </button>

//               </div>

//             )}

//           </div>

//         </div>

//       </div>



//       {/* RIGHT COLUMN */}

//       <div className="lg:col-span-3 space-y-4">


//         {/* AI PROFILE INTELLIGENCE */}

//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
//             AI Profile Intelligence
//           </h3>

//           <div className="space-y-4">


//             {/* PROFILE COMPLETION */}

//             <div>

//               <p className="text-[11px] font-bold text-slate-700">
//                 Profile Completion
//               </p>

//               <div className="w-full bg-slate-100 rounded h-2 mt-1">

//                 <div
//                   className="bg-[#0A66C2] h-2 rounded"
//                   style={{ width: `${profileCompletion}%` }}
//                 />

//               </div>

//               <p className="text-[10px] text-slate-500 mt-1">
//                 {profileCompletion}% completed
//               </p>

//             </div>



//             {/* RECRUITER VISIBILITY */}

//             <div>

//               <p className="text-[11px] font-bold text-slate-700">
//                 Recruiter Visibility
//               </p>

//               <p className="text-xs text-[#0A66C2] font-bold">
//                 {Math.round(recruiterScore)} / 100
//               </p>

//             </div>



//             {/* SALARY ESTIMATE */}

//             <div>

//               <p className="text-[11px] font-bold text-slate-700">
//                 Market Salary Estimate
//               </p>

//               <p className="text-xs text-slate-600">
//                 {salaryEstimate}
//               </p>

//             </div>



//             {/* SKILL GAPS */}

//             {missingSkills.length > 0 && (

//               <div>

//                 <p className="text-[11px] font-bold text-slate-700 mb-1">
//                   Missing Skills
//                 </p>

//                 <div className="flex flex-wrap gap-1">

//                   {missingSkills.slice(0,3).map(skill => (

//                     <span
//                       key={skill}
//                       className="px-2 py-1 bg-red-50 text-red-600 text-[10px] rounded border border-red-100"
//                     >
//                       {skill}
//                     </span>

//                   ))}

//                 </div>

//               </div>

//             )}

//           </div>

//         </div>



//         {/* SKILLS */}

//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
//             Expertise
//           </h3>

//           <div className="flex flex-wrap gap-2">

//             {profileData.topSkills?.length > 0 ? (

//               profileData.topSkills.map((skill, i) => (

//                 <span
//                   key={i}
//                   className="px-2 py-1 bg-slate-50 text-[10px] font-bold text-slate-600 border border-slate-100 rounded"
//                 >
//                   {skill}
//                 </span>

//               ))

//             ) : (

//               <p className="text-[10px] text-slate-400 italic">
//                 No skills listed
//               </p>

//             )}

//           </div>

//         </div>



//         {/* FOOTER */}

//         <div className="p-4 text-center">

//           <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-4">

//             {['Privacy','Accessibility','Help','Terms'].map(link => (

//               <span
//                 key={link}
//                 className="text-[10px] text-slate-500 hover:text-[#0A66C2] cursor-pointer font-bold"
//               >
//                 {link}
//               </span>

//             ))}

//           </div>

//           <p className="text-[10px] text-slate-400 font-medium">
//             TalentSense Intelligence © 2026
//           </p>

//         </div>

//       </div>

//     </div>
//   );
// };


// export default CandidateOverview;

import React from "react";
import {
  Briefcase,
  MapPin,
  Award,
  User,
  Mail,
  ArrowRight,
  Clock,
  GraduationCap,
  FolderKanban,
  Star,
  Phone,
  CheckCircle2,
  AlertCircle,
  Video,
  FileText,
  Globe,
  Trophy,
  BadgeCheck,
  BarChart3,
  Sparkles,
  Building2,
  ExternalLink,
} from "lucide-react";

import { useRecruitmentStore } from "../../core/stores/recruitmentStore";
import { useATSStore } from "../../core/stores/atsStore";
import { useProfileStore } from "../../core/stores/profileStore";
// import { useInterviewStore } from "../../core/stores/interviewStore";

const cardClass =
  "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden";
// const interviewHistory = useInterviewStore((s)=>s.interviewHistory);
const sectionTitleClass =
  "text-[15px] font-bold text-slate-900 flex items-center gap-2";

const emptyTextClass = "text-sm text-slate-400 italic";

const CandidateOverview = ({ onNavigate }) => {
  const jobs = useRecruitmentStore((state) => state.jobs || []);
  const latestAudit = useATSStore((state) => state.latestAudit);
  const { profileData } = useProfileStore();

  const safeProfile = profileData || {};

  const fullName = safeProfile.firstName
    ? `${safeProfile.firstName} ${safeProfile.lastName || ""}`.trim()
    : safeProfile.name || "Your Name";

  const headline =
    safeProfile.headline ||
    safeProfile.profession ||
    "Add your professional headline";

  const aboutText =
    safeProfile.bio || safeProfile.about || "Add your professional summary.";

  const avatar = safeProfile.avatar || safeProfile.profileImage || "";
  const banner = safeProfile.banner || safeProfile.backgroundImage || "";

  const experience = Array.isArray(safeProfile.experience)
    ? safeProfile.experience
    : [];

  const education = Array.isArray(safeProfile.education)
    ? safeProfile.education
    : [];

  const projects = Array.isArray(safeProfile.projects)
    ? safeProfile.projects
    : [];

  const certifications = Array.isArray(safeProfile.certifications)
    ? safeProfile.certifications
    : [];

  const languages = Array.isArray(safeProfile.languages)
    ? safeProfile.languages
    : [];

  const achievements = Array.isArray(safeProfile.achievements)
    ? safeProfile.achievements
    : [];

  const services = Array.isArray(safeProfile.services)
    ? safeProfile.services
    : [];

  const latestExp = experience?.[0];

  const technicalSkills = Array.isArray(safeProfile.skills?.technical)
    ? safeProfile.skills.technical
    : [];

  const coreSkills = Array.isArray(safeProfile.skills?.core)
    ? safeProfile.skills.core
    : [];

  const softSkills = Array.isArray(safeProfile.skills?.soft)
    ? safeProfile.skills.soft
    : [];

  const knowledgeSkills = Array.isArray(safeProfile.skills?.knowledge)
    ? safeProfile.skills.knowledge
    : [];

  const allSkills = [
    ...technicalSkills,
    ...coreSkills,
    ...softSkills,
    ...knowledgeSkills,
  ]
    .map((item) => {
      if (typeof item === "string") return item;
      return item?.name || "";
    })
    .filter(Boolean);

  const uniqueSkills = [...new Set(allSkills)];
  const topSkills = uniqueSkills.slice(0, 10);

  const socials = safeProfile.socials || {};

  const hasVideoIntro = !!safeProfile.videoIntroUrl;
  const videoPracticeCount = Array.isArray(safeProfile.videoInterviews)
    ? safeProfile.videoInterviews.length
    : 0;

  const profileChecks = [
    !!avatar,
    !!headline && headline !== "Add your professional headline",
    !!aboutText && aboutText !== "Add your professional summary.",
    !!safeProfile.email,
    !!safeProfile.phone,
    !!safeProfile.location,
    !!safeProfile.resumeUrl,
    !!socials.linkedin,
    experience.length > 0,
    education.length > 0,
    uniqueSkills.length > 0,
    projects.length > 0,
    certifications.length > 0,
    languages.length > 0,
  ];

  const profileCompletion = Math.round(
    (profileChecks.filter(Boolean).length / profileChecks.length) * 100
  );

  const recruiterScore = Math.round(
    profileCompletion * 0.5 +
      (latestAudit?.overall ? latestAudit.overall * 0.35 : 0) +
      Math.min(uniqueSkills.length * 1.5, 15)
  );

  const experienceYears = experience.length || 0;

  let salaryEstimate = "Not enough data";
  if (experienceYears > 0) salaryEstimate = "$70K - $90K";
  if (experienceYears >= 3) salaryEstimate = "$90K - $120K";
  if (experienceYears >= 6) salaryEstimate = "$120K - $160K";
  if (experienceYears >= 10) salaryEstimate = "$160K+";

  const jobStats = {
    applied: jobs.filter(
      (job) =>
        String(job?.status || "").toLowerCase() === "applied" ||
        String(job?.applicationStatus || "").toLowerCase() === "applied"
    ).length,
    interview: jobs.filter((job) =>
      ["interview", "screening", "interview_scheduled"].includes(
        String(job?.status || job?.applicationStatus || "").toLowerCase()
      )
    ).length,
    saved: jobs.filter(
      (job) =>
        job?.saved === true ||
        String(job?.status || "").toLowerCase() === "saved" ||
        String(job?.applicationStatus || "").toLowerCase() === "saved"
    ).length,
    total: jobs.length,
  };

  const atsScore = latestAudit?.overall ?? null;
  const atsKeywordScore =
    latestAudit?.keywordMatch ??
    latestAudit?.keywords ??
    latestAudit?.keyword_score ??
    null;
  const atsFormattingScore =
    latestAudit?.formatScore ??
    latestAudit?.formatting ??
    latestAudit?.formattingScore ??
    null;
  const atsExperienceScore =
    latestAudit?.experienceScore ??
    latestAudit?.experience_match ??
    latestAudit?.relevance ??
    null;

  const demandedSkills = ["React", "Node", "Python", "SQL", "AWS", "System Design"];

  const missingSkills = demandedSkills.filter(
    (skill) =>
      !uniqueSkills.some(
        (s) => s.toLowerCase().trim() === skill.toLowerCase().trim()
      )
  );

  const profileStrengthItems = [
    { label: "Profile photo", ok: !!avatar },
    { label: "Headline", ok: !!safeProfile.headline || !!safeProfile.profession },
    { label: "Summary", ok: !!safeProfile.bio },
    { label: "Email", ok: !!safeProfile.email },
    { label: "Experience", ok: experience.length > 0 },
    { label: "Education", ok: education.length > 0 },
    { label: "Skills", ok: uniqueSkills.length > 0 },
    { label: "Projects", ok: projects.length > 0 },
    { label: "Resume", ok: !!safeProfile.resumeUrl },
  ];

  const profileStrengthDone = profileStrengthItems.filter((i) => i.ok).length;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
      {/* LEFT COLUMN */}
      <div className="lg:col-span-3 space-y-4">
        {/* PROFILE HERO CARD */}
        <div className={cardClass}>
          <div className="h-28 bg-gradient-to-r from-[#0A66C2] to-emerald-500 relative">
            {banner && (
              <img
                src={banner}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Banner"
              />
            )}
          </div>

          <div className="px-5 pb-5">
            <div className="relative -mt-10 mb-4 flex justify-center">
              <div className="w-24 h-24 bg-white rounded-full p-1 border border-slate-200 shadow-sm overflow-hidden">
                {avatar ? (
                  <img
                    src={avatar}
                    className="w-full h-full rounded-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <User size={30} />
                  </div>
                )}
              </div>
            </div>

            <div className="text-center border-b border-slate-100 pb-4">
              <h2
                onClick={() => onNavigate?.("profile")}
                className="text-xl font-bold text-slate-900 hover:underline cursor-pointer"
              >
                {fullName}
              </h2>

              <p className="text-sm text-slate-600 mt-1 leading-tight">
                {headline}
              </p>

              {latestExp && (
                <p className="text-xs text-slate-400 mt-2">
                  {(latestExp.role || latestExp.title || "Current Role")} @{" "}
                  {latestExp.company || "Company"}
                </p>
              )}
            </div>

            <div className="pt-4 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin size={15} className="text-slate-400" />
                <span>{safeProfile.location || "Location not added"}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <Mail size={15} className="text-slate-400" />
                <span className="truncate">
                  {safeProfile.email || "Email not added"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <Phone size={15} className="text-slate-400" />
                <span>{safeProfile.phone || "Phone not added"}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <Building2 size={15} className="text-slate-400" />
                <span>{safeProfile.workStatus || "Status not set"}</span>
              </div>
            </div>

            {(socials.linkedin || socials.github || socials.website || socials.twitter) && (
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Links
                </p>

                <div className="space-y-2 text-sm">
                  {socials.linkedin && (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[#0A66C2] hover:underline"
                    >
                      <ExternalLink size={14} />
                      LinkedIn
                    </a>
                  )}

                  {socials.github && (
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[#0A66C2] hover:underline"
                    >
                      <ExternalLink size={14} />
                      GitHub
                    </a>
                  )}

                  {socials.website && (
                    <a
                      href={socials.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[#0A66C2] hover:underline"
                    >
                      <Globe size={14} />
                      Website
                    </a>
                  )}

                  {socials.twitter && (
                    <a
                      href={socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[#0A66C2] hover:underline"
                    >
                      <ExternalLink size={14} />
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PROFILE ANALYTICS */}
        <div className={cardClass + " p-5"}>
          <h3 className="text-xs font-bold text-slate-900 mb-4 uppercase tracking-wider">
            Profile Analytics
          </h3>

          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-800">Profile Completion</p>
                <p className="text-sm font-bold text-[#0A66C2]">{profileCompletion}%</p>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
                <div
                  className="bg-[#0A66C2] h-2.5 rounded-full"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">Recruiter Visibility</p>
              <p className="text-3xl font-black text-[#0A66C2] mt-1">
                {recruiterScore}/100
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">Market Salary Estimate</p>
              <p className="text-lg font-semibold text-slate-700 mt-1">
                {salaryEstimate}
              </p>
            </div>
          </div>
        </div>

        {/* PROFILE STRENGTH */}
        <div className={cardClass + " p-5"}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Profile Strength
            </h3>
            <span className="text-xs font-bold text-slate-500">
              {profileStrengthDone}/{profileStrengthItems.length}
            </span>
          </div>

          <div className="space-y-3">
            {profileStrengthItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-slate-700">{item.label}</span>
                {item.ok ? (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={16} className="text-amber-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER COLUMN */}
      <div className="lg:col-span-6 space-y-4">
        {/* ABOUT */}
        <div className={cardClass + " p-6"}>
          <h3 className={sectionTitleClass}>About</h3>
          <p className="text-sm text-slate-700 leading-7 mt-4">{aboutText}</p>
        </div>

        {/* EXPERIENCE */}
        <div className={cardClass + " p-6"}>
          <div className="flex items-center justify-between mb-5">
            <h3 className={sectionTitleClass}>
              <Briefcase size={18} />
              Experience
            </h3>

            {experience.length > 0 && (
              <button
                onClick={() => onNavigate?.("profile")}
                className="text-xs font-bold text-[#0A66C2] hover:underline"
              >
                View Profile
              </button>
            )}
          </div>

          {experience.length > 0 ? (
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <Briefcase size={18} className="text-slate-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">
                        {exp.role || exp.title || "Role"}
                      </p>

                      <p className="text-sm text-slate-600">
                        {exp.company || "Company"}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {exp.date ||
                          `${exp.startDate || "Start"} - ${exp.endDate || "Present"}`}
                      </p>

                      {(exp.desc || exp.description) && (
                        <p className="text-sm text-slate-600 mt-2 leading-6">
                          {exp.desc || exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={emptyTextClass}>No experience added yet.</p>
          )}
        </div>

        {/* EDUCATION */}
        <div className={cardClass + " p-6"}>
          <h3 className={sectionTitleClass}>
            <GraduationCap size={18} />
            Education
          </h3>

          <div className="mt-5">
            {education.length > 0 ? (
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id} className="flex gap-3 border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                    <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <GraduationCap size={18} className="text-slate-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">
                        {edu.degree || "Degree"}
                      </p>

                      <p className="text-sm text-slate-600">
                        {edu.school || "Institution"}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {edu.date ||
                          edu.year ||
                          `${edu.startDate || ""}${
                            edu.startDate || edu.endDate ? " - " : ""
                          }${edu.endDate || ""}` ||
                          "Not available"}
                      </p>

                      {(edu.desc || edu.description) && (
                        <p className="text-sm text-slate-600 mt-2 leading-6">
                          {edu.desc || edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={emptyTextClass}>No education added yet.</p>
            )}
          </div>
        </div>

        {/* PROJECTS */}
        <div className={cardClass + " p-6"}>
          <h3 className={sectionTitleClass}>
            <FolderKanban size={18} />
            Projects
          </h3>

          <div className="mt-5">
            {projects.length > 0 ? (
              <div className="space-y-5">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                        {project.image ? (
                          <img
                            src={project.image}
                            className="w-full h-full object-cover"
                            alt={project.title || "Project"}
                          />
                        ) : (
                          <FolderKanban size={20} className="text-slate-500" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-900">
                          {project.title || "Project"}
                        </p>

                        {project.category && (
                          <p className="text-xs text-[#0A66C2] font-semibold mt-1">
                            {project.category}
                          </p>
                        )}

                        <p className="text-sm text-slate-600 mt-2 leading-6">
                          {project.desc || project.description || "No description added."}
                        </p>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-[#0A66C2] font-semibold mt-3 hover:underline"
                          >
                            View project
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={emptyTextClass}>No projects added yet.</p>
            )}
          </div>
        </div>

        {/* CERTIFICATIONS + LANGUAGES + ACHIEVEMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={cardClass + " p-6"}>
            <h3 className={sectionTitleClass}>
              <BadgeCheck size={18} />
              Certifications
            </h3>

            <div className="mt-4">
              {certifications.length > 0 ? (
                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <div key={cert.id || idx} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-700">
                        {typeof cert === "string"
                          ? cert
                          : cert.name || cert.title || "Certification"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={emptyTextClass}>No certifications added yet.</p>
              )}
            </div>
          </div>

          <div className={cardClass + " p-6"}>
            <h3 className={sectionTitleClass}>
              <Globe size={18} />
              Languages
            </h3>

            <div className="mt-4">
              {languages.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, idx) => (
                    <span
                      key={lang.id || idx}
                      className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium"
                    >
                      {typeof lang === "string"
                        ? lang
                        : lang.name || lang.language || "Language"}
                    </span>
                  ))}
                </div>
              ) : (
                <p className={emptyTextClass}>No languages added yet.</p>
              )}
            </div>
          </div>

          <div className={cardClass + " p-6 md:col-span-2"}>
            <h3 className={sectionTitleClass}>
              <Trophy size={18} />
              Achievements
            </h3>

            <div className="mt-4">
              {achievements.length > 0 ? (
                <div className="space-y-3">
                  {achievements.map((item, idx) => (
                    <div key={item.id || idx} className="flex items-start gap-2">
                      <Star size={15} className="text-amber-500 mt-1 shrink-0" />
                      <span className="text-sm text-slate-700">
                        {typeof item === "string"
                          ? item
                          : item.title || item.name || "Achievement"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={emptyTextClass}>No achievements added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-3 space-y-4">
        {/* TOP SKILLS */}
        <div className={cardClass + " p-5"}>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
            Top Skills
          </h3>

          {topSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="px-3 py-1.5 bg-slate-50 text-[11px] font-bold text-slate-700 border border-slate-200 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className={emptyTextClass}>No skills added yet.</p>
          )}
        </div>

        {/* JOB ACTIVITY */}
        <div className={cardClass + " p-5"}>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
            Job Activity
          </h3>

          <div className="space-y-3">
            <MetricRow label="Total jobs in tracker" value={jobStats.total} />
            <MetricRow label="Jobs applied" value={jobStats.applied} />
            <MetricRow label="Saved jobs" value={jobStats.saved} />
            <MetricRow label="Interview stage" value={jobStats.interview} />
          </div>
        </div>

        {/* VIDEO PROFILE */}
        <div className={cardClass + " p-5"}>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
            Video Profile
          </h3>

          <div className="space-y-3">
            <MetricRow
              label="Video intro uploaded"
              value={hasVideoIntro ? "Yes" : "No"}
            />
            <MetricRow
              label="Practice interviews"
              value={videoPracticeCount}
            />
          </div>
        </div>

        {/* ATS SCORECARD */}
        <div className={cardClass + " p-5"}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              ATS Scorecard
            </h3>

            <button
              onClick={() => onNavigate?.("ats")}
              className="text-xs font-bold text-[#0A66C2] hover:underline"
            >
              Open
            </button>
          </div>

          {latestAudit ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                  Overall Score
                </p>
                <div className="text-4xl font-black text-[#0A66C2]">
                  {atsScore ?? "-"}%
                </div>
              </div>

              <div className="space-y-3">
                <MetricRow
                  label="Keyword match"
                  value={atsKeywordScore !== null ? `${atsKeywordScore}%` : "Not available"}
                />
                <MetricRow
                  label="Formatting"
                  value={
                    atsFormattingScore !== null
                      ? `${atsFormattingScore}%`
                      : "Not available"
                  }
                />
                <MetricRow
                  label="Experience match"
                  value={
                    atsExperienceScore !== null
                      ? `${atsExperienceScore}%`
                      : "Not available"
                  }
                />
              </div>
            </div>
          ) : (
            <p className={emptyTextClass}>Run ATS audit to see scorecard.</p>
          )}
        </div>

        {/* RECRUITER SIGNALS */}
        <div className={cardClass + " p-5"}>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
            Recruiter Signals
          </h3>

          <div className="space-y-3">
            <MetricRow label="Skills listed" value={uniqueSkills.length} />
            <MetricRow label="Experience entries" value={experience.length} />
            <MetricRow label="Education entries" value={education.length} />
            <MetricRow label="Projects listed" value={projects.length} />
            <MetricRow label="Certifications" value={certifications.length} />
          </div>
        </div>

        {/* SKILLS BREAKDOWN */}
        <div className={cardClass + " p-5"}>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
            Skills Breakdown
          </h3>

          <div className="space-y-3">
            <MetricRow label="Technical" value={technicalSkills.length} />
            <MetricRow label="Core" value={coreSkills.length} />
            <MetricRow label="Soft" value={softSkills.length} />
            <MetricRow label="Knowledge" value={knowledgeSkills.length} />
          </div>
        </div>

        {/* MISSING SKILLS */}
        <div className={cardClass + " p-5"}>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
            Suggested Skills
          </h3>

          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.slice(0, 6).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-red-50 text-red-600 text-[11px] font-bold border border-red-100 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-emerald-600 font-medium">
              Great coverage across key job-market skills.
            </p>
          )}
        </div>

        {/* RECOMMENDED JOBS */}
        <div className={cardClass + " p-5"}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Recommended Jobs
            </h3>

            <button
              onClick={() => onNavigate?.("jobs")}
              className="text-xs font-bold text-[#0A66C2] hover:underline"
            >
              View all
            </button>
          </div>

          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="rounded-xl border border-slate-100 p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => onNavigate?.("jobs")}
                >
                  <p className="text-sm font-bold text-slate-900">
                    {job.title || "Job Title"}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {job.client || "Company"}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {job.location || "Remote"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {job.datePosted || "New"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={emptyTextClass}>No job recommendations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-bold text-slate-900">{value}</span>
    </div>
  );
};

export default CandidateOverview;