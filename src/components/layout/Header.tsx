
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserData } from '@/context/UserDataContext';
import { getDaySummary } from '@/utils/timeUtils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData } = useUserData();
  const { name } = userData.profile;
  const daySummary = getDaySummary();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 md:py-5">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="hidden md:block">
                <div className="text-xl font-bold bg-clip-text text-transparent lifestyle-gradient">
                  LifestyleFlow
                </div>
              </div>
              <div className="md:hidden text-xl font-bold bg-clip-text text-transparent lifestyle-gradient">
                LF
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-1">
            <Button variant="ghost" asChild>
              <Link to="/">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/goals">Goals</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/meals">Meals</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/sleep">Sleep</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/routines">Routines</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm hidden md:block">
              <span>Good {daySummary}, </span>
              <span className="font-semibold">{name}</span>
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
              <Button 
                variant="ghost" 
                asChild 
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/">Dashboard</Link>
              </Button>
              <Button 
                variant="ghost" 
                asChild 
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/goals">Goals</Link>
              </Button>
              <Button 
                variant="ghost" 
                asChild 
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/meals">Meals</Link>
              </Button>
              <Button 
                variant="ghost" 
                asChild 
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/sleep">Sleep</Link>
              </Button>
              <Button 
                variant="ghost" 
                asChild 
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/routines">Routines</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
