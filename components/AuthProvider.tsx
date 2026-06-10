"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

type User = { navn: string; skole: string } | null;

type AuthContextType = {
  user: User;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    setUser(res.ok ? await res.json() : null);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
