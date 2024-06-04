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
  handleReturnCategories,
} from "@/actions/gymDataActions";
import { Category as PrismaCategory } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { createId } from "@paralleldrive/cuid2";

type CategoryListProps = {
  categories?: PrismaCategory[];
};

export default function CategoryComponent() {
  console.log("Child rendered");

  const [pending, startTransition] = useTransition();

  const [cats, setCats] = useState<PrismaCategory[]>();
  const [optimisticCat, setOptimisticCat] = useOptimistic(cats);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching categories");
      const response = await handleReturnCategories();
      setCats(response);
      // setOptimisticCat(response);
    }
    fetchData();
    inputRef.current?.focus();
  }, []);

  const handleDeleteClick = (id: string) => {
    startTransition(async () => {
      setOptimisticCat((prev) => prev?.filter((c) => c.id !== id));
      const res = await handleDeleteCategoryById(id);
      if (res.status !== 200) {
        console.log(res.message);
      }
      const response = await handleReturnCategories();
      setCats(response);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // e.preventDefault();
      handleAddCategory();
    }
  };

  const handleAddCategory = () => {
    if (!inputRef.current) return;

    const categoryId = createId();
    const newCat = { name: inputRef.current.value, id: categoryId };

    startTransition(async () => {
      optimisticCat
        ? setOptimisticCat((prev) => [...(prev as PrismaCategory[]), newCat])
        : setOptimisticCat([newCat]);

      if (!inputRef.current) return;
      try {
        const res = await handleCreateCategory(newCat);
        if (res.status !== 200) {
          console.log(res.message);
        }
      } catch (e) {
        console.error(e);
      }
      const response = await handleReturnCategories();
      setCats(response);
      inputRef.current.value = "";
      inputRef.current.focus();
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
        // Put skeleton here
        <div>Nothing to show here...</div>
      )}
    </div>
  );
}
