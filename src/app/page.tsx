import CategoryComponent from "@/components/categoryComponent";

export default function Home() {
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
