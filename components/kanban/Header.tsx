"use client";
import { useState } from "react";
import { KanbanIcon, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SectionForm from "@/components/kanban/SectionForm";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="h-[60px] flex items-center px-4 shadow-md justify-between ">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-50 flex items-center">
        <KanbanIcon className="mx-1 h-4 w-4" />
        Kanban Board
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
            <DialogDescription>
              What Section do you want to add today?
            </DialogDescription>
          </DialogHeader>
          <SectionForm mode="CREATE" btnLabel="Add Section" setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
