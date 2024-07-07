'use client';

import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import React from 'react';

const NavBar = () => {
  const router = useRouter();

  const handleSigin = () => {
    router.push('/signin');
  };
  return (
    <div className="flex items-center justify-between px-20 py-6">
      <div>
        {/* Brand Icon Will Come here */}
        <h1 className="text-base font-semibold md:text-lg lg:text-2xl">
          Mudra
        </h1>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="default" onClick={handleSigin}>
          SignIn
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
