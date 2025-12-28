
'use client';

import Link from 'next/link';
import { ArrowLeft, Check, Home, BarChart2, Plus, RefreshCw, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BottomNav } from '@/components/layout/bottom-nav';

const languages = [
    { en: 'English', local: 'अंग्रेज़ी' },
    { en: 'Hindi', local: 'हिंदी' },
    { en: 'Sanskrit', local: 'संस्कृतम्' },
    { en: 'Bengali', local: 'বাংলা' },
    { en: 'Telugu', local: 'తెలుగు' },
    { en: 'Marathi', local: 'मराठी' },
    { en: 'Tamil', local: 'தமிழ்' },
    { en: 'Gujarati', local: 'ગુજરાતી' },
    { en: 'Kannada', local: 'ಕನ್ನಡ' },
    { en: 'Malayalam', local: 'മലയാളം' },
    { en: 'Odia', local: 'ଓଡ଼ିଆ' },
    { en: 'Punjabi', local: 'ਪੰਜਾਬੀ' },
    { en: 'Assamese', local: 'অসমীয়া' },
    { en: 'Maithili', local: 'मैथिली' },
    { en: 'Santhali', local: 'संथाली' },
    { en: 'Kashmiri', local: 'कश्मीरी / كأشر' },
    { en: 'Sindhi', local: 'सिंधी / سندي' },
    { en: 'Dogri', local: 'डोगरी' },
    { en: 'Konkani', local: 'कोंकणी' },
    { en: 'Manipuri', local: 'मणिपुरी / মণিপুরী' },
    { en: 'Nepali', local: 'नेपाली' },
    { en: 'Bodo', local: 'बोडो' },
];

export default function LanguageSettingsPage() {
    const [selectedLanguage, setSelectedLanguage] = useState('Hindi');

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <header className="flex items-center p-4">
                <Link href="/settings" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">भाषा</h1>
            </header>

            <main className="p-4 space-y-4">
                <p className="text-muted-foreground px-2">
                    एप्लिकेशन के लिए अपनी पसंदीदा भाषा चुनें।
                </p>

                <div className="space-y-2">
                    {languages.map((lang) => (
                        <Card
                            key={lang.en}
                            className={`bg-secondary/50 border-border ${selectedLanguage === lang.en ? 'border-blue-500 border-2' : ''}`}
                            onClick={() => setSelectedLanguage(lang.en)}
                        >
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">{lang.en}</h3>
                                    <p className="text-sm text-muted-foreground">{lang.local}</p>
                                </div>
                                {selectedLanguage === lang.en && <Check className="h-6 w-6 text-blue-500" />}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
