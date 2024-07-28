import LayoutWrapper from '@/app/_layouts/layout-wrapper';
import React from 'react';

const goals = () => {
  return (
    <LayoutWrapper>
      <main className="h-full w-full rounded-3xl">
        <div className="p-5">
          <h1 className="text-2xl font-bold text-foreground">Goals</h1>
        </div>
      </main>
    </LayoutWrapper>
  );
};

export default goals;
