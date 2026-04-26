// Simple AuthContext for demo (replace with real auth logic in production)
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Default to company for demo; in real app, get from login
  const [role, setRole] = useState(localStorage.getItem('role') || 'company');
  const [user, setUser] = useState({ name: 'John Kamau', role });

  // Call this on login to set role
  const login = (userData) => {
    setRole(userData.role);
    setUser(userData);
    localStorage.setItem('role', userData.role);
  };

  // Call this on logout
  const logout = () => {
    setRole(null);
    setUser(null);
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
