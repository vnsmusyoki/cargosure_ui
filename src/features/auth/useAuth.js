import { useState } from "react";
import * as authService from "./authService";
import { useAuthStore } from "@/store/authStore";

function validate({ email, password }) {
  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return null;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const login = async ({ email, password }) => {
    const validationError = validate({ email, password });
    if (validationError) {
      setError(validationError);
      return null;
    }

    setLoading(true);
    setError("");

    try {
      const user = await authService.login({ email, password });
      setUser(user);
      return user;
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      clearUser();
    }
  };

  const clearError = () => setError("");

  return { login, logout, loading, error, clearError };
}
