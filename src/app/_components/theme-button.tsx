'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useTheme } from '../_context/ThemeContext';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  const buttonText = theme === 'dark' ? 'Light' : 'Dark';

  return (
    <div>
      <Button onClick={toggleTheme} className="capitalize">
        {buttonText}
      </Button>
    </div>
  );
};

export default ThemeButton;
