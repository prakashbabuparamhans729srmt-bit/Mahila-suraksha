'use client';

import Link from 'next/link';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function AddUpdatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">अपडेट जोड़ें</h1>
      </header>

      <main className="p-4 space-y-6">
        <p className="text-muted-foreground px-1">
          समुदाय के साथ साझा करने के लिए एक नया समाचार अपडेट या घोषणा जोड़ें।
        </p>
        <Card className="w-full bg-secondary/50 border-border">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">अपडेट का शीर्षक</Label>
              <Input id="title" placeholder="जैसे, 'नई हेल्पलाइन शुरू की गई'" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">सामग्री</Label>
              <Textarea id="description" placeholder="अपडेट का पूरा पाठ यहाँ लिखें..." className="bg-background min-h-[150px]" />
            </div>
            <div className="space-y-2">
                <Label>फोटो अपलोड करें (वैकल्पिक)</Label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">अपलोड करने के लिए क्लिक करें</span></p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div> 
            </div>
          </CardContent>
        </Card>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg h-12">अपडेट पोस्ट करें</Button>
      </main>
      <BottomNav />
    </div>
  );
}
