
'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';

// Define the type for the SpeechRecognition API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

type Message = {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
};

export function Chatbot() {
  const { t, locale } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMessages([
      { text: t('Chatbot.welcomeMessage'), sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
  }, [t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: "destructive",
        title: t('Chatbot.unsupportedBrowser'),
        description: t('Chatbot.unsupportedBrowserDescription'),
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = locale;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      let errorMessage = t('Chatbot.unknownError');
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        errorMessage = t('Chatbot.micNotAllowed');
      } else if (event.error === 'no-speech') {
        errorMessage = t('Chatbot.noSpeech');
      }
      toast({
        variant: "destructive",
        title: t('Chatbot.micError'),
        description: errorMessage,
      });
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
  }, [toast, t, locale]);
  

  const handleMicClick = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch(e) {
        console.error("Could not start recognition", e);
        toast({
            variant: "destructive",
            title: t('Chatbot.micError'),
            description: t('Chatbot.micStartError'),
        });
      }
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, sender: 'user', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = { text: t('Chatbot.processing', { input }), sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-end gap-2',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'bot' && (
                <Avatar className="h-8 w-8 bg-secondary">
                  <AvatarFallback>
                    <Bot className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-lg px-3 py-2',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                )}
              >
                <p className="text-sm">{message.text}</p>
                <p className={cn("text-xs mt-1 text-right", message.sender === 'user' ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{message.timestamp}</p>
              </div>
            </div>
          ))}
           {isListening && (
              <div className="flex justify-start items-end gap-2">
                <Avatar className="h-8 w-8 bg-secondary">
                  <AvatarFallback>
                    <Bot className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary px-4 py-2 rounded-lg text-sm text-muted-foreground animate-pulse">
                    {t('Chatbot.listening')}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            placeholder={t('Chatbot.placeholder')}
            className="bg-secondary/50 border-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button type="button" size="icon" variant={isListening ? 'destructive' : 'outline'} onClick={handleMicClick}>
            <Mic className="h-5 w-5" />
          </Button>
          <Button type="button" size="icon" onClick={handleSend}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
