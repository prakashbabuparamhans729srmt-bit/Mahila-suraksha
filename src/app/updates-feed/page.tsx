
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

type CommentType = {
    id: number;
    user: string;
    avatar: string;
    comment: string;
    timestamp: string;
    likes: number;
    liked: boolean;
    unliked: boolean;
    replies: CommentType[];
};

const initialComments: CommentType[] = [
    {
        id: 1,
        user: 'Aarav Sharma',
        avatar: 'https://picsum.photos/seed/user1/40/40',
        comment: 'यह एक बहुत ही महत्वपूर्ण कदम है। कार्यस्थल पर सुरक्षा हम सभी के लिए प्राथमिकता होनी चाहिए।',
        timestamp: '2 घंटे पहले',
        likes: 15,
        liked: false,
        unliked: false,
        replies: [],
    },
    {
        id: 2,
        user: 'Priya Singh',
        avatar: 'https://picsum.photos/seed/user2/40/40',
        comment: 'शानदार खबर! उम्मीद है कि इसे सख्ती से लागू किया जाएगा।',
        timestamp: '3 घंटे पहले',
        likes: 8,
        liked: false,
        unliked: false,
        replies: [
            {
                id: 4,
                user: 'Rohan Gupta',
                avatar: 'https://picsum.photos/seed/user3/40/40',
                comment: 'मैं सहमत हूँ, प्रवर्तन महत्वपूर्ण है।',
                timestamp: '1 घंटे पहले',
                likes: 2,
                liked: false,
                unliked: false,
                replies: [],
            }
        ],
    },
     {
        id: 3,
        user: 'Rohan Gupta',
        avatar: 'https://picsum.photos/seed/user3/40/40',
        comment: 'जागरूकता फैलाने के लिए धन्यवाद।',
        timestamp: '5 घंटे पहले',
        likes: 3,
        liked: false,
        unliked: false,
        replies: [],
    }
];

const CommentSection = () => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<{ parentId: number | null, commentId: number | null }>({ parentId: null, commentId: null });
    const [replyText, setReplyText] = useState('');

    const findCommentAndUpdate = (
        comments: CommentType[], 
        commentId: number, 
        updateFn: (comment: CommentType) => CommentType
    ): CommentType[] => {
        return comments.map(comment => {
            if (comment.id === commentId) {
                return updateFn(comment);
            }
            if (comment.replies.length > 0) {
                return { ...comment, replies: findCommentAndUpdate(comment.replies, commentId, updateFn) };
            }
            return comment;
        });
    };

    const handleLike = (id: number) => {
        setComments(prev => findCommentAndUpdate(prev, id, c => ({
            ...c,
            likes: c.liked ? c.likes - 1 : c.likes + 1,
            liked: !c.liked,
            unliked: c.liked ? c.unliked : false,
        })));
    };
    
    const handleUnlike = (id: number) => {
        setComments(prev => findCommentAndUpdate(prev, id, c => ({
            ...c,
            likes: c.liked ? c.likes - 1 : (c.unliked ? c.likes : c.likes),
            unliked: !c.unliked,
            liked: c.unliked ? c.liked : false,
        })));
    };
    
    const handlePostReply = (parentId: number) => {
        if (!replyText.trim()) return;

        const newReply: CommentType = {
            id: Date.now(),
            user: 'आप',
            avatar: 'https://picsum.photos/seed/currentUser/40/40',
            comment: replyText,
            timestamp: 'अभी',
            likes: 0,
            liked: false,
            unliked: false,
            replies: [],
        };
        
        const addReply = (comments: CommentType[]): CommentType[] => {
           return comments.map(comment => {
                if (comment.id === parentId) {
                    return { ...comment, replies: [newReply, ...comment.replies] };
                }
                if (comment.replies.length > 0) {
                    return { ...comment, replies: addReply(comment.replies) };
                }
                return comment;
            });
        }

        setComments(prev => addReply(prev));
        setReplyText('');
        setReplyingTo({ parentId: null, commentId: null });
    };


    const handlePostComment = () => {
        if (newComment.trim()) {
            const newCommentObj = {
                id: Date.now(),
                user: 'आप',
                avatar: 'https://picsum.photos/seed/currentUser/40/40',
                comment: newComment,
                timestamp: 'अभी',
                likes: 0,
                liked: false,
                unliked: false,
                replies: [],
            };
            setComments([newCommentObj, ...comments]);
            setNewComment('');
        }
    };


    const Comment = ({ comment, parentId }: { comment: CommentType; parentId: number | null }) => {
        return (
            <div className="flex items-start gap-3">
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
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-1 h-auto" onClick={() => handleLike(comment.id)}>
                            <ThumbsUp className={`h-4 w-4 ${comment.liked ? 'text-blue-500' : ''}`} />
                            <span className="text-xs">{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-1 h-auto" onClick={() => handleUnlike(comment.id)}>
                            <ThumbsDown className={`h-4 w-4 ${comment.unliked ? 'text-red-500' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-1 h-auto" onClick={() => {
                            setReplyingTo(replyingTo.commentId === comment.id ? { parentId: null, commentId: null } : { parentId: parentId ?? comment.id, commentId: comment.id });
                            setReplyText('');
                        }}>
                            <CornerUpLeft className="h-4 w-4" />
                            <span className="text-xs">रिप्लाई</span>
                        </Button>
                    </div>
                    {replyingTo.commentId === comment.id && (
                        <div className="flex items-center gap-2 mt-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://picsum.photos/seed/currentUser/40/40" />
                                <AvatarFallback>आप</AvatarFallback>
                            </Avatar>
                            <div className="relative w-full">
                                <Input 
                                    placeholder="एक रिप्लाई लिखें..." 
                                    className="bg-secondary/50 border-input pr-10 h-9"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePostReply(replyingTo.parentId!)}
                                />
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-blue-500" onClick={() => handlePostReply(replyingTo.parentId!)}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-8 border-l-2 border-border/50 space-y-4">
                            {comment.replies.map(reply => <Comment key={reply.id} comment={reply} parentId={comment.id} />)}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <DialogContent className="bg-background text-foreground max-w-md w-full h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-xl">
                    कमेंट्स
                </DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-grow px-4">
                <div className="space-y-6 py-4">
                    {comments.map(comment => <Comment key={comment.id} comment={comment} parentId={null} />)}
                </div>
            </ScrollArea>
            <div className="mt-auto p-4 border-t border-border bg-background">
                 <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/seed/currentUser/40/40" />
                        <AvatarFallback>आप</AvatarFallback>
                    </Avatar>
                    <div className="relative w-full">
                        <Input 
                            placeholder="एक कमेंट लिखें..." 
                            className="bg-secondary/50 border-input pr-10" 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                        />
                         <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-blue-500" onClick={handlePostComment}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
};


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
