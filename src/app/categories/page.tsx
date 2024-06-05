import { handleReturnCategories } from "@/actions/gymDataActions";
import CategoriesManager from "@/components/categoryManager/categoriesManager";

export default async function Categories() {
  console.log("GrandParent rendered");

  // const categories = await handleReturnCategories();

  return (
    <main className="flex flex-col items-center gap-4 p-12">
      <CategoriesManager />
    </main>
  );
}
