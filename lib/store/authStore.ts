import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set((state) => {
      const updatedUser = state.user
        ? { ...state.user, ...user }
        : (user as User);

      return {
        user: updatedUser,
        isAuthenticated: true,
      };
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
