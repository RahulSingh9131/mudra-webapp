import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import LayoutWrapper from '@/app/_layouts/layout-wrapper';
import PaymentForm from '@/app/_components/PaymentForm';

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <LayoutWrapper>
      <main className="h-full w-full rounded-3xl">
        <div className="p-5">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <PaymentForm />
        </div>
      </main>
    </LayoutWrapper>
  );
}
