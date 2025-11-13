import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        doLogin: (token, user) => set({ user, token }),
        doLogout: () => set({ user: null, token: null }),
      }),
      { name: "authenticate-storage" },
    ),
    { name: "authenticateStore" },
  ),
);

export const useAuthSelector = (selector) => useAuthStore(useShallow(selector));