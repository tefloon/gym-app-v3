import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import AddExercise from "./addExercise";
import { useAtom } from "jotai";
import {
  modalOpenAtom,
  modalModeAtom,
  instanceWithDetailsAtom,
} from "@/jotai/atoms";

export default function AddExerciseModal() {
  const [isModalOpen, setIsModalOpen] = useAtom(modalOpenAtom);
  const [modalMode, setModalMode] = useAtom(modalModeAtom);
  const [selectedInstance] = useAtom(instanceWithDetailsAtom);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest(".dont-close")) return;
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(target)
      ) {
        setIsModalOpen(false);
        setModalMode("add");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen && event.key === "Escape") {
        setIsModalOpen(false);
        setModalMode("add");
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, setIsModalOpen, setModalMode]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isModalOpen ? "0%" : "100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full min-w-[500px] bg-slate-800/75 shadow-lg z-50 rounded-l-lg"
      ref={modalRef}
    >
      {/* [ ]: Add canimation to hide the switch from "add" to "update". Framer-motion variants. */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-center">
          {modalMode === "add"
            ? "Add Exercise"
            : `${selectedInstance?.exerciseType.name}`}
        </h2>
        <AddExercise />
      </div>
    </motion.div>
  );
}
