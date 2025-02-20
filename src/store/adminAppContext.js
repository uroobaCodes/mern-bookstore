import { create } from "zustand";

export const useAdminAppContext = create((set) => ({
  admin: null,

  initializeAdminState: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ admin: { token } });
    }
  },
  loginAdmin: (token) => {
    localStorage.setItem("token", token);
    set({ admin: { token } });
  },
  logoutAdmin: () => {
    localStorage.removeItem("token");
    set({ admin: null });
  },
}));
