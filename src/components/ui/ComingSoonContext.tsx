"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import ComingSoonModal from "./ComingSoonModal";

interface ComingSoonContextType {
  show: (targetPath?: string) => void;
  close: () => void;
  isOpen: boolean;
  targetPath: string | undefined;
}

const ComingSoonContext = createContext<ComingSoonContextType | undefined>(
  undefined
);

export function ComingSoonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetPath, setTargetPath] = useState<string | undefined>(undefined);

  const show = useCallback((path?: string) => {
    setTargetPath(path);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Clear target path after animation
    setTimeout(() => setTargetPath(undefined), 300);
  }, []);

  return (
    <ComingSoonContext.Provider value={{ show, close, isOpen, targetPath }}>
      {children}
      <ComingSoonModal />
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const context = useContext(ComingSoonContext);
  if (context === undefined) {
    throw new Error(
      "useComingSoon must be used within a ComingSoonProvider"
    );
  }
  return context;
}









