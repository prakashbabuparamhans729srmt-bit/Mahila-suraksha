
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type VoiceSearchContextType = {
  isVoiceSearchOpen: boolean;
  openVoiceSearch: () => void;
  closeVoiceSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const VoiceSearchContext = createContext<VoiceSearchContextType | undefined>(undefined);

export const VoiceSearchProvider = ({ children }: { children: ReactNode }) => {
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openVoiceSearch = () => setIsVoiceSearchOpen(true);
  const closeVoiceSearch = () => setIsVoiceSearchOpen(false);

  return (
    <VoiceSearchContext.Provider value={{ isVoiceSearchOpen, openVoiceSearch, closeVoiceSearch, searchQuery, setSearchQuery }}>
      {children}
    </VoiceSearchContext.Provider>
  );
};

export const useVoiceSearch = () => {
  const context = useContext(VoiceSearchContext);
  if (context === undefined) {
    throw new Error('useVoiceSearch must be used within a VoiceSearchProvider');
  }
  return context;
};
