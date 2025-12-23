"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useComingSoon } from "./ComingSoonContext";

export default function ComingSoonModal() {
  const { isOpen, targetPath, close } = useComingSoon();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
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

              <div className="text-center">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-[SpaceGroteskBold] font-bold text-gray-900 mb-3">
                  Coming Soon
                </h2>

                <p className="text-gray-600 mb-2 font-[SpaceGroteskRegular]">
                  This page is still under development.
                </p>

                {targetPath && (
                  <p className="text-sm text-gray-500 font-[SpaceGroteskRegular]">
                    <span className="font-medium">Target:</span> {targetPath}
                  </p>
                )}

                <motion.button
                  onClick={close}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-3 bg-[#C44829] text-white rounded-full font-[SpaceGroteskMedium] font-medium hover:bg-[#B03E25] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C44829] focus:ring-offset-2"
                >
                  Understand
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}









