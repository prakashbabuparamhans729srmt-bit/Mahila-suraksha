
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Bell,
  Mic
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useVoiceSearch } from '@/context/voice-search-context';
import { useState, useMemo, useEffect } from 'react';


function AdminSidebar({ searchQuery }: { searchQuery: string }) {
    const pathname = usePathname();
    
    const pageManagementItems = useMemo(() => [
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
    ], []);

    const filteredPageManagementItems = useMemo(() => {
        if (!searchQuery) return pageManagementItems;
        return pageManagementItems.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, pageManagementItems]);


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
                    <Link href="/master-admin" passHref>
                      <SidebarMenuButton isActive={pathname === '/master-admin'}>
                        <Home />
                        <span>डैशबोर्ड</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/master-admin/users" passHref>
                      <SidebarMenuButton isActive={pathname === '/master-admin/users'}>
                        <Users />
                        <span>उपयोगकर्ता</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/master-admin/content" passHref>
                      <SidebarMenuButton isActive={pathname.startsWith('/master-admin/content')}>
                        <FileText />
                        <span>सामग्री</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/master-admin/analytics" passHref>
                      <SidebarMenuButton isActive={pathname.startsWith('/master-admin/analytics')}>
                        <BarChart2 />
                        <span>एनालिटिक्स</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>

                <SidebarMenu>
                  <SidebarMenuItem className="mt-4">
                    <span className="text-xs text-muted-foreground px-2">पेज प्रबंधन</span>
                  </SidebarMenuItem>
                  {filteredPageManagementItems.map((item) => (
                     <SidebarMenuItem key={item.title}>
                        <Link href={item.href} passHref>
                          <SidebarMenuButton isActive={pathname === item.href}>
                             <item.icon />
                             <span>{item.title}</span>
                          </SidebarMenuButton>
                        </Link>
                     </SidebarMenuItem>
                  ))}
                   {filteredPageManagementItems.length === 0 && (
                        <SidebarMenuItem>
                            <span className="text-sm text-muted-foreground px-2 py-4 text-center block">कोई परिणाम नहीं मिला।</span>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>

                <SidebarMenu className="mt-auto">
                    <SidebarMenuItem>
                        <Link href="/master-admin/settings" passHref>
                          <SidebarMenuButton isActive={pathname.startsWith('/master-admin/settings')}>
                            <Settings />
                            <span>सेटिंग्स</span>
                          </SidebarMenuButton>
                        </Link>
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
  const { openVoiceSearch, searchQuery: voiceSearchQuery, setSearchQuery: setGlobalSearchQuery } = useVoiceSearch();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (voiceSearchQuery) {
        setSearchQuery(voiceSearchQuery);
        // Clear the global query after using it
        setGlobalSearchQuery('');
    }
  }, [voiceSearchQuery, setGlobalSearchQuery]);

  const handleMicSearch = () => {
    openVoiceSearch();
  };

  return (
    <SidebarProvider>
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <header className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="mr-2 md:hidden" />
                    <div className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-primary" />
                        <h1 className="text-xl font-bold">डैशबोर्ड</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="पेज खोजें..." 
                            className="pl-10 bg-secondary/50 border-input w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="hidden md:flex" onClick={handleMicSearch}>
                        <Mic className="h-5 w-5" />
                    </Button>
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
                <AdminSidebar searchQuery={searchQuery} />
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
