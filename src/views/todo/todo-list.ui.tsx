/* eslint-disable react-hooks/exhaustive-deps */
import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { type TodoTaskType } from '@/entities/todo';

import { TodoTask } from './block';

export function TodoList() {
  const initialDataTodoTasks: TodoTaskType[] = [
    {
      id: '1',
      todoId: '1',
      title: 'Task 1',
      isDone: false,
      position: 1,
    },
    {
      id: '2',
      todoId: '1',
      title: 'Task 2',
      isDone: true,
      position: 2,
    },
    {
      id: '3',
      todoId: '1',
      title: 'Task 3',
      isDone: false,
      position: 3,
    },
  ];

  const [dataTodoTasks, setDataTodoTasks] = useState(initialDataTodoTasks);

  const moveTask = useCallback((dragIndex: number, hoverIndex: number) => {
    setDataTodoTasks((prevTasks: TodoTaskType[]) =>
      update(prevTasks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevTasks[dragIndex]!],
        ],
      }),
    );
  }, []);

  const renderTask = useCallback((task: TodoTaskType, index: number) => {
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
