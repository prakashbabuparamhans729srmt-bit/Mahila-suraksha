
'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, FilePenLine } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';

export default function SafeCitiesPage() {
    const { toast } = useToast();
    const { t } = useTranslation();

    const handleAction = (title: string) => {
        toast({
            title: t('SafeCities.actionInitiated'),
            description: t('SafeCities.featureComingSoon', { title }),
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">{t('SafeCities.title')}</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle>{t('SafeCities.interactiveMapTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            {t('SafeCities.interactiveMapDescription')}
                        </p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleAction(t('SafeCities.interactiveMapTitle'))}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            {t('SafeCities.openMap')}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle>{t('SafeCities.communityAuditTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                           {t('SafeCities.communityAuditDescription')}
                        </p>
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" onClick={() => handleAction(t('SafeCities.communityAuditTitle'))}>
                            <FilePenLine className="mr-2 h-4 w-4" />
                            {t('SafeCities.startAudit')}
                        </Button>
                    </CardContent>
                </Card>
                
                <div className="space-y-4">
                    <h2 className="text-lg font-bold px-1">{t('SafeCities.localInitiatives')}</h2>
                    <Card className="bg-secondary/50 border-border">
                        <CardHeader>
                            <CardTitle>{t('SafeCities.safePublicSpacesTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li>{t('SafeCities.safePublicSpacesItem1')}</li>
                                <li>{t('SafeCities.safePublicSpacesItem2')}</li>
                                <li>{t('SafeCities.safePublicSpacesItem3')}</li>
                            </ul>
                            <Button variant="outline" className="w-full" onClick={() => handleAction(t('SafeCities.reportProblem'))}>{t('SafeCities.reportProblem')}</Button>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/50 border-border">
                         <CardHeader>
                            <CardTitle>{t('SafeCities.womenFriendlyTransportTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">{t('SafeCities.comingSoon')}</p>
                        </CardContent>
                    </Card>
                </div>


            </main>

            <BottomNav />
        </div>
    );
}
