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
import { useTranslation } from '@/context/language-context';

type ContentType = 'article' | 'video' | 'quiz' | 'resource' | '';

export default function AddContentPage() {
  const { t } = useTranslation();
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
            title: t('Error'),
            description: t('AddContent.errorFillAllFields'),
        });
        return;
    }
    
    addContent({
      title: formData.title,
      type: formData.contentType,
      description: formData.descriptionOrUrl
    });

    toast({
      title: t('AddContent.successTitle'),
      description: t('AddContent.successDescription'),
    });
    setFormData({ contentType: '', title: '', descriptionOrUrl: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">{t('AddContent.title')}</h1>
      </header>

      <main className="p-4 space-y-6">
        <p className="text-muted-foreground px-1">
          {t('AddContent.description')}
        </p>
        <form onSubmit={handleSubmit}>
          <Card className="w-full bg-secondary/50 border-border">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content-type">{t('AddContent.contentTypeLabel')}</Label>
                <Select onValueChange={handleSelectChange} value={formData.contentType} required>
                  <SelectTrigger className="w-full bg-background" id="content-type">
                    <SelectValue placeholder={t('AddContent.contentTypePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article"><div className="flex items-center"><FileText className="mr-2 h-4 w-4" />{t('AddContent.contentTypeArticle')}</div></SelectItem>
                    <SelectItem value="video"><div className="flex items-center"><Video className="mr-2 h-4 w-4" />{t('AddContent.contentTypeVideo')}</div></SelectItem>
                    <SelectItem value="quiz"><div className="flex items-center"><Brain className="mr-2 h-4 w-4" />{t('AddContent.contentTypeQuiz')}</div></SelectItem>
                    <SelectItem value="resource"><div className="flex items-center"><Link2 className="mr-2 h-4 w-4" />{t('AddContent.contentTypeResource')}</div></SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">{t('AddContent.titleLabel')}</Label>
                <Input id="title" placeholder={t('AddContent.titlePlaceholder')} className="bg-background" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionOrUrl">{t('AddContent.descriptionOrUrlLabel')}</Label>
                <Textarea id="descriptionOrUrl" placeholder={t('AddContent.descriptionOrUrlPlaceholder')} className="bg-background min-h-[120px]" value={formData.descriptionOrUrl} onChange={handleChange} required />
              </div>
            </CardContent>
          </Card>
          <Button type="submit" className="w-full text-lg h-12 mt-6">{t('AddContent.submitButton')}</Button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
}
