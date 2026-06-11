'use client';

import { useAuth } from '@/lib/auth-context';
import { Sidebar } from './sidebar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check if in demo mode or has valid session
    const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || localStorage.getItem('demo_mode') === 'true';
    setIsDemo(demoMode);

    if (!loading && !isAuthenticated && !demoMode) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !isDemo) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
