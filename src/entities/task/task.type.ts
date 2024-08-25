import { type z } from 'zod';

import {
  type CompleteTaskSchema,
  type CreateTaskSchema,
  type CreateTaskWithAISchema,
  type DeleteTaskSchema,
  type MoveTaskSchema,
  type UpdateTaskSchema,
} from './task.contracts';

export type TaskType = {
  id: string;
  todoId: string;
  title: string;
  isDone: boolean;
  position: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>;
export type CreateTaskWithAISchemaType = z.infer<typeof CreateTaskWithAISchema>;
export type UpdateTaskSchemaType = z.infer<typeof UpdateTaskSchema>;
export type DeleteTaskSchemaType = z.infer<typeof DeleteTaskSchema>;
export type CompleteTaskSchemaType = z.infer<typeof CompleteTaskSchema>;
export type MoveTaskSchemaType = z.infer<typeof MoveTaskSchema>;
