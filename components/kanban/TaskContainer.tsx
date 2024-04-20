import { useState } from "react";
import { Edit, Grip, Trash } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useTaskStore } from "@/lib/store";
import { Task } from "@/types";
import { cn } from "@/lib/utils";

import TaskForm from "@/components/kanban/TaskForm";

const TaskContainer = ({ id, columnId, content }: Task) => {
  const [open, setOpen] = useState(false);
  const { updateTask, deleteTask, tasks, activeTask } = useTaskStore();

  const filteredTask = tasks.filter((task) => task.id === id);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "Task",
      filteredTask,
    },
    disabled: !!activeTask,
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
        className="relative bg-white cursor-grab p-3 rounded-lg shadow-sm mb-4 h-28 opacity-30 border-2 border-dotted border-indigo-400"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // draggable
      // onDrag={() => dragTask(id)}
      className={cn(
        "relative bg-white p-3 rounded-lg shadow-sm mb-4 hover:cursor-pointer"
        // {
        //   "bg-blue-200": status === "BACKLOG",
        //   "bg-yellow-200": status === "TODO",
        //   "bg-orange-200": status === "INPROGRESS",
        //   "bg-green-200": status === "DONE",
        // }
      )}
    >
      <Grip className="w-5 h-5 text-zinc-400" />
      <h3 className="text-sm font-semibold mb-1">{content.contentTitle}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 justify-normal text-justify overflow-y-auto overflow-x-hidden whitespace-pre-wrap h-16">
        {content.contentDescription}
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Edit
            onClick={() => updateTask(id, content)}
            className="w-8 h-8 text-green-300 hover:text-green-400 absolute top-2 right-8 cursor-pointer p-2"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              What do you want to make change to this task?
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            btnLabel="Add Task"
            mode="EDIT"
            setOpen={setOpen}
            columnId={columnId}
            taskId={id}
            contentTitle={content.contentTitle}
            contentDescription={content.contentDescription}
          />
        </DialogContent>
      </Dialog>

      <Trash
        onClick={() => deleteTask(id)}
        className="w-8 h-8 text-red-300 hover:text-red-400 absolute top-2 right-2 cursor-pointer p-2"
      />
    </div>
  );
};

export default TaskContainer;
