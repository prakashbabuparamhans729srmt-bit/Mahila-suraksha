
'use client';
import Link from 'next/link';
import { Bell, Home, BarChart2, RefreshCw, Settings, User, MapPin, Search, SlidersHorizontal, Plus, Shield, Users, GraduationCap, ArrowRight, BarChartBig, Scale, Handshake, Building2, ThumbsUp, MessageSquare, Share2, X, ChevronRight, ChevronDown, ArrowUp, ArrowDown, Send, ThumbsDown, CornerUpLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';


const CommunityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GlobalMonitoringIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const ImplementationTrackerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.5 38.0001C32.5081 38.0001 39 31.5082 39 23.5001C39 15.4919 32.5081 9.00006 24.5 9.00006C16.4919 9.00006 10 15.4919 10 23.5001C10 31.5082 16.4919 38.0001 24.5 38.0001Z" fill="#2F88FF" stroke="#FFF" strokeWidth="2"/>
    <path d="M21.5 25.5001L24.5 22.5001L27.5 25.5001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.5 22.5V30.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.2812 10.5C24.2812 10.5 20.2422 13.5 17.5312 17C14.8202 20.5 13.2812 24.5 13.2812 24.5" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24.5 9C24.5 9 28.5 12 31.5 15.5C34.5 19 35.5 23 35.5 23" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);


const FundingTrackerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C18.4772 4 14 8.47715 14 14V42C14 43.1046 14.8954 44 16 44H32C33.1046 44 34 43.1046 34 42V14C34 8.47715 29.5228 4 24 4Z" fill="#FFC107" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M24 27C25.6569 27 27 25.6569 27 24C27 22.3431 25.6569 21 24 21C22.3431 21 21 22.3431 21 24C21 25.6569 22.3431 27 24 27Z" stroke="black" strokeWidth="2"/>
    <path d="M24 21V18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 33V27" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21.1714 29.8284L19.0498 31.95" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <path d="M26.8286 29.8284L28.9502 31.95" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const SuccessIndicatorIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="#F44336" stroke="#000" strokeWidth="2"/>
      <path d="M24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14Z" fill="#FFF"/>
      <path d="M24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20Z" fill="#F44336"/>
    </svg>
  );

const PoliceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-500">
        <path d="M10.5 8.5h3" />
        <path d="M12 7v3" />
        <path d="m13 18-6-6 3-3 6 6-3 3z" />
        <path d="M10 21v-3.5a1.5 1.5 0 0 1 3 0V21" />
        <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" />
    </svg>
);

const AmbulanceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-red-500">
        <path d="M10.5 8.5h3" />
        <path d="M12 7v3" />
        <path d="M18 18h-2a4 4 0 0 1-4-4V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v9a4 4 0 0 0 4 4h2" />
        <path d="M8 14h.01" />
        <path d="M16 14h.01" />
        <path d="M22 12h-4" />
        <path d="M20 10v4" />
        <path d="M2 12h4" />
        <path d="M4 10v4" />
    </svg>
);

const FireTruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-orange-500">
        <path d="M5 19h14" />
        <path d="M2 13h1.4c.3 0 .7-.3.7-.7V11c0-1.7 1.3-3 3-3h10c1.7 0 3 1.3 3 3v1.3c0 .4.3.7.7.7H22" />
        <path d="M18 8V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" />
        <path d="M9 13h6" />
        <path d="M17.5 19a1.5 1.5 0 0 1-3 0" />
        <path d="M9.5 19a1.5 1.5 0 0 1-3 0" />
    </svg>
);

const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <path d="M12 2c.6 0 1.2.3 1.5.8l7.8 14.3c.3.5.3 1.1 0 1.6s-.9.8-1.5.8H4.2c-.6 0-1.2-.3-1.5-.8s-.3-1.1 0-1.6L10.5 2.8c.3-.5.9-.8 1.5-.8z" fill="#F44336" stroke-width="0"/>
        <path d="M12 18v.01" />
        <path d="M12 14v-4" stroke="#FFF" />
    </svg>
);

const initialComments = [
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
    const [replyingTo, setReplyingTo] = useState<number | null>(null);

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

    const handleLike = (id: number) => {
        // This is a dummy handler. In a real app, you'd update the state.
        console.log(`Liked comment ${id}`);
    };
    
    const handleUnlike = (id: number) => {
        console.log(`Unliked comment ${id}`);
    };

    const Comment = ({ comment }: { comment: (typeof initialComments)[0] }) => {
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
                            <ThumbsDown className={`h-4 w-4 ${comment.unliked ? 'text-blue-500' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-1 h-auto" onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}>
                            <CornerUpLeft className="h-4 w-4" />
                            <span className="text-xs">रिप्लाई</span>
                        </Button>
                    </div>
                    {replyingTo === comment.id && (
                        <div className="flex items-center gap-2 mt-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://picsum.photos/seed/currentUser/40/40" />
                                <AvatarFallback>आप</AvatarFallback>
                            </Avatar>
                            <div className="relative w-full">
                                <Input placeholder="एक रिप्लाई लिखें..." className="bg-secondary/50 border-input pr-10 h-9" />
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-blue-500">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-8 border-l-2 border-border/50 space-y-4">
                            {comment.replies.map(reply => <Comment key={reply.id} comment={reply} />)}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <DialogContent className="bg-background text-foreground max-w-md w-full h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-xl flex justify-between items-center">
                    कमेंट्स
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon"><X className="h-5 w-5" /></Button>
                    </DialogClose>
                </DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-grow px-4">
                <div className="space-y-6 py-4">
                    {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
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



export default function DashboardPage() {
  const [showNoNumberDialog, setShowNoNumberDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<'police' | 'ambulance' | 'firetruck' | null>(null);

  const filterCategories = [
    { id: 'global-data', label: 'वैश्विक डेटा' },
    { id: 'education', label: 'शिक्षा' },
    { id: 'legal-reform', label: 'कानूनी सुधार' },
    { id: 'male-engagement', label: 'पुरुष सहभागिता' },
    { id: 'smart-safety', label: 'स्मार्ट सुरक्षा' },
    { id: 'safe-cities', label: 'सुरक्षित शहर' },
    { id: 'community-empowerment', label: 'सामुदायिक सशक्तिकरण' },
    { id: 'global-monitoring', label: 'वैश्विक निगरानी' },
    { id: 'implementation-tracker', label: 'कार्यान्वयन ट्रैकर' },
    { id: 'funding-tracker', label: 'फंडिंग ट्रैकर' },
    { id: 'success-indicators', label: 'सफलता संकेतक' },
    { id: 'updates-feed', label: 'अपडेट्स फ़ीड' },
  ];

  const severityLevels = [
    { id: 'positive', label: 'सकारात्मक' },
    { id: 'neutral', label: 'तटस्थ' },
    { id: 'negative', label: 'नकारात्मक' },
  ];

  const dateRanges = [
    { id: 'anytime', label: 'कभी भी' },
    { id: 'last-week', label: 'पिछला सप्ताह' },
    { id: 'last-month', label: 'पिछला महीना' },
  ];

  const handleConfirm = (service: 'police' | 'ambulance' | 'firetruck') => {
      // For now, we assume no number is saved.
      // In a real app, you would check localStorage or some state management.
      setSelectedService(service);
      setShowNoNumberDialog(true);
  };
  
  const getServiceContent = () => {
    switch (selectedService) {
        case 'police':
            return {
                title: 'पुलिस अलर्ट भेजा गया!',
                description: 'कृपया नीचे दिए गए नंबर पर तुरंत कॉल करें।',
                number: 'कोई नंबर सहेजा नहीं गया',
                icon: <AlertIcon />
            };
        case 'ambulance':
            return {
                title: 'एम्बुलेंस अलर्ट भेजा गया!',
                description: 'कृपया नीचे दिए गए नंबर पर तुरंत कॉल करें।',
                number: 'कोई नंबर सहेजा नहीं गया',
                icon: <AlertIcon />
            };
        case 'firetruck':
            return {
                title: 'दमकल अलर्ट भेजा गया!',
                description: 'कृपया नीचे दिए गए नंबर पर तुरंत कॉल करें।',
                number: 'कोई नंबर सहेजा नहीं गया',
                icon: <AlertIcon />
            };
        default:
            return { title: '', description: '', number: '', icon: null };
    }
  };

  const stateData = [
    { 
      name: 'आंध्र प्रदेश', 
      score: 75,
      trend: 'up',
      details: [
        "महिलाओं की सुरक्षा के लिए 'दिशा' पहल परिणाम दिखा रही है।",
        "सार्वजनिक परिवहन में सुरक्षा सुधार पर ध्यान केंद्रित है।"
      ]
    },
    { name: 'अरुणाचल प्रदेश', score: 68, trend: 'down' },
    { name: 'असम', score: 65, trend: 'down' },
    { name: 'बिहार', score: 55, trend: 'down' },
    { name: 'छत्तीसगढ़', score: 62, trend: 'down' },
    { name: 'गोवा', score: 85, trend: 'down' },
    { name: 'गुजरात', score: 78, trend: 'down' },
    { name: 'हरियाणा', score: 72, trend: 'up' },
    { name: 'हिमाचल प्रदेश', score: 79, trend: 'up' },
    { name: 'झारखंड', score: 58, trend: 'down' },
    { name: 'कर्नाटक', score: 82, trend: 'up' },
    { name: 'केरल', score: 88, trend: 'up' },
    { name: 'मध्य प्रदेश', score: 63, trend: 'down' },
    { name: 'महाराष्ट्र', score: 80, trend: 'up' },
    { name: 'मणिपुर', score: 61, trend: 'down' },
    { name: 'मेघालय', score: 70, trend: 'up' },
    { name: 'मिजोरम', score: 75, trend: 'up' },
    { name: 'नागालैंड', score: 67, trend: 'down' },
    { name: 'ओडिशा', score: 66, trend: 'down' },
    { name: 'पंजाब', score: 77, trend: 'up' },
    { name: 'राजस्थान', score: 64, trend: 'down' },
    { name: 'सिक्किम', score: 84, trend: 'up' },
    { name: 'तमिलनाडु', score: 81, trend: 'up' },
    { name: 'तेलंगाना', score: 79, trend: 'up' },
    { name: 'त्रिपुरा', score: 69, trend: 'down' },
    { name: 'उत्तर प्रदेश', score: 60, trend: 'down' },
    { name: 'उत्तराखंड', score: 74, trend: 'up' },
    { name: 'पश्चिम बंगाल', score: 71, trend: 'down' },
  ];

  const unionTerritoriesData = [
    { name: 'अंडमान और निकोबार द्वीप समूह', score: 76, trend: 'up' },
    { name: 'चंडीगढ़', score: 80, trend: 'up' },
    { name: 'दादरा और नगर हवेली और दमन और दीव', score: 72, trend: 'down' },
    { name: 'दिल्ली', score: 68, trend: 'down' },
    { name: 'जम्मू और कश्मीर', score: 60, trend: 'down' },
    { name: 'लद्दाख', score: 78, trend: 'up' },
    { name: 'लक्षद्वीप', score: 85, trend: 'up' },
    { name: 'पुडुचेरी', score: 79, trend: 'up' }
  ]

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

  const handlePostShare = async (title: string, text: string) => {
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
        alert('Web Share API is not supported in your browser.');
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">डैशबोर्ड</h1>
        <div className="flex items-center space-x-4">
          <Link href="/notifications">
            <Bell className="h-6 w-6" />
          </Link>
          <Link href="/login">
            <User className="h-6 w-6" />
          </Link>
          <Link href="/settings">
            <Settings className="h-6 w-6" />
          </Link>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <Card className="bg-secondary/50 border-border">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">आपका वर्तमान स्थान</p>
                <p className="font-semibold">Patna Junction, Patna</p>
              </div>
            </div>
            <Link href="/location-settings">
              <Button variant="link" className="text-primary">बदलें</Button>
            </Link>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="किसी सुविधा के लिए खोजें..."
              className="pl-10 bg-secondary/50 border-border"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-secondary/50 border-border">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background rounded-t-lg">
              <SheetHeader className="text-left">
                <SheetTitle className="text-xl font-bold mb-4">उन्नत फ़िल्टर</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[60vh]">
                <div className="p-1">
                  <h3 className="text-lg font-semibold mb-3">श्रेणी</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {filterCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox id={category.id} />
                        <Label htmlFor={category.id} className="font-normal">{category.label}</Label>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-semibold mb-3">गंभीरता स्तर</h3>
                  <div className="space-y-4">
                    {severityLevels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-2">
                        <Checkbox id={level.id} />
                        <Label htmlFor={level.id} className="font-normal">{level.label}</Label>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />

                  <h3 className="text-lg font-semibold mb-3">तिथि सीमा</h3>
                  <RadioGroup defaultValue="anytime" className="space-y-4">
                    {dateRanges.map((range) => (
                      <div key={range.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={range.id} id={range.id} />
                        <Label htmlFor={range.id} className="font-normal">{range.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                </div>
              </ScrollArea>
              <div className="flex justify-between p-4 absolute bottom-0 left-0 right-0 bg-background">
                <Button variant="outline" className="w-1/2 mr-2">रीसेट करें</Button>
                <Button className="w-1/2 ml-2 bg-blue-600 hover:bg-blue-700">फ़िल्टर लागू करें</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Sheet>
            <SheetTrigger asChild>
                <Card className="bg-red-600 cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center text-white">
                        <div className="border-2 border-white p-2 mb-2">
                        <span className="text-lg font-bold">SOS</span>
                        </div>
                        <h2 className="text-2xl font-bold">आपातकालीन एसओएस</h2>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background text-foreground rounded-t-lg">
                <SheetHeader className="text-left p-4">
                    <div className="flex justify-between items-center">
                        <SheetTitle className="text-xl font-bold">आपातकालीन सेवा चुनें</SheetTitle>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <X className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                    </div>
                </SheetHeader>
                <div className="p-4 space-y-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Card className="bg-secondary/50 border-border cursor-pointer">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <PoliceIcon />
                                    <div>
                                        <h3 className="font-semibold">पुलिस</h3>
                                        <p className="text-sm text-muted-foreground">कोई नंबर सहेजा नहीं गया</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <div className="flex justify-center">
                                 <div className="bg-blue-100 p-3 rounded-full">
                                    <PoliceIcon />
                                </div>
                              </div>
                              <AlertDialogTitle className="text-center">पुलिस से संपर्क करें?</AlertDialogTitle>
                              <AlertDialogDescription className="text-center">
                              यह पुलिस के लिए एक अलर्ट भेजेगा। आपका स्थान साझा करने के लिए तैयार होगा।
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col space-y-2 sm:flex-col sm:space-x-0">
                              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleConfirm('police')}>हाँ, पुष्टि करें</AlertDialogAction>
                              <AlertDialogCancel>रद्द करें</AlertDialogCancel>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Card className="bg-secondary/50 border-border cursor-pointer">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <AmbulanceIcon />
                                    <div>
                                        <h3 className="font-semibold">एम्बुलेंस</h3>
                                        <p className="text-sm text-muted-foreground">कोई नंबर सहेजा नहीं गया</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <div className="flex justify-center">
                                 <div className="bg-red-100 p-3 rounded-full">
                                    <AmbulanceIcon />
                                 </div>
                              </div>
                              <AlertDialogTitle className="text-center">एम्बुलेंस से संपर्क करें?</AlertDialogTitle>
                              <AlertDialogDescription className="text-center">
                              यह एम्बुलेंस के लिए एक अलर्ट भेजेगा। आपका स्थान साझा करने के लिए तैयार होगा।
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col space-y-2 sm:flex-col sm:space-x-0">
                              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleConfirm('ambulance')}>हाँ, पुष्टि करें</AlertDialogAction>
                              <AlertDialogCancel>रद्द करें</AlertDialogCancel>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Card className="bg-secondary/50 border-border cursor-pointer">
                            <CardContent className="p-4 flex items-center justify-between">
                                 <div className="flex items-center space-x-4">
                                    <FireTruckIcon />
                                    <div>
                                        <h3 className="font-semibold">दमकल</h3>
                                        <p className="text-sm text-muted-foreground">कोई नंबर सहेजा नहीं गया</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <div className="flex justify-center">
                                <div className="bg-orange-100 p-3 rounded-full">
                                    <FireTruckIcon />
                                 </div>
                              </div>
                              <AlertDialogTitle className="text-center">दमकल से संपर्क करें?</AlertDialogTitle>
                              <AlertDialogDescription className="text-center">
                              यह दमकल के लिए एक अलर्ट भेजेगा। आपका स्थान साझा करने के लिए तैयार होगा।
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col space-y-2 sm:flex-col sm:space-x-0">
                              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleConfirm('firetruck')}>हाँ, पुष्टि करें</AlertDialogAction>
                              <AlertDialogCancel>रद्द करें</AlertDialogCancel>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
            </SheetContent>
        </Sheet>
        
        <AlertDialog open={showNoNumberDialog} onOpenChange={setShowNoNumberDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-center">
                        {getServiceContent().icon}
                    </div>
                    <AlertDialogTitle className="text-center">{getServiceContent().title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        {getServiceContent().description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="p-4 bg-secondary/50 rounded-md text-center font-semibold">
                    {getServiceContent().number}
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setShowNoNumberDialog(false)}>ठीक है</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <Dialog>
            <DialogTrigger asChild>
                <Card className="bg-secondary/50 border-border cursor-pointer">
                <CardContent className="p-4">
                    <h3 className="font-semibold">वापसी पर स्वागत है!</h3>
                    <p className="text-muted-foreground">
                    आपका वर्तमान वैश्विक सुरक्षा स्कोर है <span className="text-white font-bold">76/100</span>
                    </p>
                    <p className="text-green-400 text-sm">पिछले सप्ताह से 2 अंक ऊपर</p>
                </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="bg-background text-foreground max-w-md w-full">
                <DialogHeader>
                <DialogTitle className="text-xl flex justify-between items-center">
                    वैश्विक सुरक्षा स्कोर की व्याख्या
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon"><X className="h-5 w-5" /></Button>
                    </DialogClose>
                </DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh]">
                <div className="p-1 pr-6 space-y-6">
                    <p className="text-muted-foreground">
                    वैश्विक सुरक्षा स्कोर एक समग्र मीट्रिक है जो हमारे वैश्विक डेटा से प्रमुख संकेतकों के आधार पर यौन हिंसा से निपटने में प्रगति का मूल्यांकन करता है।
                    </p>

                    <div className="flex items-center justify-around text-center">
                    <div>
                        <p className="text-muted-foreground">पिछला सप्ताह</p>
                        <p className="text-4xl font-bold text-muted-foreground">74</p>
                    </div>
                    <ArrowRight className="h-8 w-8 text-green-500" />
                    <div>
                        <p className="text-muted-foreground">वर्तमान स्कोर</p>
                        <p className="text-4xl font-bold text-green-500">76</p>
                    </div>
                    </div>

                    <Card className="bg-secondary/50">
                    <CardContent className="p-4">
                        <h4 className="font-semibold">बदलाव का कारण (+2 अंक)</h4>
                        <p className="text-sm text-muted-foreground">कानूनी सुधारों (अर्जेंटीना) में सकारात्मक प्रवृत्ति और दक्षिण एशिया से सामुदायिक सहभागिता रिपोर्टों में एक महत्वपूर्ण वृद्धि।</p>
                    </CardContent>
                    </Card>

                    <div>
                    <h4 className="font-semibold mb-4">स्कोर का विवरण</h4>
                    <div className="space-y-4">
                        <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>कानूनी और नीति सुधार</span>
                            <span>82/100</span>
                        </div>
                        <Progress value={82} className="h-2 [&>div]:bg-green-500" />
                        </div>
                        <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>सार्वजनिक जागरूकता</span>
                            <span>75/100</span>
                        </div>
                        <Progress value={75} className="h-2 [&>div]:bg-yellow-500" />
                        </div>
                        <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>सुरक्षा अवसंरचना</span>
                            <span>68/100</span>
                        </div>
                        <Progress value={68} className="h-2 [&>div]:bg-yellow-500" />
                        </div>
                        <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>घटना रिपोर्टिंग दर</span>
                            <span>79/100</span>
                        </div>
                        <Progress value={79} className="h-2 [&>div]:bg-green-500" />
                        </div>
                    </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">राज्य-वार डेटा (भारत)</h4>
                        <Accordion type="single" collapsible className="w-full">
                        {stateData.map((state, index) => (
                            <AccordionItem value={`item-${index}`} key={index} className="border-none">
                                <AccordionTrigger className="p-0 hover:no-underline [&[data-state=open]>div>svg.lucide-chevron-down]:hidden [&[data-state=closed]>div>svg.lucide-chevron-down]:hidden">
                                  <Card className='w-full bg-secondary/50 border-border mb-2'>
                                    <div className="p-4 flex justify-between w-full items-center">
                                        <span>{state.name}</span>
                                        <div className="flex items-center">
                                            <span className={`font-bold mr-4 ${state.score < 60 ? 'text-red-500' : state.score < 70 ? 'text-yellow-500' : 'text-green-500'}`}>{state.score}/100</span>
                                            {state.trend === 'up' ? <ArrowUp className="h-5 w-5 text-green-500" /> : <ArrowDown className="h-5 w-5 text-red-500" />}
                                        </div>
                                    </div>
                                  </Card>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Card className='bg-secondary/50 border-border mb-2 -mt-2'>
                                        <div className="p-4 text-muted-foreground space-y-4">
                                            {state.details ? (
                                                <>
                                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                                        {state.details.map((detail, i) => (
                                                            <li key={i}>{detail}</li>
                                                        ))}
                                                    </ul>
                                                    <Button 
                                                        size="sm" 
                                                        className="bg-blue-600 hover:bg-blue-700 h-8"
                                                        onClick={() => handleShare(`${state.name} सुरक्षा अपडेट`, `नवीनतम सुरक्षा अपडेट देखें: ${state.details.join(' ')}`)}
                                                    >
                                                        <Share2 className="mr-2 h-4 w-4" />
                                                        साझा करें
                                                    </Button>
                                                </>
                                            ) : (
                                                <p className="text-sm">इस राज्य के लिए कोई विस्तृत डेटा उपलब्ध नहीं है।</p>
                                            )}
                                        </div>
                                    </Card>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">केंद्र शासित प्रदेश (भारत)</h4>
                        <Accordion type="single" collapsible className="w-full">
                        {unionTerritoriesData.map((state, index) => (
                            <AccordionItem value={`item-ut-${index}`} key={index} className="border-none">
                                <AccordionTrigger className="p-0 hover:no-underline [&[data-state=open]>div>svg.lucide-chevron-down]:hidden [&[data-state=closed]>div>svg.lucide-chevron-down]:hidden">
                                  <Card className='w-full bg-secondary/50 border-border mb-2'>
                                    <div className="p-4 flex justify-between w-full items-center">
                                        <span>{state.name}</span>
                                        <div className="flex items-center">
                                            <span className={`font-bold mr-4 ${state.score < 60 ? 'text-red-500' : state.score < 70 ? 'text-yellow-500' : 'text-green-500'}`}>{state.score}/100</span>
                                            {state.trend === 'up' ? <ArrowUp className="h-5 w-5 text-green-500" /> : <ArrowDown className="h-5 w-5 text-red-500" />}
                                        </div>
                                    </div>
                                  </Card>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Card className='bg-secondary/50 border-border mb-2 -mt-2'>
                                        <div className="p-4 text-muted-foreground space-y-4">
                                            <p className="text-sm">इस केंद्र शासित प्रदेश के लिए कोई विस्तृत डेटा उपलब्ध नहीं है।</p>
                                        </div>
                                    </Card>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                    </div>

                </div>
                </ScrollArea>
                <DialogClose asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">ठीक है</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>


        <div className="grid grid-cols-2 gap-4">
          <Link href="/smart-safety" className="block">
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-sm font-semibold text-center">सुरक्षा उपकरण</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/community-empowerment" className="block">
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-sm font-semibold text-center">सहायता खोजें</span>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        <div className="space-y-4">
            <h2 className="text-xl font-bold">सुविधाएं एक्सप्लोर करें</h2>
            <Link href="/implementation-tracker" className="block">
              <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                      <ImplementationTrackerIcon />
                    </div>
                    <div>
                      <h3 className="font-semibold">कार्यान्वयन ट्रैकर</h3>
                      <p className="text-sm text-muted-foreground">गैंट चार्ट के साथ हमारी प्रमुख वैश्विक पहलों की प्रगति की निगरानी करें।</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/funding-tracker" className="block">
              <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                      <FundingTrackerIcon />
                    </div>
                    <div>
                      <h3 className="font-semibold">फंडिंग ट्रैकर</h3>
                      <p className="text-sm text-muted-foreground">देखें कि हमारी धनराशि कैसे जुटाई जाती है, आवंटित की जाती है और प्रभाव डाल रही है।</p>                  </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/success-indicators" className="block">
              <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                      <SuccessIndicatorIcon />
                    </div>
                    <div>
                      <h3 className="font-semibold">सफलता संकेतक</h3>
                      <p className="text-sm text-muted-foreground">प्रमुख प्रदर्शन संकेतकों (KPIs) के साथ हमारी सामूहिक सफलता को मापें।</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/safe-cities" className="block">
                <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                        <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">सुरक्षित शहर</h3>
                        <p className="text-sm text-muted-foreground">स्थानीय सुरक्षा पहल, सहायता केंद्र खोजें और ऑडिट करें।</p>
                    </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
                </Card>
            </Link>
            <Link href="/community-empowerment" className="block">
                <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                        <CommunityIcon />
                    </div>
                    <div>
                        <h3 className="font-semibold">सामुदायिक सशक्तिकरण</h3>
                        <p className="text-sm text-muted-foreground">सहायता समूहों, कार्यक्रमों और सशक्तिकरण कार्यक्रमों से जुड़ें।</p>
                    </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
                </Card>
            </Link>
            <Link href="/global-monitoring" className="block">
                <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                        <GlobalMonitoringIcon />
                    </div>
                    <div>
                        <h3 className="font-semibold">वैश्विक निगरानी</h3>
                        <p className="text-sm text-muted-foreground">सुरक्षा स्कोर और देश-विशिष्ट डेटा का वैश्विक हीटमैप देखें।</p>
                    </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
                </Card>
            </Link>
            <Link href="/global-monitoring" className="block">
              <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                      <BarChartBig className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">वैश्विक डेटा</h3>
                      <p className="text-sm text-muted-foreground">इंटरैक्टिव मानचित्र, रुझान और प्रमुख वैश्विक आँकड़े देखें।</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/education" className="block">
                <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">शिक्षा</h3>
                        <p className="text-sm text-muted-foreground">जागरूकता बढ़ाने के लिए लेख, वीडियो और क्विज़ तक पहुँचें।</p>
                    </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
                </Card>
            </Link>
            <Link href="/legal-reform" className="block">
                <Card className="bg-secondary/50 border-border">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-background p-3 rounded-lg">
                        <Scale className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">कानूनी सुधार</h3>
                        <p className="text-sm text-muted-foreground">देश के अनुसार कानूनी सुधारों और नीतिगत परिवर्तनों की प्रगति को ट्रैक करें।</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
            </Link>
            <Link href="/male-engagement" className="block">
                <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                        <Handshake className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">पुरुष सहभागिता</h3>
                        <p className="text-sm text-muted-foreground">पुरुषों को सहयोगी के रूप में शामिल करने के लिए पहल और संसाधन खोजें।</p>
                    </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
                </Card>
            </Link>
            <Link href="/smart-safety" className="block">
                <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">स्मार्ट सुरक्षा</h3>
                        <p className="text-sm text-muted-foreground">व्यक्तिगत सुरक्षा के लिए सुरक्षा चेक-इन और यात्रा साझा करने जैसे स्मार्ट टूल का उपयोग करें।</p>
                    </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
                </Card>
            </Link>
            <Link href="/updates-feed" className="block">
                <Card className="bg-secondary/50 border-border">
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                    <div className="bg-background p-3 rounded-lg">
                        <RefreshCw className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">अपडेट्स फ़ीड</h3>
                        <p className="text-sm text-muted-foreground">नवीनतम समाचार, अपडेट और उपयोगकर्ता-प्रस्तुत रिपोर्टों से सूचित रहें।</p>
                    </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
                </Card>
            </Link>
        </div>

        <div className="space-y-4">
            <h2 className="text-xl font-bold">हाल के अपडेट</h2>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4 space-y-4">
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
                        onClick={() => handlePostShare('अर्जेंटीना में नया कानून पारित', 'अर्जेंटीना की कांग्रेस ने उत्पीड़न के खिलाफ कार्यस्थल सुरक्षा का विस्तार करने वाला एक नया विधेयक पारित किया।')}
                    >
                        <Share2 className="h-4 w-4" /> साझा करें
                    </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-yellow-400 border-2">
              <CardContent className="p-4 space-y-4">
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
                        onClick={() => handlePostShare('वैश्विक धन उगाहने वाले की शुरूआत', 'हमारा वार्षिक वैश्विक धन उगाहने वाला शुरू हो गया है, जिसका लक्ष्य उत्तरजीवी सहायता कार्यक्रमों के लिए $10M जुटाना है।')}
                    >
                        <Share2 className="h-4 w-4" /> साझा करें
                    </Button>
                </div>
              </CardContent>
            </Card>
        </div>


      </main>

      <BottomNav />
    </div>
  );
}
