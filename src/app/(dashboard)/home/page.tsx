import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import LogoutButton from './_client';

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <div className="">
      <h1>I am authenticated</h1>
      <LogoutButton />
    </div>
  );
}
