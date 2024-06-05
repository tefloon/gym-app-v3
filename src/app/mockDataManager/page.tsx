import CreateEverythingForm from "@/components/createData/createEverythingForm";
import MyDatePicker from "@/components/createData/datePicker";
import React from "react";

export default function MockDataManager() {
  return (
    <>
      <h2>Create Mock Data</h2>
      <div className="flex flex-col gap-6">
        {/* <MyDatePicker /> */}
        <CreateEverythingForm />
      </div>
    </>
  );
}
