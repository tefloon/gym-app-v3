import CategoryComponent from "@/components/categoryComponent";

export default async function Categories() {
  console.log("GrandParent rendered");

  return (
    <main
      key="kurwa"
      className="flex min-h-screen flex-col items-center gap-4 p-12"
    >
      <CategoryComponent key="japierdole" />
    </main>
  );
}
