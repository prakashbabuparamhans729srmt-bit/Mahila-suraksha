'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (consent !== 'true') {
        setVisible(true);
      }
    } catch (e) {
      // If localStorage is not available, we might need to show it.
      setVisible(true);
    }
  }, []);

  const acceptConsent = () => {
    try {
      localStorage.setItem('cookie_consent', 'true');
    } catch (e) {
        // localStorage may not be available
    }
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[200] p-4 bg-secondary/90 backdrop-blur-sm border-t border-border animate-in slide-in-from-bottom-full"
      )}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <Cookie className="h-8 w-8 text-primary hidden sm:block" />
          <p className="text-sm text-foreground">
            {t('CookieConsent.message')}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
            <Button onClick={acceptConsent}>{t('CookieConsent.accept')}</Button>
        </div>
      </div>
    </div>
  );
}
