
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useTranslation } from '@/context/language-context';

const MailboxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        <path d="M16 4.5V2" />
        <path d="M8 4.5V2" />
    </svg>
);


export default function NotificationsPage() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">{t('Notifications.title')}</h1>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center text-center p-4 space-y-4">
                <div className="bg-secondary/50 p-6 rounded-full">
                    <MailboxIcon />
                </div>
                <h2 className="text-xl font-semibold">{t('Notifications.noNewNotifications')}</h2>
                <p className="text-muted-foreground">{t('Notifications.alertsAppearHere')}</p>
            </main>

            <BottomNav />
        </div>
    );
}
