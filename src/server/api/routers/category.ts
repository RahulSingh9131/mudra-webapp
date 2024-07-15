import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

import { categories } from '@/server/db/schema';

import { and, eq } from 'drizzle-orm';

export const categoryRouter = createTRPCRouter({
  // Create a new category
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(categories).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  // Get all categories
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.categories.findMany({
      orderBy: (categories, { desc }) => [desc(categories.createdAt)],
    });
  }),

  // Get a category by ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.categories.findFirst({
        where: (categories, { eq }) => eq(categories.id, input.id),
      });
    }),

  // Update a category
  update: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(categories)
        .set({
          name: input.name,
        })
        .where(
          and(
            eq(categories.id, input.id),
            eq(categories.createdById, ctx.session.user.id)
          )
        );
    }),

  // Delete a category
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(categories)
        .where(
          and(
            eq(categories.id, input.id),
            eq(categories.createdById, ctx.session.user.id)
          )
        );
    }),
});
