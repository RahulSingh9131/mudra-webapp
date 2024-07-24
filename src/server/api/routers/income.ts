import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

import { incomes } from '@/server/db/schema';

import { and, eq } from 'drizzle-orm';

export const incomeRouter = createTRPCRouter({
  // Create a new income
  create: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        categoryId: z.number().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(incomes).values({
        amount: input.amount.toString(),
        userId: ctx.session.user.id,
        categoryId: input.categoryId ?? 0,
        description: input.description ?? '',
      });
    }),

  // Get all incomes
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.incomes.findMany({
      where: (incomes, { eq }) => eq(incomes.userId, ctx.session.user.id),
      orderBy: (incomes, { desc }) => [desc(incomes.createdAt)],
    });
  }),

  // Get a income by ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.incomes.findFirst({
        where: (incomes, { and, eq }) =>
          and(
            eq(incomes.id, input.id),
            eq(incomes.userId, ctx.session.user.id)
          ),
      });
    }),

  // Update a income
  update: protectedProcedure
    .input(z.object({ id: z.number(), amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(incomes)
        .set({
          amount: input.amount as unknown as string,
        })
        .where(
          and(eq(incomes.id, input.id), eq(incomes.userId, ctx.session.user.id))
        );
    }),

  // Delete a income
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(incomes)
        .where(
          and(eq(incomes.id, input.id), eq(incomes.userId, ctx.session.user.id))
        );
    }),
});
