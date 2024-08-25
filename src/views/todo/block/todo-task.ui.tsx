/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Checkbox } from '@nextui-org/react';
import { type Identifier, type XYCoord } from 'dnd-core';
import { GripVertical } from 'lucide-react';
import { type ChangeEvent, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  type TaskType,
  useCompleteTask,
  useMoveTask,
  useUpdateTask,
} from '@/entities/task';
import { DeleteTaskModal } from '@/features/task';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const ItemTypes = {
  TASK: 'task',
};

export function TodoTask({
  id,
  data,
  index,
  moveTask,
}: {
  id: string;
  data: TaskType;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
}) {
  const { handleCompleteTask } = useCompleteTask();
  const { handleMoveTask } = useMoveTask();

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.TASK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveTask(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end(draggedItem) {
      handleMoveTask(draggedItem.id, draggedItem.index);
    },
  });

  const opacity = isDragging ? 0 : 1;

  const [todoTextValue, setTodoTextValue] = useState(data.title);
  const [todoEditMode, setTodoEditMode] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const { handleUpdateTask } = useUpdateTask();

  const handleSetEditMode = () => {
    setTodoEditMode(true);
    setTimeout(() => {
      editInputRef.current?.focus();
    }, 200);
  };

  const handleOnEditModeBlur = () => {
    if (todoTextValue.length > 0) {
      setTodoEditMode(false);
      handleUpdateTask({
        id: data.id,
        title: todoTextValue,
      });
    }
  };

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTextValue(e.target.value);
  };

  const handleOnCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleCompleteTask(data.id, e.target.checked);
  };

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="flex w-full flex-row items-center justify-between gap-4 rounded-lg bg-slate-200 px-4 py-4"
    >
      <div className="flex flex-row items-center">
        <GripVertical className="flex-shrink-0 cursor-move" size={22} />
      </div>
      <Checkbox
        onChange={handleOnCompleteChange}
        color="primary"
        size="md"
        isSelected={data.isDone}
      />
      <div className="flex flex-grow flex-row items-center">
        {todoEditMode ? (
          <input
            value={todoTextValue}
            onChange={handleOnInputChange}
            onBlur={handleOnEditModeBlur}
            ref={editInputRef}
            type="text"
            className="m-0 flex-grow bg-transparent p-0 text-base text-gray-600"
          />
        ) : (
          <p
            className={`text-base font-normal text-gray-600 ${data.isDone && 'line-through'}`}
            onClick={handleSetEditMode}
          >
            {todoTextValue}
          </p>
        )}
      </div>
      <div className="flex flex-row gap-2">
        <DeleteTaskModal id={data.id} />
      </div>
    </div>
  );
}
