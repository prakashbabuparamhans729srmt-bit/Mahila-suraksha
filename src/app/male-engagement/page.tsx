
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useState } from 'react';
import { useTranslation } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';

export default function MaleEngagementPage() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [pledges, setPledges] = useState({
        respect: 125034,
        coaching: 45000,
    });

    const handlePledge = (type: 'respect' | 'coaching') => {
        setPledges(prev => ({ ...prev, [type]: prev[type] + 1 }));
    };

    const handleShare = async (title: string, text: string) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            toast({
                title: t('Error'),
                description: t('MaleEngagement.sharingNotSupported'),
            });
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">{t('MaleEngagement.title')}</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Tabs defaultValue="initiatives" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
                        <TabsTrigger value="initiatives">{t('MaleEngagement.tabInitiatives')}</TabsTrigger>
                        <TabsTrigger value="events">{t('MaleEngagement.tabEvents')}</TabsTrigger>
                        <TabsTrigger value="resources">{t('MaleEngagement.tabResources')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="initiatives" className="mt-6 space-y-6">
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-4 space-y-4">
                                <h3 className="font-semibold text-lg">{t('MaleEngagement.pledgeForRespectTitle')}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {t('MaleEngagement.pledgeForRespectDescription')}
                                </p>
                                <p className="text-xs text-muted-foreground">{t('MaleEngagement.targetAudienceAll')}</p>
                                <div className="bg-background/50 rounded-lg p-3 text-center">
                                    <p className="text-3xl font-bold text-primary">{pledges.respect.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">{t('MaleEngagement.pledgesTaken')}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handlePledge('respect')}>{t('MaleEngagement.takePledge')}</Button>
                                    <Button 
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                        onClick={() => handleShare(t('MaleEngagement.pledgeForRespectTitle'), t('MaleEngagement.shareText'))}
                                    >
                                        <Share2 className="mr-2 h-4 w-4" />
                                        {t('MaleEngagement.share')}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-4 space-y-4">
                                <h3 className="font-semibold text-lg">{t('MaleEngagement.coachingBoysTitle')}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {t('MaleEngagement.coachingBoysDescription')}
                                </p>
                                <p className="text-xs text-muted-foreground">{t('MaleEngagement.targetAudienceCoaches')}</p>
                                <div className="bg-background/50 rounded-lg p-3 text-center">
                                    <p className="text-3xl font-bold text-primary">{pledges.coaching.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">{t('MaleEngagement.pledgesTaken')}</p>
                                </div>
                                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handlePledge('coaching')}>{t('MaleEngagement.takePledge')}</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="events">
                        {/* Event content can be added here */}
                    </TabsContent>
                    <TabsContent value="resources">
                        {/* Resources content can be added here */}
                    </TabsContent>
                </Tabs>
            </main>

            <BottomNav />
        </div>
    );
}
