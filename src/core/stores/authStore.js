import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  // Login Actions
  loginRecruiter: (recruiter) => set({ user: recruiter, isAuthenticated: true }),
  loginClient: (client) => set({ user: client, isAuthenticated: true }),
  loginCandidate: (candidate) => set({ user: candidate, isAuthenticated: true }),
  
  // Logout Action
  logout: () => set({ user: null, isAuthenticated: false }),
}));