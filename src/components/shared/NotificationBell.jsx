import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCheck, Info, UserPlus, Calendar, TrendingUp, Briefcase } from 'lucide-react';
import { useNotificationStore } from '../../core/stores/notificationStore';

const TYPE_ICONS = {
  position_created: Briefcase,
  candidate_applied: UserPlus,
  stage_change: TrendingUp,
  interview_scheduled: Calendar,
  offer_extended: CheckCheck,
  default: Info
};

const TYPE_COLORS = {
  position_created: 'text-sky-600 bg-sky-50 dark:bg-sky-900/30',
  candidate_applied: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30',
  stage_change: 'text-violet-600 bg-violet-50 dark:bg-violet-900/30',
  interview_scheduled: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30',
  offer_extended: 'text-[#0A66C2] bg-blue-50 dark:bg-blue-900/30',
  default: 'text-slate-600 bg-slate-50 dark:bg-slate-800'
};

const formatTime = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
};

const NotificationBell = ({ accentColor = '#0A66C2' }) => {
  const [open, setOpen] = useState(false);
  const { notifications, markRead, markAllRead, getUnreadCount } = useNotificationStore();
  const unreadCount = getUnreadCount();
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-400"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center bg-red-500 rounded-full text-white text-[9px] font-black border-2 border-white dark:border-slate-900 leading-none">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-[200] animate-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <Bell size={14} className="text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-bold text-[#0A66C2] hover:underline flex items-center gap-1"
                >
                  <CheckCheck size={11} /> Mark all read
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-[360px] overflow-y-auto custom-scrollbar divide-y divide-slate-50 dark:divide-slate-800">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell size={28} className="mx-auto text-slate-200 dark:text-slate-700 mb-2" />
                <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notif) => {
                const IconComp = TYPE_ICONS[notif.type] || TYPE_ICONS.default;
                const colorClass = TYPE_COLORS[notif.type] || TYPE_COLORS.default;
                return (
                  <button
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${!notif.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${colorClass}`}>
                      <IconComp size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-relaxed ${notif.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200 font-semibold'}`}>
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-medium">
                        {formatTime(notif.timestamp)}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-[#0A66C2] rounded-full mt-1.5 shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 font-medium">
                Showing {notifications.length} notifications
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
