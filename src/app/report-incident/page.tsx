
'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Image as ImageIcon } from 'lucide-react';
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

export default function ReportIncidentPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
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
    if (!formData.title || !formData.description || !formData.location) {
        toast({
            variant: "destructive",
            title: t("Error"),
            description: t("ReportIncident.errorFillAllFields"),
        });
        return;
    }
    
    addContent({
      title: formData.title,
      type: 'incident_report',
      description: formData.description,
      location: formData.location,
      photo: formData.photo,
    });

    toast({
      title: t("ReportIncident.successTitle"),
      description: t("ReportIncident.successDescription"),
    });
    // Reset form
    setFormData({ title: '', description: '', location: '', photo: null });
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
        <h1 className="text-xl font-bold">{t('ReportIncident.title')}</h1>
      </header>

      <main className="p-4 space-y-6">
        <p className="text-muted-foreground px-1">
          {t('ReportIncident.description')}
        </p>
        <form onSubmit={handleSubmit}>
          <Card className="w-full bg-secondary/50 border-border">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">{t('ReportIncident.incidentTitleLabel')}</Label>
                <Input id="title" placeholder={t('ReportIncident.incidentTitlePlaceholder')} className="bg-background" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t('ReportIncident.descriptionLabel')}</Label>
                <Textarea id="description" placeholder={t('ReportIncident.descriptionPlaceholder')} className="bg-background min-h-[120px]" value={formData.description} onChange={handleChange} required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="location">{t('ReportIncident.locationLabel')}</Label>
                 <div className="relative">
                   <Input id="location" placeholder={t('ReportIncident.locationPlaceholder')} className="bg-background pl-10" value={formData.location} onChange={handleChange} required />
                   <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                 </div>
              </div>
               <div className="space-y-2">
                  <Label>{t('ReportIncident.uploadPhotoLabel')}</Label>
                  <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary/50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('ReportIncident.clickToUpload')}</span></p>
                              {formData.photo && <p className="text-xs text-green-500">{formData.photo.name}</p>}
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                      </label>
                  </div> 
              </div>
            </CardContent>
          </Card>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg h-12 mt-6">{t('ReportIncident.submitButton')}</Button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
}
