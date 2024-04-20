"use client";
import { useMemo } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { useTaskStore } from "@/lib/store";

import SectionContainer from "@/components/kanban/SectionContainer";
import TaskContainer from "@/components/kanban/TaskContainer";

const KanbanBoard = () => {
  const {
    columns,
    onDragStart,
    onDragEnd,
    onDragOver,
    activeColumn,
    activeTask,
    tasks,
  } = useTaskStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  if (columns.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-sm text-muted-foreground">
        Your Kanban is empty.
      </div>
    );
  }

  return (
    <main
      className="h-screen flex-1 overflow-auto p-4 bg-gray-100 mt-0 items-center
    overflow-x-auto
    overflow-y-auto"
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="space-x-4 flex m-auto gap-4 ">
          <div className="flex gap-4">
            {/* Making COlumn Container a dragable container */}
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <SectionContainer
                  column={column}
                  key={column.id}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <SectionContainer
                key={activeColumn.id}
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskContainer
                key={activeTask.id}
                columnId={activeTask.columnId}
                id={activeTask.id}
                content={activeTask.content}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </main>
  );
};

export default KanbanBoard;
