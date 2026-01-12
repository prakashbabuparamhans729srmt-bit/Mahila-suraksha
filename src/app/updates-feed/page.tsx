
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings, ThumbsUp, MessageSquare, Share2, X, Send, ThumbsDown, CornerUpLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { CommentSection } from '@/components/ui/comment-section';


export default function UpdatesFeedPage() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'अर्जेंटीना में नया कानून पारित', description: 'अर्जेंटीना की कांग्रेस ने उत्पीड़न के खिलाफ कार्यस्थल सुरक्षा का विस्तार करने वाला एक नया विधेयक पारित किया।', likes: 1253, liked: false, commentsCount: 2, date: '2 दिन पहले', image: 'https://picsum.photos/seed/1/600/400', imageHint: 'work desk' },
        { id: 2, title: 'वैश्विक धन उगाहने वाले की शुरूआत', description: 'हमारा वार्षिक वैश्विक धन उगाहने वाला शुरू हो गया है, जिसका लक्ष्य उत्तरजीवी सहायता कार्यक्रमों के लिए $10M जुटाना है।', likes: 5812, liked: false, commentsCount: 1, date: '5 दिन पहले', image: 'https://picsum.photos/seed/2/600/400', imageHint: 'volunteers loading' },
      ]);

    const handlePostLike = (postId: number) => {
        setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p));
    };

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
            {posts.map((post) => (
                <Card key={post.id} className="bg-secondary/50 border-border overflow-hidden">
                    <CardContent className="p-0">
                        <Image src={post.image} alt={post.title} width={600} height={400} className="w-full h-auto" data-ai-hint={post.imageHint} />
                        <div className="p-4 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-primary">{post.title}</h3>
                                <p className="text-xs text-muted-foreground">{post.date}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {post.description}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{post.likes} Likes</span>
                                <span>{post.commentsCount} Comments</span>
                            </div>
                            <Separator />
                            <div className="flex justify-around">
                                <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => handlePostLike(post.id)}>
                                    <ThumbsUp className={`h-4 w-4 ${post.liked ? 'text-blue-500' : ''}`} /> लाइक
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
                                    onClick={() => handleShare(post.title, post.description)}
                                >
                                    <Share2 className="h-4 w-4" /> साझा करें
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            </main>

            <BottomNav />
        </div>
    );
}
