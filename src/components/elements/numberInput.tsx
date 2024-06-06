import React, { useEffect, useRef, useState } from "react";

type NumberInputType = {
  quantityName: string;
  quantityUnit?: string;
  initialValue: number;
  quantityPrecision: number;
  quantityJump: number;
  onValueChange: (newValue: number) => void;
};

// IDEA: Add quantityPrecision and other such things to preferences saved in DB
// [ ]:  Add different types of input (time etc.)
export default function NumberInput({
  quantityName,
  quantityUnit,
  initialValue,
  quantityPrecision,
  quantityJump,
  onValueChange,
}: NumberInputType) {
  const [value, setValue] = useState(initialValue);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // When entereing editMode, focus the input and make it empty
    if (editMode && inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }

    // When exiting ediTmore, save the inputted value
    // That's better than controlling the value of the field because we re-render only once
    if (!editMode) {
      onValueChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest(".dont-close")) return;
      if (editMode && inputRef.current && !inputRef.current.contains(target)) {
        setEditMode(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((editMode && event.key === "Escape") || event.key === "Enter") {
        setEditMode(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editMode]);

  useEffect(() => {
    onValueChange(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const setValueManually = (newValue: number) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  const decrement = () => {
    setValue((preValue) => preValue - quantityJump);
  };

  const increment = () => {
    setValue((preValue) => preValue + quantityJump);
  };

  return (
    <div className="flex flex-col gap-3 w-80 dont-close">
      <div className="text-xs border-b font-bold pb-1 border-blue-400">
        {quantityName.toUpperCase()} {quantityUnit && `(${quantityUnit})`}
      </div>
      <div className="flex flex-row self-center">
        <span className="flex flex-row items-center gap-5">
          <button onClick={decrement} className="w-8 h-8 bg-gray-500 text-xl">
            -
          </button>
          {editMode ? (
            <input
              className="bg-transparent border-b text-center text-xl w-24 dont-close"
              type="number"
              name={quantityName}
              ref={inputRef}
              value={value}
              onChange={(e) => setValueManually(Number(e.target.value))}
            />
          ) : (
            <div
              className="bg-transparent border-b text-center text-xl w-24 dont-close"
              onClick={() => setEditMode(true)}
            >
              {/* {(Math.round(value * 100) / 100).toFixed(quantityPrecision)} */}
              {value}
            </div>
          )}

          <button onClick={increment} className="w-8 h-8 bg-gray-500 text-xl">
            +
          </button>
        </span>
      </div>
    </div>
  );
}
