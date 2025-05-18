
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoalTracker from '@/components/goals/GoalTracker';
import { UserDataProvider } from '@/context/UserDataContext';
import { Star } from 'lucide-react';

const Goals = () => {
  return (
    <UserDataProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-purple-50/80 dark:from-gray-900 dark:to-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-lifestyle-purple animate-pulse" size={24} />
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lifestyle-purple to-lifestyle-blue animate-fade-in">
                Lifestyle Goals
              </h1>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl animate-fade-in">
              Set, track and celebrate your achievements - every step forward is a victory!
            </p>
            <GoalTracker />
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Goals;
