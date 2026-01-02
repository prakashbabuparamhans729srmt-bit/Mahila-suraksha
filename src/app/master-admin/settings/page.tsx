'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export default function MasterAdminSettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <header className="flex items-center p-4 border-b border-border">
        <Link href="/master-admin" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">मास्टर एडमिन सेटिंग्स</h1>
      </header>

      <main className="flex-grow p-4 space-y-6 overflow-auto">
        <p className="text-muted-foreground px-1">
          एडमिनिस्ट्रेटर-विशिष्ट सेटिंग्स और कॉन्फ़िगरेशन प्रबंधित करें।
        </p>

        <Card className="bg-secondary/50 border-border">
            <CardHeader>
                <CardTitle>उपयोगकर्ता प्रबंधन</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="default-role">नए उपयोगकर्ताओं के लिए डिफ़ॉल्ट भूमिका</Label>
                    <Select>
                        <SelectTrigger id="default-role" className="w-full bg-background">
                        <SelectValue placeholder="एक भूमिका चुनें" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="user">उपयोगकर्ता</SelectItem>
                        <SelectItem value="moderator">मॉडरेटर</SelectItem>
                        <SelectItem value="admin">एडमिन</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
                    <div className="space-y-0.5">
                        <Label>ईमेल सत्यापन की आवश्यकता है</Label>
                        <p className="text-xs text-muted-foreground">
                        साइन अप करने पर उपयोगकर्ताओं को अपना ईमेल सत्यापित करने के लिए बाध्य करें।
                        </p>
                    </div>
                    <Switch defaultChecked={true} />
                </div>
            </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-border">
            <CardHeader>
                <CardTitle>सामग्री मॉडरेशन</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
                    <div className="space-y-0.5">
                        <Label>स्वचालित सामग्री फ़्लैगिंग</Label>
                        <p className="text-xs text-muted-foreground">
                        संभावित रूप से अनुचित सामग्री को चिह्नित करने के लिए AI का उपयोग करें।
                        </p>
                    </div>
                    <Switch defaultChecked={true} />
                </div>
            </CardContent>
        </Card>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg h-12">सेटिंग्स सहेजें</Button>

      </main>

      <BottomNav />
    </div>
  );
}
