import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { investment } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';

export const investmentRouter = createTRPCRouter({
  // create an investment
  create: protectedProcedure
    .input(
      z.object({
        investedAmount: z
          .number()
          .min(50, 'Investment must be at least 50 rupees.'),
        investedIn: z.string(),
        accountId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(investment).values({
        investedAmount: input.investedAmount,
        investedBy: ctx.session.user.id,
        investedIn: input.investedIn,
        accountId: input.accountId,
        investmentTime: new Date(),
      });
    }),

  // get all investment of a user

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.investment.findMany({
      where: (investment, { eq }) =>
        eq(investment.investedBy, ctx.session.user.id),
      orderBy: (investment, { desc }) => [desc(investment.investmentTime)],
      with: {
        category: true,
        account: true,
      },
    });
  }),

  // get an investment by Id

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.investment.findFirst({
        where: (investment, { and, eq }) =>
          and(
            eq(investment.id, input.id),
            eq(investment.investedBy, ctx.session.user.id)
          ),
        with: {
          category: true,
          account: true,
        },
      });
    }),

  // update an investment

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        investedAmount: z.number().optional(),
        investedIn: z.string().optional(),
        accountId: z.string().optional(),
        investmentWithdrawlTime: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(investment)
        .set({
          investedAmount: input.investedAmount,
          investedIn: input.investedIn,
          accountId: input.accountId,
          investmentWithdrawlTime: input.investmentWithdrawlTime,
        })
        .where(
          and(
            eq(investment.id, input.id),
            eq(investment.investedBy, ctx.session.user.id)
          )
        );
    }),

  // delete an investment

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(investment)
        .where(
          and(
            eq(investment.id, input.id),
            eq(investment.investedBy, ctx.session.user.id)
          )
        );
    }),
});
