
'use client';

import Link from 'next/link';
import { Users, FileText, BarChart2, BookOpen, UserCog, HeartHandshake, Shield, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminContent } from '@/context/admin-content-context';
import { useTranslation } from '@/context/language-context';

export default function MasterAdminPage() {
  const { stats, users } = useAdminContent();
  const { t } = useTranslation();

  const kpiData = [
    { title: t('Admin.totalUsers'), value: stats.totalUsers.toLocaleString(), icon: Users, change: '', changeType: 'increase' },
    { title: t('Admin.reportedIncidents'), value: stats.reportedIncidents.toLocaleString(), icon: FileText, change: '', changeType: 'increase' },
    { title: t('Admin.activeInitiatives'), value: stats.activeInitiatives.toLocaleString(), icon: HeartHandshake, change: '', changeType: 'increase' },
    { title: t('Admin.totalContent'), value: stats.totalContent.toLocaleString(), icon: BookOpen, change: '', changeType: 'increase' },
  ];

  const managementCards = [
    { title: t('Admin.manageUsers'), value: `${stats.totalUsers} ${t('Admin.users').toLowerCase()}`, icon: Users, href: '/master-admin/users' },
    { title: t('Admin.contentModeration'), value: `${stats.totalContent} ${t('Admin.totalContent').toLowerCase()}`, icon: FileText, href: '/master-admin/content' },
    { title: t('Admin.manageInitiatives'), value: `78 ${t('Admin.active')}`, icon: Building2, href: '/master-admin/pages/community-empowerment' },
    { title: t('Admin.safetyAlerts'), value: '99+', icon: Shield, href: '#' },
    { title: t('Admin.analytics'), value: t('Admin.viewData'), icon: BarChart2, href: '/master-admin/analytics' },
    { title: t('Admin.manageAdmins'), value: `${users.filter(u => u.role === 'admin').length} ${t('Admin.admins').toLowerCase()}`, icon: UserCog, href: '/master-admin/settings' },
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
                        {item.change && (
                             <p className={`text-xs ${item.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                                {item.change} {t('Admin.fromLastMonth')}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 bg-cyan-500 text-black shadow-lg shadow-cyan-500/50">
                <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center justify-between">
                        <span>{t('Admin.totalReports')}</span>
                        <FileText className="h-6 w-6 text-black/80" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-5xl font-bold">15,506</div>
                    <p className="text-sm text-black/80">
                        {t('Admin.acrossAllPlatforms')}
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
