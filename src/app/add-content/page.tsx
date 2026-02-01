
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
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminContent } from '@/context/admin-content-context';

type ContentType = 'article' | 'video' | 'quiz' | 'resource' | '';

export default function AddContentPage() {
  const [formData, setFormData] = useState({
    contentType: '' as ContentType,
    title: '',
    descriptionOrUrl: '',
  });
  const { toast } = useToast();
  const { addContent } = useAdminContent();

  const handleSelectChange = (value: ContentType) => {
    setFormData({ ...formData, contentType: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contentType || !formData.title || !formData.descriptionOrUrl) {
        toast({
            variant: "destructive",
            title: "त्रुटि",
            description: "कृपया सभी फ़ील्ड भरें।",
        });
        return;
    }
    
    addContent({
      title: formData.title,
      type: formData.contentType,
      description: formData.descriptionOrUrl
    });

    toast({
      title: "सामग्री सबमिट की गई",
      description: "आपकी सामग्री समीक्षा के लिए सफलतापूर्वक सबमिट कर दी गई है।",
    });
    setFormData({ contentType: '', title: '', descriptionOrUrl: '' });
  };

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
        <form onSubmit={handleSubmit}>
          <Card className="w-full bg-secondary/50 border-border">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content-type">सामग्री का प्रकार</Label>
                <Select onValueChange={handleSelectChange} value={formData.contentType} required>
                  <SelectTrigger className="w-full bg-background" id="content-type">
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
                <Input id="title" placeholder="सामग्री का शीर्षक" className="bg-background" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionOrUrl">विवरण या यूआरएल</Label>
                <Textarea id="descriptionOrUrl" placeholder="यदि यह एक लेख है तो सामग्री लिखें, या यदि यह वीडियो या संसाधन है तो URL पेस्ट करें..." className="bg-background min-h-[120px]" value={formData.descriptionOrUrl} onChange={handleChange} required />
              </div>
            </CardContent>
          </Card>
          <Button type="submit" className="w-full text-lg h-12 mt-6">सामग्री सबमिट करें</Button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
}
