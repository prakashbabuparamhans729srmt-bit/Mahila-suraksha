
'use client';

import Link from 'next/link';
import { Users, FileText, BarChart2, Settings, BookOpen, UserCog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MasterAdminPage() {
  const adminMenuItems = [
    { title: 'उपयोगकर्ता प्रबंधित करें', icon: Users, description: 'उपयोगकर्ता खाते देखें, संपादित करें और हटाएं।', href: '#' },
    { title: 'सामग्री मॉडरेशन', icon: FileText, description: 'उपयोगकर्ता द्वारा सबमिट की गई रिपोर्ट और सामग्री की समीक्षा करें।', href: '#' },
    { title: 'ऐप एनालिटिक्स', icon: BarChart2, description: 'ऐप उपयोग और सहभागिता डेटा देखें।', href: '#' },
    { title: 'ऐप सेटिंग्स', icon: Settings, description: 'वैश्विक ऐप सेटिंग्स और कॉन्फ़िगरेशन प्रबंधित करें।', href: '/master-admin/settings' },
  ];
  
  return (
    <>
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
    </>
  );
}
