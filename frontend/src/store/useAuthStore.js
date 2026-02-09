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
  isAdmin: false,

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
        isAdmin: response.data.user?.isAdmin || false,
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
        isAdmin: response.data.user?.isAdmin || false,
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
      isAdmin: false,
      isAuthenticated: false,
      error: null,
      authFormData: { email: "", password: "", name: "" },
    });
    toast.success("Signed out successfully!");
  },

  testAdminLogin: async () => {
    set({ loading: true });
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/test-admin`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isAdmin: response.data.user?.isAdmin || false,
        error: null,
      });
      toast.success("Logged in as test admin!");
    } catch (error) {
      console.log("Error in testAdminLogin function", error);
      toast.error("Failed to login as test admin");
    } finally {
      set({ loading: false });
    }
  },
}));

{import.meta.env.MODE === "development" && (
  <button>Test Admin</button>
)}
