
'use client';

import Link from 'next/link';
import { ArrowLeft, BarChart2, Home, Plus, RefreshCw, Settings, ChevronRight, X, Trash2, UserCog } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { BottomNav } from '@/components/layout/bottom-nav';


export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [personalContacts, setPersonalContacts] = React.useState([
    { id: 1, name: '', phone: '' },
  ]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  const addContact = () => {
    const newId = personalContacts.length > 0 ? Math.max(...personalContacts.map(c => c.id)) + 1 : 1;
    setPersonalContacts([...personalContacts, { id: newId, name: '', phone: '' }]);
  };

  const removeContact = (id: number) => {
    setPersonalContacts(personalContacts.filter(contact => contact.id !== id));
  };

  if (!mounted) {
    return null;
  }


  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">सेटिंग्स</h1>
      </header>

      <main className="p-4 space-y-8">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">सुरक्षा और आपातकाल</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Card className="bg-secondary/50 border-border cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">आपातकालीन सेटिंग्स</h3>
                    <p className="text-sm text-muted-foreground">एसओएस संपर्क और अलर्ट प्रबंधित करें</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background text-foreground rounded-t-lg h-[90vh] flex flex-col">
              <SheetHeader className="text-left p-4">
                <div className="flex justify-between items-center">
                  <SheetTitle className="text-xl font-bold">आपातकालीन सेटिंग्स</SheetTitle>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                </div>
              </SheetHeader>
              <div className="overflow-y-auto px-4 pb-4 flex-grow">
                <p className="text-muted-foreground mb-6">
                  एसओएस स्थिति में उपयोग के लिए स्थानीय प्राधिकरणों और व्यक्तिगत संपर्कों के लिए आपातकालीन नंबर जोड़ें। यह जानकारी केवल आपके डिवाइस पर संग्रहीत है।
                </p>

                <div className="space-y-6">
                  <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 space-y-4">
                      <h3 className="font-semibold text-lg">स्थानीय प्राधिकरण</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium flex items-center">पुलिस 🚨</label>
                          <Input className="mt-1 bg-background border-border" placeholder="पुलिस का नंबर दर्ज करें" />
                        </div>
                        <div>
                          <label className="text-sm font-medium flex items-center">एम्बुलेंस 🚑</label>
                          <Input className="mt-1 bg-background border-border" placeholder="एम्बुलेंस का नंबर दर्ज करें" />
                        </div>
                        <div>
                          <label className="text-sm font-medium flex items-center">दमकल 🚒</label>
                          <Input className="mt-1 bg-background border-border" placeholder="दमकल का नंबर दर्ज करें" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 space-y-4">
                      <h3 className="font-semibold text-lg">व्यक्तिगत संपर्क</h3>
                      {personalContacts.map((contact, index) => (
                        <div key={contact.id} className="space-y-3">
                           <div className="flex justify-between items-center">
                             <label className="text-sm font-medium">संपर्क {index + 1}</label>
                             <Button variant="ghost" size="icon" onClick={() => removeContact(contact.id)} className="text-muted-foreground hover:text-destructive">
                               <Trash2 className="h-5 w-5" />
                             </Button>
                           </div>
                          <Input className="bg-background border-border" placeholder="संपर्क का नाम" />
                          <Input className="bg-background border-border" placeholder="संपर्क का फ़ोन नंबर" type="tel" />
                          {index < personalContacts.length -1 && <Separator className="my-4" />}
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full" onClick={addContact}>
                        <Plus className="mr-2 h-4 w-4" />
                        एक और संपर्क जोड़ें
                      </Button>

                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="p-4 mt-auto">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-12">
                  संपर्क सहेजें
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">खतरा क्षेत्र अलर्ट</h2>
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">खतरा क्षेत्र अलर्ट सक्षम करें</h3>
                  <p className="text-sm text-muted-foreground">ज्ञात उच्च जोखिम वाले क्षेत्र में प्रवेश करने पर एक अलर्ट प्राप्त करें।</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">अलर्ट पर कंपन</h3>
                  <p className="text-sm text-muted-foreground">खतरा क्षेत्र अलर्ट ट्रिगर होने पर डिवाइस को वाइब्रेट करें।</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">सामग्री और भाषा</h2>
          <Card className="bg-secondary/50 border-border divide-y divide-border">
            <CardContent className="p-4">
              <Link href="/language-settings" className="flex items-center justify-between w-full">
                <div>
                  <h3 className="font-semibold">भाषा</h3>
                  <p className="text-sm text-muted-foreground">ऐप की प्रदर्शन भाषा बदलें</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </CardContent>
            <CardContent className="p-4">
              <Link href="/location-settings" className="flex items-center justify-between w-full">
                <div>
                  <h3 className="font-semibold">स्थान</h3>
                  <p className="text-sm text-muted-foreground">स्थानीय डेटा के लिए अपनी स्थान सेटिंग्स प्रबंधित करें</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">दिखावट</h2>
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">ऐप थीम</h3>
                  <p className="text-sm text-muted-foreground">लाइट और डार्क मोड के बीच स्विच करें</p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
              </div>
              <div>
                <h3 className="font-semibold">टेक्स्ट का आकार</h3>
                <p className="text-sm text-muted-foreground">पठनीयता के लिए टेक्स्ट का आकार समायोजित करें</p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button variant="outline">छोटा</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">मध्यम</Button>
                  <Button variant="outline">बड़ा</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">प्रशासन</h2>
           <Link href="/master-admin" className="block">
              <Card className="bg-secondary/50 border-border cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <UserCog className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">मास्टर एडमिन पैनल</h3>
                            <p className="text-sm text-muted-foreground">उपयोगकर्ताओं, सामग्री और ऐप सेटिंग्स को प्रबंधित करें</p>
                        </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
           </Link>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">के बारे में</h2>
          <Card className="bg-secondary/50 border-border divide-y divide-border">
            <Dialog>
              <DialogTrigger asChild>
                <CardContent className="p-4 flex items-center justify-between cursor-pointer">
                  <h3 className="font-semibold">गोपनीयता नीति</h3>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>गोपनीयता नीति</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] p-4">
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p><strong>गोपनीयता नीति</strong> अंतिम अपडेट: 24 जुलाई 2024</p>
                    <p>यूनाइटेड अगेंस्ट सेक्सुअल वायलेंस ("हम", "हमारा") आपकी गोपनीयता का सम्मान करता है। यह गोपनीयता नीति बताती है कि जब आप हमारी मोबाइल एप्लिकेशन का उपयोग करते हैं तो हम आपकी जानकारी कैसे एकत्र, उपयोग, प्रकट और सुरक्षित करते हैं।</p>
                    <p><strong>जानकारी का संग्रह</strong> हम आपसे सीधे जानकारी एकत्र कर सकते हैं, जैसे कि जब आप एक खाता बनाते हैं, किसी घटना की रिपोर्ट करते हैं (यदि आप अनाम रूप से रिपोर्ट नहीं करना चुनते हैं), या हमसे संपर्क करते हैं। इसमें आपका नाम, ईमेल पता और स्थान डेटा शामिल हो सकता है (आपकी अनुमति से)।</p>
                    <p><strong>जानकारी का उपयोग</strong> आपकी जानकारी का उपयोग आपको हमारी सेवाएं प्रदान करने, ऐप को बेहतर बनाने, आपके साथ संवाद करने और सुरक्षा अलर्ट भेजने के लिए किया जाता है। हम समग्र, अनाम डेटा का उपयोग अनुसंधान और विश्लेषण के लिए कर सकते हैं।</p>
                  </div>
                </ScrollArea>
                <DialogClose asChild>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">ठीक है</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <CardContent className="p-4 flex items-center justify-between cursor-pointer">
                        <h3 className="font-semibold">सेवा की शर्तें</h3>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>सेवा की शर्तें</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh] p-4">
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <p><strong>सेवा की शर्तें</strong> अंतिम अपडेट: 24 जुलाई 2024</p>
                            <p>इन सेवा की शर्तों ("शर्तें") को ध्यान से पढ़ें। यूनाइटेड अगेंस्ट सेक्सुअल वायलेंस एप्लिकेशन ("ऐप") का उपयोग करके, आप इन शर्तों से बंधे होने के लिए सहमत हैं।</p>
                            <p><strong>ऐप का उपयोग</strong> आप इस ऐप का उपयोग केवल कानूनी और इच्छित उद्देश्यों के लिए करने के लिए सहमत हैं। आप आपातकालीन SOS सुविधा का दुरुपयोग नहीं करने के लिए सहमत हैं, जिसका उपयोग केवल वास्तविक और तत्काल खतरे की स्थितियों में किया जाना चाहिए। ऐप का उपयोग 13 वर्ष से कम उम्र के बच्चों के लिए नहीं है।</p>
                            <p><strong>उपयोगकर्ता सामग्री</strong> यदि आप कोई सामग्री, जैसे कि रिपोर्ट या फीडबैक सबमिट करते हैं, तो आप हमें उस सामग्री का उपयोग, पुनरुत्पादन और प्रदर्शन करने के लिए एक विश्वव्यापी, रॉयल्टी-मुक्त लाइसेंस प्रदान करते हैं, जो हमारी गोपनीयता नीति के अधीन है। आप किसी भी ऐसी सामग्री को पोस्ट नहीं करने के लिए सहमत हैं जो अवैध, अपमानजनक या हानिकारक हो।</p>
                        </div>
                    </ScrollArea>
                    <DialogClose asChild>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">ठीक है</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <CardContent className="p-4 flex items-center justify-between cursor-pointer">
                  <h3 className="font-semibold">प्रतिक्रिया भेजें</h3>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    प्रतिक्रिया भेजें
                  </DialogTitle>
                </DialogHeader>
                <div className="p-1 space-y-4">
                  <Textarea placeholder="हमें बताएं कि हम कैसे सुधार कर सकते हैं..." className="min-h-[120px] bg-secondary/50 border-border" />
                  <div className="flex justify-end space-x-2">
                    <DialogClose asChild>
                      <Button variant="outline">रद्द करें</Button>
                    </DialogClose>
                    <Button className="bg-blue-600 hover:bg-blue-700">सबमिट करें</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground">ऐप संस्करण 1.0.0</p>

      </main>

      <BottomNav />
    </div>
  );
}
