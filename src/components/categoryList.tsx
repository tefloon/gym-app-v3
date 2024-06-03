"use client";

import React from "react";
import { Category as PrismaCategory } from "@prisma/client";
import { handleDeleteCategoryById } from "@/actions/gymDataActions";

type CategoryListProps = {
  categories?: PrismaCategory[];
};

export default function CategoryList({ categories }: CategoryListProps) {
  return categories ? (
    <ol className="flex flex-col gap-2">
      {categories.map((cat) => (
        <li
          className="flex flex-row bg-neutral-700 rounded hover:bg-neutral-800 cursor-pointer justify-between p-2"
          key={cat.id}
        >
          <span className="pr-5">{cat.name}</span>
          <button onClick={() => handleDeleteCategoryById(cat.id)}>❌</button>
        </li>
      ))}{" "}
    </ol>
  ) : (
    <div>Nothing to show here...</div>
  );
}
