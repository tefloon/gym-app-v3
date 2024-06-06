"use client";

import NumberInput from "@/components/elements/numberInput";
import React, { useState } from "react";

export default function AddExerciseForm() {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const decrementReps = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReps((preReps) => preReps - 1);
  };

  const incrementReps = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReps((preReps) => preReps + 1);
  };

  const handleWeightChanged = (newValue: number) => {
    console.log(newValue);
  };

  // const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setReps(0);
  //   setWeight(0);
  // };

  // const deleteSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (row.isSelected) {
  //     handleDeleteSet(row.selectedRow);
  //     setRow({ isSelected: false, selectedRow: "" });
  //   }
  // };

  // const addSet = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.log("Adding a Set");
  // };

  return (
    <section className="w-96 flex flex-col items-center">
      <div className="flex flex-col gap-5">
        <NumberInput
          initialValue={0}
          quantityName={"weight"}
          quantityUnit={"kg"}
          quantityPrecision={2}
          quantityJump={2.5}
          onValueChange={handleWeightChanged}
        />
        <div className="flex flex-col gap-3 w-80">
          <div className="text-xs border-b font-bold pb-1 border-blue-400">
            REPS
          </div>
          <div className="flex flex-row self-center">
            <span className="flex flex-row items-center gap-5">
              <button
                onClick={decrementReps}
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
                onClick={incrementReps}
                className="w-8 h-8 bg-gray-500 text-xl"
              >
                +
              </button>
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <button
            // formAction={async (formData) => {
            //   // await handleAddSet(formData);
            // }}
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
    </section>
  );
}
