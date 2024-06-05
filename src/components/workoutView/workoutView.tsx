"use client";

import MyCalendar from "@/components/calendar/calendar";
import AddExerciseModal from "@/components/workoutView/workoutSidebar/addExerciseModal";
import MyCustomButton from "@/components/elements/myCutomButton";
import WorkoutDetails from "@/components/workoutView/workoutDetails";
import React, { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useAtom } from "jotai";
import { modalAtom } from "@/jotai/atoms";

type WorkoutViewProps = {
  dates: Date[];
};

export default function WorkoutView({ dates }: WorkoutViewProps) {
  const [pickedDate, setPickedDate] = useState<Date>();
  const [modal, setModal] = useAtom(modalAtom);

  useEffect(() => {
    if (pickedDate === null || pickedDate === undefined)
      setPickedDate(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDatePick = (date: Date) => {
    console.log(`N: ${date.toLocaleDateString()}`);
    console.log(`O: ${pickedDate?.toLocaleDateString()}`);
    if (date.toLocaleDateString() === pickedDate?.toLocaleDateString()) {
      console.log("The same!");
      return;
    }
    setPickedDate(date);
  };

  const handleAddInstance = () => {
    console.log("Opening modal for adding/modifying instances");
    setModal({ isOpen: !modal.isOpen });
  };

  if (dates === null || dates === undefined)
    dates = [new Date("2024-06-05"), new Date("2024-06-08")];

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
            <WorkoutDetails date={pickedDate} />
            <MyCustomButton handleClick={handleAddInstance} />
          </LayoutGroup>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
