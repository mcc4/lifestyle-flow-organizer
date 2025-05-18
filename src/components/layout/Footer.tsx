
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            LifestyleFlow © {new Date().getFullYear()}
          </div>
          <div className="text-sm text-muted-foreground">
            Optimize Your Day
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
