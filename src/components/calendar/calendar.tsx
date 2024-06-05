"use client";

import { useState } from "react";
import Calendar from "react-calendar";

import "./myBasicCalendarStyle.css";
import "./markedDateStyle.css";
// import { formatDate } from "@/lib/utilFunctions";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { modalAtom } from "@/jotai/atoms";

// import { useAtom } from "jotai";
// import { workoutAtom } from "@/features/jotaiAtoms";
// import { handleReturnWorkoutBasicsByDate } from "@/actions/gymDataAction";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type MyCalendarProps = {
  dates: Date[];
  handleSelectedDateChange: (date: Date) => void;
  className?: string;
};

export default function MyCalendar({
  dates,
  handleSelectedDateChange,
  className,
}: MyCalendarProps) {
  const [value, onChange] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [modalOpen, setIsModalOpen] = useAtom(modalAtom);

  const datesSet = new Set(
    dates.map((date) => date.toLocaleDateString("pl-PL"))
  );

  const handleClickAnywhere = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = async (
    v: Value,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!v) return; // no date selected

    if (Array.isArray(v)) {
      // value is [ValuePiece, ValuePiece]
      console.error("Received a date range, expected a single date.");
      return;
    }

    console.log(v.toISOString());
    let date = new Date(v);
    setSelectedDate(date.toLocaleDateString());
    handleSelectedDateChange(date);
  };

  return (
    <div className={` ${className}`} onClick={handleClickAnywhere}>
      <Calendar
        locale="pl"
        onChange={(v, e) => handleDateChange(v, e)}
        value={value}
        tileClassName={({ date, view }) => {
          const dateString = date.toLocaleDateString("pl-PL");
          if (datesSet.has(dateString)) {
            return "markedDate";
          }
          if (date.toLocaleDateString() === selectedDate) {
            console.log("mamy to!");
            return "selected";
          }
        }}
      />
    </div>
  );
}
