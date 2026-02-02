
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';


type Country = 'india' | 'usa' | 'uk';

export default function LegalReformPage() {
    const { t } = useTranslation();
    const [country, setCountry] = useState<Country>('india');
    const { toast } = useToast();

    const reformData = {
        india: [
            { title: t('LegalReform.india.0.title'), status: 'implemented', description: t('LegalReform.india.0.description') },
            { title: t('LegalReform.india.1.title'), status: 'implemented', description: t('LegalReform.india.1.description') },
        ],
        usa: [
            { title: t('LegalReform.usa.0.title'), status: 'implemented', description: t('LegalReform.usa.0.description') },
        ],
        uk: [
            { title: t('LegalReform.uk.0.title'), status: 'implemented', description: t('LegalReform.uk.0.description') },
        ]
    };

    const handleReadMore = () => {
        toast({
            title: t('LegalReform.comingSoon'),
            description: t('LegalReform.comingSoonDescription')
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">{t('LegalReform.title')}</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <div className='space-y-2'>
                    <label className="text-sm text-muted-foreground px-1">{t('LegalReform.filterByCountry')}</label>
                    <Select defaultValue={country} onValueChange={(value: Country) => setCountry(value)}>
                        <SelectTrigger className="w-full bg-secondary/50 border-input">
                            <SelectValue placeholder={t('LegalReform.country')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="india">{t('LegalReform.india')}</SelectItem>
                            <SelectItem value="usa">{t('LegalReform.usa')}</SelectItem>
                            <SelectItem value="uk">{t('LegalReform.uk')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {reformData[country].map((reform, index) => (
                    <Card key={index} className="bg-secondary/50 border-border">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg leading-tight">{reform.title}</h3>
                                <Badge className={reform.status === 'implemented' ? 'bg-green-500 text-black' : 'bg-yellow-500 text-black'}>{t('LegalReform.statusImplemented')}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {reform.description}
                            </p>
                            <Button variant="link" className="p-0 h-auto text-primary" onClick={handleReadMore}>
                                {t('LegalReform.readMore')}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </main>

            <BottomNav />
        </div>
    );
}
