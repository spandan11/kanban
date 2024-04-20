export type Id = string | number;

export type Content = {
  contentTitle: string;
  contentDescription?: string;
};

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: Content;
};
