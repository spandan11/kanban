import { useMemo, useState } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, Ellipsis, Plus, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useTaskStore } from "@/lib/store";
import { Column, Task } from "@/types";

import SectionForm from "@/components/kanban/SectionForm";
import TaskForm from "@/components/kanban/TaskForm";
import TaskContainer from "@/components/kanban/TaskContainer";

interface SectionContainerProps {
  column: Column;
  tasks: Task[];
}

const SectionContainer = ({ column, tasks }: SectionContainerProps) => {
  const { deleteColumn, activeColumn } = useTaskStore();
  const [taskAddOpen, setTaskAddOpen] = useState(false);
  const [colEditOpen, setColEditOpen] = useState(false);

  // const filteredTasks = tasks.filter((task) => task.columnId === column.id);

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: !!activeColumn,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-lg opacity-40 cursor-grab w-80 h-96 flex flex-col justify-between bg-gray-100 border-dotted border-2 border-indigo-400"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg w-80 min-h-96 flex flex-col justify-between bg-gray-100"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between border-b-2 border-indigo-500 p-1"
      >
        <h2 className="text-sm font-medium text-gray-800/90 dark:text-gray-300 flex items-center">
          {column.title}
          <Badge variant="outline" className="ml-1 rounded-lg">
            {tasks.length}
          </Badge>
        </h2>
        <div className="flex items-center justify-center gap-2">
          {/* Add Task Button */}
          <Dialog open={taskAddOpen} onOpenChange={setTaskAddOpen}>
            <DialogTrigger>
              <Plus className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-700 transition" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
                <DialogDescription>
                  What do you want to get done today?
                </DialogDescription>
              </DialogHeader>
              <TaskForm
                btnLabel="Add Task"
                mode="CREATE"
                setOpen={setTaskAddOpen}
                columnId={column.id}
              />
            </DialogContent>
          </Dialog>
          {/* DropDown for Editing and Deleting the Section */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-700 transition" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Dialog open={colEditOpen} onOpenChange={setColEditOpen}>
                  <DialogTrigger className="flex px-2 py-1.5 text-sm">
                    <Edit className="mr-2 h-4 w-4 text-green-400" />
                    Edit
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Section</DialogTitle>
                      <DialogDescription>
                        Want to edit the section?
                      </DialogDescription>
                    </DialogHeader>
                    <SectionForm
                      mode="EDIT"
                      columnId={column.id}
                      columnTitle={column.title}
                      btnLabel="Add Section"
                      setOpen={setColEditOpen}
                    />
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteColumn(column.id)}>
                <Trash className="mr-2 h-4 w-4 text-red-400" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto p-2 overflow-x-hidden">
        <SortableContext
          items={tasksIds}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskContainer
              key={task.id}
              columnId={column.id}
              id={task.id}
              content={task.content}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default SectionContainer;
