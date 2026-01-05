
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    country: '',
    state: '',
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: 'country' | 'state', value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing up with:', formData);
    toast({
      title: "खाता बनाया गया!",
      description: "हमारे आंदोलन में शामिल होने के लिए धन्यवाद।",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/login" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">खाता बनाएं</h1>
      </header>

      <main className="p-4 flex items-center justify-center">
        <Card className="w-full max-w-sm bg-secondary/50 border-border">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">आंदोलन में शामिल हों</h2>
              <p className="text-muted-foreground">शुरू करने के लिए एक खाता बनाएं</p>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-4">
              <Input 
                type="text" 
                name="fullName"
                placeholder="पूरा नाम" 
                className="bg-background border-input"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <Input 
                type="email" 
                name="email"
                placeholder="ईमेल पता" 
                className="bg-background border-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input 
                type="password" 
                name="password"
                placeholder="पासवर्ड"
                className="bg-background border-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
               <Select onValueChange={(value) => handleSelectChange('country', value)} required>
                <SelectTrigger className="w-full bg-background border-input">
                  <SelectValue placeholder="देश" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">भारत</SelectItem>
                  <SelectItem value="usa">संयुक्त राज्य अमेरिका</SelectItem>
                  <SelectItem value="uk">यूनाइटेड किंगडम</SelectItem>
                </SelectContent>
              </Select>
               <Select onValueChange={(value) => handleSelectChange('state', value)} required>
                <SelectTrigger className="w-full bg-background border-input">
                  <SelectValue placeholder="राज्य" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">दिल्ली</SelectItem>
                  <SelectItem value="maharashtra">महाराष्ट्र</SelectItem>
                  <SelectItem value="karnataka">कर्नाटक</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-12">
                खाता बनाएं
              </Button>
            </form>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">पहले से ही एक खाता है? </span>
              <Link href="/login" className="text-blue-500 hover:underline">
                लॉग इन करें
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
