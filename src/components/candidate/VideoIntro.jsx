import React, { useState, useRef, useEffect } from 'react';
import {
  Video, Play, Trash2,
  CheckCircle, Star, Plus, Info
} from 'lucide-react';
import { useVideoStore } from '../../core/stores/videoStore';
import { useRecruitmentStore } from '../../core/stores/recruitmentStore';

const VideoIntro = () => {
  const {
    videoIntros, addVideo, deleteVideo,
    setPrimaryVideo, updateVideoTitle
  } = useVideoStore();

  const updateCandidateProfile = useRecruitmentStore(state => state.updateCandidateProfile);

  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [showRecorder, setShowRecorder] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  // When camera is ready, update the video element's srcObject
  useEffect(() => {
    if (showRecorder && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      setCameraReady(true);
    }
  }, [showRecorder, stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setShowRecorder(true);
      setCameraReady(false);
    } catch (err) {
      alert("Please enable camera/microphone permissions to record your intro.");
    }
  };

  const startRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const newVideo = {
        id: Date.now(),
        title: `Video Pitch #${videoIntros.length + 1}`,
        url: url,
        date: new Date().toLocaleDateString()
      };
      addVideo(newVideo);

      // Feature 14: Also sync to profile store as videoIntroUrl
      if (videoIntros.length === 0) {
        updateCandidateProfile({ videoIntroUrl: url });
      }
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
    setSeconds(0);
    timerRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev >= 59) { stopRecording(); return 60; }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    if (stream) stream.getTracks().forEach(track => track.stop());
    setStream(null);
    setShowRecorder(false);
    setCameraReady(false);
  };

  const cancelCamera = () => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    setStream(null);
    setShowRecorder(false);
    setCameraReady(false);
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Video Introduction</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Showcase your communication skills. Record up to 3 specialized intros for recruiters.
          </p>
        </div>
        {videoIntros.length < 3 && !showRecorder && (
          <button
            onClick={startCamera}
            className="px-6 py-2 bg-[#0A66C2] text-white rounded-full font-bold text-sm hover:bg-[#004182] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4"/> Record New
          </button>
        )}
      </div>

      {/* INFO BANNER */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl flex gap-3 items-start">
        <Info className="w-5 h-5 text-[#0A66C2] shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
          Profiles with a Video Intro are 3x more likely to get an interview. Keep your pitch between 30-60 seconds and focus on your most impactful achievements.
        </p>
      </div>

      {/* RECORDER INTERFACE */}
      {showRecorder && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 flex flex-col items-center border border-slate-200 dark:border-slate-800 shadow-xl animate-in zoom-in duration-300">

          {/* Camera Preview Label */}
          {cameraReady && !isRecording && (
            <div className="mb-3 flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
              <div className="w-2 h-2 bg-[#0A66C2] rounded-full animate-pulse" />
              <span className="text-xs font-bold text-[#0A66C2]">Camera Preview — Ready to Record</span>
            </div>
          )}

          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video w-full max-w-2xl border-4 border-slate-100 dark:border-slate-800 shadow-inner">
            {/* Feature 14: playsInline added for mobile support */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {isRecording && (
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-bold animate-pulse uppercase tracking-wider">
                <div className="w-2 h-2 bg-white rounded-full" />
                REC 00:{seconds < 10 ? `0${seconds}` : seconds} / 01:00
              </div>
            )}

            {!cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <div className="text-center">
                  <Video className="w-12 h-12 text-slate-600 mx-auto mb-2 animate-pulse" />
                  <p className="text-slate-400 text-sm font-medium">Starting camera...</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8">
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={!cameraReady}
                className={`px-8 py-3 text-white rounded-full font-bold text-sm transition-all shadow-md ${
                  cameraReady
                    ? 'bg-[#0A66C2] hover:bg-[#004182]'
                    : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                }`}
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="px-8 py-3 bg-red-600 text-white rounded-full font-bold text-sm hover:bg-red-700 transition-all shadow-md"
              >
                Stop & Save
              </button>
            )}
            <button
              onClick={cancelCamera}
              className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 rounded-full font-bold text-sm hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videoIntros.map((video) => (
          <div key={video.id} className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 transition-all hover:shadow-md ${video.isPrimary ? 'ring-2 ring-[#0A66C2]' : ''}`}>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 group">
              <video src={video.url} className="w-full h-full object-cover" />
              <button
                onClick={() => window.open(video.url, '_blank')}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <Play className="w-5 h-5 ml-1" fill="white" />
                </div>
              </button>
              {video.isPrimary && (
                <div className="absolute top-2 left-2 bg-[#0A66C2] text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Star size={10} fill="white"/> Primary
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Title</label>
                <input
                  type="text"
                  value={video.title}
                  onChange={(e) => updateVideoTitle(video.id, e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:ring-1 focus:ring-[#0A66C2] transition-all"
                />
              </div>

              <div className="flex justify-between items-center pt-1">
                <button
                  onClick={() => { if(window.confirm("Delete this video?")) deleteVideo(video.id); }}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                  <Trash2 size={16}/>
                </button>

                {video.isPrimary ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
                    <CheckCircle size={12}/> Live
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setPrimaryVideo(video.id);
                      // Sync primary to profile
                      updateCandidateProfile({ videoIntroUrl: video.url });
                    }}
                    className="text-[10px] font-bold text-[#0A66C2] hover:underline uppercase tracking-widest"
                  >
                    Set Primary
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {videoIntros.length === 0 && !showRecorder && (
          <div className="md:col-span-3 py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Video className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Your Video Studio is Empty</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mt-1 leading-relaxed">
              Introduce yourself with a personal touch. Recorded pitches allow recruiters to see your communication skills instantly.
            </p>
            <button
              onClick={startCamera}
              className="mt-6 px-8 py-2.5 bg-[#0A66C2] text-white rounded-full font-bold text-sm hover:bg-[#004182] transition-all shadow-md"
            >
              Record First Intro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoIntro;
