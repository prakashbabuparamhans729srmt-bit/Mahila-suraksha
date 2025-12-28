'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Video, Brain, Link2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function AddContentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">सामग्री जोड़ें</h1>
      </header>

      <main className="p-4 space-y-6">
        <p className="text-muted-foreground px-1">
          शिक्षा और जागरूकता अनुभाग के लिए नई सामग्री जोड़ें।
        </p>
        <Card className="w-full bg-secondary/50 border-border">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content-type">सामग्री का प्रकार</Label>
              <Select>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="एक प्रकार चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article"><div className="flex items-center"><FileText className="mr-2 h-4 w-4" />लेख</div></SelectItem>
                  <SelectItem value="video"><div className="flex items-center"><Video className="mr-2 h-4 w-4" />वीडियो</div></SelectItem>
                  <SelectItem value="quiz"><div className="flex items-center"><Brain className="mr-2 h-4 w-4" />प्रश्नोत्तरी</div></SelectItem>
                  <SelectItem value="resource"><div className="flex items-center"><Link2 className="mr-2 h-4 w-4" />संसाधन</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">शीर्षक</Label>
              <Input id="title" placeholder="सामग्री का शीर्षक" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">विवरण या यूआरएल</Label>
              <Textarea id="description" placeholder="यदि यह एक लेख है तो सामग्री लिखें, या यदि यह वीडियो या संसाधन है तो URL पेस्ट करें..." className="bg-background min-h-[120px]" />
            </div>
          </CardContent>
        </Card>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg h-12">सामग्री सबमिट करें</Button>
      </main>
      <BottomNav />
    </div>
  );
}
