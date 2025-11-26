
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">लॉग इन करें</h1>
      </header>

      <main className="p-4 flex items-center justify-center">
        <Card className="w-full max-w-sm bg-secondary/50 border-border">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">वापसी पर स्वागत है!</h2>
              <p className="text-muted-foreground">अपने डैशबोर्ड पर जाने के लिए साइन इन करें</p>
            </div>
            
            <div className="space-y-4">
              <Input 
                type="email" 
                placeholder="ईमेल पता" 
                className="bg-background border-input"
              />
              <Input 
                type="password" 
                placeholder="पासवर्ड"
                className="bg-background border-input"
              />
            </div>
            
            <div className="text-sm">
                <Link href="#" className="text-blue-500 hover:underline">
                    पासवर्ड भूल गए?
                </Link>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-12">
              साइन इन करें
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">खाता नहीं है? </span>
              <Link href="#" className="text-blue-500 hover:underline">
                साइन अप करें
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
