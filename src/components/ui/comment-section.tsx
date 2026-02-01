
'use client';

import { useState, useMemo, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, CornerUpLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from '@/context/language-context';

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

export const CommentSection = () => {
    const { t } = useTranslation();

    const initialComments: CommentType[] = useMemo(() => [
        {
            id: 1,
            user: 'Aarav Sharma',
            avatar: 'https://picsum.photos/seed/user1/40/40',
            comment: t('Messages.comment1'),
            timestamp: t('Messages.timestamp1'),
            likes: 15,
            liked: false,
            unliked: false,
            replies: [],
        },
        {
            id: 2,
            user: 'Priya Singh',
            avatar: 'https://picsum.photos/seed/user2/40/40',
            comment: t('Messages.comment2'),
            timestamp: t('Messages.timestamp2'),
            likes: 8,
            liked: false,
            unliked: false,
            replies: [
                {
                    id: 4,
                    user: 'Rohan Gupta',
                    avatar: 'https://picsum.photos/seed/user3/40/40',
                    comment: t('Messages.reply1'),
                    timestamp: t('Messages.timestamp3'),
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
            comment: t('Messages.comment3'),
            timestamp: t('Messages.timestamp4'),
            likes: 3,
            liked: false,
            unliked: false,
            replies: [],
        }
    ], [t]);


    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<{ parentId: number | null, commentId: number | null }>({ parentId: null, commentId: null });
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

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
            likes: c.liked ? c.likes - 1 : c.likes + (c.unliked ? 1 : 0) + 1,
            liked: !c.liked,
            unliked: false,
        })));
    };
    
    const handleUnlike = (id: number) => {
        setComments(prev => findCommentAndUpdate(prev, id, c => ({
            ...c,
            likes: c.liked ? c.likes - 1 : c.likes,
            unliked: !c.unliked,
            liked: false,
        })));
    };
    
    const handlePostReply = (parentId: number) => {
        if (!replyText.trim()) return;

        const newReply: CommentType = {
            id: Date.now(),
            user: t('Messages.you'),
            avatar: 'https://picsum.photos/seed/currentUser/40/40',
            comment: replyText,
            timestamp: t('Messages.now'),
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
            const newCommentObj: CommentType = {
                id: Date.now(),
                user: t('Messages.you'),
                avatar: 'https://picsum.photos/seed/currentUser/40/40',
                comment: newComment,
                timestamp: t('Messages.now'),
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
                            <ThumbsUp className={`h-4 w-4 ${comment.liked ? 'text-primary' : ''}`} />
                            <span className="text-xs">{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-1 h-auto" onClick={() => handleUnlike(comment.id)}>
                            <ThumbsDown className={`h-4 w-4 ${comment.unliked ? 'text-destructive' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-1 h-auto" onClick={() => {
                            setReplyingTo(replyingTo.commentId === comment.id ? { parentId: null, commentId: null } : { parentId: parentId ?? comment.id, commentId: comment.id });
                            setReplyText('');
                        }}>
                            <CornerUpLeft className="h-4 w-4" />
                            <span className="text-xs">{t('Messages.reply')}</span>
                        </Button>
                    </div>
                    {replyingTo.commentId === comment.id && (
                        <div className="flex items-center gap-2 mt-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://picsum.photos/seed/currentUser/40/40" />
                                <AvatarFallback>{t('Messages.you').charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="relative w-full">
                                <Input 
                                    placeholder={t('Messages.writeReply')} 
                                    className="bg-secondary/50 border-input pr-10 h-9"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePostReply(replyingTo.parentId!)}
                                />
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-primary" onClick={() => handlePostReply(replyingTo.parentId!)}>
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
                    {t('Messages.title')}
                </DialogTitle>
                <DialogDescription>
                    {t('CommentSection.description')}
                </DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-grow px-4">
                <div className="space-y-6 py-4">
                    {comments.map(comment => <Comment key={comment.id} comment={comment} parentId={null}/>)}
                </div>
            </ScrollArea>
            <div className="mt-auto p-4 border-t border-border bg-background">
                 <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/seed/currentUser/40/40" />
                        <AvatarFallback>{t('Messages.you').charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="relative w-full">
                        <Input 
                            placeholder={t('Messages.writeComment')} 
                            className="bg-secondary/50 border-input pr-10" 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                        />
                         <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-primary" onClick={handlePostComment}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
};
