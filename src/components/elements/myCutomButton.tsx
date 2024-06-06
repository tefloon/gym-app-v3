import React from "react";

type MyButtonProps = {
  handleClick: () => void;
  className?: string;
};

export default function MyCustomButton({
  handleClick,
  className,
}: MyButtonProps) {
  return (
    <div className={`w-full flex ${className}`}>
      <button
        className={`p-4 bg-green-700 text-slate-100 font-bold grow rounded border-2 border-green-700 hover:border-slate-100 select-none`}
        onClick={handleClick}
      >
        Add Exercise
      </button>
    </div>
  );
}
