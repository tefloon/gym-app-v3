import { isAscii } from "buffer";
import React from "react";

type MyButtonProps = {
  handleClick: () => void;
  className?: string;
  isActive?: boolean;
};

export default function MyCustomButton({
  handleClick,
  className,
  isActive = true,
}: MyButtonProps) {
  return (
    <div className={`w-full flex ${className}`}>
      <button
        disabled={!isActive}
        className={`p-4 bg-green-700 text-slate-100 font-bold grow rounded border-2 border-green-700 hover:border-slate-100 select-none disabled:bg-neutral-800 disabled:border-neutral-800 disabled:text-slate-600`}
        onClick={handleClick}
      >
        Add Exercise
      </button>
    </div>
  );
}
