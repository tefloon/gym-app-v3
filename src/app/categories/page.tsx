import { handleReturnCategories } from "@/actions/gymDataActions";
import CategoryComponent from "@/components/categoryBrowser/categoryComponent";

export default async function Categories() {
  console.log("GrandParent rendered");

  // const categories = await handleReturnCategories();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-12">
      <CategoryComponent />
    </main>
  );
}
