
'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useVoiceSearch } from '@/context/voice-search-context';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export function VoiceSearchModal() {
  const { isVoiceSearchOpen, closeVoiceSearch, setSearchQuery } = useVoiceSearch();
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      const newTranscript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      setTranscript(newTranscript);

      searchTimeoutRef.current = setTimeout(() => {
        handleSearch(newTranscript);
      }, 3000);
    };
    
    recognition.onend = () => {
        setIsListening(false);
        // If there's a final transcript, search for it.
        if (transcript && !searchTimeoutRef.current) {
            handleSearch(transcript);
        }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      let errorMessage = 'एक अज्ञात त्रुटि हुई।';
       if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            errorMessage = "माइक्रोफ़ोन की अनुमति नहीं दी गई है। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।";
        } else if (event.error === 'no-speech') {
            errorMessage = "कोई आवाज़ नहीं मिली। कृपया फिर से प्रयास करें।";
        }
       toast({
         variant: "destructive",
         title: "माइक्रोफ़ोन त्रुटि",
         description: errorMessage,
       });
      setIsListening(false);
      closeVoiceSearch();
    };

    recognitionRef.current = recognition;
  }, [toast, closeVoiceSearch, transcript]);

  const handleSearch = (query: string) => {
     if (query.trim()) {
        setSearchQuery(query.trim());
     }
     closeModal();
  }

  const startListening = () => {
     if (recognitionRef.current) {
         setTranscript('');
         try {
            recognitionRef.current.start();
         } catch(e) {
            console.error("Could not start recognition", e);
            toast({
                variant: "destructive",
                title: "माइक्रोफ़ोन त्रुटि",
                description: "माइक्रोफ़ोन पहले से ही चल रहा हो सकता है या कोई अन्य त्रुटि हुई है।",
            });
         }
     } else {
         toast({
            variant: "destructive",
            title: "असमर्थित ब्राउज़र",
            description: "आपका ब्राउज़र वाक् पहचान का समर्थन नहीं करता है।",
        });
        closeVoiceSearch();
     }
  };

  const stopListening = () => {
      if (recognitionRef.current && isListening) {
          recognitionRef.current.stop();
      }
  };
  
  const closeModal = () => {
    stopListening();
    setTranscript('');
    if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
    }
    closeVoiceSearch();
  }

  useEffect(() => {
      if (isVoiceSearchOpen) {
          startListening();
      } else {
          stopListening();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVoiceSearchOpen]);

  return (
    <Dialog open={isVoiceSearchOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="bg-black/80 border-none shadow-2xl backdrop-blur-sm max-w-lg w-[90vw] h-[50vh] flex flex-col items-center justify-center text-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">मैं आपकी कैसे मदद कर सकता हूँ?</DialogTitle>
          <DialogDescription>
            बोलना शुरू करें, मैं सुन रहा हूँ...
          </DialogDescription>
        </DialogHeader>
        <div 
          className={cn(
            "my-8 flex items-center justify-center w-32 h-32 rounded-full bg-red-500 transition-all duration-300",
            isListening && 'animate-pulse'
          )}
        >
          <Mic className="h-16 w-16 text-white" />
        </div>
        <p className="text-xl h-7 min-h-[1.75rem]">{transcript || '...'}</p>
      </DialogContent>
    </Dialog>
  );
}
