
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SleepTracker from '@/components/sleep/SleepTracker';
import { UserDataProvider } from '@/context/UserDataContext';
import { Moon } from 'lucide-react';

const Sleep = () => {
  return (
    <UserDataProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-indigo-50/80 dark:from-gray-900 dark:to-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="text-lifestyle-indigo animate-pulse" size={24} />
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lifestyle-indigo to-lifestyle-blue animate-fade-in">
                Sleep Tracking
              </h1>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl animate-fade-in">
              Optimize your rest for better days - quality sleep is the foundation of a productive life
            </p>
            <SleepTracker />
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Sleep;
