
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending reset link to:', email);
    toast({
      title: "लिंक भेजा गया!",
      description: "कृपया अपना पासवर्ड रीसेट करने के लिए अपना ईमेल जांचें।",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/login" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">पासवर्ड रीसेट</h1>
      </header>

      <main className="p-4 flex items-center justify-center">
        <Card className="w-full max-w-sm bg-secondary/50 border-border">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">अपना पासवर्ड रीसेट करें</h2>
              <p className="text-muted-foreground">अपना ईमेल दर्ज करें और हम आपको आपके खाते में वापस जाने के लिए एक लिंक भेजेंगे।</p>
            </div>
            
            <form onSubmit={handleReset} className="space-y-4">
              <Input 
                type="email" 
                placeholder="ईमेल पता" 
                className="bg-background border-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            
              <Button type="submit" className="w-full font-bold text-lg h-12">
                रीसेट लिंक भेजें
              </Button>
            </form>
            
            <div className="text-center text-sm">
              <Link href="/login" className="text-primary hover:underline">
                लॉगिन पर वापस जाएं
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
