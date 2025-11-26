

import Link from 'next/link';
import { Bell, Home, BarChart2, RefreshCw, Settings, User, MapPin, Search, SlidersHorizontal, Plus, Shield, Users, GraduationCap, ArrowRight, BarChartBig, Scale, Handshake, Building2, ThumbsUp, MessageSquare, Share2, X, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


const CommunityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GlobalMonitoringIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const ImplementationTrackerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.5 38.0001C32.5081 38.0001 39 31.5082 39 23.5001C39 15.4919 32.5081 9.00006 24.5 9.00006C16.4919 9.00006 10 15.4919 10 23.5001C10 31.5082 16.4919 38.0001 24.5 38.0001Z" fill="#2F88FF" stroke="#FFF" strokeWidth="2"/>
    <path d="M21.5 25.5001L24.5 22.5001L27.5 25.5001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.5 22.5V30.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.2812 10.5C24.2812 10.5 20.2422 13.5 17.5312 17C14.8202 20.5 13.2812 24.5 13.2812 24.5" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24.5 9C24.5 9 28.5 12 31.5 15.5C34.5 19 35.5 23 35.5 23" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);


const FundingTrackerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C18.4772 4 14 8.47715 14 14V42C14 43.1046 14.8954 44 16 44H32C33.1046 44 34 43.1046 34 42V14C34 8.47715 29.5228 4 24 4Z" fill="#FFC107" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M24 27C25.6569 27 27 25.6569 27 24C27 22.3431 25.6569 21 24 21C22.3431 21 21 22.3431 21 24C21 25.6569 22.3431 27 24 27Z" stroke="black" strokeWidth="2"/>
    <path d="M24 21V18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 33V27" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21.1714 29.8284L19.0498 31.95" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <path d="M26.8286 29.8284L28.9502 31.95" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const SuccessIndicatorIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="#F44336" stroke="#000" strokeWidth="2"/>
      <path d="M24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14Z" fill="#FFF"/>
      <path d="M24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20Z" fill="#F44336"/>
    </svg>
  );

export default function DashboardPage() {
  const filterCategories = [
    { id: 'global-data', label: 'वैश्विक डेटा' },
    { id: 'education', label: 'शिक्षा' },
    { id: 'legal-reform', label: 'कानूनी सुधार' },
    { id: 'male-engagement', label: 'पुरुष सहभागिता' },
    { id: 'smart-safety', label: 'स्मार्ट सुरक्षा' },
    { id: 'safe-cities', label: 'सुरक्षित शहर' },
    { id: 'community-empowerment', label: 'सामुदायिक सशक्तिकरण' },
    { id: 'global-monitoring', label: 'वैश्विक निगरानी' },
    { id: 'implementation-tracker', label: 'कार्यान्वयन ट्रैकर' },
    { id: 'funding-tracker', label: 'फंडिंग ट्रैकर' },
    { id: 'success-indicators', label: 'सफलता संकेतक' },
    { id: 'updates-feed', label: 'अपडेट्स फ़ीड' },
  ];

  const severityLevels = [
    { id: 'positive', label: 'सकारात्मक' },
    { id: 'neutral', label: 'तटस्थ' },
    { id: 'negative', label: 'नकारात्मक' },
  ];

  const dateRanges = [
    { id: 'anytime', label: 'कभी भी' },
    { id: 'last-week', label: 'पिछला सप्ताह' },
    { id: 'last-month', label: 'पिछला महीना' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">डैशबोर्ड</h1>
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6" />
          <User className="h-6 w-6" />
          <Link href="/settings">
            <Settings className="h-6 w-6" />
          </Link>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <Card className="bg-secondary/50 border-border">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">आपका वर्तमान स्थान</p>
                <p className="font-semibold">Patna Junction, Patna</p>
              </div>
            </div>
            <Link href="/location-settings">
              <Button variant="link" className="text-primary">बदलें</Button>
            </Link>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="किसी सुविधा के लिए खोजें..."
              className="pl-10 bg-secondary/50 border-border"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-secondary/50 border-border">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background rounded-t-lg">
              <SheetHeader className="text-left">
                <SheetTitle className="text-xl font-bold mb-4">उन्नत फ़िल्टर</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[60vh]">
                <div className="p-1">
                  <h3 className="text-lg font-semibold mb-3">श्रेणी</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {filterCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox id={category.id} />
                        <Label htmlFor={category.id} className="font-normal">{category.label}</Label>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-semibold mb-3">गंभीरता स्तर</h3>
                  <div className="space-y-4">
                    {severityLevels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-2">
                        <Checkbox id={level.id} />
                        <Label htmlFor={level.id} className="font-normal">{level.label}</Label>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />

                  <h3 className="text-lg font-semibold mb-3">तिथि सीमा</h3>
                  <RadioGroup defaultValue="anytime" className="space-y-4">
                    {dateRanges.map((range) => (
                      <div key={range.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={range.id} id={range.id} />
                        <Label htmlFor={range.id} className="font-normal">{range.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                </div>
              </ScrollArea>
              <div className="flex justify-between p-4 absolute bottom-0 left-0 right-0 bg-background">
                <Button variant="outline" className="w-1/2 mr-2">रीसेट करें</Button>
                <Button className="w-1/2 ml-2 bg-blue-600 hover:bg-blue-700">फ़िल्टर लागू करें</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Sheet>
            <SheetTrigger asChild>
                <Card className="bg-red-600 cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center text-white">
                        <div className="border-2 border-white p-2 mb-2">
                        <span className="text-lg font-bold">SOS</span>
                        </div>
                        <h2 className="text-2xl font-bold">आपातकालीन एसओएस</h2>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background text-foreground rounded-t-lg">
                <SheetHeader className="text-left p-4">
                    <div className="flex justify-between items-center">
                        <SheetTitle className="text-xl font-bold">आपातकालीन सेवा चुनें</SheetTitle>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <X className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                    </div>
                </SheetHeader>
                <div className="p-4 space-y-4">
                    <Card className="bg-secondary/50 border-border">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src="https://openui.fly.dev/openui/24x24.svg?text=🚨" alt="police icon" className="h-8 w-8"/>
                                <div>
                                    <h3 className="font-semibold">पुलिस</h3>
                                    <p className="text-sm text-muted-foreground">कोई नंबर सहेजा नहीं गया</p>
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/50 border-border">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src="https://openui.fly.dev/openui/24x24.svg?text=🚑" alt="ambulance icon" className="h-8 w-8"/>
                                <div>
                                    <h3 className="font-semibold">एम्बुलेंस</h3>
                                    <p className="text-sm text-muted-foreground">कोई नंबर सहेजा नहीं गया</p>
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/50 border-border">
                        <CardContent className="p-4 flex items-center justify-between">
                             <div className="flex items-center space-x-4">
                                <img src="https://openui.fly.dev/openui/24x24.svg?text=🚒" alt="fire truck icon" className="h-8 w-8"/>
                                <div>
                                    <h3 className="font-semibold">दमकल</h3>
                                    <p className="text-sm text-muted-foreground">कोई नंबर सहेजा नहीं गया</p>
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </CardContent>
                    </Card>
                </div>
            </SheetContent>
        </Sheet>


        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-4">
            <h3 className="font-semibold">वापसी पर स्वागत है!</h3>
            <p className="text-muted-foreground">
              आपका वर्तमान वैश्विक सुरक्षा स्कोर है <span className="text-white font-bold">76/100</span>
            </p>
            <p className="text-green-400 text-sm">पिछले सप्ताह से 2 अंक ऊपर</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-secondary/50 border-border">
            <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-sm font-semibold">सुरक्षा उपकरण</span>
            </CardContent>
          </Card>
          <Card className="bg-secondary/50 border-border">
            <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-sm font-semibold">सहायता खोजें</span>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
            <h2 className="text-xl font-bold">सुविधाएं एक्सप्लोर करें</h2>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <ImplementationTrackerIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold">कार्यान्वयन ट्रैकर</h3>
                    <p className="text-sm text-muted-foreground">गैंट चार्ट के साथ हमारी प्रमुख वैश्विक पहलों की प्रगति की निगरानी करें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <FundingTrackerIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold">फंडिंग ट्रैकर</h3>
                    <p className="text-sm text-muted-foreground">देखें कि हमारी धनराशि कैसे जुटाई जाती है, आवंटित की जाती है और प्रभाव डाल रही है।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <SuccessIndicatorIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold">सफलता संकेतक</h3>
                    <p className="text-sm text-muted-foreground">प्रमुख प्रदर्शन संकेतकों (KPIs) के साथ हमारी सामूहिक सफलता को मापें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">सुरक्षित शहर</h3>
                    <p className="text-sm text-muted-foreground">स्थानीय सुरक्षा पहल, सहायता केंद्र खोजें और ऑडिट करें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <CommunityIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold">सामुदायिक सशक्तिकरण</h3>
                    <p className="text-sm text-muted-foreground">सहायता समूहों, कार्यक्रमों और सशक्तिकरण कार्यक्रमों से जुड़ें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <GlobalMonitoringIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold">वैश्विक निगरानी</h3>
                    <p className="text-sm text-muted-foreground">सुरक्षा स्कोर और देश-विशिष्ट डेटा का वैश्विक हीटमैप देखें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <BarChartBig className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">वैश्विक डेटा</h3>
                    <p className="text-sm text-muted-foreground">इंटरैक्टिव मानचित्र, रुझान और प्रमुख वैश्विक आँकड़े देखें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">शिक्षा</h3>
                    <p className="text-sm text-muted-foreground">जागरूकता बढ़ाने के लिए लेख, वीडियो और क्विज़ तक पहुँचें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">कानूनी सुधार</h3>
                    <p className="text-sm text-muted-foreground">देश के अनुसार कानूनी सुधारों और नीतिगत परिवर्तनों की प्रगति को ट्रैक करें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <Handshake className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">पुरुष सहभागिता</h3>
                    <p className="text-sm text-muted-foreground">पुरुषों को सहयोगी के रूप में शामिल करने के लिए पहल और संसाधन खोजें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">स्मार्ट सुरक्षा</h3>
                    <p className="text-sm text-muted-foreground">व्यक्तिगत सुरक्षा के लिए सुरक्षा चेक-इन और यात्रा साझा करने जैसे स्मार्ट टूल का उपयोग करें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-background p-3 rounded-lg">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">अपडेट्स फ़ीड</h3>
                    <p className="text-sm text-muted-foreground">नवीनतम समाचार, अपडेट और उपयोगकर्ता-प्रस्तुत रिपोर्टों से सूचित रहें।</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
        </div>

        <div className="space-y-4">
            <h2 className="text-xl font-bold">हाल के अपडेट</h2>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-primary">अर्जेंटीना में नया कानून पारित</h3>
                  <p className="text-xs text-muted-foreground">2 दिन पहले</p>
                </div>
                <p className="text-sm text-muted-foreground">
                अर्जेंटीना की कांग्रेस ने उत्पीड़न के खिलाफ कार्यस्थल सुरक्षा का विस्तार करने वाला एक नया विधेयक पारित किया।
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>1253 Likes</span>
                    <span>2 Comments</span>
                </div>
                <Separator />
                <div className="flex justify-around">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" /> लाइक
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> कमेंट
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" /> साझा करें
                    </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-yellow-400 border-2">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-primary">वैश्विक धन उगाहने वाले की शुरूआत</h3>
                  <p className="text-xs text-muted-foreground">5 दिन पहले</p>
                </div>
                <p className="text-sm text-muted-foreground">
                हमारा वार्षिक वैश्विक धन उगाहने वाला शुरू हो गया है, जिसका लक्ष्य उत्तरजीवी सहायता कार्यक्रमों के लिए $10M जुटाना है।
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>5812 Likes</span>
                    <span>1 Comments</span>
                </div>
                <Separator />
                <div className="flex justify-around">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" /> लाइक
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> कमेंट
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" /> साझा करें
                    </Button>
                </div>
              </CardContent>
            </Card>
        </div>


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
