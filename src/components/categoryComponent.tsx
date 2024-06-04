"use client";

import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  handleCreateCategory,
  handleDeleteCategoryById,
} from "@/actions/gymDataActions";
import { Category as PrismaCategory } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { createId } from "@paralleldrive/cuid2";

type CategoryListProps = {
  categories?: PrismaCategory[];
};

export default function CategoryComponent({ categories }: CategoryListProps) {
  const [pending, startTransition] = useTransition();

  const [optimisticCat, setOptimisticCat] = useOptimistic(categories);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteClick = (id: string) => {
    startTransition(async () => {
      setOptimisticCat((prev) => prev?.filter((c) => c.id !== id));
      await handleDeleteCategoryById(id);
    });
  };

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
    if (!inputRef.current) return;

    const categoryId = createId();

    const newCat = { id: categoryId, name: inputRef.current.value };

    startTransition(async () => {
      optimisticCat
        ? setOptimisticCat((prev) => [...(prev as PrismaCategory[]), newCat])
        : setOptimisticCat([newCat]);
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
    <div className="flex flex-col gap-4">
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
      {optimisticCat ? (
        <AnimatePresence presenceAffectsLayout initial={false}>
          <ol className="flex flex-col gap-2 ">
            {optimisticCat.map((cat, id) => (
              <motion.li
                layout
                className="flex min-w-[300px] flex-row bg-neutral-700 rounded hover:bg-neutral-800 cursor-pointer justify-between p-2"
                key={cat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.1,
                }}
              >
                <span className="pr-5">{cat.name}</span>
                <button onClick={() => handleDeleteClick(cat.id)}>❌</button>
              </motion.li>
            ))}
          </ol>
        </AnimatePresence>
      ) : (
        <div>Nothing to show here...</div>
      )}
    </div>
  );
}
