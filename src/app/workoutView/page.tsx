import { handleReturnWorkoutDates } from "@/actions/gymDataActions";
import WorkoutView from "@/components/workoutView/workoutView";
import React from "react";

export default async function WorkoutPage() {
  const dates = await handleReturnWorkoutDates();

  return (
    <div className="flex relative flex-col items-center bg-geen-500 w-full">
      <WorkoutView dates={dates} />
    </div>
  );
}
