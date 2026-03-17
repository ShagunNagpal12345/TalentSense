import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'position_created',
    message: 'Client created a new position: Lead BI Partner at TechCorp Analytics',
    read: false,
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    portal: 'client'
  },
  {
    id: 'notif-2',
    type: 'candidate_applied',
    message: 'Priya Sharma applied for Lead BI Partner — 94% match score',
    read: false,
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    portal: 'recruiter'
  },
  {
    id: 'notif-3',
    type: 'stage_change',
    message: 'Arjun Patel moved to Interviewing stage for Senior React Developer',
    read: false,
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    portal: 'recruiter'
  },
  {
    id: 'notif-4',
    type: 'interview_scheduled',
    message: 'Interview scheduled with Dr. Rahul Nair on Friday at 10:00 AM',
    read: true,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    portal: 'client'
  },
  {
    id: 'notif-5',
    type: 'offer_extended',
    message: 'Offer extended to candidate for DevOps Engineer role — awaiting acceptance',
    read: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    portal: 'recruiter'
  }
];

export const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: MOCK_NOTIFICATIONS,

      addNotification: (notif) => set((state) => ({
        notifications: [
          {
            id: `notif-${Date.now()}`,
            read: false,
            timestamp: new Date().toISOString(),
            ...notif
          },
          ...state.notifications
        ]
      })),

      markRead: (id) => set((state) => ({
        notifications: state.notifications.map(n =>
          n.id === id ? { ...n, read: true } : n
        )
      })),

      markAllRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),

      getUnreadCount: () => {
        return get().notifications.filter(n => !n.read).length;
      },

      clearAll: () => set({ notifications: [] })
    }),
    { name: 'talentsense-notifications' }
  )
);
