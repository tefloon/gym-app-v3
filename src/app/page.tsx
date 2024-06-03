import Image from "next/image";
import {
  handleCreateCategory,
  handleReturnCategories,
} from "@/actions/gymDataActions";
import CategoryList from "@/components/categoryList";
import AddCategoryForm from "@/components/addCategoryForm";
import AddCategoryController from "@/components/addCategoryController";

export default async function Home() {
  const categories = await handleReturnCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Siema
      <AddCategoryController />
      <CategoryList categories={categories} />
    </main>
  );
}
