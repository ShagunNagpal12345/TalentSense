import { create } from "zustand";

const defaultProfile = {
  firstName: "",
  lastName: "",
  name: "",
  headline: "",
  profession: "",
  bio: "",

  email: "",
  phone: "",
  location: "",
  age: "",
  residence: "",
  address: "",
  workStatus: "Available",

  googleFormUrl: "",

  socials: {
    linkedin: "",
    github: "",
    twitter: "",
    website: ""
  },

  avatar: "",
  banner: "",
  resumeUrl: "",
  resumeName: "",

  experience: [],
  education: [],
  services: [],
  projects: [],
  testimonials: [],

  skills: {
    technical: [],
    core: [],
    soft: [],
    knowledge: []
  }
};

export const useProfileStore = create((set, get) => ({
  profileData:
    JSON.parse(localStorage.getItem("profileData")) || defaultProfile,

  // Replace entire profile
  setProfileData: (data) => {
    localStorage.setItem("profileData", JSON.stringify(data));
    set({ profileData: data });
  },

  // Update single field
  updateField: (key, value) =>
    set((state) => {
      const updated = { ...state.profileData, [key]: value };

      localStorage.setItem("profileData", JSON.stringify(updated));

      return { profileData: updated };
    }),

  // Add item to list
  addToList: (collection, item) =>
    set((state) => {
      const updated = {
        ...state.profileData,
        [collection]: [
          ...(state.profileData[collection] || []),
          { ...item, id: Date.now() }
        ]
      };

      localStorage.setItem("profileData", JSON.stringify(updated));

      return { profileData: updated };
    }),

  // Remove item from list
  removeFromList: (collection, id) =>
    set((state) => {
      const updated = {
        ...state.profileData,
        [collection]: state.profileData[collection].filter(
          (item) => item.id !== id
        )
      };

      localStorage.setItem("profileData", JSON.stringify(updated));

      return { profileData: updated };
    }),

  // Update item inside list
  updateListItem: (collection, id, field, value) =>
    set((state) => {
      const updated = {
        ...state.profileData,
        [collection]: state.profileData[collection].map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      };

      localStorage.setItem("profileData", JSON.stringify(updated));

      return { profileData: updated };
    }),

  // Reset profile
  resetProfile: () => {
    localStorage.removeItem("profileData");
    set({ profileData: defaultProfile });
  }
}));