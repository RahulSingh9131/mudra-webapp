import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

import { expenses } from '@/server/db/schema';

import { and, eq } from 'drizzle-orm';

export const expenseRouter = createTRPCRouter({
  // Create a new expense
  create: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        categoryId: z.number().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(expenses).values({
        amount: input.amount.toFixed(2),
        userId: ctx.session.user.id,
        categoryId: input.categoryId ?? 0,
        description: input.description ?? '',
      });
    }),

  // Get all expenses
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.expenses.findMany({
      where: (expenses, { eq }) => eq(expenses.userId, ctx.session.user.id),
      orderBy: (expenses, { desc }) => [desc(expenses.createdAt)],
    });
  }),

  // Get an expense by ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.expenses.findFirst({
        where: (expenses, { and, eq }) =>
          and(
            eq(expenses.id, input.id),
            eq(expenses.userId, ctx.session.user.id)
          ),
      });
    }),

  // Update an expense
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        amount: z.number(),
        categoryId: z.number().optional(),
        description: z.string().optional(),
        date: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(expenses)
        .set({
          amount: input.amount.toFixed(2),
          categoryId: input.categoryId,
          description: input.description,
          date: input.date,
        })
        .where(
          and(
            eq(expenses.id, input.id),
            eq(expenses.userId, ctx.session.user.id)
          )
        );
    }),

  // Delete an expense
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(expenses)
        .where(
          and(
            eq(expenses.id, input.id),
            eq(expenses.userId, ctx.session.user.id)
          )
        );
    }),
});
