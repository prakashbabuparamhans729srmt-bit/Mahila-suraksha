
'use client';

import Link from 'next/link';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminContent } from '@/context/admin-content-context';

export default function AddUpdatePage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    photo: null as File | null,
  });
  const { toast } = useToast();
  const { addContent } = useAdminContent();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     if (!formData.title || !formData.content) {
        toast({
            variant: "destructive",
            title: "त्रुटि",
            description: "कृपया शीर्षक और सामग्री दोनों भरें।",
        });
        return;
    }
    
    addContent({
      title: formData.title,
      type: 'अपडेट',
      description: formData.content,
      photo: formData.photo,
    });

    toast({
      title: "अपडेट पोस्ट किया गया",
      description: "आपका अपडेट समीक्षा के लिए सफलतापूर्वक सबमिट कर दिया गया है।",
    });
    setFormData({ title: '', content: '', photo: null });
     // Reset file input visually if needed
    const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };


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
        <form onSubmit={handleSubmit}>
          <Card className="w-full bg-secondary/50 border-border">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">अपडेट का शीर्षक</Label>
                <Input id="title" placeholder="जैसे, 'नई हेल्पलाइन शुरू की गई'" className="bg-background" value={formData.title} onChange={handleChange} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">सामग्री</Label>
                <Textarea id="content" placeholder="अपडेट का पूरा पाठ यहाँ लिखें..." className="bg-background min-h-[150px]" value={formData.content} onChange={handleChange} required/>
              </div>
              <div className="space-y-2">
                  <Label>फोटो अपलोड करें (वैकल्पिक)</Label>
                  <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary/50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">अपलोड करने के लिए क्लिक करें</span></p>
                               {formData.photo && <p className="text-xs text-green-500">{formData.photo.name}</p>}
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*"/>
                      </label>
                  </div> 
              </div>
            </CardContent>
          </Card>
          <Button type="submit" className="w-full text-lg h-12 mt-6">अपडेट पोस्ट करें</Button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
}
