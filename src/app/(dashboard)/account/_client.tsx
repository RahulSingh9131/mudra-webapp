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

  const { data: userAccountsData, isLoading: isUserAccountLoading } =
  api.userAccount.getAll.useQuery();

  const renderUserAccounts = () => {
    return match({ isUserAccountLoading })
      .with({ isUserAccountLoading: true }, () => {
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
          {userAccountsData?.map((item) => (
            <UserAccount key={item.id} item={item} />
          ))}
        </div>
      ));
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
    </div>
  );
};

export default AccountPage;
