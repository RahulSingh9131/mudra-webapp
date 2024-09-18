'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type CreateAccountModalProps = {
  open: boolean;
  setIsOpen: (val: boolean) => void;
};

const CreateAccountModal = ({ open, setIsOpen }: CreateAccountModalProps) => {
  const [userAccount, setUserAccount] = useState({
    accountName: '',
    balance: '',
  });

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserAccount((prevValue) => ({
      ...prevValue,
      [name]: name === 'balance' ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    console.log('submitted');
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogTrigger>
        <Button variant="outline" className="invisible">
          Add Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>
            Add Your bank account name and balance to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountName" className="whitespace-nowrap">
              Accont Name
            </Label>
            <Input
              id="accountName"
              name="accountName"
              value={userAccount.accountName}
              onChange={handleAccountChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="balance" className="whitespace-nowrap">
              Balance
            </Label>
            <Input
              id="balance"
              name="balance"
              type="number"
              value={userAccount.balance}
              onChange={handleAccountChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountModal;
