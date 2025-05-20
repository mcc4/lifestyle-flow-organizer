
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserData } from '@/context/UserDataContext';
import { getDaySummary } from '@/utils/timeUtils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { userData } = useUserData();
  const { name } = userData.profile;
  const daySummary = getDaySummary();
  const location = useLocation();
  
  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 md:py-5">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-lifestyle-blue to-lifestyle-purple flex items-center justify-center">
                  <span className="text-white font-bold">LF</span>
                </div>
                <div className="text-xl font-bold bg-clip-text text-transparent lifestyle-gradient">
                  LifestyleFlow
                </div>
              </div>
              <div className="md:hidden flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-lifestyle-blue to-lifestyle-purple flex items-center justify-center">
                  <span className="text-white font-bold">LF</span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {[
              { path: '/', label: 'Dashboard' },
              { path: '/goals', label: 'Goals' },
              { path: '/meals', label: 'Meals' },
              { path: '/sleep', label: 'Sleep' },
              { path: '/routines', label: 'Routines' }
            ].map(item => (
              <Button 
                key={item.path}
                variant="ghost" 
                asChild
                className={isActive(item.path) ? 'bg-accent text-accent-foreground' : ''}
              >
                <Link to={item.path}>{item.label}</Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="hidden md:flex"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            
            <div className="hidden md:flex items-center bg-gradient-to-r from-lifestyle-blue/10 to-lifestyle-purple/10 px-3 py-1.5 rounded-full">
              <span className="text-sm mr-2">{daySummary}, </span>
              <span className="font-semibold text-sm">{name}</span>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleMenu} 
              className="md:hidden"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {[
                { path: '/', label: 'Dashboard' },
                { path: '/goals', label: 'Goals' },
                { path: '/meals', label: 'Meals' },
                { path: '/sleep', label: 'Sleep' },
                { path: '/routines', label: 'Routines' }
              ].map(item => (
                <Button 
                  key={item.path}
                  variant="ghost" 
                  asChild 
                  className={`justify-start ${isActive(item.path) ? 'bg-accent text-accent-foreground' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={item.path}>
                    {item.label}
                    {isActive(item.path) && <ArrowRight className="ml-auto" size={16} />}
                  </Link>
                </Button>
              ))}
              
              <div className="flex items-center justify-between pt-4 mt-2 border-t">
                <div className="text-sm">
                  <span>{daySummary}, </span>
                  <span className="font-semibold">{name}</span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleTheme}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
