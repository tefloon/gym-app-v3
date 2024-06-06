"use client";

import { handleAddSetToExerciseInstance } from "@/actions/gymDataActions";
import NumberInput from "@/components/elements/numberInput";
import { instanceWithDetailsAtom, modalModeAtom } from "@/jotai/atoms";
import { createId } from "@paralleldrive/cuid2";
import { useAtom } from "jotai";
import React, { useState } from "react";

export default function AddExerciseForm() {
  const [modalMode, setModalMode] = useAtom(modalModeAtom);
  const [instance, setInstance] = useAtom(instanceWithDetailsAtom);

  const [values, setValues] = useState([0, 0]);

  const handleWeightChanged = (newValue: number) => {
    console.log(`New weight: ${newValue}`);
    setValues((prev) => [newValue, prev[1]]);
  };

  const handleRepsChanged = (newValue: number) => {
    console.log(`New reps: ${newValue}`);
    setValues((prev) => [prev[0], newValue]);
  };

  // When clicking ADD we:
  // - create a new Set
  // - send it to a server action to append the instance

  const handleClickConfirm = () => {
    if (modalMode === "update" && instance) {
      const newSet = {
        id: createId(),
        order: 3, // Assuming this is the 3rd set
        wasCompleted: false,
        load: ` ${values[0]}x${values[1]} `,
      };

      handleAddSetToExerciseInstance(instance.id, newSet);
    }
  };

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
        <NumberInput
          initialValue={0}
          quantityName={"reps"}
          quantityUnit={""}
          quantityPrecision={0}
          quantityJump={1}
          onValueChange={handleRepsChanged}
        />

        <div className="flex flex-row gap-2">
          <button
            className="flex-1 bg-green-700 py-1 rounded-sm font-bold"
            onClick={handleClickConfirm}
          >
            {modalMode === "update" ? "SAVE" : "ADD"}
          </button>

          <button className="flex-1 bg-blue-700 py-1 rounded-sm font-bold">
            CANCEL
          </button>
        </div>
      </div>
    </section>
  );
}
