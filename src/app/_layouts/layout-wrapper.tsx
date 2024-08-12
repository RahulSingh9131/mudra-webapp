import React from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../_components/sidebar';
import Header from '../_components/header';

import {
  CalendarPlus,
  Goal,
  House,
  ReceiptIndianRupee,
  Wallet,
} from 'lucide-react';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
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

        <div className="flex-grow">
          <Header />
          <div className="flex-grow py-5 pl-5 pr-5">{children}</div>
        </div>
      </div>
    </Sidebar>
  );
};

export default LayoutWrapper;
