"use client";

import React, { useEffect, useState, useTransition } from "react";
import MyDropdown from "../../elements/myDropdown";
import AddExerciseForm from "./addExerciseForm";
import InstanceDetails from "../instanceDetails";
import { ExerciseType as PrismaExerciseType } from "@prisma/client";
import { handleReturnExerciseTypes } from "@/actions/gymDataActions";
import { Option } from "@/lib/types";
import { useAtom } from "jotai";
import { instanceWithDetailsAtom, modalModeAtom } from "@/jotai/atoms";

export default function AddExercise() {
  // Query all the exercise types - maybe before the main page loads? 🗹
  // Populate the dropdown with them 🗹
  // Chose what kind of exercise - dropdown
  // Show the appropriate set adding menu
  // Save and cancel buttons

  const [isLoading, startLoading] = useTransition();
  const [options, setOptions] = useState<Option[] | null>(null);
  const [chosenType, setChosenType] = useState<PrismaExerciseType | null>(null);
  const [types, setTypes] = useState<PrismaExerciseType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [instance, setInstance] = useAtom(instanceWithDetailsAtom);
  const [modalMode, setModalMode] = useAtom(modalModeAtom);

  useEffect(() => {
    startLoading(async () => {
      console.log("Fetching the options");
      try {
        const response = await handleReturnExerciseTypes();
        if (response instanceof Error) {
          setError(response.message);
          return;
        }
        setTypes(response as PrismaExerciseType[]);
        console.log("Set types successfully");
      } catch (e) {
        console.error(e);
        setError("An unexpected error occurred");
      }
    });
  }, []);

  useEffect(() => {
    if (types === null) return;
    const tempOptions: Option[] = [];
    for (let i = 0; i < types.length; i++) {
      const o = { id: types[i].id, name: types[i].name };
      tempOptions.push(o);
    }
    setOptions(tempOptions);
  }, [types]);

  const handleChooseOption = (id: string) => {
    if (!types) return;

    console.log(`Chosen id: ${id}`);
    const matchingType = types.find((type) => type.id === id);

    // [ ]: Use toasts for errors instead
    if (!matchingType) {
      setError(`No exercise type with id ${id} found!`);
      return;
    }

    setChosenType(matchingType);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (modalMode === "update" && instance) {
    return (
      <div className="flex flex-col gap-10 items-center">
        <AddExerciseForm />
        <InstanceDetails {...instance} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 items-center">
      {options && (
        <MyDropdown handleChooseOption={handleChooseOption} options={options} />
      )}
      {chosenType && <AddExerciseForm />}
    </div>
  );
}
