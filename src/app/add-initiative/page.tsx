
'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminContent } from '@/context/admin-content-context';
import { useTranslation } from '@/context/language-context';

export default function AddInitiativePage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAudience: '',
    kpi: '',
  });
  const { toast } = useToast();
  const { addContent } = useAdminContent();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
        toast({
            variant: "destructive",
            title: t('Error'),
            description: t('AddInitiative.errorFillFields'),
        });
        return;
    }
    
    addContent({
      title: formData.title,
      type: 'initiative',
      description: formData.description,
      targetAudience: formData.targetAudience,
      kpi: formData.kpi,
    });
    
    toast({
      title: t('AddInitiative.successTitle'),
      description: t('AddInitiative.successDescription'),
    });
    setFormData({ title: '', description: '', targetAudience: '', kpi: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">{t('AddInitiative.title')}</h1>
      </header>

      <main className="p-4 space-y-6">
        <p className="text-muted-foreground px-1">
          {t('AddInitiative.description')}
        </p>
        <form onSubmit={handleSubmit}>
          <Card className="w-full bg-secondary/50 border-border">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">{t('AddInitiative.initiativeNameLabel')}</Label>
                <Input id="title" placeholder={t('AddInitiative.initiativeNamePlaceholder')} className="bg-background" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t('AddInitiative.descriptionLabel')}</Label>
                <Textarea id="description" placeholder={t('AddInitiative.descriptionPlaceholder')} className="bg-background min-h-[120px]" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">{t('AddInitiative.targetAudienceLabel')}</Label>
                <div className="relative">
                  <Input id="targetAudience" placeholder={t('AddInitiative.targetAudiencePlaceholder')} className="bg-background pl-10" value={formData.targetAudience} onChange={handleChange} />
                  <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kpi">{t('AddInitiative.kpiLabel')}</Label>
                 <div className="relative">
                  <Input id="kpi" placeholder={t('AddInitiative.kpiPlaceholder')} className="bg-background pl-10" value={formData.kpi} onChange={handleChange} />
                   <Target className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                 </div>
              </div>
            </CardContent>
          </Card>
          <Button type="submit" className="w-full text-lg h-12 mt-6">{t('AddInitiative.submitButton')}</Button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
}
