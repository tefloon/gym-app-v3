"use client";

import React, { useEffect, useState, useTransition } from "react";
import { ExerciseType as PrismaExerciseType } from "@prisma/client";
import MyDropdown from "../elements/myDropdown";
import { handleReturnExerciseTypes } from "@/actions/gymDataActions";
import { Option } from "@/lib/types";

export default function AddExercise() {
  // Query all the exercise types - maybe before the main page loads?
  // Populate the dropdown with them
  // Chose what kind of exercise - dropdown
  // Show the appropriate set adding menu
  // Save and cancel buttons

  const [isLoading, startLoading] = useTransition();
  const [types, setTypes] = useState<PrismaExerciseType[] | null>(null);
  const [options, setOptions] = useState<Option[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    console.log(`Chosen id: ${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {options && (
        <MyDropdown handleChooseOption={handleChooseOption} options={options} />
      )}
    </div>
  );
}
