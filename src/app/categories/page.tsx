"use client";

import CategoryComponent from "@/components/categoryComponent";

export default function Categories() {
  // const categories = await handleReturnCategories();

  console.log("Parent rendered");

  return (
    <main
      key="kurwa"
      className="flex min-h-screen flex-col items-center gap-4 p-12"
    >
      <CategoryComponent />
    </main>
  );
}
