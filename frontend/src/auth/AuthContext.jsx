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

function isTokenUsable(token) {
  const payload = decodePayload(token);
  if (!payload) return false;
  if (!payload.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && isTokenUsable(saved) ? saved : null;
  });
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
      login: (newToken) => setToken(newToken && isTokenUsable(newToken) ? newToken : null),
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
