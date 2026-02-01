'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, LocateFixed } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';

export default function LocationSettingsPage() {
  const { t } = useTranslation();
  const [location, setLocation] = useState('Patna Junction, Patna');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDetectLocation = () => {
    setLoading(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you would use a reverse geocoding service
          // to get the address from coordinates.
          // For now, we'll just update the state to show it's fetched.
          setLocation(t('LocationSettings.latLon', { lat: latitude.toFixed(4), lon: longitude.toFixed(4) }));
          setLoading(false);
        },
        (err) => {
          setError(t('LocationSettings.errorDetect'));
          setLoading(false);
        }
      );
    } else {
      setError(t('LocationSettings.errorGeolocation'));
      setLoading(false);
    }
  };

  const handleSaveLocation = () => {
    toast({
        title: t('LocationSettings.toastSavedTitle'),
        description: t('LocationSettings.toastSavedDescription'),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/settings" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">{t('LocationSettings.title')}</h1>
      </header>

      <main className="p-4 space-y-6">
        <p className="text-muted-foreground px-2">
          {t('LocationSettings.description')}
        </p>

        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold">{t('LocationSettings.yourCurrentLocation')}</h3>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <p>{loading ? t('LocationSettings.detecting') : error ? error : location}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold">{t('LocationSettings.locationAccuracy')}</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline">{t('LocationSettings.high')}</Button>
              <Button>{t('LocationSettings.medium')}</Button>
              <Button variant="outline">{t('LocationSettings.low')}</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('LocationSettings.accuracyDescription')}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold">{t('LocationSettings.updateYourLocation')}</h3>
            <Button className="w-full" onClick={handleDetectLocation} disabled={loading}>
              <LocateFixed className="mr-2 h-5 w-5" />
              {loading ? t('LocationSettings.detecting') : t('LocationSettings.detectMyLocation')}
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="flex-grow border-t border-border"></div>
              <span className="text-muted-foreground text-sm">{t('LocationSettings.or')}</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <div className="space-y-2">
                <label htmlFor="manual-location" className="text-sm font-medium">{t('LocationSettings.enterManuallyLabel')}</label>
                <Input 
                  id="manual-location" 
                  placeholder={t('LocationSettings.enterManuallyPlaceholder')} 
                  className="bg-background border-border"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
            </div>

          </CardContent>
        </Card>

        <Button className="w-full text-lg h-12" onClick={handleSaveLocation}>
            {t('LocationSettings.saveLocation')}
        </Button>

      </main>

      <BottomNav />
    </div>
  );
}
