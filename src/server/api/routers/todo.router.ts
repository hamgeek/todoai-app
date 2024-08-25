import { TRPCError } from '@trpc/server';

import {
  CreateTodoSchema,
  DeleteTodoSchema,
  UpdateTodoSchema,
} from '@/entities/todo';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const todoRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const todoList = await ctx.db.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return todoList;
  }),
  create: protectedProcedure
    .input(CreateTodoSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.todo.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
        },
      });
    }),
  update: protectedProcedure
    .input(UpdateTodoSchema)
    .mutation(async ({ input, ctx }) => {
      const findTodo = await ctx.db.todo.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!findTodo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Todo with id ${input.id}`,
        });
      }

      if (findTodo.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to update this Todo',
        });
      }

      const updateTodo = await ctx.db.todo.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });

      return updateTodo;
    }),
  delete: protectedProcedure
    .input(DeleteTodoSchema)
    .mutation(async ({ input, ctx }) => {
      const findTodo = await ctx.db.todo.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!findTodo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Todo with id ${input.id}`,
        });
      }

      if (findTodo.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to delete this Todo',
        });
      }

      const deleteTodo = await ctx.db.todo.delete({
        where: {
          id: input.id,
        },
      });

      return deleteTodo;
    }),
});
