import { motion } from "framer-motion";
import React from "react";

type AddExerciseModal = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddExerciseModal({
  isOpen,
  onClose,
}: AddExerciseModal) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full min-w-[500px] bg-white/30 shadow-lg z-50 rounded"
    >
      <div className="p-4">
        <button onClick={onClose} className="text-red-500">
          Close
        </button>
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p>This is a slide-in modal.</p>
      </div>
    </motion.div>
  );
}
