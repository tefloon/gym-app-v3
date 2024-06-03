import { handleReturnCategories } from "@/actions/gymDataActions";
import AddCategoryForm from "@/components/addCategoryForm";
import CategoryList from "@/components/categoryList";

export default async function Home() {
  const categories = await handleReturnCategories();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-12">
      Siema
      <AddCategoryForm />
      <div>Kasienka</div>
      <CategoryList categories={categories} />
    </main>
  );
}
