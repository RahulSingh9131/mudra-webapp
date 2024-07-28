'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useTheme } from '../_context/ThemeContext';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <Button onClick={toggleTheme} className="capitalize">
        {theme}
      </Button>
    </div>
  );
};

export default ThemeButton;
