
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

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

            <footer className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border">
                <div className="flex justify-around items-center p-2 relative">
                    <Link href="/" className="flex flex-col items-center text-primary">
                        <Home className="h-6 w-6" />
                        <span className="text-xs">होम</span>
                    </Link>
                    <Link href="/global-monitoring" className="flex flex-col items-center text-muted-foreground">
                        <BarChart2 className="h-6 w-6" />
                        <span className="text-xs">डेटा</span>
                    </Link>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                        <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 h-14 w-14 shadow-lg">
                            <Plus className="h-8 w-8 text-white" />
                        </Button>
                    </div>
                    <Link href="/updates-feed" className="flex flex-col items-center text-muted-foreground">
                        <RefreshCw className="h-6 w-6" />
                        <span className="text-xs">अपडेट्स</span>
                    </Link>
                    <Link href="/settings" className="flex flex-col items-center text-muted-foreground">
                        <Settings className="h-6 w-6" />
                        <span className="text-xs">सेटिंग्स</span>
                    </Link>
                </div>
            </footer>
             {/* Spacer for bottom nav */}
             <div className="h-24"></div>
        </div>
    );
}
