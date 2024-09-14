import { create } from 'zustand';

export const useStore = create((set) => ({
  applicant: {
    email: '',
    phone: '',
    resume: null,
  },
  setApplicant: (applicantData) =>
    set((state) => ({
      applicant: { ...state.applicant, ...applicantData },
    })),
}));
