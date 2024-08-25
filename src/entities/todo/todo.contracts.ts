import { z } from 'zod';

export const CreateTodoSchema = z.object({
  title: z.string().min(1).max(32),
});

export const UpdateTodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(32),
});

export const DeleteTodoSchema = z.object({
  id: z.string(),
});
