import { v4 as uuid } from "uuid";
import { DragStartEvent, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Content, Column, Task, Id } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";

export interface State {
  columns: Column[];
  tasks: Task[];
  activeColumn: Column | null;
  activeTask: Task | null;
}

export interface Actions {
  createTask: (columnId: Id, content: Content) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: Content) => void;
  createNewColumn: (title: string) => void;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
}

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      columns: [],
      tasks: [],
      activeColumn: null,
      activeTask: null,
      createTask: (columnId: Id, content: Content) => {
        set((state) => {
          const newTask: Task = {
            id: uuid(),
            columnId,
            content: {
              contentTitle: content.contentTitle,
              contentDescription: content.contentDescription,
            },
          };
          return { tasks: [...state.tasks, newTask] };
        });
      },
      deleteTask: (id: Id) => {
        set((state) => {
          const newTasks = state.tasks.filter((task) => task.id !== id);
          return { tasks: newTasks };
        });
      },
      updateTask: (id: Id, content: Content) => {
        set((state) => {
          const newTasks = state.tasks.map((task) =>
            task.id !== id ? task : { ...task, content }
          );
          return { tasks: newTasks };
        });
      },
      createNewColumn: (title: string) => {
        set((state) => {
          const newColumn: Column = {
            id: uuid(),
            title: title,
          };
          return { columns: [...state.columns, newColumn] };
        });
      },
      deleteColumn: (id: Id) => {
        set((state) => {
          const filteredColumns = state.columns.filter((col) => col.id !== id);
          const newTasks = state.tasks.filter((t) => t.columnId !== id);
          return { columns: filteredColumns, tasks: newTasks };
        });
      },
      updateColumn: (id: Id, title: string) => {
        set((state) => {
          const newColumns = state.columns.map((col) =>
            col.id !== id ? col : { ...col, title }
          );
          return { columns: newColumns };
        });
      },
      onDragStart: (event: DragStartEvent) => {
        set((state) => {
          if (event.active.data.current?.type === "Column") {
            return {
              activeColumn: event.active.data.current.column,
              activeTask: null,
            };
          } else if (event.active.data.current?.type === "Task") {
            return {
              activeTask: event.active.data.current.task,
              activeColumn: null,
            };
          }
          return state;
        });
      },
      onDragEnd: (event: DragEndEvent) => {
        set((state) => {
          state.activeColumn = null;
          state.activeTask = null;
          const { active, over } = event;
          if (!over) return state;
          const activeId = active.id;
          const overId = over.id;
          if (activeId === overId) return state;
          const isActiveAColumn = active.data.current?.type === "Column";
          if (!isActiveAColumn) return state;
          const activeColumnIndex = state.columns.findIndex(
            (col) => col.id === activeId
          );
          const overColumnIndex = state.columns.findIndex(
            (col) => col.id === overId
          );

          return {
            columns: arrayMove(
              state.columns,
              activeColumnIndex,
              overColumnIndex
            ),
          };
        });
      },
      onDragOver: (event: DragOverEvent) => {
        set((state) => {
          state.activeColumn = null;
          state.activeTask = null;
          const { active, over } = event;
          if (!over) return state;
          const activeId = active.id;
          const overId = over.id;
          if (activeId === overId) return state;
          const isActiveATask = active.data.current?.type === "Task";
          const isOverATask = over.data.current?.type === "Task";
          if (!isActiveATask) return state;
          if (isActiveATask && isOverATask) {
            const activeIndex = state.tasks.findIndex(
              (task) => task.id === activeId
            );
            const overIndex = state.tasks.findIndex(
              (task) => task.id === overId
            );

            state.tasks[activeIndex].columnId = state.tasks[overIndex].columnId;

            return {
              tasks: arrayMove(state.tasks, activeIndex, overIndex),
            };
          }
          const isOverAColumn = over.data.current?.type === "Column";
          if (isActiveATask && isOverAColumn) {
            const activeIndex = state.tasks.findIndex(
              (task) => task.id === activeId
            );

            state.tasks[activeIndex].columnId = overId;

            return {
              tasks: arrayMove(state.tasks, activeIndex, activeIndex),
            };
          }
          return state;
        });
      },
    }),
    {
      name: "Kanban",
    }
  )
);

// // Create a custom hook
// export const useTaskStoress = create<State & Actions>()((set) => ({
//   columns: [],
//   tasks: [],
//   activeColumn: null,
//   activeTask: null,
//   createTask: (columnId: Id, content: Content) => {
//     set((state) => {
//       const newTask: Task = {
//         id: uuid(),
//         columnId,
//         content: {
//           contentTitle: content.contentTitle,
//           contentDescription: content.contentDescription,
//         },
//       };
//       return { tasks: [...state.tasks, newTask] };
//     });
//   },
//   deleteTask: (id: Id) => {
//     set((state) => {
//       const newTasks = state.tasks.filter((task) => task.id !== id);
//       return { tasks: newTasks };
//     });
//   },
//   updateTask: (id: Id, content: Content) => {
//     set((state) => {
//       const newTasks = state.tasks.map((task) =>
//         task.id !== id ? task : { ...task, content }
//       );
//       return { tasks: newTasks };
//     });
//   },
//   createNewColumn: () => {
//     set((state) => {
//       const newColumn: Column = {
//         id: uuid(),
//         title: `Column ${state.columns.length + 1}`,
//       };
//       return { columns: [...state.columns, newColumn] };
//     });
//   },
//   deleteColumn: (id: Id) => {
//     set((state) => {
//       const filteredColumns = state.columns.filter((col) => col.id !== id);
//       const newTasks = state.tasks.filter((t) => t.columnId !== id);
//       return { columns: filteredColumns, tasks: newTasks };
//     });
//   },
//   updateColumn: (id: Id, title: string) => {
//     set((state) => {
//       const newColumns = state.columns.map((col) =>
//         col.id !== id ? col : { ...col, title }
//       );
//       return { columns: newColumns };
//     });
//   },
//   onDragStart: (event: DragStartEvent) => {
//     set((state) => {
//       if (event.active.data.current?.type === "Column") {
//         return {
//           activeColumn: event.active.data.current.column,
//           activeTask: null,
//         };
//       } else if (event.active.data.current?.type === "Task") {
//         return {
//           activeTask: event.active.data.current.task,
//           activeColumn: null,
//         };
//       }
//       return state;
//     });
//   },
//   onDragEnd: (event: DragEndEvent) => {
//     set((state) => {
//       const { active, over } = event;
//       if (!over) return state;
//       const activeId = active.id;
//       const overId = over.id;
//       if (activeId === overId) return state;
//       const isActiveAColumn = active.data.current?.type === "Column";
//       if (!isActiveAColumn) return state;
//       return {
//         columns: state.columns.map((col) =>
//           col.id === activeId
//             ? state.columns.find((c) => c.id === overId)!
//             : col
//         ),
//       };
//     });
//   },
//   onDragOver: (event: DragOverEvent) => {
//     set((state) => {
//       const { active, over } = event;
//       if (!over) return state;
//       const activeId = active.id;
//       const overId = over.id;
//       if (activeId === overId) return state;
//       const isActiveATask = active.data.current?.type === "Task";
//       const isOverATask = over.data.current?.type === "Task";
//       if (!isActiveATask) return state;
//       if (isActiveATask && isOverATask) {
//         return state;
//       }
//       const isOverAColumn = over.data.current?.type === "Column";
//       if (isActiveATask && isOverAColumn) {
//         return state;
//       }
//       return state;
//     });
//   },
// }));
