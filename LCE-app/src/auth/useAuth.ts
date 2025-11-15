import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  admin_id?: string;
  founder_id?: string;
  email?: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isStartup, setIsStartup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const updateAuthState = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setIsAuthenticated(true);
      setIsAdmin(!!decoded.admin_id);
      setIsStartup(!!decoded.founder_id);
      setEmail(decoded.email || "");
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      updateAuthState(token);
    }
  }, []);

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

  return { isAuthenticated, isAdmin, isStartup, email, login, logout };
}
