export type TodoType = {
  id: string;
  userId: string;
  title: string;
};

export type TodoTaskType = {
  id: string;
  todoId: string;
  title: string;
  isDone: boolean;
  position: number;
};
