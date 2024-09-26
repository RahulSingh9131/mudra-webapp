import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import LayoutWrapper from '@/app/_layouts/layout-wrapper';
import DashboardPage from './_client';

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <LayoutWrapper>
      <main className="h-full w-full rounded-3xl">
        <div className="p-5">
          <DashboardPage />
        </div>
      </main>
    </LayoutWrapper>
  );
}
