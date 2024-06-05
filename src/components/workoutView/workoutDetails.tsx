"use client";

import { handleReturnWorkoutByDate } from "@/actions/gymDataActions";
import { DateTime } from "luxon";
import React, { useEffect, useState, useTransition } from "react";
import { WorkoutWithDetails } from "@/lib/prismaTypes";
import InstanceDetails from "./instanceDetails";
import { motion } from "framer-motion";
import {
  modalAtom,
  selectedWorkoutAtom,
  workoutWithDetailsAtom,
} from "@/jotai/atoms";
import { useAtom } from "jotai";
import AddExerciseModal from "./workoutSidebar/addExerciseModal";

type WorkoutViewProps = {
  date: Date;
};

export default function WorkoutDetails({ date }: WorkoutViewProps) {
  const [isLoading, startLoading] = useTransition();
  const [workout, setWorkout] = useAtom(workoutWithDetailsAtom);
  const [error, setError] = useState<string | null>(null);
  // const [selectedWorkout, setSelectedWorkout] = useAtom(selectedWorkoutAtom);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      className="flex flex-col items-center w-full pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-3xl pb-8">
        {DateTime.fromJSDate(date)
          .setLocale("pl")
          .toLocaleString(DateTime.DATE_FULL)}
      </div>
      {workout ? (
        <>
          {workout.exerciseInstances.map((instance, id) => (
            <InstanceDetails key={instance.id} {...instance} />
          ))}
        </>
      ) : (
        <div>No workout found for the selected date.</div>
      )}
      <div className="text-slate-600 text-xs pt-2">{workout?.id}</div>
    </motion.div>
  );
}
