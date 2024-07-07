'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const HomeButtons = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/signin');
  };

  const handleGithubClick = () => {
    window.open('https://github.com/RahulSingh9131/mudra-webapp', '_blank');
  };

  return (
    <div className="flex items-center space-x-3">
      <Button
        onClick={handleExploreClick}
        variant="secondary"
        className="rounded-3xl px-4 py-2"
      >
        Try It For Free
      </Button>
      <Button
        onClick={handleGithubClick}
        variant="secondary"
        className="rounded-3xl px-4 py-2"
      >
        Star On Github
      </Button>
    </div>
  );
};

export default HomeButtons;
