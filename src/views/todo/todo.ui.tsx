/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

'use client';

import { Skeleton } from '@nextui-org/react';

import { useTaskListByTodoIdQuery } from '@/entities/task';
import { AddTaskModal, AddTaskWithAIModal } from '@/features/task';
import { DeleteTodoModal, RenameTodoListModal } from '@/features/todo';

import { TodoList } from './todo-list.ui';

export function TodoUI({ todoId }: { todoId: string }) {
  const { data } = useTaskListByTodoIdQuery({ todoId });

  return (
    <div className="w-full px-12 py-16">
      <div className="mb-8">
        <div className="flex flex-row items-center gap-6">
          <h1 className="text-xl font-medium text-gray-600 md:text-3xl">
            {Object.keys(data || {}).length > 0 ? (
              data?.title
            ) : (
              <Skeleton className="h-[36px] w-[180px] rounded-md" />
            )}
          </h1>
          <div className="flex flex-row items-center gap-3">
            {Object.keys(data ?? {}).length > 0 && (
              <>
                <RenameTodoListModal
                  data={{
                    id: data?.id ?? '',
                    title: data?.title ?? '',
                  }}
                />
                <DeleteTodoModal id={todoId} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mb-1 flex w-full flex-row gap-4">
        <AddTaskModal todoId={todoId} />
        <AddTaskWithAIModal todoId={todoId} />
      </div>
      {Object.keys(data ?? {}).length > 0 && (
        <TodoList data={data?.tasks ?? []} />
      )}
    </div>
  );
}
