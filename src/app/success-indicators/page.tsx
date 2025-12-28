
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings, Share2, ArrowUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function SuccessIndicatorsPage() {
    const indicators = [
        { title: 'घटना रिपोर्टिंग दर', value: '15%', progress: 60, target: '25% (लक्ष्य)' },
        { title: 'सजा दर', value: '22%', progress: 55, target: '40% (लक्ष्य)' },
        { title: 'हेल्पलाइन कॉल का उत्तर दिया गया', value: '250k', progress: 50, target: '500k (लक्ष्य)' }
    ];

    const handleShare = async () => {
        if (navigator.share) {
            try {
                const shareText = indicators.map(indicator => `${indicator.title}: ${indicator.value}`).join('\n');
                await navigator.share({
                    title: 'सफलता संकेतक',
                    text: `हमारी प्रगति देखें:\n${shareText}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('साझा करने की सुविधा इस ब्राउज़र में समर्थित नहीं है।');
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center justify-between p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">सफलता संकेतक</h1>
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    साझा करें
                </Button>
            </header>

            <main className="flex-grow p-4 space-y-6">
                {indicators.map((indicator, index) => (
                    <Card key={index} className="bg-secondary/50 border-border">
                        <CardContent className="p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">{indicator.title}</p>
                                <div className="flex items-center text-green-400 text-sm">
                                    <ArrowUp className="h-4 w-4" />
                                    <span>up</span>
                                </div>
                            </div>
                            <p className="text-4xl font-bold">{indicator.value}</p>
                            <div className="space-y-1">
                                <Progress value={indicator.progress} className="h-2 [&>div]:bg-blue-500" />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>0</span>
                                    <span>{indicator.target}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </main>

            <BottomNav />
        </div>
    );
}
