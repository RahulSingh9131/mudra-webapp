import React from 'react';
import { type AppRouter } from '@/server/api/root';
import { type inferProcedureOutput } from '@trpc/server';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

type UserAccountType = inferProcedureOutput<
  AppRouter['userAccount']['getAll']
>[number];

type UserAccountProps = {
  item: UserAccountType;
};

const UserAccount = ({ item }: UserAccountProps) => {
  return (
    <Card className="flex max-w-sm flex-col items-start p-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {item.accountName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex flex-col gap-1 text-sm text-gray-500">
          <p>Balance: ₹{parseFloat(item.balance).toLocaleString()}</p>
          <p>Added On: {new Date(item.createdAt).toLocaleDateString()}</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default UserAccount;
