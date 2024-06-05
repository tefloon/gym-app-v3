import React, { RefObject, useRef } from "react";

type CategoryFormProps = {
  inputRef: RefObject<HTMLInputElement>;
  handleAddCategory: () => void;
  pending: boolean;
};

export default function CategoryForm({
  inputRef,
  handleAddCategory,
  pending,
}: CategoryFormProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddCategory();
    }
  };

  return (
    <div className="flex flex-row justify-center align-middle p-2 bg-orange-500 rounded transition-all gap-2">
      <input
        onSubmit={() => handleAddCategory()}
        type="text"
        name="catName"
        disabled={pending}
        className="rounded text-neutral-900 p-2 bg-slate-300 grow"
        ref={inputRef}
        autoFocus
        key="input1"
        autoComplete="off"
        onKeyUp={(e) => handleKeyPress(e)}
      />
      <button
        disabled={pending}
        onClick={() => handleAddCategory()}
        className="bg-neutral-800 text-stone-300 disabled:text-stone-700 rounded grow min-w-16"
      >
        Add
      </button>
    </div>
  );
}
