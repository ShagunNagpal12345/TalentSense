import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useVideoStore = create(
  persist(
    (set) => ({
      // --- STATE ---
      videoIntros: [], // Array of { id, title, url, isPrimary, date }

      // --- ACTIONS ---
      
      // Adds a new recording to the list (max 3)
      addVideo: (video) => set((state) => {
        if (state.videoIntros.length >= 3) return state;
        
        // If it's the first video, make it primary automatically
        const isPrimary = state.videoIntros.length === 0;
        
        return {
          videoIntros: [
            ...state.videoIntros,
            { ...video, isPrimary }
          ]
        };
      }),

      // Deletes a specific video
      deleteVideo: (id) => set((state) => ({
        videoIntros: state.videoIntros.filter(v => v.id !== id)
      })),

      // Sets a video as primary and unsets others
      setPrimaryVideo: (id) => set((state) => ({
        videoIntros: state.videoIntros.map(v => ({
          ...v,
          isPrimary: v.id === id
        }))
      })),

      // Updates the custom title of a video
      updateVideoTitle: (id, newTitle) => set((state) => ({
        videoIntros: state.videoIntros.map(v => 
          v.id === id ? { ...v, title: newTitle } : v
        )
      })),

      // Purges all video data
      clearAllVideos: () => set({ videoIntros: [] })
    }),
    {
      name: 'talentsense-video-storage', // Key for LocalStorage
    }
  )
);