import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { investment } from '@/server/db/schema';
import { and, eq, gt, desc } from 'drizzle-orm';

export const investmentRouter = createTRPCRouter({
  // create an investment
  create: protectedProcedure
    .input(
      z.object({
        investedAmount: z
          .number()
          .min(50, 'Investment must be at least 50 rupees.'),
        investedIn: z.number(),
        accountId: z.number(),
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

  getAll: protectedProcedure
    .input(
      z.object({
        cursor: z.number().optional(),
        pageSize: z.number().default(9),
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, cursor } = input;

      const paginatedInvestment = await ctx.db
        .select()
        .from(investment)
        .where(
          and(
            eq(investment.investedBy, ctx.session.user.id),
            cursor ? gt(investment.id, cursor) : undefined
          )
        )
        .limit(pageSize + 1)
        .orderBy(desc(investment.investmentTime));

      let nextCursor: typeof cursor | undefined = undefined;
      if (paginatedInvestment.length > pageSize) {
        const nextItem = paginatedInvestment.pop();
        nextCursor = nextItem!.id;
      }
      return { paginatedInvestment, nextCursor };
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
        investedIn: z.number().optional(),
        accountId: z.number().optional(),
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
