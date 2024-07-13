import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import LogoutButton from './_client';
import ThemeButton from '@/app/_components/theme-button';

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <div className="h-screen  py-5 pl-28 pr-5">
      <main className="h-full w-full rounded-3xl">
        <div className="p-5">
          <h1 className="text-2xl font-bold text-foreground">
            I am authenticated
          </h1>
          <div className="my-3 flex space-x-3">
            <LogoutButton />
            <ThemeButton />
          </div>
        </div>
      </main>
    </div>
  );
}
