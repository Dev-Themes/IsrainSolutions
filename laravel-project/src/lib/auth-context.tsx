"use client";

import * as React from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PRO" | "ADMIN";
  companyName?: string;
  avatar?: string;
  rating?: number;
  verified?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, role?: "CUSTOMER" | "PRO", name?: string) => void;
  loginAsDemo: (role: "CUSTOMER" | "PRO") => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const DEMO_HOMEOWNER: AuthUser = {
  id: "user_homeowner_1",
  name: "Sarah Jenkins",
  email: "sarah.jenkins@example.com",
  role: "CUSTOMER",
  avatar: "SJ",
  verified: true,
};

const DEMO_CONTRACTOR: AuthUser = {
  id: "user_pro_1",
  name: "David Thornton",
  companyName: "Apex Heating & Emergency Plumbing Ltd",
  email: "david.thornton@apexheating.co.uk",
  role: "PRO",
  avatar: "AH",
  rating: 4.96,
  verified: true,
};

function getSessionSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("tc_auth_session");
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("tc_auth_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("tc_auth_change", callback);
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const sessionStr = React.useSyncExternalStore(
    subscribe,
    getSessionSnapshot,
    () => null
  );

  const user = React.useMemo<AuthUser | null>(() => {
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr);
    } catch {
      return null;
    }
  }, [sessionStr]);

  const login = (email: string, role: "CUSTOMER" | "PRO" = "CUSTOMER", name?: string) => {
    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: name || (email.split("@")[0].replace(/[._]/g, " ") || "User"),
      email,
      role,
      avatar: name ? name.substring(0, 2).toUpperCase() : email.substring(0, 2).toUpperCase(),
      companyName: role === "PRO" ? "Certified Trade Contractor" : undefined,
      verified: true,
    };
    try {
      localStorage.setItem("tc_auth_session", JSON.stringify(newUser));
      window.dispatchEvent(new Event("tc_auth_change"));
    } catch {
      // Ignore storage errors
    }
  };

  const loginAsDemo = (role: "CUSTOMER" | "PRO") => {
    const targetUser = role === "CUSTOMER" ? DEMO_HOMEOWNER : DEMO_CONTRACTOR;
    try {
      localStorage.setItem("tc_auth_session", JSON.stringify(targetUser));
      window.dispatchEvent(new Event("tc_auth_change"));
    } catch {
      // Ignore
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("tc_auth_session");
      window.dispatchEvent(new Event("tc_auth_change"));
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading: false, login, loginAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
