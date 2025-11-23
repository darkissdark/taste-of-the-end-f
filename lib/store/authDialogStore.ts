import { create } from 'zustand';

type AuthDialogState = {
  isOpen: boolean;
  lastTrigger: HTMLElement | null;
  open: (trigger?: HTMLElement | null) => void;
  close: () => void;
};

export const useAuthDialogStore = create<AuthDialogState>((set) => ({
  isOpen: false,
  lastTrigger: null,
  open: (trigger) =>
    set({
      isOpen: true,
      lastTrigger: trigger ?? null,
    }),
  close: () => set({ isOpen: false }),
}));
