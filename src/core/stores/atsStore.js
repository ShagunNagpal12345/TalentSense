import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useATSStore = create(
  persist(
    (set) => ({
      // --- STATE ---
      latestAudit: null,
      auditHistory: [],
      isAuditing: false,

      // --- ACTIONS ---
      
      // Starts the loading state
      setAuditing: (val) => set({ isAuditing: val }),

      // Saves a new audit and adds it to history
      saveAuditResult: (result) => set((state) => ({
        latestAudit: {
          ...result,
          id: `audit-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
        },
        auditHistory: [
          {
            id: `audit-${Date.now()}`,
            score: result.overall,
            date: new Date().toLocaleDateString(),
            sentiment: result.sentiment
          },
          ...state.auditHistory
        ],
        isAuditing: false
      })),

      // Clears the current audit data
      clearLatestAudit: () => set({ latestAudit: null }),

      // Completely purges history
      purgeHistory: () => set({ auditHistory: [], latestAudit: null })
    }),
    {
      name: 'talent-sense-ats-storage', // Saves data to local storage
    }
  )
);