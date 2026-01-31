'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AdminContentProvider } from '@/context/admin-content-context';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect, useRef } from 'react';

function ChatbotFloater() {
  const { toast } = useToast();

  const getInitialPosition = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    return {
      x: window.innerWidth - 80,
      y: window.innerHeight - 160,
    };
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const floaterRef = useRef<HTMLDivElement>(null);
  const hasDragged = useRef(false);
  const returnTimer = useRef<NodeJS.Timeout | null>(null);

  const resetPosition = () => {
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
    setPosition(getInitialPosition());
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
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
      toast({
        title: "चैटबॉट जल्द ही आ रहा है!",
        description: "एक AI सहायक जल्द ही आपकी मदद के लिए उपलब्ध होगा।",
      });
      startReturnTimer();
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging || !floaterRef.current) return;
      
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
  }, [isDragging]);

  return (
    <div
      ref={floaterRef}
      className="fixed z-50 transition-all duration-500 ease-in-out"
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
        className="rounded-full bg-blue-600 hover:bg-blue-700 h-16 w-16 shadow-lg pointer-events-none"
      >
        <MessageCircle className="h-8 w-8 text-white" />
      </Button>
    </div>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Dashboard</title>
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <AdminContentProvider>
              {children}
              <ChatbotFloater />
              <Toaster />
            </AdminContentProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
