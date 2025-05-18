
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DailyOverview from '@/components/dashboard/DailyOverview';
import { UserDataProvider } from '@/context/UserDataContext';

const Index = () => {
  return (
    <UserDataProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50/80 dark:from-gray-900 dark:to-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent lifestyle-gradient animate-fade-in">Daily Dashboard</h1>
            <p className="text-muted-foreground mb-8 max-w-2xl animate-fade-in">Track your progress, plan your day, and unlock your full potential with our interactive tools</p>
            <DailyOverview />
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Index;
