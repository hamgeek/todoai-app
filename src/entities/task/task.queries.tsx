import { api } from '@/trpc/react';

export const useTaskListByTodoIdQuery = (query: { todoId: string }) => {
  const { data, refetch } = api.task.listByTodoId.useQuery(query);

  return { data, refetch };
};
