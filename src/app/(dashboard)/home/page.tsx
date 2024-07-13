import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import LogoutButton from './_client';

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <div className="h-screen bg-green-500 py-5 pl-28 pr-5">
      <main className="h-full w-full rounded-3xl bg-primary-foreground">
        <div className="p-5">
          <h1 className="text-2xl font-bold">I am authenticated</h1>
          <LogoutButton />
        </div>
      </main>
    </div>
  );
}
