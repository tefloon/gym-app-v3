import { motion } from "framer-motion";
import React from "react";
import AddExercise from "./addExercise";

type AddExerciseModal = {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "update"
};

export default function AddExerciseModal({
  isOpen,
  onClose,
  mode
}: AddExerciseModal) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full min-w-[500px] bg-slate-800/75 shadow-lg z-50 rounded-l-lg"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-center">{mode === "add" ? "Add Exercise" : "Update Exercise"}</h2>
        <AddExercise />
      </div>
    </motion.div>
  );
}
