
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { CommentSection } from '@/components/ui/comment-section';
import { useAdminContent } from '@/context/admin-content-context';
import { useTranslation } from '@/context/language-context';

type Post = {
    id: number;
    title: string;
    description?: string;
    likes: number;
    liked: boolean;
    commentsCount: number;
    date: string;
    photo?: File | null;
    image?: string;
    imageHint?: string;
};


export default function UpdatesFeedPage() {
    const { publishedContent } = useAdminContent();
    const { t } = useTranslation();
    
    const initialPostsData = publishedContent
        .filter(item => item.type === 'update')
        .map((item, index) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            likes: 0,
            liked: false,
            commentsCount: 0,
            date: item.date,
            photo: item.photo,
            image: `https://picsum.photos/seed/${item.id}/600/400`, 
            imageHint: 'news update'
        }));

    const [posts, setPosts] = useState<Post[]>(initialPostsData);

    useEffect(() => {
        setPosts(currentPosts =>
            currentPosts.map(post => ({
                ...post,
                likes: post.likes === 0 ? Math.floor(Math.random() * 5000) + 50 : post.likes,
                commentsCount: post.commentsCount === 0 ? Math.floor(Math.random() * 50) + 1 : post.commentsCount,
            }))
        );
    }, []);

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
                <h1 className="text-xl font-bold">{t('Admin.updatesFeedPage')}</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
            {posts.length > 0 ? posts.map((post) => (
                <Card key={post.id} className="bg-secondary/50 border-border overflow-hidden">
                    <CardContent className="p-0">
                        {post.photo ? (
                             <Image src={URL.createObjectURL(post.photo)} alt={post.title} width={600} height={400} className="w-full h-auto object-cover" />
                        ) : (
                            post.image && <Image src={post.image} alt={post.title} width={600} height={400} className="w-full h-auto" data-ai-hint={post.imageHint} />
                        )}
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
                                    <ThumbsUp className={`h-4 w-4 ${post.liked ? 'text-primary' : ''}`} /> {t('UpdatesFeed.like')}
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4" /> {t('UpdatesFeed.comment')}
                                        </Button>
                                    </DialogTrigger>
                                    <CommentSection />
                                </Dialog>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="flex items-center gap-2"
                                    onClick={() => handleShare(post.title, post.description || '')}
                                >
                                    <Share2 className="h-4 w-4" /> {t('UpdatesFeed.share')}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )) : (
                <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-6 text-center text-muted-foreground">
                        <p>{t('UpdatesFeed.noUpdates')}</p>
                        <p className="text-sm mt-2">{t('UpdatesFeed.updatesAppearAfterApproval')}</p>
                    </CardContent>
                </Card>
            )}
            </main>

            <BottomNav />
        </div>
    );
}
