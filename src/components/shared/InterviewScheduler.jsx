import React, { useState } from 'react';
import {
  ArrowLeft, Calendar, Clock, CheckCircle,
  ChevronLeft, ChevronRight, Video, Phone,
  MapPin, User, X, Sparkles
} from 'lucide-react';
import { useScheduleStore } from '../../core/stores/scheduleStore';

// Generate mock available dates for the next 3 weeks
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  let added = 0;
  let offset = 1;
  while (added < 14) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    const day = d.getDay();
    if (day !== 0 && day !== 6) { // skip weekends
      dates.push(new Date(d));
      added++;
    }
    offset++;
  }
  return dates;
};

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM'
];

// Make some slots appear 'taken' consistently based on date
const BUSY_SLOTS = ['09:30 AM', '10:30 AM', '02:00 PM', '03:00 PM'];

const INTERVIEW_TYPES = [
  { id: 'video', label: 'Video Call', icon: Video, desc: 'Google Meet / Zoom' },
  { id: 'phone', label: 'Phone Screen', icon: Phone, desc: 'Direct call' },
  { id: 'onsite', label: 'On-Site', icon: MapPin, desc: 'At office location' }
];

const INTERVIEW_DURATIONS = [
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' }
];

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const InterviewScheduler = ({ candidate, onBack, onConfirm }) => {
  const { scheduleInterview, scheduledInterviews } = useScheduleStore();

  const availableDates = generateAvailableDates();

  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState('video');
  const [selectedDuration, setSelectedDuration] = useState(45);
  const [interviewerName, setInterviewerName] = useState('Jamie Davidson');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Calendar logic
  const today = new Date();
  const displayDate = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isAvailable = (day) => {
    const d = new Date(year, month, day);
    return availableDates.some(
      ad => ad.getFullYear() === d.getFullYear() &&
            ad.getMonth() === d.getMonth() &&
            ad.getDate() === d.getDate()
    );
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getFullYear() === year &&
           selectedDate.getMonth() === month &&
           selectedDate.getDate() === day;
  };

  const isToday = (day) => {
    const t = new Date();
    return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day;
  };

  const handleDateSelect = (day) => {
    if (!isAvailable(day)) return;
    setSelectedDate(new Date(year, month, day));
    setSelectedTime(null);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;

    const interview = {
      candidateId: candidate?.id || 'unknown',
      candidateName: candidate?.name || 'Candidate',
      date: selectedDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: selectedTime,
      type: selectedType,
      duration: selectedDuration,
      interviewer: interviewerName,
      jobTitle: candidate?.role || candidate?.jobTitle || 'Open Position'
    };

    scheduleInterview(interview);
    setShowConfirmation(true);
  };

  // Confirmation modal
  if (showConfirmation) {
    return (
      <div className="max-w-2xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-300">
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-[#0A66C2] font-bold text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          {/* Success banner */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-1">Interview Scheduled!</h2>
            <p className="text-white/80 text-sm font-medium">Confirmation has been sent to all parties.</p>
          </div>

          {/* Details */}
          <div className="p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-1">Candidate</p>
                <p className="font-bold text-slate-900 dark:text-white">{candidate?.name || 'Candidate'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-1">Interviewer</p>
                <p className="font-bold text-slate-900 dark:text-white">{interviewerName}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-1">Date</p>
                <p className="font-bold text-slate-900 dark:text-white">
                  {selectedDate?.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-1">Time</p>
                <p className="font-bold text-slate-900 dark:text-white">{selectedTime}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-1">Format</p>
                <p className="font-bold text-slate-900 dark:text-white capitalize">{selectedType.replace(/([A-Z])/g, ' $1').trim()}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-1">Duration</p>
                <p className="font-bold text-slate-900 dark:text-white">
                  {selectedDuration >= 60 ? `${selectedDuration / 60} hour${selectedDuration > 60 ? 's' : ''}` : `${selectedDuration} minutes`}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { setShowConfirmation(false); setSelectedDate(null); setSelectedTime(null); }}
                className="flex-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-bold text-sm transition-all"
              >
                Schedule Another
              </button>
              {onBack && (
                <button
                  onClick={() => { onConfirm?.(); onBack(); }}
                  className="flex-1 bg-[#0A66C2] hover:bg-[#004182] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-400">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-[#0A66C2] font-bold text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="text-[#0A66C2]" /> Schedule Interview
        </h1>
        {candidate && (
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium flex items-center gap-2">
            <User size={14} /> {candidate.name || 'Candidate'} · {candidate.role || candidate.jobTitle || 'Position'}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT: Calendar */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonthOffset(Math.max(0, currentMonthOffset - 1))}
                disabled={currentMonthOffset === 0}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-30"
              >
                <ChevronLeft size={18} className="text-slate-600 dark:text-slate-400" />
              </button>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                {MONTH_NAMES[month]} {year}
              </h3>
              <button
                onClick={() => setCurrentMonthOffset(Math.min(2, currentMonthOffset + 1))}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronRight size={18} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells before first day */}
              {[...Array(firstDayOfMonth)].map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {/* Day cells */}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const available = isAvailable(day);
                const selected = isSelected(day);
                const todayCell = isToday(day);
                const isPast = new Date(year, month, day) < today;

                return (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    disabled={!available || isPast}
                    className={`
                      h-9 w-full rounded-lg text-sm font-bold transition-all
                      ${selected
                        ? 'bg-[#0A66C2] text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30'
                        : available && !isPast
                          ? 'bg-[#EDF3F8] dark:bg-slate-800 text-[#0A66C2] dark:text-blue-400 hover:bg-[#0A66C2] hover:text-white cursor-pointer active:scale-95'
                          : 'text-slate-300 dark:text-slate-600 cursor-default'
                      }
                      ${todayCell && !selected ? 'ring-2 ring-[#0A66C2] ring-offset-1' : ''}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-[#EDF3F8] dark:bg-slate-800 border border-[#0A66C2]" /> Available
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-[#0A66C2]" /> Selected
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Time Slots + Options */}
        <div className="lg:col-span-7 space-y-5">

          {/* Time Slots */}
          {selectedDate ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                <Clock size={14} className="text-[#0A66C2]" />
                {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-4 font-medium">All times in GMT+0 (London)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_SLOTS.map(slot => {
                  const busy = BUSY_SLOTS.includes(slot);
                  const selected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => !busy && setSelectedTime(slot)}
                      disabled={busy}
                      className={`
                        py-2.5 px-3 rounded-xl text-xs font-bold border transition-all
                        ${selected
                          ? 'bg-[#0A66C2] text-white border-[#0A66C2] shadow-md'
                          : busy
                            ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600 border-slate-100 dark:border-slate-800 cursor-not-allowed line-through'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0A66C2] hover:text-[#0A66C2] cursor-pointer active:scale-95'
                        }
                      `}
                    >
                      {slot}
                      {busy && <span className="block text-[9px] font-normal opacity-60">Taken</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
              <Calendar className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Select a date to see available time slots</p>
            </div>
          )}

          {/* Interview Options */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 space-y-5">

            {/* Interview Type */}
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Interview Format</p>
              <div className="grid grid-cols-3 gap-2">
                {INTERVIEW_TYPES.map(({ id, label, icon: Icon, desc }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedType(id)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      selectedType === id
                        ? 'border-[#0A66C2] bg-[#EDF3F8] dark:bg-slate-800'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Icon size={16} className={`mx-auto mb-1 ${selectedType === id ? 'text-[#0A66C2]' : 'text-slate-400'}`} />
                    <p className={`text-[11px] font-bold ${selectedType === id ? 'text-[#0A66C2]' : 'text-slate-600 dark:text-slate-400'}`}>{label}</p>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Duration</p>
              <div className="flex gap-2 flex-wrap">
                {INTERVIEW_DURATIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedDuration(value)}
                    className={`px-4 py-2 rounded-lg border-2 text-xs font-bold transition-all ${
                      selectedDuration === value
                        ? 'border-[#0A66C2] bg-[#EDF3F8] dark:bg-slate-800 text-[#0A66C2]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interviewer */}
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Assigned Interviewer</p>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={interviewerName}
                  onChange={(e) => setInterviewerName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-950 focus:outline-none focus:border-[#0A66C2] dark:text-white transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              selectedDate && selectedTime
                ? 'bg-[#0A66C2] hover:bg-[#004182] text-white active:scale-[0.98]'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            <Sparkles size={15} />
            {selectedDate && selectedTime
              ? `Confirm: ${selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} at ${selectedTime}`
              : 'Select a date and time to confirm'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
