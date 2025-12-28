'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, Plus, RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'होम' },
    { href: '/global-monitoring', icon: BarChart2, label: 'डेटा' },
    { href: '/updates-feed', icon: RefreshCw, label: 'अपडेट्स' },
    { href: '/settings', icon: Settings, label: 'सेटिंग्स' },
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
                'flex flex-col items-center',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <Button
              size="icon"
              className="rounded-full bg-blue-600 hover:bg-blue-700 h-14 w-14 shadow-lg"
            >
              <Plus className="h-8 w-8 text-white" />
            </Button>
          </div>
          {navItems.slice(2, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center',
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
