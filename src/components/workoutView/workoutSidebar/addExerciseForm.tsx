"use client";

import React, { useState } from "react";
import { ExerciseType as PrismaExerciseType } from "@prisma/client";

export default function AddExerciseForm() {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  return (
    <section className="w-96 flex flex-col items-center">
      {/* {chosenType.name} */}
      <form action="">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 w-80">
            <div className="text-xs border-b font-bold pb-1 border-blue-400">
              WEIGHT (kgs)
            </div>
            <div className="flex flex-row self-center">
              <span className="flex flex-row items-center gap-5">
                <button
                  // onClick={decrementWeight}
                  className="w-8 h-8 bg-gray-500 text-xl"
                >
                  -
                </button>
                <input
                  className="bg-transparent border-b text-center text-xl w-24"
                  type="number"
                  name="weight"
                  value={(Math.round(weight * 100) / 100).toFixed(2)}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
                <button
                  // onClick={incrementWeight}
                  className="w-8 h-8 bg-gray-500 text-xl"
                >
                  +
                </button>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-80">
            <div className="text-xs border-b font-bold pb-1 border-blue-400">
              REPS
            </div>
            <div className="flex flex-row self-center">
              <span className="flex flex-row items-center gap-5">
                <button
                  // onClick={decrementReps}
                  className="w-8 h-8 bg-gray-500 text-xl"
                >
                  -
                </button>
                <input
                  className="bg-transparent border-b text-center text-xl w-24"
                  type="number"
                  name="reps"
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                />
                <input type="hidden" name="sessionId" />
                <button
                  // onClick={incrementReps}
                  className="w-8 h-8 bg-gray-500 text-xl"
                >
                  +
                </button>
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <button
              formAction={async (formData) => {
                // await handleAddSet(formData);
              }}
              className="flex-1 bg-green-700 py-1 rounded-sm font-bold"
            >
              SAVE
            </button>

            <button
              // onClick={resetForm}
              className="flex-1 bg-blue-700 py-1 rounded-sm font-bold"
            >
              CLEAR
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
