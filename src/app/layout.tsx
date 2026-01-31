
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const floaterRef = useRef<HTMLDivElement>(null);
  const hasDragged = useRef(false);

  useEffect(() => {
    // Initial position on bottom right, checking for window existence for SSR safety.
    if (typeof window !== 'undefined') {
      setPosition({
        x: window.innerWidth - 80,
        y: window.innerHeight - 160,
      });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (floaterRef.current) {
      setIsDragging(true);
      hasDragged.current = false; // Reset on new drag attempt
      offset.current = {
        x: e.clientX - floaterRef.current.getBoundingClientRect().left,
        y: e.clientY - floaterRef.current.getBoundingClientRect().top,
      };
    }
  };

  const handleClick = () => {
      // Only show toast if it was a click, not a drag
      if (hasDragged.current) {
          return;
      }
      toast({
        title: "चैटबॉट जल्द ही आ रहा है!",
        description: "एक AI सहायक जल्द ही आपकी मदद के लिए उपलब्ध होगा।",
      });
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging || !floaterRef.current) return;
      
      // Consider it a drag if mouse moved
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
      setIsDragging(false);
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
