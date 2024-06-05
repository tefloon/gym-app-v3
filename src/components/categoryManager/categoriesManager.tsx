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
import { createId } from "@paralleldrive/cuid2";
import CategoryList from "./categoryList";
import CategoryForm from "./categoryForm";

export default function CategoriesManager() {
  const [isLoading, startLoading] = useTransition();
  const [pending, startTransition] = useTransition();

  const [cats, setCats] = useState<PrismaCategory[]>();
  const [optimisticCats, setOptimisticCats] = useOptimistic(cats);

  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch the initial data
  useEffect(() => {
    startLoading(async () => {
      console.log("Fetching categories");
      const response = await handleReturnCategories();
      setCats(response);
    });
  }, []);

  // Make sure the input is focused on every reload
  useEffect(() => {
    inputRef.current?.focus();
  });

  const handleDeleteClick = (id: string) => {
    startTransition(async () => {
      setOptimisticCats((prev) => prev?.filter((c) => c.id !== id));
      const res = await handleDeleteCategoryById(id);
      if (res.status !== 200) {
        console.log(res.message);
      }
      const response = await handleReturnCategories();
      setCats(response);
    });
  };

  const handleAddCategory = () => {
    if (!inputRef.current) return;

    const categoryId = createId();
    const newCat = { name: inputRef.current.value, id: categoryId };

    startTransition(async () => {
      optimisticCats
        ? setOptimisticCats((prev) => [...(prev as PrismaCategory[]), newCat])
        : setOptimisticCats([newCat]);

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
    <div className="flex flex-col gap-4 ">
      <CategoryForm
        inputRef={inputRef}
        pending={pending}
        handleAddCategory={handleAddCategory}
      />
      <CategoryList
        isLoading={isLoading}
        handleDeleteClick={handleDeleteClick}
        optimisticCats={optimisticCats}
      />
    </div>
  );
}
