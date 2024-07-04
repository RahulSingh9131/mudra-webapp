import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect('/signin');
  }

  return <div>I am authenticated</div>;
}
