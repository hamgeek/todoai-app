import { api } from '@/trpc/react';

export const useTodoListQuery = () => {
  const { data } = api.todo.list.useQuery();

  return { data };
};
