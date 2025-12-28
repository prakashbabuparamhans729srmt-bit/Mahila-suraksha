
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings, ThumbsUp, MessageSquare, Share2, X, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const dummyComments = [
    {
        id: 1,
        user: 'Aarav Sharma',
        avatar: 'https://picsum.photos/seed/user1/40/40',
        comment: 'यह एक बहुत ही महत्वपूर्ण कदम है। कार्यस्थल पर सुरक्षा हम सभी के लिए प्राथमिकता होनी चाहिए।',
        timestamp: '2 घंटे पहले',
    },
    {
        id: 2,
        user: 'Priya Singh',
        avatar: 'https://picsum.photos/seed/user2/40/40',
        comment: 'शानदार खबर! उम्मीद है कि इसे सख्ती से लागू किया जाएगा।',
        timestamp: '3 घंटे पहले',
    },
     {
        id: 3,
        user: 'Rohan Gupta',
        avatar: 'https://picsum.photos/seed/user3/40/40',
        comment: 'जागरूकता फैलाने के लिए धन्यवाद।',
        timestamp: '5 घंटे पहले',
    }
];

const CommentSection = () => (
    <DialogContent className="bg-background text-foreground max-w-md w-full h-[80vh] flex flex-col">
        <DialogHeader>
            <DialogTitle className="text-xl flex justify-between items-center">
                कमेंट्स
                <DialogClose asChild>
                    <Button variant="ghost" size="icon"><X className="h-5 w-5" /></Button>
                </DialogClose>
            </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6">
            <div className="space-y-6">
                {dummyComments.map(comment => (
                    <div key={comment.id} className="flex items-start gap-3">
                        <Avatar>
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm">{comment.user}</p>
                                <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{comment.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
        <div className="mt-auto pt-4 border-t border-border">
             <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/currentUser/40/40" />
                    <AvatarFallback>आप</AvatarFallback>
                </Avatar>
                <div className="relative w-full">
                    <Input placeholder="एक कमेंट लिखें..." className="bg-secondary/50 border-input pr-10" />
                     <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-blue-500">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    </DialogContent>
);


export default function UpdatesFeedPage() {
    const handleShare = async (title: string, text: string) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            console.log('Web Share API not supported.');
            alert('साझा करने की सुविधा इस ब्राउज़र में समर्थित नहीं है।');
        }
    };

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
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4" /> कमेंट
                                        </Button>
                                    </DialogTrigger>
                                    <CommentSection />
                                </Dialog>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="flex items-center gap-2"
                                    onClick={() => handleShare('अर्जेंटीना में नया कानून पारित', 'अर्जेंटीना की कांग्रेस ने उत्पीड़न के खिलाफ कार्यस्थल सुरक्षा का विस्तार करने वाला एक नया विधेयक पारित किया।')}
                                >
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
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4" /> कमेंट
                                        </Button>
                                    </DialogTrigger>
                                    <CommentSection />
                                </Dialog>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="flex items-center gap-2"
                                    onClick={() => handleShare('वैश्विक धन उगाहने वाले की शुरूआत', 'हमारा वार्षिक वैश्विक धन उगाहने वाला शुरू हो गया है, जिसका लक्ष्य उत्तरजीवी सहायता कार्यक्रमों के लिए $10M जुटाना है।')}
                                >
                                    <Share2 className="h-4 w-4" /> साझा करें
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <BottomNav />
        </div>
    );
}

    

