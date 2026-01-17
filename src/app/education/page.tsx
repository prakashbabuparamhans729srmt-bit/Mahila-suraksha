
'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Video, Brain, Link2, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useAdminContent } from '@/context/admin-content-context';

export default function EducationPage() {
    const { publishedContent } = useAdminContent();

    const articles = publishedContent.filter(item => item.type === 'article');
    const videos = publishedContent.filter(item => item.type === 'video');
    const quizzes = publishedContent.filter(item => item.type === 'quiz');
    const resources = publishedContent.filter(item => item.type === 'resource');


    const renderContentItem = (item: any) => {
        let icon;
        switch (item.type) {
            case 'article': icon = <FileText className="h-6 w-6 text-primary" />; break;
            case 'video': icon = <Video className="h-6 w-6 text-primary" />; break;
            case 'quiz': icon = <Brain className="h-6 w-6 text-primary" />; break;
            case 'resource': icon = <Link2 className="h-6 w-6 text-primary" />; break;
            default: icon = <FileText className="h-6 w-6 text-primary" />;
        }
        return (
            <Card key={item.id} className="bg-secondary/50 border-border">
               <CardContent className="p-4 flex items-start justify-between">
                   <div className="flex items-start gap-4">
                        <div className="bg-background p-3 rounded-lg">
                           {icon}
                       </div>
                       <div>
                           <h3 className="font-semibold text-lg">{item.title}</h3>
                           
                           {(item.type === 'video' || item.type === 'resource') ? (
                                <a href={item.description} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 mt-1 block truncate max-w-xs hover:underline">{item.description}</a>
                           ) : (
                                <>
                                 <p className="text-sm text-muted-foreground">{item.description}</p>
                                 <p className="text-sm text-blue-400 mt-1">5 मिनट पढ़ें</p>
                                </>
                           )}
                       </div>
                   </div>
                   <ChevronDown className="h-6 w-6 text-muted-foreground" />
               </CardContent>
           </Card>
        );
    };
    
    const renderEmptyState = (type: string) => (
        <Card className="bg-secondary/50 border-border">
            <CardContent className="p-6 text-center text-muted-foreground">
                <p>अभी तक कोई {type} नहीं है।</p>
            </CardContent>
        </Card>
    );

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
                        {articles.length > 0 ? articles.map(renderContentItem) : renderEmptyState('लेख')}
                    </TabsContent>
                    <TabsContent value="videos" className="mt-6 space-y-6">
                       {videos.length > 0 ? videos.map(renderContentItem) : renderEmptyState('वीडियो')}
                    </TabsContent>
                    <TabsContent value="quizzes" className="mt-6 space-y-6">
                        {quizzes.length > 0 ? quizzes.map(renderContentItem) : renderEmptyState('प्रश्नोत्तरी')}
                    </TabsContent>
                    <TabsContent value="resources" className="mt-6 space-y-6">
                        {resources.length > 0 ? resources.map(renderContentItem) : renderEmptyState('संसाधन')}
                    </TabsContent>
                </Tabs>
            </main>

            <BottomNav />
        </div>
    );
}
