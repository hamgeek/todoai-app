'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { api } from '@/trpc/react';

import {
  type CreateTodoSchemaType,
  type UpdateTodoSchemaType,
} from './todo.type';

export const useCreateTodo = () => {
  const router = useRouter();

  const { isPending, isSuccess, mutate } = api.todo.create.useMutation();
  const utils = api.useUtils();
  const handleCreateTodo = (data: CreateTodoSchemaType) => {
    mutate(data, {
      onSuccess: (dataResponse) => {
        toast.success('Todo List created successfully', {
          position: 'top-right',
        });
        utils.todo.list.invalidate().catch(() => {
          toast.error('Failed to refetch todo list');
        });
        router.push(`/workspace/todo/${dataResponse.id}`);
      },
    });
  };

  return { isSuccess, isPending, handleCreateTodo };
};

export const useDeleteTodo = () => {
  const router = useRouter();

  const { isPending, isSuccess, mutate } = api.todo.delete.useMutation();
  const utils = api.useUtils();
  const handleDeleteTodo = (id: string) => {
    mutate(
      {
        id,
      },
      {
        onSuccess: () => {
          toast.success('Todo deleted successfully', {
            position: 'top-right',
          });
          utils.todo.list.invalidate().catch(() => {
            toast.error('Failed to refetch todo list');
          });
          router.push(`/workspace/home`);
        },
      },
    );
  };

  return { isSuccess, isPending, handleDeleteTodo };
};

export const useUpdateTodo = () => {
  const { isPending, isSuccess, mutate } = api.todo.update.useMutation();
  const utils = api.useUtils();
  const handleUpdateTodo = (data: UpdateTodoSchemaType) => {
    mutate(
      {
        id: data.id,
        title: data.title,
      },
      {
        onSuccess: () => {
          toast.success('Todo updated successfully', {
            position: 'top-right',
          });
          utils.todo.list.invalidate().catch(() => {
            toast.error('Failed to refetch todo list');
          });
          utils.task.listByTodoId.invalidate().catch(() => {
            toast.error('Failed to refetch task list');
          });
        },
      },
    );
  };

  return { isSuccess, isPending, handleUpdateTodo };
};
