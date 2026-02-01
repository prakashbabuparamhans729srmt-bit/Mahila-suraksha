
'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Handshake, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useAdminContent } from '@/context/admin-content-context'; // Import context
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';

export default function CommunityEmpowermentPage() {
    const { t } = useTranslation();
    const { publishedContent } = useAdminContent(); // Get content from context
    const { toast } = useToast();

    const initiatives = publishedContent.filter(item => item.type === 'पहल');

    const handleLearnMore = (title: string) => {
        toast({
            title: t('CommunityEmpowerment.comingSoon'),
            description: t('CommunityEmpowerment.comingSoonDescription', { title }),
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">{t('CommunityEmpowerment.title')}</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 grid grid-cols-3 gap-4 text-center">
                        <div>
                            <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                            <p className="text-lg font-bold">{t('CommunityEmpowerment.activeMembersValue')}</p>
                            <p className="text-xs text-muted-foreground">{t('CommunityEmpowerment.activeMembers')}</p>
                        </div>
                        <div>
                            <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                            <p className="text-lg font-bold">{t('CommunityEmpowerment.eventsHeldValue')}</p>
                            <p className="text-xs text-muted-foreground">{t('CommunityEmpowerment.eventsHeld')}</p>
                        </div>
                        <div>
                            <Handshake className="h-8 w-8 mx-auto text-primary mb-2" />
                            <p className="text-lg font-bold">{t('CommunityEmpowerment.volunteersEngagedValue')}</p>
                            <p className="text-xs text-muted-foreground">{t('CommunityEmpowerment.volunteersEngaged')}</p>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="program" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
                        <TabsTrigger value="program">{t('CommunityEmpowerment.tabProgram')}</TabsTrigger>
                        <TabsTrigger value="event">{t('CommunityEmpowerment.tabEvent')}</TabsTrigger>
                        <TabsTrigger value="forum">{t('CommunityEmpowerment.tabForum')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="program" className="mt-6 space-y-6">
                        {initiatives.length > 0 ? initiatives.map(item => (
                            <Card key={item.id} className="bg-secondary/50 border-border">
                                <CardContent className="p-4 space-y-4">
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                        <li>{item.description}</li>
                                        {item.kpi && <li>KPI: {item.kpi}</li>}
                                        {item.targetAudience && <li>{t('CommunityEmpowerment.targetAudience')}: {item.targetAudience}</li>}
                                    </ul>
                                    <Button className="w-full mt-2" onClick={() => handleLearnMore(item.title)}>{t('CommunityEmpowerment.learnMore')}</Button>
                                </CardContent>
                            </Card>
                        )) : (
                            <Card className="bg-secondary/50 border-border">
                                <CardContent className="p-6 text-center text-muted-foreground">
                                    <p>{t('CommunityEmpowerment.noPrograms')}</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                    <TabsContent value="event">
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-6 text-center text-muted-foreground">
                                <p>{t('CommunityEmpowerment.eventsComingSoon')}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="forum">
                        <Card className="bg-secondary/50 border-border">
                            <CardContent className="p-6 text-center text-muted-foreground">
                                <p>{t('CommunityEmpowerment.forumComingSoon')}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            <BottomNav />
        </div>
    );
}
