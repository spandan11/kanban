"use client";

import { ReactNode, useState } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useTaskStore } from "./store";

interface ProvidersProps {
  children: ReactNode;
}

// export const DndProvider = ({ children }: { children: ReactNode }) => {
//   const Tasks=useTaskStore((state)=>state.tasks)
//   const [items, setItems] = useState([]);

//   const getTaskPosition=(id:string)=> Tasks.findIndex(task => task.id === id);
//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (over !== null) {
//       if (active.id === over.id) return;
//       if (active.id !== over.id) {
//         setItems((items) => {
//           const oldIndex=getTaskPosition(active.id as );

//           // const oldIndex = items.indexOf(active.id);
//           // const newIndex = items.indexOf(over.id);

//           return arrayMove(items, oldIndex, newIndex);
//         });
//     }
//   };
//   return (
//     <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
//       {children}
//     </DndContext>
//   );
// };
function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;
