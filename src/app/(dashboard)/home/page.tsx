import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import LogoutButton from './_client';
import ThemeButton from '@/app/_components/theme-button';
import { Sidebar, SidebarBody, SidebarLink } from '@/app/_components/sidebar';
import {
  CalendarPlus,
  Goal,
  House,
  ReceiptIndianRupee,
  Wallet,
} from 'lucide-react';

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <Sidebar>
      <div className="flex h-screen">
        <SidebarBody>
          <SidebarLink
            link={{ label: 'Dashboard', href: '/home', icon: <House /> }}
          />
          <SidebarLink
            link={{ label: 'Income', href: '/income', icon: <Wallet /> }}
          />
          <SidebarLink
            link={{
              label: 'Expense',
              href: '/expense',
              icon: <ReceiptIndianRupee />,
            }}
          />
          <SidebarLink
            link={{
              label: 'Subscriptions',
              href: '/subscription',
              icon: <CalendarPlus />,
            }}
          />
          <SidebarLink
            link={{ label: 'Goals', href: '/goals', icon: <Goal /> }}
          />
        </SidebarBody>
        <div className="flex-grow py-5 pl-5 pr-5">
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
      </div>
    </Sidebar>
  );
}
