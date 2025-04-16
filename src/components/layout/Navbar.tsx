
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flag, MapPin, Users, User, BarChart3 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Map', href: '/map', icon: MapPin },
    { name: 'My Rounds', href: '/rounds', icon: Flag },
    { name: 'Friends', href: '/friends', icon: Users },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Flag className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-primary">TeeTribe</span>
          </Link>
        </div>
        
        <nav className="ml-auto flex gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link 
                key={item.name}
                to={item.href} 
                className={`flex items-center gap-2 px-2 py-1.5 font-medium transition-colors ${
                  isActive 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="ml-6 flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
