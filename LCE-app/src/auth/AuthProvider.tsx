import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  admin_id?: string;
  founder_id?: string;
  email?: string;
  role?: string;
  userId?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStartup: boolean;
  email: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isStartup, setIsStartup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      updateAuthState(token);
    }
  }, []);

  const updateAuthState = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setIsAuthenticated(true);
      setIsAdmin(decoded.role === "admin");
      setIsStartup(decoded.role === "founder");
      setEmail(decoded.email || "");
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    updateAuthState(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsStartup(false);
    setEmail("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, isStartup, email, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
