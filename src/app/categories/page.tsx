import { handleReturnCategories } from "@/actions/gymDataActions";
import AddCategoryForm from "@/components/addCategoryForm";
import CategoryList from "@/components/categoryList";

export default async function Categories() {
  const categories = await handleReturnCategories();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-12">
      <AddCategoryForm />
      <CategoryList categories={categories} />
    </main>
  );
}
