
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';

export default function SmartSafetyPage() {
    const { toast } = useToast();
    const { t } = useTranslation();

    const handleFeatureActivation = (featureName: string, description: string) => {
        toast({
            title: t('SmartSafety.featureActivated', { featureName }),
            description: description,
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">{t('SmartSafety.title')}</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle>{t('SmartSafety.checkInTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            {t('SmartSafety.checkInDescription')}
                        </p>
                        <Button 
                            className="w-full"
                            onClick={() => handleFeatureActivation(t('SmartSafety.checkInTitle'), t('SmartSafety.checkInToast'))}
                        >
                            {t('SmartSafety.start5MinCheckIn')}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle>{t('SmartSafety.shareTripTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            {t('SmartSafety.shareTripDescription')}
                        </p>
                        <Button 
                            className="w-full"
                            onClick={() => handleFeatureActivation(t('SmartSafety.shareTripTitle'), t('SmartSafety.shareTripToast'))}
                        >
                            {t('SmartSafety.shareMyTrip')}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle>{t('SmartSafety.fakeCallTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            {t('SmartSafety.fakeCallDescription')}
                        </p>
                        <Button 
                            className="w-full"
                            onClick={() => handleFeatureActivation(t('SmartSafety.fakeCallTitle'), t('SmartSafety.fakeCallToast'))}
                        >
                            {t('SmartSafety.startFakeCall')}
                        </Button>
                    </CardContent>
                </Card>
            </main>

            <BottomNav />
        </div>
    );
}
