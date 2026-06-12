'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  AlertCircle,
  Files,
  Users,
  Radio,
  Car,
  Building2,
  Users2,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  HeartPulse, // Changed from HeartIcon to HeartPulse as it's more relevant for health surveillance
  Shield,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['governor', 'commander', 'officer', 'admin'] },
  { label: 'Incidents', href: '/incidents', icon: AlertCircle, roles: ['commander', 'officer', 'admin'] },
  { label: 'Cases', href: '/cases', icon: Files, roles: ['commander', 'officer', 'admin'] },
  { label: 'Officers', href: '/officers', icon: Users, roles: ['governor', 'commander', 'admin'] },
  { label: 'Dispatch', href: '/dispatch', icon: Radio, roles: ['commander', 'admin'] },
  { label: 'Traffic', href: '/traffic', icon: Car, roles: ['commander', 'officer', 'admin'] },
  { label: 'Stations', href: '/stations', icon: Building2, roles: ['governor', 'commander', 'admin'] },
  { label: 'Community', href: '/community', icon: Users2, roles: ['commander', 'admin'] },
  { label: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['governor', 'commander', 'admin'] },
  { label: 'Admin', href: '/admin/users', icon: Settings, roles: ['admin'] },
  { label: 'Health Surveillance', href: '/admin/health', icon: HeartPulse, roles: ['governor', 'county_admin', 'law_admin'] },
];

const SCHOOL_NAV_ITEMS = [
  { label: 'Schools Registry', href: '/schools', icon: Building2, roles: ['governor', 'admin'] },
  { label: 'Academic Performance', href: '/schools/academic', icon: BarChart3, roles: ['governor', 'admin'] },
  { label: 'Teachers', href: '/schools/teachers', icon: Users, roles: ['governor', 'admin'] },
  { label: 'School Comparison', href: '/schools/comparison', icon: Files, roles: ['governor', 'admin'] },
  { label: 'School Feeding', href: '/schools/feeding', icon: BookOpen, roles: ['governor', 'admin'] },
  { label: 'Infrastructure', href: '/schools/infrastructure', icon: Building2, roles: ['governor', 'admin'] },
  { label: 'Safety Incidents', href: '/schools/incidents', icon: AlertCircle, roles: ['governor', 'commander', 'admin'] },
  { label: 'Inspections', href: '/schools/compliance', icon: Files, roles: ['governor', 'admin'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [schoolOpen, setSchoolOpen] = useState(pathname.startsWith('/schools'));

  if (!user) return null;

  const visibleItems = NAV_ITEMS.filter(item => item.roles.includes(user.role));
  const visibleSchoolItems = SCHOOL_NAV_ITEMS.filter(item => item.roles.includes(user.role));

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Shield className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-sidebar-primary">KauniSalama</h1>
            <p className="text-xs text-sidebar-foreground/60">Law Enforcement</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-2 px-4">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    isActive && 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary'
                  )}
                  size="sm"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Button>
              </Link>
            );
          })}

          {/* Education Section */}
          {visibleSchoolItems.length > 0 && (
            <div className="pt-2 mt-2 border-t border-sidebar-border">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                size="sm"
                onClick={() => setSchoolOpen(!schoolOpen)}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline flex-1 text-left">Education</span>
                <ChevronDown className={cn('w-4 h-4 hidden md:block transition-transform', schoolOpen && 'rotate-180')} />
              </Button>

              {schoolOpen && (
                <div className="ml-4 mt-2 space-y-1 border-l border-sidebar-border/50">
                  {visibleSchoolItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant="ghost"
                          className={cn(
                            'w-full justify-start gap-2 text-xs text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground pl-6',
                            isActive && 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary'
                          )}
                          size="sm"
                        >
                          <Icon className="w-3 h-3" />
                          <span className="hidden md:inline">{item.label}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <div className="px-2 py-2 rounded-lg bg-sidebar-accent/10">
          <p className="text-xs font-medium text-sidebar-foreground/60">Logged in as</p>
          <p className="text-sm font-semibold text-sidebar-foreground truncate">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-sidebar-foreground/50 capitalize">{user.role.replace('-', ' ')}</p>
        </div>

        <ThemeToggle />

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-red-500/10 hover:text-red-500"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen border-r border-border sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <h1 className="text-base font-bold text-sidebar-primary">KauniSalama</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-sidebar-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-sidebar-border p-4 max-h-96 overflow-y-auto">
            <nav className="space-y-2">
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start gap-3 text-sidebar-foreground',
                        isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
                      )}
                      size="sm"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-red-500/10 hover:text-red-500 mt-4"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
