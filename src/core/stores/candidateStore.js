import { create } from 'zustand';

// Helper to create a default candidate object
export const defaultCandidate = (id, name, email) => ({
  id,
  name,
  email,
  role: 'candidate',
  profileComplete: false
});

const useCandidateStore = create((set) => ({
  activeCandidate: null,
  setActiveCandidate: (candidate) => set({ activeCandidate: candidate }),
  clearCandidate: () => set({ activeCandidate: null }),
}));

export default useCandidateStore;