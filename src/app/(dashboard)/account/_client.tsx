'use client';
import { Button } from '@/components/ui/button';
import { match } from 'ts-pattern';

import CreateAccountModal from '@/modals/CreateAccountModal';
import React, { useState } from 'react';
import UserAccountSkeleton from '@/skeletons/UserAccountSkeleton';
import UserAccount from '@/app/_components/user-account';
import { api } from '@/trpc/react';

const AccountPage = () => {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    api.userAccount.getAll.useInfiniteQuery(
      { pageSize: 9 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const renderUserAccounts = () => {
    return match({ isLoading })
      .with({ isLoading: true }, () => {
        return (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <UserAccountSkeleton key={i} />
            ))}
          </div>
        );
      })
      .otherwise(() => (
        <div className="grid grid-cols-3 gap-4">
          {data?.pages.flatMap((page) =>
            page.accounts.map((item) => (
              <UserAccount key={item.id} item={item} />
            ))
          )}
        </div>
      ));
  };

  const loadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };
  return (
    <div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="default"
          className="rounded-xl px-6 py-4"
          onClick={() => setIsAccountModalOpen(true)}
        >
          Add userAccount
        </Button>
      </div>
      <div className="mt-6">{renderUserAccounts()}</div>
      {isAccountModalOpen && (
        <CreateAccountModal
          open={isAccountModalOpen}
          setIsOpen={setIsAccountModalOpen}
        />
      )}
      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button onClick={loadMore} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
