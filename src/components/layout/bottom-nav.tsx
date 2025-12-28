
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, Plus, RefreshCw, GraduationCap, X, Siren, FilePlus, Building, BookPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'होम' },
    { href: '/global-monitoring', icon: BarChart2, label: 'डेटा' },
    { href: '/updates-feed', icon: RefreshCw, label: 'अपडेट्स' },
    { href: '/education', icon: GraduationCap, label: 'शिक्षा' },
  ];

  const createMenuItems = [
    { href: '/report-incident', icon: Siren, label: 'घटना की रिपोर्ट करें' },
    { href: '/add-update', icon: FilePlus, label: 'अपडेट जोड़ें' },
    { href: '/add-initiative', icon: Building, label: 'पहल जोड़ें' },
    { href: '/add-content', icon: BookPlus, label: 'सामग्री जोड़ें' },
  ];


  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border z-50">
        <div className="flex justify-around items-center p-2 relative">
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center w-1/5',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}

          <div className="w-1/5 flex justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                  <Button
                    size="icon"
                    className="rounded-full bg-blue-600 hover:bg-blue-700 h-14 w-14 shadow-lg"
                  >
                    <Plus className="h-8 w-8 text-white" />
                  </Button>
                </div>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-background text-foreground rounded-t-lg">
                <SheetHeader className="text-left p-4">
                  <div className="flex justify-between items-center">
                    <SheetTitle className="text-xl font-bold">बनाएं</SheetTitle>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                  </div>
                </SheetHeader>
                <div className="p-4 grid grid-cols-2 gap-4">
                  {createMenuItems.map((item) => (
                     <Link href={item.href} key={item.href}>
                        <Card className="bg-secondary/50 border-border h-32">
                        <CardContent className="flex flex-col items-center justify-center h-full space-y-2">
                            <item.icon className="h-8 w-8 text-primary" />
                            <span className="text-sm font-semibold text-center">{item.label}</span>
                        </CardContent>
                        </Card>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          

          {navItems.slice(2, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center w-1/5',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </footer>
      {/* Spacer for bottom nav */}
      <div className="h-24"></div>
    </>
  );
}
