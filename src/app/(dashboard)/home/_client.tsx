'use client';

import { useGetAllUserAccounts } from '@/hooks/useUserAccounts';

import { match, P } from 'ts-pattern';
import EmptyPage from './_empty-page';
import UserAccount from '@/app/_components/user-account';

const DashboardPage = () => {
  const { data: userAccountsData, isLoading: isUserAccountLoading } =
    useGetAllUserAccounts();

  console.log(userAccountsData, 'userAccountsData');

  const renderUserAccounts = () => {
    return match({ isUserAccountLoading })
      .with({ isUserAccountLoading: true }, () => {
        return (
          <div>
            <p>Loading</p>
          </div>
        );
      })
      .otherwise(() => (
        <div>
          {(userAccountsData?.slice(0, 3) ?? []).map((item) => (
            <div key={item.id}>
              <UserAccount item={item} />
            </div>
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
            <div className="mt-6">{renderUserAccounts()}</div>
          </div>
        ))}
    </div>
  );
};

export default DashboardPage;
