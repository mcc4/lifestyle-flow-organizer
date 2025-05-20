
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoalTracker from '@/components/goals/GoalTracker';
import { UserDataProvider } from '@/context/UserDataContext';
import { Star, Trophy, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GoalsHero = () => (
  <div className="relative overflow-hidden mb-12 rounded-2xl bg-gradient-to-br from-lifestyle-purple/20 to-lifestyle-blue/10 p-8">
    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-lifestyle-purple/10 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-lifestyle-blue/10 rounded-full filter blur-3xl"></div>
    
    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lifestyle-purple/10 text-lifestyle-purple text-sm font-medium mb-4">
          <Star size={14} className="text-lifestyle-purple" />
          <span>Achievement Tracking</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lifestyle-purple to-lifestyle-blue">
          Set Goals, Track Progress, <span className="block">Celebrate Success</span>
        </h1>
        
        <p className="text-muted-foreground max-w-xl mb-6">
          Break down your aspirations into manageable goals. Track your progress over time and 
          celebrate each milestone on your journey to success.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button className="bg-lifestyle-purple hover:bg-lifestyle-purple/90">
            <Trophy size={16} className="mr-2" />
            Add New Goal
          </Button>
          <Button variant="outline">View Archives</Button>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-lifestyle-purple/20 to-lifestyle-blue/20 rounded-full filter blur-xl"></div>
        <div className="relative z-10 w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
          <div className="absolute w-full h-full rounded-full border-4 border-dashed border-lifestyle-purple/30 animate-spin-slow"></div>
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-xl flex items-center justify-center">
            <div className="text-center">
              <Target size={32} className="mx-auto mb-2 text-lifestyle-purple" />
              <div className="text-2xl font-bold bg-clip-text text-transparent lifestyle-gradient">Goals</div>
              <div className="text-xs text-muted-foreground mt-1">Aim high, achieve more</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Goals = () => {
  return (
    <UserDataProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-purple-50/80 dark:from-gray-900 dark:to-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <GoalsHero />
            <GoalTracker />
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Goals;
