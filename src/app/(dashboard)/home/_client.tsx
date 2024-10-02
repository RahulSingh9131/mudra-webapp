'use client';

import { match, P } from 'ts-pattern';
import EmptyPage from './_empty-page';
import UserAccount from '@/app/_components/user-account';
import UserAccountSkeleton from '@/skeletons/UserAccountSkeleton';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/trpc/react';

const DashboardPage = () => {
  const { data: userAccountsData, isLoading: isUserAccountLoading } =
    api.userAccount.getLatestThree.useQuery();

  const renderUserAccounts = () => {
    return match({ isUserAccountLoading })
      .with({ isUserAccountLoading: true }, () => {
        return (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <UserAccountSkeleton key={i} />
            ))}
          </div>
        );
      })
      .otherwise(() => (
        <div className="grid grid-cols-3 gap-4">
          {(userAccountsData?.slice(0, 3) ?? []).map((item) => (
            <UserAccount key={item.id} item={item} />
          ))}
        </div>
      ));
  };

  return (
    <div>
      {match(userAccountsData)
        .with(P.nullish, () => <EmptyPage />)
        .with(
          P.when((data) => Array.isArray(data) && data.length === 0),
          () => <EmptyPage />
        )
        .otherwise(() => (
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Dashboard Overview
            </h1>
            <Link
              href="/account"
              className="flex items-center justify-end space-x-2 hover:cursor-pointer"
            >
              <p className="text-base font-bold">See All</p>
              <MoveRight className="h-6 w-6" />
            </Link>
            <div className="mt-6">{renderUserAccounts()}</div>
          </div>
        ))}
    </div>
  );
};

export default DashboardPage;
