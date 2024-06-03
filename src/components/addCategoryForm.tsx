"use client";

import { useRef, useTransition } from "react";
import { handleCreateCategory } from "@/actions/gymDataActions";

export default function AddCategoryForm() {
  const [pending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddCategory = () => {
    startTransition(async () => {
      try {
        if (inputRef.current) {
          const res = await handleCreateCategory(inputRef.current.value);
          if (res) console.log(res);
        }
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <div className="flex flex-row justify-center align-middle p-2 bg-orange-500 rounded">
      <input
        type="text"
        name="catName"
        className="rounded text-neutral-700 p-2"
        ref={inputRef}
      />
      <button
        disabled={pending}
        onClick={() => handleAddCategory()}
        className="m-2 p-2 bg-neutral-800 text-stone-300 rounded"
      >
        Dodaj
      </button>
    </div>
  );
}
