/* eslint-disable react-hooks/exhaustive-deps */
import update from 'immutability-helper';
import { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { type TaskType } from '@/entities/task';

import { TodoTask } from './block';

export function TodoList({ data }: { data: TaskType[] }) {
  const [dataTodoTasks, setDataTodoTasks] = useState(data);

  useEffect(() => {
    setDataTodoTasks(data);
  }, [data]);

  const moveTask = useCallback((dragIndex: number, hoverIndex: number) => {
    setDataTodoTasks((prevTasks: TaskType[]) =>
      update(prevTasks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevTasks[dragIndex]!],
        ],
      }),
    );
  }, []);

  const renderTask = useCallback((task: TaskType, index: number) => {
    return (
      <TodoTask
        key={task.id}
        index={index}
        id={task.id}
        data={task}
        moveTask={moveTask}
      />
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex w-full flex-col gap-4 py-8">
        {dataTodoTasks.map((dataTodoTask, index) =>
          renderTask(dataTodoTask, index),
        )}
      </div>
    </DndProvider>
  );
}
