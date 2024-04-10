import {
  ActivityIcon,
  BackpackIcon,
  CheckIcon,
  ListTodoIcon,
} from "lucide-react";
import { IColumn } from "@/types";
import TaskColumn from "@/components/TaskColumn";
import { DndProvider } from "@/lib/Providers";

type KanbanPageProps = {
  params: { kanbanId: string };
};

const columns: IColumn[] = [
  {
    title: "Backlog",
    icon: <BackpackIcon className="w-4 h-4 mr-2" />,
    status: "BACKLOG",
  },
  {
    title: "Todo",
    icon: <ListTodoIcon className="w-4 h-4 mr-2" />,
    status: "TODO",
  },
  {
    title: "InProgress",
    icon: <ActivityIcon className="w-4 h-4 mr-2" />,
    status: "INPROGRESS",
  },
  {
    title: "Done",
    icon: <CheckIcon className="w-4 h-4 mr-2" />,
    status: "DONE",
  },
];

const KanbanPage = ({ params: { kanbanId } }: KanbanPageProps) => {
  return (
    <DndProvider>
      <main className="flex-1 overflow-auto py-4 px-4 bg-gray-100">
        <div className="space-x-4 grid grid-cols-4">
          {columns.map((column) => (
            <TaskColumn
              title={column.title}
              icon={column.icon}
              status={column.status}
              key={column.status}
            />
          ))}
        </div>
      </main>
    </DndProvider>
  );
};

export default KanbanPage;
