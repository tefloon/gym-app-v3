"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

import "react-datepicker/dist/react-datepicker.css";

type MyDatePickerProps = {
  handleDatePick: (date: Date) => void;
};

export default function MyDatePicker({ handleDatePick }: MyDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date === null) return;
    setSelectedDate(date);
    handleDatePick(date);
  };

  const formatDate = (date: Date | null): string => {
    return date ? DateTime.fromJSDate(date).toFormat("dd/MM/yyyy") : "None";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4 items-center">
        <label htmlFor="date-picker">Select a date:</label>
        <DatePicker
          className="text-neutral-800 rounded p-2"
          id="date-picker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div>
        <p>Selected Date: {formatDate(selectedDate)}</p>
      </div>
    </div>
  );
}
