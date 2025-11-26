
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function UpdatesFeedPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">अपडेट्स फ़ीड</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Card className="bg-secondary/50 border-border overflow-hidden">
                    <CardContent className="p-0">
                        <Image src="https://picsum.photos/seed/1/600/400" alt="Work desk" width={600} height={400} className="w-full h-auto" data-ai-hint="work desk" />
                        <div className="p-4 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-primary">अर्जेंटीना में नया कानून पारित</h3>
                                <p className="text-xs text-muted-foreground">2 दिन पहले</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                अर्जेंटीना की कांग्रेस ने उत्पीड़न के खिलाफ कार्यस्थल सुरक्षा का विस्तार करने वाला एक नया विधेयक पारित किया।
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>1253 Likes</span>
                                <span>2 Comments</span>
                            </div>
                            <Separator />
                            <div className="flex justify-around">
                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <ThumbsUp className="h-4 w-4" /> लाइक
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" /> कमेंट
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <Share2 className="h-4 w-4" /> साझा करें
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/50 border-border overflow-hidden">
                    <CardContent className="p-0">
                        <Image src="https://picsum.photos/seed/2/600/400" alt="Volunteers loading boxes" width={600} height={400} className="w-full h-auto" data-ai-hint="volunteers loading" />
                         <div className="p-4 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-primary">वैश्विक धन उगाहने वाले की शुरूआत</h3>
                                <p className="text-xs text-muted-foreground">5 दिन पहले</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                हमारा वार्षिक वैश्विक धन उगाहने वाला शुरू हो गया है, जिसका लक्ष्य उत्तरजीवी सहायता कार्यक्रमों के लिए $10M जुटाना है।
                            </p>
                             <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>5812 Likes</span>
                                <span>1 Comments</span>
                            </div>
                            <Separator />
                            <div className="flex justify-around">
                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <ThumbsUp className="h-4 w-4" /> लाइक
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" /> कमेंट
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <Share2 className="h-4 w-4" /> साझा करें
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border">
                <div className="flex justify-around items-center p-2 relative">
                    <Link href="/" className="flex flex-col items-center text-muted-foreground">
                        <Home className="h-6 w-6" />
                        <span className="text-xs">होम</span>
                    </Link>
                    <div className="flex flex-col items-center text-muted-foreground">
                        <BarChart2 className="h-6 w-6" />
                        <span className="text-xs">डेटा</span>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                        <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 h-14 w-14 shadow-lg">
                            <Plus className="h-8 w-8 text-white" />
                        </Button>
                    </div>
                    <div className="flex flex-col items-center text-primary">
                        <RefreshCw className="h-6 w-6" />
                        <span className="text-xs">अपडेट्स</span>
                    </div>
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

    