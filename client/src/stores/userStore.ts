import { User, Role } from "@/services/user/userHelper";
import { create } from "zustand";

interface UserState {
  user: User | null;
  userID: number | null;
  userRole: Role | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  userID: null,
  userRole: null,
  setUser: (user) => {
    set(() => ({ user }));
    if (user?.id) {
      set(() => ({ userID: user.id }));
    }
    if (user?.role) {
      set(() => ({ userRole: user.role }));
    }
  },
  removeUser: () => set({ user: null, userID: null, userRole: null }),
}));
