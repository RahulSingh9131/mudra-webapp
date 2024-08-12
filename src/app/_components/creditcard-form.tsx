// components/CardInput.tsx
import { Input } from '@/components/ui/input';
import React, { type ChangeEvent, type FocusEvent } from 'react';
import Payment from 'payment';

// Define possible card types as a TypeScript union type
type CardType =
  | 'visa'
  | 'mastercard'
  | 'discover'
  | 'amex'
  | 'jcb'
  | 'dinersclub'
  | 'maestro'
  | 'laser'
  | 'unionpay'
  | 'elo'
  | 'hipercard'
  | 'unknown'; // fallback if the type can't be determined

type CardInputProps = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  pattern?: string;
  callback: (type: { issuer: CardType }, isValid: boolean) => void;
};

const CardInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  className = '',
  pattern,
  callback,
}: CardInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(e);

    // Determine the card issuer and validity using the payment library
    const cardType = Payment.fns.cardType(value);
    const issuer: CardType = cardType ? (cardType as CardType) : 'unknown';
    const isValid = Payment.fns.validateCardNumber(value);

    // Invoke callback with issuer and validity status
    callback({ issuer }, isValid);
  };

  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      className={`w-full ${className}`}
      pattern={pattern}
    />
  );
};

export default CardInput;
