"use client"
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface AuthContextProps {
  user: any;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to check user status
  const checkUserStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/me");
      setUser(response.data);
    } catch (err) {
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:5000/logout");
      setUser(null);
    } catch (err) {
      setError("Error logging out");
    }
  };

  // Run this on initial render to check user status
  React.useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

