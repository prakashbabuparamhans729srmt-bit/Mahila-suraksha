
'use client';

import Link from 'next/link';
import { ArrowLeft, BarChart2, Home, Plus, RefreshCw, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SmartSafetyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">स्मार्ट सुरक्षा प्रणाली</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle>सुरक्षा चेक-इन</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            यदि आप एक निर्धारित समय के बाद चेक-इन नहीं करते हैं तो स्वचालित रूप से आपके आपातकालीन संपर्कों को सचेत करता है।
                        </p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">5-मिनट का चेक-इन शुरू करें</Button>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle>मेरी यात्रा साझा करें</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            जब तक आप अपने गंतव्य तक सुरक्षित नहीं पहुंच जाते, तब तक अपने विश्वसनीय संपर्कों के साथ अपना लाइव स्थान साझा करें।
                        </p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">मेरी यात्रा साझा करें</Button>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle>नकली कॉल</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            एक असहज स्थिति से बाहर निकलने में आपकी मदद करने के लिए एक आने वाली फोन कॉल का अनुकरण करें।
                        </p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">नकली कॉल शुरू करें</Button>
                    </CardContent>
                </Card>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border">
                <div className="flex justify-around items-center p-2 relative">
                    <Link href="/" className="flex flex-col items-center text-primary">
                        <Home className="h-6 w-6" />
                        <span className="text-xs">होम</span>
                    </Link>
                    <Link href="/global-monitoring" className="flex flex-col items-center text-muted-foreground">
                        <BarChart2 className="h-6 w-6" />
                        <span className="text-xs">डेटा</span>
                    </Link>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                        <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 h-14 w-14 shadow-lg">
                            <Plus className="h-8 w-8 text-white" />
                        </Button>
                    </div>
                    <Link href="/updates-feed" className="flex flex-col items-center text-muted-foreground">
                        <RefreshCw className="h-6 w-6" />
                        <span className="text-xs">अपडेट्स</span>
                    </Link>
                    <Link href="/settings" className="flex flex-col items-center text-muted-foreground">
                        <Settings className="h-6 w-6" />
                        <span className="text-xs">सेटिंग्स</span>
                    </Link>
                </div>
            </footer>
             {/* Spacer for bottom nav */}
             <div className="h-24"></div>
        </div>
    );
}
