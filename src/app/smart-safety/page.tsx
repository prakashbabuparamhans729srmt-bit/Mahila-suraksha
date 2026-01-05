
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useToast } from '@/hooks/use-toast';

export default function SmartSafetyPage() {
    const { toast } = useToast();

    const handleFeatureActivation = (featureName: string, description: string) => {
        toast({
            title: `${featureName} सक्रिय!`,
            description: description,
        });
    };

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
                        <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleFeatureActivation('सुरक्षा चेक-इन', '5 मिनट का चेक-इन टाइमर शुरू हो गया है।')}
                        >
                            5-मिनट का चेक-इन शुरू करें
                        </Button>
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
                        <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleFeatureActivation('यात्रा साझा करना', 'आपका लाइव स्थान अब आपके आपातकालीन संपर्कों के साथ साझा किया जा रहा है।')}
                        >
                            मेरी यात्रा साझा करें
                        </Button>
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
                        <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleFeatureActivation('नकली कॉल', 'आपको 15 सेकंड में एक नकली कॉल आएगी।')}
                        >
                            नकली कॉल शुरू करें
                        </Button>
                    </CardContent>
                </Card>
            </main>

            <BottomNav />
        </div>
    );
}
