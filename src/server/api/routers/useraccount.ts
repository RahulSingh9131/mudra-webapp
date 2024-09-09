import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

import { userAccounts } from '@/server/db/schema';

import { and, eq } from 'drizzle-orm';

export const userAccountsRouter = createTRPCRouter({
  // create a user bank account
  create: protectedProcedure
    .input(
      z.object({
        accountName: z.string().max(50),
        balance: z.number().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(userAccounts).values({
        userId: ctx.session.user.id,
        accountName: input.accountName,
        balance: input.balance.toFixed(2),
      });
    }),

  // get all user accounts
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.userAccounts.findMany({
      where: (userAccounts, { eq }) =>
        eq(userAccounts.userId, ctx.session.user.id),
      orderBy: (userAccounts, { desc }) => [desc(userAccounts.createdAt)],
    });
  }),
  //   get user bank account by Id
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.userAccounts.findFirst({
        where: (userAccounts, { and, eq }) =>
          and(
            eq(userAccounts.id, input.id),
            eq(userAccounts.userId, ctx.session.user.id)
          ),
      });
    }),
  // update user bank account
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        accountName: z.string().max(50).optional(),
        balance: z.number().min(0).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(userAccounts)
        .set({
          accountName: input.accountName,
          balance: input.balance?.toFixed(2),
        })
        .where(
          and(
            eq(userAccounts.id, input.id),
            eq(userAccounts.userId, ctx.session.user.id)
          )
        );
    }),
  // delete user bank account
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(userAccounts)
        .where(
          and(
            eq(userAccounts.id, input.id),
            eq(userAccounts.userId, ctx.session.user.id)
          )
        );
    }),
});
