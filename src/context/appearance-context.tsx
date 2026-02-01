'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type TextSize = 'small' | 'medium' | 'large';

type AppearanceContextType = {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
};

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

export const AppearanceProvider = ({ children }: { children: ReactNode }) => {
  const [textSize, setTextSize] = useState<TextSize>('medium');

  return (
    <AppearanceContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </AppearanceContext.Provider>
  );
};

export const useAppearance = () => {
  const context = useContext(AppearanceContext);
  if (context === undefined) {
    throw new Error('useAppearance must be used within an AppearanceProvider');
  }
  return context;
};
