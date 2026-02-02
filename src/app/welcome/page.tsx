'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase/auth/use-user';
import { useGuest } from '@/context/guest-context';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';
import { Loader } from '@/components/loader';

const welcomeImages = [
    { src: 'https://picsum.photos/seed/women-support/800/1200', alt: 'A group of women supporting each other', hint: 'women support' },
    { src: 'https://picsum.photos/seed/safe-street-night/800/1200', alt: 'A well-lit city street at night, symbolizing safety', hint: 'safe street' },
    { src: 'https://picsum.photos/seed/confident-walk/800/1200', alt: 'A woman walking confidently and safely', hint: 'confident woman' },
    { src: 'https://picsum.photos/seed/unity-hands/800/1200', alt: 'Close-up of hands held together in unity and support', hint: 'unity hands' },
    { src: 'https://picsum.photos/seed/hope-sunrise/800/1200', alt: 'A woman silhouetted against a hopeful sunrise', hint: 'hope sunrise' },
    { src: 'https://picsum.photos/seed/digital-safety/800/1200', alt: 'A person using a smartphone to connect with a support network', hint: 'digital safety' },
];

export default function WelcomePage() {
    const { user, loading } = useUser();
    const { isGuest } = useGuest();
    const router = useRouter();
    const { t } = useTranslation();

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const updateSelectedIndex = useCallback((api: any) => {
        if (!api) return;
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        updateSelectedIndex(emblaApi);
        emblaApi.on('select', updateSelectedIndex);
        emblaApi.on('reInit', updateSelectedIndex);
    }, [emblaApi, updateSelectedIndex]);

    useEffect(() => {
        if (!loading && (user || isGuest)) {
            router.push('/');
        }
    }, [user, loading, isGuest, router]);

    if (loading || (!loading && (user || isGuest))) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-background">
                <Loader className="h-8 w-8" />
            </div>
        );
    }
    
    return (
        <div className="relative h-screen w-screen overflow-hidden bg-black">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {welcomeImages.map((img, index) => (
                        <div className="relative flex-[0_0_100%] h-full" key={index}>
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                data-ai-hint={img.hint}
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-black/30" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-background/90 backdrop-blur-sm rounded-t-3xl">
                 <div className="flex justify-start space-x-2 absolute top-[-40px] left-8">
                    {welcomeImages.map((_, index) => (
                        <button
                            key={index}
                            aria-label={`Go to slide ${index + 1}`}
                            className={cn(
                                'h-1.5 rounded-full transition-all duration-300',
                                index === selectedIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                            )}
                            onClick={() => emblaApi?.scrollTo(index)}
                        />
                    ))}
                </div>
                
                <Button asChild className="w-full text-lg font-bold h-14 rounded-full">
                    <Link href="/signup">
                        <UserPlus className="mr-2 h-6 w-6" />
                        {t('Welcome.signUp')}
                    </Link>
                </Button>
                <div className="text-center mt-4">
                    <span className="text-muted-foreground text-sm">
                        {t('Welcome.alreadyHaveAccount')}{' '}
                        <Link href="/login" className="text-primary font-semibold hover:underline">
                            {t('Welcome.logIn')}
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
