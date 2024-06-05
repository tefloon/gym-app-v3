"use client";

import MyCalendar from "@/components/calendar/calendar";
import AddExerciseModal from "@/components/workoutView/workoutSidebar/addExerciseModal";
import MyCustomButton from "@/components/elements/myCutomButton";
import WorkoutDetails from "@/components/workoutView/workoutDetails";
import React, { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useAtom } from "jotai";
import { modalAtom, workoutWithDetailsAtom } from "@/jotai/atoms";
import { handleReturnWorkoutByDate } from "@/actions/gymDataActions";
import { WorkoutWithDetails } from "@/lib/prismaTypes";

type WorkoutViewProps = {
  dates: Date[];
};

export default function WorkoutView({ dates }: WorkoutViewProps) {
  const [pickedDate, setPickedDate] = useState<Date>();
  const [isModalOpen, setIsModalOpen] = useAtom(modalAtom);
  const [error, setError] = useState<string | null>(null);
  const [workout, setWorkout] = useAtom(workoutWithDetailsAtom);

  const fetchWorkout = async (date: Date) => {
    console.log("Fetching the workout");

    // [ ]: We can get rid of the unnecessary DB query by checking
    // if the date is in dates (of workouts we get earlier to mark entries on the calendar)
    try {
      const response = await handleReturnWorkoutByDate(date);
      if (response instanceof Error) {
        setError(response.message);
        return;
      }
      if (!response) {
        console.log(`No workout for date: ${date.toLocaleString()}`);
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
    if (!pickedDate) {
      setPickedDate(new Date());
      fetchWorkout(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // [ ]: Get the workout from DB here
  const handleDatePick = async (date: Date) => {
    // console.log(`N: ${date.toLocaleDateString()}`);
    // console.log(`O: ${pickedDate?.toLocaleDateString()}`);
    if (date.toLocaleDateString() === pickedDate?.toLocaleDateString()) {
      console.log("The same!");
      return;
    }
    fetchWorkout(date);
    setPickedDate(date);
  };

  const handleAddInstance = () => {
    console.log("Opening modal for adding/modifying instances");
    setIsModalOpen(!isModalOpen);
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
            <WorkoutDetails date={pickedDate ? pickedDate : new Date()} />
            <MyCustomButton handleClick={handleAddInstance} />
          </LayoutGroup>
        </AnimatePresence>
        <AddExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode="add"
        />
      </motion.div>
    </motion.div>
  );
}
