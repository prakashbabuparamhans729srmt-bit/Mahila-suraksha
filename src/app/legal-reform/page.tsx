
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

const reformData = {
    india: [
        { title: 'आपराधिक कानून (संशोधन) अधिनियम, 2013', status: 'Implemented', description: 'यौन अपराधों के लिए कठोर दंड का प्रावधान किया और बलात्कार की परिभाषा का विस्तार किया।' },
        { title: 'कार्यस्थल पर यौन उत्पीड़न अधिनियम, 2013', status: 'Implemented', description: 'कार्यस्थल पर यौन उत्पीड़न से महिलाओं का संरक्षण करता है।' },
    ],
    usa: [
        { title: 'Violence Against Women Act (VAWA)', status: 'Implemented', description: 'Provides resources for victims of domestic violence, sexual assault, dating violence, and stalking.' },
    ],
    uk: [
        { title: 'Domestic Abuse Act 2021', status: 'Implemented', description: 'Creates a statutory definition of domestic abuse, emphasizing that it is not just physical violence.' },
    ]
};

type Country = keyof typeof reformData;

export default function LegalReformPage() {
    const [country, setCountry] = useState<Country>('india');
    const { toast } = useToast();

    const handleReadMore = () => {
        toast({
            title: "जल्द आ रहा है",
            description: "विस्तृत जानकारी जल्द ही उपलब्ध होगी।"
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">कानूनी सुधार ट्रैकिंग</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <div className='space-y-2'>
                    <label className="text-sm text-muted-foreground px-1">देश के अनुसार फ़िल्टर करें</label>
                    <Select defaultValue={country} onValueChange={(value: Country) => setCountry(value)}>
                        <SelectTrigger className="w-full bg-secondary/50 border-input">
                            <SelectValue placeholder="देश" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="india">भारत</SelectItem>
                            <SelectItem value="usa">संयुक्त राज्य अमेरिका</SelectItem>
                            <SelectItem value="uk">यूनाइटेड किंगडम</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {reformData[country].map((reform, index) => (
                    <Card key={index} className="bg-secondary/50 border-border">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg leading-tight">{reform.title}</h3>
                                <Badge className={reform.status === 'Implemented' ? 'bg-green-500 text-black' : 'bg-yellow-500 text-black'}>{reform.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {reform.description}
                            </p>
                            <Button variant="link" className="p-0 h-auto text-blue-400" onClick={handleReadMore}>
                                और पढ़ें
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </main>

            <BottomNav />
        </div>
    );
}
