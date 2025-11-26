
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings, FileText, Video, Brain, Link2, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PencilPaperIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M12 18h.01"></path>
        <path d="M15.5 14.5a2.5 2.5 0 0 0-3.5 3.5l-2 2L8.5 18.5l2-2a2.5 2.5 0 0 0 3.5-3.5z"></path>
    </svg>
);


export default function EducationPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">शिक्षा और जागरूकता</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Tabs defaultValue="articles" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
                        <TabsTrigger value="articles" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" /> लेख
                        </TabsTrigger>
                        <TabsTrigger value="videos" className="flex items-center gap-2">
                            <Video className="h-4 w-4" /> वीडियो
                        </TabsTrigger>
                        <TabsTrigger value="quizzes" className="flex items-center gap-2">
                            <Brain className="h-4 w-4" /> प्रश्नोत्तरी
                        </TabsTrigger>
                        <TabsTrigger value="resources" className="flex items-center gap-2">
                            <Link2 className="h-4 w-4" /> संसाधन
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="articles" className="mt-6 space-y-6">
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-4 flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                     <div className="bg-background p-3 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12.5 15.5l-3 3L7 21l3-2.5 3 3L16 19l-3-2.5z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">सहमति को समझना</h3>
                                        <p className="text-sm text-muted-foreground">स्वस्थ संबंधों की आधारशिला।</p>
                                        <p className="text-sm text-blue-400 mt-1">5 मिनट पढ़ें</p>
                                    </div>
                                </div>
                                <ChevronDown className="h-6 w-6 text-muted-foreground" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="videos">
                        {/* Video content can be added here */}
                    </TabsContent>
                    <TabsContent value="quizzes">
                        {/* Quiz content can be added here */}
                    </TabsContent>
                    <TabsContent value="resources">
                        {/* Resources content can be added here */}
                    </TabsContent>
                </Tabs>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border">
                <div className="flex justify-around items-center p-2 relative">
                    <Link href="/" className="flex flex-col items-center text-primary">
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
                    <div className="flex flex-col items-center text-muted-foreground">
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
