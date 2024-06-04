import { handleReturnCategories } from "@/actions/gymDataActions";
import AddCategoryForm from "@/components/addCategoryForm";
import CategoryComponent from "@/components/categoryComponent";
import CategoryList from "@/components/categoryList";
import CategoryList2 from "@/components/categoryList2";

export default async function Categories() {
  const categories = await handleReturnCategories();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-12">
      {/* <AddCategoryForm />
      <CategoryList2 categories={categories} /> */}
      <CategoryComponent categories={categories} />
    </main>
  );
}
