
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AdminContentProvider } from '@/context/admin-content-context';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect, useRef, Suspense } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetDescription } from '@/components/ui/sheet';
import { Chatbot } from '@/components/chatbot';
import { GuestProvider } from '@/context/guest-context';
import { VoiceSearchProvider } from '@/context/voice-search-context';
import { VoiceSearchModal } from '@/components/voice-search-modal';
import { AppearanceProvider, useAppearance } from '@/context/appearance-context';
import { LanguageProvider, useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { CookieConsent } from '@/components/cookie-consent';
import { Loader } from '@/components/loader';


function TranslatedMetadata() {
  const { t, locale } = useTranslation();

  useEffect(() => {
    document.title = t('Dashboard.title');
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', t('Dashboard.metaDescription'));
    }
    document.documentElement.lang = locale;
  }, [t, locale]);

  return null;
}

function ChatbotFloater() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  const [position, setPosition] = useState<{x: number; y: number} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const floaterRef = useRef<HTMLDivElement>(null);
  const hasDragged = useRef(false);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const getInitialPosition = () => {
    if (typeof window === 'undefined') return null;
    return {
      x: window.innerWidth - 80,
      y: window.innerHeight - 160,
    };
  };

  const resetPosition = () => {
    if(floaterRef.current) {
        floaterRef.current.style.transition = 'all 0.5s ease-in-out';
    }
    setPosition(getInitialPosition());
  };

  const startReturnTimer = () => {
    clearReturnTimer();
    returnTimer.current = setTimeout(resetPosition, 10000);
  };
  
  const clearReturnTimer = () => {
    if (returnTimer.current) {
      clearTimeout(returnTimer.current);
      returnTimer.current = null;
    }
  };

  useEffect(() => {
    if (isClient) {
      setPosition(getInitialPosition());
    }
  }, [isClient]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if(floaterRef.current) {
        floaterRef.current.style.transition = 'none';
    }
    clearReturnTimer();
    if (floaterRef.current) {
      setIsDragging(true);
      hasDragged.current = false;
      offset.current = {
        x: e.clientX - floaterRef.current.getBoundingClientRect().left,
        y: e.clientY - floaterRef.current.getBoundingClientRect().top,
      };
    }
  };

  const handleClick = () => {
      if (hasDragged.current) {
          return;
      }
      setIsChatOpen(true);
      startReturnTimer();
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging || !floaterRef.current || !position) return;
      
      if (!hasDragged.current) {
          hasDragged.current = true;
      }

      e.preventDefault();
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };

    const handleWindowMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (hasDragged.current) {
          startReturnTimer();
        }
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('mouseup', handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDragging, position]);

  if (!isClient || !position) {
    return null;
  }

  return (
    <>
      <div
        ref={floaterRef}
        className="fixed z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        <Button
          size="icon"
          className="rounded-full h-16 w-16 shadow-lg"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="bottom" className="h-[90vh] p-0 border-t flex flex-col">
           <SheetHeader className="p-4 border-b">
               <div className="flex justify-between items-center">
                <SheetTitle>{t('ChatbotFloater.title')}</SheetTitle>
                <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                    </Button>
                </SheetClose>
               </div>
               <SheetDescription>
                {t('ChatbotFloater.description')}
               </SheetDescription>
           </SheetHeader>
           <Chatbot />
        </SheetContent>
      </Sheet>
    </>
  );
}


function AppBody({ children }: { children: React.ReactNode }) {
  const { textSize } = useAppearance();
  const textSizeClass = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
  }[textSize];

  return (
      <div className={textSizeClass}>
          <AdminContentProvider>
            <TranslatedMetadata />
            <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader className="h-12 w-12" /></div>}>
              {children}
            </Suspense>
            <ChatbotFloater />
            <Toaster />
            <VoiceSearchModal />
            <CookieConsent />
          </AdminContentProvider>
      </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="description" content="User dashboard" />
        <meta name="manifest" content="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          body::-webkit-scrollbar, html::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */
          body, html {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <AppearanceProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <FirebaseClientProvider>
                  <VoiceSearchProvider>
                    <GuestProvider>
                      <AppBody>
                        {children}
                      </AppBody>
                    </GuestProvider>
                  </VoiceSearchProvider>
              </FirebaseClientProvider>
            </ThemeProvider>
          </AppearanceProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
