
'use client';
import Link from 'next/link';
import { Bell, Home, BarChart2, RefreshCw, Settings, User, MapPin, Search, SlidersHorizontal, Plus, Shield, Users, GraduationCap, ArrowRight, BarChartBig, Scale, Handshake, Building2, ThumbsUp, MessageSquare, Share2, X, ChevronRight, ChevronDown, ArrowUp, ArrowDown, Send, ThumbsDown, CornerUpLeft, ListChecks } from 'lucide-react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useAdminContent } from '@/context/admin-content-context';
import { CommentSection } from '@/components/ui/comment-section';


const CommunityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GlobalMonitoringIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary">
        <path d="M48 0H0V48H48V0Z" fill="white" fillOpacity="0.01"/>
        <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M24 4L20 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 24L8 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44 24L40 28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 44L28 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 4V44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44 24H4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M38.1213 9.87866L9.87868 38.1213" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M38.1213 38.1213L9.87868 9.87866" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const ImplementationTrackerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary">
        <path d="M42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C33.9411 6 42 14.0589 42 24Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M33 34L24 24L34 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 24H24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const FundingTrackerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary">
        <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 15V33" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 20L30 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 28L30 28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SuccessIndicatorIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary">
        <path d="M19 44L29 44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 23V44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 4C35.0457 4 44 12.9543 44 24C44 28.3123 42.671 32.2736 40.4227 35.454" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 24C4 12.9543 12.9543 4 24 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function DashboardPage() {
  const { profileName, profilePhoto } = useAdminContent();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profilePhoto) {
      const url = URL.createObjectURL(profilePhoto);
      setProfilePhotoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setProfilePhotoUrl(null);
    }
  }, [profilePhoto]);


  const [showNoNumberDialog, setShowNoNumberDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<'police' | 'ambulance' | 'firetruck' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([
    { id: 1, title: 'अर्जेंटीना में नया कानून पारित', description: 'अर्जेंटीना की कांग्रेस ने उत्पीड़न के खिलाफ कार्यस्थल सुरक्षा का विस्तार करने वाला एक नया विधेयक पारित किया।', likes: 1253, liked: false, commentsCount: 2, date: '2 दिन पहले' },
    { id: 2, title: 'वैश्विक धन उगाहने वाले की शुरूआत', description: 'हमारा वार्षिक वैश्विक धन उगाहने वाला शुरू हो गया है, जिसका लक्ष्य उत्तरजीवी सहायता कार्यक्रमों के लिए $10M जुटाना है।', likes: 5812, liked: false, commentsCount: 1, date: '5 दिन पहले', highlighted: true },
  ]);

  const handlePostLike = (postId: number) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p));
  };


  const allFeatures = [
    { 
      href: "/startup-checklist", 
      icon: <ListChecks className="h-6 w-6 text-primary" />, 
      title: "Startup Checklist", 
      description: "आपकी नई कंपनी शुरू करने के लिए 360+ कामों की सूची।" 
    },
    { 
      href: "/legal-compliance", 
      icon: <Scale className="h-6 w-6 text-primary" />, 
      title: "कानूनी अनुपालन", 
      description: "अपने संगठन की कानूनी स्थिति और फाइलिंग को ट्रैक करें।" 
    },
    { 
      href: "/implementation-tracker", 
      icon: <ImplementationTrackerIcon />, 
      title: "कार्यान्वयन ट्रैकर", 
      description: "गैंट चार्ट के साथ हमारी प्रमुख वैश्विक पहलों की प्रगति की निगरानी करें।" 
    },
    { 
      href: "/funding-tracker", 
      icon: <FundingTrackerIcon />, 
      title: "फंडिंग ट्रैकर", 
      description: "देखें कि हमारी धनराशि कैसे जुटाई जाती है, आवंटित की जाती है और प्रभाव डाल रही है।" 
    },
    { 
      href: "/success-indicators", 
      icon: <SuccessIndicatorIcon />, 
      title: "सफलता संकेतक", 
      description: "प्रमुख प्रदर्शन संकेतकों (KPIs) के साथ हमारी सामूहिक सफलता को मापें।" 
    },
    { 
      href: "/safe-cities", 
      icon: <Building2 className="h-6 w-6 text-primary" />, 
      title: "सुरक्षित शहर", 
      description: "स्थानीय सुरक्षा पहल, सहायता केंद्र खोजें और ऑडिट करें।" 
    },
    { 
      href: "/community-empowerment", 
      icon: <CommunityIcon />, 
      title: "सामुदायिक सशक्तिकरण", 
      description: "सहायता समूहों, कार्यक्रमों और सशक्तिकरण कार्यक्रमों से जुड़ें।" 
    },
    { 
      href: "/global-monitoring", 
      icon: <GlobalMonitoringIcon />, 
      title: "वैश्विक निगरानी", 
      description: "सुरक्षा स्कोर और देश-विशिष्ट डेटा का वैश्विक हीटमैप देखें।" 
    },
    { 
      href: "/global-monitoring", 
      icon: <BarChartBig className="h-6 w-6 text-primary" />, 
      title: "वैश्विक डेटा", 
      description: "इंटरैक्टिव मानचित्र, रुझान और प्रमुख वैश्विक आँकड़े देखें।" 
    },
    { 
      href: "/education", 
      icon: <GraduationCap className="h-6 w-6 text-primary" />, 
      title: "शिक्षा", 
      description: "जागरूकता बढ़ाने के लिए लेख, वीडियो और क्विज़ तक पहुँचें।" 
    },
    { 
      href: "/legal-reform", 
      icon: <Scale className="h-6 w-6 text-primary" />, 
      title: "कानूनी सुधार", 
      description: "देश के अनुसार कानूनी सुधारों और नीतिगत परिवर्तनों की प्रगति को ट्रैक करें।" 
    },
    { 
      href: "/male-engagement", 
      icon: <Handshake className="h-6 w-6 text-primary" />, 
      title: "पुरुष सहभागिता", 
      description: "पुरुषों को सहयोगी के रूप में शामिल करने के लिए पहल और संसाधन खोजें।" 
    },
    { 
      href: "/smart-safety", 
      icon: <Shield className="h-6 w-6 text-primary" />, 
      title: "स्मार्ट सुरक्षा", 
      description: "व्यक्तिगत सुरक्षा के लिए सुरक्षा चेक-इन और यात्रा साझा करने जैसे स्मार्ट टूल का उपयोग करें।" 
    },
    { 
      href: "/updates-feed", 
      icon: <RefreshCw className="h-6 w-6 text-primary" />, 
      title: "अपडेट्स फ़ीड", 
      description: "नवीनतम समाचार, अपडेट और उपयोगकर्ता-प्रस्तुत रिपोर्टों से सूचित रहें।" 
    }
  ];

  const filteredFeatures = allFeatures.filter(feature => 
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        alert('साझा करने की सुविधा इस ब्राउज़र में समर्थित नहीं है।');
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
          <Link href="/settings">
            <Settings className="h-6 w-6" />
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src={profilePhotoUrl ?? undefined} alt={profileName} />
                <AvatarFallback>{profileName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none shadow-none w-fit max-w-[90vw] h-fit flex items-center justify-center">
              <DialogHeader className="sr-only">
                <DialogTitle>{profileName}'s Profile Photo</DialogTitle>
                <DialogDescription>A larger view of your profile photo.</DialogDescription>
              </DialogHeader>
              <Avatar className="h-64 w-64">
                <AvatarImage src={profilePhotoUrl ?? undefined} alt={profileName} />
                <AvatarFallback>{profileName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </DialogContent>
          </Dialog>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                    <DialogTitle className="text-xl">
                        वैश्विक सुरक्षा स्कोर की व्याख्या
                    </DialogTitle>
                    <DialogDescription>
                        यह स्कोर हमारे वैश्विक डेटा से प्रमुख संकेतकों के आधार पर यौन हिंसा से निपटने में प्रगति का मूल्यांकन करता है।
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh]">
                <div className="p-1 pr-6 space-y-6">
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
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">सुविधाएं एक्सप्लोर करें</h2>
              {filteredFeatures.length > 4 && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="link">सभी देखें</Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="bg-background rounded-t-lg h-[90vh]">
                     <SheetHeader>
                        <SheetTitle className="text-xl font-bold">सभी सुविधाएं</SheetTitle>
                     </SheetHeader>
                     <ScrollArea className="h-[calc(90vh-80px)]">
                      <div className="space-y-4 p-1 mt-4">
                        {allFeatures.map((feature, index) => (
                          <Link href={feature.href} key={index} className="block">
                            <Card className="bg-secondary/50 border-border">
                              <CardContent className="flex items-center justify-between p-4">
                                <div className="flex items-center space-x-4">
                                  <div className="bg-background p-3 rounded-lg">
                                    {feature.icon}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                  </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                     </ScrollArea>
                  </SheetContent>
                </Sheet>
              )}
            </div>

            <div className="space-y-4">
              {filteredFeatures.slice(0, 4).map((feature, index) => (
                <Link href={feature.href} key={index} className="block">
                  <Card className="bg-secondary/50 border-border">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-background p-3 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
        </div>

        <div className="space-y-4" id="recent-updates">
            <h2 className="text-xl font-bold">हाल के अपडेट</h2>
            {posts.map((post) => (
              <Card key={post.id} className={`bg-secondary/50 border-border ${post.highlighted ? 'border-yellow-400 border-2' : ''}`}>
                <CardContent className="p-4 space-y-4">
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
                          onClick={() => handlePostShare(post.title, post.description)}
                      >
                          <Share2 className="h-4 w-4" /> साझा करें
                      </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>


      </main>

      <BottomNav />
    </div>
  );
}
