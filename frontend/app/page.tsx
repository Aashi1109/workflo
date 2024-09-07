import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Nav";

export default function Home() {
  return (
    <main className="h-full w-full flex bg-[--secondary]">
      <Navbar />
      <Dashboard />
    </main>
  );
}
