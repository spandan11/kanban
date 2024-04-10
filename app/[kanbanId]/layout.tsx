import { ReactNode } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";

interface KanbanLayoutProps {
  children: ReactNode;
}

const KanbanPageLayout = ({ children }: KanbanLayoutProps) => {
  return (
    <div key="1" className="flex flex-col h-screen">
      <Header />
      {children}
      <div className="absolute bottom-5 right-1/2 left-1/2">
        <AddTask />
      </div>
    </div>
  );
};

export default KanbanPageLayout;
