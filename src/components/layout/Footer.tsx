
import React from 'react';
import { Heart, Coffee, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 mt-auto bg-gradient-to-r from-lifestyle-blue/10 to-lifestyle-purple/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>LifestyleFlow © {new Date().getFullYear()}</span>
            <Heart size={14} className="ml-2 text-lifestyle-pink animate-pulse" />
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-lifestyle-blue transition-colors">
              About
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-lifestyle-purple transition-colors">
              Privacy
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-lifestyle-teal transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Coffee size={14} className="mr-2 text-lifestyle-blue" />
            <span className="mr-2">Optimize Your Day</span>
            <Star size={14} className="text-lifestyle-teal" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
