"use client";

import { useMemo } from "react";
import { useTaskStore } from "@/lib/store";
import Task from "@/components/Task";
import { IColumn } from "@/types";

const TaskColumn = ({ title, icon, status }: IColumn) => {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const draggedTask = useTaskStore((state) => state.draggedTask);
  const dragTask = useTaskStore((state) => state.dragTask);
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return;
    updateTask(draggedTask, status);
    dragTask(null);
  };
  return (
    <div className="h-screen border p-2 shadow-sm rounded-lg">
      <h2 className="mb-4 text-sm font-medium text-gray-400 dark:text-gray-300 flex items-center">
        {icon}
        {title}
      </h2>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full h-[600px]"
      >
        <div>
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;
