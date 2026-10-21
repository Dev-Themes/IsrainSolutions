"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, DossierItem } from "@/types/product";

interface DossierContextType {
  items: DossierItem[];
  addToDossier: (product: Product, quantity?: string, vehicle?: string) => void;
  removeFromDossier: (productId: string) => void;
  updateQuantity: (productId: string, quantity: string) => void;
  clearDossier: () => void;
  isDossierOpen: boolean;
  setIsDossierOpen: (open: boolean) => void;
  hasItem: (productId: string) => boolean;
  totalItems: number;
}

const DossierContext = createContext<DossierContextType | undefined>(undefined);

export function DossierProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<DossierItem[]>([]);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("peptide_inquiry_dossier");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Could not parse saved dossier:", e);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("peptide_inquiry_dossier", JSON.stringify(items));
    } catch (e) {
      console.error("Could not save dossier:", e);
    }
  }, [items]);

  const addToDossier = (product: Product, quantity = "50g (Sample Batch)", vehicle = "Aqueous Serum Base") => {
    setItems((prev) => {
      const exists = prev.find((i) => i.product.id === product.id);
      if (exists) return prev;
      return [...prev, { product, requestedQuantity: quantity, targetVehicle: vehicle }];
    });
    setIsDossierOpen(true);
  };

  const removeFromDossier = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: string) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, requestedQuantity: quantity } : i))
    );
  };

  const clearDossier = () => {
    setItems([]);
  };

  const hasItem = (productId: string) => {
    return items.some((i) => i.product.id === productId);
  };

  return (
    <DossierContext.Provider
      value={{
        items,
        addToDossier,
        removeFromDossier,
        updateQuantity,
        clearDossier,
        isDossierOpen,
        setIsDossierOpen,
        hasItem,
        totalItems: items.length,
      }}
    >
      {children}
    </DossierContext.Provider>
  );
}

export function useDossier() {
  const context = useContext(DossierContext);
  if (!context) {
    throw new Error("useDossier must be used within a DossierProvider");
  }
  return context;
}
