
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useTranslation } from '@/context/language-context';

export default function GlobalMonitoringPage() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">{t('GlobalMonitoring.title')}</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle className="text-lg">{t('GlobalMonitoring.heatmapTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4 text-sm">
                            {t('GlobalMonitoring.heatmapDescription')}
                        </p>
                        <div className="relative bg-background/30 h-64 rounded-md flex items-center justify-center">
                            {/* Placeholder for map */}
                            <div className="absolute top-10 left-16 transform -rotate-12">
                                <div className="w-5 h-5 bg-green-500 rounded-sm transform rotate-45"></div>
                                <div className="w-4 h-4 bg-yellow-500 rounded-sm transform -rotate-12 ml-2"></div>
                            </div>
                             <div className="absolute top-20 left-24 transform rotate-12">
                                <div className="w-3 h-3 bg-orange-500 rounded-sm transform rotate-45"></div>
                            </div>
                            <div className="absolute bottom-16 right-24 transform -rotate-6">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            </div>
                            <div className="absolute top-12 right-12 transform rotate-15">
                                 <div className="w-6 h-4 bg-orange-500 rounded-sm transform -rotate-12"></div>
                                 <div className="w-4 h-4 bg-orange-500 rounded-sm transform rotate-12 -mt-1 ml-3"></div>
                            </div>
                             <div className="absolute bottom-12 right-10 transform rotate-15">
                                <div className="w-5 h-5 bg-green-500 rounded-sm transform rotate-45"></div>
                            </div>

                        </div>
                        <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                                <span>50</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                                <span>65</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                                <span>80</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                                <span>80+</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle className="text-lg">{t('GlobalMonitoring.annualReportTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4 text-sm">
                            {t('GlobalMonitoring.annualReportDescription')}
                        </p>
                        <Button className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" />
                            {t('GlobalMonitoring.openReport')}
                        </Button>
                    </CardContent>
                </Card>
            </main>

            <BottomNav />
        </div>
    );
}
