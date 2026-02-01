
'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Handshake, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useAdminContent } from '@/context/admin-content-context'; // Import context

export default function CommunityEmpowermentPage() {
    const { publishedContent } = useAdminContent(); // Get content from context

    const initiatives = publishedContent.filter(item => item.type === 'पहल');

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
                        {initiatives.length > 0 ? initiatives.map(item => (
                            <Card key={item.id} className="bg-secondary/50 border-border">
                                <CardContent className="p-4 space-y-4">
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                        <li>{item.description}</li>
                                        {item.kpi && <li>KPI: {item.kpi}</li>}
                                        {item.targetAudience && <li>लक्षित दर्शक: {item.targetAudience}</li>}
                                    </ul>
                                    <Button className="w-full mt-2">और जानें</Button>
                                </CardContent>
                            </Card>
                        )) : (
                            <Card className="bg-secondary/50 border-border">
                                <CardContent className="p-6 text-center text-muted-foreground">
                                    <p>अभी तक कोई कार्यक्रम नहीं है।</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                    <TabsContent value="event">
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-6 text-center text-muted-foreground">
                                <p>आयोजन की सुविधा जल्द ही आ रही है।</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="forum">
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-6 text-center text-muted-foreground">
                                <p>मंच की सुविधा जल्द ही आ रही है।</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            <BottomNav />
        </div>
    );
}
