import { relations, sql } from 'drizzle-orm';
import {
  decimal,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { type AdapterAccount } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `mudra_${name}`);

// posts table
export const posts = createTable(
  'post',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    createdById: varchar('createdById', { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true }),
  },
  (example) => ({
    createdByIdIdx: index('createdById_idx').on(example.createdById),
    nameIndex: index('name_idx').on(example.name),
  })
);

// categories table
export const categories = createTable(
  'category',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    createdById: varchar('createdById', { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (category) => ({
    nameIdx: index('category_name_idx').on(category.name),
    createdByIdIdx: index('category_createdById_idx').on(category.createdById),
  })
);

export const categoriesRelations = relations(categories, ({ one }) => ({
  user: one(users, {
    fields: [categories.createdById],
    references: [users.id],
  }),
}));

// income table
export const incomes = createTable(
  'income',
  {
    id: serial('id').primaryKey(),
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    accountId: varchar('accountId', { length: 255 })
      .notNull()
      .references(() => userAccounts.id),
    categoryId: integer('categoryId')
      .notNull()
      .references(() => categories.id),
    description: text('description'),
    date: timestamp('date', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (income) => ({
    userIdIdx: index('income_userId_idx').on(income.userId),
    accountIdIdx: index('income_accountId_idx').on(income.accountId),
    categoryIdIdx: index('income_categoryId_idx').on(income.categoryId),
    dateIdx: index('income_date_idx').on(income.date),
  })
);

export const incomesRelations = relations(incomes, ({ one }) => ({
  user: one(users, { fields: [incomes.userId], references: [users.id] }),
  account: one(userAccounts, {
    fields: [incomes.accountId],
    references: [userAccounts.id],
  }),
  category: one(categories, {
    fields: [incomes.categoryId],
    references: [categories.id],
  }),
}));

// expense table

export const expenses = createTable(
  'expense',
  {
    id: serial('id').primaryKey(),
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id),
    accountId: varchar('accountId', { length: 255 })
      .notNull()
      .references(() => userAccounts.id),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    categoryId: integer('categoryId')
      .notNull()
      .references(() => categories.id),
    description: text('description'),
    date: timestamp('date', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (expense) => ({
    userIdIdx: index('expense_userId_idx').on(expense.userId),
    accountIdIdx: index('income_accountId_idx').on(expense.accountId),
    categoryIdIdx: index('expense_categoryId_idx').on(expense.categoryId),
    dateIdx: index('expense_date_idx').on(expense.date),
  })
);

export const expenseRelations = relations(expenses, ({ one }) => ({
  user: one(users, { fields: [expenses.userId], references: [users.id] }),
  account: one(userAccounts, {
    fields: [expenses.accountId],
    references: [userAccounts.id],
  }),
  category: one(categories, {
    fields: [expenses.categoryId],
    references: [categories.id],
  }),
}));

// users table
export const users = createTable('user', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar('image', { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

// user account table
export const userAccounts = createTable(
  'user_acount',
  {
    id: serial('id').primaryKey(),
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id),
    accountName: varchar('accountName', { length: 50 }).notNull(),
    balance: decimal('balance', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (userAccount) => ({
    userIdIdx: index('user_account_userId_idx').on(userAccount.userId),
  })
);

// account table
export const accounts = createTable(
  'account',
  {
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index('account_userId_idx').on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

// session table
export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('sessionToken', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp('expires', {
      mode: 'date',
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const investment = createTable(
  'investment',
  {
    id: serial('id').primaryKey(),
    investedAmount: integer('investedAmount').notNull(),
    investedBy: varchar('investedBy', { length: 255 })
      .notNull()
      .references(() => users.id),
    accountId: varchar('accountId', { length: 255 })
      .notNull()
      .references(() => userAccounts.id),
    investedIn: varchar('investedIn', { length: 255 })
      .notNull()
      .references(() => categories.id),
    investmentTime: timestamp('investmentTime', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    investmentWithdrawlTime: timestamp('investmentWithdrawlTime', {
      withTimezone: true,
    }),
  },
  (investment) => ({
    investmentIndex: index('investedInIndex').on(investment.investedIn),
    accountIdIdx: index('investment_accountId_idx').on(investment.accountId),
  })
);

export const investmentRelations = relations(investment, ({ one }) => ({
  user: one(users, { fields: [investment.investedBy], references: [users.id] }),
  account: one(userAccounts, {
    fields: [investment.accountId],
    references: [userAccounts.id],
  }),
  category: one(categories, {
    fields: [investment.investedIn],
    references: [categories.id],
  }),
}));
