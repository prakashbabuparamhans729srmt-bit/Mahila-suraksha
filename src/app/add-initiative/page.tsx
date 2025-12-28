'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function AddInitiativePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">पहल जोड़ें</h1>
      </header>

      <main className="p-4 space-y-6">
        <p className="text-muted-foreground px-1">
          डेटाबेस में एक नई सामुदायिक पहल या परियोजना जोड़ें।
        </p>
        <Card className="w-full bg-secondary/50 border-border">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">पहल का नाम</Label>
              <Input id="title" placeholder="जैसे, 'जागरूकता अभियान 2024'" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">विवरण</Label>
              <Textarea id="description" placeholder="पहल के लक्ष्यों और गतिविधियों का वर्णन करें..." className="bg-background min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-audience">लक्षित दर्शक</Label>
              <div className="relative">
                <Input id="target-audience" placeholder="जैसे, 'कॉलेज के छात्र'" className="bg-background pl-10" />
                <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="kpi">मुख्य प्रदर्शन संकेतक (KPI)</Label>
               <div className="relative">
                <Input id="kpi" placeholder="जैसे, '10,000 लोगों तक पहुँचना'" className="bg-background pl-10" />
                 <Target className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
               </div>
            </div>
          </CardContent>
        </Card>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg h-12">पहल जोड़ें</Button>
      </main>
      <BottomNav />
    </div>
  );
}
