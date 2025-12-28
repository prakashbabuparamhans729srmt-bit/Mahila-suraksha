
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function MaleEngagementPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">पुरुष सहभागिता पहल</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Tabs defaultValue="initiatives" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
                        <TabsTrigger value="initiatives">पहल</TabsTrigger>
                        <TabsTrigger value="events">आयोजन</TabsTrigger>
                        <TabsTrigger value="resources">संसाधन</TabsTrigger>
                    </TabsList>
                    <TabsContent value="initiatives" className="mt-6 space-y-6">
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-4 space-y-4">
                                <h3 className="font-semibold text-lg">सम्मान के लिए प्रतिज्ञा</h3>
                                <p className="text-muted-foreground text-sm">
                                    एक सार्वजनिक अभियान जो पुरुषों को अपने समुदायों में सम्मान, सहमति और अहिंसा की संस्कृति को बढ़ावा देने की प्रतिज्ञा करने के लिए प्रोत्साहित करता है।
                                </p>
                                <p className="text-xs text-muted-foreground">लक्षित दर्शक: सभी पुरुष और लड़के</p>
                                <div className="bg-background/50 rounded-lg p-3 text-center">
                                    <p className="text-3xl font-bold text-primary">125,034</p>
                                    <p className="text-xs text-muted-foreground">ली गई प्रतिज्ञाएँ</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button className="w-full bg-green-600 hover:bg-green-700">प्रतिज्ञा लें</Button>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        <Share2 className="mr-2 h-4 w-4" />
                                        साझा करें
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-4 space-y-4">
                                <h3 className="font-semibold text-lg">लड़कों को पुरुषों में प्रशिक्षित करना</h3>
                                <p className="text-muted-foreground text-sm">
                                    एक कार्यक्रम जो एथलेटिक कोचों को अपने युवा पुरुष एथलीटों से महिलाओं का सम्मान करने के महत्व और हिंसा का मतलब ताकत नहीं है, के बारे में बात करने के लिए प्रशिक्षित करता है।
                                </p>
                                <p className="text-xs text-muted-foreground">लक्षित दर्शक: युवा खेल कोच और एथलीट</p>
                                <div className="bg-background/50 rounded-lg p-3 text-center">
                                    <p className="text-3xl font-bold text-primary">45,000</p>
                                    <p className="text-xs text-muted-foreground">ली गई प्रतिज्ञाएँ</p>
                                </div>
                                <Button className="w-full bg-green-600 hover:bg-green-700">प्रतिज्ञा लें</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="events">
                        {/* Event content can be added here */}
                    </TabsContent>
                    <TabsContent value="resources">
                        {/* Resources content can be added here */}
                    </TabsContent>
                </Tabs>
            </main>

            <BottomNav />
        </div>
    );
}

    
