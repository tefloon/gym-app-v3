"use client";

import { useEffect, useRef, useTransition } from "react";
import { handleCreateCategory } from "@/actions/gymDataActions";

export default function AddCategoryForm() {
  const [pending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // e.preventDefault();
      handleAddCategory();
    }
  };

  const handleAddCategory = () => {
    startTransition(async () => {
      try {
        if (inputRef.current) {
          const res = await handleCreateCategory(inputRef.current.value);
          if (res.status !== 200) {
            console.log(res.message);
          }

          inputRef.current.value = "";
          inputRef.current.focus();
        }
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <div className="flex flex-row justify-center align-middle p-2 bg-orange-500 rounded transition-all">
      <input
        onSubmit={() => handleAddCategory()}
        type="text"
        name="catName"
        disabled={pending}
        className="rounded text-neutral-900 p-2 bg-slate-300"
        ref={inputRef}
        autoFocus
        key="input1"
        autoComplete="off"
        onKeyUp={(e) => handleKeyPress(e)}
      />
      <button
        disabled={pending}
        onClick={() => handleAddCategory()}
        className="m-2 p-2 bg-neutral-800 text-stone-300 disabled:text-stone-700 rounded"
      >
        Dodaj
      </button>
    </div>
  );
}
