
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Home, BarChart2, RefreshCw, Settings, User, MapPin, Search, SlidersHorizontal, Plus, Shield, Users, GraduationCap, ArrowRight, BarChartBig, Scale, Handshake, Building2, ThumbsUp, MessageSquare, Share2, X, ChevronRight, ChevronDown, ArrowUp, ArrowDown, Send, ThumbsDown, CornerUpLeft, ListChecks, LogOut, Mic } from 'lucide-react';
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
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { CommentSection } from '@/components/ui/comment-section';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase } from '@/firebase/client-provider';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useGuest } from '@/context/guest-context';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useVoiceSearch } from '@/context/voice-search-context';
import { useTranslation } from '@/context/language-context';


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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
        <path d="M10.5 8.5h3" />
        <path d="M12 7v3" />
        <path d="m13 18-6-6 3-3 6 6-3 3z" />
        <path d="M10 21v-3.5a1.5 1.5 0 0 1 3 0V21" />
        <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" />
    </svg>
);

const AmbulanceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-destructive">
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
        <path d="M2 13h1.4c.3 0 .7-.3.7-.7V11c0-1.7 1.3-3 3-3h10c1.7 0 3 1.3 3 3v1.3c0 .4.3.7.7H22" />
        <path d="M18 8V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" />
        <path d="M9 13h6" />
        <path d="M17.5 19a1.5 1.5 0 0 1-3 0" />
        <path d="M9.5 19a1.5 1.5 0 0 1-3 0" />
    </svg>
);

const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive">
        <path d="M12 2c.6 0 1.2.3 1.5.8l7.8 14.3c.3.5.3 1.1 0 1.6s-.9.8-1.5.8H4.2c-.6 0-1.2-.3-1.5-.8s-.3-1.1 0-1.6L10.5 2.8c.3-.5.9-.8 1.5-.8z" fill="#F71F26" stroke-width="0"/>
        <path d="M12 18v.01" />
        <path d="M12 14v-4" stroke="#FFF" />
    </svg>
);

export default function DashboardPage() {
  const { user, loading } = useUser();
  const { isGuest, exitGuestMode } = useGuest();
  const { auth } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const { openVoiceSearch, searchQuery: voiceSearchQuery, setSearchQuery: setGlobalSearchQuery } = useVoiceSearch();
  const { t } = useTranslation();

  const [showNoNumberDialog, setShowNoNumberDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<'police' | 'ambulance' | 'firetruck' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const postsData = useMemo(() => ([
    { id: 1, title: t('Dashboard.post1Title'), description: t('Dashboard.post1Desc'), likes: 1253, liked: false, commentsCount: 2, date: t('Dashboard.daysAgo', { count: 2 }) },
    { id: 2, title: t('Dashboard.post2Title'), description: t('Dashboard.post2Desc'), likes: 5812, liked: false, commentsCount: 1, date: t('Dashboard.daysAgo', { count: 5 }), highlighted: true },
  ]), [t]);

  const [posts, setPosts] = useState(postsData);

   useEffect(() => {
    // This effect ensures that if the language changes, the posts' text content updates.
    // It preserves the state (likes, liked status) while updating the text.
    setPosts(currentPosts => 
        currentPosts.map(p => {
            const newPostData = postsData.find(pd => pd.id === p.id);
            return newPostData ? { ...p, title: newPostData.title, description: newPostData.description, date: newPostData.date } : p;
        })
    );
  }, [postsData]);


  const [serviceContent, setServiceContent] = useState({ title: '', description: '', number: '', icon: null as React.ReactNode });
  const [emergencyNumbers, setEmergencyNumbers] = useState({ police: '', ambulance: '', firetruck: '' });

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    try {
      const savedAuthorities = localStorage.getItem('authorityNumbers');
      if (savedAuthorities) {
        setEmergencyNumbers(JSON.parse(savedAuthorities));
      }
    } catch (error) {
      console.error("Failed to parse settings from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (voiceSearchQuery) {
        setSearchQuery(voiceSearchQuery);
        // Clear the global query after using it so it doesn't persist across pages
        setGlobalSearchQuery('');
    }
  }, [voiceSearchQuery, setGlobalSearchQuery]);

  const bannerImages = [
    { src: 'https://picsum.photos/seed/banner1/600/300', alt: 'Community support', hint: 'community support' },
    { src: 'https://picsum.photos/seed/banner2/600/300', alt: 'Helping hands', hint: 'helping hands' },
    { src: 'https://picsum.photos/seed/banner3/600/300', alt: 'Safety in the city', hint: 'safe city' },
    { src: 'https://picsum.photos/seed/banner4/600/300', alt: 'Speaking up', hint: 'speaking up' },
    { src: 'https://picsum.photos/seed/banner5/600/300', alt: 'Global unity', hint: 'global unity' },
  ];

  useEffect(() => {
    if (!loading && !isGuest && !user) {
      router.push('/welcome');
    }
  }, [loading, user, router, isGuest]);

  useEffect(() => {
    if (showNoNumberDialog && selectedService) {
        const savedAuthorities = localStorage.getItem('authorityNumbers');
        const numbers = savedAuthorities ? JSON.parse(savedAuthorities) : { police: '', ambulance: '', firetruck: '' };

        switch (selectedService) {
            case 'police':
                setServiceContent({
                    title: t('Dashboard.policeAlertSentTitle'),
                    description: t('Dashboard.alertSentDesc'),
                    number: numbers.police || t('Dashboard.noNumberSaved'),
                    icon: <AlertIcon />
                });
                break;
            case 'ambulance':
                setServiceContent({
                    title: t('Dashboard.ambulanceAlertSentTitle'),
                    description: t('Dashboard.alertSentDesc'),
                    number: numbers.ambulance || t('Dashboard.noNumberSaved'),
                    icon: <AlertIcon />
                });
                break;
            case 'firetruck':
                setServiceContent({
                    title: t('Dashboard.firetruckAlertSentTitle'),
                    description: t('Dashboard.alertSentDesc'),
                    number: numbers.firetruck || t('Dashboard.noNumberSaved'),
                    icon: <AlertIcon />
                });
                break;
        }
    }
  }, [showNoNumberDialog, selectedService, t]);

  const handlePostLike = (postId: number) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p));
  };

  const handleMicSearch = () => {
    openVoiceSearch();
  };


  const allFeatures = useMemo(() => [
    { 
      href: "/startup-checklist", 
      icon: <ListChecks className="h-6 w-6 text-primary" />, 
      title: t('Dashboard.featureStartupChecklistTitle'), 
      description: t('Dashboard.featureStartupChecklistDesc') 
    },
    { 
      href: "/legal-compliance", 
      icon: <Scale className="h-6 w-6 text-primary" />, 
      title: t('Dashboard.featureLegalComplianceTitle'), 
      description: t('Dashboard.featureLegalComplianceDesc') 
    },
    { 
      href: "/implementation-tracker", 
      icon: <ImplementationTrackerIcon />, 
      title: t('Dashboard.featureImplementationTrackerTitle'), 
      description: t('Dashboard.featureImplementationTrackerDesc') 
    },
    { 
      href: "/funding-tracker", 
      icon: <FundingTrackerIcon />, 
      title: t('Dashboard.featureFundingTrackerTitle'), 
      description: t('Dashboard.featureFundingTrackerDesc') 
    },
    { 
      href: "/success-indicators", 
      icon: <SuccessIndicatorIcon />, 
      title: t('Dashboard.featureSuccessIndicatorsTitle'), 
      description: t('Dashboard.featureSuccessIndicatorsDesc') 
    },
    { 
      href: "/safe-cities", 
      icon: <Building2 className="h-6 w-6 text-primary" />, 
      title: t('Dashboard.featureSafeCitiesTitle'), 
      description: t('Dashboard.featureSafeCitiesDesc') 
    },
    { 
      href: "/community-empowerment", 
      icon: <CommunityIcon />, 
      title: t('Dashboard.featureCommunityEmpowermentTitle'), 
      description: t('Dashboard.featureCommunityEmpowermentDesc') 
    },
    { 
      href: "/global-monitoring", 
      icon: <GlobalMonitoringIcon />, 
      title: t('Dashboard.featureGlobalMonitoringTitle'), 
      description: t('Dashboard.featureGlobalMonitoringDesc') 
    },
    { 
      href: "/global-monitoring", 
      icon: <BarChartBig className="h-6 w-6 text-primary" />, 
      title: t('Dashboard.featureGlobalDataTitle'), 
      description: t('Dashboard.featureGlobalDataDesc') 
    },
    { 
      href: "/education", 
      icon: <GraduationCap className="h-6 w-6 text-primary" />, 
      title: t('Dashboard.featureEducationTitle'), 
      description: t('Dashboard.featureEducationDesc') 
    },
    { 
      href: "/legal-reform", 
      icon: <Scale className="h-6 w-6 text-primary" />, 
      title: t('Dashboard.featureLegalReformTitle'), 
      description: t('Dashboard.featureLegalReformDesc') 
    },
    { 
      href: "/male-engagement", 
      icon: <Handshake className="h-6 w-6 text-primary" />, 
      title: t('Dashboard.featureMaleEngagementTitle'), 
      description: t('Dashboard.featureMaleEngagementDesc') 
    },
    { 
      href: "/smart-safety", 
      icon: <Shield className="h-6 w-6 text-primary" />, 
      title: t('Dashboard.featureSmartSafetyTitle'), 
      description: t('Dashboard.featureSmartSafetyDesc') 
    },
    { 
      href: "/updates-feed", 
      icon: <RefreshCw className="h-6 w-6 text-primary" />, 
      title: t('Dashboard.featureUpdatesFeedTitle'), 
      description: t('Dashboard.featureUpdatesFeedDesc') 
    }
  ], [t]);

  const filteredFeatures = allFeatures.filter(feature => 
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterCategories = useMemo(() => [
    { id: 'startup-checklist', label: t('Dashboard.featureStartupChecklistTitle') },
    { id: 'legal-compliance', label: t('Dashboard.featureLegalComplianceTitle') },
    { id: 'global-data', label: t('Dashboard.featureGlobalDataTitle') },
    { id: 'education', label: t('Dashboard.featureEducationTitle') },
    { id: 'legal-reform', label: t('Dashboard.featureLegalReformTitle') },
    { id: 'male-engagement', label: t('Dashboard.featureMaleEngagementTitle') },
    { id: 'smart-safety', label: t('Dashboard.featureSmartSafetyTitle') },
    { id: 'safe-cities', label: t('Dashboard.featureSafeCitiesTitle') },
    { id: 'community-empowerment', label: t('Dashboard.featureCommunityEmpowermentTitle') },
    { id: 'global-monitoring', label: t('Dashboard.featureGlobalMonitoringTitle') },
    { id: 'implementation-tracker', label: t('Dashboard.featureImplementationTrackerTitle') },
    { id: 'funding-tracker', label: t('Dashboard.featureFundingTrackerTitle') },
    { id: 'success-indicators', label: t('Dashboard.featureSuccessIndicatorsTitle') },
    { id: 'updates-feed', label: t('Dashboard.featureUpdatesFeedTitle') },
  ], [t]);

  const severityLevels = useMemo(() => [
    { id: 'positive', label: t('Dashboard.filterSeverityPositive') },
    { id: 'neutral', label: t('Dashboard.filterSeverityNeutral') },
    { id: 'negative', label: t('Dashboard.filterSeverityNegative') },
  ], [t]);

  const dateRanges = useMemo(() => [
    { id: 'anytime', label: t('Dashboard.filterDateAnytime') },
    { id: 'last-week', label: t('Dashboard.filterDateLastWeek') },
    { id: 'last-month', label: t('Dashboard.filterDateLastMonth') },
  ], [t]);

  const handleConfirm = (service: 'police' | 'ambulance' | 'firetruck') => {
      setSelectedService(service);
      setShowNoNumberDialog(true);
  };

  const stateData = useMemo(() => [
    { 
      name: t('Dashboard.stateAndhraPradesh'), 
      score: 75,
      trend: 'up',
      details: [
        t('Dashboard.stateAPDetail1'),
        t('Dashboard.stateAPDetail2')
      ]
    },
    { name: t('Dashboard.stateArunachalPradesh'), score: 68, trend: 'down' },
    { name: t('Dashboard.stateAssam'), score: 65, trend: 'down' },
    { name: t('Dashboard.stateBihar'), score: 55, trend: 'down' },
    { name: t('Dashboard.stateChhattisgarh'), score: 62, trend: 'down' },
    { name: t('Dashboard.stateGoa'), score: 85, trend: 'down' },
    { name: t('Dashboard.stateGujarat'), score: 78, trend: 'down' },
    { name: t('Dashboard.stateHaryana'), score: 72, trend: 'up' },
    { name: t('Dashboard.stateHimachalPradesh'), score: 79, trend: 'up' },
    { name: t('Dashboard.stateJharkhand'), score: 58, trend: 'down' },
    { name: t('Dashboard.stateKarnataka'), score: 82, trend: 'up' },
    { name: t('Dashboard.stateKerala'), score: 88, trend: 'up' },
    { name: t('Dashboard.stateMadhyaPradesh'), score: 63, trend: 'down' },
    { name: t('Dashboard.stateMaharashtra'), score: 80, trend: 'up' },
    { name: t('Dashboard.stateManipur'), score: 61, trend: 'down' },
    { name: t('Dashboard.stateMeghalaya'), score: 70, trend: 'up' },
    { name: t('Dashboard.stateMizoram'), score: 75, trend: 'up' },
    { name: t('Dashboard.stateNagaland'), score: 67, trend: 'down' },
    { name: t('Dashboard.stateOdisha'), score: 66, trend: 'down' },
    { name: t('Dashboard.statePunjab'), score: 77, trend: 'up' },
    { name: t('Dashboard.stateRajasthan'), score: 64, trend: 'down' },
    { name: t('Dashboard.stateSikkim'), score: 84, trend: 'up' },
    { name: t('Dashboard.stateTamilNadu'), score: 81, trend: 'up' },
    { name: t('Dashboard.stateTelangana'), score: 79, trend: 'up' },
    { name: t('Dashboard.stateTripura'), score: 69, trend: 'down' },
    { name: t('Dashboard.stateUttarPradesh'), score: 60, trend: 'down' },
    { name: t('Dashboard.stateUttarakhand'), score: 74, trend: 'up' },
    { name: t('Dashboard.stateWestBengal'), score: 71, trend: 'down' },
  ], [t]);

  const unionTerritoriesData = useMemo(() => [
    { name: t('Dashboard.utAndaman'), score: 76, trend: 'up' },
    { name: t('Dashboard.utChandigarh'), score: 80, trend: 'up' },
    { name: t('Dashboard.utDadra'), score: 72, trend: 'down' },
    { name: t('Dashboard.utDelhi'), score: 68, trend: 'down' },
    { name: t('Dashboard.utJammuKashmir'), score: 60, trend: 'down' },
    { name: t('Dashboard.utLadakh'), score: 78, trend: 'up' },
    { name: t('Dashboard.utLakshadweep'), score: 85, trend: 'up' },
    { name: t('Dashboard.utPuducherry'), score: 79, trend: 'up' }
  ], [t]);

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
        toast({
            variant: "destructive",
            title: t('Error'),
            description: t('Dashboard.sharingNotSupported')
        });
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
        toast({
            variant: "destructive",
            title: t('Error'),
            description: t('Dashboard.sharingNotSupported')
        });
    }
  };

  const handleLogout = async () => {
    if (isGuest) {
      exitGuestMode();
      router.push('/login');
      toast({
        title: t('Settings.loggedOut'),
        description: t('Settings.guestLoggedOutDesc'),
      });
      return;
    }
    if (!auth) return;
    await signOut(auth);
    toast({
      title: t('Settings.loggedOut'),
      description: t('Settings.loggedOutDesc'),
    });
    router.push('/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">{t('Dashboard.loading')}</div>;
  }
  
  if (!user) {
    return null;
  }


  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">{t('Dashboard.title')}</h1>
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
                <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ''} />
                <AvatarFallback>{(user.displayName || user.email || 'U').charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none shadow-none w-fit max-w-[90vw] h-fit flex items-center justify-center">
              <DialogHeader className="sr-only">
                <DialogTitle>{user.displayName}'s Profile Photo</DialogTitle>
                <DialogDescription>A larger view of your profile photo.</DialogDescription>
              </DialogHeader>
              <Avatar className="h-64 w-64">
                <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ''} />
                <AvatarFallback>{(user.displayName || user.email || 'U').charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </DialogContent>
          </Dialog>
           <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-6 w-6" />
           </Button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <Card className="bg-secondary/50 border-border">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{t('Dashboard.currentLocation')}</p>
                <p className="font-semibold">Patna Junction, Patna</p>
              </div>
            </div>
            <Link href="/location-settings">
              <Button variant="link" className="text-primary">{t('Dashboard.change')}</Button>
            </Link>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t('Dashboard.searchPlaceholder')}
              className="pl-10 bg-secondary/50 border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="bg-secondary/50 border-border" onClick={handleMicSearch}>
            <Mic className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-secondary/50 border-border">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background rounded-t-lg">
              <SheetHeader className="text-left">
                <SheetTitle className="text-xl font-bold mb-4">{t('Dashboard.advancedFilters')}</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[60vh]">
                <div className="p-1">
                  <h3 className="text-lg font-semibold mb-3">{t('Dashboard.category')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {filterCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox id={category.id} />
                        <Label htmlFor={category.id} className="font-normal">{category.label}</Label>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-semibold mb-3">{t('Dashboard.severityLevel')}</h3>
                  <div className="space-y-4">
                    {severityLevels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-2">
                        <Checkbox id={level.id} />
                        <Label htmlFor={level.id} className="font-normal">{level.label}</Label>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />

                  <h3 className="text-lg font-semibold mb-3">{t('Dashboard.dateRange')}</h3>
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
                <Button variant="outline" className="w-1/2 mr-2">{t('Dashboard.reset')}</Button>
                <Button className="w-1/2 ml-2">{t('Dashboard.applyFilters')}</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Sheet>
            <SheetTrigger asChild>
                <Card className="bg-destructive cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center text-white">
                        <div className="border-2 border-white p-2 mb-2">
                        <span className="text-lg font-bold">SOS</span>
                        </div>
                        <h2 className="text-2xl font-bold">{t('Dashboard.sosButton')}</h2>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background text-foreground rounded-t-lg">
                <SheetHeader className="text-left p-4">
                    <div className="flex justify-between items-center">
                        <SheetTitle className="text-xl font-bold">{t('Dashboard.selectEmergencyService')}</SheetTitle>
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
                                        <h3 className="font-semibold">{t('Dashboard.police')}</h3>
                                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">{emergencyNumbers.police || t('Dashboard.noNumberSaved')}</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <div className="flex justify-center">
                                 <div className="bg-primary/10 p-3 rounded-full">
                                    <PoliceIcon />
                                </div>
                              </div>
                              <AlertDialogTitle className="text-center">{t('Dashboard.contactPoliceConfirmTitle')}</AlertDialogTitle>
                              <AlertDialogDescription>
                              {t('Dashboard.contactPoliceConfirmDesc')}
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col space-y-2 sm:flex-col sm:space-x-0">
                              <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleConfirm('police')}>{t('Dashboard.confirmAction')}</AlertDialogAction>
                              <AlertDialogCancel>{t('Dashboard.cancel')}</AlertDialogCancel>
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
                                        <h3 className="font-semibold">{t('Dashboard.ambulance')}</h3>
                                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">{emergencyNumbers.ambulance || t('Dashboard.noNumberSaved')}</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <div className="flex justify-center">
                                 <div className="bg-destructive/10 p-3 rounded-full">
                                    <AmbulanceIcon />
                                 </div>
                              </div>
                              <AlertDialogTitle className="text-center">{t('Dashboard.contactAmbulanceConfirmTitle')}</AlertDialogTitle>
                              <AlertDialogDescription >
                              {t('Dashboard.contactAmbulanceConfirmDesc')}
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col space-y-2 sm:flex-col sm:space-x-0">
                              <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleConfirm('ambulance')}>{t('Dashboard.confirmAction')}</AlertDialogAction>
                              <AlertDialogCancel>{t('Dashboard.cancel')}</AlertDialogCancel>
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
                                        <h3 className="font-semibold">{t('Dashboard.firetruck')}</h3>
                                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">{emergencyNumbers.firetruck || t('Dashboard.noNumberSaved')}</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <div className="flex justify-center">
                                <div className="bg-orange-500/10 p-3 rounded-full">
                                    <FireTruckIcon />
                                 </div>
                              </div>
                              <AlertDialogTitle className="text-center">{t('Dashboard.contactFiretruckConfirmTitle')}</AlertDialogTitle>
                              <AlertDialogDescription>
                              {t('Dashboard.contactFiretruckConfirmDesc')}
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col space-y-2 sm:flex-col sm:space-x-0">
                              <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleConfirm('firetruck')}>{t('Dashboard.confirmAction')}</AlertDialogAction>
                              <AlertDialogCancel>{t('Dashboard.cancel')}</AlertDialogCancel>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
            </SheetContent>
        </Sheet>
        
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {bannerImages.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="bg-secondary/50 border-border overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={300}
                      className="w-full object-cover aspect-[2/1]"
                      data-ai-hint={image.hint}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <AlertDialog open={showNoNumberDialog} onOpenChange={setShowNoNumberDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-center">
                        {serviceContent.icon}
                    </div>
                    <AlertDialogTitle className="text-center">{serviceContent.title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        {serviceContent.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="p-4 bg-secondary/50 rounded-md text-center font-semibold">
                    {serviceContent.number}
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction className="w-full" onClick={() => setShowNoNumberDialog(false)}>{t('Dashboard.ok')}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <Dialog>
            <DialogTrigger asChild>
                <Card className="bg-secondary/50 border-border cursor-pointer">
                <CardContent className="p-4">
                    <h3 className="font-semibold">{t('Dashboard.welcomeMessage', { name: user.displayName || t('Dashboard.guestUser') })}</h3>
                    <p className="text-muted-foreground">
                    {t('Dashboard.globalSafetyScore', { score: '76/100' })}
                    </p>
                    <p className="text-green-400 text-sm">{t('Dashboard.scoreTrend', { points: 2 })}</p>
                </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="bg-background text-foreground max-w-md w-full">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {t('Dashboard.safetyScoreDialogTitle')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('Dashboard.safetyScoreDialogDesc')}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh]">
                <div className="p-1 pr-6 space-y-6">
                    <div className="flex items-center justify-around text-center">
                    <div>
                        <p className="text-muted-foreground">{t('Dashboard.lastWeek')}</p>
                        <p className="text-4xl font-bold text-muted-foreground">74</p>
                    </div>
                    <ArrowRight className="h-8 w-8 text-green-500" />
                    <div>
                        <p className="text-muted-foreground">{t('Dashboard.currentScore')}</p>
                        <p className="text-4xl font-bold text-green-500">76</p>
                    </div>
                    </div>

                    <Card className="bg-secondary/50">
                    <CardContent className="p-4">
                        <h4 className="font-semibold">{t('Dashboard.reasonForChangeTitle')}</h4>
                        <p className="text-sm text-muted-foreground">{t('Dashboard.reasonForChangeDesc')}</p>
                    </CardContent>
                    </Card>

                    <div>
                    <h4 className="font-semibold mb-4">{t('Dashboard.scoreBreakdownTitle')}</h4>
                    <div className="space-y-4">
                        <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{t('Dashboard.legalAndPolicyReform')}</span>
                            <span>82/100</span>
                        </div>
                        <Progress value={82} className="h-2 [&>div]:bg-primary" />
                        </div>
                        <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{t('Dashboard.publicAwareness')}</span>
                            <span>75/100</span>
                        </div>
                        <Progress value={75} className="h-2 [&>div]:bg-primary" />
                        </div>
                        <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{t('Dashboard.safetyInfrastructure')}</span>
                            <span>68/100</span>
                        </div>
                        <Progress value={68} className="h-2 [&>div]:bg-yellow-500" />
                        </div>
                        <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{t('Dashboard.incidentReportingRate')}</span>
                            <span>79/100</span>
                        </div>
                        <Progress value={79} className="h-2 [&>div]:bg-primary" />
                        </div>
                    </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">{t('Dashboard.stateWiseDataTitle')}</h4>
                        <Accordion type="single" collapsible className="w-full">
                        {stateData.map((state, index) => (
                            <AccordionItem value={`item-${index}`} key={index} className="border-none">
                                <AccordionTrigger className="p-0 hover:no-underline">
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
                                                        className="h-8"
                                                        onClick={() => handleShare(t('Dashboard.shareSafetyUpdate', { state: state.name }), t('Dashboard.shareSafetyUpdateText', { details: state.details.join(' ') }))}
                                                    >
                                                        <Share2 className="mr-2 h-4 w-4" />
                                                        {t('Dashboard.share')}
                                                    </Button>
                                                </>
                                            ) : (
                                                <p className="text-sm">{t('Dashboard.noDetailedData')}</p>
                                            )}
                                        </div>
                                    </Card>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">{t('Dashboard.unionTerritoriesTitle')}</h4>
                        <Accordion type="single" collapsible className="w-full">
                        {unionTerritoriesData.map((state, index) => (
                            <AccordionItem value={`item-ut-${index}`} key={index} className="border-none">
                                <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
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
                                            <p className="text-sm">{t('Dashboard.noDetailedDataUT')}</p>
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
                    <Button className="w-full mt-4">{t('Dashboard.ok')}</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>


        <div className="grid grid-cols-2 gap-4">
          <Link href="/smart-safety" className="block">
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-sm font-semibold text-center">{t('Dashboard.safetyTools')}</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/community-empowerment" className="block">
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-sm font-semibold text-center">{t('Dashboard.findSupport')}</span>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{t('Dashboard.exploreFeatures')}</h2>
              {filteredFeatures.length > 4 && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="link">{t('Dashboard.viewAll')}</Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="bg-background rounded-t-lg h-[90vh]">
                     <SheetHeader>
                        <SheetTitle className="text-xl font-bold">{t('Dashboard.allFeatures')}</SheetTitle>
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
            <h2 className="text-xl font-bold">{t('Dashboard.recentUpdates')}</h2>
            {posts.map((post) => (
              <Card key={post.id} className={`bg-secondary/50 border-border ${post.highlighted ? 'border-primary border-2' : ''}`}>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-primary">{post.title}</h3>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t('Dashboard.likes', { count: post.likes })}</span>
                      <span>{t('Dashboard.comments', { count: post.commentsCount })}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-around">
                      <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => handlePostLike(post.id)}>
                          <ThumbsUp className={`h-4 w-4 ${post.liked ? 'text-primary' : ''}`} /> {t('Dashboard.like')}
                      </Button>
                      <Dialog>
                          <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4" /> {t('Dashboard.comment')}
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
                          <Share2 className="h-4 w-4" /> {t('Dashboard.sharePost')}
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

    

    

    
