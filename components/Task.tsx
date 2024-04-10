"use client";

import { Grip, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/lib/store";
import { ITask } from "@/types";

const Task = ({ id, title, description, status }: ITask) => {
  const removeTask = useTaskStore((state) => state.removeTask);
  const dragTask = useTaskStore((state) => state.dragTask);

  return (
    <div
      draggable
      onDrag={() => dragTask(id)}
      className={cn(
        "relative bg-white p-3 rounded-lg shadow-sm mb-4 hover:cursor-pointer",
        {
          "bg-blue-200": status === "BACKLOG",
          "bg-yellow-200": status === "TODO",
          "bg-orange-200": status === "INPROGRESS",
          "bg-green-200": status === "DONE",
        }
      )}
    >
      <Grip className="w-5 h-5 text-zinc-400" />
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      <Trash
        onClick={() => removeTask(id)}
        className="w-5 h-5 text-red-300 hover:text-red-300 absolute top-2 right-2 cursor-pointer"
      />
    </div>
  );
};

export default Task;
