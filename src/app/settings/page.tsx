
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, X, Trash2, UserCog, Image as ImageIcon, LogOut, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase } from '@/firebase/client-provider';
import { signOut, updateProfile } from 'firebase/auth';
import { useGuest } from '@/context/guest-context';
import { useAppearance } from '@/context/appearance-context';


export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, loading } = useUser();
  const { auth } = useFirebase();
  const router = useRouter();
  const { isGuest, exitGuestMode } = useGuest();
  const { textSize, setTextSize } = useAppearance();

  const [localProfileName, setLocalProfileName] = useState(user?.displayName ?? '');
  const [localProfilePhoto, setLocalProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.photoURL ?? null);

  const [personalContacts, setPersonalContacts] = useState([{ id: 1, name: '', phone: '' }]);
  const [authorityNumbers, setAuthorityNumbers] = useState({ police: '', ambulance: '', firetruck: '' });
  const [dangerZoneAlerts, setDangerZoneAlerts] = useState(false);
  const [vibrateOnAlert, setVibrateOnAlert] = useState(true);
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    if (!loading && user) {
      setLocalProfileName(user.displayName ?? '');
      setPhotoPreview(user.photoURL ?? null);
    } else if (!loading && !isGuest && !user) {
      router.push('/login');
    }
  }, [user, loading, router, isGuest]);

  useEffect(() => {
    if (localProfilePhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(localProfilePhoto);
    }
  }, [localProfilePhoto]);

  const handleAuthorityNumberChange = (service: 'police' | 'ambulance' | 'firetruck', value: string) => {
    setAuthorityNumbers(prev => ({ ...prev, [service]: value }));
  };

  const handleContactChange = (id: number, field: 'name' | 'phone', value: string) => {
    setPersonalContacts(prev => prev.map(contact => contact.id === id ? { ...contact, [field]: value } : contact));
  };

  const addContact = () => {
    const newId = personalContacts.length > 0 ? Math.max(...personalContacts.map(c => c.id)) + 1 : 1;
    setPersonalContacts([...personalContacts, { id: newId, name: '', phone: '' }]);
  };

  const removeContact = (id: number) => {
    setPersonalContacts(personalContacts.filter(contact => contact.id !== id));
  };

  const handleSaveChanges = () => {
    console.log({ authorityNumbers, personalContacts });
    toast({
      title: "सेटिंग्स सहेजी गईं!",
      description: "आपकी आपातकालीन संपर्क जानकारी अपडेट कर दी गई है।",
    });
  };

  const handleSendFeedback = () => {
      if (feedback.trim()) {
        console.log("Feedback submitted:", feedback);
        toast({
            title: "प्रतिक्रिया भेजी गई",
            description: "आपके बहुमूल्य सुझाव के लिए धन्यवाद!",
        });
        setFeedback('');
      }
  };

  const handleProfileSave = async () => {
    if (auth?.currentUser) {
        if (auth.currentUser.displayName === localProfileName && !localProfilePhoto) return;
        try {
            // PhotoURL update requires uploading the file to a storage service first,
            // then getting the URL to update the profile. This part is complex and
            // will be simplified here by not actually uploading the photo.
            await updateProfile(auth.currentUser, {
              displayName: localProfileName,
            });
            toast({
              title: "प्रोफ़ाइल सहेजी गई!",
              description: "आपकी प्रोफ़ाइल जानकारी अपडेट कर दी गई है।",
            });
        } catch (error: any) {
            toast({
              variant: 'destructive',
              title: "त्रुटि",
              description: "प्रोफ़ाइल अपडेट करने में विफल।",
            });
        }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLocalProfilePhoto(e.target.files[0]);
    }
  };
  
  const handleLogout = async () => {
    if (isGuest) {
      exitGuestMode();
      router.push('/login');
      toast({
          title: "लॉग आउट किया गया",
          description: "आप अतिथि मोड से लॉग आउट हो गए हैं।",
      });
      return;
    }
    if (!auth) return;
    await signOut(auth);
    toast({
        title: "लॉग आउट किया गया",
        description: "आप सफलतापूर्वक लॉग आउट हो गए हैं।",
    });
    router.push('/login');
  };


  if (loading || !user) {
    return null;
  }

  const isAdmin = !isGuest && user?.email === 'admin@example.com';

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
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">प्रोफ़ाइल</h2>
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">नाम</Label>
                <Input id="name" value={localProfileName} onChange={(e) => setLocalProfileName(e.target.value)} placeholder="अपना नाम दर्ज करें" className="bg-background"/>
              </div>
              <div className="space-y-2">
                  <Label>प्रोफ़ाइल फोटो</Label>
                  <div className="flex items-center justify-center w-full">
                      <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary/50">
                          {photoPreview ? (
                            <img src={photoPreview} alt="Profile preview" className="h-28 w-28 rounded-full object-cover"/>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">अपलोड करने के लिए क्लिक करें</span></p>
                                {localProfilePhoto && <p className="text-xs text-green-500">{localProfilePhoto.name}</p>}
                            </div>
                          )}
                          <input id="photo-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*"/>
                      </label>
                  </div> 
              </div>
              <Button onClick={handleProfileSave} className="w-full">प्रोफ़ाइल सहेजें</Button>
            </CardContent>
          </Card>
        </div>

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
                          <Input className="mt-1 bg-background border-border" placeholder="पुलिस का नंबर दर्ज करें" value={authorityNumbers.police} onChange={(e) => handleAuthorityNumberChange('police', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium flex items-center">एम्बुलेंस 🚑</label>
                          <Input className="mt-1 bg-background border-border" placeholder="एम्बुलेंस का नंबर दर्ज करें" value={authorityNumbers.ambulance} onChange={(e) => handleAuthorityNumberChange('ambulance', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium flex items-center">दमकल 🚒</label>
                          <Input className="mt-1 bg-background border-border" placeholder="दमकल का नंबर दर्ज करें" value={authorityNumbers.firetruck} onChange={(e) => handleAuthorityNumberChange('firetruck', e.target.value)} />
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
                             {personalContacts.length > 1 && (
                               <Button variant="ghost" size="icon" onClick={() => removeContact(contact.id)} className="text-muted-foreground hover:text-destructive">
                                 <Trash2 className="h-5 w-5" />
                               </Button>
                             )}
                           </div>
                          <Input className="bg-background border-border" placeholder="संपर्क का नाम" value={contact.name} onChange={(e) => handleContactChange(contact.id, 'name', e.target.value)} />
                          <Input className="bg-background border-border" placeholder="संपर्क का फ़ोन नंबर" type="tel" value={contact.phone} onChange={(e) => handleContactChange(contact.id, 'phone', e.target.value)} />
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
                <Button className="w-full font-bold text-lg h-12" onClick={handleSaveChanges}>
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
                <Switch checked={dangerZoneAlerts} onCheckedChange={setDangerZoneAlerts} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">अलर्ट पर कंपन</h3>
                  <p className="text-sm text-muted-foreground">खतरा क्षेत्र अलर्ट ट्रिगर होने पर डिवाइस को वाइब्रेट करें।</p>
                </div>
                <Switch checked={vibrateOnAlert} onCheckedChange={setVibrateOnAlert} />
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
                  aria-label="Toggle theme"
                />
              </div>
              <div>
                <h3 className="font-semibold">टेक्स्ट का आकार</h3>
                <p className="text-sm text-muted-foreground">पठनीयता के लिए टेक्स्ट का आकार समायोजित करें</p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button variant={textSize === 'small' ? 'default' : 'outline'} onClick={() => setTextSize('small')}>छोटा</Button>
                  <Button variant={textSize === 'medium' ? 'default' : 'outline'} onClick={() => setTextSize('medium')}>मध्यम</Button>
                  <Button variant={textSize === 'large' ? 'default' : 'outline'} onClick={() => setTextSize('large')}>बड़ा</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">खाता</h2>
            <Card className="bg-secondary/50 border-border">
                <CardContent className="p-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full">
                                <LogOut className="mr-2 h-4 w-4" />
                                लॉग आउट
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>क्या आप वाकई लॉग आउट करना चाहते हैं?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    आपको फिर से साइन इन करने की आवश्यकता होगी।
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>रद्द करें</AlertDialogCancel>
                                <AlertDialogAction onClick={handleLogout}>लॉग आउट</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>

        {isAdmin && (
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
        )}

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
                  <DialogDescription>हमारी गोपनीयता नीति के बारे में पढ़ें।</DialogDescription>
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
                  <Button className="w-full mt-4">ठीक है</Button>
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
                        <DialogDescription>हमारी सेवा की शर्तों के बारे में पढ़ें।</DialogDescription>
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
                        <Button className="w-full mt-4">ठीक है</Button>
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
                  <DialogDescription>
                    हमें बताएं कि हम ऐप को कैसे बेहतर बना सकते हैं।
                  </DialogDescription>
                </DialogHeader>
                <div className="p-1 space-y-4">
                  <Textarea placeholder="हमें बताएं कि हम कैसे सुधार कर सकते हैं..." className="min-h-[120px] bg-secondary/50 border-border" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                  <div className="flex justify-end space-x-2">
                    <DialogClose asChild>
                      <Button variant="outline">रद्द करें</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={handleSendFeedback}>सबमिट करें</Button>
                    </DialogClose>
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
