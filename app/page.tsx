import KanbanBoard from "@/components/kanban/KanbanBoard";
import Header from "@/components/kanban/Header";

export default function Home() {
  return (
    <div key="1" className="flex flex-col h-screen">
      <Header />
      <KanbanBoard />
    </div>
  );
}
