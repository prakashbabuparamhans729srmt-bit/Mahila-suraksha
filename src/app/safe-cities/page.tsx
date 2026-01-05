
'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, FilePenLine } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useToast } from '@/hooks/use-toast';

export default function SafeCitiesPage() {
    const { toast } = useToast();

    const handleAction = (title: string) => {
        toast({
            title: "कार्रवाई शुरू की गई",
            description: `${title} सुविधा जल्द ही उपलब्ध होगी।`,
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">सुरक्षित शहर पहल</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle>इंटरैक्टिव सुरक्षा मानचित्र</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            आस-पास के सुरक्षा केंद्र, सहायता समूह और अंकेक्षित सुरक्षित क्षेत्र खोजें।
                        </p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleAction('इंटरैक्टिव सुरक्षा मानचित्र')}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            मानचित्र खोलें
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/50 border-border">
                    <CardHeader>
                        <CardTitle>सामुदायिक सुरक्षा अंकेक्षण</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            सुरक्षा सुधारों की आवश्यकता वाले क्षेत्रों की पहचान करने और रिपोर्ट करने के लिए अपने पड़ोस के अंकेक्षण में भाग लें।
                        </p>
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" onClick={() => handleAction('सामुदायिक सुरक्षा अंकेक्षण')}>
                            <FilePenLine className="mr-2 h-4 w-4" />
                            एक अंकेक्षण शुरू करें
                        </Button>
                    </CardContent>
                </Card>
                
                <div className="space-y-4">
                    <h2 className="text-lg font-bold px-1">स्थानीय पहल</h2>
                    <Card className="bg-secondary/50 border-border">
                        <CardHeader>
                            <CardTitle>सुरक्षित सार्वजनिक स्थान</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li>पहचाने गए हॉटस्पॉट में बेहतर स्ट्रीट लाइटिंग।</li>
                                <li>सुरक्षा कर्मियों की उपस्थिति में वृद्धि।</li>
                                <li>आपातकालीन कॉल बॉक्स की स्थापना।</li>
                            </ul>
                            <Button variant="outline" className="w-full" onClick={() => handleAction('समस्या रिपोर्ट')}>समस्या की रिपोर्ट करें</Button>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/50 border-border">
                         <CardHeader>
                            <CardTitle>महिला-अनुकूल सार्वजनिक परिवहन</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">यह पहल जल्द ही आ रही है।</p>
                        </CardContent>
                    </Card>
                </div>


            </main>

            <BottomNav />
        </div>
    );
}
