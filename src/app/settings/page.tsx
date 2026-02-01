
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
import { useTranslation } from '@/context/language-context';


export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, loading } = useUser();
  const { auth } = useFirebase();
  const router = useRouter();
  const { isGuest, exitGuestMode } = useGuest();
  const { textSize, setTextSize } = useAppearance();
  const { t } = useTranslation();

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

  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem('personalContacts');
      if (savedContacts) {
        const parsedContacts = JSON.parse(savedContacts);
        if (Array.isArray(parsedContacts) && parsedContacts.length > 0) {
           setPersonalContacts(parsedContacts);
        }
      }
      const savedAuthorities = localStorage.getItem('authorityNumbers');
      if (savedAuthorities) {
        setAuthorityNumbers(JSON.parse(savedAuthorities));
      }
    } catch (error) {
      console.error("Failed to parse settings from localStorage", error);
    }
  }, []);

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
    localStorage.setItem('authorityNumbers', JSON.stringify(authorityNumbers));
    localStorage.setItem('personalContacts', JSON.stringify(personalContacts));
    toast({
      title: t('Settings.contactsSaved'),
      description: t('Settings.contactsSavedDesc'),
    });
  };

  const handleSendFeedback = () => {
      if (feedback.trim()) {
        console.log("Feedback submitted:", feedback);
        toast({
            title: t('Settings.feedbackSent'),
            description: t('Settings.feedbackSentDesc'),
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
              title: t('Settings.profileSaved'),
              description: t('Settings.profileSavedDesc'),
            });
        } catch (error: any) {
            toast({
              variant: 'destructive',
              title: t('Settings.profileError'),
              description: t('Settings.profileErrorDesc'),
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
          title: t('Settings.loggedOut'),
          description: t('Settings.guestLoggedOutDesc'),
      });
      return;
    }
    if (!auth) return;
    await signOut(auth);
    toast({
        title: t('Settings.loggedOut'),
        description: t('Settings.loggedOutDesc'),
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
        <h1 className="text-xl font-bold">{t('Settings.title')}</h1>
      </header>

      <main className="p-4 space-y-8">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">{t('Settings.profile')}</h2>
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('Settings.name')}</Label>
                <Input id="name" value={localProfileName} onChange={(e) => setLocalProfileName(e.target.value)} placeholder={t('Settings.enterName')} className="bg-background"/>
              </div>
              <div className="space-y-2">
                  <Label>{t('Settings.profilePhoto')}</Label>
                  <div className="flex items-center justify-center w-full">
                      <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary/50">
                          {photoPreview ? (
                            <img src={photoPreview} alt="Profile preview" className="h-28 w-28 rounded-full object-cover"/>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('Settings.clickToUpload')}</span></p>
                                {localProfilePhoto && <p className="text-xs text-green-500">{localProfilePhoto.name}</p>}
                            </div>
                          )}
                          <input id="photo-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*"/>
                      </label>
                  </div> 
              </div>
              <Button onClick={handleProfileSave} className="w-full">{t('Settings.saveProfile')}</Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">{t('Settings.securityAndEmergency')}</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Card className="bg-secondary/50 border-border cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{t('Settings.emergencySettings')}</h3>
                    <p className="text-sm text-muted-foreground">{t('Settings.emergencySettingsDesc')}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background text-foreground rounded-t-lg h-[90vh] flex flex-col">
              <SheetHeader className="text-left p-4">
                <div className="flex justify-between items-center">
                  <SheetTitle className="text-xl font-bold">{t('Settings.emergencySettingsTitle')}</SheetTitle>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                </div>
              </SheetHeader>
              <div className="overflow-y-auto px-4 pb-4 flex-grow">
                <p className="text-muted-foreground mb-6">
                  {t('Settings.emergencySettingsInfo')}
                </p>

                <div className="space-y-6">
                  <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 space-y-4">
                      <h3 className="font-semibold text-lg">{t('Settings.localAuthorities')}</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium flex items-center">{t('Settings.police')}</label>
                          <Input className="mt-1 bg-background border-border" placeholder={t('Settings.enterPoliceNumber')} value={authorityNumbers.police} onChange={(e) => handleAuthorityNumberChange('police', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium flex items-center">{t('Settings.ambulance')}</label>
                          <Input className="mt-1 bg-background border-border" placeholder={t('Settings.enterAmbulanceNumber')} value={authorityNumbers.ambulance} onChange={(e) => handleAuthorityNumberChange('ambulance', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium flex items-center">{t('Settings.firetruck')}</label>
                          <Input className="mt-1 bg-background border-border" placeholder={t('Settings.enterFiretruckNumber')} value={authorityNumbers.firetruck} onChange={(e) => handleAuthorityNumberChange('firetruck', e.target.value)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 space-y-4">
                      <h3 className="font-semibold text-lg">{t('Settings.personalContacts')}</h3>
                      {personalContacts.map((contact, index) => (
                        <div key={contact.id} className="space-y-3">
                           <div className="flex justify-between items-center">
                             <label className="text-sm font-medium">{t('Settings.contact', { number: index + 1})}</label>
                             {personalContacts.length > 1 && (
                               <Button variant="ghost" size="icon" onClick={() => removeContact(contact.id)} className="text-muted-foreground hover:text-destructive">
                                 <Trash2 className="h-5 w-5" />
                               </Button>
                             )}
                           </div>
                          <Input className="bg-background border-border" placeholder={t('Settings.contactName')} value={contact.name} onChange={(e) => handleContactChange(contact.id, 'name', e.target.value)} />
                          <Input className="bg-background border-border" placeholder={t('Settings.contactPhone')} type="tel" value={contact.phone} onChange={(e) => handleContactChange(contact.id, 'phone', e.target.value)} />
                          {index < personalContacts.length -1 && <Separator className="my-4" />}
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full" onClick={addContact}>
                        <Plus className="mr-2 h-4 w-4" />
                        {t('Settings.addAnotherContact')}
                      </Button>

                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="p-4 mt-auto">
                <Button className="w-full font-bold text-lg h-12" onClick={handleSaveChanges}>
                  {t('Settings.saveContacts')}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">{t('Settings.dangerZoneAlerts')}</h2>
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{t('Settings.enableDangerZoneAlerts')}</h3>
                  <p className="text-sm text-muted-foreground">{t('Settings.dangerZoneAlertsDesc')}</p>
                </div>
                <Switch checked={dangerZoneAlerts} onCheckedChange={setDangerZoneAlerts} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{t('Settings.vibrateOnAlert')}</h3>
                  <p className="text-sm text-muted-foreground">{t('Settings.vibrateOnAlertDesc')}</p>
                </div>
                <Switch checked={vibrateOnAlert} onCheckedChange={setVibrateOnAlert} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">{t('Settings.contentAndLanguage')}</h2>
          <Card className="bg-secondary/50 border-border divide-y divide-border">
            <CardContent className="p-4">
              <Link href="/language-settings" className="flex items-center justify-between w-full">
                <div>
                  <h3 className="font-semibold">{t('Settings.language')}</h3>
                  <p className="text-sm text-muted-foreground">{t('Settings.languageDesc')}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </CardContent>
            <CardContent className="p-4">
              <Link href="/location-settings" className="flex items-center justify-between w-full">
                <div>
                  <h3 className="font-semibold">{t('Settings.location')}</h3>
                  <p className="text-sm text-muted-foreground">{t('Settings.locationDesc')}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">{t('Settings.appearance')}</h2>
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{t('Settings.appTheme')}</h3>
                  <p className="text-sm text-muted-foreground">{t('Settings.appThemeDesc')}</p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                />
              </div>
              <div>
                <h3 className="font-semibold">{t('Settings.textSize')}</h3>
                <p className="text-sm text-muted-foreground">{t('Settings.textSizeDesc')}</p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button variant={textSize === 'small' ? 'default' : 'outline'} onClick={() => setTextSize('small')}>{t('Settings.small')}</Button>
                  <Button variant={textSize === 'medium' ? 'default' : 'outline'} onClick={() => setTextSize('medium')}>{t('Settings.medium')}</Button>
                  <Button variant={textSize === 'large' ? 'default' : 'outline'} onClick={() => setTextSize('large')}>{t('Settings.large')}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">{t('Settings.account')}</h2>
            <Card className="bg-secondary/50 border-border">
                <CardContent className="p-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full">
                                <LogOut className="mr-2 h-4 w-4" />
                                {t('Settings.logout')}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{t('Settings.logoutConfirmTitle')}</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t('Settings.logoutConfirmDesc')}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>{t('Settings.cancel')}</AlertDialogCancel>
                                <AlertDialogAction onClick={handleLogout}>{t('Settings.logout')}</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>

        {isAdmin && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">{t('Settings.admin')}</h2>
            <Link href="/master-admin" className="block">
                <Card className="bg-secondary/50 border-border cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                          <UserCog className="h-6 w-6 text-primary" />
                          <div>
                              <h3 className="font-semibold">{t('Settings.masterAdminPanel')}</h3>
                              <p className="text-sm text-muted-foreground">{t('Settings.masterAdminPanelDesc')}</p>
                          </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
            </Link>
          </div>
        )}

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">{t('Settings.about')}</h2>
          <Card className="bg-secondary/50 border-border divide-y divide-border">
            <Dialog>
              <DialogTrigger asChild>
                <CardContent className="p-4 flex items-center justify-between cursor-pointer">
                  <h3 className="font-semibold">{t('Settings.privacyPolicy')}</h3>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('Settings.privacyPolicyTitle')}</DialogTitle>
                  <DialogDescription>{t('Settings.privacyPolicyDesc')}</DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] p-4">
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p><strong>{t('Settings.privacyPolicyTitle')}</strong> {t('Settings.privacyPolicyContent1')}</p>
                    <p>{t('Settings.privacyPolicyContent2')}</p>
                    <p><strong>{t('Settings.privacyPolicyContent3')}</strong></p>
                    <p>{t('Settings.privacyPolicyContent4')}</p>
                  </div>
                </ScrollArea>
                <DialogClose asChild>
                  <Button className="w-full mt-4">{t('Settings.ok')}</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <CardContent className="p-4 flex items-center justify-between cursor-pointer">
                        <h3 className="font-semibold">{t('Settings.termsOfService')}</h3>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t('Settings.termsOfServiceTitle')}</DialogTitle>
                        <DialogDescription>{t('Settings.termsOfServiceDesc')}</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh] p-4">
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <p><strong>{t('Settings.termsOfServiceTitle')}</strong> {t('Settings.termsOfServiceContent1')}</p>
                            <p>{t('Settings.termsOfServiceContent2')}</p>
                            <p><strong>{t('Settings.termsOfServiceContent3')}</strong></p>
                            <p>{t('Settings.termsOfServiceContent4')}</p>
                        </div>
                    </ScrollArea>
                    <DialogClose asChild>
                        <Button className="w-full mt-4">{t('Settings.ok')}</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <CardContent className="p-4 flex items-center justify-between cursor-pointer">
                  <h3 className="font-semibold">{t('Settings.sendFeedback')}</h3>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {t('Settings.sendFeedbackTitle')}
                  </DialogTitle>
                  <DialogDescription>
                    {t('Settings.sendFeedbackDesc')}
                  </DialogDescription>
                </DialogHeader>
                <div className="p-1 space-y-4">
                  <Textarea placeholder={t('Settings.feedbackPlaceholder')} className="min-h-[120px] bg-secondary/50 border-border" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                  <div className="flex justify-end space-x-2">
                    <DialogClose asChild>
                      <Button variant="outline">{t('Settings.cancel')}</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={handleSendFeedback}>{t('Settings.submit')}</Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground">{t('Settings.appVersion')}</p>

      </main>

      <BottomNav />
    </div>
  );
}

    