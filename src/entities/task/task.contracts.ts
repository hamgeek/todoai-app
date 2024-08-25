import { z } from 'zod';

export const ListTaskByTodoIdSchema = z.object({
  todoId: z.string(),
});

export const CreateTaskSchema = z.object({
  todoId: z.string(),
  title: z.string().min(1).max(32),
});

export const CreateTaskWithAISchema = z.object({
  todoId: z.string(),
  prompt: z.string().min(1).max(64),
});

export const UpdateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(32),
});

export const DeleteTaskSchema = z.object({
  id: z.string(),
});

export const CompleteTaskSchema = z.object({
  id: z.string(),
  isDone: z.boolean(),
});

export const MoveTaskSchema = z.object({
  id: z.string(),
  position: z.number(),
});
