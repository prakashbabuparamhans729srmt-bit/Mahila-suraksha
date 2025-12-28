
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function LegalReformPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">कानूनी सुधार ट्रैकिंग</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <div className='space-y-2'>
                    <label className="text-sm text-muted-foreground px-1">देश के अनुसार फ़िल्टर करें</label>
                    <Select defaultValue="india">
                        <SelectTrigger className="w-full bg-secondary/50 border-input">
                            <SelectValue placeholder="देश" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="india">भारत</SelectItem>
                            <SelectItem value="usa">संयुक्त राज्य अमेरिका</SelectItem>
                            <SelectItem value="uk">यूनाइटेड किंगडम</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg leading-tight">आपराधिक कानून (संशोधन) अधिनियम, 2013</h3>
                            <Badge className="bg-green-500 text-black">Implemented</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            यौन अपराधों के लिए कठोर दंड का प्रावधान किया और बलात्कार की परिभाषा का विस्तार किया।
                        </p>
                        <Button variant="link" className="p-0 h-auto text-blue-400">
                            और पढ़ें
                        </Button>
                    </CardContent>
                </Card>
            </main>

            <BottomNav />
        </div>
    );
}
