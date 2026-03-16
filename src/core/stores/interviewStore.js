import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useInterviewStore = create(
  persist(
    (set) => ({
      results: [],
      
      addInterviewResult: (result) => set((state) => ({
        results: [{ id: Date.now(), ...result }, ...state.results]
      })),

      clearResults: () => set({ results: [] })
    }),
    { name: 'talentsense-interview-storage' }
  )
);