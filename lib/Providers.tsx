"use client";

import { ReactNode } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { DndContext, closestCorners } from "@dnd-kit/core";

interface ProvidersProps {
  children: ReactNode;
}

export const DndProvider = ({ children }: { children: ReactNode }) => {
  return (
    <DndContext collisionDetection={closestCorners}>{children}</DndContext>
  );
};
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
