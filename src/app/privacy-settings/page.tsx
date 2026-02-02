'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Eye, HeartPulse, Smartphone, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useState } from 'react';
import { useTranslation } from '@/context/language-context';

export default function PrivacySettingsPage() {
    const { t } = useTranslation();

    const [locationSettings, setLocationSettings] = useState({
        hidePrecise: true,
        safeOnly: true,
        emergencyOnly: false,
        nightMode: true,
    });

    const [privacySettings, setPrivacySettings] = useState({
        photoProtection: true,
        hideInfo: false,
        blockAds: true,
        secureChat: true,
    });

    const [healthSettings, setHealthSettings] = useState({
        encrypt: true,
        hideTracker: true,
        localFitness: false,
        secureHistory: true,
    });

    const handleToggle = (setter: React.Dispatch<React.SetStateAction<any>>, key: string) => {
        setter((prev: any) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/settings" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">{t('privacySettings.title')}</h1>
            </header>
            
            <main className="flex-grow p-4 space-y-6">
                <h2 className="text-lg font-bold text-center text-primary px-4">{t('privacySettings.heading')}</h2>

                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary"/> {t('privacySettings.locationSecurity.title')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="hide-precise" className="text-sm font-medium pr-4">{t('privacySettings.locationSecurity.hidePrecise')}</label>
                            <Switch id="hide-precise" checked={locationSettings.hidePrecise} onCheckedChange={() => handleToggle(setLocationSettings, 'hidePrecise')} />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="safe-only" className="text-sm font-medium pr-4">{t('privacySettings.locationSecurity.shareInSafe')}</label>
                            <Switch id="safe-only" checked={locationSettings.safeOnly} onCheckedChange={() => handleToggle(setLocationSettings, 'safeOnly')} />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="emergency-only" className="text-sm font-medium pr-4">{t('privacySettings.locationSecurity.shareToEmergency')}</label>
                            <Switch id="emergency-only" checked={locationSettings.emergencyOnly} onCheckedChange={() => handleToggle(setLocationSettings, 'emergencyOnly')} />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="night-mode" className="text-sm font-medium pr-4">{t('privacySettings.locationSecurity.nightMode')}</label>
                            <Switch id="night-mode" checked={locationSettings.nightMode} onCheckedChange={() => handleToggle(setLocationSettings, 'nightMode')} />
                        </div>
                        <p className="text-xs text-muted-foreground pt-2">📍 {t('privacySettings.locationSecurity.currentDisplay')}</p>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5 text-primary"/> {t('privacySettings.onlinePrivacy.title')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="photo-protection" className="text-sm font-medium pr-4">{t('privacySettings.onlinePrivacy.profilePhoto')}</label>
                            <Switch id="photo-protection" checked={privacySettings.photoProtection} onCheckedChange={() => handleToggle(setPrivacySettings, 'photoProtection')} />
                        </div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="hide-info" className="text-sm font-medium pr-4">{t('privacySettings.onlinePrivacy.hidePersonalInfo')}</label>
                            <Switch id="hide-info" checked={privacySettings.hideInfo} onCheckedChange={() => handleToggle(setPrivacySettings, 'hideInfo')} />
                        </div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="block-ads" className="text-sm font-medium pr-4">{t('privacySettings.onlinePrivacy.blockAds')}</label>
                            <Switch id="block-ads" checked={privacySettings.blockAds} onCheckedChange={() => handleToggle(setPrivacySettings, 'blockAds')} />
                        </div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="secure-chat" className="text-sm font-medium pr-4">{t('privacySettings.onlinePrivacy.secureChat')}</label>
                            <Switch id="secure-chat" checked={privacySettings.secureChat} onCheckedChange={() => handleToggle(setPrivacySettings, 'secureChat')} />
                        </div>
                        <p className="text-xs text-muted-foreground pt-2">🔒 {t('privacySettings.onlinePrivacy.dataPointsSecured', { count: 7 })}</p>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/50 border-border border-yellow-500/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><HeartPulse className="h-5 w-5 text-yellow-500"/> {t('privacySettings.healthData.title')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center text-yellow-500">
                           <AlertTriangle className="h-4 w-4 mr-2" />
                           <p className="text-sm font-semibold">{t('privacySettings.healthData.sensitive')}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="encrypt-health" className="text-sm font-medium pr-4">{t('privacySettings.healthData.encryptHealthApp')}</label>
                            <Switch id="encrypt-health" checked={healthSettings.encrypt} onCheckedChange={() => handleToggle(setHealthSettings, 'encrypt')} />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="hide-tracker" className="text-sm font-medium pr-4">{t('privacySettings.healthData.hidePeriodTracker')}</label>
                            <Switch id="hide-tracker" checked={healthSettings.hideTracker} onCheckedChange={() => handleToggle(setHealthSettings, 'hideTracker')} />
                        </div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="local-fitness" className="text-sm font-medium pr-4">{t('privacySettings.healthData.localFitnessData')}</label>
                            <Switch id="local-fitness" checked={healthSettings.localFitness} onCheckedChange={() => handleToggle(setHealthSettings, 'localFitness')} />
                        </div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="secure-history" className="text-sm font-medium pr-4">{t('privacySettings.healthData.secureSearchHistory')}</label>
                            <Switch id="secure-history" checked={healthSettings.secureHistory} onCheckedChange={() => handleToggle(setHealthSettings, 'secureHistory')} />
                        </div>
                        <p className="text-xs text-muted-foreground pt-2">🩺 {t('privacySettings.healthData.appsProtected', { count: 3 })}</p>
                    </CardContent>
                </Card>

                 <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Smartphone className="h-5 w-5 text-primary"/> {t('privacySettings.appSpecific.title')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p>{t('privacySettings.appSpecific.socialMedia')}</p>
                        <p>{t('privacySettings.appSpecific.shopping')}</p>
                        <p>{t('privacySettings.appSpecific.dating')}</p>
                        <p>{t('privacySettings.appSpecific.banking')}</p>
                        <Button variant="link" className="p-0 h-auto text-primary mt-2">{t('privacySettings.appSpecific.viewDetails')}</Button>
                    </CardContent>
                </Card>
                
                 <Card className="bg-destructive/10 border-destructive/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-destructive"/> {t('privacySettings.emergency.title')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p>{t('privacySettings.emergency.panicButton')}</p>
                        <p>{t('privacySettings.emergency.emergencyContacts', { count: 3 })}</p>
                        <p>{t('privacySettings.emergency.safePlaces')}</p>
                        <p>{t('privacySettings.emergency.autoAlerts')}</p>
                    </CardContent>
                </Card>
            </main>
            
            <BottomNav />
        </div>
    );
}
