import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useAuthStore = create((set, get) => ({
  // auth state
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  // form state
  authFormData: {
    email: "",
    password: "",
    name: "", // for sign up
  },

  setAuthFormData: (authFormData) => set({ authFormData }),
  resetAuthForm: () =>
    set({ authFormData: { email: "", password: "", name: "" } }),

  signUp: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { authFormData } = get();
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name: authFormData.name,
        email: authFormData.email,
        password: authFormData.password,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        error: null,
      });

      get().resetAuthForm();
      toast.success("Account created successfully!");
      document.getElementById("login_modal").close();
    } catch (error) {
      console.log("Error in signUp function", error);
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { authFormData } = get();
      const response = await axios.post(`${BASE_URL}/api/auth/signin`, {
        email: authFormData.email,
        password: authFormData.password,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        error: null,
      });

      get().resetAuthForm();
      toast.success("Signed in successfully!");
      document.getElementById("login_modal").close();
    } catch (error) {
      console.log("Error in signIn function", error);
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  signOut: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
      authFormData: { email: "", password: "", name: "" },
    });
    toast.success("Signed out successfully!");
  },
}));
