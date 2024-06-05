"use client";

import MyDatePicker from "@/components/createData/datePicker";
import WorkoutDetails from "@/components/workoutView/workoutDetailsProvider";
import React, { useState } from "react";

export default function WorkoutView() {
  const [date, setDate] = useState<Date>();

  const handleDatePick = (date: Date) => {
    setDate(date);
  };

  return (
    <div>
      <MyDatePicker handleDatePick={handleDatePick} />
      <WorkoutDetails date={date} />
    </div>
  );
}
