import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useScheduleStore = create(
  persist(
    (set, get) => ({
      scheduledInterviews: [],

      scheduleInterview: (interview) => set((state) => ({
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
      })),

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
