"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Location } from "@/types";
import { resolveWhatsApp } from "@/lib/branch-utils";
import { fetchLocations, fetchSettings } from "@/lib/sheets";
import type { Settings } from "@/types";

interface BranchContextValue {
  selectedBranch: Location | null;
  setSelectedBranch: (branch: Location | null) => void;
  branches: Location[];
  resolveBranchWhatsApp: (fallback?: string) => string;
  isLoading: boolean;
}

const BranchContext = createContext<BranchContextValue | null>(null);

const STORAGE_KEY = "multibranch_selected";

export function BranchProvider({ children }: { children: ReactNode }) {
  const [selectedBranch, setSelectedBranchState] = useState<Location | null>(
    null
  );
  const [branches, setBranches] = useState<Location[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchLocations(), fetchSettings()])
      .then(([locs, s]) => {
        setBranches(locs);
        setSettings(s);
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const match = locs.find((l) => l.slug === stored);
          if (match) setSelectedBranchState(match);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const setSelectedBranch = useCallback((branch: Location | null) => {
    setSelectedBranchState(branch);
    if (branch) {
      localStorage.setItem(STORAGE_KEY, branch.slug);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const resolveBranchWhatsApp = useCallback(
    (fallback?: string): string => {
      return resolveWhatsApp(
        selectedBranch,
        fallback ?? settings?.ownerWhatsApp ?? ""
      );
    },
    [selectedBranch, settings]
  );

  return (
    <BranchContext.Provider
      value={{
        selectedBranch,
        setSelectedBranch,
        branches,
        resolveBranchWhatsApp,
        isLoading,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranchContext(): BranchContextValue {
  const ctx = useContext(BranchContext);
  if (!ctx) {
    throw new Error("useBranchContext must be used within <BranchProvider>");
  }
  return ctx;
}
