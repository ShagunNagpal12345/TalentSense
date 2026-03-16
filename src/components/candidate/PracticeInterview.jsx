import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Video, Mic, Play, Zap, Camera, CheckCircle2, AlertCircle, 
  FileDown, ShieldCheck, MessageSquare, Timer, Eye, MonitorCheck,Loader2,
  Lightbulb, Activity, CheckCircle, Clock, Compass, Layers, AlertTriangle
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useInterviewStore } from '../../core/stores/interviewStore';

// --- GENERIC PSYCHOMETRIC & BEHAVIORAL POOL ---
const QUESTION_POOL = [
    // ---------- VERBAL QUESTIONS ----------
    { id: 'v1', type: 'verbal', category: 'Introduction', text: "Tell me about yourself and your journey so far." },
    { id: 'v2', type: 'verbal', category: 'Career', text: "Why did you choose your current career path?" },
    { id: 'v3', type: 'verbal', category: 'Motivation', text: "What motivates you to perform well at work?" },
    { id: 'v4', type: 'verbal', category: 'Adaptability', text: "Tell me about a time you had to adapt to a significant change." },
    { id: 'v5', type: 'verbal', category: 'Collaboration', text: "Describe a situation where you had a disagreement with a team member." },
    { id: 'v6', type: 'verbal', category: 'Leadership', text: "Tell me about a time you stepped up and took leadership." },
    { id: 'v7', type: 'verbal', category: 'Problem Solving', text: "Describe a difficult problem you solved in a project." },
    { id: 'v8', type: 'verbal', category: 'Learning', text: "Tell me about a new skill you learned recently and how." },
    { id: 'v9', type: 'verbal', category: 'Failure', text: "Describe a professional failure and what you learned from it." },
    { id: 'v10', type: 'verbal', category: 'Growth', text: "Where do you see yourself in the next 5 years?" },
  
    // ---------- MCQ QUESTIONS ----------
    {
      id: 'm1',
      type: 'mcq',
      category: 'Problem Solving',
      text: "When faced with multiple urgent deadlines you typically:",
      options: [
        "Prioritize tasks by business impact",
        "Work longer hours to finish everything",
        "Ask for deadline extensions immediately",
        "Delegate tasks randomly"
      ],
      correct: 0
    },
    {
      id: 'm2',
      type: 'mcq',
      category: 'Collaboration',
      text: "A colleague is struggling with their tasks and delaying the project. You:",
      options: [
        "Complain to the manager",
        "Ignore it",
        "Offer help and guidance",
        "Do their work completely"
      ],
      correct: 2
    },
    {
      id: 'm3',
      type: 'mcq',
      category: 'Adaptability',
      text: "Your project requirements suddenly change. You:",
      options: [
        "Continue with the original plan",
        "Adapt quickly and update the approach",
        "Blame management",
        "Delay the work"
      ],
      correct: 1
    },
    {
      id: 'm4',
      type: 'mcq',
      category: 'Leadership',
      text: "In a team meeting your idea is opposed. You:",
      options: [
        "Argue aggressively",
        "Withdraw completely",
        "Listen and find middle ground",
        "Escalate immediately"
      ],
      correct: 2
    },
    {
      id: 'm5',
      type: 'mcq',
      category: 'Learning',
      text: "You encounter a tool you don't know. You:",
      options: [
        "Avoid using it",
        "Ask someone to do it",
        "Learn it quickly yourself",
        "Ignore the task"
      ],
      correct: 2
    },
    {
      id: 'm6',
      type: 'mcq',
      category: 'Ownership',
      text: "You discover a bug in production. You:",
      options: [
        "Ignore it",
        "Report and help fix it",
        "Blame another team",
        "Wait for someone else"
      ],
      correct: 1
    },
    {
      id: 'm7',
      type: 'mcq',
      category: 'Time Management',
      text: "When tasks pile up you:",
      options: [
        "Prioritize based on impact",
        "Start randomly",
        "Delay tasks",
        "Wait for direction"
      ],
      correct: 0
    },
    {
      id: 'm8',
      type: 'mcq',
      category: 'Communication',
      text: "If you disagree with your manager:",
      options: [
        "Stay silent",
        "Argue publicly",
        "Discuss respectfully",
        "Ignore instructions"
      ],
      correct: 2
    },
    {
      id: 'm9',
      type: 'mcq',
      category: 'Decision Making',
      text: "If you must make a quick decision:",
      options: [
        "Delay it",
        "Use available data",
        "Guess randomly",
        "Ignore the issue"
      ],
      correct: 1
    },
    {
      id: 'm10',
      type: 'mcq',
      category: 'Teamwork',
      text: "When working with a new team:",
      options: [
        "Observe and understand first",
        "Ignore others",
        "Push your way",
        "Work independently always"
      ],
      correct: 0
    }
  ];

const TIPS = [
  "Do not leave this tab. Switching tabs will trigger an anti-cheat warning.",
  "Ensure you are in a quiet, well-lit environment.",
  "Use the STAR method (Situation, Task, Action, Result) for video responses.",
  "Keep eye contact with your camera to simulate an in-person interview.",
  "Answer multiple-choice questions based on your professional instincts."
];

const BENCHMARKS = { Leadership: 80, Adaptability: 85, Collaboration: 90, ProblemSolving: 85 };

const PracticeInterview = () => {
  const addInterviewResult = useInterviewStore((s) => s.addInterviewResult);

  const [status, setStatus] = useState('idle'); // idle, hardware_check, preview, recording, analyzing, result, failed
  const [stream, setStream] = useState(null);
  const [interimText, setInterimText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90); 
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [qaLog, setQaLog] = useState([]);
  const [report, setReport] = useState(null);
  const [micLevel, setMicLevel] = useState(0);
  const [warnings, setWarnings] = useState(0);

  const currentIndexRef = useRef(0);
  const qaLogRef = useRef([]); 
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const reportRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyzerRef = useRef(null);
  const animationRef = useRef(null);

  const starCheckers = {
      situation: ["at my last", "responsible", "project involved", "background", "company", "situation", "task"],
      action: ["i implemented", "i developed", "we optimized", "built", "managed", "i decided", "action"],
      result: ["resulted in", "improved by", "saved", "increase", "reduced", "delivered", "outcome"]
  };
  const fillerWords = ["um", "uh", "like", "actually", "basically"];

  // Setup Initial Questions (4 verbal + 4 MCQ randomly)
useEffect(() => {

    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  
    const verbals = shuffle(
      QUESTION_POOL.filter(q => q.type === 'verbal')
    ).slice(0, 4);
  
    const mcqs = shuffle(
      QUESTION_POOL.filter(q => q.type === 'mcq')
    ).slice(0, 4);
  
    const finalSet = shuffle([...verbals, ...mcqs]);
  
    setActiveQuestions(finalSet);
  
    const initialLog = finalSet.map(q => ({
      ...q,
      answer: "",
      fillers: 0,
      selectedOptionIdx: null,
      timeSpent: 0
    }));
  
    setQaLog(initialLog);
    qaLogRef.current = initialLog;
  
  }, []);

  // Sync state to ref for timer access
  useEffect(() => { qaLogRef.current = qaLog; }, [qaLog]);

  // Handle the countdown timer
  useEffect(() => {
    let timer;
    if (status === 'recording' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (status === 'recording' && timeLeft === 0) {
      handleNextQuestion(true);
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  // --- ANTI-CHEAT: TAB SWITCH DETECTION ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && status === 'recording') {
        setWarnings(prev => {
          const newCount = prev + 1;
          if (newCount >= 2) {
            handleFailSession();
          } else {
            alert("⚠️ WARNING: Tab switching is not allowed during the interview. One more violation will automatically terminate your session.");
          }
          return newCount;
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [status]);

  const handleFailSession = () => {
      stopFullHardware();
      setStatus('failed');
  };

  const stopFullHardware = useCallback(() => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    setStream(null);
    if (videoRef.current) videoRef.current.srcObject = null;
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') audioCtxRef.current.close();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
    }
    setIsListening(false);
  }, [stream]);

  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return false;
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      let liveBuffer = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.toLowerCase();
          const detectedFillers = fillerWords.filter(f => transcript.split(/\s+/).includes(f)).length;
          
          setQaLog(prev => {
            const updated = [...prev];
            const idx = currentIndexRef.current;
            if (updated[idx] && updated[idx].type === 'verbal') {
                updated[idx].answer += transcript + " ";
                updated[idx].fillers += detectedFillers;
            }
            return updated;
          });
          setInterimText("");
        } else {
            liveBuffer += event.results[i][0].transcript;
        }
      }
      setInterimText(liveBuffer);
    };
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    return true;
  };

  const startHardwareCheck = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtxRef.current.createMediaStreamSource(mediaStream);
      analyzerRef.current = audioCtxRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256; 
      source.connect(analyzerRef.current);
      setStatus('hardware_check');
      monitorMicLevel();
    } catch (err) { alert("Microphone and Camera access is required to practice."); }
  };

  const monitorMicLevel = () => {
    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
    const updateLevel = () => {
      if (!analyzerRef.current) return;
      analyzerRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setMicLevel(average);
      animationRef.current = requestAnimationFrame(updateLevel);
    };
    updateLevel();
  };

  const handleStartTest = () => {
    setCurrentQuestionIndex(0); 
    currentIndexRef.current = 0;
    setTimeLeft(90);
    setWarnings(0);
    setStatus('recording');
    
    const hasSpeechSupport = initSpeechRecognition();
    if (hasSpeechSupport && activeQuestions[0].type === 'verbal') {
        try { recognitionRef.current.start(); } catch(e) {}
    }
  };

  const handleNextQuestion = (isAutoAdvance = false) => {
    const currentQ = qaLogRef.current[currentIndexRef.current];
    
    if (currentQ.type === 'mcq' && currentQ.selectedOptionIdx === null && !isAutoAdvance) {
        alert("Please select an option before continuing."); 
        return;
    }

    const elapsed = 90 - timeLeft;
    setQaLog(prev => {
        const updated = [...prev];
        updated[currentIndexRef.current].timeSpent = elapsed;
        return updated;
    });

    if (currentQuestionIndex < activeQuestions.length - 1) {
      if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch(e) {} }
      
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      currentIndexRef.current = nextIdx;
      setTimeLeft(90);
      setInterimText("");
      
      if (activeQuestions[nextIdx].type === 'verbal' && recognitionRef.current) {
          setTimeout(() => { try { recognitionRef.current.start(); } catch(e){} }, 500);
      }
    } else {
      generateReport();
    }
  };

  const handleMcqSelect = (idx) => {
      setQaLog(prev => {
          const updated = [...prev];
          updated[currentQuestionIndex].selectedOptionIdx = idx;
          return updated;
      });
  };

  const handleManualTextUpdate = (e) => {
      const val = e.target.value;
      setQaLog(prev => {
          const updated = [...prev];
          updated[currentQuestionIndex].answer = val;
          return updated;
      });
  };

  const generateReport = () => {
    setStatus('analyzing');
    stopFullHardware();

    const verbalLogs = qaLogRef.current.filter(q => q.type === 'verbal');
    const mcqLogs = qaLogRef.current.filter(q => q.type === 'mcq');
    
    // STAR LOGIC 
    let starScore = 0;
    verbalLogs.forEach(v => {
        const hasS = starCheckers.situation.some(k => v.answer.toLowerCase().includes(k));
        const hasA = starCheckers.action.some(k => v.answer.toLowerCase().includes(k));
        const hasR = starCheckers.result.some(k => v.answer.toLowerCase().includes(k));
        if (hasS) starScore += 10; if (hasA) starScore += 10; if (hasR) starScore += 10;
    });
    const avgStar = verbalLogs.length > 0 ? Math.min(Math.round((starScore / (verbalLogs.length * 30)) * 100), 100) : 0;

    // Generic Category Scoring
    const catScores = { Leadership: {t:0, s:0}, Adaptability: {t:0, s:0}, Collaboration: {t:0, s:0}, ProblemSolving: {t:0, s:0} };

    qaLogRef.current.forEach(q => {
        const cat = q.category.replace(" ", ""); // Map "Problem Solving" to "ProblemSolving" if needed, but keys are exactly as defined
        const safeCat = catScores[q.category] ? q.category : 'Adaptability'; // Fallback
        
        catScores[safeCat].t += 1;
        if(q.type === 'mcq') {
            if(q.selectedOptionIdx === q.correct) catScores[safeCat].s += 1;
        } else {
            // Give base points for verbal length + STAR presence
            const lengthScore = q.answer.length > 50 ? 0.5 : 0;
            const starBonus = (starScore / 30) * 0.5;
            catScores[safeCat].s += Math.min(lengthScore + starBonus, 1);
        }
    });

    const totalFillers = verbalLogs.reduce((acc, curr) => acc + curr.fillers, 0);
    const avgVerbalTime = verbalLogs.length > 0 ? (verbalLogs.reduce((acc, curr) => acc + curr.timeSpent, 0) / verbalLogs.length) : 0;
    const pacingScore = avgVerbalTime > 75 ? 65 : avgVerbalTime < 30 ? 55 : 95;
    
    // Overall Calculation
    let totalS = 0; let totalT = 0;
    Object.values(catScores).forEach(c => { totalS += c.s; totalT += c.t; });
    const genericRatio = totalT > 0 ? (totalS / totalT) : 0;
    const finalOverall = Math.round((genericRatio * 50) + (avgStar * 0.30) + (pacingScore * 0.20));

    setTimeout(() => {
      const resultObj = {
        date: new Date().toISOString(),
        overallScore: finalOverall,
        recommendation: finalOverall > 80 ? "Recommended" : "Needs Improvement",
        statusColor: finalOverall > 80 ? "text-emerald-600" : "text-amber-600",
        metrics: { pacing: pacingScore, presence: 94, starCompliance: avgStar, fillers: totalFillers },
        distribution: {
            Leadership: catScores.Leadership.t > 0 ? Math.round((catScores.Leadership.s / catScores.Leadership.t) * 100) : 0,
            Adaptability: catScores.Adaptability.t > 0 ? Math.round((catScores.Adaptability.s / catScores.Adaptability.t) * 100) : 0,
            Collaboration: catScores.Collaboration.t > 0 ? Math.round((catScores.Collaboration.s / catScores.Collaboration.t) * 100) : 0,
            ProblemSolving: catScores['Problem Solving']?.t > 0 ? Math.round((catScores['Problem Solving'].s / catScores['Problem Solving'].t) * 100) : 0,
        }
      };
      
      setReport(resultObj);
      addInterviewResult(resultObj); // Save to Zustand
      setStatus('result');
    }, 2500);
  };

  const exportPDF = async () => {
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Psychometric_Interview_Report.pdf`);
  };

  const getRadarPoint = (angle, value) => {
    const radius = ((value || 0) / 100) * 80;
    const x = 100 + radius * Math.cos((angle - 90) * Math.PI / 180);
    const y = 100 + radius * Math.sin((angle - 90) * Math.PI / 180);
    return `${x},${y}`;
  };

  return (
    <div className="bg-[#F3F2EF] dark:bg-slate-950 text-slate-900 font-sans pb-20">
      
      {/* LINKEDIN STYLE HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 shadow-sm mb-6 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold dark:text-white flex items-center gap-2">
                <ShieldCheck className="text-[#0A66C2]"/> Practice Interview
            </h1>
            {status === 'recording' && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Recording Live</span>
                </div>
            )}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-12 gap-6">
        
        {/* FAILURE SCREEN (TAB SWITCHING) */}
        {status === 'failed' && (
             <div className="col-span-12 bg-white dark:bg-slate-900 rounded-xl border border-red-200 p-12 text-center shadow-sm">
                 <AlertTriangle size={64} className="mx-auto text-red-500 mb-6" />
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Session Terminated</h2>
                 <p className="text-slate-600 max-w-md mx-auto mb-8">You navigated away from the interview tab multiple times. For integrity reasons, this session has been securely closed and marked as incomplete.</p>
                 <button onClick={() => window.location.reload()} className="bg-[#0A66C2] text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-[#004182] transition">Start Over</button>
             </div>
        )}

        {status !== 'result' && status !== 'failed' && (
          <>
            {/* LEFT COLUMN: VIDEO & CONTROLS */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="aspect-[4/3] bg-slate-900 relative">
                  <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                  {!stream && <div className="absolute inset-0 flex items-center justify-center text-slate-500"><Camera size={32}/></div>}
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                    <canvas ref={canvasRef} className="w-full h-4 opacity-30" />
                </div>
              </div>

               <div className="space-y-3">
                {status === 'idle' && <button onClick={startHardwareCheck} className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white py-3.5 rounded-full font-bold transition-all shadow-sm">Begin Hardware Setup</button>}
                
                {status === 'hardware_check' && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-5 shadow-sm">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase"><span>Microphone Level</span><span>{Math.round(micLevel)}dB</span></div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all rounded-full" style={{ width: `${Math.min(micLevel * 2.5, 100)}%` }} />
                        </div>
                        <button onClick={() => setStatus('preview')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full font-bold text-sm shadow-sm">Hardware Looks Good</button>
                    </div>
                )}

                {status === 'preview' && <button onClick={handleStartTest} className="w-full bg-[#0A66C2] text-white py-3.5 rounded-full font-bold shadow-md hover:bg-[#004182] transition-colors">Start Interview</button>}
                {status === 'analyzing' && <div className="w-full bg-slate-100 text-slate-500 py-3.5 rounded-full font-bold flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={18}/> Generating Report...</div>}
              </div>
            </div>

            {/* MIDDLE COLUMN: QUESTION AREA */}
            <div className="col-span-12 lg:col-span-5">
                {status === 'recording' && activeQuestions[currentQuestionIndex] ? (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 min-h-[500px] flex flex-col shadow-sm">
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded">
                                    Question {currentQuestionIndex + 1} of {activeQuestions.length}
                                </span>
                                <div className={`text-xl font-bold font-mono ${timeLeft < 15 ? 'text-red-500' : 'text-slate-400'}`}>00:{timeLeft.toString().padStart(2, '0')}</div>
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-snug">{activeQuestions[currentQuestionIndex].text}</h2>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {activeQuestions[currentQuestionIndex].type === 'verbal' ? (
                                <div className="space-y-4">
                                     <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 min-h-[120px]">
                                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {qaLog[currentQuestionIndex].answer} <span className="text-[#0A66C2] font-semibold">{interimText}</span>
                                        </p>
                                     </div>
                                     <textarea 
                                        value={qaLog[currentQuestionIndex].answer}
                                        onChange={handleManualTextUpdate}
                                        className="w-full p-4 border border-slate-200 dark:border-slate-700 bg-transparent rounded-xl text-sm outline-none focus:border-[#0A66C2] min-h-[100px] dark:text-white"
                                        placeholder="Speak your answer, or type it manually here..."
                                     />
                                </div>
                            ) : (
                                <div className="space-y-3 mt-4">
                                     {activeQuestions[currentQuestionIndex].options.map((opt, idx) => (
                                        <button key={idx} onClick={() => handleMcqSelect(idx)}
                                            className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4
                                            ${qaLog[currentQuestionIndex].selectedOptionIdx === idx ? 'border-[#0A66C2] bg-blue-50 dark:bg-blue-900/20 text-[#0A66C2] dark:text-blue-400' : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${qaLog[currentQuestionIndex].selectedOptionIdx === idx ? 'border-[#0A66C2]' : 'border-slate-300'}`}>
                                                {qaLog[currentQuestionIndex].selectedOptionIdx === idx && <div className="w-2.5 h-2.5 bg-[#0A66C2] rounded-full"/>}
                                            </div>
                                            <span className="font-semibold text-sm leading-snug">{opt}</span>
                                        </button>
                                     ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                            <button onClick={() => handleNextQuestion(false)} className="bg-[#0A66C2] text-white px-8 py-2.5 rounded-full font-bold text-sm hover:bg-[#004182]">
                                {currentQuestionIndex < activeQuestions.length - 1 ? "Submit & Next" : "Finish Interview"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[500px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-slate-400 p-12 text-center shadow-sm">
                        <MonitorCheck size={48} className="mb-4 opacity-20"/>
                        <p className="text-sm font-bold">Waiting to start session...</p>
                        <p className="text-xs mt-2">Complete the hardware setup to begin.</p>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: TIPS */}
            <div className="col-span-12 lg:col-span-3 space-y-4">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                        <Lightbulb size={18} className="text-[#0A66C2]"/> Instructions
                    </h3>
                    <ul className="space-y-4">
                        {TIPS.map((tip, i) => (
                            <li key={i} className="flex gap-3 text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                                <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5"/> {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
          </>
        )}

        {/* --- REPORT SCREEN --- */}
        {status === 'result' && report && (
          <div className="col-span-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in zoom-in duration-500">
             
             <div ref={reportRef} className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Psychometric & Behavioral Report</h2>
                    <p className="text-slate-500 text-sm">Generated on {new Date(report.date).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-6 md:mt-0 text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Assessment</p>
                    <div className={`text-4xl font-black ${report.statusColor}`}>{report.overallScore}%</div>
                    <p className={`text-sm font-bold mt-1 ${report.statusColor}`}>{report.recommendation}</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-12">
                   
                   {/* RADAR CHART */}
                   <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-8 text-sm uppercase tracking-widest w-full text-left">Core Traits Analysis</h3>
                      <svg width="240" height="240" viewBox="0 0 200 200" className="overflow-visible">
                          {[1, 0.75, 0.5, 0.25].map(scale => (
                            <polygon key={scale} points={`${getRadarPoint(0, 100*scale)} ${getRadarPoint(90, 100*scale)} ${getRadarPoint(180, 100*scale)} ${getRadarPoint(270, 100*scale)}`} fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                          ))}
                          <polygon points={`${getRadarPoint(0, report.distribution.Leadership)} ${getRadarPoint(90, report.distribution.Adaptability)} ${getRadarPoint(180, report.distribution.Collaboration)} ${getRadarPoint(270, report.distribution.ProblemSolving || 50)}`} fill="rgba(10, 102, 194, 0.2)" stroke="#0a66c2" strokeWidth="3"/>
                          
                          {/* Labels */}
                          <text x="100" y="10" textAnchor="middle" className="text-[10px] fill-slate-500 font-bold">Leadership ({report.distribution.Leadership}%)</text>
                          <text x="200" y="105" textAnchor="start" className="text-[10px] fill-slate-500 font-bold">Adaptability ({report.distribution.Adaptability}%)</text>
                          <text x="100" y="200" textAnchor="middle" className="text-[10px] fill-slate-500 font-bold">Collaboration ({report.distribution.Collaboration}%)</text>
                          <text x="0" y="105" textAnchor="end" className="text-[10px] fill-slate-500 font-bold">Problem Solving ({(report.distribution.ProblemSolving || 50)}%)</text>
                      </svg>
                   </div>

                   {/* VERBAL METRICS */}
                   <div className="space-y-6">
                      <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-widest">Communication Metrics</h3>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">STAR Method Compliance</p>
                              <p className="text-2xl font-black text-slate-800 dark:text-white">{report.metrics.starCompliance}%</p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Pacing & Flow</p>
                              <p className="text-2xl font-black text-slate-800 dark:text-white">{report.metrics.pacing}%</p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Filler Word Count</p>
                              <p className="text-2xl font-black text-red-500">{report.metrics.fillers}</p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tab Switches</p>
                              <p className={`text-2xl font-black ${warnings > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>{warnings}</p>
                          </div>
                      </div>
                   </div>
                </div>
             </div>

            {/* ACTION FOOTER */}
            <div className="p-8 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex gap-4 no-print">
               <button onClick={exportPDF} className="bg-[#0A66C2] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:bg-[#004182] transition-colors flex items-center gap-2">
                 <FileDown size={18}/> Download PDF Report
               </button>
               <button onClick={() => window.location.reload()} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                 Retake Interview
               </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PracticeInterview;