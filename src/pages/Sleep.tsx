
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SleepTracker from '@/components/sleep/SleepTracker';
import { UserDataProvider } from '@/context/UserDataContext';
import { Moon, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SleepHero = () => (
  <div className="relative overflow-hidden mb-12 rounded-2xl bg-gradient-to-br from-lifestyle-indigo/20 to-lifestyle-blue/10 p-8">
    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-lifestyle-indigo/10 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-lifestyle-blue/10 rounded-full filter blur-3xl"></div>
    
    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lifestyle-indigo/10 text-lifestyle-indigo text-sm font-medium mb-4">
          <Moon size={14} className="text-lifestyle-indigo" />
          <span>Rest Optimization</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lifestyle-indigo to-lifestyle-blue">
          Better Sleep, <span className="block">Better Days</span>
        </h1>
        
        <p className="text-muted-foreground max-w-xl mb-6">
          Understand your sleep patterns, optimize your rest, and wake up refreshed. 
          Quality sleep is the foundation of a productive and energetic day.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button className="bg-lifestyle-indigo hover:bg-lifestyle-indigo/90">
            <Clock size={16} className="mr-2" />
            Track Sleep
          </Button>
          <Button variant="outline">View Insights</Button>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-lifestyle-indigo/20 to-lifestyle-blue/20 rounded-full filter blur-xl"></div>
        <div className="relative z-10 w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-xl flex items-center justify-center">
            <div className="text-center">
              <div className="relative inline-block">
                <Moon size={38} className="mx-auto mb-2 text-lifestyle-indigo" />
                <Star size={14} className="absolute -top-1 -right-1 text-lifestyle-blue animate-pulse" />
              </div>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lifestyle-indigo to-lifestyle-blue">Sleep</div>
              <div className="text-xs text-muted-foreground mt-1">Rest. Recover. Recharge.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Sleep = () => {
  return (
    <UserDataProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-indigo-50/80 dark:from-gray-900 dark:to-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <SleepHero />
            <SleepTracker />
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Sleep;
