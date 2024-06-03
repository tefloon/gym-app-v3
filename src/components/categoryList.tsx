"use client";

import React, { useEffect, useState } from "react";
import { Category as PrismaCategory } from "@prisma/client";
import { handleDeleteCategoryById } from "@/actions/gymDataActions";
import { AnimatePresence, motion } from "framer-motion";

type CategoryListProps = {
  categories?: PrismaCategory[];
};

export default function CategoryList({ categories }: CategoryListProps) {
  // const [visible, setVisible] = useState(
  //   new Array(categories?.length).fill(true)
  // );

  // useEffect(() => {
  //   setVisible(new Array(categories?.length).fill(true));
  // }, [categories]);

  // To make the experience snappier, we hide the deleted entry before
  // the DB has time t update and re-render the DOM
  const handleDeleteClick = (id: number) => {
    // let newVis = visible.slice();
    // newVis[id] = false;

    // setVisible(newVis);

    if (categories) handleDeleteCategoryById(categories[id].id);
  };

  return categories ? (
    <AnimatePresence presenceAffectsLayout initial={false}>
      <ol className="flex flex-col gap-2 ">
        {categories.map((cat, id) => (
          <motion.li
            layout
            className="flex min-w-[300px] flex-row bg-neutral-700 rounded hover:bg-neutral-800 cursor-pointer justify-between p-2"
            key={cat.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
          >
            <span className="pr-5">{cat.name}</span>
            <button onClick={() => handleDeleteClick(id)}>❌</button>
          </motion.li>
        ))}
      </ol>
    </AnimatePresence>
  ) : (
    <div>Nothing to show here...</div>
  );
}
