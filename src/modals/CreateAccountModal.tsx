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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';
import { banks } from '@/lib/constants';

type CreateAccountModalProps = {
  open: boolean;
  setIsOpen: (val: boolean) => void;
};

const CreateAccountModal = ({ open, setIsOpen }: CreateAccountModalProps) => {
  const [userAccount, setUserAccount] = useState({
    accountName: '',
    balance: '',
  });
  const [isCustomBank, setIsCustomBank] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserAccount((prevValue) => ({
      ...prevValue,
      [name]: name === 'balance' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleBankSelect = (bankValue: string) => {
    if (bankValue === 'other') {
      setIsCustomBank(true);
      setSelectedBank('');
    } else {
      setIsCustomBank(false);
      setSelectedBank(bankValue);
      setUserAccount((prevValue) => ({ ...prevValue, accountName: bankValue }));
    }
    setOpenPopover(false);
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
              Bank Name
            </Label>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openPopover}
                  className="col-span-3 w-full justify-between"
                >
                  {selectedBank
                    ? banks.find((bank) => bank.value === selectedBank)?.label
                    : 'Select bank...'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0">
                <Command>
                  <CommandInput placeholder="Search bank..." className="h-9" />
                  <CommandList className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 max-h-60 overflow-y-auto">
                    <CommandEmpty>No bank found.</CommandEmpty>
                    <CommandGroup>
                      {banks.map((bank) => (
                        <CommandItem
                          key={bank.value}
                          value={bank.value}
                          onSelect={() => handleBankSelect(bank.value)}
                        >
                          {bank.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          {isCustomBank && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customBank" className="whitespace-nowrap">
                Custom Bank
              </Label>
              <Input
                id="customBank"
                name="accountName"
                value={userAccount.accountName}
                onChange={handleAccountChange}
                className="col-span-3"
                placeholder="Enter custom bank name"
              />
            </div>
          )}
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
              placeholder="Enter balance"
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
