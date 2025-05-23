
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import { useIsMobile } from '@/hooks/use-mobile';

const MainLayout = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force dark mode on the html element for consistency
    document.documentElement.classList.add('dark');
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!isMobile && <Navbar />}
      <main className="flex-1 container mx-auto px-4 pt-6 pb-20">
        <Outlet />
      </main>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default MainLayout;
