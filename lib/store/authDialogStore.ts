import { create } from 'zustand';

type AuthDialogState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useAuthDialogStore = create<AuthDialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
