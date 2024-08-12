// components/PaymentForm.tsx
'use client';
import React, { useState, type ChangeEvent, type FocusEvent } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CardInput from './creditcard-form';

type CardState = {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: 'number' | 'expiry' | 'cvc' | 'name' | '';
  issuer: string;
};

const fields = [
  { name: 'name', placeholder: 'Account Holder Name', type: 'text' },
  {
    name: 'number',
    placeholder: 'Card Number',
    type: 'text',
    pattern: '[\\d| ]{16,22}',
  },
  {
    name: 'expiry',
    placeholder: 'Expiry Date (MM/YY)',
    type: 'text',
    pattern: '\\d{2}/\\d{2}',
  },
  { name: 'cvc', placeholder: 'CVC', type: 'text', pattern: '\\d{3,4}' },
];

const PaymentForm = () => {
  const [state, setState] = useState<CardState>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    issuer: '',
    focus: '',
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      focus: evt.target.name as 'number' | 'expiry' | 'cvc' | 'name',
    }));
  };

  const handleCallback = ({ issuer }: { issuer: string }, isValid: boolean) => {
    if (isValid) {
      setState((prev) => ({ ...prev, issuer }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', state);
  };

  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-lg bg-white p-6 shadow-lg">
      <div className="flex items-start justify-center">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          issuer={state.issuer}
          focused={state.focus} // Ensure this matches the expected type
        />
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <Card key={field.name} className="flex flex-col">
            <CardInput
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={state[field.name as keyof CardState]}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              pattern={field.pattern}
              callback={handleCallback}
            />
          </Card>
        ))}
        <div className="flex w-full justify-end">
          <Button type="submit">Add Details</Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
