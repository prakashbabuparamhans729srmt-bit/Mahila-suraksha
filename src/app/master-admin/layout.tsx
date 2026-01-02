
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
  HeartHandshake
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


function AdminSidebar() {
    const { open, setOpen } = useSidebar();
    
    const pageManagementItems = [
      { title: 'शिक्षा पेज', href: '/education', icon: GraduationCap },
      { title: 'वैश्विक निगरानी', href: '/global-monitoring', icon: BarChart2 },
      { title: 'कानूनी सुधार', href: '/legal-reform', icon: Scale },
      { title: 'पुरुष सहभागिता', href: '/male-engagement', icon: Handshake },
      { title: 'सुरक्षित शहर', href: '/safe-cities', icon: Building2 },
      { title: 'स्मार्ट सुरक्षा', href: '/smart-safety', icon: Shield },
      { title: 'अपडेट्स फ़ीड', href: '/updates-feed', icon: RefreshCw },
      { title: 'फंडिंग ट्रैकर', href: '/funding-tracker', icon: FilePieChart },
      { title: 'कार्यान्वयन ट्रैकर', href: '/implementation-tracker', icon: Target },
      { title: 'सफलता संकेतक', href: '/success-indicators', icon: LineChart },
      { title: 'सामुदायिक सशक्तिकरण', href: '/community-empowerment', icon: HeartHandshake },
    ];

    return (
        <Sidebar
        collapsible="icon"
        className="border-r"
        >
            <SidebarContent className="p-2">
                <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="/master-admin" isActive>
                      <Home />
                      <span>होम</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="#">
                      <Users />
                      <span>उपयोगकर्ता</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="#">
                      <FileText />
                      <span>सामग्री</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="#">
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
            <header className="flex items-center p-4 border-b border-border">
                <SidebarTrigger className="mr-2 md:hidden" />
                <h1 className="text-xl font-bold">मास्टर एडमिन पैनल</h1>
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
