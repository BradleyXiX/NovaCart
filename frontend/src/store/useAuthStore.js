import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

const STORAGE_KEY = "novacart-auth";

// Helper function to load auth from localStorage
const loadAuthFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed;
    }
  } catch (error) {
    console.log("Error loading auth from storage", error);
  }
  return null;
};

// Helper function to save auth to localStorage
const saveAuthToStorage = (authState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  } catch (error) {
    console.log("Error saving auth to storage", error);
  }
};

// Load initial state from localStorage
const initialAuthState = loadAuthFromStorage() || {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isAdmin: false,
};

export const useAuthStore = create((set, get) => ({
  // auth state
  user: initialAuthState.user,
  loading: false,
  error: null,
  isAuthenticated: initialAuthState.isAuthenticated,
  isAdmin: initialAuthState.isAdmin,

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

      const authState = {
        user: response.data.user,
        isAuthenticated: true,
        isAdmin: response.data.user?.isAdmin || false,
        error: null,
      };

      set(authState);
      saveAuthToStorage(authState);

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

      const authState = {
        user: response.data.user,
        isAuthenticated: true,
        isAdmin: response.data.user?.isAdmin || false,
        error: null,
      };

      set(authState);
      saveAuthToStorage(authState);

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
      isAdmin: false,
      error: null,
      authFormData: { email: "", password: "", name: "" },
    });
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Signed out successfully!");
  },

  testAdminLogin: async () => {
    set({ loading: true });
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/test-admin`);
      const authState = {
        user: response.data.user,
        isAuthenticated: true,
        isAdmin: response.data.user?.isAdmin || false,
        error: null,
      };
      set(authState);
      saveAuthToStorage(authState);
      toast.success("Logged in as test admin!");
    } catch (error) {
      console.log("Error in testAdminLogin function", error);
      toast.error("Failed to login as test admin");
    } finally {
      set({ loading: false });
    }
  },
}));
