import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useNotificationStore } from './notificationStore';

export const useScheduleStore = create(
  persist(
    (set, get) => ({
      scheduledInterviews: [],

      scheduleInterview: (interview) => {
        set((state) => ({
          scheduledInterviews: [
            ...state.scheduledInterviews,
            {
              id: `interview-${Date.now()}`,
              ...interview,
              meetingLink: interview.meetingLink || '',
              scheduledAt: new Date().toISOString(),
              status: 'confirmed'
            }
          ]
        }));

        // Fire notifications
        const { candidateName, jobTitle, date, time } = interview;
        try {
          useNotificationStore.getState().addNotification({
            type: 'interview_scheduled',
            message: `Interview scheduled: ${candidateName} for ${jobTitle || 'a role'} on ${date} at ${time}`,
            portal: 'candidate'
          });
          useNotificationStore.getState().addNotification({
            type: 'interview_scheduled',
            message: `Interview confirmed: ${candidateName} — ${date} at ${time}`,
            portal: 'client'
          });
        } catch (e) {}
      },

      cancelInterview: (id) => set((state) => ({
        scheduledInterviews: state.scheduledInterviews.map(i =>
          i.id === id ? { ...i, status: 'cancelled' } : i
        )
      })),

      getInterviewsForCandidate: (candidateId) => {
        return get().scheduledInterviews.filter(i => i.candidateId === candidateId);
      }
    }),
    { name: 'talentsense-schedule' }
  )
);
