'use client';

import { Button } from '@/components/ui/button';
import CreateAccountModal from '@/modals/CreateAccountModal';
import { useState } from 'react';

const EmptyPage = () => {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  return (
    <div>
      <Button
        variant="default"
        className="rounded-xl px-6 py-4"
        onClick={() => setIsAccountModalOpen(true)}
      >
        Add userAccount
      </Button>
      {isAccountModalOpen && (
        <CreateAccountModal
          open={isAccountModalOpen}
          setIsOpen={setIsAccountModalOpen}
        />
      )}
    </div>
  );
};

export default EmptyPage;
