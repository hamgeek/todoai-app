import { TRPCError } from '@trpc/server';
import Groq from 'groq-sdk';

import {
  CompleteTaskSchema,
  CreateTaskSchema,
  CreateTaskWithAISchema,
  DeleteTaskSchema,
  ListTaskByTodoIdSchema,
  MoveTaskSchema,
  UpdateTaskSchema,
} from '@/entities/task';
import { env } from '@/env';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const taskRouter = createTRPCRouter({
  listByTodoId: protectedProcedure
    .input(ListTaskByTodoIdSchema)
    .query(async ({ input, ctx }) => {
      const todo = await ctx.db.todo.findUnique({
        where: {
          id: input.todoId,
        },
      });

      if (!todo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Todo with id ${input.todoId}`,
        });
      }

      if (todo.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to access this Task List',
        });
      }

      const taskList = ctx.db.todo.findUnique({
        where: {
          id: input.todoId,
        },
        include: {
          tasks: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      });

      return taskList;
    }),
  create: protectedProcedure
    .input(CreateTaskSchema)
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.db.todo.findUnique({
        where: {
          id: input.todoId,
        },
        include: {
          tasks: true,
        },
      });

      if (!todo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Todo with id ${input.todoId}`,
        });
      }

      if (todo.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to access this Task List',
        });
      }

      const createTask = await ctx.db.task.create({
        data: {
          title: input.title,
          todoId: input.todoId,
          isDone: false,
          position: todo.tasks.length + 1,
        },
      });

      return createTask;
    }),

  createWithAI: protectedProcedure
    .input(CreateTaskWithAISchema)
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.db.todo.findUnique({
        where: {
          id: input.todoId,
        },
        include: {
          tasks: true,
        },
      });

      if (!todo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Todo with id ${input.todoId}`,
        });
      }

      if (todo.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to access this Task List',
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const groq = new Groq({ apiKey: env.GROQ_APIKEY });

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `
              Anda adalah asisten virtual yang berfungsi untuk membantu pengguna membuat dan mengelola daftar tugas (todo list). Tugas utama Anda adalah menghasilkan array yang berisi item-item todo list berdasarkan perintah pengguna. 

              Jika pengguna memberikan perintah atau deskripsi yang berkaitan dengan pembuatan todo list, Anda harus merespons dengan array yang berisi item-item dalam daftar tersebut. Misalnya:

              - Perintah: "Buatkan daftar tugas untuk hari ini."
                Respon: ["Tugas 1", "Tugas 2", "Tugas 3"]

              - Perintah: "Tambahkan 'Belanja bahan makanan' ke dalam daftar tugas."
                Respon: ["Belanja bahan makanan"]

              Berikan array todo list yang sesuai dengan konteks perintah yang diberikan oleh pengguna.
            `,
          },
          {
            role: 'user',
            content: `${input.prompt}`,
          },
        ],
        model: 'llama3-70b-8192',
      });

      const responseText = completion.choices[0]?.message.content ?? '';

      // start extract array from text

      const regex = /\[(.*?)\]/s;
      const matchArray = regex.exec(responseText);

      if (!matchArray) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `NOT_RESULT_FOUND`,
        });
      }

      if (matchArray) {
        const arrayStr = matchArray[0];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: string[] = JSON.parse(arrayStr);

        let countPositionTemp = todo.tasks.length;

        const createTasks = result.map(async (item: string) => {
          const perform = ctx.db.task.create({
            data: {
              title: item,
              todoId: input.todoId,
              isDone: false,
              position: countPositionTemp + 1,
            },
          });

          countPositionTemp += 1;

          return perform;
        });

        const create = await Promise.all(createTasks);

        return create;
      }

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `MUST_TODO_PROMPT`,
      });
    }),
  update: protectedProcedure
    .input(UpdateTaskSchema)
    .mutation(async ({ input, ctx }) => {
      const findTask = await ctx.db.task.findUnique({
        where: {
          id: input.id,
        },
        include: {
          todo: true,
        },
      });

      if (!findTask) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Task with id ${input.id}`,
        });
      }

      if (findTask.todo.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to update this Task',
        });
      }

      const updateTask = await ctx.db.task.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });

      return updateTask;
    }),
  complete: protectedProcedure
    .input(CompleteTaskSchema)
    .mutation(async ({ input, ctx }) => {
      const findTask = await ctx.db.task.findUnique({
        where: {
          id: input.id,
        },
        include: {
          todo: true,
        },
      });

      if (!findTask) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Task with id ${input.id}`,
        });
      }

      if (findTask.todo.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to update this Task',
        });
      }

      const completeTask = await ctx.db.task.update({
        where: {
          id: input.id,
        },
        data: {
          isDone: input.isDone,
        },
      });

      return completeTask;
    }),
  move: protectedProcedure
    .input(MoveTaskSchema)
    .mutation(async ({ input, ctx }) => {
      const findTask = await ctx.db.task.findUnique({
        where: {
          id: input.id,
        },
        include: {
          todo: true,
        },
      });

      if (!findTask) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Task with id ${input.id}`,
        });
      }

      if (findTask.todo.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to update this Task',
        });
      }

      const taskList = await ctx.db.todo.findUnique({
        where: {
          id: findTask.todoId,
        },
        include: {
          tasks: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      });

      const taskIdList = taskList?.tasks.map((task) => task.id);

      if (!taskIdList?.includes(input.id)) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Error Parsing Task List`,
        });
      }

      const currentTaskIndex = taskIdList?.indexOf(input.id);

      if (currentTaskIndex !== -1) {
        taskIdList.splice(currentTaskIndex, 1);
        taskIdList.splice(input.position, 0, input.id);
      }

      const updateTasks = taskIdList.map(async (taskId, index) => {
        return ctx.db.task.update({
          where: {
            id: taskId,
          },
          data: {
            position: index + 1,
          },
        });
      });

      await Promise.all(updateTasks);
    }),
  delete: protectedProcedure
    .input(DeleteTaskSchema)
    .mutation(async ({ input, ctx }) => {
      const findTask = await ctx.db.task.findUnique({
        where: {
          id: input.id,
        },
        include: {
          todo: true,
        },
      });

      if (!findTask) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Task with id ${input.id}`,
        });
      }

      if (findTask.todo.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to delete this Task',
        });
      }

      const deleteTask = await ctx.db.task.delete({
        where: {
          id: input.id,
        },
      });

      if (deleteTask) {
        const taskList = await ctx.db.todo.findUnique({
          where: {
            id: findTask.todoId,
          },
          include: {
            tasks: {
              orderBy: {
                position: 'asc',
              },
            },
          },
        });

        const taskIdList = taskList?.tasks.map((task) => task.id);

        if (taskIdList && taskIdList.length > 0) {
          const updateTasks = taskIdList.map(async (taskId, index) => {
            return ctx.db.task.update({
              where: {
                id: taskId,
              },
              data: {
                position: index + 1,
              },
            });
          });

          await Promise.all(updateTasks);
        }
      }

      return deleteTask;
    }),
});
