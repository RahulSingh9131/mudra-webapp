import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { investment } from '@/server/db/schema';

export const investmentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        investedAmount: z
          .number()
          .min(50, 'Investment must be at least 50 rupees.'),
        investedBy: z.string(),
        investedIn: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(investment).values({
        investedAmount: input.investedAmount,
        investedBy: input.investedBy,
        investedIn: input.investedIn,
        investmentTime: new Date(),
        investmentWithdrawlTime: new Date(),
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.investment.findMany({
      where: (investment, { eq }) =>
        eq(investment.investedBy, ctx.session.user.id),
      orderBy: (investment, { desc }) => [desc(investment.investmentTime)],
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const investmentRecord = await ctx.db.query.investment.findFirst({
        where: (investment, { eq }) => eq(investment.id, input.id),
      });
      if (!investmentRecord) {
        throw new Error(`Investment with ID ${input.id} not found.`);
      }
      return investmentRecord;
    }),
});
