
'use client';

import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useTranslation } from '@/context/language-context';
import { languages } from '@/lib/translations/locales';

export default function LanguageSettingsPage() {
    const { locale, setLocale, t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <header className="flex items-center p-4">
                <Link href="/settings" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">{t('Settings.language')}</h1>
            </header>

            <main className="p-4 space-y-4">
                <p className="text-muted-foreground px-2">
                    {t('Settings.chooseLanguage')}
                </p>

                <div className="space-y-2">
                    {languages.map((lang) => (
                        <Card
                            key={lang.code}
                            className={`bg-secondary/50 border-border ${locale === lang.code ? 'border-blue-500 border-2' : ''}`}
                            onClick={() => setLocale(lang.code)}
                        >
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">{lang.name}</h3>
                                    <p className="text-sm text-muted-foreground">{lang.localName}</p>
                                </div>
                                {locale === lang.code && <Check className="h-6 w-6 text-blue-500" />}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
