"use client";

import { handleReturnWorkoutByDate } from "@/actions/gymDataActions";
import { DateTime } from "luxon";
import React, { useEffect, useState, useTransition } from "react";
import { WorkoutWithDetails } from "@/lib/prismaTypes";
import InstanceDetails from "./instanceDetails";
import { motion } from "framer-motion";

type WorkoutViewProps = {
  date?: Date;
};

export default function WorkoutDetails({ date }: WorkoutViewProps) {
  const [isLoading, startLoading] = useTransition();
  const [workout, setWorkout] = useState<WorkoutWithDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (date === null || date === undefined) return;
    startLoading(async () => {
      console.log("Fetching the workout");
      try {
        const response = await handleReturnWorkoutByDate(date);
        if (response instanceof Error) {
          setError(response.message);
          return;
        }
        setWorkout(response as WorkoutWithDetails);
      } catch (e) {
        console.error(e);
        setError("An unexpected error occurred");
      }
    });
  }, [date]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      className="flex flex-col items-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {workout ? (
        <>
          <div>
            {DateTime.fromJSDate(workout.date)
              .setLocale("pl")
              .toLocaleString(DateTime.DATE_FULL)}
          </div>
          {workout.exerciseInstances.map((instance, id) => (
            <InstanceDetails key={instance.id} {...instance} />
          ))}
        </>
      ) : (
        <div>No workout found for the selected date.</div>
      )}
    </motion.div>
  );
}
