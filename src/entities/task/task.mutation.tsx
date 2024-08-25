import toast from 'react-hot-toast';

import { api } from '@/trpc/react';

import {
  type CreateTaskSchemaType,
  type CreateTaskWithAISchemaType,
  type UpdateTaskSchemaType,
} from './task.type';

export const useCreateTask = () => {
  const { isPending, isSuccess, mutate } = api.task.create.useMutation();
  const utils = api.useUtils();
  const handleCreateTask = (data: CreateTaskSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Task created successfully', {
          position: 'top-right',
        });
        utils.task.listByTodoId.invalidate().catch(() => {
          toast.error('Failed to refetch task list');
        });
      },
    });
  };

  return { isSuccess, isPending, handleCreateTask };
};

export const useCompleteTask = () => {
  const { isPending, isSuccess, mutate } = api.task.complete.useMutation();
  const utils = api.useUtils();
  const handleCompleteTask = (taskId: string, isDone: boolean) => {
    mutate(
      {
        id: taskId,
        isDone,
      },
      {
        onSuccess: () => {
          toast.success(
            `Task ${isDone ? 'completed' : 'uncompleted'} successfully.`,
            {
              position: 'top-right',
            },
          );
          utils.task.listByTodoId.invalidate().catch(() => {
            toast.error('Failed to refetch task list');
          });
        },
      },
    );
  };

  return { isSuccess, isPending, handleCompleteTask };
};

export const useMoveTask = () => {
  const { isPending, isSuccess, mutate } = api.task.move.useMutation();
  const utils = api.useUtils();
  const handleMoveTask = (taskId: string, position: number) => {
    mutate(
      {
        id: taskId,
        position,
      },
      {
        onSuccess: () => {
          toast.success('Task moved successfully', {
            position: 'top-right',
          });
          utils.task.listByTodoId.invalidate().catch(() => {
            toast.error('Failed to refetch task list');
          });
        },
      },
    );
  };

  return { isSuccess, isPending, handleMoveTask };
};

export const useDeleteTask = () => {
  const { isPending, isSuccess, mutate } = api.task.delete.useMutation();
  const utils = api.useUtils();
  const handleDeleteTask = (id: string) => {
    mutate(
      {
        id,
      },
      {
        onSuccess: () => {
          toast.success('Task deleted successfully', {
            position: 'top-right',
          });
          utils.task.listByTodoId.invalidate().catch(() => {
            toast.error('Failed to refetch task list');
          });
        },
      },
    );
  };

  return { isSuccess, isPending, handleDeleteTask };
};

export const useUpdateTask = () => {
  const { isPending, isSuccess, mutate } = api.task.update.useMutation();
  const utils = api.useUtils();
  const handleUpdateTask = (data: UpdateTaskSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Task updated successfully', {
          position: 'top-right',
        });
        utils.task.listByTodoId.invalidate().catch(() => {
          toast.error('Failed to refetch task list');
        });
      },
    });
  };

  return { isSuccess, isPending, handleUpdateTask };
};

export const useCreateTaskWithAI = () => {
  const { isPending, isSuccess, mutate } = api.task.createWithAI.useMutation();
  const utils = api.useUtils();
  const handleCreateTaskWithAI = (data: CreateTaskWithAISchemaType) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Task created successfully', {
          position: 'top-right',
        });
        utils.task.listByTodoId.invalidate().catch(() => {
          toast.error('Failed to refetch task list');
        });
      },
      onError: () => {
        toast.error('Operation failed, Try Again...', {
          position: 'top-right',
        });
      },
    });
  };

  return { isSuccess, isPending, handleCreateTaskWithAI };
};
