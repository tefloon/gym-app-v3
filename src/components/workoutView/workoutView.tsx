"use client";

import MyCalendar from "@/components/calendar/calendar";
import AddExerciseModal from "@/components/workoutView/workoutSidebar/addExerciseModal";
import MyCustomButton from "@/components/elements/myCutomButton";
import WorkoutDetails from "@/components/workoutView/workoutDetails";
import React, { useEffect, useState, useTransition } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useAtom } from "jotai";
import {
  dateAtom,
  modalModeAtom,
  modalOpenAtom,
  workoutWithDetailsAtom,
} from "@/jotai/atoms";
import { handleReturnWorkoutByDate } from "@/actions/gymDataActions";
import { WorkoutWithDetails } from "@/lib/prismaTypes";

type WorkoutViewProps = {
  dates: Date[];
};

export default function WorkoutView({ dates }: WorkoutViewProps) {
  const [pickedDate, setPickedDate] = useAtom(dateAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(modalOpenAtom);
  const [, setError] = useState<string | null>(null);
  const [, setWorkout] = useAtom(workoutWithDetailsAtom);
  const [pending, startTransition] = useTransition();
  const [modalMode, setModalMode] = useAtom(modalModeAtom);

  const fetchWorkout = async (date: Date) => {
    // console.log("Fetching the workout");

    try {
      const response = await handleReturnWorkoutByDate(date);
      if (response instanceof Error) {
        setError(response.message);
        return;
      }
      if (!response) {
        // console.log(`No workout for date: ${date.toLocaleString()}`);
        setWorkout(null);
        return;
      }
      setWorkout(response as WorkoutWithDetails);
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred");
    }
  };

  useEffect(() => {
    startTransition(async () => {
      let date = pickedDate;
      if (!date) {
        date = new Date();
      }
      setPickedDate(date);
      await fetchWorkout(date);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // [x]: Get the workout from DB here
  const handleDatePick = (date: Date) => {
    if (date.toLocaleDateString() === pickedDate?.toLocaleDateString()) {
      // console.log("The same!");
      return;
    }
    fetchWorkout(date);
    setPickedDate(date);
  };

  const handleAddInstance = () => {
    // console.log("Opening modal for adding/modifying instances");
    setModalMode("add");
    setIsModalOpen(true);
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
            <WorkoutDetails />
            <MyCustomButton
              handleClick={handleAddInstance}
              className="dont-close"
            />
          </LayoutGroup>
        </AnimatePresence>
        <AddExerciseModal />
      </motion.div>
    </motion.div>
  );
}
