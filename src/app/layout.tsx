
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AdminContentProvider } from '@/context/admin-content-context';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function ChatbotFloater() {
  const { toast } = useToast();

  const handleChatbotClick = () => {
    toast({
      title: "चैटबॉट जल्द ही आ रहा है!",
      description: "एक AI सहायक जल्द ही आपकी मदद के लिए उपलब्ध होगा।",
    });
  };

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <Button
        size="icon"
        className="rounded-full bg-blue-600 hover:bg-blue-700 h-16 w-16 shadow-lg"
        onClick={handleChatbotClick}
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
