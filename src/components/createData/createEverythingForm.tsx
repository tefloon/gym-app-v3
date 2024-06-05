"use client";

import { handleCreateEverything } from "@/actions/gymDataActions";
import React from "react";

export default function CreateEverythingForm() {
  const handleGenerate = () => {
    handleCreateEverything();
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-4 items-center">
          <label htmlFor="create-instance">Generate mock data:</label>
          <button
            id="create-instance"
            onClick={handleGenerate}
            className="px-6 py-2 rounded border bg-slate-700 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-slate-100 hover:border-slate-100"
          >
            Generate!
          </button>
        </div>
      </div>
    </div>
  );
}
