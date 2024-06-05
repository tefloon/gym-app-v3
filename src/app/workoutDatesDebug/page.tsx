"use client";

import { Workout as PrismaWorkout } from "@prisma/client";
import { handleReturnWorkouts } from "@/actions/gymDataActions";
import React, { useState } from "react";

export default function WorkoutDatesDebug() {
  const [workouts, setWorkouts] = useState<PrismaWorkout[]>();

  const handleClick = async () => {
    const wk = await handleReturnWorkouts();
    setWorkouts(wk);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div>
        <div className="">
          <button
            id="create-instance"
            onClick={handleClick}
            className="px-6 py-2 rounded border bg-slate-700 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-slate-100 hover:border-slate-100"
          >
            Get Workouts!
          </button>
        </div>
      </div>

      {workouts ? (
        <ul>
          {workouts.map((workout, id) => (
            <li
              key={id}
              className="flex flex-row min-w-96 justify-between items-center"
            >
              <span className="text-slate-200 pr-4">
                {workout.date.toUTCString()}
              </span>
              <span className="text-slate-400 text-[10px]">({workout.id})</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>Nothing to show here...</div>
      )}
    </div>
  );
}
