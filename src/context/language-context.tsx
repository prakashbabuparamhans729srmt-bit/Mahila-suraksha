'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { defaultLocale, locales } from '@/lib/translations/locales';
import initialMessages from '@/lib/translations/hi.json';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState(defaultLocale);
  const [messages, setMessages] = useState<Record<string, string>>(initialMessages);

  useEffect(() => {
    const loadMessages = async () => {
      if (locale === defaultLocale) {
          setMessages(initialMessages);
          return;
      }
      try {
        const newMessages = await import(`@/lib/translations/${locale}.json`);
        setMessages(newMessages.default);
      } catch (error) {
        console.error(`Could not load messages for locale: ${locale}`, error);
        // Fallback to default locale if messages for the selected one are not found
        const defaultMsgs = await import(`@/lib/translations/${defaultLocale}.json`);
        setMessages(defaultMsgs.default);
        setLocaleState(defaultLocale);
      }
    };
    loadMessages();
  }, [locale]);

  const t = useCallback((key: string, params?: { [key: string]: string | number }) => {
    let message = messages[key] || key;
    if (params) {
      Object.keys(params).forEach(paramKey => {
        message = message.replace(`{${paramKey}}`, String(params[paramKey]));
      });
    }
    return message;
  }, [messages]);
  
  const setLocale = useCallback((newLocale: string) => {
    setLocaleState(newLocale);
  }, []);


  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
