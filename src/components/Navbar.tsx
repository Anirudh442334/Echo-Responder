
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  AlertCircle, 
  Settings, 
  Menu, 
  X, 
  Activity 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const routes = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Activity },
    { path: '/contacts', label: 'Contacts', icon: Users },
    { path: '/history', label: 'Alerts', icon: AlertCircle },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = () => (
    <>
      {routes.map((route) => (
        <Link key={route.path} to={route.path}>
          <Button
            variant={isActive(route.path) ? "default" : "ghost"}
            className={cn(
              "flex items-center gap-2 transition-all duration-300", 
              isActive(route.path) 
                ? "bg-echo-blue text-white" 
                : "text-echo-dark-gray hover:text-echo-blue"
            )}
          >
            <route.icon className="h-4 w-4" />
            <span>{route.label}</span>
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-echo-blue rounded-lg w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">EP</span>
          </div>
          <span className="font-bold text-xl text-echo-text">EchoPulse</span>
        </Link>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            {mobileMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-slide-down">
                <nav className="flex flex-col space-y-2 p-4">
                  <NavLinks />
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLinks />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
