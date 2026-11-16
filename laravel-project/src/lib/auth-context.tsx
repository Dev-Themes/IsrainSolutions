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
  phone?: string;
  address?: string;
  city?: string;
  password?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (
    email: string,
    role?: "CUSTOMER" | "PRO",
    name?: string,
    password?: string,
    extra?: Partial<AuthUser>
  ) => void;
  loginAsDemo: (role: "CUSTOMER" | "PRO") => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  verifyPassword: (inputPassword: string) => boolean;
  deleteAccount: (password: string) => { success: boolean; error?: string };
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const DEMO_HOMEOWNER: AuthUser = {
  id: "user_homeowner_1",
  name: "Sarah Jenkins",
  email: "sarah.jenkins@example.com",
  role: "CUSTOMER",
  avatar: "SJ",
  phone: "+44 20 7946 0812",
  address: "14 Cranbury Road, Fulham, London SW6 2PY",
  city: "London",
  password: "password123",
};

const DEMO_CONTRACTOR: AuthUser = {
  id: "user_pro_1",
  name: "David Thornton",
  companyName: "Apex Heating & Emergency Plumbing Ltd",
  email: "david.thornton@apexheating.co.uk",
  role: "PRO",
  avatar: "AH",
  rating: 4.96,
  phone: "+44 20 7946 0812",
  address: "12 Munster Road, Fulham, London SW6 4EN",
  city: "London",
  password: "password123",
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

  const login = (
    email: string,
    role: "CUSTOMER" | "PRO" = "CUSTOMER",
    name?: string,
    password?: string,
    extra?: Partial<AuthUser>
  ) => {
    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: name || (email.split("@")[0].replace(/[._]/g, " ") || "User"),
      email,
      role,
      avatar: name ? name.substring(0, 2).toUpperCase() : email.substring(0, 2).toUpperCase(),
      companyName: role === "PRO" ? "Certified Trade Contractor" : undefined,
      password: password || "password123",
      phone: extra?.phone || (role === "PRO" ? "+44 20 7946 0812" : "+44 20 7946 0812"),
      address: extra?.address || (role === "PRO" ? "12 Munster Road, Fulham, London SW6 4EN" : "14 Cranbury Road, Fulham, London SW6 2PY"),
      city: extra?.city || "London",
      ...extra,
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

  const updateUser = (updates: Partial<AuthUser>) => {
    if (!user) return;
    const updated: AuthUser = { ...user, ...updates };
    try {
      localStorage.setItem("tc_auth_session", JSON.stringify(updated));
      window.dispatchEvent(new Event("tc_auth_change"));
    } catch {
      // Ignore
    }
  };

  const verifyPassword = (inputPassword: string): boolean => {
    if (!inputPassword) return false;
    const trimmed = inputPassword.trim();
    const stored = user?.password?.trim() || "password123";
    // Allow matching stored password or standard demo defaults
    return (
      trimmed === stored ||
      trimmed === "password123" ||
      trimmed === "demo123" ||
      trimmed === "••••••••"
    );
  };

  const logout = () => {
    try {
      localStorage.removeItem("tc_auth_session");
      window.dispatchEvent(new Event("tc_auth_change"));
    } catch {
      // Ignore
    }
  };

  const deleteAccount = (inputPassword: string): { success: boolean; error?: string } => {
    if (!verifyPassword(inputPassword)) {
      return { success: false, error: "Incorrect password. Account deletion cannot be authenticated." };
    }
    logout();
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: false,
        login,
        loginAsDemo,
        logout,
        updateUser,
        verifyPassword,
        deleteAccount,
      }}
    >
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
