"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useContact } from "./ContactContext";
import ContactForm from "./ContactForm";

export default function ContactModal() {
  const { isOpen, close } = useContact();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 pointer-events-auto my-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 z-10"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto mb-4 bg-[#C44829] rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-[SpaceGroteskBold] font-bold text-gray-900 mb-2">
                  Get In Touch
                </h2>

                <p className="text-gray-600 font-[SpaceGroteskRegular]">
                  Fill out the form below and I&apos;ll get back to you soon.
                </p>
              </div>

              {/* Contact Form */}
              <ContactForm onSuccess={close} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
