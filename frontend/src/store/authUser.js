import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthUserStore = create((set) => ({
  user: null,
  isSigingUp: false,
  isAuthChecking: true,
  isLoggigOut: false,
  isLoggingIn: false,
  signup: async (credentials) => {
    set({ isSigingUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigingUp: false });
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigingUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      set({ isLoggingIn: false, user: null });
    }
  },
  logout: async () => {
    set({ isLoggigOut: true });
    try {
      const response = await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggigOut: false });
      toast.success(response.data.message || "Logout successful!");
    } catch (error) {
      set({ user: null, isLoggigOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isAuthChecking: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isAuthChecking: false });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      set({ user: null, isAuthChecking: false });
    }
  },
}));
