
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Users, Flag, User, BarChart3 } from 'lucide-react';
import { ThemeToggleMobile } from '@/components/theme/theme-toggle-mobile';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Map', href: '/map', icon: MapPin },
    { name: 'Rounds', href: '/rounds', icon: Flag },
    { name: 'Theme', href: '#', component: ThemeToggleMobile },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 px-6 flex justify-between z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        
        if (item.component) {
          const Component = item.component;
          return <Component key={item.name} />;
        }
        
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex flex-col items-center justify-center ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
