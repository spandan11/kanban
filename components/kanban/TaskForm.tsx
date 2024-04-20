import { Dispatch, SetStateAction } from "react";

import { useTaskStore } from "@/lib/store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TaskForm {
  taskId?: string | number; //TaskId is only passed in edit mode
  columnId: string | number; //ColumnId, contentTitle and contentDescription are passed when the mode is EDIT
  contentTitle?: string;
  contentDescription?: string;
  btnLabel: string;
  mode: "CREATE" | "EDIT";
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TaskForm = ({
  taskId,
  columnId,
  contentTitle,
  contentDescription,
  btnLabel,
  mode,
  setOpen,
}: TaskForm) => {
  const { createTask, updateTask } = useTaskStore();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title, description } = Object.fromEntries(formData);
    if (typeof title !== "string" || typeof description !== "string") return;
    if (mode === "CREATE")
      createTask(columnId as string | number, {
        contentTitle: title,
        contentDescription: description,
      });
    if (mode === "EDIT")
      updateTask(taskId as string | number, {
        contentTitle: title,
        contentDescription: description,
      });
    setOpen(false);
  };
  return (
    <form id="todo-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Input
          id="title"
          name="title"
          required
          placeholder="Task title..."
          defaultValue={mode === "CREATE" ? "" : contentTitle}
          className="col-span-4"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Textarea
          id="description"
          name="description"
          placeholder="Description..."
          defaultValue={mode === "CREATE" ? "" : contentDescription}
          className="col-span-4 resize-none"
        />
      </div>
      <Button type="submit">{btnLabel}</Button>
    </form>
  );
};

export default TaskForm;
