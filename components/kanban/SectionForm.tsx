import { Dispatch, SetStateAction } from "react";

import { useTaskStore } from "@/lib/store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SectionForm {
  columnId?: string | number; //ColumnId and columnTitle are passed when the mode is EDIT
  columnTitle?: string;
  btnLabel: string;
  mode: "CREATE" | "EDIT";
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SectionForm = ({
  columnId,
  columnTitle,
  btnLabel,
  mode,
  setOpen,
}: SectionForm) => {
  const { createNewColumn, updateColumn } = useTaskStore();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title } = Object.fromEntries(formData);
    if (typeof title !== "string") return;
    if (mode === "CREATE") createNewColumn(title);
    if (mode === "EDIT") updateColumn(columnId as string, title);
    setOpen(false);
  };
  return (
    <form id="todo-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Input
          id="title"
          name="title"
          required
          placeholder="Section title..."
          defaultValue={mode === "CREATE" ? "" : columnTitle}
          className="col-span-4"
        />
      </div>
      <Button type="submit">{btnLabel}</Button>
    </form>
  );
};

export default SectionForm;
