
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings, Users, Calendar, Handshake } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const CommunityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );


export default function CommunityEmpowermentPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">सामुदायिक सशक्तिकरण</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 grid grid-cols-3 gap-4 text-center">
                        <div>
                            <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                            <p className="text-lg font-bold">12 लाख+</p>
                            <p className="text-xs text-muted-foreground">सक्रिय सदस्य</p>
                        </div>
                        <div>
                            <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                            <p className="text-lg font-bold">5,800+</p>
                            <p className="text-xs text-muted-foreground">आयोजित कार्यक्रम</p>
                        </div>
                        <div>
                            <Handshake className="h-8 w-8 mx-auto text-primary mb-2" />
                            <p className="text-lg font-bold">75 हजार+</p>
                            <p className="text-xs text-muted-foreground">संलग्न स्वयंसेवक</p>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="program" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
                        <TabsTrigger value="program">कार्यक्रम</TabsTrigger>
                        <TabsTrigger value="event">आयोजन</TabsTrigger>
                        <TabsTrigger value="forum">मंच</TabsTrigger>
                    </TabsList>
                    <TabsContent value="program" className="mt-6 space-y-6">
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-4 space-y-4">
                                <h3 className="font-semibold text-lg">स्थानीय सुरक्षा और सहायता केंद्र</h3>
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    <li>मुफ्त परामर्श और कानूनी सहायता प्रदान करना।</li>
                                    <li>उत्तरजीवियों के लिए मदद और संसाधन मांगने के लिए एक सुरक्षित, गोपनीय स्थान।</li>
                                    <li>स्थानीय जागरूकता कार्यशालाएं आयोजित करना।</li>
                                </ul>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">आस-पास के केंद्र खोजें</Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-4 space-y-4">
                                <h3 className="font-semibold text-lg">आर्थिक सशक्तिकरण अनुदान</h3>
                                 <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    <li>महिलाओं को छोटे व्यवसाय शुरू करने या बढ़ाने के लिए अनुदान।</li>
                                    <li>वित्तीय स्वतंत्रता को बढ़ावा देता है, भेद्यता को कम करता है।</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="event">
                        {/* Event content can be added here */}
                    </TabsContent>
                    <TabsContent value="forum">
                        {/* Forum content can be added here */}
                    </TabsContent>
                </Tabs>
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
