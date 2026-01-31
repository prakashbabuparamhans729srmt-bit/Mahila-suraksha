'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
  const [messages, setMessages] = useState<Message[]>([
    { text: 'नमस्ते! मैं आपका AI सहायक हूँ। आप मुझसे कुछ भी पूछ सकते हैं।', sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        title: "असमर्थित ब्राउज़र",
        description: "आपका ब्राउज़र वाक् पहचान का समर्थन नहीं करता है।",
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      setInput(transcript);
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
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
  }, [toast]);
  

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
            title: "माइक्रोफ़ोन त्रुटि",
            description: "माइक्रोफ़ोन शुरू नहीं किया जा सका। कृपया अनुमति जांचें।",
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
      const botMessage: Message = { text: `मैं आपके प्रश्न "${input}" को प्रोसेस कर रहा हूँ।`, sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
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
                    ? 'bg-blue-600 text-primary-foreground'
                    : 'bg-secondary'
                )}
              >
                <p className="text-sm">{message.text}</p>
                <p className={cn("text-xs mt-1 text-right", message.sender === 'user' ? 'text-blue-200' : 'text-muted-foreground')}>{message.timestamp}</p>
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
                    सुन रहा हूँ...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            placeholder="एक संदेश लिखें..."
            className="bg-secondary/50 border-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button type="button" size="icon" variant={isListening ? 'destructive' : 'outline'} onClick={handleMicClick}>
            <Mic className="h-5 w-5" />
          </Button>
          <Button type="button" size="icon" onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
