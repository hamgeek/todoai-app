import { type z } from 'zod';

import {
  type CreateTodoSchema,
  type DeleteTodoSchema,
  type UpdateTodoSchema,
} from './todo.contracts';

export type TodoType = {
  id: string;
  userId: string;
  title: string;
};

export type CreateTodoSchemaType = z.infer<typeof CreateTodoSchema>;

export type UpdateTodoSchemaType = z.infer<typeof UpdateTodoSchema>;

export type DeleteTodoSchemaType = z.infer<typeof DeleteTodoSchema>;
