import LayoutWrapper from '@/app/_layouts/layout-wrapper';
import React from 'react';

const subscription = () => {
  return (
    <LayoutWrapper>
      <main className="h-full w-full rounded-3xl">
        <div className="p-5">
          <h1 className="text-2xl font-bold text-foreground">Subscription</h1>
        </div>
      </main>
    </LayoutWrapper>
  );
};

export default subscription;
