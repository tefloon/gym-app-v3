"use client";

import MyDatePicker from "@/components/createData/datePicker";
import AddExerciseModal from "@/components/workoutView/addExerciseModal";
import MyCustomButton from "@/components/workoutView/addInstance";
import WorkoutDetails from "@/components/workoutView/workoutDetails";
import React, { useState } from "react";

export default function WorkoutView() {
  const [date, setDate] = useState<Date>();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDatePick = (date: Date) => {
    setDate(date);
  };

  const handleAddInstance = () => {
    console.log("Adding instance");
    setModalOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <MyDatePicker handleDatePick={handleDatePick} />
      <WorkoutDetails date={date} />
      <MyCustomButton handleClick={handleAddInstance} />
      <AddExerciseModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
