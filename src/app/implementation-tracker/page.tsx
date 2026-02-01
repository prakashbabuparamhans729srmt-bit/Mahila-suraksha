
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useTranslation } from '@/context/language-context';

export default function ImplementationTrackerPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">{t('ImplementationTracker.title')}</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <div className='space-y-2'>
                    <label className="text-sm text-muted-foreground px-1">{t('ImplementationTracker.selectProjectLabel')}</label>
                    <Select defaultValue="global-helpline">
                        <SelectTrigger className="w-full bg-secondary/50 border-input">
                            <SelectValue placeholder={t('ImplementationTracker.selectProjectPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="global-helpline">{t('ImplementationTracker.projectName')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 space-y-4">
                        <h2 className="font-bold text-lg">{t('ImplementationTracker.projectName')}</h2>
                        <p className="text-sm text-muted-foreground">
                            {t('ImplementationTracker.projectDescription')}
                        </p>

                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold">{t('ImplementationTracker.task1')} <span className="text-muted-foreground text-sm">{t('ImplementationTracker.teamResearch')}</span></p>
                                <div className="mt-2 bg-background p-2 rounded-md flex items-center">
                                    <div className="w-full bg-green-500 h-2 rounded-md"></div>
                                </div>
                                <div className="text-right mt-1">
                                    <Badge className="bg-green-500 text-black">{t('ImplementationTracker.statusDone')}</Badge>
                                </div>
                            </div>

                             <div>
                                <p className="font-semibold">{t('ImplementationTracker.task2')} <span className="text-muted-foreground text-sm">{t('ImplementationTracker.teamHR')}</span></p>
                                <div className="mt-2 bg-background p-2 rounded-md flex items-center">
                                    <div className="w-2/3 bg-yellow-500 h-2 rounded-l-md"></div>
                                    <div className="w-1/3 bg-gray-600 h-2 rounded-r-md"></div>
                                </div>
                                <div className="text-right mt-1">
                                    <Badge className="bg-yellow-500 text-black">{t('ImplementationTracker.statusInProgress')}</Badge>
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold">{t('ImplementationTracker.task3')} <span className="text-muted-foreground text-sm">{t('ImplementationTracker.teamIT')}</span></p>
                                 <div className="mt-2 bg-background p-2 rounded-md flex items-center">
                                    <div className="w-1/2 bg-yellow-500 h-2 rounded-l-md"></div>
                                    <div className="w-1/2 bg-gray-600 h-2 rounded-r-md"></div>
                                </div>
                                <div className="text-right mt-1">
                                    <Badge className="bg-yellow-500 text-black">{t('ImplementationTracker.statusInProgress')}</Badge>
                                </div>
                            </div>
                            
                            <div>
                                <p className="font-semibold">{t('ImplementationTracker.task4')} <span className="text-muted-foreground text-sm">{t('ImplementationTracker.teamOps')}</span></p>
                                <div className="mt-2 bg-background p-2 rounded-md flex items-center">
                                    <div className="w-full bg-gray-600 h-2 rounded-md"></div>
                                </div>
                                <div className="text-right mt-1">
                                     <Badge variant="secondary" className="bg-gray-700 text-white">{t('ImplementationTracker.statusToDo')}</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <BottomNav />
        </div>
    );
}
