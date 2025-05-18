
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoalTracker from '@/components/goals/GoalTracker';
import { UserDataProvider } from '@/context/UserDataContext';

const Goals = () => {
  return (
    <UserDataProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Lifestyle Goals</h1>
            <p className="text-muted-foreground mb-6">Set and achieve your personal goals</p>
            <GoalTracker />
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Goals;
