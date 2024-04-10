export type Status = "BACKLOG" | "TODO" | "INPROGRESS" | "DONE";

export interface IColumn {
  title: string;
  icon: JSX.Element | undefined;
  status: Status;
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: Status;
}
