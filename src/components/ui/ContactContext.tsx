"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import ContactModal from "./ContactModal";

interface ContactContextType {
  show: () => void;
  close: () => void;
  isOpen: boolean;
}

const ContactContext = createContext<ContactContextType | undefined>(
  undefined
);

export function ContactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const show = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ContactContext.Provider value={{ show, close, isOpen }}>
      {children}
      <ContactModal />
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error(
      "useContact must be used within a ContactProvider"
    );
  }
  return context;
}
