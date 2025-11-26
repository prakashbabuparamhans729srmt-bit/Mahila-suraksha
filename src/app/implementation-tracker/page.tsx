
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, BarChart2, Plus, RefreshCw, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function ImplementationTrackerPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center p-4">
                <Link href="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">कार्यान्वयन ट्रैकर</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <div className='space-y-2'>
                    <label className="text-sm text-muted-foreground px-1">देखने के लिए एक परियोजना चुनें</label>
                    <Select defaultValue="global-helpline">
                        <SelectTrigger className="w-full bg-secondary/50 border-input">
                            <SelectValue placeholder="एक परियोजना चुनें" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="global-helpline">वैश्विक हेल्पलाइन नेटवर्क विस्तार</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 space-y-4">
                        <h2 className="font-bold text-lg">वैश्विक हेल्पलाइन नेटवर्क विस्तार</h2>
                        <p className="text-sm text-muted-foreground">
                            चरण 1 का उद्देश्य कम सेवा वाले क्षेत्रों में 100 नई 24/7, बहुभाषी हेल्पलाइन स्थापित करना है, जो उत्तरजीवियों के लिए तत्काल संकट सहायता और संसाधन कनेक्शन प्रदान करता है।
                        </p>

                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold">50 उच्च-प्राथमिकता वाले क्षेत्रों की पहचान करें <span className="text-muted-foreground text-sm">(अनुसंधान दल)</span></p>
                                <div className="mt-2 bg-background p-2 rounded-md flex items-center">
                                    <div className="w-full bg-green-500 h-2 rounded-md"></div>
                                </div>
                                <div className="text-right mt-1">
                                    <Badge className="bg-green-500 text-black">Done</Badge>
                                </div>
                            </div>

                             <div>
                                <p className="font-semibold">200 सलाहकारों की भर्ती और प्रशिक्षण <span className="text-muted-foreground text-sm">(मानव संसाधन और प्रशिक्षण)</span></p>
                                <div className="mt-2 bg-background p-2 rounded-md flex items-center">
                                    <div className="w-2/3 bg-yellow-500 h-2 rounded-l-md"></div>
                                    <div className="w-1/3 bg-gray-600 h-2 rounded-r-md"></div>
                                </div>
                                <div className="text-right mt-1">
                                    <Badge className="bg-yellow-500 text-black">In Progress</Badge>
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold">तकनीकी अवसंरचना स्थापित करें <span className="text-muted-foreground text-sm">(आईटी विभाग)</span></p>
                                 <div className="mt-2 bg-background p-2 rounded-md flex items-center">
                                    <div className="w-1/2 bg-yellow-500 h-2 rounded-l-md"></div>
                                    <div className="w-1/2 bg-gray-600 h-2 rounded-r-md"></div>
                                </div>
                                <div className="text-right mt-1">
                                    <Badge className="bg-yellow-500 text-black">In Progress</Badge>
                                </div>
                            </div>
                            
                            <div>
                                <p className="font-semibold">पहली 50 हेल्पलाइन शुरू करें <span className="text-muted-foreground text-sm">(संचालन)</span></p>
                                <div className="mt-2 bg-background p-2 rounded-md flex items-center">
                                    <div className="w-full bg-gray-600 h-2 rounded-md"></div>
                                </div>
                                <div className="text-right mt-1">
                                     <Badge variant="secondary" className="bg-gray-700 text-white">To Do</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border">
                <div className="flex justify-around items-center p-2 relative">
                    <Link href="/" className="flex flex-col items-center text-primary">
                        <Home className="h-6 w-6" />
                        <span className="text-xs">होम</span>
                    </Link>
                    <div className="flex flex-col items-center text-muted-foreground">
                        <BarChart2 className="h-6 w-6" />
                        <span className="text-xs">डेटा</span>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                        <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 h-14 w-14 shadow-lg">
                            <Plus className="h-8 w-8 text-white" />
                        </Button>
                    </div>
                    <div className="flex flex-col items-center text-muted-foreground">
                        <RefreshCw className="h-6 w-6" />
                        <span className="text-xs">अपडेट्स</span>
                    </div>
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
