import React, { useRef } from "react";
import {
  handleCreateCategory,
  handleReturnCategories,
} from "@/actions/gymDataActions";
import { Prisma } from "@prisma/client";
import AddCategoryForm from "@/components/addCategoryForm";
import { error } from "console";

export default async function AddCategoryController() {
  const createCategory = async (newCatName: string) => {
    "use server";
    const res = await handleCreateCategory(newCatName);
    if (res) {
      return "Siema";
    }
  };

  return <AddCategoryForm addCategoryHandler={handleCreateCategory} />;
}
