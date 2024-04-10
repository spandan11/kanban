import React from "react";
import { KanbanIcon } from "lucide-react";

import ToggleTheme from "@/components/ToggleTheme";

const Header = () => {
  return (
    <header className="h-[60px] flex items-center px-4 shadow-md justify-between">
      <h1 className="text-sm font-medium text-gray-900 dark:text-gray-50 flex items-center">
        <KanbanIcon className="mr-2 h-4 w-4" />
        Kanban Board
      </h1>
      <ToggleTheme />
    </header>
  );
};

export default Header;
