
'use client';

import Link from 'next/link';
import {
  Users,
  FileText,
  BarChart2,
  Settings,
  BookOpen,
  PanelLeft,
  Home,
  GraduationCap,
  Scale,
  Handshake,
  Shield,
  Building2,
  RefreshCw,
  LineChart,
  Target,
  FilePieChart,
  HeartHandshake,
  Search,
  Bell
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Input } from '@/components/ui/input';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';


function AdminSidebar() {
    const { open, setOpen } = useSidebar();
    
    const pageManagementItems = [
      { title: 'होम पेज', href: '/master-admin/pages/home', icon: Home },
      { title: 'शिक्षा पेज', href: '/master-admin/pages/education', icon: GraduationCap },
      { title: 'वैश्विक निगरानी', href: '/master-admin/pages/global-monitoring', icon: BarChart2 },
      { title: 'कानूनी सुधार', href: '/master-admin/pages/legal-reform', icon: Scale },
      { title: 'पुरुष सहभागिता', href: '/master-admin/pages/male-engagement', icon: Handshake },
      { title: 'सुरक्षित शहर', href: '/master-admin/pages/safe-cities', icon: Building2 },
      { title: 'स्मार्ट सुरक्षा', href: '/master-admin/pages/smart-safety', icon: Shield },
      { title: 'अपडेट्स फ़ीड', href: '/master-admin/pages/updates-feed', icon: RefreshCw },
      { title: 'फंडिंग ट्रैकर', href: '/master-admin/pages/funding-tracker', icon: FilePieChart },
      { title: 'कार्यान्वयन ट्रैकर', href: '/master-admin/pages/implementation-tracker', icon: Target },
      { title: 'सफलता संकेतक', href: '/master-admin/pages/success-indicators', icon: LineChart },
      { title: 'सामुदायिक सशक्तिकरण', href: '/master-admin/pages/community-empowerment', icon: HeartHandshake },
    ];

    return (
        <Sidebar
        collapsible="icon"
        className="border-r"
        >
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                    <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">Mahila Suraksha</span>
            </div>
          </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="/master-admin" isActive>
                      <Home />
                      <span>डैशबोर्ड</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="/master-admin/users">
                      <Users />
                      <span>उपयोगकर्ता</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="/master-admin/content">
                      <FileText />
                      <span>सामग्री</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="/master-admin/analytics">
                      <BarChart2 />
                      <span>एनालिटिक्स</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>

                <SidebarMenu>
                  <SidebarMenuItem className="mt-4">
                    <span className="text-xs text-muted-foreground px-2">पेज प्रबंधन</span>
                  </SidebarMenuItem>
                  {pageManagementItems.map((item) => (
                     <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton href={item.href}>
                           <item.icon />
                           <span>{item.title}</span>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  ))}
                </SidebarMenu>

                <SidebarMenu className="mt-auto">
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/master-admin/settings">
                        <Settings />
                        <span>सेटिंग्स</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}

export default function MasterAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="mr-2 md:hidden" />
                    <h1 className="text-xl font-bold">डैशबोर्ड</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="खोजें..." className="pl-10 bg-secondary/50 border-input w-64" />
                    </div>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/seed/admin/40/40" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <div className="flex flex-1">
                <AdminSidebar />
                <SidebarInset>
                    <main className="flex-grow p-4 space-y-6 overflow-auto">
                        {children}
                    </main>
                </SidebarInset>
            </div>
            <BottomNav />
        </div>
    </SidebarProvider>
  );
}
