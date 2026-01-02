'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Shield, FileText, Settings, BarChart2, UserCog, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function MasterAdminPage() {
  const adminMenuItems = [
    { title: 'उपयोगकर्ता प्रबंधित करें', icon: Users, description: 'उपयोगकर्ता खाते देखें, संपादित करें और हटाएं।', href: '#' },
    { title: 'सामग्री मॉडरेशन', icon: FileText, description: 'उपयोगकर्ता द्वारा सबमिट की गई रिपोर्ट और सामग्री की समीक्षा करें।', href: '#' },
    { title: 'ऐप एनालिटिक्स', icon: BarChart2, description: 'ऐप उपयोग और सहभागिता डेटा देखें।', href: '#' },
    { title: 'ऐप सेटिंग्स', icon: Settings, description: 'वैश्विक ऐप सेटिंग्स और कॉन्फ़िगरेशन प्रबंधित करें।', href: '#' },
  ];
  
  const pageManagementItems = [
    { title: 'होम पेज प्रबंधित करें', href: '/' },
    { title: 'शिक्षा पेज प्रबंधित करें', href: '/education' },
    { title: 'वैश्विक निगरानी पेज प्रबंधित करें', href: '/global-monitoring' },
    { title: 'कानूनी सुधार पेज प्रबंधित करें', href: '/legal-reform' },
    { title: 'पुरुष सहभागिता पेज प्रबंधित करें', href: '/male-engagement' },
    { title: 'सुरक्षित शहर पेज प्रबंधित करें', href: '/safe-cities' },
    { title: 'स्मार्ट सुरक्षा पेज प्रबंधित करें', href: '/smart-safety' },
    { title: 'फंडिंग ट्रैकर पेज प्रबंधित करें', href: '/funding-tracker' },
    { title: 'कार्यान्वयन ट्रैकर पेज प्रबंधित करें', href: '/implementation-tracker' },
    { title: 'सफलता संकेतक पेज प्रबंधित करें', href: '/success-indicators' },
    { title: 'अपडेट्स फ़ीड पेज प्रबंधित करें', href: '/updates-feed' },
    { title: 'सामुदायिक सशक्तिकरण पेज प्रबंधित करें', href: '/community-empowerment' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
       <header className="flex items-center p-4 border-b border-border">
          <Link href="/settings" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold">मास्टर एडमिन पैनल</h1>
        </header>
      <div className="flex flex-1">
        <aside className="w-16 bg-secondary/50 border-r border-border flex flex-col items-center py-4 space-y-6">
           <Link href="/master-admin/settings" className="text-muted-foreground hover:text-primary transition-colors">
            <UserCog className="h-7 w-7" />
           </Link>
        </aside>

        <main className="flex-grow p-4 space-y-6 overflow-auto">
          <p className="text-muted-foreground px-1">
            यह मास्टर नियंत्रण कक्ष है। यहां से ऐप के प्रमुख पहलुओं को प्रबंधित करें।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminMenuItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <Card className="bg-secondary/50 border-border hover:border-primary transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-semibold">
                      {item.title}
                    </CardTitle>
                    <item.icon className="h-6 w-6 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold px-1">पेज प्रबंधन</h2>
             {pageManagementItems.map((item, index) => (
                <Link href={item.href} key={index}>
                    <Card className="bg-secondary/50 border-border hover:border-primary transition-all">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className='flex items-center gap-3'>
                                <BookOpen className="h-6 w-6 text-muted-foreground" />
                                <span className="text-base font-semibold">{item.title}</span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
             ))}
          </div>

        </main>
      </div>

      <BottomNav />
    </div>
  );
}
