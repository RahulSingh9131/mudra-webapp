'use client';

import { useGetAllUserAccounts } from '@/hooks/useUserAccounts';

import { match, P } from 'ts-pattern';
import EmptyPage from './_empty-page';

const DashboardPage = () => {
  const { data: userAccountsData } = useGetAllUserAccounts();

  console.log(userAccountsData, 'userACcountsData');
  return (
    <div>
      {match(userAccountsData)
        .with(P.nullish, () => <EmptyPage />)
        .with(
          P.when((data) => Array.isArray(data) && data.length === 0),
          () => <EmptyPage />
        )
        .otherwise(() => (
          <div>User accounts available</div>
        ))}
    </div>
  );
};

export default DashboardPage;
