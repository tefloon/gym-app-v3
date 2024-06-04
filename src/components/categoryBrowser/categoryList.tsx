import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Category as PrismaCategory } from "@prisma/client";
import React from "react";

type CategoryListProps = {
  isLoading: boolean;
  handleDeleteClick: (id: string) => void
  optimisticCats?: PrismaCategory[];
};

export default function CategoryList({
  isLoading,
	handleDeleteClick,
  optimisticCats,
}: CategoryListProps) {
  return (
    <div>
      {optimisticCats && !isLoading ? (
        <ol className="flex flex-col gap-2 ">
          <LayoutGroup>
            <AnimatePresence presenceAffectsLayout>
              {optimisticCats.map((cat, id) => (
                <motion.li
                  layout
                  className="flex min-w-[300px] flex-row bg-neutral-700 rounded hover:bg-neutral-800 cursor-pointer justify-between p-2"
                  key={id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.2,
                  }}
                >
                  <span className="pr-5">{cat.name}</span>
                  <button onClick={() => handleDeleteClick(cat.id)}>❌</button>
                </motion.li>
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </ol>
      ) : (
        // Put skeleton here
        <motion.ol
          className="flex flex-col gap-2 "
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 0.2,
          }}
        >
          {[1, 2, 3].map((id) => (
            <motion.li
              className="flex min-w-[300px] min-h-8 flex-row bg-neutral-700 rounded hover:bg-neutral-800 cursor-pointer justify-between p-2"
              key={id}
            >
              <span className="pr-5"></span>
            </motion.li>
          ))}
        </motion.ol>
      )}
    </div>
  );
}
