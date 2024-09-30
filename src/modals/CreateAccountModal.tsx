'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { banks } from '@/lib/constants';
import { useCreateUserAccount } from '@/hooks/useUserAccounts';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type CreateAccountModalProps = {
  open: boolean;
  setIsOpen: (val: boolean) => void;
};

const userAccountSchema = z.object({
  accountName: z.string().min(3, 'Bank name is required'),
  balance: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Balance must be greater than 0',
    }),
});

type UserAccountFormValues = z.infer<typeof userAccountSchema>;

const CreateAccountModal = ({ open, setIsOpen }: CreateAccountModalProps) => {
  const [isCustomBank, setIsCustomBank] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<string>('');

  const { mutate: createUserAccount, isPending } = useCreateUserAccount();

  const form = useForm<UserAccountFormValues>({
    resolver: zodResolver(userAccountSchema),
    defaultValues: {
      accountName: '',
      balance: 0,
    },
  });

  const handleBankSelect = (bankValue: string) => {
    if (bankValue === 'other') {
      setIsCustomBank(true);
      setSelectedBank('');
      form.setValue('accountName', '');
    } else {
      setIsCustomBank(false);
      setSelectedBank(bankValue);
      form.setValue('accountName', bankValue);
    }
    setOpenPopover(false);
  };

  const onSubmit = async (data: UserAccountFormValues) => {
    const isValid = await form.trigger();
    if (!isValid) return;

    console.log(data, 'inside onsubmit');

    createUserAccount(data, {
      onSuccess: () => {
        setIsOpen(false);
      },
      onError: (err) => {
        console.log(err, 'error');
      },
    });
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
            Add your bank account name and balance to get started.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="whitespace-nowrap">
                      Bank Name
                    </FormLabel>
                    <Popover open={openPopover} onOpenChange={setOpenPopover}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openPopover}
                          className="col-span-3 w-full justify-between"
                        >
                          {selectedBank
                            ? banks.find((bank) => bank.value === selectedBank)
                                ?.label
                            : 'Select bank...'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search bank..."
                            className="h-9"
                          />
                          <CommandList className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 max-h-60 overflow-y-auto">
                            <CommandEmpty>No bank found.</CommandEmpty>
                            <CommandGroup>
                              {banks.map((bank) => (
                                <CommandItem
                                  key={bank.value}
                                  value={bank.value}
                                  onSelect={() => {
                                    handleBankSelect(bank.value);
                                    field.onChange(bank.value);
                                  }}
                                >
                                  {bank.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="col-span-3" />
                  </FormItem>
                )}
              />
              {isCustomBank && (
                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel>Custom Bank</FormLabel>
                      <FormControl>
                        <Input
                          id="customBank"
                          className="col-span-3"
                          placeholder="Enter custom bank name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="col-span-3 text-red-500" />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="whitespace-nowrap">Balance</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        id="balance"
                        className="col-span-3"
                        placeholder="Enter balance"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit">
                {isPending ? (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Save changes'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountModal;
