"use client";

import MyCalendar from "@/components/calendar/calendar";
import MyDatePicker from "@/components/createData/datePicker";
import AddExerciseModal from "@/components/workoutView/addExerciseModal";
import MyCustomButton from "@/components/elements/myCutomButton";
import WorkoutDetails from "@/components/workoutView/workoutDetails";
import React, { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export default function WorkoutView() {
  const [date, setDate] = useState<Date>();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDatePick = (date: Date) => {
    setDate(date);
  };

  const handleAddInstance = () => {
    console.log("Pening modal for adding instances");
    setModalOpen((prev) => !prev);
  };

  const dates = [new Date("2024-06-05")];

  return (
    <motion.div
      className="flex relative flex-row justify-around max-w-[600px] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <MyCalendar
        dates={dates}
        handleSelectedDateChange={handleDatePick}
        className="absolute -left-[350px] max-w-[300px]"
      />
      <motion.div
        className="flex flex-col items-center gap-6 px-6 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence presenceAffectsLayout>
          <LayoutGroup>
            <WorkoutDetails date={date} />
            <MyCustomButton handleClick={handleAddInstance} />
            <AddExerciseModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            />
          </LayoutGroup>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
