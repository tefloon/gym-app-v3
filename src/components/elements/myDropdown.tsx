"use client";

import React from "react";
import { Option } from "@/lib/types";

type MyDropdownProps = {
  options: Option[];
  handleChooseOption: (id: string) => void;
};

export default function MyDropdown({
  options,
  handleChooseOption,
}: MyDropdownProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(`Different option selected: ${event.target.value}`);
    handleChooseOption(event.target.value);
  };

  // const dropdownClasses = ``

  return (
    <div className="flex flex-col items-center max-w-[300px] w-full">
      <select
        id="category-select"
        onChange={handleChange}
        className="p-2 rounded bg-slate-900 text-slate-200 text-center w-full"
      >
        {/* <option value="">--Please choose an option--</option> */}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
