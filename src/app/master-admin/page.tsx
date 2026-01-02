
'use client';

import Link from 'next/link';
import { Users, FileText, BarChart2, BookOpen, UserCog, HeartHandshake, Shield, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MasterAdminPage() {
  const kpiData = [
    { title: 'कुल उपयोगकर्ता', value: '1,25,631', icon: Users, change: '+12.5%', changeType: 'increase' },
    { title: 'रिपोर्ट की गई घटनाएं', value: '8,421', icon: FileText, change: '+5.2%', changeType: 'increase' },
    { title: 'सक्रिय पहल', value: '78', icon: HeartHandshake, change: '-1.8%', changeType: 'decrease' },
    { title: 'कुल सामग्री', value: '1,204', icon: BookOpen, change: '+20.1%', changeType: 'increase' },
  ];

  const managementCards = [
    { title: 'उपयोगकर्ता प्रबंधित करें', value: '1.25 लाख', icon: Users, href: '/master-admin/users' },
    { title: 'सामग्री मॉडरेशन', value: '52 लंबित', icon: FileText, href: '/master-admin/content' },
    { title: 'पहल प्रबंधित करें', value: '78 सक्रिय', icon: Building2, href: '/master-admin/pages/community-empowerment' },
    { title: 'सुरक्षा अलर्ट', value: '99+', icon: Shield, href: '#' },
    { title: 'एनालिटिक्स', value: 'डेटा देखें', icon: BarChart2, href: '/master-admin/analytics' },
    { title: 'व्यवस्थापक प्रबंधित करें', value: '5 व्यवस्थापक', icon: UserCog, href: '/master-admin/settings' },
  ];
  
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((item, index) => (
                <Card key={index} className="bg-secondary/50 border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {item.title}
                        </CardTitle>
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{item.value}</div>
                        <p className={`text-xs ${item.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                            {item.change} पिछले महीने से
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 bg-cyan-500 text-black shadow-lg shadow-cyan-500/50">
                <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center justify-between">
                        <span>कुल रिपोर्ट</span>
                        <FileText className="h-6 w-6 text-black/80" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-5xl font-bold">15,506</div>
                    <p className="text-sm text-black/80">
                        सभी प्लेटफार्मों पर
                    </p>
                </CardContent>
            </Card>
            
            {managementCards.map((item, index) => (
                <Link href={item.href} key={index} className="block">
                    <Card className="bg-secondary/50 border-border hover:border-primary transition-all h-full">
                        <CardHeader>
                           <CardTitle className="text-base font-semibold flex items-center justify-between">
                             <span>{item.title}</span>
                             <item.icon className="h-6 w-6 text-muted-foreground" />
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                            {item.value}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    </>
  );
}
