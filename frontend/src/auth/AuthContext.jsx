/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "jobtracker_token";

function decodePayload(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));
  const user = useMemo(() => (token ? decodePayload(token) : null), [token]);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    localStorage.setItem(STORAGE_KEY, token);
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === "admin",
      login: (newToken) => setToken(newToken),
      logout: () => setToken(null),
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
